import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parse, format, addMinutes, isAfter, isBefore, startOfDay, endOfDay } from "date-fns";

// Business hours by day of week (0 = Sunday, 6 = Saturday)
// Sunday-Thursday: 9:00 AM - 6:00 PM | Friday & Saturday: Closed
const BUSINESS_HOURS = {
  0: { open: "09:00", close: "18:00" }, // Sunday (الأحد)
  1: { open: "09:00", close: "18:00" }, // Monday (الإثنين)
  2: { open: "09:00", close: "18:00" }, // Tuesday (الثلاثاء)
  3: { open: "09:00", close: "18:00" }, // Wednesday (الأربعاء)
  4: { open: "09:00", close: "18:00" }, // Thursday (الخميس)
  5: null, // Friday (الجمعة) - closed
  6: null, // Saturday (السبت) - closed
};

// Fixed time slots: 9:00 AM, 12:00 PM, 3:00 PM, 6:00 PM
const TIME_SLOTS = ["09:00", "12:00", "15:00", "18:00"];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get("date");
    const serviceId = searchParams.get("serviceId");

    if (!dateParam || !serviceId) {
      return NextResponse.json(
        { error: "Missing required parameters: date and serviceId" },
        { status: 400 }
      );
    }

    // Parse the date
    const selectedDate = new Date(dateParam);
    if (isNaN(selectedDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    // Get the service to know its duration
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Get day of week
    const dayOfWeek = selectedDate.getDay();
    const hours = BUSINESS_HOURS[dayOfWeek as keyof typeof BUSINESS_HOURS];

    if (!hours) {
      // Closed on this day
      return NextResponse.json({ slots: [] });
    }

    // Use fixed time slots
    const allSlots: string[] = TIME_SLOTS;

    // Get existing appointments for this date
    const startOfSelectedDay = startOfDay(selectedDate);
    const endOfSelectedDay = endOfDay(selectedDate);

    const existingAppointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startOfSelectedDay,
          lte: endOfSelectedDay,
        },
        status: {
          not: "cancelled",
        },
      },
      include: {
        service: true,
      },
    });

    // Filter out slots that conflict with existing appointments
    const availableSlots = allSlots.filter((slotTime) => {
      const slotStart = parse(slotTime, "HH:mm", selectedDate);
      const slotEnd = addMinutes(slotStart, service.duration);

      // Check if this slot conflicts with any existing appointment
      const hasConflict = existingAppointments.some((appointment) => {
        const appointmentStart = appointment.date;
        const appointmentEnd = appointment.endTime;

        // Two appointments conflict if they overlap
        // Overlap happens if: slotStart < appointmentEnd AND slotEnd > appointmentStart
        return (
          isBefore(slotStart, appointmentEnd) && isAfter(slotEnd, appointmentStart)
        );
      });

      return !hasConflict;
    });

    return NextResponse.json({ slots: availableSlots });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
