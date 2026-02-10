"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Award, Heart, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/public/Section";
import { InstagramFeed } from "@/components/public/InstagramFeed";
import { useI18n } from "@/lib/i18n";
import ReviewForm from "@/components/public/ReviewForm";
import FeaturedBlogPosts from "@/components/public/FeaturedBlogPosts";
import TestimonialsSection from "@/components/public/TestimonialsSection";

const heroSlides = [
  {
    titleKey: "hero.slide1.title",
    descKey: "hero.slide1.description",
    bg: "from-[#9C8974]/40 via-[#1A1A1A]/60 to-[#1A1A1A]",
    image: "/images/hero-1.jpg",
  },
  {
    titleKey: "hero.slide2.title",
    descKey: "hero.slide2.description",
    bg: "from-[#BAB0A5]/30 via-[#1A1A1A]/60 to-[#1A1A1A]",
    image: "/images/hero-2.jpg",
  },
  {
    titleKey: "hero.slide3.title",
    descKey: "hero.slide3.description",
    bg: "from-[#898A73]/30 via-[#1A1A1A]/60 to-[#1A1A1A]",
    image: "/images/hero-3.jpg",
  },
];

function HeroSection({ t, locale }: { t: (key: string) => string; locale: string }) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const nextSlide = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
      setFade(true);
    }, 400);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = heroSlides[current];

  return (
    <>
      {/* Part 1: Animated Slider */}
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden bg-[#1A1A1A] md:min-h-[50vh]">
        {/* Background images */}
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-gradient-to-b ${s.bg} transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className={`transition-all duration-500 ${fade ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.15em] text-[#BAB0A5] md:tracking-[0.3em]">
              LASH SPACE
            </p>
            <h1 className="mb-6 font-serif text-4xl font-bold text-[#E8E8DC] md:text-6xl">
              {t(slide.titleKey)}
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#BBBAB3] md:text-lg">
              {t(slide.descKey)}
            </p>
          </div>

          {/* Slide indicators */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true); }, 400); }}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-[#9C8974]" : "w-2 bg-[#BAB0A5]/40 hover:bg-[#BAB0A5]/60"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Part 2: Fixed CTA */}
      <section className="bg-[#1A1A1A] py-6 border-t border-[#BAB0A5]/10">
        <div className="container mx-auto px-4 text-center">
          <Button
            asChild
            size="lg"
            className="bg-[#9C8974] px-10 text-lg text-white hover:bg-[#7A6B5A]"
          >
            <Link href="/booking">{t("hero.bookAppointment")}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  const { t, locale } = useI18n();

  const featuredServices = [
    {
      icon: "✨",
      title: t("services.classic"),
      description: t("services.classicDesc"),
      href: "/services#classic",
    },
    {
      icon: "💫",
      title: t("services.volume"),
      description: t("services.volumeDesc"),
      href: "/services#volume",
    },
    {
      icon: "🌟",
      title: t("services.hybrid"),
      description: t("services.hybridDesc"),
      href: "/services#hybrid",
    },
  ];

  const features = [
    {
      icon: Award,
      title: t("why.expertTitle"),
      description: t("why.expertDesc"),
    },
    {
      icon: Sparkles,
      title: t("why.premiumTitle"),
      description: t("why.premiumDesc"),
    },
    {
      icon: Heart,
      title: t("why.luxuryTitle"),
      description: t("why.luxuryDesc"),
    },
  ];

  return (
    <>
      {/* Hero Section — Slider + CTA */}
      <HeroSection t={t} locale={locale} />

      {/* Why Choose Us */}
      <Section className="bg-[#E8E8DC]">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#1A1A1A]">
            {t("why.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("why.subtitle")}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-none bg-white shadow-md"
            >
              <CardHeader>
                <feature.icon className="mb-4 h-12 w-12 text-[#9C8974]" />
                <CardTitle className="font-serif text-2xl">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Featured Blog Posts */}
      <FeaturedBlogPosts />

      {/* Testimonials with Review Form */}
      <TestimonialsSection />

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* About section removed */}

      {/* CTA Banner */}
      <Section className="bg-[#1A1A1A] text-white">
        <div className="text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#E8E8DC]">
            {t("cta.title")}
          </h2>
          <p className="mb-8 text-lg text-[#BBBAB3]">{t("cta.subtitle")}</p>
          <Button
            asChild
            size="lg"
            className="bg-[#9C8974] px-8 text-lg text-white hover:bg-[#7A6B5A]"
          >
            <Link href="/booking">{t("cta.scheduleNow")}</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
