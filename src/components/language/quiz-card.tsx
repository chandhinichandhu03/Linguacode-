// ==============================================
// Quiz Card Component
// ==============================================

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (correct: boolean) => void;
}

export function QuizCard({
  question,
  options,
  correctAnswer,
  explanation,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (index: number) => {
    if (selectedAnswer !== null) return; // Already answered
    setSelectedAnswer(index);
    setShowExplanation(true);
    onAnswer(index === correctAnswer);
  };

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            Question {questionNumber}/{totalQuestions}
          </Badge>
          <div className="h-1.5 flex-1 mx-4 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{
                width: `${(questionNumber / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>
        <CardTitle className="text-lg mt-3">{question}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === correctAnswer;
          const showResult = selectedAnswer !== null;

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={selectedAnswer !== null}
              className={cn(
                "w-full text-left p-4 rounded-xl border-2 transition-all duration-300 text-sm font-medium",
                !showResult &&
                  "border-border/50 hover:border-primary/50 hover:bg-accent/50",
                showResult && isCorrect && "border-green-500 bg-green-500/10",
                showResult &&
                  isSelected &&
                  !isCorrect &&
                  "border-red-500 bg-red-500/10",
                showResult && !isSelected && !isCorrect && "opacity-50"
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

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20 animate-slide-up">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium mb-1">Explanation</p>
                <p className="text-sm text-muted-foreground">{explanation}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
