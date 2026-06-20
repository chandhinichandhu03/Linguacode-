// ==============================================
// Voice Assistant Component
// ==============================================
// A simple offline voice assistant using Web Speech API.

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Mic, MicOff, Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// --- Types ---
// SpeechRecognition is not fully typed in standard TS lib
interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

export function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("Hi! I'm your learning assistant. Tap the mic and say hello!");
  const [supported, setSupported] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Use refs to keep track of instances
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize Speech APIs
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Setup Recognition
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setSupported(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processCommand(text);
        setIsListening(false);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        if (event.error !== "no-speech") {
          setResponse(`Error: ${event.error}. Please try again.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      synthRef.current = window.speechSynthesis;

      // Handle async voice loading
      const loadVoices = () => {
        setAvailableVoices(window.speechSynthesis.getVoices());
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = (text: string) => {
    if (!synthRef.current) return;
    
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const goodVoice = availableVoices.find(
      (v) => v.name.includes("Google UK English Female") || v.name.includes("Samantha")
    );
    if (goodVoice) utterance.voice = goodVoice;
    
    utterance.rate = 1.0;
    synthRef.current.speak(utterance);
  };

  const processCommand = async (text: string) => {
    setIsThinking(true);
    setResponse("Thinking...");
    
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: text }],
          language: "English",
          systemPrompt: "You are a helpful, extremely concise voice assistant for a learning platform. Answer in 1-2 short sentences max. Do not use markdown or emojis.",
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");
      
      const data = await res.json();
      const reply = data.response;
      
      setResponse(reply);
      speak(reply);
    } catch (error) {
      console.error(error);
      const errReply = "Sorry, I'm having trouble connecting right now.";
      setResponse(errReply);
      speak(errReply);
    } finally {
      setIsThinking(false);
    }
  };

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      setResponse("Listening...");
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error("Could not start recognition:", e);
      }
    }
  };

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      synthRef.current?.cancel();
      if (isListening) recognitionRef.current?.stop();
      setIsListening(false);
    }
  };

  if (!supported) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Assistant Card */}
      {isOpen && (
        <Card className="w-[300px] p-4 shadow-2xl border-primary/20 bg-card/95 backdrop-blur-xl animate-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-primary/10">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm">Voice Assistant</h3>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleAssistant}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* AI Response Area */}
            <div className="bg-muted/50 p-3 rounded-lg text-sm min-h-[80px] flex items-center justify-center text-center">
              <p className="text-foreground/90">{response}</p>
            </div>

            {/* User Transcript */}
            {transcript && (
              <div className="bg-primary/10 text-primary p-2 rounded-lg text-xs italic text-right">
                "{transcript}"
              </div>
            )}

            {/* Mic Button */}
            <div className="flex justify-center pt-2">
              <Button
                size="lg"
                variant={isListening ? "destructive" : "default"}
                disabled={isThinking}
                className={cn(
                  "rounded-full h-14 w-14 shadow-lg transition-all duration-300",
                  isListening && "animate-pulse"
                )}
                onClick={toggleListen}
              >
                {isListening ? (
                  <MicOff className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </Button>
            </div>
            
            {isListening && !isThinking && (
              <p className="text-xs text-center text-muted-foreground animate-pulse">
                Listening... Speak now
              </p>
            )}
            {isThinking && (
              <p className="text-xs text-center text-primary animate-pulse">
                Processing...
              </p>
            )}
          </div>
        </Card>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-xl shadow-primary/20 bg-gradient-to-br from-primary to-purple-600 hover:scale-105 transition-all duration-300"
          onClick={toggleAssistant}
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
