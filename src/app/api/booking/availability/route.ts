import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parse, addMinutes, isAfter, isBefore, startOfDay, endOfDay, format } from "date-fns";

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

    // Check if this date is a day off
    const startOfSelectedDay = startOfDay(selectedDate);
    const endOfSelectedDay = endOfDay(selectedDate);

    const dayOff = await prisma.dayOff.findFirst({
      where: {
        date: {
          gte: startOfSelectedDay,
          lte: endOfSelectedDay,
        },
      },
    });

    if (dayOff) {
      // This date is blocked
      return NextResponse.json({ slots: [], reason: dayOff.reason });
    }

    // Get day of week (0=Sunday, 1=Monday... 6=Saturday)
    const dayOfWeek = selectedDate.getDay();

    // Get work schedule for this day
    const workSchedule = await prisma.workSchedule.findUnique({
      where: { dayOfWeek },
      include: {
        timeSlots: {
          where: { isActive: true },
          orderBy: { time: "asc" },
        },
      },
    });

    if (!workSchedule || !workSchedule.isOpen || workSchedule.timeSlots.length === 0) {
      // Closed on this day or no time slots available
      return NextResponse.json({ slots: [] });
    }

    // Get all active time slots for this day
    const allSlots: string[] = workSchedule.timeSlots.map((slot) => slot.time);

    // Get existing appointments for this date
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
