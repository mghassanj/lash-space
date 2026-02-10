"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { format12HourTime } from "@/lib/time-format";

interface BookingConfirmationProps {
  appointment: {
    id: string;
    date: Date;
    service: {
      name: string;
      nameAr?: string;
      duration: number;
      price: number;
    };
    customer: {
      name: string;
      phone: string;
      email?: string;
    };
    totalPrice: number;
  };
}

function formatDuration(minutes: number, isAr: boolean): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    return isAr ? `${hours} ${hours <= 2 ? "ساعتين" : "ساعات"}` : `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  return isAr ? `${minutes} دقيقة` : `${minutes} min`;
}

export function BookingConfirmation({ appointment }: BookingConfirmationProps) {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const { date, service, customer } = appointment;
  const displayName = isAr && service.nameAr ? service.nameAr : service.name;

  const generateCalendarLink = () => {
    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + service.duration * 60000);
    
    const formatDateForCalendar = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const calendarData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//LASH SPACE//Booking//EN",
      "BEGIN:VEVENT",
      `DTSTART:${formatDateForCalendar(startDate)}`,
      `DTEND:${formatDateForCalendar(endDate)}`,
      `SUMMARY:${service.name} - LASH SPACE`,
      `DESCRIPTION:موعدك في لاش سبيس - ${displayName}`,
      "LOCATION:Jeddah, Al-Manar",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([calendarData], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lash-space-appointment.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">
            {isAr ? "تم تأكيد الحجز!" : "Booking Confirmed!"}
          </h2>
          <p className="text-gray-600 mb-8">
            {isAr 
              ? `تم حجز موعدك بنجاح. سنرسل لك تأكيد على ${customer.email || customer.phone}`
              : `Your appointment has been successfully booked. We've sent a confirmation to ${customer.email || customer.phone}.`}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#E8E8DC] rounded-lg p-6 mb-6 text-start"
        >
          <h3 className="font-semibold text-[#1A1A1A] mb-4 text-center">
            {isAr ? "تفاصيل الموعد" : "Appointment Details"}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">{isAr ? "رقم الحجز:" : "Booking ID:"}</span>
              <span className="font-medium text-[#1A1A1A]">
                #{appointment.id.slice(-8).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{isAr ? "الخدمة:" : "Service:"}</span>
              <span className="font-medium text-[#1A1A1A]">{displayName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{isAr ? "التاريخ:" : "Date:"}</span>
              <span className="font-medium text-[#1A1A1A]">
                {format(new Date(date), "EEEE, MMMM d, yyyy")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{isAr ? "الوقت:" : "Time:"}</span>
              <span className="font-medium text-[#1A1A1A]">
                {format12HourTime(format(new Date(date), "HH:mm"), locale)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{isAr ? "المدة:" : "Duration:"}</span>
              <span className="font-medium text-[#1A1A1A]">
                {formatDuration(service.duration, isAr)}
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200">
              <span className="text-gray-600 font-semibold">{isAr ? "الإجمالي:" : "Total:"}</span>
              <span className="font-bold text-[#9C8974] text-xl">
                {appointment.totalPrice} {isAr ? "ر.س" : "SAR"}
              </span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-gray-600 text-sm">{isAr ? "الدفعة التأمينية:" : "Deposit:"}</span>
              <span className="font-semibold text-[#1A1A1A]">
                150 {isAr ? "ر.س" : "SAR"}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <Button
            onClick={generateCalendarLink}
            className="w-full bg-[#9C8974] hover:bg-[#B07E5C] text-white"
          >
            <Calendar className="w-4 h-4 me-2" />
            {isAr ? "أضيفي للتقويم" : "Add to Calendar"}
          </Button>
          
          <Link href="/" className="block">
            <Button variant="outline" className="w-full border-gray-300">
              {isAr ? "العودة للرئيسية" : "Return to Home"}
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-gray-500 mt-6"
        >
          {isAr 
            ? "يرجى الحضور قبل الموعد بـ 5 دقائق. في حال الرغبة بإعادة الجدولة أو الإلغاء، يرجى التواصل معنا قبل 24 ساعة."
            : "Please arrive 5 minutes early. If you need to reschedule or cancel, please contact us at least 24 hours in advance."}
        </motion.p>
      </Card>
    </motion.div>
  );
}
