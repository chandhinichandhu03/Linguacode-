// ==============================================
// Videos Landing Page
// ==============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { VIDEO_LIBRARY, searchVideos } from "@/lib/video-data";
import { VideoCard } from "@/components/videos/video-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, Search, ArrowRight, Code2, Languages, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterType = "all" | "coding" | "spoken" | "nlp";

const filters: { id: FilterType; label: string; icon: any }[] = [
  { id: "all", label: "All", icon: PlayCircle },
  { id: "coding", label: "Coding", icon: Code2 },
  { id: "spoken", label: "Languages", icon: Languages },
  { id: "nlp", label: "NLP", icon: Brain },
];

export default function VideosPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories =
    activeFilter === "all"
      ? VIDEO_LIBRARY
      : VIDEO_LIBRARY.filter((c) => c.type === activeFilter);

  const searchResults = searchQuery.trim() ? searchVideos(searchQuery) : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-600 via-orange-500 to-yellow-500 p-8 md:p-10 text-white">
        <div className="absolute top-4 right-4 opacity-20">
          <PlayCircle className="h-40 w-40" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <PlayCircle className="h-7 w-7 text-white" />
            </div>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              📺 Video Library
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Video Learning</h1>
          <p className="text-white/80 text-lg max-w-xl">
            Learn from the best YouTube tutorials — curated videos for every language and topic.
          </p>
          <div className="flex gap-3 mt-4">
            <Badge className="bg-white/15 text-white border-white/20">
              {VIDEO_LIBRARY.reduce((acc, c) => acc + c.videos.length, 0)}+ Videos
            </Badge>
            <Badge className="bg-white/15 text-white border-white/20">
              {VIDEO_LIBRARY.length} Categories
            </Badge>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search videos by topic, title, or channel..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/50 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap border",
                  activeFilter === filter.id
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Results */}
      {searchResults && (
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Search results for &ldquo;{searchQuery}&rdquo;
            <span className="text-muted-foreground font-normal text-sm ml-2">
              ({searchResults.length} found)
            </span>
          </h2>
          {searchResults.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <Card className="border-border/50">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No videos found. Try a different search term.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Category Sections */}
      {!searchResults &&
        filteredCategories.map((category) => (
          <div key={category.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-lg font-semibold">{category.name}</h2>
                <Badge variant="outline" className="text-[10px]">
                  {category.videos.length} videos
                </Badge>
              </div>
              <Link href={`/videos/${category.id}`}>
                <Button variant="ghost" size="sm" className="text-xs text-primary">
                  View All
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Show first 3 videos per category */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.videos.slice(0, 3).map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
