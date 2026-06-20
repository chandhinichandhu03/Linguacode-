// ==============================================
// Mobile Bottom Navigation Bar
// ==============================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Languages,
  Code2,
  Brain,
  AudioWaveform,
  PlayCircle,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const primaryNavItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/languages", label: "Languages", icon: Languages },
  { href: "/coding", label: "Code", icon: Code2 },
  { href: "/nlp", label: "NLP", icon: Brain },
  { href: "/videos", label: "Videos", icon: PlayCircle },
];

const moreNavItems = [
  { href: "/voice-studio", label: "Voice Studio", icon: AudioWaveform },
];

export function MobileNav() {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {/* More menu overlay */}
      {showMore && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/40 backdrop-blur-sm"
          onClick={() => setShowMore(false)}
        >
          <div className="absolute bottom-20 left-4 right-4 bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50 p-3 shadow-2xl animate-slide-up">
            {moreNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setShowMore(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom nav bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border/50 bg-background/90 backdrop-blur-xl safe-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {primaryNavItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px]",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div
                  className={cn(
                    "p-1.5 rounded-lg transition-all duration-200",
                    isActive && "bg-primary/10"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive && "scale-110")} />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px]",
              showMore
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className={cn("p-1.5 rounded-lg transition-all duration-200", showMore && "bg-primary/10")}>
              <MoreHorizontal className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
