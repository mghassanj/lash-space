import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST /api/admin/schedule/dayoff - Add a day off
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, reason } = body;

    if (!date) {
      return NextResponse.json(
        { error: "Date is required" },
        { status: 400 }
      );
    }

    const dayOff = await prisma.dayOff.create({
      data: {
        date: new Date(date),
        reason: reason || null,
      },
    });

    return NextResponse.json(dayOff);
  } catch (error) {
    console.error("Error creating day off:", error);
    return NextResponse.json(
      { error: "Failed to create day off" },
      { status: 500 }
    );
  }
}
