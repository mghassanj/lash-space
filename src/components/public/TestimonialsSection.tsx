"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import ReviewForm from "./ReviewForm";
import { Section } from "./Section";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  serviceType: string | null;
}

export default function TestimonialsSection() {
  const { t, locale } = useI18n();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Static fallback testimonials
  const staticTestimonials = [
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

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  // Use database reviews if available, otherwise use static testimonials
  const displayReviews = reviews.length > 0 ? reviews.slice(0, 3) : staticTestimonials;

  return (
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
        {displayReviews.map((item, index) => {
          // Handle both database reviews and static testimonials
          const isDbReview = "id" in item;
          const name = isDbReview ? item.name : item.name;
          const rating = isDbReview ? item.rating : item.rating;
          const text = isDbReview ? item.comment : item.text;
          const service = isDbReview ? item.serviceType : item.service;

          return (
            <Card
              key={isDbReview ? item.id : index}
              className="border-[#9C8974]/20 bg-[#E8E8DC]/30"
            >
              <CardHeader>
                <div className="mb-2 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < rating
                          ? "fill-[#9C8974] text-[#9C8974]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <CardTitle className="text-lg">{name}</CardTitle>
                {service && (
                  <CardDescription className="text-sm">{service}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <p className="italic text-muted-foreground">
                  &ldquo;{text}&rdquo;
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Review Form Button */}
      <div className="mt-12 text-center">
        <ReviewForm />
      </div>
    </Section>
  );
}
