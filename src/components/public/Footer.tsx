import Link from "next/link";
import Image from "next/image";
import { Instagram, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const quickLinks = NAV_LINKS.filter((link) => link.href !== "/");
  
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo.svg"
                alt="LASH SPACE"
                width={160}
                height={33}
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <p className="mb-4 text-sm text-gray-300">
              {SITE_CONFIG.tagline}
            </p>
            <div className="flex gap-4">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-[#9C8974]"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-[#9C8974]"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z"/></svg>
              </a>
              <a
                href={SITE_CONFIG.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-[#25D366]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-[#9C8974]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-[#9C8974]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-semibold text-[#9C8974]">
              <Clock className="h-5 w-5" />
              Hours
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex justify-between">
                <span>Sun - Thu</span>
                <span>{SITE_CONFIG.hours.sunday.en}</span>
              </li>
              <li className="flex justify-between">
                <span>Friday</span>
                <span className="text-[#9C8974]">{SITE_CONFIG.hours.friday.en}</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>{SITE_CONFIG.hours.saturday.en}</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-[#9C8974]">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#9C8974]" />
                <span>{SITE_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-[#9C8974]" />
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="transition-colors hover:text-[#9C8974]"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-[#9C8974]" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="transition-colors hover:text-[#9C8974]"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-400 md:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-[#9C8974]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[#9C8974]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
