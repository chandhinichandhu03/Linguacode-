// ==============================================
// Code Debugging API Route (with fallback)
// ==============================================

import { NextRequest, NextResponse } from "next/server";
import { debugCode } from "@/lib/ai";
import { fallbackCodeDebug } from "@/lib/ai-fallback";

export async function POST(request: NextRequest) {
  try {
    const { code, language, error: codeError } = await request.json();

    if (!code || !language) {
      return NextResponse.json(
        { error: "Missing required fields: code, language" },
        { status: 400 }
      );
    }

    try {
      const response = await debugCode(code, language, codeError);
      return NextResponse.json({ response });
    } catch (aiError) {
      console.warn("AI API unavailable for code debug, using fallback:", aiError);
      const response = fallbackCodeDebug(code, language, codeError);
      return NextResponse.json({ response });
    }
  } catch (error) {
    console.error("Code debug API error:", error);
    return NextResponse.json(
      { error: "Failed to debug code" },
      { status: 500 }
    );
  }
}
