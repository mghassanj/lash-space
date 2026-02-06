import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { startOfMonth, endOfMonth, format } from "date-fns";

export async function GET() {
  try {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    // Total revenue this month
    const monthRevenue = await prisma.appointment.aggregate({
      where: {
        date: { gte: monthStart, lte: monthEnd },
        status: { in: ["completed", "confirmed"] },
      },
      _sum: { totalPrice: true },
    });

    // Total bookings this month
    const monthBookings = await prisma.appointment.count({
      where: {
        date: { gte: monthStart, lte: monthEnd },
      },
    });

    // Average booking value
    const avgBookingValue = await prisma.appointment.aggregate({
      where: {
        date: { gte: monthStart, lte: monthEnd },
        status: { in: ["completed", "confirmed"] },
      },
      _avg: { totalPrice: true },
    });

    // Most popular service
    const serviceStats = await prisma.appointment.groupBy({
      by: ["serviceId"],
      where: {
        date: { gte: monthStart, lte: monthEnd },
      },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 1,
    });

    let popularService = null;
    if (serviceStats.length > 0) {
      const service = await prisma.service.findUnique({
        where: { id: serviceStats[0].serviceId },
      });
      popularService = {
        name: service?.name || "Unknown",
        count: serviceStats[0]._count.id,
      };
    }

    // Busiest day of week
    const allAppointments = await prisma.appointment.findMany({
      where: {
        date: { gte: monthStart, lte: monthEnd },
      },
      select: { date: true },
    });

    const dayCount: Record<string, number> = {};
    allAppointments.forEach((appt) => {
      const day = format(appt.date, "EEEE");
      dayCount[day] = (dayCount[day] || 0) + 1;
    });

    const busiestDay = Object.entries(dayCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    // Customer retention rate
    const customersWithMultipleVisits = await prisma.customer.findMany({
      where: {
        appointments: {
          some: {},
        },
      },
      include: {
        _count: {
          select: { appointments: true },
        },
      },
    });

    const returningCustomers = customersWithMultipleVisits.filter((c) => c._count.appointments > 1).length;
    const totalCustomers = customersWithMultipleVisits.length;
    const retentionRate = totalCustomers > 0 ? (returningCustomers / totalCustomers) * 100 : 0;

    return NextResponse.json({
      monthRevenue: monthRevenue._sum.totalPrice || 0,
      monthBookings,
      avgBookingValue: avgBookingValue._avg.totalPrice || 0,
      popularService,
      busiestDay,
      retentionRate,
    });
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
