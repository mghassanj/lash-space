export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { BlogPageClient } from "@/components/blog/BlogPageClient";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog | Expert Lash Extension Tips & Guides",
  description:
    "Expert advice on eyelash extensions, aftercare tips, style guides, and everything you need to know about lash extensions.",
  openGraph: {
    title: "Lash Extension Blog | Expert Tips & Guides",
    description:
      "Expert advice on eyelash extensions, aftercare tips, style guides.",
    url: `${SITE_CONFIG.url}/blog`,
  },
};

interface PageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedTag = params.tag;

  // Fetch published posts
  let posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  // Filter by tag if selected
  if (selectedTag) {
    posts = posts.filter((post) =>
      post.tags
        .split(",")
        .map((t) => t.trim())
        .includes(selectedTag)
    );
  }

  // Get all unique tags (EN and AR)
  const allTagsSet = new Set<string>();
  const allTagsArSet = new Set<string>();
  posts.forEach((post) => {
    post.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((tag) => allTagsSet.add(tag));
    if (post.tagsAr) {
      post.tagsAr
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .forEach((tag) => allTagsArSet.add(tag));
    }
  });

  const serializedPosts = posts.map((p) => ({
    id: p.id,
    title: p.title,
    titleAr: p.titleAr,
    excerpt: p.excerpt,
    excerptAr: p.excerptAr,
    slug: p.slug,
    publishedAt: p.publishedAt,
    tags: p.tags,
    tagsAr: p.tagsAr,
    image: p.image,
  }));

  return (
    <BlogPageClient
      posts={serializedPosts}
      allTags={Array.from(allTagsSet).sort()}
      allTagsAr={Array.from(allTagsArSet).sort()}
      selectedTag={selectedTag}
    />
  );
}
