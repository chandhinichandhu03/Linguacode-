// ==============================================
// Constants for the AI Learning Platform
// ==============================================

import { LanguageInfo } from "@/types";

// --- Spoken Languages ---
export const SPOKEN_LANGUAGES: LanguageInfo[] = [
  {
    id: "english",
    name: "English",
    nativeName: "English",
    icon: "🇬🇧",
    color: "#3B82F6",
    description: "The global lingua franca — master business, tech, and travel communication.",
    type: "spoken",
  },
  {
    id: "japanese",
    name: "Japanese",
    nativeName: "日本語",
    icon: "🇯🇵",
    color: "#EF4444",
    description: "Unlock anime, manga, and one of the world's richest cultures.",
    type: "spoken",
  },
  {
    id: "spanish",
    name: "Spanish",
    nativeName: "Español",
    icon: "🇪🇸",
    color: "#F59E0B",
    description: "Spoken by 500M+ people — connect across continents.",
    type: "spoken",
  },
  {
    id: "hindi",
    name: "Hindi",
    nativeName: "हिन्दी",
    icon: "🇮🇳",
    color: "#F97316",
    description: "India's most widely spoken language — rich in poetry and film.",
    type: "spoken",
  },
  {
    id: "tamil",
    name: "Tamil",
    nativeName: "தமிழ்",
    icon: "🇮🇳",
    color: "#8B5CF6",
    description: "One of the world's oldest living languages with 80M+ speakers.",
    type: "spoken",
  },
];

// --- Programming Languages ---
export const CODING_LANGUAGES: LanguageInfo[] = [
  {
    id: "python",
    name: "Python",
    nativeName: "Python",
    icon: "🐍",
    color: "#3776AB",
    description: "The go-to language for AI, data science, and rapid prototyping.",
    type: "coding",
  },
  {
    id: "javascript",
    name: "JavaScript",
    nativeName: "JavaScript",
    icon: "⚡",
    color: "#F7DF1E",
    description: "The language of the web — build interactive sites and full-stack apps.",
    type: "coding",
  },
  {
    id: "typescript",
    name: "TypeScript",
    nativeName: "TypeScript",
    icon: "🔷",
    color: "#3178C6",
    description: "JavaScript with types — safer, scalable, enterprise-grade development.",
    type: "coding",
  },
  {
    id: "cpp",
    name: "C++",
    nativeName: "C++",
    icon: "⚙️",
    color: "#00599C",
    description: "High-performance systems programming — games, engines, and embedded.",
    type: "coding",
  },
  {
    id: "c",
    name: "C",
    nativeName: "C",
    icon: "🔧",
    color: "#A8B9CC",
    description: "The foundation of modern computing — OS kernels, drivers, and embedded systems.",
    type: "coding",
  },
  {
    id: "java",
    name: "Java",
    nativeName: "Java",
    icon: "☕",
    color: "#ED8B00",
    description: "Enterprise powerhouse — Android, backend, and large-scale systems.",
    type: "coding",
  },
  {
    id: "csharp",
    name: "C#",
    nativeName: "C#",
    icon: "🟣",
    color: "#68217A",
    description: "Microsoft's modern language — Unity games, .NET apps, and cloud services.",
    type: "coding",
  },
  {
    id: "go",
    name: "Go",
    nativeName: "Go",
    icon: "🐹",
    color: "#00ADD8",
    description: "Google's language for cloud infrastructure — fast, simple, concurrent.",
    type: "coding",
  },
  {
    id: "rust",
    name: "Rust",
    nativeName: "Rust",
    icon: "🦀",
    color: "#CE422B",
    description: "Memory-safe systems programming — blazing fast with zero-cost abstractions.",
    type: "coding",
  },
  {
    id: "ruby",
    name: "Ruby",
    nativeName: "Ruby",
    icon: "💎",
    color: "#CC342D",
    description: "Elegant and productive — Rails web development and scripting.",
    type: "coding",
  },
  {
    id: "swift",
    name: "Swift",
    nativeName: "Swift",
    icon: "🍎",
    color: "#FA7343",
    description: "Apple's modern language — iOS, macOS, and watchOS development.",
    type: "coding",
  },
  {
    id: "kotlin",
    name: "Kotlin",
    nativeName: "Kotlin",
    icon: "🟠",
    color: "#7F52FF",
    description: "Modern Android development — concise, safe, and interoperable with Java.",
    type: "coding",
  },
  {
    id: "php",
    name: "PHP",
    nativeName: "PHP",
    icon: "🐘",
    color: "#777BB4",
    description: "Powers 80% of the web — WordPress, Laravel, and server-side scripting.",
    type: "coding",
  },
  {
    id: "sql",
    name: "SQL",
    nativeName: "SQL",
    icon: "🗃️",
    color: "#336791",
    description: "The language of databases — query, manage, and analyze structured data.",
    type: "coding",
  },
  {
    id: "htmlcss",
    name: "HTML/CSS",
    nativeName: "HTML/CSS",
    icon: "🎨",
    color: "#E34F26",
    description: "The building blocks of every website — structure meets style.",
    type: "coding",
  },
];

// --- All Languages Combined ---
export const ALL_LANGUAGES = [...SPOKEN_LANGUAGES, ...CODING_LANGUAGES];

// --- Monaco Editor Language Mapping ---
export const MONACO_LANGUAGE_MAP: Record<string, string> = {
  python: "python",
  javascript: "javascript",
  typescript: "typescript",
  cpp: "cpp",
  c: "c",
  java: "java",
  csharp: "csharp",
  go: "go",
  rust: "rust",
  ruby: "ruby",
  swift: "swift",
  kotlin: "kotlin",
  php: "php",
  sql: "sql",
  htmlcss: "html",
};

// --- Difficulty Levels ---
export const DIFFICULTY_LEVELS = [
  { id: "easy", name: "Easy", color: "#22C55E" },
  { id: "medium", name: "Medium", color: "#F59E0B" },
  { id: "hard", name: "Hard", color: "#EF4444" },
] as const;

// --- NLP Topics ---
export interface NLPTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  concepts: string[];
}

export const NLP_TOPICS: NLPTopic[] = [
  {
    id: "tokenization",
    title: "Tokenization",
    description: "Break text into words, sentences, and subwords — the first step in any NLP pipeline.",
    icon: "✂️",
    color: "from-blue-500 to-cyan-500",
    difficulty: "beginner",
    concepts: ["Word Tokenization", "Sentence Tokenization", "Subword Tokenization", "BPE"],
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis",
    description: "Determine the emotional tone of text — positive, negative, or neutral.",
    icon: "😊",
    color: "from-green-500 to-emerald-500",
    difficulty: "beginner",
    concepts: ["Polarity Detection", "Subjectivity", "Aspect-Based Sentiment", "VADER"],
  },
  {
    id: "named-entity-recognition",
    title: "Named Entity Recognition",
    description: "Identify and classify named entities like people, places, and organizations in text.",
    icon: "🏷️",
    color: "from-purple-500 to-pink-500",
    difficulty: "intermediate",
    concepts: ["Entity Types", "IOB Tagging", "SpaCy NER", "Custom NER Models"],
  },
  {
    id: "pos-tagging",
    title: "POS Tagging",
    description: "Label words with their parts of speech — nouns, verbs, adjectives, and more.",
    icon: "🏗️",
    color: "from-orange-500 to-yellow-500",
    difficulty: "beginner",
    concepts: ["Penn Treebank Tags", "Dependency Parsing", "Constituency Parsing", "Syntax Trees"],
  },
  {
    id: "text-classification",
    title: "Text Classification",
    description: "Categorize documents into predefined classes using ML and deep learning.",
    icon: "📂",
    color: "from-indigo-500 to-blue-500",
    difficulty: "intermediate",
    concepts: ["Bag of Words", "TF-IDF", "Naive Bayes", "Deep Learning Classifiers"],
  },
  {
    id: "word-embeddings",
    title: "Word Embeddings",
    description: "Represent words as dense vectors that capture semantic meaning and relationships.",
    icon: "🔮",
    color: "from-violet-500 to-purple-500",
    difficulty: "intermediate",
    concepts: ["Word2Vec", "GloVe", "FastText", "Contextual Embeddings"],
  },
  {
    id: "transformers",
    title: "Transformers & LLMs",
    description: "The architecture behind GPT, BERT, and modern language models.",
    icon: "🤖",
    color: "from-rose-500 to-red-500",
    difficulty: "advanced",
    concepts: ["Self-Attention", "Multi-Head Attention", "BERT", "GPT Architecture"],
  },
  {
    id: "text-generation",
    title: "Text Generation",
    description: "Generate human-like text using language models and creative AI techniques.",
    icon: "✍️",
    color: "from-teal-500 to-cyan-500",
    difficulty: "advanced",
    concepts: ["Autoregressive Models", "Beam Search", "Temperature Sampling", "Prompt Engineering"],
  },
];

// --- Navigation Items ---
export const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/languages", label: "Languages", icon: "Languages" },
  { href: "/coding", label: "Coding", icon: "Code2" },
  { href: "/nlp", label: "NLP", icon: "Brain" },
  { href: "/voice-studio", label: "Voice Studio", icon: "AudioWaveform" },
  { href: "/videos", label: "Videos", icon: "PlayCircle" },
  { href: "/chat", label: "AI Chat", icon: "MessageSquare" },
  { href: "/leaderboard", label: "Leaderboard", icon: "Trophy" },
  { href: "/profile", label: "Profile", icon: "User" },
  { href: "/settings", label: "Settings", icon: "Settings" },
] as const;
