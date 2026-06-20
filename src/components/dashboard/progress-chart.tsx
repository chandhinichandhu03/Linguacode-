// ==============================================
// Progress Chart Component
// ==============================================

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample weekly data
const weeklyData = [
  { day: "Mon", minutes: 25 },
  { day: "Tue", minutes: 40 },
  { day: "Wed", minutes: 15 },
  { day: "Thu", minutes: 55 },
  { day: "Fri", minutes: 30 },
  { day: "Sat", minutes: 45 },
  { day: "Sun", minutes: 20 },
];

export function ProgressChart() {
  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Weekly Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} barSize={32}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
                opacity={0.5}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(v) => `${v}m`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value) => [`${value} min`, "Practice"]}
              />
              <Bar
                dataKey="minutes"
                fill="hsl(var(--primary))"
                radius={[6, 6, 0, 0]}
                opacity={0.9}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
