// ==============================================
// AI Chat API Route (with fallback)
// ==============================================

import { NextRequest, NextResponse } from "next/server";
import { generateChat } from "@/lib/ai";
import { fallbackChatResponse, fallbackVoiceResponse, fallbackNLPAnalysis } from "@/lib/ai-fallback";

export async function POST(request: NextRequest) {
  try {
    const { messages, language, systemPrompt } = await request.json();

    if (!messages || !language) {
      return NextResponse.json(
        { error: "Missing required fields: messages, language" },
        { status: 400 }
      );
    }

    // Try the real AI first
    try {
      const response = await generateChat(messages, language, systemPrompt);
      return NextResponse.json({ response });
    } catch (aiError) {
      console.warn("AI API unavailable, using fallback:", aiError);

      // Use fallback based on context
      const lastMessage = messages[messages.length - 1]?.content || "";
      let fallbackResponse: string;

      if (systemPrompt?.includes("NLP expert")) {
        // NLP voice interaction or demo
        const topicMatch = systemPrompt.match(/about (\w[\w\s-]*?)[\.\,]/);
        const topic = topicMatch?.[1] || "NLP";
        
        // Check if this is an NLP analysis request (from NLP Demo)
        if (lastMessage.includes("Tokenize") || lastMessage.includes("tokenization")) {
          const textMatch = lastMessage.match(/Text:\s*(.+)$/);
          fallbackResponse = fallbackNLPAnalysis(textMatch?.[1] || lastMessage, "tokenization", "Tokenization");
        } else if (lastMessage.includes("sentiment") || lastMessage.includes("Sentiment")) {
          const textMatch = lastMessage.match(/Text:\s*(.+)$/);
          fallbackResponse = fallbackNLPAnalysis(textMatch?.[1] || lastMessage, "sentiment-analysis", "Sentiment Analysis");
        } else if (lastMessage.includes("Named Entity") || lastMessage.includes("NER")) {
          const textMatch = lastMessage.match(/Text:\s*(.+)$/);
          fallbackResponse = fallbackNLPAnalysis(textMatch?.[1] || lastMessage, "named-entity-recognition", "Named Entity Recognition");
        } else if (lastMessage.includes("POS tag")) {
          const textMatch = lastMessage.match(/Text:\s*(.+)$/);
          fallbackResponse = fallbackNLPAnalysis(textMatch?.[1] || lastMessage, "pos-tagging", "POS Tagging");
        } else if (lastMessage.includes("Classify") || lastMessage.includes("classification")) {
          const textMatch = lastMessage.match(/Text:\s*(.+)$/);
          fallbackResponse = fallbackNLPAnalysis(textMatch?.[1] || lastMessage, "text-classification", "Text Classification");
        } else if (lastMessage.includes("semantic") || lastMessage.includes("embedding")) {
          const textMatch = lastMessage.match(/Words:\s*(.+)$/);
          fallbackResponse = fallbackNLPAnalysis(textMatch?.[1] || lastMessage, "word-embeddings", "Word Embeddings");
        } else if (lastMessage.includes("Transformer") || lastMessage.includes("transformer")) {
          const textMatch = lastMessage.match(/Text:\s*(.+)$/);
          fallbackResponse = fallbackNLPAnalysis(textMatch?.[1] || lastMessage, "transformers", "Transformers");
        } else if (lastMessage.includes("Continue") || lastMessage.includes("generation")) {
          const textMatch = lastMessage.match(/Starting text:\s*(.+)$/);
          fallbackResponse = fallbackNLPAnalysis(textMatch?.[1] || lastMessage, "text-generation", "Text Generation");
        } else {
          fallbackResponse = fallbackVoiceResponse(lastMessage, topic);
        }
      } else if (systemPrompt?.includes("conversation partner") || systemPrompt?.includes("language tutor")) {
        fallbackResponse = fallbackChatResponse(lastMessage, language);
      } else if (systemPrompt?.includes("Explain")) {
        fallbackResponse = `Here's a brief explanation about the topic:\n\n${lastMessage}\n\nThis is a fundamental concept worth understanding. Keep exploring and asking questions!`;
      } else {
        fallbackResponse = fallbackChatResponse(lastMessage, language);
      }

      return NextResponse.json({ response: fallbackResponse });
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
