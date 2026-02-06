export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { BookingClient } from "./booking-client";

export const metadata = {
  title: "Book Appointment - LASH SPACE",
  description: "Book your lash extension appointment online. Choose from classic, hybrid, volume, and mega volume lash sets.",
};

async function getServices() {
  const services = await prisma.service.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return services.map((service) => ({
    id: service.id,
    name: service.name,
    description: service.description,
    duration: service.duration,
    price: service.price,
    category: service.category,
  }));
}

export default async function BookingPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-[#E8E8DC] py-12">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Book Your Appointment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your desired service, choose a convenient time, and let us help you
            elevate your natural beauty.
          </p>
        </div>

        <BookingClient services={services} />
      </div>
    </div>
  );
}
