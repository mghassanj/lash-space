export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { ServicesPageClient } from "@/components/public/ServicesPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Explore our premium lash extension services with transparent pricing. Classic, hybrid, volume, wet set, wispy & weekly lashes in Jeddah.",
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { price: "asc" }],
  });

  // Group services by category with Arabic names
  const servicesByCategory = SERVICE_CATEGORIES.map((category) => ({
    slug: category.slug,
    name: category.name,
    nameAr: category.nameAr,
    description: category.description,
    descriptionAr: category.descriptionAr,
    services: services
      .filter((service) => service.category === category.slug)
      .map((s) => ({
        id: s.id,
        name: s.name,
        nameAr: s.nameAr,
        description: s.description,
        descriptionAr: s.descriptionAr,
        duration: s.duration,
        price: s.price,
      })),
  })).filter((category) => category.services.length > 0);

  return <ServicesPageClient servicesByCategory={servicesByCategory} />;
}
