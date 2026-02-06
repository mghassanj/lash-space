"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Check, X, Calendar as CalendarIcon } from "lucide-react";

interface Appointment {
  id: string;
  date: string;
  status: string;
  totalPrice: number;
  customer: { name: string; phone: string };
  service: { name: string; duration: number };
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

export default function AppointmentsContent() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter]);

  async function fetchAppointments() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") {
        params.set("status", statusFilter);
      }
      
      const response = await fetch(`/api/admin/appointments?${params}`);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateAppointmentStatus(id: string, status: string) {
    try {
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchAppointments();
      }
    } catch (error) {
      console.error("Failed to update appointment:", error);
    }
  }

  const filteredAppointments = appointments;
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Tabs defaultValue="list" className="space-y-4">
      <TabsList>
        <TabsTrigger value="list">عرض القائمة</TabsTrigger>
        <TabsTrigger value="calendar">عرض التقويم</TabsTrigger>
      </TabsList>

      <TabsContent value="list" className="space-y-4">
        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  تصفية حسب الحالة
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="pending">معلق</SelectItem>
                    <SelectItem value="confirmed">مؤكد</SelectItem>
                    <SelectItem value="completed">مكتمل</SelectItem>
                    <SelectItem value="cancelled">ملغي</SelectItem>
                    <SelectItem value="no-show">لم يحضر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-gray-500">جاري تحميل المواعيد...</div>
            ) : paginatedAppointments.length === 0 ? (
              <div className="p-8 text-center text-gray-500">لا توجد مواعيد.</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">التاريخ والوقت</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">العميل</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">الخدمة</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">الحالة</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">السعر</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedAppointments.map((appt) => (
                        <tr key={appt.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            {format(new Date(appt.date), "MMM dd, yyyy · h:mm a")}
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium">{appt.customer.name}</div>
                              <div className="text-xs text-gray-500">{appt.customer.phone}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{appt.service.name}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={getStatusColor(appt.status)}>
                              {getStatusLabel(appt.status)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right font-medium">
                            {appt.totalPrice.toFixed(2)} ر.س
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end gap-2">
                              {appt.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8"
                                    onClick={() => updateAppointmentStatus(appt.id, "confirmed")}
                                  >
                                    <Check className="w-3 h-3 ml-1" />
                                    تأكيد
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 text-red-600 hover:text-red-700"
                                    onClick={() => updateAppointmentStatus(appt.id, "cancelled")}
                                  >
                                    <X className="w-3 h-3 ml-1" />
                                    إلغاء
                                  </Button>
                                </>
                              )}
                              {appt.status === "confirmed" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8"
                                  onClick={() => updateAppointmentStatus(appt.id, "completed")}
                                >
                                  إتمام
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      صفحة {currentPage} من {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                      >
                        السابق
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                      >
                        التالي
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="calendar">
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center text-center py-12">
              <CalendarIcon className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">عرض التقويم</h3>
              <p className="text-gray-500">
                عرض التقويم قريباً. استخدمي عرض القائمة لإدارة المواعيد.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
