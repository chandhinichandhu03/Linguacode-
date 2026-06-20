// ==============================================
// General AI Chat Page
// ==============================================

"use client";

import { ChatInterface } from "@/components/language/chat-interface";
import { MessageSquare } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          AI Chat
        </h1>
        <p className="text-muted-foreground">
          Ask anything about languages, coding, or learning. Your AI assistant
          is here to help.
        </p>
      </div>

      <ChatInterface
        language="General"
        placeholder="Ask me anything about languages or coding..."
        systemPrompt="You are a helpful AI learning assistant. You help users learn spoken languages (English, Japanese, Spanish, Hindi, Tamil) and programming languages (Python, JavaScript, C++, Java, HTML/CSS). Be friendly, concise, and encouraging. Provide examples and explanations. If the user asks about a specific language, respond appropriately."
      />
    </div>
  );
}
