// ==============================================
// AI Code Assistant Side Panel
// ==============================================

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeOutput } from "@/components/coding/code-output";
import { Lightbulb, Bug, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface AIAssistantProps {
  code: string;
  language: string;
}

export function AIAssistant({ code, language }: AIAssistantProps) {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"explain" | "debug">("explain");

  const getAIHelp = async (action: "explain" | "debug") => {
    if (!code.trim()) {
      toast.error("Please write some code first");
      return;
    }

    setLoading(true);
    setMode(action);

    try {
      const endpoint =
        action === "explain" ? "/api/ai/code-explain" : "/api/ai/code-debug";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      if (!res.ok) throw new Error("Failed to get AI help");

      const data = await res.json();
      setResponse(data.response);
    } catch {
      toast.error("Failed to get AI assistance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => getAIHelp("explain")}
          disabled={loading}
          className="flex-1"
        >
          <Lightbulb className="h-4 w-4 mr-1" />
          Explain
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => getAIHelp("debug")}
          disabled={loading}
          className="flex-1"
        >
          <Bug className="h-4 w-4 mr-1" />
          Debug
        </Button>
      </div>

      <CodeOutput
        content={response}
        loading={loading}
        title={mode === "explain" ? "Code Explanation" : "Debug Analysis"}
      />
    </div>
  );
}
