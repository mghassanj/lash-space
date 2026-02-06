"use client";

import { useI18n } from "@/lib/i18n";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <button
      onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
      className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-[#E8E8DC] hover:text-[#9C8974]"
      aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
    >
      <Globe className="h-4 w-4" />
      <span>{locale === "ar" ? "EN" : "عربي"}</span>
    </button>
  );
}
