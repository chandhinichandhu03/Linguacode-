// ==============================================
// Vocabulary Flashcard Component
// ==============================================

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Check, Volume2 } from "lucide-react";

interface VocabCardProps {
  word: string;
  translation: string;
  pronunciation?: string;
  example: string;
  onMarkLearned?: () => void;
}

export function VocabCard({
  word,
  translation,
  pronunciation,
  example,
  onMarkLearned,
}: VocabCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-52 transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front - Word */}
        <Card
          className="absolute inset-0 border-border/50 bg-gradient-to-br from-card to-card/80"
          style={{ backfaceVisibility: "hidden" }}
        >
          <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
            <p className="text-3xl font-bold mb-2">{word}</p>
            {pronunciation && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Volume2 className="h-3.5 w-3.5" />
                {pronunciation}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-4">
              Tap to reveal translation
            </p>
          </CardContent>
        </Card>

        {/* Back - Translation */}
        <Card
          className="absolute inset-0 border-primary/30 bg-gradient-to-br from-primary/5 to-purple-500/5"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
            <p className="text-xl font-bold text-primary mb-2">{translation}</p>
            <p className="text-sm text-muted-foreground italic mb-4">
              &quot;{example}&quot;
            </p>
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFlipped(false)}
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                Again
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={onMarkLearned}
              >
                <Check className="h-3.5 w-3.5 mr-1" />
                Got it!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
