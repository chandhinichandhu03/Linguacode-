// ==============================================
// Code Output / AI Response Panel
// ==============================================

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Loader2 } from "lucide-react";

interface CodeOutputProps {
  content: string;
  loading: boolean;
  title?: string;
}

export function CodeOutput({
  content,
  loading,
  title = "AI Response",
}: CodeOutputProps) {
  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Bot className="h-4 w-4 text-primary" />
          {title}
          {loading && (
            <Badge variant="secondary" className="text-xs">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Thinking...
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
            <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
          </div>
        ) : content ? (
          <div className="text-sm whitespace-pre-wrap leading-relaxed font-mono bg-muted/50 p-4 rounded-lg max-h-[400px] overflow-y-auto">
            {content}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            Write some code and click &quot;Explain&quot; or &quot;Debug&quot; to
            get AI assistance.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
