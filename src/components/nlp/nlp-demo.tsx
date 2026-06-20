// ==============================================
// NLP Interactive Demo Component
// ==============================================
// Interactive demos for NLP concepts using AI.

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, RotateCcw } from "lucide-react";

interface NLPDemoProps {
  topicId: string;
  topicTitle: string;
}

const DEMO_PLACEHOLDERS: Record<string, string> = {
  tokenization: "The quick brown fox jumps over the lazy dog.",
  "sentiment-analysis": "I absolutely love this new phone! The camera is amazing but the battery could be better.",
  "named-entity-recognition": "Apple CEO Tim Cook announced a new product at their headquarters in Cupertino, California on Monday.",
  "pos-tagging": "The tall professor quickly explained complex algorithms to eager students.",
  "text-classification": "Breaking: Stock market reaches all-time high amid tech sector rally.",
  "word-embeddings": "king queen man woman prince princess",
  transformers: "Attention is all you need. The transformer architecture revolutionized NLP.",
  "text-generation": "Once upon a time in a digital world,",
};

const DEMO_PROMPTS: Record<string, string> = {
  tokenization:
    "Tokenize the following text. Show: 1) Word tokens (split by spaces/punctuation), 2) Sentence tokens, 3) Character count per token. Format as a clean table/list. Text: ",
  "sentiment-analysis":
    "Perform sentiment analysis on this text. Show: 1) Overall sentiment (Positive/Negative/Neutral) with confidence %, 2) Emotion detected, 3) Key phrases that indicate sentiment, 4) Sentence-level breakdown. Text: ",
  "named-entity-recognition":
    "Perform Named Entity Recognition on this text. Identify all entities and classify them as: PERSON, ORGANIZATION, LOCATION, DATE, etc. Show each entity with its type and context. Text: ",
  "pos-tagging":
    "Perform POS tagging on this text. For each word show its part of speech (Noun, Verb, Adjective, Adverb, etc.). Format as: word → POS tag. Text: ",
  "text-classification":
    "Classify this text into categories. Show: 1) Primary category, 2) Secondary categories with confidence %, 3) Key features that determined the classification. Categories: News, Sports, Technology, Entertainment, Business, Science. Text: ",
  "word-embeddings":
    "Explain the semantic relationships between these words using word embedding concepts. Show: 1) Which words are most similar, 2) Analogies (e.g., king-man+woman=queen), 3) Semantic clusters. Words: ",
  transformers:
    "Explain how a Transformer would process this text step by step. Show: 1) Token embeddings, 2) Positional encoding concept, 3) Self-attention (which words attend to which), 4) Key-Query-Value intuition for this text. Text: ",
  "text-generation":
    "Continue this text in 3 different styles: 1) Formal/Academic, 2) Creative/Fantasy, 3) Technical/Scientific. Each continuation should be 2-3 sentences. Starting text: ",
};

export function NLPDemo({ topicId, topicTitle }: NLPDemoProps) {
  const [inputText, setInputText] = useState(DEMO_PLACEHOLDERS[topicId] || "");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runDemo = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const prompt = (DEMO_PROMPTS[topicId] || "Analyze this text for NLP concepts: ") + inputText;
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          language: "English",
          systemPrompt: `You are an NLP expert assistant. Provide clear, structured analysis results for ${topicTitle}. Use simple formatting with bullet points and sections. Be educational and explain what each result means. Do not use markdown code blocks.`,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setResult(data.response);
    } catch {
      setResult("⚠️ Could not process. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setInputText(DEMO_PLACEHOLDERS[topicId] || "");
    setResult(null);
  };

  return (
    <Card className="border-border/50 bg-card/80">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Interactive Demo</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={reset} className="text-xs">
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Reset
          </Button>
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Enter text to analyze:
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={DEMO_PLACEHOLDERS[topicId]}
              className="w-full h-28 px-4 py-3 rounded-xl border border-border/50 bg-muted/30 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          <Button
            onClick={runDemo}
            disabled={loading || !inputText.trim()}
            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Run {topicTitle} Analysis
              </>
            )}
          </Button>
        </div>

        {/* Result Area */}
        {result && (
          <div className="mt-6 animate-slide-up">
            <Badge variant="outline" className="mb-3 text-xs">
              AI Analysis Result
            </Badge>
            <div className="bg-muted/40 rounded-xl p-5 text-sm leading-relaxed whitespace-pre-wrap border border-border/30">
              {result}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
