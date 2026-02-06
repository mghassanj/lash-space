export const dynamic = "force-dynamic";
import { Suspense } from "react";
import AppointmentsContent from "@/components/admin/AppointmentsContent";
import { CalendarSync } from "@/components/admin/CalendarSync";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">المواعيد</h1>
          <p className="text-gray-500 mt-1">إدارة ومشاهدة جميع المواعيد</p>
        </div>
        <CalendarSync />
      </div>

      <Suspense fallback={<div>جاري التحميل...</div>}>
        <AppointmentsContent />
      </Suspense>
    </div>
  );
}
