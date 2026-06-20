// ==============================================
// NLP Landing Page
// ==============================================

"use client";

import Link from "next/link";
import { NLPTopicCard } from "@/components/nlp/nlp-topic-card";
import { NLP_TOPICS } from "@/lib/constants";
import { Brain, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NLPPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 p-8 md:p-12 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-40" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Natural Language Processing
          </h1>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            Explore the fascinating world of NLP — learn how machines understand, interpret,
            and generate human language. Interactive demos, video lessons, and AI-powered explanations.
          </p>
          <div className="flex gap-3 mt-6">
            <Badge className="bg-white/15 text-white border-white/20">
              {NLP_TOPICS.length} Topics
            </Badge>
            <Badge className="bg-white/15 text-white border-white/20">
              Interactive Demos
            </Badge>
            <Badge className="bg-white/15 text-white border-white/20">
              Video Lessons
            </Badge>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Explore NLP Topics
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {NLP_TOPICS.map((topic) => (
            <Link key={topic.id} href={`/nlp/${topic.id}`}>
              <NLPTopicCard topic={topic} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
