import { Award, Heart, Home, Shield, Sparkles, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/public/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - LASH SPACE",
  description: "Learn about LASH SPACE, a premium home-based lash studio in Jeddah Al-Manar offering personalized eyelash extension services.",
};

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Personalized Service",
      description: "Every client gets undivided attention in a private, one-on-one setting. Your lashes are crafted to match your unique eye shape and style.",
    },
    {
      icon: Sparkles,
      title: "Artistry & Precision",
      description: "Each lash set is a work of art. We use the latest techniques and continuously refine our skills to deliver flawless results.",
    },
    {
      icon: Shield,
      title: "Premium Products",
      description: "Only the highest quality, hypoallergenic products are used — ensuring safe, comfortable, and long-lasting lash extensions.",
    },
    {
      icon: Home,
      title: "Comfort & Privacy",
      description: "Enjoy the luxury of a private studio experience. No crowds, no waiting — just you and your lash artist in a relaxing environment.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1A1A1A] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold text-[#E8E8DC]">About Lash Space</h1>
          <p className="mx-auto max-w-2xl text-lg text-[#BBBAB3]">
            A premium home-based lash studio in the heart of Jeddah
          </p>
        </div>
      </section>

      {/* Our Story */}
      <Section className="bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold text-[#1A1A1A]">
            Our Story
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Lash Space was born from a passion for beauty and a desire to bring premium lash
              artistry to Jeddah. What started as a dream has grown into a trusted name for
              eyelash extensions in the Al-Manar neighborhood.
            </p>
            <p>
              As a home-based studio, we offer something that traditional salons can't — a truly
              private, personalized experience. Every appointment is one-on-one, giving you the
              undivided attention you deserve. No rushing, no distractions — just expert artistry
              in a comfortable, relaxing setting.
            </p>
            <p>
              We believe that beautiful lashes shouldn't just look amazing — they should feel
              natural and be safe for your eyes. That's why we invest in the best products and
              continuously develop our techniques to deliver results that exceed expectations.
            </p>
          </div>
        </div>
      </Section>

      {/* Why Home Studio */}
      <Section className="bg-[#E8E8DC]/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold text-[#1A1A1A]">
            Why a Home Studio?
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              A home studio isn't just where we work — it's a deliberate choice. We believe
              the best lash experience happens when you're truly relaxed. Our private studio
              in Jeddah Al-Manar is designed to feel like a personal retreat.
            </p>
            <p>
              You won't find a busy waiting room or background noise here. Just a calm, clean,
              welcoming space where every detail is focused on your comfort — from the temperature
              to the music to the freshly sanitized tools prepared just for you.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-white">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#1A1A1A]">
            What We Stand For
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            The principles behind every lash set we create
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Card key={value.title} className="border-none bg-[#E8E8DC]/50">
              <CardHeader>
                <value.icon className="mb-4 h-12 w-12 text-[#9C8974]" />
                <CardTitle className="font-serif text-xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section className="bg-[#1A1A1A] text-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <Award className="h-16 w-16 text-[#9C8974]" />
          </div>
          <h2 className="mb-6 font-serif text-4xl font-bold text-[#E8E8DC]">
            Our Commitment
          </h2>
          <p className="mb-8 text-lg text-[#BBBAB3]">
            Quality and safety are non-negotiable
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Premium Hypoallergenic Products",
              "Certified Lash Extension Techniques",
              "Strict Hygiene & Sanitation",
              "Continuous Skill Development",
              "Personalized Consultations",
              "Aftercare Support & Guidance",
            ].map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-3 rounded-lg bg-white/10 p-4"
              >
                <Star className="h-5 w-5 flex-shrink-0 text-[#9C8974]" />
                <span className="text-left text-sm text-[#E8E8DC]">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-white">
        <div className="text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-[#1A1A1A]">
            Experience the Lash Space Difference
          </h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Book your private appointment and see why our clients keep coming back
          </p>
          <a
            href="/booking"
            className="inline-flex h-11 items-center justify-center rounded-md bg-[#9C8974] px-8 text-sm font-medium text-white transition-colors hover:bg-[#7A6B5A]"
          >
            Book Your Appointment
          </a>
        </div>
      </Section>
    </>
  );
}
