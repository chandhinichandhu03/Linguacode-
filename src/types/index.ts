// ==============================================
// Type Definitions for the AI Learning Platform
// ==============================================

// --- User Types ---
export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  createdAt: Date;
  streak: number;
  lastActive: Date;
  xp: number;
  bookmarks: string[];
}

// --- Progress Types ---
export interface LanguageProgress {
  type: "spoken" | "coding";
  lessonsCompleted: number;
  quizScores: number[];
  vocabLearned: number;
  lastAccessed: Date;
}

// --- Chat Types ---
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  correction?: string; // For grammar corrections
}

export interface ChatSession {
  id: string;
  language: string;
  messages: ChatMessage[];
  createdAt: Date;
}

// --- Quiz Types ---
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: "multiple-choice" | "fill-in-blank" | "code-output";
}

export interface Quiz {
  id: string;
  language: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  questions: QuizQuestion[];
}

export interface QuizResult {
  quizId: string;
  language: string;
  score: number;
  totalQuestions: number;
  timestamp: Date;
}

// --- Vocabulary Types ---
export interface VocabCard {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
  example: string;
  language: string;
  learned: boolean;
}

// --- Coding Types ---
export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  language: string;
  starterCode: string;
  hints: string[];
}

// --- Leaderboard Types ---
export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  photoURL: string | null;
  xp: number;
  streak: number;
  lessonsCompleted: number;
}

// --- Activity Types ---
export interface ActivityItem {
  id: string;
  type: "lesson" | "quiz" | "chat" | "challenge" | "vocab";
  title: string;
  language: string;
  timestamp: Date;
  score?: number;
}

// --- Language Metadata ---
export interface LanguageInfo {
  id: string;
  name: string;
  nativeName: string;
  icon: string;
  color: string;
  description: string;
  type: "spoken" | "coding";
}
