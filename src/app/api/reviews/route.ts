import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/reviews - Fetch approved reviews only (public)
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        approved: true,
      },
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

// POST /api/reviews - Submit a new review (public, no auth)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.rating || !body.comment) {
      return NextResponse.json(
        { error: "Name, rating, and comment are required" },
        { status: 400 }
      );
    }

    // Validate rating range
    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        name: body.name,
        rating: parseInt(body.rating),
        comment: body.comment,
        serviceType: body.serviceType || null,
        approved: false, // Default to not approved
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Failed to create review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
