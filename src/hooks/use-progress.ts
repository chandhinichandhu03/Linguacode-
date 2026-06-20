// ==============================================
// Progress Tracking Hook (Local Storage Mock)
// ==============================================
// Hook for reading and writing user progress to localStorage.

"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/context/auth-context";
import { LanguageProgress, ActivityItem } from "@/types";

export function useProgress() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Helper to get storage keys
  const getProgressKey = (uid: string, langId: string) => `lc_progress_${uid}_${langId}`;
  const getActivitiesKey = (uid: string) => `lc_activities_${uid}`;

  // --- Get progress for a specific language ---
  const getProgress = useCallback(
    async (languageId: string): Promise<LanguageProgress | null> => {
      if (!user) return null;
      setLoading(true);
      try {
        const key = getProgressKey(user.uid, languageId);
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) as LanguageProgress : null;
      } catch (error) {
        console.error("Error fetching progress:", error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  // --- Update progress for a language ---
  const updateProgress = useCallback(
    async (languageId: string, data: Partial<LanguageProgress>) => {
      if (!user) return;
      try {
        const key = getProgressKey(user.uid, languageId);
        const existing = localStorage.getItem(key);
        
        let newProgress: LanguageProgress;
        if (existing) {
          const parsed = JSON.parse(existing);
          newProgress = { 
            ...parsed, 
            ...data, 
            lastAccessed: new Date() 
          };
        } else {
          newProgress = {
            type: "spoken",
            lessonsCompleted: 0,
            quizScores: [],
            vocabLearned: 0,
            // @ts-ignore
            lastAccessed: new Date(),
            ...data,
          } as LanguageProgress;
        }
        
        localStorage.setItem(key, JSON.stringify(newProgress));
      } catch (error) {
        console.error("Error updating progress:", error);
      }
    },
    [user]
  );

  // --- Add XP to user ---
  const addXP = useCallback(
    async (amount: number) => {
      if (!user) return;
      try {
        // @ts-ignore - Using the utility we added to window in auth-context
        if (window.__updateProfile) {
          const profileStr = localStorage.getItem("lc_profile");
          if (profileStr) {
            const profile = JSON.parse(profileStr);
            // @ts-ignore
            window.__updateProfile({ 
              xp: (profile.xp || 0) + amount,
              lastActive: new Date() 
            });
          }
        }
      } catch (error) {
        console.error("Error adding XP:", error);
      }
    },
    [user]
  );

  // --- Update streak ---
  const updateStreak = useCallback(async () => {
    if (!user) return;
    try {
      const profileStr = localStorage.getItem("lc_profile");
      if (profileStr) {
        const profile = JSON.parse(profileStr);
        const lastActive = profile.lastActive ? new Date(profile.lastActive) : new Date(0);
        const now = new Date();
        const hoursSinceActive = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);

        // @ts-ignore
        if (window.__updateProfile) {
          if (hoursSinceActive > 24 && hoursSinceActive < 48) {
            // @ts-ignore
            window.__updateProfile({ streak: (profile.streak || 0) + 1, lastActive: now });
          } else if (hoursSinceActive >= 48) {
            // @ts-ignore
            window.__updateProfile({ streak: 1, lastActive: now });
          } else {
            // Just update last active
            // @ts-ignore
            window.__updateProfile({ lastActive: now });
          }
        }
      }
    } catch (error) {
      console.error("Error updating streak:", error);
    }
  }, [user]);

  // --- Log activity ---
  const logActivity = useCallback(
    async (activity: Omit<ActivityItem, "id" | "timestamp">) => {
      if (!user) return;
      try {
        const key = getActivitiesKey(user.uid);
        const existing = localStorage.getItem(key);
        const activities: ActivityItem[] = existing ? JSON.parse(existing) : [];
        
        const newActivity: ActivityItem = {
          ...activity,
          id: Math.random().toString(36).substr(2, 9),
          // @ts-ignore
          timestamp: new Date()
        };
        
        // Add to beginning
        activities.unshift(newActivity);
        
        // Keep only last 50 activities
        if (activities.length > 50) {
          activities.length = 50;
        }
        
        localStorage.setItem(key, JSON.stringify(activities));
      } catch (error) {
        console.error("Error logging activity:", error);
      }
    },
    [user]
  );

  // --- Get recent activities ---
  const getRecentActivities = useCallback(
    async (count: number = 10): Promise<ActivityItem[]> => {
      if (!user) return [];
      try {
        const key = getActivitiesKey(user.uid);
        const existing = localStorage.getItem(key);
        if (!existing) return [];
        
        const activities: ActivityItem[] = JSON.parse(existing);
        return activities.slice(0, count);
      } catch (error) {
        console.error("Error fetching activities:", error);
        return [];
      }
    },
    [user]
  );

  // --- Add completed lesson ---
  const addCompletedLesson = useCallback(
    async (languageId: string) => {
      if (!user) return;
      try {
        const key = getProgressKey(user.uid, languageId);
        const existing = localStorage.getItem(key);
        
        let newProgress: LanguageProgress;
        if (existing) {
          const parsed = JSON.parse(existing);
          newProgress = {
            ...parsed,
            lessonsCompleted: (parsed.lessonsCompleted || 0) + 1,
            lastAccessed: new Date()
          };
        } else {
          newProgress = {
            type: "spoken",
            lessonsCompleted: 1,
            quizScores: [],
            vocabLearned: 0,
            // @ts-ignore
            lastAccessed: new Date(),
          } as LanguageProgress;
        }
        
        localStorage.setItem(key, JSON.stringify(newProgress));
        await addXP(10);
      } catch (error) {
        console.error("Error adding completed lesson:", error);
      }
    },
    [user, addXP]
  );

  return {
    loading,
    getProgress,
    updateProgress,
    addXP,
    updateStreak,
    logActivity,
    getRecentActivities,
    addCompletedLesson,
  };
}
