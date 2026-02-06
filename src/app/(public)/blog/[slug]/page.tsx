import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Tag, ChevronRight, ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { SITE_CONFIG } from "@/lib/constants";
import { generateBlogPostJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { BlogContent } from "@/components/blog/blog-content";
import { ShareButtons } from "@/components/blog/share-buttons";
import { BlogCard } from "@/components/blog/blog-card";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

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
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  });

  if (!post) {
    notFound();
  }

  const tagList = post.tags.split(",").map((tag) => tag.trim());

  // Get related posts (same tags, limit 3)
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      published: true,
      id: { not: post.id },
      OR: tagList.map((tag) => ({
        tags: { contains: tag },
      })),
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

      <div className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <nav className="bg-[#F5F5F0] border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#9C8974]">
                  Home
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-[#9C8974]"
                >
                  Blog
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li className="text-[#1A1A1A] font-medium truncate max-w-md">
                {post.title}
              </li>
            </ol>
          </div>
        </nav>

        {/* Article */}
        <article className="container mx-auto px-6 py-16 max-w-4xl">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#9C8974] hover:text-[#B8855C] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>

          {/* Header */}
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

            <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-gray-600">
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <time dateTime={post.publishedAt.toISOString()}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-12 rounded-lg overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div className="mb-12">
            <BlogContent content={post.content} />
          </div>

          {/* Author Info */}
          <div className="bg-gradient-to-br from-[#9C8974]/10 to-[#898A73]/10 rounded-lg p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-[#9C8974] rounded-full flex items-center justify-center text-white text-2xl font-serif">
                LS
              </div>
              <div>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-2">
                  Lash Space Team
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our team of expert lash artists brings years of experience in
                  premium eyelash extensions. We're passionate about helping you
                  achieve stunning, natural-looking lashes and sharing our
                  knowledge to help you care for them.
                </p>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="mb-12 pb-12 border-b border-gray-200">
            <ShareButtons
              url={`${SITE_CONFIG.url}/blog/${post.slug}`}
              title={post.title}
            />
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] text-white rounded-lg p-8 text-center mb-16">
            <h2 className="text-3xl font-serif mb-4">
              Ready to Experience Premium Lash Extensions?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Book your appointment today and let our expert lash artists create
              the perfect look for you.
            </p>
            <Link
              href="/booking"
              className="inline-block bg-[#9C8974] text-white px-8 py-3 rounded-lg hover:bg-[#B8855C] transition-colors"
            >
              Book Appointment
            </Link>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="text-3xl font-serif text-[#1A1A1A] mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard
                    key={relatedPost.id}
                    title={relatedPost.title}
                    excerpt={relatedPost.excerpt}
                    slug={relatedPost.slug}
                    publishedAt={relatedPost.publishedAt}
                    tags={relatedPost.tags}
                    image={relatedPost.image}
                  />
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  );
}
