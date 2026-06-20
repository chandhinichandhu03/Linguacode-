// ==============================================
// Pronunciation Practice Component
// ==============================================

"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, RefreshCw, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const PRACTICE_PHRASES = [
  { text: "The quick brown fox jumps over the lazy dog", lang: "en-US", difficulty: "easy" },
  { text: "She sells seashells by the seashore", lang: "en-US", difficulty: "medium" },
  { text: "How much wood would a woodchuck chuck", lang: "en-US", difficulty: "medium" },
  { text: "Peter Piper picked a peck of pickled peppers", lang: "en-US", difficulty: "hard" },
  { text: "Unique New York, unique New York, you know you need unique New York", lang: "en-US", difficulty: "hard" },
  { text: "The sixth sick sheikh's sixth sheep's sick", lang: "en-US", difficulty: "hard" },
  { text: "I scream, you scream, we all scream for ice cream", lang: "en-US", difficulty: "easy" },
  { text: "A proper copper coffee pot", lang: "en-US", difficulty: "medium" },
];

export function PronunciationPractice() {
  const [currentPhrase, setCurrentPhrase] = useState(PRACTICE_PHRASES[0]);
  const [isListening, setIsListening] = useState(false);
  const [userSpeech, setUserSpeech] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setUserSpeech(text);
          setIsListening(false);
          evaluatePronunciation(text);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const hearPhrase = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(currentPhrase.text);
    utterance.lang = currentPhrase.lang;
    utterance.rate = 0.85;
    synthRef.current.speak(utterance);
  };

  const startListening = () => {
    setUserSpeech("");
    setScore(null);
    setFeedback("");
    setIsListening(true);
    try { recognitionRef.current?.start(); } catch {}
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const evaluatePronunciation = async (spokenText: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: `Compare pronunciation attempt. Target: "${currentPhrase.text}". User said: "${spokenText}". Give: 1) Accuracy score (0-100), 2) What was correct, 3) What needs improvement. Be encouraging. Start your response with just the number score, then a newline, then feedback.`,
          }],
          language: "English",
          systemPrompt: "You are a pronunciation coach. Be encouraging but honest. Start response with just the numeric score (0-100), then a newline, then your feedback.",
        }),
      });

      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      const response = data.response;

      // Try to extract score from first line
      const lines = response.split("\n");
      const scoreMatch = lines[0].match(/(\d+)/);
      const extractedScore = scoreMatch ? parseInt(scoreMatch[1]) : 50;
      setScore(Math.min(100, extractedScore));
      setFeedback(lines.slice(1).join("\n").trim() || response);
    } catch {
      setScore(50);
      setFeedback("Could not evaluate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextPhrase = () => {
    const randomIndex = Math.floor(Math.random() * PRACTICE_PHRASES.length);
    setCurrentPhrase(PRACTICE_PHRASES[randomIndex]);
    setUserSpeech("");
    setScore(null);
    setFeedback("");
  };

  const difficultyColor: Record<string, string> = {
    easy: "bg-green-500/10 text-green-600 border-green-500/20",
    medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    hard: "bg-red-500/10 text-red-600 border-red-500/20",
  };

  return (
    <Card className="border-border/50 bg-card/80">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Mic className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Pronunciation Practice</h3>
            <p className="text-xs text-muted-foreground">Listen, repeat, and get AI feedback</p>
          </div>
        </div>

        {/* Target Phrase */}
        <div className="bg-muted/40 rounded-xl p-5 border border-border/30 mb-4">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className={`text-[10px] ${difficultyColor[currentPhrase.difficulty]}`}>
              {currentPhrase.difficulty}
            </Badge>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={hearPhrase} className="h-8 text-xs">
                <Volume2 className="h-3.5 w-3.5 mr-1" />
                Listen
              </Button>
              <Button variant="ghost" size="sm" onClick={nextPhrase} className="h-8 text-xs">
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Next
              </Button>
            </div>
          </div>
          <p className="text-lg font-medium text-center leading-relaxed">
            &ldquo;{currentPhrase.text}&rdquo;
          </p>
        </div>

        {/* Record Button */}
        <div className="flex justify-center mb-4">
          <Button
            onClick={isListening ? stopListening : startListening}
            disabled={loading}
            className={cn(
              "rounded-full h-16 w-16 shadow-lg transition-all duration-300",
              isListening
                ? "bg-red-500 hover:bg-red-600 animate-pulse"
                : "bg-gradient-to-br from-green-500 to-emerald-500 hover:opacity-90"
            )}
          >
            {isListening ? (
              <MicOff className="h-6 w-6 text-white" />
            ) : (
              <Mic className="h-6 w-6 text-white" />
            )}
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mb-4">
          {isListening ? "🎙️ Listening... Speak the phrase" : loading ? "Evaluating..." : "Tap to record your attempt"}
        </p>

        {/* User's attempt */}
        {userSpeech && (
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 mb-4 animate-fade-in">
            <p className="text-xs text-muted-foreground mb-1">You said:</p>
            <p className="text-sm italic">&ldquo;{userSpeech}&rdquo;</p>
          </div>
        )}

        {/* Score & Feedback */}
        {loading && (
          <div className="flex items-center justify-center gap-2 text-primary animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Evaluating pronunciation...</span>
          </div>
        )}

        {score !== null && !loading && (
          <div className="animate-slide-up space-y-3">
            {/* Score Bar */}
            <div className="flex items-center gap-3">
              {score >= 70 ? (
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Accuracy</span>
                  <span className={cn(
                    "text-sm font-bold",
                    score >= 80 ? "text-green-500" : score >= 50 ? "text-yellow-500" : "text-red-500"
                  )}>
                    {score}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-700",
                      score >= 80 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500"
                    )}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className="bg-muted/40 rounded-xl p-4 border border-border/30 text-sm leading-relaxed whitespace-pre-wrap">
                {feedback}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
