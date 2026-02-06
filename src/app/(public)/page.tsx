"use client";

import Link from "next/link";
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
    {
      icon: "🌙",
      title: t("services.lashLift"),
      description: t("services.lashLiftDesc"),
      href: "/services#lash-lift",
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

  const testimonials = [
    {
      name: locale === "ar" ? "سارة م." : "Sara M.",
      rating: 5,
      text:
        locale === "ar"
          ? "حبيت رموشي! الفنانة كانت ماهرة ولطيفة جدًا. أفضل تجربة رموش مرت علي!"
          : "Absolutely in love with my lashes! The technician was so skilled and gentle. Best lash experience I've ever had!",
      service: locale === "ar" ? "فوليوم" : "Volume",
    },
    {
      name: locale === "ar" ? "نورة خ." : "Noura K.",
      rating: 5,
      text:
        locale === "ar"
          ? "الاستوديو جميل ومريح. رموشي تبان طبيعية وفخمة. كل يوم أحصل على مجاملات!"
          : "The studio is gorgeous and so relaxing. My lashes look natural yet glamorous. I get compliments every day!",
      service: locale === "ar" ? "هايبرد كامل" : "Hybrid Full Set",
    },
    {
      name: locale === "ar" ? "ريم ع." : "Reem A.",
      rating: 5,
      text:
        locale === "ar"
          ? "أزور لاش سبيس من شهور ورموشي دايم مثالية. الثبات مذهل والفريق رائع!"
          : "I've been coming here for months and my lashes always look perfect. The retention is amazing!",
      service: locale === "ar" ? "كلاسيك كامل" : "Classic Full Set",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#9C8974]/30 via-[#BAB0A5]/10 to-[#1A1A1A]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#BAB0A5]">
            {t("hero.subtitle")}
          </p>
          <h1 className="mb-6 font-serif text-5xl font-bold text-[#E8E8DC] md:text-7xl">
            {t("hero.title1")}
            <br />
            {t("hero.title2")}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[#BBBAB3] md:text-xl">
            {t("hero.description")}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-[#9C8974] px-8 text-lg text-white hover:bg-[#7A6B5A]"
            >
              <Link href="/booking">{t("hero.bookAppointment")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#BAB0A5]/50 bg-transparent px-8 text-lg text-[#E8E8DC] hover:border-[#9C8974] hover:bg-[#9C8974]/10"
            >
              <Link href="/services">{t("hero.exploreServices")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <Section className="bg-white">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#1A1A1A]">
            {t("services.signatureTitle")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("services.signatureSubtitle")}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service) => (
            <Link key={service.title} href={service.href} className="group">
              <Card className="h-full border-[#9C8974]/20 transition-all hover:border-[#9C8974] hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mb-4 text-5xl">{service.icon}</div>
                  <CardTitle className="font-serif text-xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

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

      {/* Testimonials */}
      <Section className="bg-white">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#1A1A1A]">
            {t("testimonials.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("testimonials.subtitle")}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="border-[#9C8974]/20 bg-[#E8E8DC]/30"
            >
              <CardHeader>
                <div className="mb-2 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-[#9C8974] text-[#9C8974]"
                    />
                  ))}
                </div>
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                <CardDescription className="text-sm">
                  {testimonial.service}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="italic text-muted-foreground">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Instagram Feed */}
      <InstagramFeed />

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
