// ==============================================
// Coding Language Selection Page
// ==============================================

"use client";

import { LanguageCard } from "@/components/shared/language-card";
import { CODING_LANGUAGES } from "@/lib/constants";
import { Code2 } from "lucide-react";

export default function CodingPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Code2 className="h-7 w-7 text-primary" />
          Learn to Code
        </h1>
        <p className="text-muted-foreground mt-1">
          Choose a programming language to start learning with AI assistance.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CODING_LANGUAGES.map((lang) => (
          <LanguageCard
            key={lang.id}
            language={lang}
            progress={0}
            href={`/coding/${lang.id}`}
          />
        ))}
      </div>
    </div>
  );
}
