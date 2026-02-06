export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { startOfMonth, endOfMonth, subDays, startOfDay, endOfDay, format } from "date-fns";
import AnalyticsCharts from "@/components/admin/AnalyticsCharts";

async function getAnalyticsData() {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  // Revenue data for last 30 days
  const revenueData = [];
  for (let i = 29; i >= 0; i--) {
    const day = subDays(now, i);
    const dayStart = startOfDay(day);
    const dayEnd = endOfDay(day);

    const dayRevenue = await prisma.appointment.aggregate({
      where: {
        date: { gte: dayStart, lte: dayEnd },
        status: { in: ["completed", "confirmed"] },
      },
      _sum: { totalPrice: true },
    });

    revenueData.push({
      date: format(day, "MMM dd"),
      revenue: dayRevenue._sum.totalPrice || 0,
    });
  }

  // Popular services (top 5)
  const serviceStats = await prisma.appointment.groupBy({
    by: ["serviceId"],
    where: {
      date: { gte: monthStart, lte: monthEnd },
    },
    _count: { id: true },
    _sum: { totalPrice: true },
    orderBy: { _count: { id: "desc" } },
    take: 5,
  });

  const popularServices = await Promise.all(
    serviceStats.map(async (stat) => {
      const service = await prisma.service.findUnique({
        where: { id: stat.serviceId },
      });
      return {
        name: service?.name || "Unknown",
        bookings: stat._count.id,
        revenue: stat._sum.totalPrice || 0,
      };
    })
  );

  // Booking status breakdown
  const statusBreakdown = await prisma.appointment.groupBy({
    by: ["status"],
    where: {
      date: { gte: monthStart, lte: monthEnd },
    },
    _count: { id: true },
  });

  const statusData = statusBreakdown.map((item) => ({
    status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
    count: item._count.id,
  }));

  // Average booking value
  const avgBookingValue = await prisma.appointment.aggregate({
    where: {
      date: { gte: monthStart, lte: monthEnd },
      status: { in: ["completed", "confirmed"] },
    },
    _avg: { totalPrice: true },
  });

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

  const busiestDay = Object.entries(dayCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  // Customer retention (returning customers)
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

  return {
    revenueData,
    popularServices,
    statusData,
    avgBookingValue: avgBookingValue._avg.totalPrice || 0,
    busiestDay,
    retentionRate,
  };
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">Business insights and performance metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Average Booking Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.avgBookingValue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Busiest Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.busiestDay}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Customer Retention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.retentionRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <AnalyticsCharts
        revenueData={data.revenueData}
        popularServices={data.popularServices}
        statusData={data.statusData}
      />
    </div>
  );
}
