// ==============================================
// Coding Quiz Page
// ==============================================

"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuizCard } from "@/components/language/quiz-card";
import { CODING_LANGUAGES } from "@/lib/constants";
import {
  ArrowLeft,
  Brain,
  Loader2,
  Trophy,
  RotateCcw,
  Sparkles,
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

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function CodingQuizPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const language = CODING_LANGUAGES.find((l) => l.id === lang);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [started, setStarted] = useState(false);

  if (!language) return notFound();

  const generateQuiz = async () => {
    setLoading(true);
    setStarted(true);
    setScore(0);
    setCurrentQ(0);
    setCompleted(false);

    try {
      const response = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: language.name,
          topic: "fundamentals and syntax",
          difficulty,
          type: "coding",
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

  const handleAnswer = (correct: boolean) => {
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
      } else {
        setCompleted(true);
        toast.success(
          `Quiz complete! Score: ${correct ? score + 1 : score}/${questions.length}`
        );
      }
    }, 2000);
  };

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href={`/coding/${lang}`}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            {language.icon} {language.name} Quiz
          </h1>
        </div>

        <Card className="border-border/50 bg-card/80 text-center">
          <CardContent className="p-8 space-y-6">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto shadow-xl">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Test your {language.name} knowledge
              </h2>
              <p className="text-muted-foreground">
                5 AI-generated questions about syntax, concepts, and best
                practices.
              </p>
            </div>

            <div className="max-w-xs mx-auto">
              <Select value={difficulty} onValueChange={(v) => v && setDifficulty(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
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
              className="bg-gradient-to-r from-primary to-purple-500"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto" />
          <p className="text-muted-foreground">Generating quiz...</p>
        </div>
      </div>
    );
  }

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="border-border/50 bg-card/80 text-center">
          <CardContent className="p-8 space-y-6">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center mx-auto shadow-xl">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Quiz Complete!</h2>
            <p className="text-lg text-muted-foreground">
              Score: <span className="text-primary font-bold">{score}/{questions.length}</span> ({percentage}%)
            </p>
            <Badge className="text-base px-4 py-1" variant={percentage >= 80 ? "default" : "secondary"}>
              {percentage >= 80 ? "🌟 Excellent!" : percentage >= 60 ? "👍 Good job!" : "💪 Keep practicing!"}
            </Badge>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={generateQuiz}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Link href={`/coding/${lang}`}>
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

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <Link href={`/coding/${lang}`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">{language.icon} {language.name} Quiz</h1>
      </div>

      {questions[currentQ] && (
        <QuizCard
          question={questions[currentQ].question}
          options={questions[currentQ].options}
          correctAnswer={questions[currentQ].correctAnswer}
          explanation={questions[currentQ].explanation}
          questionNumber={currentQ + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}
