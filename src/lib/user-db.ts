// ==============================================
// User Database Service (localStorage-backed)
// ==============================================
// Provides a structured database layer over localStorage
// for persisting user details, progress, quiz history,
// coding challenge progress, and activity tracking.

import { UserProfile, LanguageProgress, QuizResult, ActivityItem } from "@/types";

const DB_PREFIX = "lcdb_";

// --- User Details Database ---
export interface UserRecord {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  createdAt: string;
  lastActive: string;
  streak: number;
  xp: number;
  bookmarks: string[];
  bio: string;
  preferredLanguage: string;
  totalQuizzesTaken: number;
  totalChallengesSolved: number;
  totalLessonsCompleted: number;
  totalVocabLearned: number;
  joinedDate: string;
  level: number;
  badges: string[];
}

// --- Database Operations ---

function getKey(collection: string, id?: string): string {
  return id ? `${DB_PREFIX}${collection}_${id}` : `${DB_PREFIX}${collection}`;
}

function getAll<T>(collection: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const index = localStorage.getItem(getKey(collection, "__index"));
    if (!index) return [];
    const ids: string[] = JSON.parse(index);
    return ids.map(id => {
      const item = localStorage.getItem(getKey(collection, id));
      return item ? JSON.parse(item) : null;
    }).filter(Boolean);
  } catch { return []; }
}

function getById<T>(collection: string, id: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(getKey(collection, id));
    return item ? JSON.parse(item) : null;
  } catch { return null; }
}

function save<T extends { uid?: string; id?: string }>(collection: string, item: T): void {
  if (typeof window === "undefined") return;
  const id = item.uid || item.id || "";
  localStorage.setItem(getKey(collection, id), JSON.stringify(item));
  // Update index
  const indexKey = getKey(collection, "__index");
  const indexStr = localStorage.getItem(indexKey);
  const ids: string[] = indexStr ? JSON.parse(indexStr) : [];
  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem(indexKey, JSON.stringify(ids));
  }
}

function remove(collection: string, id: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(getKey(collection, id));
  const indexKey = getKey(collection, "__index");
  const indexStr = localStorage.getItem(indexKey);
  if (indexStr) {
    const ids: string[] = JSON.parse(indexStr).filter((i: string) => i !== id);
    localStorage.setItem(indexKey, JSON.stringify(ids));
  }
}

// =====================
// User CRUD Operations
// =====================

export function createUser(profile: UserProfile): UserRecord {
  const record: UserRecord = {
    uid: profile.uid,
    displayName: profile.displayName,
    email: profile.email,
    photoURL: profile.photoURL,
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    streak: profile.streak || 0,
    xp: profile.xp || 0,
    bookmarks: profile.bookmarks || [],
    bio: "",
    preferredLanguage: "english",
    totalQuizzesTaken: 0,
    totalChallengesSolved: 0,
    totalLessonsCompleted: 0,
    totalVocabLearned: 0,
    joinedDate: new Date().toISOString(),
    level: 1,
    badges: ["🎉 Welcome"],
  };
  save("users", record);
  return record;
}

export function getUser(uid: string): UserRecord | null {
  return getById<UserRecord>("users", uid);
}

export function updateUser(uid: string, updates: Partial<UserRecord>): UserRecord | null {
  const user = getUser(uid);
  if (!user) return null;
  const updated = { ...user, ...updates, lastActive: new Date().toISOString() };
  save("users", updated);
  return updated;
}

export function getAllUsers(): UserRecord[] {
  return getAll<UserRecord>("users");
}

export function deleteUser(uid: string): void {
  remove("users", uid);
}

// ============================
// Progress Tracking Operations
// ============================

export interface ProgressRecord {
  uid: string;
  languageId: string;
  type: "spoken" | "coding";
  lessonsCompleted: number;
  quizScores: number[];
  vocabLearned: number;
  challengesSolved: number;
  lastAccessed: string;
}

export function saveProgress(uid: string, languageId: string, progress: Partial<ProgressRecord>): void {
  const key = `${uid}_${languageId}`;
  const existing = getById<ProgressRecord>("progress", key);
  const record: ProgressRecord = {
    uid,
    languageId,
    type: progress.type || "spoken",
    lessonsCompleted: progress.lessonsCompleted ?? existing?.lessonsCompleted ?? 0,
    quizScores: progress.quizScores ?? existing?.quizScores ?? [],
    vocabLearned: progress.vocabLearned ?? existing?.vocabLearned ?? 0,
    challengesSolved: progress.challengesSolved ?? existing?.challengesSolved ?? 0,
    lastAccessed: new Date().toISOString(),
  };
  save("progress", { ...record, uid: key });
}

export function getProgress(uid: string, languageId: string): ProgressRecord | null {
  return getById<ProgressRecord>("progress", `${uid}_${languageId}`);
}

export function getAllProgress(uid: string): ProgressRecord[] {
  return getAll<ProgressRecord>("progress").filter(p => p.uid.startsWith(uid));
}

// ============================
// Quiz History Operations
// ============================

export interface QuizHistoryRecord {
  id: string;
  uid: string;
  language: string;
  topic: string;
  difficulty: string;
  score: number;
  total: number;
  timestamp: string;
}

export function saveQuizResult(uid: string, result: Omit<QuizHistoryRecord, "id" | "uid" | "timestamp">): void {
  const record: QuizHistoryRecord = {
    id: `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    uid,
    ...result,
    timestamp: new Date().toISOString(),
  };
  save("quizHistory", { ...record, uid: record.id });
  
  // Update user stats
  const user = getUser(uid);
  if (user) {
    updateUser(uid, {
      totalQuizzesTaken: (user.totalQuizzesTaken || 0) + 1,
      xp: (user.xp || 0) + result.score * 10,
    });
  }
}

export function getQuizHistory(uid: string): QuizHistoryRecord[] {
  return getAll<QuizHistoryRecord>("quizHistory").filter(q => q.uid === uid || true);
}

// ============================
// Activity Log Operations
// ============================

export interface ActivityRecord {
  id: string;
  uid: string;
  type: "lesson" | "quiz" | "chat" | "challenge" | "vocab" | "voice";
  title: string;
  language: string;
  timestamp: string;
  score?: number;
  xpEarned?: number;
}

export function logActivity(uid: string, activity: Omit<ActivityRecord, "id" | "uid" | "timestamp">): void {
  const record: ActivityRecord = {
    id: `act_${Date.now()}`,
    uid,
    ...activity,
    timestamp: new Date().toISOString(),
  };
  save("activities", { ...record, uid: record.id });
}

export function getRecentActivities(uid: string, limit = 20): ActivityRecord[] {
  return getAll<ActivityRecord>("activities")
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

// ============================
// Leaderboard
// ============================

export function getLeaderboard(): UserRecord[] {
  return getAllUsers()
    .sort((a, b) => (b.xp || 0) - (a.xp || 0))
    .slice(0, 50);
}

// ============================
// Initialize user in DB on signup
// ============================

export function ensureUserInDB(profile: UserProfile): UserRecord {
  const existing = getUser(profile.uid);
  if (existing) {
    return updateUser(profile.uid, { lastActive: new Date().toISOString() })!;
  }
  return createUser(profile);
}
