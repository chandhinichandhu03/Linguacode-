// ==============================================
// AI Quiz Generation API Route
// ==============================================

import { NextRequest, NextResponse } from "next/server";
import { generateQuiz } from "@/lib/ai";
import { getDefaultQuiz } from "@/lib/default-quizzes";

export async function POST(request: NextRequest) {
  try {
    const { language, topic, difficulty, type, count } = await request.json();

    if (!language || !topic || !difficulty || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let questions;
    try {
      questions = await generateQuiz(
        language,
        topic,
        difficulty,
        type,
        count || 5
      );
    } catch (aiError) {
      console.warn("AI Quiz generation failed, falling back to defaults:", aiError);
      questions = getDefaultQuiz(type === "coding" ? "coding" : "spoken");
    }

    // Ensure we have an array, sometimes AI might return undefined or empty on failure even if not thrown
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      questions = getDefaultQuiz(type === "coding" ? "coding" : "spoken");
    }

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Quiz API error:", error);
    return NextResponse.json(
      { error: "Failed to process quiz request" },
      { status: 500 }
    );
  }
}
