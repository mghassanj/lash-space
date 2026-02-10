import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/loyalty/check?phone=XXXXX - Check loyalty status
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Find customer by phone
    const customer = await prisma.customer.findUnique({
      where: { phone },
    });

    if (!customer) {
      return NextResponse.json({
        exists: false,
        completedVisits: 0,
        isEligibleForDiscount: false,
        discountPercentage: 0,
      });
    }

    const nextVisitCount = customer.completedVisits + 1;
    const isEligibleForDiscount = nextVisitCount % 5 === 0;
    const discountPercentage = isEligibleForDiscount ? 25 : 0;

    return NextResponse.json({
      exists: true,
      completedVisits: customer.completedVisits,
      nextVisitCount,
      isEligibleForDiscount,
      discountPercentage,
    });
  } catch (error) {
    console.error("Error checking loyalty:", error);
    return NextResponse.json(
      { error: "Failed to check loyalty status" },
      { status: 500 }
    );
  }
}
