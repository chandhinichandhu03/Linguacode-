// ==============================================
// Code Explanation API Route (with fallback)
// ==============================================

import { NextRequest, NextResponse } from "next/server";
import { explainCode } from "@/lib/ai";
import { fallbackCodeExplanation } from "@/lib/ai-fallback";

export async function POST(request: NextRequest) {
  try {
    const { code, language } = await request.json();

    if (!code || !language) {
      return NextResponse.json(
        { error: "Missing required fields: code, language" },
        { status: 400 }
      );
    }

    try {
      const response = await explainCode(code, language);
      return NextResponse.json({ response });
    } catch (aiError) {
      console.warn("AI API unavailable for code explain, using fallback:", aiError);
      const response = fallbackCodeExplanation(code, language);
      return NextResponse.json({ response });
    }
  } catch (error) {
    console.error("Code explain API error:", error);
    return NextResponse.json(
      { error: "Failed to explain code" },
      { status: 500 }
    );
  }
}
