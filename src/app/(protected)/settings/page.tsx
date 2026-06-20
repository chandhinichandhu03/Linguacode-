// ==============================================
// Settings Page
// ==============================================

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/auth-context";
import { Settings, Palette, Bell, Shield, LogOut } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { signOut } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [difficulty, setDifficulty] = useState("easy");

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Settings className="h-7 w-7 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Customize your learning experience.
        </p>
      </div>

      {/* Appearance */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Theme</Label>
              <p className="text-sm text-muted-foreground">
                Choose between light and dark mode
              </p>
            </div>
            <Select value={theme} onValueChange={(v) => v && setTheme(v)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">☀️ Light</SelectItem>
                <SelectItem value="dark">🌙 Dark</SelectItem>
                <SelectItem value="system">💻 System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Learning Preferences */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-base">Learning Preferences</CardTitle>
          <CardDescription>Set your default learning options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Default Difficulty</Label>
              <p className="text-sm text-muted-foreground">
                For quizzes and challenges
              </p>
            </div>
            <Select value={difficulty} onValueChange={(v) => v && setDifficulty(v)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">🟢 Easy</SelectItem>
                <SelectItem value="medium">🟡 Medium</SelectItem>
                <SelectItem value="hard">🔴 Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive learning reminders
              </p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Daily Practice Reminder</Label>
              <p className="text-sm text-muted-foreground">
                Get reminded to practice daily
              </p>
            </div>
            <Switch
              checked={dailyReminder}
              onCheckedChange={setDailyReminder}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Account
          </CardTitle>
          <CardDescription>Manage your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            onClick={() => {
              signOut();
              toast.success("Signed out successfully");
            }}
            className="w-full sm:w-auto"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
