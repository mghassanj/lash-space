import { Award, Heart, Shield, Sparkles, Star, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/public/Section";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our expert team, our story, and what makes Lash Space the premier destination for lash extensions in Los Angeles.",
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sofia Rodriguez",
      role: "Founder & Master Lash Artist",
      bio: "With over 8 years of experience, Sofia has transformed thousands of lashes and trained dozens of artists. Her passion for perfection shows in every set.",
      certifications: ["Certified Lash Artist", "Volume Specialist", "Master Trainer"],
    },
    {
      name: "Emma Chen",
      role: "Senior Lash Artist",
      bio: "Emma specializes in volume and mega volume techniques, creating stunning, dramatic looks. Her attention to detail ensures every lash is perfectly placed.",
      certifications: ["Certified Lash Artist", "Mega Volume Expert"],
    },
    {
      name: "Olivia Martinez",
      role: "Lash Artist & Lash Lift Specialist",
      bio: "Known for her gentle touch and natural-looking sets, Olivia excels at classic and hybrid lashes. She's also our in-house lash lift expert.",
      certifications: ["Certified Lash Artist", "Lash Lift & Tint Specialist"],
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Client-Centered Care",
      description: "Your comfort, safety, and satisfaction are our top priorities. We listen to your needs and exceed your expectations.",
    },
    {
      icon: Sparkles,
      title: "Artistry & Excellence",
      description: "Every lash set is a work of art. We continuously refine our skills and stay updated with the latest techniques.",
    },
    {
      icon: Shield,
      title: "Safety & Quality",
      description: "We use only premium, hypoallergenic products and maintain the highest sanitation standards for your peace of mind.",
    },
    {
      icon: Users,
      title: "Community & Education",
      description: "We believe in giving back through education, helping our clients maintain their lashes and sharing our knowledge.",
    },
  ];

  const certifications = [
    "Licensed Cosmetology Professionals",
    "Certified Lash Extension Artists",
    "Volume & Mega Volume Specialists",
    "Lash Lift & Tint Certified",
    "First Aid & CPR Certified",
    "Ongoing Education & Training",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#9C8974]/30 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold">About Lash Space</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            Where artistry meets luxury in the heart of Los Angeles
          </p>
        </div>
      </section>

      {/* Our Story */}
      <Section className="bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold text-[#1A1A1A]">
            Our Story
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Founded in 2018, Lash Space was born from a simple vision: to create a space where
              beauty, artistry, and luxury converge. Our founder, Sofia Rodriguez, saw a need for
              a lash studio that prioritized both stunning results and exceptional client care.
            </p>
            <p>
              What started as a small studio with one chair has grown into Los Angeles' premier
              destination for lash extensions. We've served thousands of clients, from everyday
              beauty enthusiasts to celebrities and influencers, all seeking the perfect lashes.
            </p>
            <p>
              Today, our team of expert lash artists continues Sofia's legacy of excellence,
              blending cutting-edge techniques with personalized service to create looks that
              enhance your natural beauty and boost your confidence.
            </p>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section className="bg-[#E8E8DC]/50">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#1A1A1A]">
            Meet Our Expert Team
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Certified artists passionate about creating your perfect lash look
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member.name} className="border-[#9C8974]/20">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#9C8974] to-[#7A6B5A]">
                  <Users className="h-16 w-16 text-white" />
                </div>
                <CardTitle className="text-center font-serif text-2xl">
                  {member.name}
                </CardTitle>
                <p className="text-center text-sm font-medium text-[#9C8974]">
                  {member.role}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">{member.bio}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.certifications.map((cert) => (
                    <Badge
                      key={cert}
                      variant="secondary"
                      className="bg-[#E8E8DC] text-xs text-[#9C8974]"
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-white">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#1A1A1A]">
            Our Values
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            The principles that guide everything we do
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Card key={value.title} className="border-none bg-[#E8E8DC]/50">
              <CardHeader>
                <value.icon className="mb-4 h-12 w-12 text-[#9C8974]" />
                <CardTitle className="font-serif text-xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section className="bg-gradient-to-br from-[#1A1A1A] to-[#9C8974]/30 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <Award className="h-16 w-16 text-[#9C8974]" />
          </div>
          <h2 className="mb-6 font-serif text-4xl font-bold">
            Certifications & Training
          </h2>
          <p className="mb-8 text-lg text-gray-200">
            Our commitment to excellence is backed by continuous education and professional certifications
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-3 rounded-lg bg-white/10 p-4 backdrop-blur"
              >
                <Star className="h-5 w-5 flex-shrink-0 text-[#9C8974]" />
                <span className="text-left text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-white">
        <div className="text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-[#1A1A1A]">
            Experience the Lash Space Difference
          </h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Join our community of satisfied clients and discover why we're LA's favorite lash studio
          </p>
          <a
            href="/booking"
            className="inline-flex h-11 items-center justify-center rounded-md bg-[#9C8974] px-8 text-sm font-medium text-white transition-colors hover:bg-[#7A6B5A]"
          >
            Book Your Appointment
          </a>
        </div>
      </Section>
    </>
  );
}
