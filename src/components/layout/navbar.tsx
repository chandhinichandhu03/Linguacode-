// ==============================================
// Top Navbar Component
// ==============================================

"use client";

import { GraduationCap, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        {/* Logo (visible on mobile only since sidebar has it on desktop) */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-base bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            LinguaCode
          </span>
        </div>

        {/* Spacer for desktop */}
        <div className="hidden md:block" />

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="relative h-9 w-9 rounded-full cursor-pointer outline-none">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.photoURL || undefined} />
                <AvatarFallback className="bg-primary/20 text-primary text-xs">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">
                    {user?.displayName || "Learner"}
                  </p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings" className="w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => signOut()}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
