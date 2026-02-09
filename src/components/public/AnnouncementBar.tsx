"use client";

import { X } from "lucide-react";
import { useState } from "react";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  
  if (!visible) return null;

  return (
    <div className="relative bg-[#1A1A1A] text-center text-xs text-[#BAB0A5] py-2 px-8">
      <p className="tracking-wider">
        🌙 تم فتح مواعيد رمضان — احجزي الآن 🌙
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BAB0A5]/60 hover:text-[#BAB0A5] transition-colors"
        aria-label="Close"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
