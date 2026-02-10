"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Gift } from "lucide-react";

export interface CustomerFormData {
  name: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  hasAllergy: boolean;
  allergyDetails: string;
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
    dateOfBirth: initialData?.dateOfBirth || "",
    hasAllergy: initialData?.hasAllergy || false,
    allergyDetails: initialData?.allergyDetails || "",
    notes: initialData?.notes || "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerFormData, string>>>({});
  const [loyaltyInfo, setLoyaltyInfo] = useState<{
    isEligibleForDiscount: boolean;
    discountPercentage: number;
    completedVisits: number;
  } | null>(null);
  const [checkingLoyalty, setCheckingLoyalty] = useState(false);

  // Check loyalty when phone number changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.phone && /^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
        checkLoyalty(formData.phone);
      } else {
        setLoyaltyInfo(null);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.phone]);

  const checkLoyalty = async (phone: string) => {
    setCheckingLoyalty(true);
    try {
      const response = await fetch(`/api/loyalty/check?phone=${encodeURIComponent(phone)}`);
      const data = await response.json();
      
      if (data.isEligibleForDiscount) {
        setLoyaltyInfo({
          isEligibleForDiscount: data.isEligibleForDiscount,
          discountPercentage: data.discountPercentage,
          completedVisits: data.completedVisits,
        });
      } else {
        setLoyaltyInfo(null);
      }
    } catch (error) {
      console.error("Error checking loyalty:", error);
      setLoyaltyInfo(null);
    } finally {
      setCheckingLoyalty(false);
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CustomerFormData, string>> = {};

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

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = isAr ? "تاريخ الميلاد مطلوب" : "Date of birth is required";
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
          {loyaltyInfo && loyaltyInfo.isEligibleForDiscount && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 bg-[#898A73]/10 border-2 border-[#898A73] rounded-lg"
            >
              <Gift className="w-5 h-5 text-[#898A73] flex-shrink-0" />
              <p className="text-sm font-medium text-[#898A73]">
                {isAr 
                  ? `🎉 جلستك الخامسة! خصم ٢٥٪ على هذا الحجز`
                  : `🎉 Your 5th visit! 25% discount on this booking`}
              </p>
            </motion.div>
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

        {/* Date of Birth */}
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-[#1A1A1A]">
            {isAr ? "تاريخ الميلاد" : "Date of Birth"} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className={errors.dateOfBirth ? "border-red-500" : ""}
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
          )}
        </div>

        {/* Allergies */}
        <div className="space-y-3">
          <Label className="text-[#1A1A1A]">
            {isAr ? "هل يوجد حساسية؟" : "Do you have any allergies?"} <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, hasAllergy: false, allergyDetails: "" })}
              className={`flex-1 py-2.5 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                !formData.hasAllergy
                  ? "border-[#9C8974] bg-[#9C8974]/10 text-[#9C8974]"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {isAr ? "لا" : "No"}
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, hasAllergy: true })}
              className={`flex-1 py-2.5 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                formData.hasAllergy
                  ? "border-[#9C8974] bg-[#9C8974]/10 text-[#9C8974]"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {isAr ? "نعم" : "Yes"}
            </button>
          </div>
          {formData.hasAllergy && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-2"
            >
              <Label htmlFor="allergyDetails" className="text-[#1A1A1A] text-sm">
                {isAr ? "يرجى ذكر نوع الحساسية" : "Please describe your allergies"}
              </Label>
              <Input
                id="allergyDetails"
                type="text"
                placeholder={isAr ? "مثال: حساسية من اللاصق الطبي..." : "e.g., adhesive allergy..."}
                value={formData.allergyDetails}
                onChange={(e) => setFormData({ ...formData, allergyDetails: e.target.value })}
              />
            </motion.div>
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
            placeholder={isAr ? "أي تفضيلات أو طلبات خاصة..." : "Any preferences or special requests..."}
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
