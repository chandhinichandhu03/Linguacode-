// ==============================================
// Video Category Page (per language)
// ==============================================

"use client";

import { use, useState } from "react";
import Link from "next/link";
import { VIDEO_LIBRARY, getAllTopics } from "@/lib/video-data";
import { VideoCard } from "@/components/videos/video-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

export default function VideoCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryId } = use(params);
  const category = VIDEO_LIBRARY.find((c) => c.id === categoryId);

  if (!category) return notFound();

  const topics = getAllTopics(categoryId);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const filteredVideos = activeTopic
    ? category.videos.filter((v) => v.topic === activeTopic)
    : category.videos;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/videos">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{category.name}</h1>
            <p className="text-muted-foreground text-sm">
              {category.videos.length} video tutorials
            </p>
          </div>
        </div>
      </div>

      {/* Topic Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveTopic(null)}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border",
            !activeTopic
              ? "bg-primary text-primary-foreground border-primary shadow-md"
              : "bg-card border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          All Topics
        </button>
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setActiveTopic(topic)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border",
              activeTopic === topic
                ? "bg-primary text-primary-foreground border-primary shadow-md"
                : "bg-card border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No videos found for this topic.
        </div>
      )}
    </div>
  );
}
