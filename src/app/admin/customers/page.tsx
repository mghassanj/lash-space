export const dynamic = "force-dynamic";
import { Suspense } from "react";
import CustomersContent from "@/components/admin/CustomersContent";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">العملاء</h1>
          <p className="text-gray-500 mt-1">إدارة قاعدة بيانات العملاء</p>
        </div>
      </div>

      <Suspense fallback={<div>جاري التحميل...</div>}>
        <CustomersContent />
      </Suspense>
    </div>
  );
}
