// ==============================================
// Language Selection Page
// ==============================================

"use client";

import { LanguageCard } from "@/components/shared/language-card";
import { SPOKEN_LANGUAGES } from "@/lib/constants";
import { Languages } from "lucide-react";

export default function LanguagesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Languages className="h-7 w-7 text-primary" />
          Learn a Language
        </h1>
        <p className="text-muted-foreground mt-1">
          Choose a language to start practicing with your AI tutor.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SPOKEN_LANGUAGES.map((lang) => (
          <LanguageCard
            key={lang.id}
            language={lang}
            progress={0}
            href={`/languages/${lang.id}`}
          />
        ))}
      </div>
    </div>
  );
}
