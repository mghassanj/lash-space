import Link from "next/link";
import { Calendar, Tag } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: Date | null;
  tags: string;
  image?: string | null;
}

export function BlogCard({
  title,
  excerpt,
  slug,
  publishedAt,
  tags,
  image,
}: BlogCardProps) {
  const tagList = tags.split(",").map((tag) => tag.trim());

  return (
    <article className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative h-48 bg-gradient-to-br from-[#9C8974]/20 to-[#898A73]/20 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[#9C8974] text-6xl font-serif">✨</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-serif text-[#1A1A1A] mb-3 group-hover:text-[#9C8974] transition-colors line-clamp-2">
            {title}
          </h2>

          <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            {publishedAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={publishedAt.toISOString()}>
                  {new Date(publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span>{tagList[0]}</span>
              {tagList.length > 1 && (
                <span className="text-xs">+{tagList.length - 1}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
