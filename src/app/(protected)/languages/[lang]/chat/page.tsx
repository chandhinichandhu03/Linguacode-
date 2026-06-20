// ==============================================
// Language Chat Page
// ==============================================

"use client";

import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "@/components/language/chat-interface";
import { SPOKEN_LANGUAGES } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default function LanguageChatPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const language = SPOKEN_LANGUAGES.find((l) => l.id === lang);

  if (!language) return notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <Link href={`/languages/${lang}`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            {language.icon} {language.name} Conversation
          </h1>
          <p className="text-sm text-muted-foreground">
            Practice {language.name} with your AI tutor
          </p>
        </div>
      </div>

      <ChatInterface
        language={language.name}
        placeholder={`Write in ${language.name} or English...`}
      />
    </div>
  );
}
