"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format, isBefore, startOfDay, addDays } from "date-fns";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface DateTimePickerProps {
  serviceId: string;
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
}

export function DateTimePicker({
  serviceId,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}: DateTimePickerProps) {
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDate && serviceId) {
      fetchAvailability();
    }
  }, [selectedDate, serviceId]);

  const fetchAvailability = async () => {
    if (!selectedDate) return;
    
    setLoading(true);
    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const response = await fetch(
        `/api/booking/availability?date=${dateStr}&serviceId=${serviceId}`
      );
      const data = await response.json();
      setAvailableSlots(data.slots || []);
    } catch (error) {
      console.error("Error fetching availability:", error);
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const disabledDays = (date: Date) => {
    // Disable past dates
    if (isBefore(date, startOfDay(new Date()))) {
      return true;
    }
    // Disable Sundays (day 0)
    if (date.getDay() === 0) {
      return true;
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate || undefined}
          onSelect={(date) => {
            if (date) {
              onSelectDate(date);
              onSelectTime(""); // Reset time when date changes
            }
          }}
          disabled={disabledDays}
          className="rounded-lg border border-gray-200 p-4"
          classNames={{
            day_selected: "bg-[#9C8974] text-white hover:bg-[#9C8974] hover:text-white",
            day_today: "bg-gray-100 text-[#1A1A1A]",
          }}
        />
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            Available Times for {format(selectedDate, "EEEE, MMMM d")}
          </h3>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#9C8974]" />
            </div>
          ) : availableSlots.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              No available times for this date. Please select another day.
            </p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {availableSlots.map((time) => (
                <motion.div
                  key={time}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => onSelectTime(time)}
                    className={`w-full ${
                      selectedTime === time
                        ? "bg-[#9C8974] hover:bg-[#B07E5C] text-white"
                        : "border-gray-300 hover:border-[#9C8974] text-[#1A1A1A]"
                    }`}
                  >
                    {time}
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
