// ==============================================
// Vocabulary Learning Page
// ==============================================

"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VocabCard } from "@/components/language/vocab-card";
import { SPOKEN_LANGUAGES } from "@/lib/constants";
import { ArrowLeft, RefreshCw, Loader2, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";
import { toast } from "sonner";

// Default vocabulary for initial display
const defaultVocab = [
  { word: "Hello", translation: "A greeting", pronunciation: "heh-LOH", example: "Hello, how are you today?" },
  { word: "Thank you", translation: "Expression of gratitude", pronunciation: "THANK yoo", example: "Thank you for helping me!" },
  { word: "Goodbye", translation: "Farewell", pronunciation: "good-BYE", example: "Goodbye, see you tomorrow!" },
  { word: "Please", translation: "Polite request", pronunciation: "PLEEZ", example: "Please pass me the salt." },
  { word: "Sorry", translation: "Apology", pronunciation: "SOR-ee", example: "I'm sorry for being late." },
  { word: "Friend", translation: "A companion", pronunciation: "FREND", example: "She is my best friend." },
];

export default function VocabPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const language = SPOKEN_LANGUAGES.find((l) => l.id === lang);
  const [vocab, setVocab] = useState(defaultVocab);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("common phrases");
  const [learned, setLearned] = useState<number[]>([]);

  if (!language) return notFound();

  const generateNewVocab = async () => {
    setLoading(true);
    try {
      const topics = ["greetings", "food", "travel", "family", "weather", "shopping", "emotions"];
      const newTopic = topics[Math.floor(Math.random() * topics.length)];
      setTopic(newTopic);

      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Generate 6 ${language.name} vocabulary words about "${newTopic}". Return a JSON array where each object has: "word" (in ${language.name}), "translation" (English), "pronunciation" (romanized), "example" (example sentence). Return ONLY the JSON array.`,
            },
          ],
          language: language.name,
          systemPrompt: `You are a ${language.name} vocabulary teacher. Return only valid JSON arrays with vocabulary items.`,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate vocab");

      const data = await response.json();
      const text = data.response;
      const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const parsed = JSON.parse(cleaned);
      setVocab(parsed);
      setLearned([]);
      toast.success(`New ${newTopic} vocabulary loaded!`);
    } catch {
      toast.error("Failed to generate new vocabulary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/languages/${lang}`}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {language.icon} Vocabulary
            </h1>
            <p className="text-sm text-muted-foreground">
              Topic: <span className="capitalize">{topic}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {learned.length}/{vocab.length} learned
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={generateNewVocab}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-1" />
            )}
            New Words
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vocab.map((v, i) => (
          <VocabCard
            key={`${v.word}-${i}`}
            word={v.word}
            translation={v.translation}
            pronunciation={v.pronunciation}
            example={v.example}
            onMarkLearned={() => {
              if (!learned.includes(i)) {
                setLearned([...learned, i]);
                toast.success("Word marked as learned! +5 XP");
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
