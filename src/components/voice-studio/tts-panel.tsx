// ==============================================
// Text-to-Speech Panel Component
// ==============================================

"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, Pause, RotateCcw, Languages } from "lucide-react";

const VOICE_LANGUAGES = [
  { code: "en-US", name: "English (US)", flag: "🇺🇸" },
  { code: "en-GB", name: "English (UK)", flag: "🇬🇧" },
  { code: "ja-JP", name: "Japanese", flag: "🇯🇵" },
  { code: "es-ES", name: "Spanish", flag: "🇪🇸" },
  { code: "hi-IN", name: "Hindi", flag: "🇮🇳" },
  { code: "ta-IN", name: "Tamil", flag: "🇮🇳" },
  { code: "fr-FR", name: "French", flag: "🇫🇷" },
  { code: "de-DE", name: "German", flag: "🇩🇪" },
];

const SAMPLE_TEXTS: Record<string, string> = {
  "en-US": "Hello! Welcome to LinguaCode. Let's learn something amazing today.",
  "en-GB": "Good day! Let's have a jolly good learning session, shall we?",
  "ja-JP": "こんにちは！今日も一緒に勉強しましょう。",
  "es-ES": "¡Hola! Bienvenido a LinguaCode. Vamos a aprender algo increíble hoy.",
  "hi-IN": "नमस्ते! आज कुछ नया सीखते हैं।",
  "ta-IN": "வணக்கம்! இன்று புதிதாக ஏதாவது கற்றுக்கொள்வோம்.",
  "fr-FR": "Bonjour ! Bienvenue à LinguaCode. Apprenons quelque chose d'incroyable aujourd'hui.",
  "de-DE": "Hallo! Willkommen bei LinguaCode. Lass uns heute etwas Tolles lernen.",
};

export function TTSPanel() {
  const [text, setText] = useState(SAMPLE_TEXTS["en-US"]);
  const [selectedLang, setSelectedLang] = useState("en-US");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState(1);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
      const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = () => {
    if (!synthRef.current || !text.trim()) return;
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLang;
    utterance.rate = rate;

    // Try to find a matching voice
    const matchingVoice = voices.find((v) => v.lang.startsWith(selectedLang.split("-")[0]));
    if (matchingVoice) utterance.voice = matchingVoice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
    setIsSpeaking(true);
  };

  const stop = () => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  };

  const changeLang = (code: string) => {
    setSelectedLang(code);
    setText(SAMPLE_TEXTS[code] || "");
    stop();
  };

  return (
    <Card className="border-border/50 bg-card/80">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Volume2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Text-to-Speech</h3>
            <p className="text-xs text-muted-foreground">Type or paste text and hear it spoken aloud</p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mb-4">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            <Languages className="h-3.5 w-3.5 inline mr-1" />
            Language
          </label>
          <div className="flex flex-wrap gap-2">
            {VOICE_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLang(lang.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                  selectedLang === lang.code
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-muted/40 border-border/50 hover:bg-muted/70"
                }`}
              >
                {lang.flag} {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type text to speak..."
          className="w-full h-28 px-4 py-3 rounded-xl border border-border/50 bg-muted/30 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all mb-4"
        />

        {/* Speed Control */}
        <div className="flex items-center gap-3 mb-4">
          <label className="text-sm text-muted-foreground">Speed:</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="flex-1 accent-primary"
          />
          <Badge variant="secondary" className="text-xs min-w-[40px] justify-center">
            {rate}x
          </Badge>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <Button
            onClick={isSpeaking ? stop : speak}
            disabled={!text.trim()}
            className={`flex-1 ${
              isSpeaking
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90"
            }`}
          >
            {isSpeaking ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4 mr-2" />
                Speak
              </>
            )}
          </Button>
          <Button variant="outline" onClick={() => { setText(""); stop(); }}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
