import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parse, format, addMinutes, isAfter, isBefore, startOfDay, endOfDay } from "date-fns";

// Business hours by day of week (0 = Sunday, 6 = Saturday)
const BUSINESS_HOURS = {
  0: null, // Sunday - closed
  1: { open: "09:00", close: "19:00" }, // Monday
  2: { open: "09:00", close: "19:00" }, // Tuesday
  3: { open: "09:00", close: "19:00" }, // Wednesday
  4: { open: "09:00", close: "21:00" }, // Thursday
  5: { open: "09:00", close: "21:00" }, // Friday
  6: { open: "10:00", close: "18:00" }, // Saturday
};

const SLOT_INTERVAL = 30; // minutes

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

    // Generate all possible time slots for the day
    const openTime = parse(hours.open, "HH:mm", selectedDate);
    const closeTime = parse(hours.close, "HH:mm", selectedDate);

    const allSlots: string[] = [];
    let currentSlot = openTime;

    while (isBefore(currentSlot, closeTime)) {
      // Only add slot if appointment can finish before closing
      const appointmentEnd = addMinutes(currentSlot, service.duration);
      if (isBefore(appointmentEnd, closeTime) || appointmentEnd.getTime() === closeTime.getTime()) {
        allSlots.push(format(currentSlot, "HH:mm"));
      }
      currentSlot = addMinutes(currentSlot, SLOT_INTERVAL);
    }

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
