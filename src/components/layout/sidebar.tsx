// ==============================================
// Sidebar Navigation Component
// ==============================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Languages,
  Code2,
  MessageSquare,
  Trophy,
  User,
  Settings,
  LogOut,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Brain,
  AudioWaveform,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Icon mapping
const iconMap = {
  LayoutDashboard,
  Languages,
  Code2,
  MessageSquare,
  Trophy,
  User,
  Settings,
  Brain,
  AudioWaveform,
  PlayCircle,
};

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/languages", label: "Languages", icon: "Languages" },
  { href: "/coding", label: "Coding", icon: "Code2" },
  { href: "/nlp", label: "NLP", icon: "Brain" },
  { href: "/voice-studio", label: "Voice Studio", icon: "AudioWaveform" },
  { href: "/videos", label: "Videos", icon: "PlayCircle" },
  { href: "/chat", label: "AI Chat", icon: "MessageSquare" },
  { href: "/leaderboard", label: "Leaderboard", icon: "Trophy" },
] as const;

const bottomItems = [
  { href: "/profile", label: "Profile", icon: "User" },
  { href: "/settings", label: "Settings", icon: "Settings" },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen sticky top-0 bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 p-4 h-16">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center flex-shrink-0">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            LinguaCode
          </span>
        )}
      </div>

      <Separator className="mx-3" />

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          const linkContent = (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="h-4.5 w-4.5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger>{linkContent}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            );
          }

          return linkContent;
        })}
      </nav>

      <Separator className="mx-3" />

      {/* Bottom Navigation */}
      <div className="p-3 space-y-1">
        {bottomItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = pathname === item.href;

          const linkContent = (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="h-4.5 w-4.5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger>{linkContent}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            );
          }

          return linkContent;
        })}

        {/* Sign Out */}
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10 transition-all duration-200 w-full"
        >
          <LogOut className="h-4.5 w-4.5 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>

      <Separator className="mx-3" />

      {/* User Info & Collapse Button */}
      <div className="p-3">
        {/* Collapse toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full mb-2 justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </Button>

        {/* User avatar */}
        {user && (
          <div
            className={cn(
              "flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/50",
              collapsed && "justify-center"
            )}
          >
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={user.photoURL || undefined} />
              <AvatarFallback className="bg-primary/20 text-primary text-xs">
                {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">
                  {user.displayName || "Learner"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
