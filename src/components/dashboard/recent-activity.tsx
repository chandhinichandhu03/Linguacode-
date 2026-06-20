// ==============================================
// Recent Activity Component
// ==============================================

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  BookOpen,
  Trophy,
  Code2,
  Languages,
} from "lucide-react";

// Demo activity data
const activities = [
  {
    id: "1",
    type: "chat",
    title: "Practiced Japanese conversation",
    language: "Japanese",
    time: "2 hours ago",
    icon: MessageSquare,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: "2",
    type: "quiz",
    title: "Completed Python basics quiz",
    language: "Python",
    time: "4 hours ago",
    icon: Trophy,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    score: "80%",
  },
  {
    id: "3",
    type: "lesson",
    title: "Learned 10 new Spanish words",
    language: "Spanish",
    time: "Yesterday",
    icon: BookOpen,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    id: "4",
    type: "challenge",
    title: "Solved FizzBuzz in JavaScript",
    language: "JavaScript",
    time: "Yesterday",
    icon: Code2,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    id: "5",
    type: "vocab",
    title: "Reviewed Hindi vocabulary",
    language: "Hindi",
    time: "2 days ago",
    icon: Languages,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

export function RecentActivity() {
  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors"
          >
            <div
              className={`h-9 w-9 rounded-lg ${activity.bg} flex items-center justify-center flex-shrink-0`}
            >
              <activity.icon className={`h-4.5 w-4.5 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
            <div className="flex items-center gap-2">
              {activity.score && (
                <Badge variant="secondary" className="text-xs">
                  {activity.score}
                </Badge>
              )}
              <Badge variant="outline" className="text-xs hidden sm:inline-flex">
                {activity.language}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
