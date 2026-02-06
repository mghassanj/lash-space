export const dynamic = "force-dynamic";
import { Suspense } from "react";
import SettingsContent from "@/components/admin/SettingsContent";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your business settings</p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <SettingsContent />
      </Suspense>
    </div>
  );
}
