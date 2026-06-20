// ==============================================
// Voice Conversation Component
// ==============================================
// Full voice-to-voice AI conversation with language selection.

"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, RotateCcw, Loader2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: "en-US", name: "English", flag: "🇺🇸" },
  { code: "en-GB", name: "English (UK)", flag: "🇬🇧" },
  { code: "ja-JP", name: "Japanese", flag: "🇯🇵" },
  { code: "es-ES", name: "Spanish", flag: "🇪🇸" },
  { code: "hi-IN", name: "Hindi", flag: "🇮🇳" },
  { code: "ta-IN", name: "Tamil", flag: "🇮🇳" },
  { code: "fr-FR", name: "French", flag: "🇫🇷" },
  { code: "de-DE", name: "German", flag: "🇩🇪" },
];

export function VoiceConversation() {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [conversation, setConversation] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [status, setStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [waveData, setWaveData] = useState<number[]>(new Array(30).fill(5));

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const intervalRef = useRef<any>(null);
  const convEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Reinitialize recognition when language changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = selectedLang.code;

        rec.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          clearInterval(intervalRef.current);
          setWaveData(new Array(30).fill(5));
          processUserSpeech(text);
        };

        rec.onerror = () => {
          setStatus("idle");
          clearInterval(intervalRef.current);
          setWaveData(new Array(30).fill(5));
        };

        rec.onend = () => {
          clearInterval(intervalRef.current);
          setWaveData(new Array(30).fill(5));
        };

        recognitionRef.current = rec;
      }
    }
  }, [selectedLang]);

  // Auto-scroll conversation
  useEffect(() => {
    convEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const processUserSpeech = async (userText: string) => {
    setConversation((prev) => [...prev, { role: "user", text: userText }]);
    setStatus("thinking");

    try {
      const langName = selectedLang.name.replace(" (UK)", "");
      const historyMessages = conversation.slice(-6).map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...historyMessages, { role: "user", content: userText }],
          language: langName,
          systemPrompt: `You are a friendly ${langName} language conversation partner. The user is practicing ${langName} through voice conversation. Respond naturally in ${langName}. If they make mistakes, gently correct them. Keep responses to 2-3 sentences. No markdown, no emojis. Add an English translation in parentheses if the language is not English. Be encouraging and conversational.`,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      const aiText = data.response;

      setConversation((prev) => [...prev, { role: "ai", text: aiText }]);
      setStatus("speaking");

      // Speak response
      if (synthRef.current) {
        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(aiText);
        utterance.lang = selectedLang.code;
        utterance.rate = 0.9;

        // Try to find matching voice
        const voices = synthRef.current.getVoices();
        const match = voices.find((v) => v.lang.startsWith(selectedLang.code.split("-")[0]));
        if (match) utterance.voice = match;

        utterance.onend = () => setStatus("idle");
        utterance.onerror = () => setStatus("idle");

        // Animate waveform while speaking
        intervalRef.current = setInterval(() => {
          setWaveData(Array.from({ length: 30 }, () => Math.random() * 70 + 15));
        }, 120);

        utterance.onend = () => {
          setStatus("idle");
          clearInterval(intervalRef.current);
          setWaveData(new Array(30).fill(5));
        };

        synthRef.current.speak(utterance);
      }
    } catch {
      setConversation((prev) => [...prev, { role: "ai", text: "Sorry, I had trouble responding." }]);
      setStatus("idle");
    }
  };

  const startListening = () => {
    if (status === "speaking") {
      synthRef.current?.cancel();
      clearInterval(intervalRef.current);
      setWaveData(new Array(30).fill(5));
    }
    setStatus("listening");
    try {
      recognitionRef.current?.start();
      intervalRef.current = setInterval(() => {
        setWaveData(Array.from({ length: 30 }, () => Math.random() * 80 + 10));
      }, 100);
    } catch {}
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setStatus("idle");
    clearInterval(intervalRef.current);
    setWaveData(new Array(30).fill(5));
  };

  const reset = () => {
    synthRef.current?.cancel();
    recognitionRef.current?.stop();
    clearInterval(intervalRef.current);
    setConversation([]);
    setStatus("idle");
    setWaveData(new Array(30).fill(5));
  };

  const statusText: Record<string, string> = {
    idle: `Tap mic to speak in ${selectedLang.name}`,
    listening: "🎙️ Listening... Speak now",
    thinking: "🤔 AI is thinking...",
    speaking: "🔊 AI is responding...",
  };

  return (
    <Card className="border-border/50 bg-card/80">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Voice Conversation</h3>
            <p className="text-xs text-muted-foreground">Speak and AI responds in your chosen language</p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mb-5">
          <label className="text-xs font-medium text-muted-foreground mb-2 block">
            Conversation Language
          </label>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setSelectedLang(lang); reset(); }}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border",
                  selectedLang.code === lang.code
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-muted/40 border-border/50 hover:bg-muted/70"
                )}
              >
                {lang.flag} {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation */}
        {conversation.length > 0 && (
          <div className="max-h-64 overflow-y-auto space-y-2 bg-muted/20 rounded-xl p-3 border border-border/30 mb-4">
            {conversation.map((msg, i) => (
              <div
                key={i}
                className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted border border-border/30 rounded-bl-sm"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={convEndRef} />
          </div>
        )}

        {/* Waveform */}
        <div className="flex items-end justify-center gap-[2px] h-16 bg-muted/30 rounded-xl p-3 border border-border/30 mb-4">
          {waveData.map((h, i) => (
            <div
              key={i}
              className={cn(
                "w-1 rounded-full transition-all duration-100",
                status === "listening" ? "bg-red-500" :
                status === "speaking" ? "bg-blue-500" :
                status === "thinking" ? "bg-primary" :
                "bg-primary/20"
              )}
              style={{ height: `${h}%`, minHeight: "3px" }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <Button
            onClick={status === "listening" ? stopListening : startListening}
            disabled={status === "thinking"}
            className={cn(
              "rounded-full h-16 w-16 shadow-lg transition-all duration-300",
              status === "listening"
                ? "bg-red-500 hover:bg-red-600 animate-pulse"
                : "bg-gradient-to-br from-purple-500 to-pink-500 hover:opacity-90"
            )}
          >
            {status === "listening" ? (
              <MicOff className="h-6 w-6 text-white" />
            ) : (
              <Mic className="h-6 w-6 text-white" />
            )}
          </Button>

          {conversation.length > 0 && (
            <Button variant="ghost" onClick={reset} className="rounded-full h-10 w-10">
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Status */}
        <p className={cn(
          "text-center text-xs",
          status === "listening" ? "text-red-500 animate-pulse" :
          status === "thinking" ? "text-primary animate-pulse" :
          status === "speaking" ? "text-blue-500" :
          "text-muted-foreground"
        )}>
          {statusText[status]}
        </p>

        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className={cn(
            "h-2 w-2 rounded-full",
            status === "idle" ? "bg-green-500" :
            status === "listening" ? "bg-red-500 animate-pulse" :
            status === "thinking" ? "bg-yellow-500 animate-pulse" :
            "bg-blue-500 animate-pulse"
          )} />
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            {status === "idle" ? "Ready" : status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
