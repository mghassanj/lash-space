import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    const customers = await prisma.customer.findMany({
      where,
      include: {
        _count: {
          select: { appointments: true },
        },
        appointments: {
          select: {
            totalPrice: true,
            date: true,
            status: true,
          },
          orderBy: {
            date: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate total spent and last visit for each customer
    const customersWithStats = await Promise.all(
      customers.map(async (customer) => {
        const totalSpentResult = await prisma.appointment.aggregate({
          where: {
            customerId: customer.id,
            status: { in: ["completed", "confirmed"] },
          },
          _sum: {
            totalPrice: true,
          },
        });

        return {
          ...customer,
          totalSpent: totalSpentResult._sum.totalPrice || 0,
          lastVisit: customer.appointments[0]?.date || null,
          appointments: undefined, // Remove appointments array from response
        };
      })
    );

    return NextResponse.json(customersWithStats);
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const customer = await prisma.customer.create({
      data: {
        name: body.name,
        email: body.email || null,
        phone: body.phone,
        notes: body.notes || null,
        skinType: body.skinType || null,
        allergies: body.allergies || null,
      },
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error("Failed to create customer:", error);
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    );
  }
}
