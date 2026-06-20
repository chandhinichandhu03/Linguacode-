// ==============================================
// Authentication Context Provider (Local Storage Mock)
// ==============================================
// Wraps the app to provide auth state and methods.
// Uses localStorage for zero-setup persistence.

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "@/types";
import { ensureUserInDB } from "@/lib/user-db";

// --- Mock User Type ---
export interface MockUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
}

// --- Context Type ---
interface AuthContextType {
  user: MockUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isConfigured: boolean; // Always true for local mock
  signIn: (email: string, password?: string) => Promise<void>;
  signUp: (name: string, email: string, password?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// --- Provider Component ---
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes from localStorage
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("lc_user");
        const storedProfile = localStorage.getItem("lc_profile");
        
        if (storedUser && storedProfile) {
          setUser(JSON.parse(storedUser));
          setUserProfile(JSON.parse(storedProfile));
        } else {
          setUser(null);
          setUserProfile(null);
        }
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // --- Sign in ---
  const signIn = async (email: string) => {
    setLoading(true);
    // In a real app we'd verify password. Here we just mock it.
    // Let's see if we have a user in localStorage
    const storedProfileStr = localStorage.getItem(`lc_profile_${email}`);
    
    if (storedProfileStr) {
      const profile = JSON.parse(storedProfileStr);
      const mockUser: MockUser = {
        uid: profile.uid,
        email: profile.email,
        displayName: profile.displayName,
        photoURL: profile.photoURL,
      };
      
      localStorage.setItem("lc_user", JSON.stringify(mockUser));
      localStorage.setItem("lc_profile", JSON.stringify(profile));
      
      // Save to user database
      ensureUserInDB(profile);
      
      setUser(mockUser);
      setUserProfile(profile);
    } else {
      setLoading(false);
      throw new Error("User not found. Please sign up.");
    }
    setLoading(false);
  };

  // --- Sign up ---
  const signUp = async (name: string, email: string) => {
    setLoading(true);
    const uid = "user_" + Math.random().toString(36).substr(2, 9);
    
    const mockUser: MockUser = {
      uid,
      email,
      displayName: name || "Learner",
      photoURL: null,
    };
    
    const newProfile: UserProfile = {
      uid,
      displayName: name || "Learner",
      email,
      photoURL: null,
      streak: 0,
      xp: 0,
      bookmarks: [],
      // @ts-ignore - Mocking server timestamp
      createdAt: new Date(),
      // @ts-ignore
      lastActive: new Date(),
    };

    // Store specific profile and active session
    localStorage.setItem(`lc_profile_${email}`, JSON.stringify(newProfile));
    localStorage.setItem("lc_user", JSON.stringify(mockUser));
    localStorage.setItem("lc_profile", JSON.stringify(newProfile));

    // Save to user database
    ensureUserInDB(newProfile);

    setUser(mockUser);
    setUserProfile(newProfile);
    setLoading(false);
  };

  // --- Sign out ---
  const signOut = async () => {
    setLoading(true);
    // If we have a profile, save its latest state before signing out
    if (userProfile && user) {
      localStorage.setItem(`lc_profile_${user.email}`, JSON.stringify(userProfile));
    }
    
    localStorage.removeItem("lc_user");
    localStorage.removeItem("lc_profile");
    setUser(null);
    setUserProfile(null);
    setLoading(false);
  };

  // --- Update Profile utility for other hooks to use ---
  // We'll attach this to the window object for the progress hook to use easily
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.__updateProfile = (updates: Partial<UserProfile>) => {
        setUserProfile(prev => {
          if (!prev) return prev;
          const updated = { ...prev, ...updates };
          localStorage.setItem("lc_profile", JSON.stringify(updated));
          if (user?.email) {
            localStorage.setItem(`lc_profile_${user.email}`, JSON.stringify(updated));
          }
          return updated;
        });
      };
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        isConfigured: true,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// --- Hook to use auth context ---
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
