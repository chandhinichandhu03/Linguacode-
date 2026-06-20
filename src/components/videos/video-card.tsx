// ==============================================
// Video Card Component
// ==============================================

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, X, Clock, User } from "lucide-react";
import { VideoPlayer } from "@/components/videos/video-player";
import type { VideoItem } from "@/lib/video-data";

export function VideoCard({ video }: { video: VideoItem }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-border/50 bg-card/80 overflow-hidden group card-hover">
      <CardContent className="p-0">
        {isExpanded ? (
          /* Expanded: Show embedded player */
          <div className="relative">
            <VideoPlayer youtubeId={video.youtubeId} title={video.title} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 right-2 z-20 h-8 w-8 rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          /* Collapsed: Show thumbnail */
          <button
            onClick={() => setIsExpanded(true)}
            className="relative w-full aspect-video bg-muted/30 overflow-hidden cursor-pointer"
          >
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Play overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center shadow-xl">
                <Play className="h-6 w-6 text-white ml-0.5" fill="white" />
              </div>
            </div>
            {/* Duration badge */}
            <Badge className="absolute bottom-2 right-2 bg-black/70 text-white border-0 text-[10px]">
              <Clock className="h-3 w-3 mr-1" />
              {video.duration}
            </Badge>
          </button>
        )}

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-[10px]">
              {video.topic}
            </Badge>
          </div>
          <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {video.description}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            {video.channel}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
