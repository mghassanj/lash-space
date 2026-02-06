"use client";

import { Link2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">Share this article:</span>
      <button
        onClick={copyToClipboard}
        className="flex items-center gap-2 px-4 py-2 bg-[#9C8974] text-white rounded-lg hover:bg-[#B8855C] transition-colors"
        aria-label="Copy link to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            <span className="text-sm">Copied!</span>
          </>
        ) : (
          <>
            <Link2 className="w-4 h-4" />
            <span className="text-sm">Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
