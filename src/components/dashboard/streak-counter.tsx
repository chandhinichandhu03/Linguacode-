// ==============================================
// Streak Counter Component
// ==============================================

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface StreakCounterProps {
  streak: number;
}

export function StreakCounter({ streak }: StreakCounterProps) {
  // Show which days of the week are active (demo: last N days)
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const today = new Date().getDay(); // 0=Sun, 1=Mon...
  const adjustedToday = today === 0 ? 6 : today - 1; // Convert to Mon=0

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Current Streak
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-3xl font-bold">{streak}</span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20 animate-streak">
            <Flame className="h-7 w-7 text-white" />
          </div>
        </div>

        {/* Week dots */}
        <div className="flex items-center justify-between gap-1">
          {days.map((day, i) => {
            const isActive = i <= adjustedToday && i >= adjustedToday - Math.min(streak - 1, adjustedToday);
            const isToday = i === adjustedToday;

            return (
              <div key={`${day}-${i}`} className="flex flex-col items-center gap-1.5">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/20"
                      : isToday
                      ? "bg-primary/20 text-primary ring-2 ring-primary/30"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isActive ? "🔥" : day}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
