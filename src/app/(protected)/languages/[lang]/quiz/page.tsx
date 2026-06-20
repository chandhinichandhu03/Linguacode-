// ==============================================
// Language Quiz Page (Fixed)
// ==============================================

"use client";

import { use, useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SPOKEN_LANGUAGES } from "@/lib/constants";
import {
  ArrowLeft,
  Brain,
  Loader2,
  Trophy,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function LanguageQuizPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const language = SPOKEN_LANGUAGES.find((l) => l.id === lang);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [started, setStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  if (!language) return notFound();

  const generateQuiz = async () => {
    setLoading(true);
    setStarted(true);
    setScore(0);
    setCurrentQ(0);
    setCompleted(false);
    setSelectedAnswer(null);
    setAnswered(false);

    try {
      const response = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: language.name,
          topic: "general vocabulary and grammar",
          difficulty,
          type: "spoken",
          count: 5,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate quiz");

      const data = await response.json();
      setQuestions(data.questions);
    } catch {
      toast.error("Failed to generate quiz. Check your API key.");
      setStarted(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (index: number) => {
    if (answered) return; // Already answered this question
    setSelectedAnswer(index);
    setAnswered(true);
    const q = questions[currentQ];
    if (index === q.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const goToNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setCompleted(true);
      toast.success(
        `Quiz complete! Score: ${score}/${questions.length}`
      );
    }
  };

  // Quiz not started - show start screen
  if (!started) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href={`/languages/${lang}`}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              {language.icon} {language.name} Quiz
            </h1>
          </div>
        </div>

        <Card className="border-border/50 bg-card/80 text-center">
          <CardContent className="p-8 space-y-6">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto shadow-xl">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to test your {language.name}?</h2>
              <p className="text-muted-foreground">
                5 AI-generated questions based on your selected difficulty.
              </p>
            </div>

            <div className="max-w-xs mx-auto">
              <Select value={difficulty} onValueChange={(v) => v && setDifficulty(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">🟢 Easy</SelectItem>
                  <SelectItem value="medium">🟡 Medium</SelectItem>
                  <SelectItem value="hard">🔴 Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={generateQuiz}
              size="lg"
              className="bg-gradient-to-r from-primary to-purple-500 shadow-lg shadow-primary/20"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto" />
          <p className="text-muted-foreground">
            Generating your {language.name} quiz...
          </p>
        </div>
      </div>
    );
  }

  // Quiz completed
  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="border-border/50 bg-card/80 text-center">
          <CardContent className="p-8 space-y-6">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center mx-auto shadow-xl">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
              <p className="text-muted-foreground text-lg">
                You scored{" "}
                <span className="text-primary font-bold">{score}/{questions.length}</span>{" "}
                ({percentage}%)
              </p>
            </div>
            <Badge
              className="text-base px-4 py-1"
              variant={percentage >= 80 ? "default" : "secondary"}
            >
              {percentage >= 80
                ? "🌟 Excellent!"
                : percentage >= 60
                ? "👍 Good job!"
                : "💪 Keep practicing!"}
            </Badge>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={generateQuiz}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Link href={`/languages/${lang}`}>
                <Button>Back to Hub</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-xl font-bold mt-8 mb-4">Quiz Review & Solutions</h3>
          {questions.map((q, idx) => (
            <Card key={idx} className="border-border/50 bg-card/60">
              <CardContent className="p-5 space-y-4">
                <p className="font-semibold flex gap-2">
                  <span className="text-muted-foreground">{idx + 1}.</span> 
                  {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => (
                    <div 
                      key={optIdx} 
                      className={`p-3 rounded-xl border text-sm flex items-center gap-3 ${
                        optIdx === q.correctAnswer 
                          ? "border-green-500 bg-green-500/10 font-medium" 
                          : "border-border/30 opacity-60"
                      }`}
                    >
                      <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        optIdx === q.correctAnswer ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      {opt}
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-sm font-medium mb-1">Explanation</p>
                  <p className="text-sm text-muted-foreground">{q.explanation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Active quiz — inline question display (no separate QuizCard to avoid state issues)
  const currentQuestion = questions[currentQ];
  if (!currentQuestion) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <Link href={`/languages/${lang}`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold">
            {language.icon} {language.name} Quiz
          </h1>
        </div>
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="text-xs">
              Question {currentQ + 1}/{questions.length}
            </Badge>
            <div className="h-1.5 flex-1 mx-4 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{
                  width: `${((currentQ + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
            <Badge variant="outline" className="text-xs">
              Score: {score}
            </Badge>
          </div>
          <h2 className="text-lg font-semibold mt-3">{currentQuestion.question}</h2>
        </div>

        <div className="px-6 pb-6 space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const showResult = answered;

            return (
              <button
                key={`q${currentQ}-opt${index}`}
                onClick={() => handleSelect(index)}
                disabled={answered}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all duration-300 text-sm font-medium",
                  !showResult &&
                    "border-border/50 hover:border-primary/50 hover:bg-accent/50 cursor-pointer",
                  showResult && isCorrect && "border-green-500 bg-green-500/10",
                  showResult &&
                    isSelected &&
                    !isCorrect &&
                    "border-red-500 bg-red-500/10",
                  showResult && !isSelected && !isCorrect && "opacity-50",
                  answered && "cursor-default"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold",
                        showResult && isCorrect
                          ? "bg-green-500 text-white"
                          : showResult && isSelected
                          ? "bg-red-500 text-white"
                          : "bg-muted"
                      )}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {showResult && isCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </button>
            );
          })}

          {/* Explanation - shown after answering */}
          {answered && (
            <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20 animate-slide-up">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium mb-1">Explanation</p>
                  <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Next Question button - only shown after answering */}
          {answered && (
            <div className="pt-2">
              <Button
                onClick={goToNext}
                className="w-full bg-gradient-to-r from-primary to-purple-500"
              >
                {currentQ < questions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    See Results
                    <Trophy className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
