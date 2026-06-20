// ==============================================
// Grammar Correction API Route
// ==============================================

import { NextRequest, NextResponse } from "next/server";
import { correctGrammar } from "@/lib/ai";
import { fallbackGrammarCorrection } from "@/lib/ai-fallback";

export async function POST(request: NextRequest) {
  try {
    const { text, language } = await request.json();

    if (!text || !language) {
      return NextResponse.json(
        { error: "Missing required fields: text, language" },
        { status: 400 }
      );
    }

    try {
      // Try AI-powered grammar correction first
      const correction = await correctGrammar(text, language);
      return NextResponse.json(correction);
    } catch (aiError) {
      // Fallback to offline grammar checker if AI is unavailable
      console.warn("AI grammar check failed, using fallback:", aiError);
      const fallbackResult = fallbackGrammarCorrection(text, language);
      return NextResponse.json(fallbackResult);
    }
  } catch (error) {
    console.error("Grammar API error:", error);
    return NextResponse.json(
      { error: "Failed to check grammar" },
      { status: 500 }
    );
  }
}
