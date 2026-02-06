"use client";

import { Instagram } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface InstagramPost {
  id: string;
  caption: string;
  imageUrl: string;
  permalink: string;
  timestamp: string;
}

// Static posts data - updated by scraper script or manually
// These represent real content themes from @lashspace.sa
const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "1",
    caption: "Classic full set ✨ Natural elegance at its finest",
    imageUrl: "/images/gallery/classic-set.jpg",
    permalink: "https://instagram.com/lashspace.sa",
    timestamp: "2024-03-01",
  },
  {
    id: "2",
    caption: "Volume lashes 💫 Full, fluffy, and dramatic",
    imageUrl: "/images/gallery/volume-set.jpg",
    permalink: "https://instagram.com/lashspace.sa",
    timestamp: "2024-02-28",
  },
  {
    id: "3",
    caption: "Hybrid lash set 🌟 The perfect blend",
    imageUrl: "/images/gallery/hybrid-set.jpg",
    permalink: "https://instagram.com/lashspace.sa",
    timestamp: "2024-02-25",
  },
  {
    id: "4",
    caption: "Wet set lashes 💧 Sleek and defined",
    imageUrl: "/images/gallery/wet-set.jpg",
    permalink: "https://instagram.com/lashspace.sa",
    timestamp: "2024-02-20",
  },
  {
    id: "5",
    caption: "Wispy lashes 🦋 Feathery and trendy",
    imageUrl: "/images/gallery/wispy-set.jpg",
    permalink: "https://instagram.com/lashspace.sa",
    timestamp: "2024-02-15",
  },
  {
    id: "6",
    caption: "Before & after transformation ✨",
    imageUrl: "/images/gallery/before-after.jpg",
    permalink: "https://instagram.com/lashspace.sa",
    timestamp: "2024-02-10",
  },
];

export function InstagramFeed() {
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

        {/* Grid of placeholder cards that link to Instagram */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-[#E8E8DC]"
            >
              {/* Placeholder with lash emoji - replace with real images */}
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8E8DC] to-[#BAB0A5]/30">
                <span className="text-4xl opacity-40">✨</span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A]/60 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="px-4 text-center">
                  <Instagram className="mx-auto mb-2 h-6 w-6 text-white" />
                  <p className="text-xs text-white/90 line-clamp-2">{post.caption}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-[#9C8974]/30 px-6 py-3 text-sm font-medium text-[#9C8974] transition-colors hover:bg-[#9C8974] hover:text-white"
          >
            <Instagram className="h-4 w-4" />
            Follow @lashspace.sa
          </a>
        </div>
      </div>
    </section>
  );
}
