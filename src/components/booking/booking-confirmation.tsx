"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Calendar, Download } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface BookingConfirmationProps {
  appointment: {
    id: string;
    date: Date;
    service: {
      name: string;
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

export function BookingConfirmation({ appointment }: BookingConfirmationProps) {
  const { date, service, customer } = appointment;

  // Generate calendar download link
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
      `DESCRIPTION:Your ${service.name} appointment at LASH SPACE`,
      "LOCATION:123 Beauty Lane, Suite 4, Los Angeles, CA 90001",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([calendarData], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lash-studio-appointment.ics";
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
        {/* Success Icon */}
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

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-8">
            Your appointment has been successfully booked. We've sent a confirmation to{" "}
            {customer.email || customer.phone}.
          </p>
        </motion.div>

        {/* Appointment Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#E8E8DC] rounded-lg p-6 mb-6 text-left"
        >
          <h3 className="font-semibold text-[#1A1A1A] mb-4 text-center">
            Appointment Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Booking ID:</span>
              <span className="font-medium text-[#1A1A1A]">
                #{appointment.id.slice(-8).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium text-[#1A1A1A]">{service.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium text-[#1A1A1A]">
                {format(new Date(date), "EEEE, MMMM d, yyyy")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium text-[#1A1A1A]">
                {format(new Date(date), "h:mm a")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium text-[#1A1A1A]">
                {service.duration} minutes
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200">
              <span className="text-gray-600 font-semibold">Total:</span>
              <span className="font-bold text-[#9C8974] text-xl">
                ${appointment.totalPrice}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
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
            <Calendar className="w-4 h-4 mr-2" />
            Add to Calendar
          </Button>
          
          <Link href="/" className="block">
            <Button variant="outline" className="w-full border-gray-300">
              Return to Home
            </Button>
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-gray-500 mt-6"
        >
          Please arrive 5-10 minutes early. If you need to reschedule or cancel,
          please contact us at least 24 hours in advance.
        </motion.p>
      </Card>
    </motion.div>
  );
}
