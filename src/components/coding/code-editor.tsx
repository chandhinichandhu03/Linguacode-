// ==============================================
// Code Editor Component (Monaco Editor Wrapper)
// ==============================================

"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import Monaco Editor (no SSR)
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <Skeleton className="w-full h-full rounded-lg" />
  ),
});

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language: string;
  height?: string;
  readOnly?: boolean;
}

export function CodeEditor({
  value,
  onChange,
  language,
  height = "400px",
  readOnly = false,
}: CodeEditorProps) {
  const { theme } = useTheme();

  return (
    <div className="rounded-lg overflow-hidden border border-border/50">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={onChange}
        theme={theme === "dark" ? "vs-dark" : "light"}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "var(--font-geist-mono), monospace",
          lineNumbers: "on",
          roundedSelection: true,
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
          readOnly,
          automaticLayout: true,
          wordWrap: "on",
          tabSize: 2,
          bracketPairColorization: { enabled: true },
        }}
      />
    </div>
  );
}
