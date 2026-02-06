import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, DollarSign, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { SITE_CONFIG } from "@/lib/constants";
import {
  generateServiceJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug, isActive: true },
  });

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.name} | Premium Lash Extensions`,
    description: service.description,
    openGraph: {
      title: `${service.name} | ${SITE_CONFIG.name}`,
      description: service.description,
      url: `${SITE_CONFIG.url}/services/${service.slug}`,
      images: service.image ? [service.image] : undefined,
    },
  };
}

// Service-specific FAQs
const SERVICE_FAQS: Record<
  string,
  Array<{ question: string; answer: string }>
> = {
  classic: [
    {
      question: "How long do classic lash extensions last?",
      answer:
        "Classic lash extensions typically last 4-6 weeks with proper care. We recommend fills every 2-3 weeks to maintain fullness.",
    },
    {
      question: "Are classic lashes good for beginners?",
      answer:
        "Yes! Classic lashes are perfect for first-timers. They provide a natural enhancement that's subtle yet beautiful.",
    },
    {
      question: "Can I wear mascara with classic lash extensions?",
      answer:
        "You won't need mascara with classic lashes, but if desired, use only oil-free mascara on the tips.",
    },
  ],
  volume: [
    {
      question: "What's the difference between volume and classic lashes?",
      answer:
        "Volume lashes use multiple ultra-fine extensions per natural lash, creating a fuller, fluffier look compared to classic's one-to-one application.",
    },
    {
      question: "Will volume lashes damage my natural lashes?",
      answer:
        "When applied properly by trained professionals, volume lashes are safe and won't damage your natural lashes.",
    },
    {
      question: "How long does a volume lash appointment take?",
      answer:
        "A full set of volume lashes typically takes 2-3 hours, depending on the desired look.",
    },
  ],
  hybrid: [
    {
      question: "Who should get hybrid lashes?",
      answer:
        "Hybrid lashes are perfect if you want more volume than classic but less drama than full volume sets. Great for special events!",
    },
    {
      question: "Can I customize my hybrid lash look?",
      answer:
        "Absolutely! We customize the ratio of classic to volume fans to create your perfect look.",
    },
  ],
  mega: [
    {
      question: "Are mega volume lashes heavy?",
      answer:
        "Despite the dramatic look, mega volume lashes are actually very light because we use ultra-fine extensions.",
    },
    {
      question: "How often do mega volume lashes need fills?",
      answer:
        "We recommend fills every 2-3 weeks to maintain the full, dramatic effect.",
    },
  ],
  "lash-lift": [
    {
      question: "How long does a lash lift last?",
      answer:
        "A lash lift typically lasts 6-8 weeks, following your natural lash growth cycle.",
    },
    {
      question: "Can I wear mascara after a lash lift?",
      answer:
        "Yes! After 24 hours, you can apply mascara, though most clients find they don't need it.",
    },
    {
      question: "Is lash lift better than extensions?",
      answer:
        "It depends on your goals! Lash lifts enhance your natural lashes, while extensions add length and volume.",
    },
  ],
};

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug, isActive: true },
  });

  if (!service) {
    notFound();
  }

  // Get related services in the same category
  const relatedServices = await prisma.service.findMany({
    where: {
      isActive: true,
      category: service.category,
      id: { not: service.id },
    },
    take: 3,
  });

  const serviceFaqs = SERVICE_FAQS[slug] || [];

  const serviceJsonLd = generateServiceJsonLd(service);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Services", url: `${SITE_CONFIG.url}/services` },
    { name: service.name, url: `${SITE_CONFIG.url}/services/${service.slug}` },
  ]);
  const faqJsonLd = serviceFaqs.length > 0 ? generateFaqJsonLd(serviceFaqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <nav className="bg-[#F5F5F0] border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#9C8974]">
                  Home
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-[#9C8974]"
                >
                  Services
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li className="text-[#1A1A1A] font-medium">{service.name}</li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] text-white py-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-serif mb-6">
                  {service.name}
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#9C8974]" />
                    <span>{service.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#9C8974]" />
                    <span>${service.price}</span>
                  </div>
                </div>

                <Link
                  href="/booking"
                  className="inline-block bg-[#9C8974] text-white px-8 py-4 rounded-lg hover:bg-[#B8855C] transition-colors text-lg font-medium"
                >
                  Book This Service
                </Link>
              </div>

              {service.image && (
                <div className="rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16 bg-[#F5F5F0]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl font-serif text-[#1A1A1A] mb-8">
              What to Expect
            </h2>

            <div className="bg-white rounded-lg p-8 shadow-md space-y-6">
              <div>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-3">
                  During Your Appointment
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Relax in our luxurious salon while our expert lash artists work
                  their magic. We'll customize your lash look to complement your
                  eye shape, lifestyle, and preferences. The process is relaxing
                  and pain-free—many clients even fall asleep!
                </p>
              </div>

              <div>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-3">
                  Aftercare
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Keep your lashes dry for 24 hours after application. Avoid
                  oil-based products, sleeping on your face, and excessive heat.
                  Brush daily with a clean spoolie and schedule fills every 2-3
                  weeks for best results.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-3">
                  Who It's Perfect For
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {service.category === "classic" &&
                    "Perfect for those wanting a natural enhancement or trying lash extensions for the first time."}
                  {service.category === "volume" &&
                    "Ideal for clients desiring dramatic, full lashes with maximum impact."}
                  {service.category === "hybrid" &&
                    "Great for those who want the best of both worlds—natural yet glamorous."}
                  {service.category === "mega" &&
                    "Perfect for special events or those who love bold, show-stopping lashes."}
                  {service.category === "lash-lift" &&
                    "Ideal for those who want to enhance their natural lashes without extensions."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {serviceFaqs.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-6 max-w-4xl">
              <h2 className="text-3xl font-serif text-[#1A1A1A] mb-8">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {serviceFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-md"
                  >
                    <h3 className="text-lg font-serif text-[#1A1A1A] mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#9C8974] to-[#898A73] text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-serif mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book your {service.name.toLowerCase()} appointment today and
              experience the luxury of premium lash extensions.
            </p>
            <Link
              href="/booking"
              className="inline-block bg-white text-[#1A1A1A] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium"
            >
              Book Appointment
            </Link>
          </div>
        </section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="py-16 bg-[#F5F5F0]">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-serif text-[#1A1A1A] mb-8">
                You Might Also Like
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedServices.map((related) => (
                  <Link
                    key={related.id}
                    href={`/services/${related.slug}`}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all group"
                  >
                    {related.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-serif text-[#1A1A1A] mb-2 group-hover:text-[#9C8974] transition-colors">
                        {related.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {related.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{related.duration} min</span>
                        <span className="font-medium text-[#9C8974]">
                          ${related.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
