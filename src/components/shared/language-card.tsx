// ==============================================
// Language Selection Card Component
// ==============================================

"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/shared/progress-bar";
import { LanguageInfo } from "@/types";

interface LanguageCardProps {
  language: LanguageInfo;
  progress?: number; // 0-100
  href: string;
}

export function LanguageCard({ language, progress = 0, href }: LanguageCardProps) {
  return (
    <Link href={href} className="block">
      <Card className="card-hover cursor-pointer group border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl" role="img" aria-label={language.name}>
                {language.icon}
              </span>
              <div>
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {language.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language.nativeName}
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="text-xs"
              style={{
                borderColor: language.color + "40",
                color: language.color,
              }}
            >
              {language.type === "spoken" ? "Language" : "Coding"}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {language.description}
          </p>

          <ProgressBar
            value={progress}
            size="sm"
            color={language.color}
            showPercentage={progress > 0}
          />

          {progress === 0 && (
            <p className="text-xs text-muted-foreground mt-2">Not started yet</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
