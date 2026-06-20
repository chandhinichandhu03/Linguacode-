// ==============================================
// Leaderboard Page
// ==============================================

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Flame, Star } from "lucide-react";
import { useAuth } from "@/context/auth-context";

// Demo leaderboard data
const leaderboard = [
  { name: "Alex Chen", xp: 2450, streak: 30, lessons: 45, avatar: "A" },
  { name: "Maria Garcia", xp: 2100, streak: 25, lessons: 38, avatar: "M" },
  { name: "Yuki Tanaka", xp: 1900, streak: 22, lessons: 35, avatar: "Y" },
  { name: "Priya Sharma", xp: 1750, streak: 18, lessons: 30, avatar: "P" },
  { name: "John Smith", xp: 1500, streak: 15, lessons: 28, avatar: "J" },
  { name: "Akira Sato", xp: 1350, streak: 12, lessons: 25, avatar: "A" },
  { name: "Sarah Wilson", xp: 1200, streak: 10, lessons: 22, avatar: "S" },
  { name: "Carlos Ruiz", xp: 1050, streak: 8, lessons: 18, avatar: "C" },
  { name: "Anitha Kumar", xp: 900, streak: 6, lessons: 15, avatar: "A" },
  { name: "David Lee", xp: 750, streak: 5, lessons: 12, avatar: "D" },
];

const rankColors = [
  "bg-gradient-to-r from-yellow-400 to-amber-500", // 1st
  "bg-gradient-to-r from-gray-300 to-gray-400", // 2nd
  "bg-gradient-to-r from-orange-400 to-amber-600", // 3rd
];

export default function LeaderboardPage() {
  const { user, userProfile } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Trophy className="h-7 w-7 text-yellow-500" />
          Leaderboard
        </h1>
        <p className="text-muted-foreground mt-1">
          See how you stack up against other learners.
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-3 items-end">
        {/* 2nd place */}
        <Card className="border-border/50 bg-card/80 text-center">
          <CardContent className="p-4">
            <Avatar className="h-12 w-12 mx-auto mb-2">
              <AvatarFallback className="bg-gray-200 text-gray-700 font-bold">
                {leaderboard[1].avatar}
              </AvatarFallback>
            </Avatar>
            <Badge className="bg-gray-300 text-gray-700 border-0 mb-1">
              🥈 2nd
            </Badge>
            <p className="text-sm font-semibold truncate">
              {leaderboard[1].name}
            </p>
            <p className="text-xs text-muted-foreground">
              {leaderboard[1].xp} XP
            </p>
          </CardContent>
        </Card>

        {/* 1st place */}
        <Card className="border-yellow-500/30 bg-card/80 text-center scale-105">
          <CardContent className="p-4">
            <div className="text-3xl mb-1">👑</div>
            <Avatar className="h-14 w-14 mx-auto mb-2 ring-2 ring-yellow-500">
              <AvatarFallback className="bg-yellow-100 text-yellow-700 font-bold text-lg">
                {leaderboard[0].avatar}
              </AvatarFallback>
            </Avatar>
            <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white border-0 mb-1">
              🥇 1st
            </Badge>
            <p className="text-sm font-bold truncate">{leaderboard[0].name}</p>
            <p className="text-xs text-muted-foreground">
              {leaderboard[0].xp} XP
            </p>
          </CardContent>
        </Card>

        {/* 3rd place */}
        <Card className="border-border/50 bg-card/80 text-center">
          <CardContent className="p-4">
            <Avatar className="h-12 w-12 mx-auto mb-2">
              <AvatarFallback className="bg-orange-100 text-orange-700 font-bold">
                {leaderboard[2].avatar}
              </AvatarFallback>
            </Avatar>
            <Badge className="bg-orange-400 text-white border-0 mb-1">
              🥉 3rd
            </Badge>
            <p className="text-sm font-semibold truncate">
              {leaderboard[2].name}
            </p>
            <p className="text-xs text-muted-foreground">
              {leaderboard[2].xp} XP
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Full Rankings */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-base">Full Rankings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {leaderboard.map((entry, i) => (
            <div
              key={entry.name}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors"
            >
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  i < 3
                    ? `${rankColors[i]} text-white shadow-md`
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </span>

              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                  {entry.avatar}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{entry.name}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Flame className="h-3 w-3 text-orange-500" />
                    {entry.streak}d
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 text-yellow-500" />
                    {entry.lessons} lessons
                  </span>
                </div>
              </div>

              <Badge
                variant="secondary"
                className="font-mono text-xs"
              >
                {entry.xp} XP
              </Badge>
            </div>
          ))}

          {/* Current user position */}
          <div className="border-t border-border/50 mt-3 pt-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
              <span className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                ?
              </span>
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                  {user?.displayName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {user?.displayName || "You"}{" "}
                  <Badge variant="outline" className="text-xs ml-1">
                    You
                  </Badge>
                </p>
              </div>
              <Badge variant="secondary" className="font-mono text-xs">
                {userProfile?.xp || 0} XP
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
