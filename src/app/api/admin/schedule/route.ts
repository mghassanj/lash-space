import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/admin/schedule - Get full schedule
export async function GET() {
  try {
    const schedules = await prisma.workSchedule.findMany({
      include: {
        timeSlots: {
          orderBy: {
            time: "asc",
          },
        },
      },
      orderBy: {
        dayOfWeek: "asc",
      },
    });

    const daysOff = await prisma.dayOff.findMany({
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json({ schedules, daysOff });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return NextResponse.json(
      { error: "Failed to fetch schedule" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/schedule - Update schedule (toggle day, toggle time slot, add/remove time slot)
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { action, scheduleId, dayOfWeek, isOpen, timeSlotId, isActive, time } = body;

    if (action === "toggleDay") {
      // Toggle a day open/closed
      const schedule = await prisma.workSchedule.update({
        where: { id: scheduleId },
        data: { isOpen },
      });
      return NextResponse.json(schedule);
    }

    if (action === "toggleTimeSlot") {
      // Toggle a time slot active/inactive
      const timeSlot = await prisma.timeSlot.update({
        where: { id: timeSlotId },
        data: { isActive },
      });
      return NextResponse.json(timeSlot);
    }

    if (action === "addTimeSlot") {
      // Add a new time slot
      const schedule = await prisma.workSchedule.findUnique({
        where: { dayOfWeek },
      });

      if (!schedule) {
        return NextResponse.json(
          { error: "Schedule not found" },
          { status: 404 }
        );
      }

      const timeSlot = await prisma.timeSlot.create({
        data: {
          workScheduleId: schedule.id,
          time,
          isActive: true,
        },
      });
      return NextResponse.json(timeSlot);
    }

    if (action === "removeTimeSlot") {
      // Remove a time slot
      await prisma.timeSlot.delete({
        where: { id: timeSlotId },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error updating schedule:", error);
    return NextResponse.json(
      { error: "Failed to update schedule" },
      { status: 500 }
    );
  }
}
