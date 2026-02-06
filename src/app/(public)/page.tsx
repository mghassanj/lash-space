import Link from "next/link";
import { Award, Heart, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/public/Section";
import { SITE_CONFIG } from "@/lib/constants";

export default function HomePage() {
  const featuredServices = [
    {
      icon: "✨",
      title: "Classic Lashes",
      description: "Natural, elegant enhancement for everyday beauty",
      href: "/services#classic",
    },
    {
      icon: "💫",
      title: "Volume Lashes",
      description: "Full, fluffy, dramatic lashes that make a statement",
      href: "/services#volume",
    },
    {
      icon: "🌟",
      title: "Hybrid Lashes",
      description: "The perfect blend of classic and volume",
      href: "/services#hybrid",
    },
    {
      icon: "🌙",
      title: "Lash Lift",
      description: "Natural lash enhancement with stunning curl",
      href: "/services#lash-lift",
    },
  ];

  const features = [
    {
      icon: Award,
      title: "Expert Artists",
      description: "Certified lash technicians with years of experience and continuous education in the latest techniques.",
    },
    {
      icon: Sparkles,
      title: "Premium Products",
      description: "We use only the highest quality, hypoallergenic products that are safe and long-lasting.",
    },
    {
      icon: Heart,
      title: "Luxury Experience",
      description: "Relax in our serene studio while we transform your lashes in ultimate comfort.",
    },
  ];

  const testimonials = [
    {
      name: "Jessica M.",
      rating: 5,
      text: "Absolutely in love with my lashes! The technician was so skilled and gentle. Best lash experience I've ever had!",
      service: "Volume Full Set",
    },
    {
      name: "Sarah K.",
      rating: 5,
      text: "The studio is gorgeous and so relaxing. My lashes look natural yet glamorous. I get compliments every day!",
      service: "Hybrid Full Set",
    },
    {
      name: "Emily R.",
      rating: 5,
      text: "I've been coming here for months and my lashes always look perfect. The retention is amazing and the team is wonderful!",
      service: "Classic Full Set",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#9C8974]/20 to-[#1A1A1A]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-6 font-serif text-5xl font-bold text-white md:text-7xl">
            Elevate Your Natural Beauty
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 md:text-xl">
            {SITE_CONFIG.description}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-[#9C8974] px-8 text-lg hover:bg-[#7A6B5A]"
            >
              <Link href="/booking">Book Your Appointment</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white px-8 text-lg text-white hover:bg-white/10"
            >
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <Section className="bg-white">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#1A1A1A]">
            Our Signature Services
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From natural to dramatic, we have the perfect lash service for you
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group"
            >
              <Card className="h-full border-[#9C8974]/20 transition-all hover:border-[#9C8974] hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mb-4 text-5xl">{service.icon}</div>
                  <CardTitle className="font-serif text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section className="bg-[#E8E8DC]">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#1A1A1A]">
            Why Choose Lash Space
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Experience the difference of true luxury lash artistry
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-none bg-white shadow-md"
            >
              <CardHeader>
                <feature.icon className="mb-4 h-12 w-12 text-[#9C8974]" />
                <CardTitle className="font-serif text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-white">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#1A1A1A]">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Don't just take our word for it
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="border-[#9C8974]/20 bg-[#E8E8DC]/30"
            >
              <CardHeader>
                <div className="mb-2 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-[#9C8974] text-[#9C8974]"
                    />
                  ))}
                </div>
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                <CardDescription className="text-sm">
                  {testimonial.service}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="italic text-muted-foreground">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Banner */}
      <Section className="bg-gradient-to-r from-[#9C8974] to-[#1A1A1A] text-white">
        <div className="text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold">
            Ready to Transform Your Look?
          </h2>
          <p className="mb-8 text-lg text-gray-200">
            Book your appointment today and experience the luxury of perfect lashes
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-white px-8 text-lg text-[#1A1A1A] hover:bg-gray-100"
          >
            <Link href="/booking">Schedule Now</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
