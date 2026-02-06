"use client";

import { Award, Heart, Home, Shield, Sparkles, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/public/Section";
import { useI18n } from "@/lib/i18n";

export default function AboutPage() {
  const { t, locale } = useI18n();
  const ar = locale === "ar";

  const values = [
    {
      icon: Heart,
      title: ar ? "خدمة شخصية" : "Personalized Service",
      description: ar
        ? "كل عميلة تحصل على اهتمام كامل في بيئة خاصة. رموشك مصممة لتناسب شكل عينك وأسلوبك."
        : "Every client gets undivided attention in a private, one-on-one setting. Your lashes are crafted to match your unique eye shape and style.",
    },
    {
      icon: Sparkles,
      title: ar ? "فن ودقة" : "Artistry & Precision",
      description: ar
        ? "كل تركيبة رموش هي عمل فني. نستخدم أحدث التقنيات ونطور مهاراتنا باستمرار لنتائج مثالية."
        : "Each lash set is a work of art. We use the latest techniques and continuously refine our skills to deliver flawless results.",
    },
    {
      icon: Shield,
      title: ar ? "منتجات فاخرة" : "Premium Products",
      description: ar
        ? "نستخدم فقط أجود المنتجات المضادة للحساسية — لضمان رموش آمنة ومريحة وطويلة الأمد."
        : "Only the highest quality, hypoallergenic products are used — ensuring safe, comfortable, and long-lasting lash extensions.",
    },
    {
      icon: Home,
      title: ar ? "راحة وخصوصية" : "Comfort & Privacy",
      description: ar
        ? "استمتعي بتجربة استوديو خاص فاخر. بدون زحمة أو انتظار — فقط أنتِ وفنانة الرموش في بيئة مريحة."
        : "Enjoy the luxury of a private studio experience. No crowds, no waiting — just you and your lash artist in a relaxing environment.",
    },
  ];

  const commitments = ar
    ? [
        "منتجات فاخرة مضادة للحساسية",
        "تقنيات رموش معتمدة",
        "نظافة وتعقيم صارم",
        "تطوير مهارات مستمر",
        "استشارات شخصية",
        "دعم وإرشادات ما بعد التركيب",
      ]
    : [
        "Premium Hypoallergenic Products",
        "Certified Lash Extension Techniques",
        "Strict Hygiene & Sanitation",
        "Continuous Skill Development",
        "Personalized Consultations",
        "Aftercare Support & Guidance",
      ];

  return (
    <>
      <section className="bg-[#1A1A1A] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold text-[#E8E8DC]">
            {ar ? "عن لاش سبيس" : "About Lash Space"}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[#BBBAB3]">
            {ar ? "استوديو رموش منزلي فاخر في قلب جدة" : "A premium home-based lash studio in the heart of Jeddah"}
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold text-[#1A1A1A]">
            {ar ? "قصتنا" : "Our Story"}
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            {ar ? (
              <>
                <p>لاش سبيس وُلد من شغف صادق بالجمال، ومن إيمان إن كل أنثى تستحق تجربة تُشبهها — مو مجرد خدمة.</p>
                <p>هنا، الرموش ما تُركّب… تُصمَّم بعناية لتعكس شخصيتك، إحساسك، والطريقة اللي تحبين تشوفي نفسك فيها.</p>
                <p>نقدّم تجربة خاصة وفردية بالكامل، مساحة هادئة تبتعد عن الاستعجال والضجيج، وتقرّبك من لحظة اهتمام حقيقي بنفسك.</p>
                <p>كل موعد هو وقت مخصص لك، بتفاصيل محسوبة، ولمسة فنية تحترم جمالك الطبيعي وتعرف متى تبرزه ومتى تجرؤ عليه.</p>
                <p>نحن متخصصون في تصميم وتركيب الرموش بأساليب متنوعة — من الناعم والطبيعي إلى الكثيف والجريء — باستخدام خامات عالية الجودة وتقنيات آمنة تمنحك نتائج تدوم وتشعرك بالثقة كل يوم.</p>
                <p className="text-[#9C8974] font-medium italic">في لاش سبيس، نؤمن إن الجمال مو شكل واحد، وإن الرموش الحلوة هي اللي تخليك تحبين انعكاسك في المرآة أكثر. وهذا هو وعدنا في كل جلسة.</p>
              </>
            ) : (
              <>
                <p>Lash Space was born from a genuine passion for beauty, and from a belief that every woman deserves an experience that reflects who she is — not just a service.</p>
                <p>Here, lashes aren&apos;t just applied… they&apos;re carefully designed to reflect your personality, your essence, and the way you love to see yourself.</p>
                <p>We offer a fully private, one-on-one experience — a calm space away from the rush and noise, bringing you closer to a moment of genuine self-care.</p>
                <p>Every appointment is time dedicated to you, with calculated details and an artistic touch that respects your natural beauty and knows when to enhance it and when to be bold.</p>
                <p>We specialize in designing and applying lashes in diverse styles — from soft and natural to full and bold — using high-quality materials and safe techniques that give you lasting results and confidence every day.</p>
                <p className="text-[#9C8974] font-medium italic">At Lash Space, we believe beauty isn&apos;t one-size-fits-all, and that beautiful lashes are the ones that make you love your reflection even more. That&apos;s our promise in every session.</p>
              </>
            )}
          </div>
        </div>
      </Section>

      <Section className="bg-[#E8E8DC]/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-4xl font-bold text-[#1A1A1A]">
            {ar ? "لماذا استوديو منزلي؟" : "Why a Home Studio?"}
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            {ar ? (
              <>
                <p>الاستوديو المنزلي مو بس مكان شغل — هو اختيار مقصود. نؤمن إن أفضل تجربة رموش تصير لما تكونين مرتاحة بالكامل. استوديونا الخاص في حي المنار بجدة مصمم ليكون ملاذك الشخصي.</p>
                <p>ما بتلقين صالة انتظار مزدحمة أو ضوضاء هنا. فقط مساحة هادئة ونظيفة ومرحبة — كل تفصيلة مركزة على راحتك.</p>
              </>
            ) : (
              <>
                <p>A home studio isn&apos;t just where we work — it&apos;s a deliberate choice. We believe the best lash experience happens when you&apos;re truly relaxed. Our private studio in Jeddah Al-Manar is designed to feel like a personal retreat.</p>
                <p>You won&apos;t find a busy waiting room or background noise here. Just a calm, clean, welcoming space where every detail is focused on your comfort.</p>
              </>
            )}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#1A1A1A]">
            {ar ? "قيمنا" : "What We Stand For"}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {ar ? "المبادئ وراء كل تركيبة رموش" : "The principles behind every lash set we create"}
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

      <Section className="bg-[#1A1A1A] text-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <Award className="h-16 w-16 text-[#9C8974]" />
          </div>
          <h2 className="mb-6 font-serif text-4xl font-bold text-[#E8E8DC]">
            {ar ? "التزامنا" : "Our Commitment"}
          </h2>
          <p className="mb-8 text-lg text-[#BBBAB3]">
            {ar ? "الجودة والسلامة أمر لا يقبل التفاوض" : "Quality and safety are non-negotiable"}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((cert) => (
              <div key={cert} className="flex items-center gap-3 rounded-lg bg-white/10 p-4">
                <Star className="h-5 w-5 flex-shrink-0 text-[#9C8974]" />
                <span className="text-start text-sm text-[#E8E8DC]">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-[#1A1A1A]">
            {ar ? "اكتشفي فرق لاش سبيس" : "Experience the Lash Space Difference"}
          </h2>
          <p className="mb-6 text-lg text-muted-foreground">
            {ar ? "احجزي موعدك الخاص وشاهدي لماذا عميلاتنا يعدن دائمًا" : "Book your private appointment and see why our clients keep coming back"}
          </p>
          <a href="/booking" className="inline-flex h-11 items-center justify-center rounded-md bg-[#9C8974] px-8 text-sm font-medium text-white transition-colors hover:bg-[#7A6B5A]">
            {ar ? "احجزي موعدك" : "Book Your Appointment"}
          </a>
        </div>
      </Section>
    </>
  );
}
