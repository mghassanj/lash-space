import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeIcal(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        status: { not: "cancelled" },
      },
      include: {
        customer: true,
        service: true,
      },
      orderBy: { date: "asc" },
    });

    const now = formatDate(new Date());
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//LASH SPACE//Appointments//AR",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "X-WR-CALNAME:LASH SPACE - المواعيد",
      "X-WR-TIMEZONE:Asia/Riyadh",
      "",
    ];

    for (const apt of appointments) {
      const start = formatDate(new Date(apt.date));
      const end = formatDate(new Date(apt.endTime));
      const summary = `${apt.service.name} - ${apt.customer.name}`;
      const description = [
        `العميلة: ${apt.customer.name}`,
        `الخدمة: ${apt.service.nameAr || apt.service.name}`,
        `الجوال: ${apt.customer.phone}`,
        `السعر: ${apt.totalPrice} ر.س`,
        apt.notes ? `ملاحظات: ${apt.notes}` : "",
        `الحالة: ${apt.status}`,
      ].filter(Boolean).join("\\n");

      lines.push(
        "BEGIN:VEVENT",
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `DTSTAMP:${now}`,
        `UID:${apt.id}@lashspace.sa`,
        `SUMMARY:${escapeIcal(summary)}`,
        `DESCRIPTION:${escapeIcal(description)}`,
        `LOCATION:LASH SPACE - حي المنار، جدة`,
        `STATUS:${apt.status === "confirmed" ? "CONFIRMED" : "TENTATIVE"}`,
        "END:VEVENT",
        "",
      );
    }

    lines.push("END:VCALENDAR");

    return new NextResponse(lines.join("\r\n"), {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="lashspace-appointments.ics"',
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate calendar feed" }, { status: 500 });
  }
}
