"use client";

import { Instagram } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function InstagramFeed() {
  const instagramUrl = SITE_CONFIG.social.instagram;
  const handle = "@lashspace.sa";

  return (
    <section className="py-16 md:py-24 bg-[#E8E8DC]/50">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Instagram className="h-6 w-6 text-[#9C8974]" />
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#9C8974]">
              {handle}
            </span>
          </div>
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#1A1A1A]">
            Follow Our Work
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            See our latest lash transformations and behind-the-scenes on Instagram
          </p>
        </div>

        {/* Instagram Profile Embed */}
        <div className="mx-auto max-w-lg">
          <div className="overflow-hidden rounded-2xl border border-[#BAB0A5]/20 bg-white shadow-lg">
            <iframe
              src="https://www.instagram.com/lashspace.sa/embed"
              className="w-full border-0"
              height="600"
              scrolling="no"
              allowTransparency
              title="Instagram Profile - @lashspace.sa"
            />
          </div>
        </div>

        {/* Fallback CTA if embed doesn't load */}
        <noscript>
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-[#BAB0A5]/20 bg-white p-8 text-center shadow-lg">
            <Instagram className="mx-auto mb-4 h-12 w-12 text-[#9C8974]" />
            <h3 className="mb-2 font-serif text-2xl font-bold text-[#1A1A1A]">
              {handle}
            </h3>
            <p className="mb-6 text-muted-foreground">
              Follow us for the latest lash transformations, tips, and inspiration
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <Instagram className="h-4 w-4" />
              Follow on Instagram
            </a>
          </div>
        </noscript>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-[#9C8974]/30 px-6 py-3 text-sm font-medium text-[#9C8974] transition-colors hover:bg-[#9C8974] hover:text-white"
          >
            <Instagram className="h-4 w-4" />
            Follow {handle}
          </a>
          <a
            href={SITE_CONFIG.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-[#9C8974]/30 px-6 py-3 text-sm font-medium text-[#9C8974] transition-colors hover:bg-[#9C8974] hover:text-white"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
            </svg>
            Follow on TikTok
          </a>
        </div>
      </div>
    </section>
  );
}
