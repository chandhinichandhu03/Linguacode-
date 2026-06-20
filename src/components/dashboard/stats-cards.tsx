// ==============================================
// Dashboard Stats Cards
// ==============================================

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Flame, BookOpen, Trophy, Star } from "lucide-react";

interface StatsCardsProps {
  streak: number;
  lessonsCompleted: number;
  quizScore: number;
  xp: number;
}

const statConfig = [
  {
    key: "streak",
    label: "Day Streak",
    icon: Flame,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-500",
    suffix: "🔥",
  },
  {
    key: "lessonsCompleted",
    label: "Lessons Done",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    suffix: "",
  },
  {
    key: "quizScore",
    label: "Quiz Score",
    icon: Trophy,
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-500/10",
    textColor: "text-yellow-500",
    suffix: "%",
  },
  {
    key: "xp",
    label: "Total XP",
    icon: Star,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    suffix: "",
  },
];

export function StatsCards({
  streak,
  lessonsCompleted,
  quizScore,
  xp,
}: StatsCardsProps) {
  const values = { streak, lessonsCompleted, quizScore, xp };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statConfig.map((stat) => (
        <Card
          key={stat.key}
          className="card-hover border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden"
        >
          <CardContent className="p-4 md:p-5 relative">
            {/* Background gradient accent */}
            <div
              className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2`}
            />

            <div className="flex items-center gap-3 mb-3">
              <div
                className={`h-9 w-9 rounded-lg ${stat.bgColor} flex items-center justify-center`}
              >
                <stat.icon className={`h-4.5 w-4.5 ${stat.textColor}`} />
              </div>
            </div>

            <p className="text-2xl md:text-3xl font-bold">
              {values[stat.key as keyof typeof values]}
              {stat.suffix}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
