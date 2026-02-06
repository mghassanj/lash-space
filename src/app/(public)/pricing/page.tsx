export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { Section } from "@/components/public/Section";
import { ServiceCard } from "@/components/public/ServiceCard";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for all our lash extension services. View our competitive rates and book online.",
};

export default async function PricingPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { price: "asc" }],
  });

  // Group services by category
  const servicesByCategory = SERVICE_CATEGORIES.map((category) => ({
    ...category,
    services: services.filter((service) => service.category === category.slug),
  })).filter((category) => category.services.length > 0);

  const faqs = [
    {
      question: "How long do lash extensions last?",
      answer: "With proper care, lash extensions typically last 4-6 weeks. We recommend fills every 2-3 weeks to maintain a full, beautiful look as your natural lashes shed naturally.",
    },
    {
      question: "Are lash extensions safe?",
      answer: "Yes! When applied by a certified professional using high-quality products, lash extensions are completely safe. We use hypoallergenic, medical-grade adhesive and follow strict sanitation protocols.",
    },
    {
      question: "How long does the application take?",
      answer: "A full set typically takes 90-120 minutes, while fills take 45-90 minutes depending on the service. You'll relax comfortably with your eyes closed while we work our magic!",
    },
    {
      question: "Can I wear makeup with lash extensions?",
      answer: "Yes, but we recommend using oil-free products. Avoid waterproof mascara and oil-based makeup removers as they can break down the adhesive. Most clients love that they can skip mascara entirely!",
    },
    {
      question: "What's the difference between Classic, Hybrid, and Volume?",
      answer: "Classic gives a natural look with one extension per lash. Volume creates drama with multiple thin extensions per lash. Hybrid combines both techniques for a balanced, textured look.",
    },
    {
      question: "What if I'm not happy with my lashes?",
      answer: "Your satisfaction is our priority! If you have any concerns within 48 hours of your appointment, contact us and we'll make it right. We offer complimentary adjustments if needed.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#9C8974]/30 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold">Pricing</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            Transparent, competitive pricing with no hidden fees. Invest in yourself.
          </p>
        </div>
      </section>

      {/* Pricing by Category */}
      {servicesByCategory.map((category, idx) => (
        <Section
          key={category.slug}
          className={idx % 2 === 0 ? "bg-white" : "bg-[#E8E8DC]/50"}
        >
          <div className="mb-8 text-center">
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

      {/* FAQ Section */}
      <Section className="bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-[#1A1A1A]">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about lash extensions
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-[#9C8974] to-[#1A1A1A] text-white">
        <div className="text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Special Offer for First-Time Clients
          </h2>
          <p className="mb-6 text-lg text-gray-200">
            Get 20% off your first full set! Use code FIRSTLASH at booking.
          </p>
          <a
            href="/booking"
            className="inline-flex h-11 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-gray-100"
          >
            Book Now & Save
          </a>
        </div>
      </Section>
    </>
  );
}
