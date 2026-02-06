"use client";

import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/public/Section";
import { SITE_CONFIG } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";

export default function ContactPage() {
  const { locale } = useI18n();
  const ar = locale === "ar";

  return (
    <>
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#9C8974]/30 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold">
            {ar ? "تواصلي معنا" : "Contact Us"}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            {ar ? "نحب نسمع منك! تواصلي معنا لأي استفسار أو لحجز موعدك." : "We'd love to hear from you! Reach out with any questions or to book your appointment."}
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl">
          {/* WhatsApp CTA */}
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#25D366]/10 to-[#25D366]/5 border border-[#25D366]/20 p-8 text-center">
            <MessageCircle className="mx-auto mb-4 h-12 w-12 text-[#25D366]" />
            <h2 className="mb-2 font-serif text-2xl font-bold text-[#1A1A1A]">
              {ar ? "تواصلي معنا عبر واتساب" : "Chat with us on WhatsApp"}
            </h2>
            <p className="mb-4 text-muted-foreground">
              {ar ? "أسرع طريقة للحجز والاستفسار" : "The fastest way to book and ask questions"}
            </p>
            <a
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1DA851]"
            >
              <MessageCircle className="h-4 w-4" />
              {ar ? "ارسلي رسالة واتساب" : "Send WhatsApp Message"}
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-[#9C8974]/20 bg-[#E8E8DC]/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-xl">
                  <MapPin className="h-5 w-5 text-[#9C8974]" />
                  {ar ? "موقعنا" : "Visit Us"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{ar ? SITE_CONFIG.addressAr : SITE_CONFIG.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address + ", Jeddah, Saudi Arabia")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-[#9C8974] hover:underline"
                >
                  {ar ? "احصلي على الاتجاهات ←" : "Get Directions →"}
                </a>
              </CardContent>
            </Card>

            <Card className="border-[#9C8974]/20 bg-[#E8E8DC]/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-xl">
                  <Phone className="h-5 w-5 text-[#9C8974]" />
                  {ar ? "اتصلي بنا" : "Call Us"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href={`tel:${SITE_CONFIG.phone}`} className="text-muted-foreground hover:text-[#9C8974]" dir="ltr">
                  {SITE_CONFIG.phone}
                </a>
                <p className="mt-2 text-sm text-muted-foreground">
                  {ar ? "متاحين خلال ساعات العمل" : "Available during business hours"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#9C8974]/20 bg-[#E8E8DC]/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-xl">
                  <Clock className="h-5 w-5 text-[#9C8974]" />
                  {ar ? "ساعات العمل" : "Business Hours"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{ar ? "الأحد - الخميس" : "Sun - Thu"}</span>
                    <span className="font-medium">{ar ? SITE_CONFIG.hours.sunday.ar : SITE_CONFIG.hours.sunday.en}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{ar ? "الجمعة" : "Friday"}</span>
                    <span className="font-medium text-[#9C8974]">{ar ? "مغلق" : "Closed"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{ar ? "السبت" : "Saturday"}</span>
                    <span className="font-medium">{ar ? SITE_CONFIG.hours.saturday.ar : SITE_CONFIG.hours.saturday.en}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#9C8974]/20 bg-[#E8E8DC]/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-xl">
                  <Instagram className="h-5 w-5 text-[#9C8974]" />
                  {ar ? "تابعينا" : "Follow Us"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <a
                    href={SITE_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9C8974] text-white transition-colors hover:bg-[#7A6B5A]"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={SITE_CONFIG.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9C8974] text-white transition-colors hover:bg-[#7A6B5A]"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z"/></svg>
                  </a>
                </div>
                <p className="mt-2 text-sm text-muted-foreground" dir="ltr">@lashspace.sa</p>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="mt-8 overflow-hidden rounded-2xl">
            <div className="flex h-[300px] items-center justify-center bg-gradient-to-br from-[#9C8974] to-[#7A6B5A]">
              <div className="text-center text-white">
                <MapPin className="mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 font-serif text-2xl font-bold">
                  {ar ? "موقعنا" : "Find Us Here"}
                </h3>
                <p className="text-lg">{ar ? SITE_CONFIG.addressAr : SITE_CONFIG.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address + ", Jeddah, Saudi Arabia")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block rounded-md bg-white px-6 py-2 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-gray-100"
                >
                  {ar ? "افتحي في خرائط قوقل" : "Open in Google Maps"}
                </a>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-[#1A1A1A]">
              {ar ? "عندك أسئلة؟" : "Have Questions?"}
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              {ar ? "اطلعي على الأسئلة الشائعة للإجابات السريعة" : "Check out our FAQ for quick answers"}
            </p>
            <a href="/services#faq" className="inline-flex h-11 items-center justify-center rounded-md bg-[#9C8974] px-8 text-sm font-medium text-white transition-colors hover:bg-[#7A6B5A]">
              {ar ? "عرض الأسئلة الشائعة" : "View FAQ"}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
