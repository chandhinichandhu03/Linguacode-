// ==============================================
// Voice Studio Page
// ==============================================

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AudioWaveform, Mic, Volume2, BookOpen, MessageSquare } from "lucide-react";
import { VoiceRecorder } from "@/components/voice-studio/voice-recorder";
import { TTSPanel } from "@/components/voice-studio/tts-panel";
import { PronunciationPractice } from "@/components/voice-studio/pronunciation-practice";
import { VoiceConversation } from "@/components/voice-studio/voice-conversation";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "listen", label: "🎧 Listen", icon: Volume2, color: "from-blue-500 to-cyan-500" },
  { id: "stt", label: "🎙️ Speak", icon: Mic, color: "from-red-500 to-rose-500" },
  { id: "practice", label: "🗣️ Pronunciation", icon: BookOpen, color: "from-green-500 to-emerald-500" },
  { id: "converse", label: "💬 Converse with AI", icon: MessageSquare, color: "from-purple-500 to-pink-500" },
];

export default function VoiceStudioPage() {
  const [activeTab, setActiveTab] = useState("listen");

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-10 text-white">
        <div className="absolute inset-0 opacity-20">
          {/* Animated waveform background pattern */}
          <div className="flex items-end justify-center h-full gap-1 pb-8 px-8">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-white/40 rounded-full animate-waveform"
                style={{
                  height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 20}%`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <AudioWaveform className="h-7 w-7 text-white" />
            </div>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              🎙️ AI-Powered
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Voice Practice Studio</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Master any language through listening, speaking, and real AI conversation.
            Text-to-Voice, Voice-to-Text, and Voice-to-Voice — all powered by AI.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap border",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                  : "bg-card border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div key={activeTab} className="animate-fade-in">
        {activeTab === "listen" && <TTSPanel />}

        {activeTab === "stt" && (
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                  <Mic className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Voice-to-Text</h3>
                  <p className="text-xs text-muted-foreground">Record your voice and see real-time transcription</p>
                </div>
              </div>
              <VoiceRecorder />
            </CardContent>
          </Card>
        )}

        {activeTab === "practice" && <PronunciationPractice />}

        {activeTab === "converse" && <VoiceConversation />}
      </div>
    </div>
  );
}
