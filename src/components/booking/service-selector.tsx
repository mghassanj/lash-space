"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface Service {
  id: string;
  name: string;
  nameAr: string | null;
  description: string;
  descriptionAr: string | null;
  duration: number;
  price: number;
  category: string;
  isAddOn: boolean;
  isRetouch: boolean;
}

interface ServiceSelectorProps {
  services: Service[];
  selectedServiceId: string | null;
  onSelectService: (serviceId: string) => void;
}

function formatDuration(minutes: number, locale: string): string {
  if (minutes === 0) return "";
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (locale === "ar") {
      if (remainingMinutes > 0) {
        return `${hours} ${hours === 1 ? "ساعة" : hours === 2 ? "ساعتين" : "ساعات"} و ${remainingMinutes} دقيقة`;
      }
      return `${hours} ${hours === 1 ? "ساعة" : hours === 2 ? "ساعتين" : "ساعات"}`;
    }
    if (remainingMinutes > 0) {
      return `${hours}h ${remainingMinutes}min`;
    }
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  return locale === "ar" ? `${minutes} دقيقة` : `${minutes} min`;
}

function formatPrice(price: number, locale: string, isAddOn: boolean, isRetouch: boolean): string {
  if (isRetouch) {
    return locale === "ar" ? "نصف سعر الجلسة" : "Half price of session";
  }
  if (isAddOn) {
    return locale === "ar" ? `+${price} ر.س` : `+${price} SAR`;
  }
  return locale === "ar" ? `${price} ر.س` : `${price} SAR`;
}

const categoryLabels: Record<string, { ar: string; en: string }> = {
  monthly: { ar: "شهرية", en: "Monthly" },
  addon: { ar: "إضافة", en: "Add-on" },
  half_set: { ar: "طرف", en: "Half Set" },
  other: { ar: "أخرى", en: "Other" },
  retouch: { ar: "روتوش", en: "Retouch" },
};

export function ServiceSelector({
  services,
  selectedServiceId,
  onSelectService,
}: ServiceSelectorProps) {
  const { locale } = useI18n();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {services.map((service) => {
        const isSelected = selectedServiceId === service.id;
        const displayName = locale === "ar" && service.nameAr ? service.nameAr : service.name;
        const displayDesc = locale === "ar" && service.descriptionAr ? service.descriptionAr : service.description;
        const catLabel = categoryLabels[service.category]?.[locale] || service.category;
        
        return (
          <motion.div
            key={service.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              onClick={() => onSelectService(service.id)}
              className={`p-6 cursor-pointer transition-all duration-200 relative ${
                isSelected
                  ? "border-2 border-[#9C8974] bg-[#E8E8DC]"
                  : "border border-gray-200 hover:border-[#9C8974] hover:shadow-md"
              }`}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 left-4 w-6 h-6 bg-[#9C8974] rounded-full flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
              
              <div className="mb-3">
                <Badge
                  variant="outline"
                  className="text-xs border-[#9C8974] text-[#9C8974] mb-2"
                >
                  {catLabel}
                </Badge>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-1">
                  {displayName}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {displayDesc}
                </p>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                {service.duration > 0 && (
                  <span className="text-gray-500">
                    {formatDuration(service.duration, locale)}
                  </span>
                )}
                <span className={`text-lg font-bold text-[#9C8974] ${service.duration === 0 ? "mr-auto" : ""}`}>
                  {formatPrice(service.price, locale, service.isAddOn, service.isRetouch)}
                </span>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
