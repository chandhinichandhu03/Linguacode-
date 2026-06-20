// ==============================================
// AI-Generated Learning Path Component
// ==============================================
// Generates topic-specific learning paths for any language.

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LearningPathProps {
  language: string;
  languageType: "spoken" | "coding";
  icon: string;
}

interface TopicItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  concepts: string[];
}

// Default topics per language type (used as fallback / initial display)
const CODING_DEFAULT_TOPICS: TopicItem[] = [
  { id: "basics", title: "Basics", description: "Variables, data types, and syntax fundamentals", icon: "📖", difficulty: "beginner", concepts: ["Variables", "Data Types", "Syntax", "Comments"] },
  { id: "variables", title: "Variables & Types", description: "Working with different data types and variables", icon: "📦", difficulty: "beginner", concepts: ["Integers", "Strings", "Booleans", "Type Conversion"] },
  { id: "operators", title: "Operators", description: "Arithmetic, comparison, and logical operators", icon: "➕", difficulty: "beginner", concepts: ["Arithmetic", "Comparison", "Logical", "Assignment"] },
  { id: "control-flow", title: "Control Flow", description: "If-else statements and conditional logic", icon: "🔀", difficulty: "beginner", concepts: ["If/Else", "Switch", "Ternary", "Nested Conditions"] },
  { id: "loops", title: "Loops", description: "For loops, while loops, and iteration", icon: "🔁", difficulty: "beginner", concepts: ["For Loop", "While Loop", "Break/Continue", "Nested Loops"] },
  { id: "functions", title: "Functions", description: "Defining and calling functions, parameters, return values", icon: "⚡", difficulty: "intermediate", concepts: ["Parameters", "Return Values", "Scope", "Recursion"] },
  { id: "arrays", title: "Arrays & Lists", description: "Working with collections of data", icon: "📊", difficulty: "intermediate", concepts: ["Indexing", "Slicing", "Methods", "Iteration"] },
  { id: "strings", title: "Strings", description: "String manipulation and formatting", icon: "✏️", difficulty: "intermediate", concepts: ["Concatenation", "Formatting", "Methods", "Regex"] },
  { id: "oop", title: "OOP", description: "Object-oriented programming concepts", icon: "🏗️", difficulty: "advanced", concepts: ["Classes", "Inheritance", "Polymorphism", "Encapsulation"] },
  { id: "error-handling", title: "Error Handling", description: "Try-catch, exceptions, and debugging", icon: "🛡️", difficulty: "advanced", concepts: ["Try/Catch", "Exceptions", "Custom Errors", "Debugging"] },
];

const SPOKEN_DEFAULT_TOPICS: TopicItem[] = [
  { id: "greetings", title: "Greetings", description: "Basic hello, goodbye, and introductions", icon: "👋", difficulty: "beginner", concepts: ["Hello", "Goodbye", "How are you?", "Introductions"] },
  { id: "numbers", title: "Numbers", description: "Counting, numbers, and basic math vocabulary", icon: "🔢", difficulty: "beginner", concepts: ["1-100", "Ordinals", "Math Terms", "Money"] },
  { id: "vocabulary", title: "Vocabulary", description: "Essential everyday words and phrases", icon: "📚", difficulty: "beginner", concepts: ["Common Words", "Phrases", "Idioms", "Expressions"] },
  { id: "grammar", title: "Grammar", description: "Sentence structure, tenses, and rules", icon: "📝", difficulty: "intermediate", concepts: ["Tenses", "Articles", "Prepositions", "Conjugation"] },
  { id: "pronunciation", title: "Pronunciation", description: "Sounds, accent, and phonetics", icon: "🗣️", difficulty: "beginner", concepts: ["Vowels", "Consonants", "Accent", "Intonation"] },
  { id: "conversation", title: "Conversation", description: "Daily dialogues and situational phrases", icon: "💬", difficulty: "intermediate", concepts: ["Shopping", "Restaurant", "Directions", "Travel"] },
  { id: "reading", title: "Reading", description: "Reading comprehension and scripts", icon: "📖", difficulty: "intermediate", concepts: ["Short Texts", "Stories", "Articles", "Scripts"] },
  { id: "writing", title: "Writing", description: "Writing sentences, paragraphs, and messages", icon: "✍️", difficulty: "intermediate", concepts: ["Sentences", "Paragraphs", "Letters", "Essays"] },
  { id: "culture", title: "Culture", description: "Cultural context and etiquette", icon: "🎌", difficulty: "advanced", concepts: ["Customs", "Traditions", "Etiquette", "History"] },
  { id: "advanced", title: "Advanced", description: "Complex grammar, literature, and fluency", icon: "🎓", difficulty: "advanced", concepts: ["Literature", "Debates", "Idioms", "Slang"] },
];

export function LearningPath({ language, languageType, icon }: LearningPathProps) {
  const [topics, setTopics] = useState<TopicItem[]>(
    languageType === "coding" ? CODING_DEFAULT_TOPICS : SPOKEN_DEFAULT_TOPICS
  );
  const [selectedTopic, setSelectedTopic] = useState<TopicItem | null>(null);
  const [aiContent, setAiContent] = useState<string | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(false);

  // Generate AI-tailored topics for this specific language
  const generateTopics = async () => {
    setLoadingTopics(true);
    try {
      const prompt = languageType === "coding"
        ? `Generate a learning path for ${language} programming. Return a JSON array of 10 topics in order from beginner to advanced. Each topic: {"id": "slug", "title": "Topic Name", "description": "One sentence", "icon": "single emoji", "difficulty": "beginner|intermediate|advanced", "concepts": ["concept1", "concept2", "concept3", "concept4"]}. Make topics specific to ${language} (e.g., for Python include list comprehension, decorators; for Java include JVM, Spring). Return ONLY the JSON array.`
        : `Generate a learning path for learning ${language} as a spoken language. Return a JSON array of 10 topics from beginner to advanced. Each topic: {"id": "slug", "title": "Topic Name", "description": "One sentence", "icon": "single emoji", "difficulty": "beginner|intermediate|advanced", "concepts": ["concept1", "concept2", "concept3", "concept4"]}. Make topics specific to ${language} culture and usage. Return ONLY the JSON array.`;

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          language: "English",
          systemPrompt: "You are a curriculum designer. Return ONLY valid JSON arrays. No markdown, no extra text.",
        }),
      });

      if (!res.ok) throw new Error("Failed");
      const data = await res.json();

      // Parse JSON from response
      let parsed;
      const text = data.response;
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        parsed = JSON.parse(text);
      }

      if (Array.isArray(parsed) && parsed.length > 0) {
        setTopics(parsed);
      }
    } catch (err) {
      console.error("Could not generate topics:", err);
    } finally {
      setLoadingTopics(false);
    }
  };

  // Generate AI content for a selected topic
  const loadTopicContent = async (topic: TopicItem) => {
    setSelectedTopic(topic);
    setLoadingContent(true);
    setAiContent(null);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: `Teach me about "${topic.title}" in ${language} ${languageType === "coding" ? "programming" : "language"}. Cover these concepts: ${topic.concepts.join(", ")}. Give a clear, structured lesson with examples. Keep it educational and beginner-friendly.`,
          }],
          language: "English",
          systemPrompt: `You are an expert ${language} ${languageType === "coding" ? "programming" : "language"} teacher. Provide clear, structured lessons with practical examples. Use simple formatting. No markdown code blocks — use plain text.`,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setAiContent(data.response);
    } catch {
      setAiContent("Could not load lesson. Please try again.");
    } finally {
      setLoadingContent(false);
    }
  };

  const difficultyColor: Record<string, string> = {
    beginner: "bg-green-500/10 text-green-600 border-green-500/20",
    intermediate: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    advanced: "bg-red-500/10 text-red-600 border-red-500/20",
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-lg">Learning Path</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={generateTopics}
          disabled={loadingTopics}
          className="text-xs"
        >
          {loadingTopics ? (
            <><Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />Generating...</>
          ) : (
            <><Sparkles className="h-3.5 w-3.5 mr-1" />AI Generate Topics</>
          )}
        </Button>
      </div>

      {/* Topic Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => loadTopicContent(topic)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 text-center group",
              selectedTopic?.id === topic.id
                ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                : "border-border/50 bg-card hover:border-primary/50 hover:shadow-sm"
            )}
          >
            <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
              {topic.icon}
            </span>
            <span className="text-sm font-medium leading-tight">{topic.title}</span>
          </button>
        ))}
      </div>

      {/* Selected Topic Content */}
      {selectedTopic && (
        <Card className="border-border/50 bg-card/80 animate-slide-up">
          <CardContent className="p-6">
            {/* Topic Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{selectedTopic.icon}</span>
              <div>
                <h3 className="font-bold text-xl">{selectedTopic.title} in {language}</h3>
                <p className="text-sm text-muted-foreground">{selectedTopic.description}</p>
              </div>
              <Badge variant="outline" className={cn("ml-auto text-[10px] capitalize", difficultyColor[selectedTopic.difficulty])}>
                {selectedTopic.difficulty}
              </Badge>
            </div>

            {/* Concepts */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedTopic.concepts.map((c) => (
                <Badge key={c} variant="secondary" className="text-xs">
                  {c}
                </Badge>
              ))}
            </div>

            {/* AI Content */}
            {loadingContent ? (
              <div className="flex items-center justify-center py-12 gap-2 text-primary">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">Generating lesson...</span>
              </div>
            ) : aiContent ? (
              <div className="bg-muted/30 rounded-xl p-5 text-sm leading-relaxed whitespace-pre-wrap border border-border/20">
                {aiContent}
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
