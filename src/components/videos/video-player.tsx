// ==============================================
// Video Player Component (YouTube Embed)
// ==============================================

"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
  className?: string;
}

export function VideoPlayer({ youtubeId, title, className = "" }: VideoPlayerProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative aspect-video w-full rounded-xl overflow-hidden bg-muted/40 ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/60 z-10">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      )}
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setLoading(false)}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
