"use client";

import { Instagram } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import Image from "next/image";

interface InstagramPost {
  id: string;
  caption: string;
  imageUrl: string;
  permalink: string;
  timestamp: string;
  downloaded?: boolean;
}

// Import scraped data (updated by cron)
import instagramData from "@/data/instagram-posts.json";

// Fallback placeholders if no real posts yet
const PLACEHOLDER_POSTS: InstagramPost[] = [
  { id: "1", caption: "Classic full set ✨", imageUrl: "", permalink: "https://instagram.com/lashspace.sa", timestamp: "" },
  { id: "2", caption: "Volume lashes 💫", imageUrl: "", permalink: "https://instagram.com/lashspace.sa", timestamp: "" },
  { id: "3", caption: "Hybrid lash set 🌟", imageUrl: "", permalink: "https://instagram.com/lashspace.sa", timestamp: "" },
  { id: "4", caption: "Wet set lashes 💧", imageUrl: "", permalink: "https://instagram.com/lashspace.sa", timestamp: "" },
  { id: "5", caption: "Wispy lashes 🦋", imageUrl: "", permalink: "https://instagram.com/lashspace.sa", timestamp: "" },
  { id: "6", caption: "Before & after ✨", imageUrl: "", permalink: "https://instagram.com/lashspace.sa", timestamp: "" },
];

export function InstagramFeed() {
  const posts: InstagramPost[] = instagramData.posts.length > 0
    ? (instagramData.posts as InstagramPost[]).slice(0, 6)
    : PLACEHOLDER_POSTS;

  const hasRealImages = instagramData.posts.length > 0;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Instagram className="h-6 w-6 text-[#9C8974]" />
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#9C8974]">
              @lashspace.sa
            </span>
          </div>
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#1A1A1A]">
            Follow Our Work
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            See our latest lash transformations on Instagram
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-[#E8E8DC]"
            >
              {hasRealImages && post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt={post.caption || "Lash Space work"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8E8DC] to-[#BAB0A5]/30">
                  <span className="text-4xl opacity-40">✨</span>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A]/60 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="px-4 text-center">
                  <Instagram className="mx-auto mb-2 h-6 w-6 text-white" />
                  <p className="text-xs text-white/90 line-clamp-2">{post.caption}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-[#9C8974]/30 px-6 py-3 text-sm font-medium text-[#9C8974] transition-colors hover:bg-[#9C8974] hover:text-white"
          >
            <Instagram className="h-4 w-4" />
            Follow @lashspace.sa
          </a>
          <a
            href={SITE_CONFIG.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-[#9C8974]/30 px-6 py-3 text-sm font-medium text-[#9C8974] transition-colors hover:bg-[#9C8974] hover:text-white"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z"/></svg>
            Follow on TikTok
          </a>
        </div>
      </div>
    </section>
  );
}
