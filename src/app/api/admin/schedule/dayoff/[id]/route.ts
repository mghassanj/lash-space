import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DELETE /api/admin/schedule/dayoff/[id] - Remove a day off
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.dayOff.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting day off:", error);
    return NextResponse.json(
      { error: "Failed to delete day off" },
      { status: 500 }
    );
  }
}
