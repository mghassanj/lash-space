"use client";

import { Section } from "@/components/public/Section";
import { ServiceCard } from "@/components/public/ServiceCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";

interface ServiceData {
  id: string;
  name: string;
  nameAr: string;
  description: string | null;
  descriptionAr: string;
  duration: number;
  price: number;
  isAddOn: boolean;
  isRetouch: boolean;
}

interface CategoryData {
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  services: ServiceData[];
}

interface ServicesPageClientProps {
  servicesByCategory: CategoryData[];
}

export function ServicesPageClient({
  servicesByCategory,
}: ServicesPageClientProps) {
  const { t, locale } = useI18n();

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#9C8974]/30 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold">
            {t("services.pageTitle")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            {t("services.pageSubtitle")}
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
              {locale === "ar" ? category.nameAr : category.name}
            </h2>
            <p className="text-lg text-muted-foreground">
              {locale === "ar" ? category.descriptionAr : category.description}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                nameAr={service.nameAr}
                description={service.description}
                descriptionAr={service.descriptionAr}
                duration={service.duration}
                price={service.price}
                isAddOn={service.isAddOn}
                isRetouch={service.isRetouch}
                category={locale === "ar" ? category.nameAr : category.name}
                featured={service.name.includes("Volume Monthly")}
              />
            ))}
          </div>
        </Section>
      ))}

      {/* FAQ Section */}
      <Section id="faq" className="bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-[#1A1A1A]">
              {t("faq.title")}
            </h2>
            <p className="text-lg text-muted-foreground">{t("faq.subtitle")}</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-[#9C8974] to-[#1A1A1A] text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            {t("services.notSure")}
          </h2>
          <p className="mb-6 text-lg text-gray-200">
            {t("services.notSureDesc")}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/booking"
              className="inline-flex h-11 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-gray-100"
            >
              {t("services.bookConsultation")}
            </a>
            <a
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white px-8 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {t("services.contactUs")}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
