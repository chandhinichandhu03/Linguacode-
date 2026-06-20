// ==============================================
// Profile Page
// ==============================================

"use client";

import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProgressBar } from "@/components/shared/progress-bar";
import { SPOKEN_LANGUAGES, CODING_LANGUAGES } from "@/lib/constants";
import {
  User,
  Mail,
  Calendar,
  Flame,
  Star,
  BookOpen,
  Trophy,
  Code2,
  Languages,
} from "lucide-react";

export default function ProfilePage() {
  const { user, userProfile } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="border-border/50 bg-card/80 overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-primary via-purple-500 to-pink-500 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.08%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
        </div>

        <CardContent className="relative pt-0 pb-6 px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
            <Avatar className="h-24 w-24 border-4 border-card shadow-xl">
              <AvatarImage src={user?.photoURL || undefined} />
              <AvatarFallback className="bg-primary text-2xl font-bold text-primary-foreground">
                {user?.displayName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                {user?.displayName || "Learner"}
              </h1>
              <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <Mail className="h-3.5 w-3.5" />
                {user?.email}
              </p>
            </div>
            <Badge className="bg-gradient-to-r from-primary to-purple-500 text-white border-0">
              <Star className="h-3.5 w-3.5 mr-1" />
              {userProfile?.xp || 0} XP
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Flame, label: "Day Streak", value: userProfile?.streak || 0, color: "text-orange-500" },
          { icon: Star, label: "Total XP", value: userProfile?.xp || 0, color: "text-yellow-500" },
          { icon: BookOpen, label: "Lessons", value: 12, color: "text-blue-500" },
          { icon: Trophy, label: "Quizzes", value: 8, color: "text-purple-500" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/50 bg-card/80">
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Progress */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Languages className="h-5 w-5 text-primary" />
              Language Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {SPOKEN_LANGUAGES.map((lang) => (
              <div key={lang.id}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span>{lang.icon}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                </div>
                <ProgressBar
                  value={Math.floor(Math.random() * 60)}
                  size="sm"
                  color={lang.color}
                  showPercentage={false}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              Coding Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {CODING_LANGUAGES.map((lang) => (
              <div key={lang.id}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span>{lang.icon}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                </div>
                <ProgressBar
                  value={Math.floor(Math.random() * 50)}
                  size="sm"
                  color={lang.color}
                  showPercentage={false}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
