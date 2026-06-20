// ==============================================
// Voice Recorder Component
// ==============================================

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Square, Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceRecorderProps {
  onTranscript?: (text: string) => void;
  onRecordingComplete?: (blob: Blob) => void;
  compact?: boolean;
}

export function VoiceRecorder({ onTranscript, onRecordingComplete, compact = false }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [waveformData, setWaveformData] = useState<number[]>(new Array(30).fill(5));

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    // Setup speech recognition
    if (typeof window !== "undefined") {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          let finalTranscript = "";
          for (let i = 0; i < event.results.length; i++) {
            finalTranscript += event.results[i][0].transcript;
          }
          setTranscript(finalTranscript);
          onTranscript?.(finalTranscript);
        };

        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => {
          if (isRecording) {
            try { recognition.start(); } catch {}
          }
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const updateWaveform = useCallback(() => {
    if (!analyserRef.current) return;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    const bars = 30;
    const step = Math.floor(dataArray.length / bars);
    const newData = [];
    for (let i = 0; i < bars; i++) {
      const value = dataArray[i * step] / 255;
      newData.push(Math.max(5, value * 100));
    }
    setWaveformData(newData);
    animationRef.current = requestAnimationFrame(updateWaveform);
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Setup analyser for waveform
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Setup recorder
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onRecordingComplete?.(blob);
        stream.getTracks().forEach((t) => t.stop());
        cancelAnimationFrame(animationRef.current);
        setWaveformData(new Array(30).fill(5));
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setAudioUrl(null);
      setTranscript("");

      // Start recognition
      try { recognitionRef.current?.start(); } catch {}

      // Start waveform animation
      updateWaveform();
    } catch (err) {
      console.error("Mic access denied:", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  const playAudio = () => {
    if (!audioUrl) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const reset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setAudioUrl(null);
    setTranscript("");
    setIsPlaying(false);
    setWaveformData(new Array(30).fill(5));
  };

  return (
    <div className={cn("space-y-4", compact && "space-y-2")}>
      {/* Waveform Visualization */}
      <div className="flex items-end justify-center gap-[3px] h-24 bg-muted/30 rounded-xl p-4 border border-border/30">
        {waveformData.map((height, i) => (
          <div
            key={i}
            className={cn(
              "w-1.5 rounded-full transition-all duration-75",
              isRecording
                ? "bg-gradient-to-t from-red-500 to-red-400"
                : "bg-gradient-to-t from-primary/40 to-primary/20"
            )}
            style={{ height: `${height}%`, minHeight: "4px" }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {!isRecording ? (
          <Button
            onClick={startRecording}
            className="rounded-full h-14 w-14 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/20"
          >
            <Mic className="h-6 w-6 text-white" />
          </Button>
        ) : (
          <Button
            onClick={stopRecording}
            variant="destructive"
            className="rounded-full h-14 w-14 animate-pulse shadow-lg"
          >
            <Square className="h-5 w-5 fill-current" />
          </Button>
        )}

        {audioUrl && (
          <>
            <Button
              onClick={isPlaying ? pauseAudio : playAudio}
              variant="outline"
              className="rounded-full h-12 w-12"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button
              onClick={reset}
              variant="ghost"
              className="rounded-full h-12 w-12"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Status */}
      <p className={cn(
        "text-center text-sm",
        isRecording ? "text-red-500 animate-pulse font-medium" : "text-muted-foreground"
      )}>
        {isRecording ? "🔴 Recording... Speak now" : audioUrl ? "Recording complete" : "Tap the mic to start recording"}
      </p>

      {/* Transcript */}
      {transcript && (
        <div className="bg-muted/40 rounded-xl p-4 border border-border/30 animate-fade-in">
          <p className="text-xs text-muted-foreground mb-1 font-medium">Transcript:</p>
          <p className="text-sm">{transcript}</p>
        </div>
      )}
    </div>
  );
}
