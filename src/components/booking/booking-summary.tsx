"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, DollarSign, User, Phone, Mail, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  category: string;
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

export function BookingSummary({
  service,
  date,
  time,
  customerData,
  onConfirm,
  onBack,
  loading = false,
}: BookingSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
            Booking Summary
          </h2>
          <p className="text-gray-600">
            Please review your booking details before confirming
          </p>
        </div>

        <div className="space-y-4">
          {/* Service Details */}
          <div className="p-4 bg-[#E8E8DC] rounded-lg space-y-3">
            <h3 className="font-semibold text-[#1A1A1A] mb-3">Service</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-[#9C8974]" />
                <span className="font-medium">{service.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{service.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span className="font-semibold">${service.price}</span>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="p-4 bg-[#E8E8DC] rounded-lg space-y-3">
            <h3 className="font-semibold text-[#1A1A1A] mb-3">Date & Time</h3>
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
            <h3 className="font-semibold text-[#1A1A1A] mb-3">Your Details</h3>
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
                    <p className="font-medium text-gray-600 mb-1">Notes:</p>
                    <p className="text-gray-700">{customerData.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Total */}
          <div className="p-4 bg-[#1A1A1A] text-white rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold text-[#9C8974]">
                ${service.price}
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
            Back
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-[#9C8974] hover:bg-[#B07E5C] text-white"
          >
            {loading ? "Confirming..." : "Confirm Booking"}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
