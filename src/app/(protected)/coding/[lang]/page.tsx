// ==============================================
// Coding Learning Hub Page
// ==============================================

"use client";

import { use } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/shared/progress-bar";
import { LearningPath } from "@/components/shared/learning-path";
import { CODING_LANGUAGES } from "@/lib/constants";
import {
  Code2,
  Puzzle,
  Brain,
  ArrowRight,
  ArrowLeft,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

const sections = [
  {
    id: "editor",
    title: "Code Editor",
    description: "Write code with AI explanation and debugging",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "challenges",
    title: "Coding Challenges",
    description: "Solve AI-generated practice problems",
    icon: Puzzle,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "quiz",
    title: "Knowledge Quiz",
    description: "Test your programming concepts",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
  },
];

export default function CodingHubPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const language = CODING_LANGUAGES.find((l) => l.id === lang);

  if (!language) return notFound();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/coding">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{language.icon}</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{language.name}</h1>
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
            <span className="text-sm font-medium">Learning Progress</span>
            <Badge variant="secondary">Beginner</Badge>
          </div>
          <ProgressBar value={10} color={language.color} />
        </CardContent>
      </Card>

      {/* AI-Generated Learning Path */}
      <LearningPath
        language={language.name}
        languageType="coding"
        icon={language.icon}
      />

      {/* Sections */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link key={section.id} href={`/coding/${lang}/${section.id}`}>
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
                  Open
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {/* Video Tutorials Quick Access */}
        <Link href={`/videos/${lang}`}>
          <Card className="card-hover border-border/50 bg-card/80 cursor-pointer group h-full">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <PlayCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                Video Tutorials
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Watch {language.name} tutorials from YouTube
              </p>
              <div className="flex items-center text-primary text-sm font-medium">
                Browse Videos
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
