// ==============================================
// Dashboard Page
// ==============================================

"use client";

import { useAuth } from "@/context/auth-context";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { StreakCounter } from "@/components/dashboard/streak-counter";
import { LanguageCard } from "@/components/shared/language-card";
import { SPOKEN_LANGUAGES, CODING_LANGUAGES } from "@/lib/constants";
import { Sparkles } from "lucide-react";

export default function DashboardPage() {
  const { user, userProfile } = useAuth();
  const displayName = user?.displayName || userProfile?.displayName || "Learner";

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          Welcome back, {displayName.split(" ")[0]}!
          <Sparkles className="h-6 w-6 text-yellow-400" />
        </h1>
        <p className="text-muted-foreground">
          Continue your learning journey. Here&apos;s your progress overview.
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards
        streak={userProfile?.streak || 3}
        lessonsCompleted={12}
        quizScore={85}
        xp={userProfile?.xp || 450}
      />

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column - Chart & Activity */}
        <div className="lg:col-span-2 space-y-6">
          <ProgressChart />
          <RecentActivity />
        </div>

        {/* Right column - Streak & Recommendations */}
        <div className="space-y-6">
          <StreakCounter streak={userProfile?.streak || 3} />

          {/* Recommended */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Recommended for you
            </h3>
            <div className="space-y-3">
              <LanguageCard
                language={SPOKEN_LANGUAGES[1]}
                progress={25}
                href="/languages/japanese"
              />
              <LanguageCard
                language={CODING_LANGUAGES[0]}
                progress={40}
                href="/coding/python"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
