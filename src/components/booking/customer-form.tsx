"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export interface CustomerFormData {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

interface CustomerFormProps {
  initialData?: Partial<CustomerFormData>;
  onSubmit: (data: CustomerFormData) => void;
  onBack: () => void;
}

export function CustomerForm({ initialData, onSubmit, onBack }: CustomerFormProps) {
  const { locale } = useI18n();
  const isAr = locale === "ar";

  const [formData, setFormData] = useState<CustomerFormData>({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    notes: initialData?.notes || "",
  });

  const [errors, setErrors] = useState<Partial<CustomerFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<CustomerFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = isAr ? "الاسم مطلوب" : "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = isAr ? "رقم الجوال مطلوب" : "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = isAr ? "صيغة الرقم غير صحيحة" : "Invalid phone number format";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = isAr ? "صيغة البريد غير صحيحة" : "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[#1A1A1A]">
            {isAr ? "الاسم الكامل" : "Full Name"} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder={isAr ? "الاسم الكامل" : "Jane Doe"}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-[#1A1A1A]">
            {isAr ? "رقم الجوال" : "Phone Number"} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder={isAr ? "05XXXXXXXX" : "+966 5X XXX XXXX"}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#1A1A1A]">
            {isAr ? "البريد الإلكتروني" : "Email"}{" "}
            <span className="text-gray-400 text-sm">({isAr ? "اختياري" : "optional"})</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes" className="text-[#1A1A1A]">
            {isAr ? "ملاحظات إضافية" : "Additional Notes"}{" "}
            <span className="text-gray-400 text-sm">({isAr ? "اختياري" : "optional"})</span>
          </Label>
          <textarea
            id="notes"
            placeholder={isAr ? "أي حساسية، تفضيلات، أو طلبات خاصة..." : "Any allergies, preferences, or special requests..."}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9C8974] min-h-[100px] resize-none"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 border-gray-300 text-[#1A1A1A] hover:bg-gray-50"
        >
          {isAr ? "رجوع" : "Back"}
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-[#9C8974] hover:bg-[#B07E5C] text-white"
        >
          {isAr ? "متابعة للتأكيد" : "Continue to Summary"}
        </Button>
      </div>
    </motion.form>
  );
}
