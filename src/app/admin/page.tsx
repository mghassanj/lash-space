export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, DollarSign, Clock } from "lucide-react";
import { format, startOfDay, endOfDay, startOfMonth, endOfMonth, subDays } from "date-fns";
import RevenueChart from "@/components/admin/RevenueChart";

async function getDashboardStats() {
  const now = new Date();
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  // Today's appointments
  const todayAppointments = await prisma.appointment.count({
    where: {
      date: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
  });

  // Total customers
  const totalCustomers = await prisma.customer.count();

  // Revenue this month
  const monthRevenue = await prisma.appointment.aggregate({
    where: {
      date: {
        gte: monthStart,
        lte: monthEnd,
      },
      status: {
        in: ["completed", "confirmed"],
      },
    },
    _sum: {
      totalPrice: true,
    },
  });

  // Pending bookings
  const pendingBookings = await prisma.appointment.count({
    where: {
      status: "pending",
    },
  });

  // Today's schedule
  const todaySchedule = await prisma.appointment.findMany({
    where: {
      date: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
    include: {
      customer: true,
      service: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  // Recent bookings
  const recentBookings = await prisma.appointment.findMany({
    take: 5,
    include: {
      customer: true,
      service: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Revenue data for last 7 days
  const revenueData = [];
  for (let i = 6; i >= 0; i--) {
    const day = subDays(now, i);
    const dayStart = startOfDay(day);
    const dayEnd = endOfDay(day);

    const dayRevenue = await prisma.appointment.aggregate({
      where: {
        date: {
          gte: dayStart,
          lte: dayEnd,
        },
        status: {
          in: ["completed", "confirmed"],
        },
      },
      _sum: {
        totalPrice: true,
      },
    });

    revenueData.push({
      date: format(day, "MMM dd"),
      revenue: dayRevenue._sum.totalPrice || 0,
    });
  }

  return {
    todayAppointments,
    totalCustomers,
    monthRevenue: monthRevenue._sum.totalPrice || 0,
    pendingBookings,
    todaySchedule,
    recentBookings,
    revenueData,
  };
}

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-blue-100 text-blue-800 border-blue-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    "no-show": "bg-gray-100 text-gray-800 border-gray-200",
  };
  return colors[status] || colors.pending;
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    pending: "معلق",
    confirmed: "مؤكد",
    completed: "مكتمل",
    cancelled: "ملغي",
    "no-show": "لم يحضر",
  };
  return labels[status] || status;
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
        <p className="text-gray-500 mt-1">مرحباً بك! إليك ما يحدث اليوم.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              مواعيد اليوم
            </CardTitle>
            <Calendar className="w-4 h-4 text-[#9C8974]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayAppointments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              إجمالي العملاء
            </CardTitle>
            <Users className="w-4 h-4 text-[#9C8974]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              الإيرادات هذا الشهر
            </CardTitle>
            <DollarSign className="w-4 h-4 text-[#9C8974]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthRevenue.toFixed(2)} ر.س</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              الحجوزات المعلقة
            </CardTitle>
            <Clock className="w-4 h-4 text-[#9C8974]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingBookings}</div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>الإيرادات (آخر 7 أيام)</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={stats.revenueData} />
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>جدول اليوم</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.todaySchedule.length === 0 ? (
              <p className="text-gray-500 text-sm py-4">لا توجد مواعيد اليوم.</p>
            ) : (
              <div className="space-y-3">
                {stats.todaySchedule.map((appt) => (
                  <div
                    key={appt.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900 min-w-[80px]">
                      {format(appt.date, "h:mm a")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900">{appt.customer.name}</div>
                      <div className="text-sm text-gray-500">{appt.service.name}</div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(appt.status)}>
                      {getStatusLabel(appt.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>الحجوزات الأخيرة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-medium text-gray-600">التاريخ والوقت</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">العميل</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">الخدمة</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">الحالة</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">السعر</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {format(booking.date, "MMM dd, yyyy · h:mm a")}
                    </td>
                    <td className="py-3 px-4 font-medium">{booking.customer.name}</td>
                    <td className="py-3 px-4 text-gray-600">{booking.service.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={getStatusColor(booking.status)}>
                        {getStatusLabel(booking.status)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {booking.totalPrice.toFixed(2)} ر.س
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
