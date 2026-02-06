export const dynamic = "force-dynamic";
import { Suspense } from "react";
import AppointmentsContent from "@/components/admin/AppointmentsContent";
import { CalendarSync } from "@/components/admin/CalendarSync";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500 mt-1">Manage and view all appointments</p>
        </div>
        <CalendarSync />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <AppointmentsContent />
      </Suspense>
    </div>
  );
}
