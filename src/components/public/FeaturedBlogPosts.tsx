"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  titleAr: string;
  slug: string;
  excerpt: string;
  excerptAr: string;
  image: string | null;
}

export default function FeaturedBlogPosts() {
  const { t, locale } = useI18n();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Fetch blog posts and filter for the specific featured ones
        const response = await fetch("/api/blog/posts");
        const allPosts = await response.json();
        
        // Look for the two specific posts (by Arabic titles)
        const featured = allPosts.filter((post: BlogPost) => 
          post.titleAr?.includes("هل الرموش الشهرية تطيح رموشي") ||
          post.titleAr?.includes("الطريقة الصحيحة للاعتناء برموشك")
        ).slice(0, 2);

        // If we don't find those exact posts, just take the first 2 published ones
        setPosts(featured.length > 0 ? featured : allPosts.slice(0, 2));
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading || posts.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-[#1A1A1A] mb-4">
            {t("blog.featured")}
          </h2>
          <p className="text-lg text-[#898A73] max-w-2xl mx-auto">
            {t("blog.featuredSubtitle")}
          </p>
        </div>

        {/* Blog Posts - Alternating Layout */}
        <div className="space-y-16 max-w-6xl mx-auto">
          {posts.map((post, index) => {
            const isEven = index % 2 === 0;
            const title = locale === "ar" ? post.titleAr : post.title;
            const excerpt = locale === "ar" ? post.excerptAr : post.excerpt;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  !isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`${!isEven ? "md:order-2" : ""} relative h-80 rounded-lg overflow-hidden shadow-lg`}
                >
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#898A73] to-[#9C8974] flex items-center justify-center">
                      <BookOpen className="h-24 w-24 text-white opacity-40" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`${!isEven ? "md:order-1" : ""} space-y-4`}>
                  <h3 className="font-serif text-3xl font-bold text-[#1A1A1A] leading-tight">
                    {title}
                  </h3>
                  <p className="text-[#898A73] leading-relaxed">
                    {excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`}>
                    <Button
                      variant="outline"
                      className="border-[#9C8974] text-[#9C8974] hover:bg-[#9C8974] hover:text-white transition-colors group"
                    >
                      {locale === "ar" ? "اقرأي المزيد" : "Read More"}
                      <ArrowRight
                        className={`h-4 w-4 ${
                          locale === "ar" ? "mr-2 rotate-180" : "ml-2"
                        } group-hover:translate-x-1 transition-transform`}
                      />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link href="/blog">
            <Button
              size="lg"
              className="bg-[#9C8974] hover:bg-[#7A6B5A] text-white px-8"
            >
              {t("blog.browseAll")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
