// ==============================================
// NLP Topic Card Component
// ==============================================

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { NLPTopic } from "@/lib/constants";

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-500/10 text-green-600 border-green-500/20",
  intermediate: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  advanced: "bg-red-500/10 text-red-600 border-red-500/20",
};

export function NLPTopicCard({ topic }: { topic: NLPTopic }) {
  return (
    <Card className="card-hover border-border/50 bg-card/80 cursor-pointer group h-full">
      <CardContent className="p-6">
        {/* Icon & Difficulty */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${topic.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <span className="text-2xl">{topic.icon}</span>
          </div>
          <Badge
            variant="outline"
            className={`text-[10px] capitalize ${difficultyColors[topic.difficulty]}`}
          >
            {topic.difficulty}
          </Badge>
        </div>

        {/* Title & Description */}
        <h3 className="font-semibold text-lg mb-1.5 group-hover:text-primary transition-colors">
          {topic.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {topic.description}
        </p>

        {/* Concept Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {topic.concepts.slice(0, 3).map((concept) => (
            <Badge key={concept} variant="secondary" className="text-[10px] font-normal">
              {concept}
            </Badge>
          ))}
          {topic.concepts.length > 3 && (
            <Badge variant="secondary" className="text-[10px] font-normal">
              +{topic.concepts.length - 3}
            </Badge>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center text-primary text-sm font-medium">
          Explore
          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );
}
