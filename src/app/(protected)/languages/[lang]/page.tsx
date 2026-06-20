// ==============================================
// Language Learning Hub Page
// ==============================================
// Landing page for a specific language with sections.

"use client";

import { use } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/shared/progress-bar";
import { LearningPath } from "@/components/shared/learning-path";
import { SPOKEN_LANGUAGES } from "@/lib/constants";
import { GrammarChecker } from "@/components/language/grammar-checker";
import {
  MessageSquare,
  BookOpen,
  Brain,
  SpellCheck2,
  ArrowRight,
  ArrowLeft,
  AudioWaveform,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

const sections = [
  {
    id: "chat",
    title: "Conversation Practice",
    description: "Chat with AI to practice speaking and writing",
    icon: MessageSquare,
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
  },
  {
    id: "vocab",
    title: "Vocabulary Cards",
    description: "Learn new words with AI-generated flashcards",
    icon: BookOpen,
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-500/10",
  },
  {
    id: "quiz",
    title: "Quizzes & Tests",
    description: "Test your knowledge with adaptive quizzes",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-500/10",
  },
];

export default function LanguageHubPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const language = SPOKEN_LANGUAGES.find((l) => l.id === lang);

  if (!language) return notFound();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/languages">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{language.icon}</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {language.name}
              <span className="text-muted-foreground ml-2 text-lg font-normal">
                {language.nativeName}
              </span>
            </h1>
            <p className="text-muted-foreground text-sm">
              {language.description}
            </p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <Card className="border-border/50 bg-card/80">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Overall Progress</span>
            <Badge variant="secondary">Beginner</Badge>
          </div>
          <ProgressBar value={15} color={language.color} />
        </CardContent>
      </Card>

      {/* AI-Generated Learning Path */}
      <LearningPath
        language={language.name}
        languageType="spoken"
        icon={language.icon}
      />

      {/* Learning Sections */}
      <div className="grid sm:grid-cols-2 gap-4">
        {sections.map((section) => (
          <Link
            key={section.id}
            href={`/languages/${lang}/${section.id}`}
          >
            <Card className="card-hover border-border/50 bg-card/80 cursor-pointer group h-full">
              <CardContent className="p-6">
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {section.description}
                </p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Start learning
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {/* Voice Studio Quick Access */}
        <Link href="/voice-studio">
          <Card className="card-hover border-border/50 bg-card/80 cursor-pointer group h-full">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <AudioWaveform className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                Voice Studio
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Practice {language.name} pronunciation with AI voice tools
              </p>
              <div className="flex items-center text-primary text-sm font-medium">
                Open Studio
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Grammar Checker */}
        <GrammarChecker language={language.name} />
      </div>
    </div>
  );
}
