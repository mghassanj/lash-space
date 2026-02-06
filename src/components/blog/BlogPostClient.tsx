"use client";

import Link from "next/link";
import { Calendar, Tag, ChevronRight, ArrowLeft } from "lucide-react";
import { BlogContent } from "@/components/blog/blog-content";
import { ShareButtons } from "@/components/blog/share-buttons";
import { BlogCard } from "@/components/blog/blog-card";
import { useI18n } from "@/lib/i18n";
import { SITE_CONFIG } from "@/lib/constants";

interface BlogPostData {
  id: string;
  title: string;
  titleAr: string;
  slug: string;
  content: string;
  contentAr: string;
  excerpt: string;
  excerptAr: string;
  tags: string;
  tagsAr: string;
  image: string | null;
  publishedAt: string | null;
}

interface RelatedPostData {
  id: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  slug: string;
  publishedAt: string | null;
  tags: string;
  tagsAr: string;
  image: string | null;
}

interface Props {
  post: BlogPostData;
  relatedPosts: RelatedPostData[];
}

export function BlogPostClient({ post, relatedPosts }: Props) {
  const { locale } = useI18n();
  const ar = locale === "ar";

  const title = ar && post.titleAr ? post.titleAr : post.title;
  const content = ar && post.contentAr ? post.contentAr : post.content;
  const tags = ar && post.tagsAr ? post.tagsAr : post.tags;
  const tagList = tags.split(",").map((t) => t.trim());

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <nav className="bg-[#F5F5F0] border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-[#9C8974]">
                {ar ? "الرئيسية" : "Home"}
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li>
              <Link href="/blog" className="text-gray-600 hover:text-[#9C8974]">
                {ar ? "المدونة" : "Blog"}
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li className="text-[#1A1A1A] font-medium truncate max-w-md">{title}</li>
          </ol>
        </div>
      </nav>

      <article className="container mx-auto px-6 py-16 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#9C8974] hover:text-[#B8855C] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>{ar ? "العودة للمدونة" : "Back to Blog"}</span>
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {tagList.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-[#9C8974]/10 text-[#9C8974] rounded-full text-sm hover:bg-[#9C8974]/20 transition-colors"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </Link>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6">{title}</h1>

          {post.publishedAt && (
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <time dateTime={post.publishedAt} dir="ltr">
                {new Date(post.publishedAt).toLocaleDateString(ar ? "ar-SA" : "en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
          )}
        </header>

        {post.image && (
          <div className="mb-12 rounded-lg overflow-hidden">
            <img src={post.image} alt={title} className="w-full h-auto" />
          </div>
        )}

        <div className="mb-12">
          <BlogContent content={content} />
        </div>

        <div className="bg-gradient-to-br from-[#9C8974]/10 to-[#898A73]/10 rounded-lg p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-[#9C8974] rounded-full flex items-center justify-center text-white text-2xl font-serif">LS</div>
            <div>
              <h3 className="text-xl font-serif text-[#1A1A1A] mb-2">
                {ar ? "فريق لاش سبيس" : "Lash Space Team"}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {ar
                  ? "فريقنا من فنانات الرموش الخبيرات يجلب سنوات من الخبرة في رموش الإكستنشن الفاخرة. نحن شغوفات بمساعدتك لتحقيق رموش مذهلة وطبيعية."
                  : "Our team of expert lash artists brings years of experience in premium eyelash extensions. We're passionate about helping you achieve stunning, natural-looking lashes."}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12 pb-12 border-b border-gray-200">
          <ShareButtons url={`${SITE_CONFIG.url}/blog/${post.slug}`} title={title} />
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] text-white rounded-lg p-8 text-center mb-16">
          <h2 className="text-3xl font-serif mb-4">
            {ar ? "جاهزة لتجربة رموش إكستنشن فاخرة؟" : "Ready to Experience Premium Lash Extensions?"}
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            {ar ? "احجزي موعدك اليوم ودعي فنانات الرموش يصنعن الإطلالة المثالية لك." : "Book your appointment today and let our expert lash artists create the perfect look for you."}
          </p>
          <Link href="/booking" className="inline-block bg-[#9C8974] text-white px-8 py-3 rounded-lg hover:bg-[#B8855C] transition-colors">
            {ar ? "احجزي موعدك" : "Book Appointment"}
          </Link>
        </div>

        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-3xl font-serif text-[#1A1A1A] mb-8">
              {ar ? "مقالات ذات صلة" : "Related Articles"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <BlogCard
                  key={rp.id}
                  title={rp.title}
                  titleAr={rp.titleAr}
                  excerpt={rp.excerpt}
                  excerptAr={rp.excerptAr}
                  slug={rp.slug}
                  publishedAt={rp.publishedAt ? new Date(rp.publishedAt) : null}
                  tags={rp.tags}
                  tagsAr={rp.tagsAr}
                  image={rp.image}
                />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
