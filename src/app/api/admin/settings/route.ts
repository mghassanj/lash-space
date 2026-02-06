import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    let settings = await prisma.businessSettings.findUnique({
      where: { id: "default" },
    });

    // If no settings exist, create default
    if (!settings) {
      settings = await prisma.businessSettings.create({
        data: {
          id: "default",
          businessName: "Lash Space",
          phone: "",
          email: "",
          address: "",
          city: "",
          openingHours: "{}",
          socialLinks: "{}",
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    
    const settings = await prisma.businessSettings.upsert({
      where: { id: "default" },
      update: {
        businessName: body.businessName,
        phone: body.phone,
        email: body.email,
        address: body.address,
        city: body.city,
        openingHours: body.openingHours,
        socialLinks: body.socialLinks,
      },
      create: {
        id: "default",
        businessName: body.businessName,
        phone: body.phone,
        email: body.email,
        address: body.address,
        city: body.city,
        openingHours: body.openingHours,
        socialLinks: body.socialLinks,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
