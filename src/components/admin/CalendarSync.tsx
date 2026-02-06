"use client";

import { useState } from "react";
import { Calendar, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CalendarSync() {
  const [showInfo, setShowInfo] = useState(false);
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const feedUrl = `${baseUrl}/api/calendar/feed`;

  const handleCopy = () => {
    navigator.clipboard.writeText(feedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const googleSubscribeUrl = `https://calendar.google.com/calendar/r/settings/addbyurl?url=${encodeURIComponent(feedUrl)}`;

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setShowInfo(!showInfo)}
        className="gap-2"
      >
        <Calendar className="h-4 w-4" />
        Google Calendar
      </Button>

      {showInfo && (
        <div className="absolute left-0 top-12 z-50 w-96 rounded-lg border bg-white p-4 shadow-lg md:left-auto md:right-0">
          <h3 className="mb-3 font-bold">📅 ربط Google Calendar</h3>
          
          <div className="space-y-3">
            <div>
              <p className="mb-1 text-sm text-muted-foreground">
                اشتركي في رابط التقويم عشان المواعيد تنزل تلقائي:
              </p>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={feedUrl}
                  className="flex-1 rounded border bg-gray-50 px-2 py-1 text-xs"
                  dir="ltr"
                />
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <a
              href={googleSubscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-[#9C8974] px-4 py-2 text-sm text-white hover:bg-[#7A6B5A]"
            >
              <ExternalLink className="h-4 w-4" />
              أضيفي لـ Google Calendar
            </a>

            <div className="rounded bg-gray-50 p-2 text-xs text-muted-foreground">
              <p className="font-medium mb-1">الخطوات:</p>
              <ol className="list-decimal list-inside space-y-1" dir="rtl">
                <li>اضغطي الزر أعلاه</li>
                <li>بيفتح Google Calendar</li>
                <li>اضغطي &quot;Add Calendar&quot;</li>
                <li>المواعيد بتتحدث تلقائياً ✅</li>
              </ol>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="mt-2 w-full text-xs"
            onClick={() => setShowInfo(false)}
          >
            إغلاق
          </Button>
        </div>
      )}
    </div>
  );
}
