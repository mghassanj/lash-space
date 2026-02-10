"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export const dynamic = "force-dynamic";

interface TimeSlot {
  id: string;
  time: string;
  isActive: boolean;
}

interface WorkSchedule {
  id: string;
  dayOfWeek: number;
  isOpen: boolean;
  timeSlots: TimeSlot[];
}

interface DayOff {
  id: string;
  date: string;
  reason?: string;
}

const DAY_NAMES = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<WorkSchedule[]>([]);
  const [daysOff, setDaysOff] = useState<DayOff[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDayOffDate, setNewDayOffDate] = useState("");
  const [newDayOffReason, setNewDayOffReason] = useState("");
  const [newTimeSlot, setNewTimeSlot] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await fetch("/api/admin/schedule");
      const data = await response.json();
      setSchedules(data.schedules || []);
      setDaysOff(data.daysOff || []);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = async (scheduleId: string, isOpen: boolean) => {
    try {
      await fetch("/api/admin/schedule", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggleDay",
          scheduleId,
          isOpen: !isOpen,
        }),
      });
      fetchSchedule();
    } catch (error) {
      console.error("Error toggling day:", error);
    }
  };

  const toggleTimeSlot = async (timeSlotId: string, isActive: boolean) => {
    try {
      await fetch("/api/admin/schedule", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggleTimeSlot",
          timeSlotId,
          isActive: !isActive,
        }),
      });
      fetchSchedule();
    } catch (error) {
      console.error("Error toggling time slot:", error);
    }
  };

  const addTimeSlot = async (dayOfWeek: number) => {
    const time = newTimeSlot[dayOfWeek];
    if (!time) return;

    try {
      await fetch("/api/admin/schedule", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "addTimeSlot",
          dayOfWeek,
          time,
        }),
      });
      setNewTimeSlot({ ...newTimeSlot, [dayOfWeek]: "" });
      fetchSchedule();
    } catch (error) {
      console.error("Error adding time slot:", error);
    }
  };

  const removeTimeSlot = async (timeSlotId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الوقت؟")) return;

    try {
      await fetch("/api/admin/schedule", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "removeTimeSlot",
          timeSlotId,
        }),
      });
      fetchSchedule();
    } catch (error) {
      console.error("Error removing time slot:", error);
    }
  };

  const addDayOff = async () => {
    if (!newDayOffDate) return;

    try {
      await fetch("/api/admin/schedule/dayoff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: newDayOffDate,
          reason: newDayOffReason || null,
        }),
      });
      setNewDayOffDate("");
      setNewDayOffReason("");
      fetchSchedule();
    } catch (error) {
      console.error("Error adding day off:", error);
    }
  };

  const removeDayOff = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الإجازة؟")) return;

    try {
      await fetch(`/api/admin/schedule/dayoff/${id}`, {
        method: "DELETE",
      });
      fetchSchedule();
    } catch (error) {
      console.error("Error removing day off:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">إدارة الجدول</h1>
        <p className="text-gray-600 mt-2">إدارة أوقات العمل والإجازات</p>
      </div>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#9C8974]" />
            جدول الأسبوع
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="border-b pb-6 last:border-0">
              {/* Day Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-gray-900">
                    {DAY_NAMES[schedule.dayOfWeek]}
                  </span>
                  <Switch
                    checked={schedule.isOpen}
                    onCheckedChange={() =>
                      toggleDay(schedule.id, schedule.isOpen)
                    }
                  />
                  <span className="text-sm text-gray-600">
                    {schedule.isOpen ? "مفتوح" : "مغلق"}
                  </span>
                </div>
              </div>

              {/* Time Slots */}
              {schedule.isOpen && (
                <div className="mr-8 space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {schedule.timeSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`flex items-center justify-between gap-2 p-3 rounded-lg border ${
                          slot.isActive
                            ? "border-[#898A73] bg-[#898A73]/5"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <span className="font-medium text-sm">
                          {slot.time}
                        </span>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={slot.isActive}
                            onCheckedChange={() =>
                              toggleTimeSlot(slot.id, slot.isActive)
                            }
                            className="scale-75"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeTimeSlot(slot.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Time Slot */}
                  <div className="flex gap-2 mt-3">
                    <Input
                      type="time"
                      value={newTimeSlot[schedule.dayOfWeek] || ""}
                      onChange={(e) =>
                        setNewTimeSlot({
                          ...newTimeSlot,
                          [schedule.dayOfWeek]: e.target.value,
                        })
                      }
                      className="max-w-[150px]"
                    />
                    <Button
                      onClick={() => addTimeSlot(schedule.dayOfWeek)}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة وقت
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Days Off */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#9C8974]" />
            أيام الإجازة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Day Off */}
          <div className="flex flex-col sm:flex-row gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <Label htmlFor="dayoff-date" className="mb-2 block">
                التاريخ
              </Label>
              <Input
                id="dayoff-date"
                type="date"
                value={newDayOffDate}
                onChange={(e) => setNewDayOffDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="dayoff-reason" className="mb-2 block">
                السبب (اختياري)
              </Label>
              <Input
                id="dayoff-reason"
                placeholder="مثال: إجازة، مناسبة خاصة"
                value={newDayOffReason}
                onChange={(e) => setNewDayOffReason(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={addDayOff}
                className="bg-[#898A73] hover:bg-[#898A73]/90 text-white gap-2 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                إضافة
              </Button>
            </div>
          </div>

          {/* Days Off List */}
          {daysOff.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              لا توجد أيام إجازة مجدولة
            </div>
          ) : (
            <div className="space-y-2">
              {daysOff.map((dayOff) => (
                <div
                  key={dayOff.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#9C8974]" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {format(new Date(dayOff.date), "EEEE، d MMMM yyyy", {
                          locale: ar,
                        })}
                      </div>
                      {dayOff.reason && (
                        <div className="text-sm text-gray-600">
                          {dayOff.reason}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeDayOff(dayOff.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
