export const dynamic = "force-dynamic";
import BlogEditor from "@/components/admin/BlogEditor";

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">مقال جديد</h1>
        <p className="text-gray-500 mt-1">أنشئ مقال مدونة جديد</p>
      </div>

      <BlogEditor />
    </div>
  );
}
