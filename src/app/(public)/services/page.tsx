import { prisma } from "@/lib/db";
import { Section } from "@/components/public/Section";
import { ServiceCard } from "@/components/public/ServiceCard";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our premium lash extension services including classic, hybrid, volume, mega volume, and lash lift.",
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { price: "asc" }],
  });

  // Group services by category
  const servicesByCategory = SERVICE_CATEGORIES.map((category) => ({
    ...category,
    services: services.filter((service) => service.category === category.slug),
  })).filter((category) => category.services.length > 0);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#9C8974]/30 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold">Our Services</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            Discover the perfect lash service tailored to your unique style and preferences
          </p>
        </div>
      </section>

      {/* Services by Category */}
      {servicesByCategory.map((category, idx) => (
        <Section
          key={category.slug}
          id={category.slug}
          className={idx % 2 === 0 ? "bg-white" : "bg-[#E8E8DC]/50"}
        >
          <div className="mb-8">
            <h2 className="mb-2 font-serif text-3xl font-bold text-[#1A1A1A]">
              {category.name}
            </h2>
            <p className="text-lg text-muted-foreground">{category.description}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                description={service.description}
                duration={service.duration}
                price={service.price}
                category={category.name}
                featured={service.name === "Volume Full Set"}
              />
            ))}
          </div>
        </Section>
      ))}

      {/* Info Section */}
      <Section className="bg-gradient-to-r from-[#9C8974] to-[#1A1A1A] text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Not Sure Which Service to Choose?
          </h2>
          <p className="mb-6 text-lg text-gray-200">
            Our expert lash artists are here to help! Book a free consultation to discuss
            your desired look and find the perfect service for you.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/booking"
              className="inline-flex h-11 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-gray-100"
            >
              Book Consultation
            </a>
            <a
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white px-8 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Contact Us
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
