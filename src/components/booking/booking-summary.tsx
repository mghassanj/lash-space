"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, User, Phone, Mail, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

interface Service {
  id: string;
  name: string;
  nameAr?: string | null;
  duration: number;
  price: number;
  category: string;
  isAddOn?: boolean;
  isRetouch?: boolean;
}

interface CustomerData {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

interface BookingSummaryProps {
  service: Service;
  date: Date;
  time: string;
  customerData: CustomerData;
  onConfirm: () => void;
  onBack: () => void;
  loading?: boolean;
}

function formatDuration(minutes: number, isAr: boolean): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    return isAr ? `${hours} ${hours <= 2 ? "ساعتين" : "ساعات"}` : `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  return isAr ? `${minutes} دقيقة` : `${minutes} min`;
}

export function BookingSummary({
  service,
  date,
  time,
  customerData,
  onConfirm,
  onBack,
  loading = false,
}: BookingSummaryProps) {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const displayName = isAr && service.nameAr ? service.nameAr : service.name;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
            {isAr ? "ملخص الحجز" : "Booking Summary"}
          </h2>
          <p className="text-gray-600">
            {isAr ? "يرجى مراجعة تفاصيل الحجز قبل التأكيد" : "Please review your booking details before confirming"}
          </p>
        </div>

        <div className="space-y-4">
          {/* Service Details */}
          <div className="p-4 bg-[#E8E8DC] rounded-lg space-y-3">
            <h3 className="font-semibold text-[#1A1A1A] mb-3">{isAr ? "الخدمة" : "Service"}</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-[#9C8974]" />
                <span className="font-medium">{displayName}</span>
              </div>
              {service.duration > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(service.duration, isAr)}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-4 h-4 flex items-center justify-center text-[#9C8974] font-bold">﷼</span>
                <span className="font-semibold">{service.price} {isAr ? "ر.س" : "SAR"}</span>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="p-4 bg-[#E8E8DC] rounded-lg space-y-3">
            <h3 className="font-semibold text-[#1A1A1A] mb-3">{isAr ? "الموعد" : "Date & Time"}</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-[#9C8974]" />
                <span>{format(date, "EEEE, MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-[#9C8974]" />
                <span>{time}</span>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="p-4 bg-[#E8E8DC] rounded-lg space-y-3">
            <h3 className="font-semibold text-[#1A1A1A] mb-3">{isAr ? "بياناتك" : "Your Details"}</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-[#9C8974]" />
                <span>{customerData.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-[#9C8974]" />
                <span>{customerData.phone}</span>
              </div>
              {customerData.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-[#9C8974]" />
                  <span>{customerData.email}</span>
                </div>
              )}
              {customerData.notes && (
                <div className="flex items-start gap-2 text-sm mt-3 pt-3 border-t border-gray-200">
                  <FileText className="w-4 h-4 text-[#9C8974] mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-600 mb-1">{isAr ? "ملاحظات:" : "Notes:"}</p>
                    <p className="text-gray-700">{customerData.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Total */}
          <div className="p-4 bg-[#1A1A1A] text-white rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">{isAr ? "الإجمالي" : "Total"}</span>
              <span className="text-2xl font-bold text-[#9C8974]">
                {service.price} {isAr ? "ر.س" : "SAR"}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={loading}
            className="flex-1 border-gray-300 text-[#1A1A1A] hover:bg-gray-50"
          >
            {isAr ? "رجوع" : "Back"}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-[#9C8974] hover:bg-[#B07E5C] text-white"
          >
            {loading ? (isAr ? "جاري التأكيد..." : "Confirming...") : (isAr ? "تأكيد الحجز" : "Confirm Booking")}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
