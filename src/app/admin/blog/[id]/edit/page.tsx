export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";

async function getBlogPost(id: string) {
  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return post;
}

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPost(id);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">تعديل المقال</h1>
        <p className="text-gray-500 mt-1">تحديث محتوى المقال</p>
      </div>

      <BlogEditor post={post} />
    </div>
  );
}
