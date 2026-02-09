"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", key: "nav.home" },
  { href: "/services", key: "nav.services" },
  { href: "/gallery", key: "nav.gallery" },
  { href: "/about", key: "nav.about" },
  { href: "/blog", key: "nav.blog" },
  { href: "/contact", key: "nav.contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t, locale } = useI18n();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#BAB0A5]/20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Top row: Nav links + Logo centered + Book button */}
      <div className="container mx-auto px-4">
        {/* Desktop */}
        <div className="hidden md:flex flex-col items-center py-3">
          {/* Logo centered + slogan */}
          <Link href="/" className="flex flex-col items-center mb-3">
            <Image
              src="/images/logo.svg"
              alt="LASH SPACE"
              width={180}
              height={37}
              className="h-9 w-auto"
              priority
            />
            <span className="mt-1 text-[10px] tracking-[0.25em] uppercase text-[#BAB0A5]">
              {locale === "ar" ? "مساحة صُممت لراحتك وجمالك" : "A space designed for your comfort and beauty"}
            </span>
          </Link>
          {/* Nav links */}
          <nav className="flex items-center gap-6">
            {NAV_ITEMS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#9C8974]",
                  pathname === link.href
                    ? "text-[#9C8974]"
                    : "text-muted-foreground"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
            <LanguageSwitcher />
            <Button asChild className="bg-[#9C8974] hover:bg-[#7A6B5A]">
              <Link href="/booking">{t("nav.bookNow")}</Link>
            </Button>
          </nav>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center justify-between h-14">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 font-serif">
                  <Image
                    src="/images/logo.svg"
                    alt="LASH SPACE"
                    width={140}
                    height={29}
                    className="h-7 w-auto"
                  />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1 px-2">
                {NAV_ITEMS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-[#E8E8DC] hover:text-[#9C8974]",
                      pathname === link.href
                        ? "bg-[#E8E8DC]/50 text-[#9C8974]"
                        : "text-[#1A1A1A]"
                    )}
                  >
                    {t(link.key)}
                  </Link>
                ))}
                <Button asChild className="mt-4 bg-[#9C8974] hover:bg-[#7A6B5A]">
                  <Link href="/booking" onClick={() => setOpen(false)}>
                    {t("nav.bookNow")}
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Centered logo on mobile */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <Image
              src="/images/logo.svg"
              alt="LASH SPACE"
              width={150}
              height={31}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
