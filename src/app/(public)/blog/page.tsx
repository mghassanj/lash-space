import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { BlogCard } from "@/components/blog/blog-card";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog | Expert Lash Extension Tips & Guides",
  description:
    "Expert advice on eyelash extensions, aftercare tips, style guides, and everything you need to know about lash extensions from professional lash artists.",
  openGraph: {
    title: "Lash Extension Blog | Expert Tips & Guides",
    description:
      "Expert advice on eyelash extensions, aftercare tips, style guides, and everything you need to know about lash extensions.",
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
      post.tags.split(",").map((t) => t.trim()).includes(selectedTag)
    );
  }

  // Get all unique tags
  const allTags = new Set<string>();
  posts.forEach((post) => {
    post.tags
      .split(",")
      .map((t) => t.trim())
      .forEach((tag) => allTags.add(tag));
  });

  const tags = Array.from(allTags).sort();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F0] to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">
            Lash Extension Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Expert tips, guides, and everything you need to know about eyelash
            extensions from our professional lash artists.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        {/* Tag Filter */}
        {tags.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm uppercase tracking-wider text-gray-600 mb-4">
              Filter by topic
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
                All Posts
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
                excerpt={post.excerpt}
                slug={post.slug}
                publishedAt={post.publishedAt}
                tags={post.tags}
                image={post.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              {selectedTag
                ? `No posts found with tag "${selectedTag}"`
                : "No blog posts available yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
