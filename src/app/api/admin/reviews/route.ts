import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/admin/reviews - Fetch all reviews (admin)
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
