export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { SITE_CONFIG } from "@/lib/constants";
import { generateBlogPostJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { BlogPostClient } from "@/components/blog/BlogPostClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  });

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      url: `${SITE_CONFIG.url}/blog/${post.slug}`,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  });

  if (!post) notFound();

  const tagList = post.tags.split(",").map((tag) => tag.trim());

  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      published: true,
      id: { not: post.id },
      OR: tagList.map((tag) => ({ tags: { contains: tag } })),
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
  });

  const blogPostJsonLd = generateBlogPostJsonLd(post);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Blog", url: `${SITE_CONFIG.url}/blog` },
    { name: post.title, url: `${SITE_CONFIG.url}/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogPostClient
        post={{
          id: post.id,
          title: post.title,
          titleAr: post.titleAr,
          slug: post.slug,
          content: post.content,
          contentAr: post.contentAr,
          excerpt: post.excerpt,
          excerptAr: post.excerptAr,
          tags: post.tags,
          tagsAr: post.tagsAr,
          image: post.image,
          publishedAt: post.publishedAt?.toISOString() ?? null,
        }}
        relatedPosts={relatedPosts.map((rp) => ({
          id: rp.id,
          title: rp.title,
          titleAr: rp.titleAr,
          excerpt: rp.excerpt,
          excerptAr: rp.excerptAr,
          slug: rp.slug,
          publishedAt: rp.publishedAt?.toISOString() ?? null,
          tags: rp.tags,
          tagsAr: rp.tagsAr,
          image: rp.image,
        }))}
      />
    </>
  );
}
