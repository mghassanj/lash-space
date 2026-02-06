"use client";

import { BlogCard } from "@/components/blog/blog-card";
import { useI18n } from "@/lib/i18n";

interface BlogPostData {
  id: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  slug: string;
  publishedAt: Date | null;
  tags: string;
  tagsAr: string;
  image: string | null;
}

interface BlogPageClientProps {
  posts: BlogPostData[];
  allTags: string[];
  allTagsAr: string[];
  selectedTag?: string;
}

export function BlogPageClient({
  posts,
  allTags,
  allTagsAr,
  selectedTag,
}: BlogPageClientProps) {
  const { t, locale } = useI18n();
  const tags = locale === "ar" ? allTagsAr : allTags;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F0] to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">
            {t("blog.title")}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            {t("blog.subtitle")}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        {/* Tag Filter */}
        {tags.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm uppercase tracking-wider text-gray-600 mb-4">
              {t("blog.filterByTopic")}
            </h2>
            <div className="flex flex-wrap gap-3">
              <a
                href="/blog"
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  !selectedTag
                    ? "bg-[#9C8974] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {t("blog.allPosts")}
              </a>
              {tags.map((tag) => (
                <a
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedTag === tag
                      ? "bg-[#9C8974] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Blog Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                titleAr={post.titleAr}
                excerpt={post.excerpt}
                excerptAr={post.excerptAr}
                slug={post.slug}
                publishedAt={post.publishedAt}
                tags={post.tags}
                tagsAr={post.tagsAr}
                image={post.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              {selectedTag
                ? `${t("blog.noPostsTag")} "${selectedTag}"`
                : t("blog.noPosts")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
