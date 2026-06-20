// ==============================================
// Grammar Checker Component
// ==============================================

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Loader2, SpellCheck2, Sparkles, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface GrammarCheckerProps {
  language: string;
}

interface Correction {
  correctedText: string;
  mistakes: { original: string; corrected: string; explanation: string }[];
  overallFeedback: string;
}

// Default sample sentences with intentional grammar mistakes per language
const SAMPLE_SENTENCES: Record<string, { text: string; label: string }[]> = {
  English: [
    { text: "She don't like to goes to the school on Mondays.", label: "Subject-verb agreement" },
    { text: "Me and him went to the store for buy some foods.", label: "Pronoun case & infinitive" },
    { text: "Their going to there house over they're.", label: "Homophones" },
    { text: "The childs was playing in the park yesterday night.", label: "Plural & word choice" },
    { text: "I have been living here since five years and I am liking it very much.", label: "Tense & stative verbs" },
  ],
  Japanese: [
    { text: "私は昨日東京を行きました。", label: "Particle usage (を→に)" },
    { text: "彼女は本が読むのが好きです。", label: "Particle usage (が→を)" },
    { text: "明日学校で行きます。", label: "Particle usage (で→に)" },
    { text: "この映画はとても面白でした。", label: "Adjective conjugation" },
    { text: "私は毎日日本語が勉強します。", label: "Particle usage (が→を)" },
  ],
  Spanish: [
    { text: "Yo soy tengo veinte años y me gusto el fútbol.", label: "ser/tener & gustar" },
    { text: "Ayer yo ido al tienda para comprar unos cosas.", label: "Past tense & articles" },
    { text: "Ella no sabe dónde es su llaves.", label: "estar/ser & agreement" },
    { text: "Los niños juegan en el parque todos los día.", label: "Number agreement" },
    { text: "Yo quiero que tú vienes a mi fiesta mañana.", label: "Subjunctive mood" },
  ],
  Hindi: [
    { text: "मैं कल स्कूल गया था और वहाँ मेरे दोस्त मिला।", label: "Subject-verb agreement" },
    { text: "वह किताब पढ़ता है रोज सुबह को।", label: "Word order & postposition" },
    { text: "हमलोग बाजार में जायेगा कल।", label: "Verb agreement with plural" },
    { text: "मुझे बहुत भूख लगा है, खाना खाओ।", label: "Gender agreement & imperative" },
    { text: "उसने मुझसे कहा कि तुम आओ।", label: "Direct/indirect speech" },
  ],
  Tamil: [
    { text: "நான் நேற்று பள்ளிக்கு போனேன் ஆனால் அவன் வந்தாள்.", label: "Gender agreement" },
    { text: "அவர்கள் நாளை வருகிறான் என்று நினைக்கிறேன்.", label: "Subject-verb agreement" },
    { text: "இந்த புத்தகம் மிகவும் நல்ல இருக்கிறது.", label: "Adjective form" },
    { text: "நான் சாப்பிடுகிறேன் ஒரு ஆப்பிள் தினமும்.", label: "Word order" },
    { text: "அவள் பாடினாள் ஒரு பாட்டு நேற்று.", label: "Word order & tense" },
  ],
};

// --- Offline/Fallback Grammar Checker ---
function fallbackGrammarCheck(text: string, language: string): Correction {
  const words = text.split(/\s+/).filter(Boolean);
  const mistakes: { original: string; corrected: string; explanation: string }[] = [];

  // English-specific rules
  if (language.toLowerCase() === "english") {
    // Check "don't" + plural verb
    const dontGoesMatch = text.match(/\b(don't|doesnt|doesn't)\s+(goes|likes|wants|needs|plays|runs|comes)\b/i);
    if (dontGoesMatch) {
      mistakes.push({
        original: `${dontGoesMatch[1]} ${dontGoesMatch[2]}`,
        corrected: `${dontGoesMatch[1]} ${dontGoesMatch[2].replace(/s$/, "").replace(/es$/, "")}`,
        explanation: `After "don't/doesn't", use the base form of the verb without -s/-es.`,
      });
    }

    // Check "Me and him" → "He and I"
    if (/\b(me|him|her|them)\s+and\s+(me|him|her|them|i)\b/i.test(text)) {
      mistakes.push({
        original: text.match(/\b(me|him|her|them)\s+and\s+(me|him|her|them|i)\b/i)![0],
        corrected: "He and I / She and I (subject form)",
        explanation: "When used as a subject, use subject pronouns (I, he, she, they) instead of object pronouns (me, him, her, them).",
      });
    }

    // Check their/there/they're confusion
    if (/\btheir\b/i.test(text) && /\bthey're\b/i.test(text) && /\bthere\b/i.test(text)) {
      mistakes.push({
        original: "their/there/they're usage",
        corrected: "their = possession, there = location, they're = they are",
        explanation: "These homophones are commonly confused. 'Their' shows possession, 'there' indicates a place, and 'they're' is a contraction of 'they are'.",
      });
    }

    // Check "childs" → "children"
    if (/\bchilds\b/i.test(text)) {
      mistakes.push({
        original: "childs",
        corrected: "children",
        explanation: "'Child' has an irregular plural form: 'children', not 'childs'.",
      });
    }

    // Check "since five years" → "for five years"
    if (/\bsince\s+\d+\s+(years?|months?|days?|weeks?)\b/i.test(text)) {
      const match = text.match(/\bsince\s+(\d+\s+(?:years?|months?|days?|weeks?))\b/i)!;
      mistakes.push({
        original: `since ${match[1]}`,
        corrected: `for ${match[1]}`,
        explanation: "Use 'for' with a duration (for five years) and 'since' with a specific point in time (since 2019).",
      });
    }

    // Check "am liking" → stative verb
    if (/\bam\s+(liking|knowing|believing|wanting|needing|having)\b/i.test(text)) {
      const match = text.match(/\bam\s+(liking|knowing|believing|wanting|needing|having)\b/i)!;
      mistakes.push({
        original: `am ${match[1]}`,
        corrected: match[1].replace(/ing$/, "").replace(/k$/, "ke"),
        explanation: `"${match[1].replace(/ing$/, "").replace(/k$/, "ke")}" is a stative verb and is not usually used in the continuous form.`,
      });
    }

    // Check "for buy" → "to buy"
    if (/\bfor\s+(buy|eat|go|see|get|make|take|do|have)\b/i.test(text)) {
      const match = text.match(/\bfor\s+(buy|eat|go|see|get|make|take|do|have)\b/i)!;
      mistakes.push({
        original: `for ${match[1]}`,
        corrected: `to ${match[1]}`,
        explanation: "Use 'to' + base verb for purpose, not 'for' + base verb. 'For' is used with nouns (for food) or gerunds (for buying).",
      });
    }
  }

  // Generic checks for all languages
  // Double space check
  if (/  +/.test(text)) {
    mistakes.push({
      original: "multiple spaces",
      corrected: "single space",
      explanation: "Use single spaces between words for proper formatting.",
    });
  }

  // Build corrected text (basic — just echo for non-English or leave original with note)
  let correctedText = text;
  if (language.toLowerCase() === "english") {
    correctedText = text
      .replace(/\bchilds\b/gi, "children")
      .replace(/  +/g, " ");
  }

  const overallFeedback = mistakes.length === 0
    ? `Your ${language} text looks good! No obvious grammar issues detected. For more thorough analysis, ensure the AI service is configured.`
    : `Found ${mistakes.length} potential issue${mistakes.length > 1 ? "s" : ""} in your text. Review the corrections above to improve your ${language} writing skills!`;

  return { correctedText, mistakes, overallFeedback };
}

export function GrammarChecker({ language }: GrammarCheckerProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [correction, setCorrection] = useState<Correction | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);

  // Get sample sentences for current language (default to English)
  const samples = SAMPLE_SENTENCES[language] || SAMPLE_SENTENCES["English"];

  const checkGrammar = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to check");
      return;
    }

    setLoading(true);
    setUsedFallback(false);
    try {
      const response = await fetch("/api/ai/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      });

      if (!response.ok) throw new Error("Failed to check grammar");

      const data = await response.json();
      // Validate the response has the expected shape
      if (data && typeof data.correctedText === "string") {
        setCorrection(data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch {
      // Use fallback grammar checker when AI is unavailable
      const fallbackResult = fallbackGrammarCheck(text, language);
      setCorrection(fallbackResult);
      setUsedFallback(true);
      toast.info("Using offline grammar checker — AI service unavailable.", {
        description: "Basic rules are applied. Connect AI for deeper analysis.",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = (sampleText: string) => {
    setText(sampleText);
    setCorrection(null);
  };

  const handleReset = () => {
    setText("");
    setCorrection(null);
    setUsedFallback(false);
  };

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-md">
            <SpellCheck2 className="h-4 w-4 text-white" />
          </div>
          Grammar Checker
          {usedFallback && (
            <Badge variant="outline" className="text-xs ml-auto text-amber-500 border-amber-500/30">
              Offline Mode
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sample sentences */}
        {!correction && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Try a sample sentence with mistakes:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {samples.map((sample, i) => (
                <button
                  key={i}
                  onClick={() => handleSampleClick(sample.text)}
                  className="text-xs px-2.5 py-1.5 rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary border border-border/40 hover:border-primary/30 transition-all duration-200 text-left"
                  title={sample.text}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Write something in ${language} or try a sample above...`}
          className="min-h-[100px] resize-none border-border/50"
        />

        <div className="flex gap-2">
          <Button
            onClick={checkGrammar}
            disabled={loading || !text.trim()}
            className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <SpellCheck2 className="h-4 w-4 mr-2" />
                Check Grammar
              </>
            )}
          </Button>
          {(text || correction) && (
            <Button
              onClick={handleReset}
              variant="outline"
              size="icon"
              className="border-border/50"
              title="Reset"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Results */}
        {correction && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Corrected text */}
            <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
              <p className="text-sm font-medium text-green-500 mb-1 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                Corrected Text
              </p>
              <p className="text-sm">{correction.correctedText}</p>
            </div>

            {/* Mistakes */}
            {correction.mistakes.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Corrections ({correction.mistakes.length}):
                </p>
                {correction.mistakes.map((mistake, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-muted/50 border border-border/50"
                  >
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant="destructive" className="text-xs">
                        {mistake.original}
                      </Badge>
                      <span className="text-xs text-muted-foreground">→</span>
                      <Badge className="text-xs bg-green-600">
                        {mistake.corrected}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {mistake.explanation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/20 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <p className="text-sm text-green-500">
                  No mistakes found! Great job! 🎉
                </p>
              </div>
            )}

            {/* Feedback */}
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                {correction.overallFeedback}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
