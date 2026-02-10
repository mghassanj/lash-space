export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import DeleteBlogButton from "@/components/admin/DeleteBlogButton";

async function getBlogPosts() {
  return prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">المدونة</h1>
          <p className="text-gray-500 mt-1">إدارة مقالات المدونة</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="bg-[#9C8974] hover:bg-[#898A73] text-white gap-2">
            <Plus className="w-4 h-4" />
            مقال جديد
          </Button>
        </Link>
      </div>

      {/* Blog Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>جميع المقالات ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">لا توجد مقالات بعد</p>
              <Link href="/admin/blog/new">
                <Button className="bg-[#9C8974] hover:bg-[#898A73] text-white">
                  أنشئ أول مقال
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-right py-3 px-4 font-medium text-gray-600">العنوان</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">الحالة</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">التاريخ</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">الملخص</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{post.titleAr || post.title}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant="outline" 
                          className={
                            post.published
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200"
                          }
                        >
                          {post.published ? "منشور" : "مسودة"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {format(new Date(post.createdAt), "dd/MM/yyyy")}
                      </td>
                      <td className="py-3 px-4 text-gray-600 max-w-xs truncate">
                        {post.excerptAr || post.excerpt}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/blog/${post.id}/edit`}>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-[#9C8974] hover:text-[#898A73] hover:bg-[#E8E8DC]/30"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <DeleteBlogButton postId={post.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
