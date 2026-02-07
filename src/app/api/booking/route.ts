import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parse, addMinutes } from "date-fns";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      serviceId,
      date,
      time,
      customerName,
      customerPhone,
      customerEmail,
      dateOfBirth,
      allergies,
      notes,
    } = body;

    // Validate required fields
    if (!serviceId || !date || !time || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(customerPhone)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Get the service
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Parse appointment date and time
    const appointmentDate = new Date(date);
    const [hours, minutes] = time.split(":");
    appointmentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    // Calculate end time
    const endTime = addMinutes(appointmentDate, service.duration);

    // Check if date is in the future
    if (appointmentDate <= new Date()) {
      return NextResponse.json(
        { error: "Appointment must be in the future" },
        { status: 400 }
      );
    }

    // Find or create customer
    let customer = await prisma.customer.findUnique({
      where: { phone: customerPhone },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: customerName,
          phone: customerPhone,
          email: customerEmail || null,
          dateOfBirth: dateOfBirth || null,
          allergies: allergies || null,
          notes: notes || null,
        },
      });
    } else {
      // Update customer info if changed
      customer = await prisma.customer.update({
        where: { id: customer.id },
        data: {
          name: customerName,
          email: customerEmail || customer.email,
          dateOfBirth: dateOfBirth || customer.dateOfBirth,
          allergies: allergies || customer.allergies,
          notes: notes || customer.notes,
        },
      });
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        customerId: customer.id,
        serviceId: service.id,
        date: appointmentDate,
        endTime: endTime,
        status: "pending",
        notes: notes || null,
        totalPrice: service.price,
      },
      include: {
        service: true,
        customer: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        appointment: {
          id: appointment.id,
          date: appointment.date,
          endTime: appointment.endTime,
          service: {
            name: appointment.service.name,
            duration: appointment.service.duration,
            price: appointment.service.price,
          },
          customer: {
            name: appointment.customer.name,
            phone: appointment.customer.phone,
            email: appointment.customer.email,
          },
          totalPrice: appointment.totalPrice,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
