// ==============================================
// NLP Topic Detail Page
// ==============================================

"use client";

import { use } from "react";
import Link from "next/link";
import { NLP_TOPICS } from "@/lib/constants";
import { VIDEO_LIBRARY } from "@/lib/video-data";
import { NLPDemo } from "@/components/nlp/nlp-demo";
import { NLPVoiceInteraction } from "@/components/nlp/nlp-voice-interaction";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, PlayCircle, Lightbulb } from "lucide-react";
import { notFound } from "next/navigation";

export default function NLPTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicId } = use(params);
  const topic = NLP_TOPICS.find((t) => t.id === topicId);

  if (!topic) return notFound();

  // Find related NLP videos
  const nlpCategory = VIDEO_LIBRARY.find((c) => c.id === "nlp");
  const relatedVideos = nlpCategory?.videos.filter(
    (v) =>
      v.topic.toLowerCase().includes(topic.title.toLowerCase()) ||
      topic.title.toLowerCase().includes(v.topic.toLowerCase())
  ) || [];

  // Fallback to first NLP video if no direct match
  const videosToShow = relatedVideos.length > 0 ? relatedVideos : nlpCategory?.videos.slice(0, 1) || [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/nlp">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div
            className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${topic.color} flex items-center justify-center shadow-lg`}
          >
            <span className="text-2xl">{topic.icon}</span>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{topic.title}</h1>
            <p className="text-muted-foreground text-sm">{topic.description}</p>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <Card className="border-border/50 bg-card/80">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <h2 className="font-semibold text-lg">Key Concepts</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {topic.concepts.map((concept) => (
              <div
                key={concept}
                className="flex items-center gap-2 p-3 rounded-xl bg-muted/40 border border-border/30"
              >
                <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${topic.color}`} />
                <span className="text-sm font-medium">{concept}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Voice Interaction — Text-to-Voice, Voice-to-Text, Voice-to-Voice */}
      <NLPVoiceInteraction topicTitle={topic.title} topicId={topic.id} />

      {/* Interactive NLP Demo */}
      <NLPDemo topicId={topic.id} topicTitle={topic.title} />

      {/* Video Lessons */}
      {videosToShow.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg">Video Lessons</h2>
          </div>
          <div className="grid gap-4">
            {videosToShow.map((video) => (
              <Card key={video.id} className="border-border/50 bg-card/80 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {video.topic}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {video.duration}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-base mb-1">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">{video.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      📺 {video.channel}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Learn More */}
      <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg">Want to learn more?</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Ask our AI tutor about {topic.title} in the AI Chat, or explore more NLP videos in the Videos section.
          </p>
          <div className="flex gap-3">
            <Link href="/chat">
              <Button size="sm" variant="default">
                Ask AI Tutor
              </Button>
            </Link>
            <Link href="/videos">
              <Button size="sm" variant="outline">
                Browse Videos
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
