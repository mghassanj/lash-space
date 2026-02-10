export const dynamic = "force-dynamic";
import { Suspense } from "react";
import ReviewsContent from "@/components/admin/ReviewsContent";

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">التقييمات</h1>
          <p className="text-gray-500 mt-1">إدارة تقييمات العملاء</p>
        </div>
      </div>

      <Suspense fallback={<div>جاري التحميل...</div>}>
        <ReviewsContent />
      </Suspense>
    </div>
  );
}
