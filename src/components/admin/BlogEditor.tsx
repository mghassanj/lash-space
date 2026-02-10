"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, Save } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface BlogEditorProps {
  post?: {
    id: string;
    title: string;
    titleAr: string;
    slug: string;
    content: string;
    contentAr: string;
    excerpt: string;
    excerptAr: string;
    image: string | null;
    tags: string;
    tagsAr: string;
    published: boolean;
  };
}

export default function BlogEditor({ post }: BlogEditorProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    titleAr: post?.titleAr || "",
    slug: post?.slug || "",
    contentAr: post?.contentAr || "",
    excerptAr: post?.excerptAr || "",
    tagsAr: post?.tagsAr || "",
    image: post?.image || "",
    published: post?.published || false,
  });

  // Auto-generate slug from title
  useEffect(() => {
    if (!post && formData.titleAr) {
      const autoSlug = formData.titleAr
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");
      setFormData((prev) => ({ ...prev, slug: autoSlug }));
    }
  }, [formData.titleAr, post]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, published: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.titleAr.trim()) {
      toast.error("يرجى إدخال عنوان المقال");
      return;
    }

    if (!formData.contentAr.trim()) {
      toast.error("يرجى إدخال محتوى المقال");
      return;
    }

    if (!formData.slug.trim()) {
      toast.error("يرجى إدخال الرابط المختصر");
      return;
    }

    setIsSubmitting(true);

    try {
      const url = post
        ? `/api/admin/blog/${post.id}`
        : "/api/admin/blog";
      
      const method = post ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save blog post");
      }

      toast.success(post ? "تم تحديث المقال بنجاح" : "تم إنشاء المقال بنجاح");
      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      console.error("Save error:", error);
      toast.error("فشل حفظ المقال");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>تفاصيل المقال</CardTitle>
            <Link href="/admin/blog">
              <Button variant="ghost" size="sm" type="button">
                <ArrowRight className="w-4 h-4 ml-2" />
                رجوع
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title (Arabic) */}
          <div className="space-y-2">
            <Label htmlFor="titleAr">العنوان *</Label>
            <Input
              id="titleAr"
              name="titleAr"
              value={formData.titleAr}
              onChange={handleChange}
              placeholder="أدخل عنوان المقال بالعربية"
              required
              className="text-right"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">الرابط المختصر *</Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="رابط-المقال"
              required
              dir="ltr"
              className="text-left"
            />
            <p className="text-xs text-gray-500">
              سيتم استخدامه في رابط المقال: /blog/{formData.slug}
            </p>
          </div>

          {/* Excerpt (Arabic) */}
          <div className="space-y-2">
            <Label htmlFor="excerptAr">الملخص</Label>
            <Textarea
              id="excerptAr"
              name="excerptAr"
              value={formData.excerptAr}
              onChange={handleChange}
              placeholder="ملخص قصير للمقال (يظهر في قائمة المقالات)"
              rows={3}
              className="text-right resize-none"
            />
          </div>

          {/* Content (Arabic) */}
          <div className="space-y-2">
            <Label htmlFor="contentAr">المحتوى *</Label>
            <Textarea
              id="contentAr"
              name="contentAr"
              value={formData.contentAr}
              onChange={handleChange}
              placeholder="اكتب محتوى المقال هنا..."
              rows={15}
              required
              className="text-right resize-none font-arabic"
            />
          </div>

          {/* Tags (Arabic) */}
          <div className="space-y-2">
            <Label htmlFor="tagsAr">الوسوم</Label>
            <Input
              id="tagsAr"
              name="tagsAr"
              value={formData.tagsAr}
              onChange={handleChange}
              placeholder="عناية بالرموش، جمال، نصائح (مفصولة بفاصلة)"
              className="text-right"
            />
            <p className="text-xs text-gray-500">
              افصل الوسوم بفاصلة
            </p>
          </div>

          {/* Featured Image */}
          <div className="space-y-2">
            <Label htmlFor="image">رابط الصورة المميزة</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              type="url"
              dir="ltr"
              className="text-left"
            />
            {formData.image && (
              <div className="mt-2 relative w-full h-48 rounded-lg border border-gray-200 overflow-hidden">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Published Status */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="published" className="text-base font-medium">
                حالة النشر
              </Label>
              <p className="text-sm text-gray-500">
                {formData.published
                  ? "المقال منشور ومرئي للجميع"
                  : "المقال في وضع المسودة"}
              </p>
            </div>
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={handleSwitchChange}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#9C8974] hover:bg-[#898A73] text-white gap-2"
            >
              <Save className="w-4 h-4" />
              {isSubmitting
                ? "جاري الحفظ..."
                : post
                ? "تحديث المقال"
                : "نشر المقال"}
            </Button>
            <Link href="/admin/blog">
              <Button type="button" variant="outline">
                إلغاء
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
