// ==============================================
// NLP Voice Interaction Component
// ==============================================
// Text-to-Voice, Voice-to-Text, and Voice-to-Voice for NLP topics.

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Volume2,
  Mic,
  MicOff,
  MessageSquare,
  Loader2,
  Pause,
  RotateCcw,
  Headphones,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NLPVoiceProps {
  topicTitle: string;
  topicId: string;
}

type VoiceTab = "text-to-voice" | "voice-to-text" | "voice-to-voice";

const voiceTabs: { id: VoiceTab; label: string; icon: any; color: string }[] = [
  { id: "text-to-voice", label: "🔊 Text → Voice", icon: Volume2, color: "from-blue-500 to-cyan-500" },
  { id: "voice-to-text", label: "🎙️ Voice → Text", icon: Mic, color: "from-red-500 to-rose-500" },
  { id: "voice-to-voice", label: "🗣️ Voice → Voice", icon: MessageSquare, color: "from-purple-500 to-pink-500" },
];

export function NLPVoiceInteraction({ topicTitle, topicId }: NLPVoiceProps) {
  const [activeTab, setActiveTab] = useState<VoiceTab>("text-to-voice");

  return (
    <Card className="border-border/50 bg-card/80 overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-5 border-b border-border/30">
          <div className="flex items-center gap-2 mb-1">
            <Headphones className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Voice & AI Interaction</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Practice {topicTitle} with voice — listen, speak, and converse with AI
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border/30">
          {voiceTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 px-4 py-3 text-xs sm:text-sm font-medium transition-all duration-200 border-b-2",
                activeTab === tab.id
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-5">
          {activeTab === "text-to-voice" && (
            <TextToVoiceSection topicTitle={topicTitle} topicId={topicId} />
          )}
          {activeTab === "voice-to-text" && (
            <VoiceToTextSection topicTitle={topicTitle} topicId={topicId} />
          )}
          {activeTab === "voice-to-voice" && (
            <VoiceToVoiceSection topicTitle={topicTitle} topicId={topicId} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// =============================================
// Text-to-Voice Section
// =============================================
function TextToVoiceSection({ topicTitle, topicId }: { topicTitle: string; topicId: string }) {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const generateAndSpeak = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: `Explain "${topicTitle}" in NLP in 3-4 simple sentences. Make it conversational and easy to understand when spoken aloud. No markdown, no emojis, no special characters.` }],
          language: "English",
          systemPrompt: "You are an NLP expert. Give clear, spoken-style explanations. No markdown formatting.",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setText(data.response);
    } catch {
      setText("Sorry, could not generate an explanation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const speak = () => {
    if (!synthRef.current || !text.trim()) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
    setIsSpeaking(true);
  };

  const stop = () => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Generate an AI explanation of <strong>{topicTitle}</strong> and hear it spoken aloud, or type your own text.
      </p>

      <Button
        onClick={generateAndSpeak}
        disabled={loading}
        variant="outline"
        className="w-full"
      >
        {loading ? (
          <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generating...</>
        ) : (
          <><MessageSquare className="h-4 w-4 mr-2" />Generate AI Explanation</>
        )}
      </Button>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`Type or generate text about ${topicTitle}...`}
        className="w-full h-28 px-4 py-3 rounded-xl border border-border/50 bg-muted/30 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
      />

      <div className="flex gap-3">
        <Button
          onClick={isSpeaking ? stop : speak}
          disabled={!text.trim()}
          className={cn(
            "flex-1",
            isSpeaking
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90"
          )}
        >
          {isSpeaking ? (
            <><Pause className="h-4 w-4 mr-2" />Stop</>
          ) : (
            <><Volume2 className="h-4 w-4 mr-2" />Listen</>
          )}
        </Button>
        <Button variant="outline" onClick={() => { setText(""); stop(); }}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// =============================================
// Voice-to-Text Section
// =============================================
function VoiceToTextSection({ topicTitle, topicId }: { topicTitle: string; topicId: string }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [waveData, setWaveData] = useState<number[]>(new Array(20).fill(5));
  const recognitionRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = "en-US";

        rec.onresult = (event: any) => {
          let text = "";
          for (let i = 0; i < event.results.length; i++) {
            text += event.results[i][0].transcript;
          }
          setTranscript(text);
        };

        rec.onerror = () => setIsListening(false);
        rec.onend = () => {
          setIsListening(false);
          clearInterval(intervalRef.current);
          setWaveData(new Array(20).fill(5));
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      clearInterval(intervalRef.current);
      setWaveData(new Array(20).fill(5));
    } else {
      setTranscript("");
      setAiResponse("");
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        // Simulate waveform
        intervalRef.current = setInterval(() => {
          setWaveData(Array.from({ length: 20 }, () => Math.random() * 80 + 10));
        }, 100);
      } catch {}
    }
  };

  const analyzeWithAI = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: `The user spoke the following about ${topicTitle}: "${transcript}". Provide feedback: 1) Is their understanding correct? 2) What key points did they cover? 3) What are they missing? Be encouraging and educational. No markdown.` }],
          language: "English",
          systemPrompt: `You are an NLP expert evaluating a student's spoken explanation of ${topicTitle}. Be encouraging but thorough.`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setAiResponse(data.response);
    } catch {
      setAiResponse("Could not analyze. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Speak about <strong>{topicTitle}</strong> and get AI feedback on your understanding.
      </p>

      {/* Waveform */}
      <div className="flex items-end justify-center gap-[3px] h-16 bg-muted/30 rounded-xl p-3 border border-border/30">
        {waveData.map((h, i) => (
          <div
            key={i}
            className={cn(
              "w-1.5 rounded-full transition-all duration-75",
              isListening ? "bg-gradient-to-t from-red-500 to-red-400" : "bg-primary/20"
            )}
            style={{ height: `${h}%`, minHeight: "4px" }}
          />
        ))}
      </div>

      {/* Mic Button */}
      <div className="flex justify-center">
        <Button
          onClick={toggleListening}
          className={cn(
            "rounded-full h-16 w-16 shadow-lg transition-all duration-300",
            isListening
              ? "bg-red-500 hover:bg-red-600 animate-pulse"
              : "bg-gradient-to-br from-red-500 to-rose-500 hover:opacity-90"
          )}
        >
          {isListening ? <MicOff className="h-6 w-6 text-white" /> : <Mic className="h-6 w-6 text-white" />}
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {isListening ? "🔴 Listening... Explain what you know about " + topicTitle : "Tap to start speaking"}
      </p>

      {/* Transcript */}
      {transcript && (
        <div className="bg-muted/40 rounded-xl p-4 border border-border/30 animate-fade-in">
          <p className="text-xs font-medium text-muted-foreground mb-1">Your speech:</p>
          <p className="text-sm leading-relaxed">{transcript}</p>
        </div>
      )}

      {/* Analyze button */}
      {transcript && !isListening && (
        <Button onClick={analyzeWithAI} disabled={loading} className="w-full bg-gradient-to-r from-primary to-purple-600">
          {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Analyzing...</> : "✨ Get AI Feedback"}
        </Button>
      )}

      {/* AI Response */}
      {aiResponse && (
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 animate-slide-up">
          <Badge variant="outline" className="mb-2 text-xs">AI Feedback</Badge>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
        </div>
      )}
    </div>
  );
}

// =============================================
// Voice-to-Voice Section (Conversational AI)
// =============================================
function VoiceToVoiceSection({ topicTitle, topicId }: { topicTitle: string; topicId: string }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversation, setConversation] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [status, setStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [waveData, setWaveData] = useState<number[]>(new Array(25).fill(5));

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US";

        rec.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setIsListening(false);
          clearInterval(intervalRef.current);
          setWaveData(new Array(25).fill(5));
          handleUserSpeech(text);
        };

        rec.onerror = () => {
          setIsListening(false);
          setStatus("idle");
          clearInterval(intervalRef.current);
          setWaveData(new Array(25).fill(5));
        };

        rec.onend = () => {
          setIsListening(false);
          clearInterval(intervalRef.current);
          setWaveData(new Array(25).fill(5));
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  const handleUserSpeech = async (userText: string) => {
    setConversation((prev) => [...prev, { role: "user", text: userText }]);
    setStatus("thinking");

    try {
      const historyMessages = conversation.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...historyMessages, { role: "user", content: userText }],
          language: "English",
          systemPrompt: `You are a friendly NLP expert having a voice conversation about ${topicTitle}. Keep responses to 2-3 sentences max. Be conversational and educational. No markdown, no emojis, no special formatting — your response will be spoken aloud. Ask follow-up questions to keep the conversation going.`,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      const aiText = data.response;

      setConversation((prev) => [...prev, { role: "ai", text: aiText }]);
      setStatus("speaking");

      // Speak the response
      if (synthRef.current) {
        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(aiText);
        utterance.rate = 0.95;
        utterance.onend = () => {
          setStatus("idle");
          setIsSpeaking(false);
        };
        utterance.onerror = () => {
          setStatus("idle");
          setIsSpeaking(false);
        };
        synthRef.current.speak(utterance);
        setIsSpeaking(true);
      }
    } catch {
      setConversation((prev) => [...prev, { role: "ai", text: "Sorry, I had trouble responding. Please try again." }]);
      setStatus("idle");
    }
  };

  const startListening = () => {
    if (isSpeaking) {
      synthRef.current?.cancel();
      setIsSpeaking(false);
    }
    setStatus("listening");
    setIsListening(true);
    try {
      recognitionRef.current?.start();
      intervalRef.current = setInterval(() => {
        setWaveData(Array.from({ length: 25 }, () => Math.random() * 80 + 10));
      }, 100);
    } catch {}
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    setStatus("idle");
    clearInterval(intervalRef.current);
    setWaveData(new Array(25).fill(5));
  };

  const resetConversation = () => {
    synthRef.current?.cancel();
    recognitionRef.current?.stop();
    setConversation([]);
    setStatus("idle");
    setIsListening(false);
    setIsSpeaking(false);
    clearInterval(intervalRef.current);
    setWaveData(new Array(25).fill(5));
  };

  const statusConfig = {
    idle: { text: "Tap mic to start a voice conversation", color: "text-muted-foreground" },
    listening: { text: "🎙️ Listening... Ask about " + topicTitle, color: "text-red-500 animate-pulse" },
    thinking: { text: "🤔 AI is thinking...", color: "text-primary animate-pulse" },
    speaking: { text: "🔊 AI is speaking...", color: "text-blue-500" },
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Have a real voice conversation with AI about <strong>{topicTitle}</strong>. Speak and the AI will respond with voice.
      </p>

      {/* Conversation history */}
      {conversation.length > 0 && (
        <div className="max-h-48 overflow-y-auto space-y-2 bg-muted/20 rounded-xl p-3 border border-border/30">
          {conversation.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-2 text-sm",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] px-3 py-2 rounded-xl",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted rounded-bl-sm"
                )}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Waveform */}
      <div className="flex items-end justify-center gap-[2px] h-14 bg-muted/30 rounded-xl p-3 border border-border/30">
        {waveData.map((h, i) => (
          <div
            key={i}
            className={cn(
              "w-1 rounded-full transition-all duration-75",
              status === "listening" ? "bg-red-500" :
              status === "speaking" ? "bg-blue-500" :
              "bg-primary/20"
            )}
            style={{ height: `${status === "speaking" ? Math.random() * 60 + 20 : h}%`, minHeight: "3px" }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <Button
          onClick={isListening ? stopListening : startListening}
          disabled={status === "thinking"}
          className={cn(
            "rounded-full h-16 w-16 shadow-lg transition-all duration-300",
            isListening
              ? "bg-red-500 hover:bg-red-600 animate-pulse"
              : "bg-gradient-to-br from-purple-500 to-pink-500 hover:opacity-90"
          )}
        >
          {isListening ? <MicOff className="h-6 w-6 text-white" /> : <Mic className="h-6 w-6 text-white" />}
        </Button>

        {conversation.length > 0 && (
          <Button variant="ghost" onClick={resetConversation} className="rounded-full h-10 w-10">
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}
      </div>

      <p className={cn("text-center text-xs", statusConfig[status].color)}>
        {statusConfig[status].text}
      </p>
    </div>
  );
}
