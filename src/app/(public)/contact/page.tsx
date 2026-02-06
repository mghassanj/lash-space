import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/public/Section";
import { ContactForm } from "@/components/public/ContactForm";
import { SITE_CONFIG } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Lash Space. Contact us in Jeddah, call us, or send a message. We're here to help!",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#9C8974]/30 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            We'd love to hear from you! Reach out with any questions or to book your appointment.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <Section className="bg-white">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Business Info Sidebar */}
          <div className="space-y-6">
            <Card className="border-[#9C8974]/20 bg-[#E8E8DC]/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-xl">
                  <MapPin className="h-5 w-5 text-[#9C8974]" />
                  Visit Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{SITE_CONFIG.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-[#9C8974] hover:underline"
                >
                  Get Directions →
                </a>
              </CardContent>
            </Card>

            <Card className="border-[#9C8974]/20 bg-[#E8E8DC]/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-xl">
                  <Phone className="h-5 w-5 text-[#9C8974]" />
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-muted-foreground hover:text-[#9C8974]"
                >
                  {SITE_CONFIG.phone}
                </a>
                <p className="mt-2 text-sm text-muted-foreground">
                  Available during business hours
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#9C8974]/20 bg-[#E8E8DC]/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-xl">
                  <Mail className="h-5 w-5 text-[#9C8974]" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-muted-foreground hover:text-[#9C8974]"
                >
                  {SITE_CONFIG.email}
                </a>
                <p className="mt-2 text-sm text-muted-foreground">
                  We respond within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#9C8974]/20 bg-[#E8E8DC]/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-xl">
                  <Clock className="h-5 w-5 text-[#9C8974]" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Wednesday</span>
                    <span className="font-medium">{SITE_CONFIG.hours.monday.en}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Thursday - Friday</span>
                    <span className="font-medium">{SITE_CONFIG.hours.thursday.en}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">{SITE_CONFIG.hours.saturday.en}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium text-[#9C8974]">{SITE_CONFIG.hours.sunday.en}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#9C8974]/20 bg-[#E8E8DC]/50">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <a
                    href={SITE_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9C8974] text-white transition-colors hover:bg-[#7A6B5A]"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  {/* Add more social links here when available */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Map Section (Placeholder) */}
      <Section className="bg-[#E8E8DC]/50">
        <div className="overflow-hidden rounded-lg">
          <div className="flex h-[400px] items-center justify-center bg-gradient-to-br from-[#9C8974] to-[#7A6B5A]">
            <div className="text-center text-white">
              <MapPin className="mx-auto mb-4 h-16 w-16" />
              <h3 className="mb-2 font-serif text-2xl font-bold">Find Us Here</h3>
              <p className="text-lg">{SITE_CONFIG.address}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-md bg-white px-6 py-2 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-gray-100"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Quick Links */}
      <Section className="bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-[#1A1A1A]">
            Have Questions?
          </h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Check out our FAQ page for quick answers to common questions about lash extensions,
            pricing, and aftercare.
          </p>
          <a
            href="/pricing#faq"
            className="inline-flex h-11 items-center justify-center rounded-md bg-[#9C8974] px-8 text-sm font-medium text-white transition-colors hover:bg-[#7A6B5A]"
          >
            View FAQ
          </a>
        </div>
      </Section>
    </>
  );
}
