import { Suspense } from "react";
import ServicesContent from "@/components/admin/ServicesContent";

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-500 mt-1">Manage your service offerings</p>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ServicesContent />
      </Suspense>
    </div>
  );
}
