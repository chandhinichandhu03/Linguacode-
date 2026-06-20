// ==============================================
// Chat Interface Component
// ==============================================
// Reusable AI chat interface for language practice.

"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  language: string;
  systemPrompt?: string;
  placeholder?: string;
}

export function ChatInterface({
  language,
  systemPrompt,
  placeholder,
}: ChatInterfaceProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello! 👋 I'm your AI ${language} tutor. Let's practice together! Feel free to write in ${language} or English, and I'll help you improve. What would you like to talk about?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          language,
          systemPrompt,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      toast.error("Failed to get AI response. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Messages Area */}
      <Card className="flex-1 overflow-y-auto border-border/50 bg-card/50 backdrop-blur-sm p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 animate-fade-in ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback
                className={
                  msg.role === "assistant"
                    ? "bg-primary/20 text-primary"
                    : "bg-accent"
                }
              >
                {msg.role === "assistant" ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </AvatarFallback>
            </Avatar>

            <div
              className={`max-w-[75%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-muted rounded-tl-sm"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex gap-3 animate-fade-in">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="bg-primary/20 text-primary">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-2xl rounded-tl-sm p-3.5">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" />
                <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce delay-100" />
                <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </Card>

      {/* Input Area */}
      <div className="mt-3 flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            placeholder || `Type in ${language} or English... (Enter to send)`
          }
          className="resize-none min-h-[48px] max-h-[120px] border-border/50"
          rows={1}
          disabled={loading}
        />
        <Button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          size="icon"
          className="h-12 w-12 rounded-xl bg-gradient-to-r from-primary to-purple-500 shadow-md shadow-primary/20 flex-shrink-0"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
