// ==============================================
// Challenge Card Component
// ==============================================

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, ArrowRight } from "lucide-react";

interface ChallengeCardProps {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  onClick: () => void;
}

const difficultyConfig = {
  easy: { color: "bg-green-500/10 text-green-500 border-green-500/20", label: "Easy" },
  medium: { color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", label: "Medium" },
  hard: { color: "bg-red-500/10 text-red-500 border-red-500/20", label: "Hard" },
};

export function ChallengeCard({
  title,
  description,
  difficulty,
  onClick,
}: ChallengeCardProps) {
  const config = difficultyConfig[difficulty];

  return (
    <Card
      className="card-hover border-border/50 bg-card/80 cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Code2 className="h-5 w-5 text-primary" />
          </div>
          <Badge variant="outline" className={config.color}>
            {config.label}
          </Badge>
        </div>
        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>
        <div className="flex items-center text-primary text-sm font-medium">
          Start Challenge
          <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );
}
