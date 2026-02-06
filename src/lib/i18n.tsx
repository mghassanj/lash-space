"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

export type Locale = "ar" | "en";

interface I18nContextType {
  locale: Locale;
  dir: "rtl" | "ltr";
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

// --- Translation dictionary ---
const translations: Record<string, Record<Locale, string>> = {
  // Navigation
  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.services": { ar: "الخدمات والأسعار", en: "Services & Pricing" },
  "nav.gallery": { ar: "المعرض", en: "Gallery" },
  "nav.about": { ar: "عنّا", en: "About" },
  "nav.blog": { ar: "المدونة", en: "Blog" },
  "nav.contact": { ar: "تواصلي معنا", en: "Contact" },
  "nav.bookNow": { ar: "احجزي الآن", en: "Book Now" },

  // Hero
  "hero.subtitle": { ar: "مساحة صُممت لراحتك و جمالك", en: "A Space Designed for Your Comfort & Beauty" },
  "hero.title1": { ar: "ارتقي بجمالك", en: "Elevate Your" },
  "hero.title2": { ar: "الطبيعي", en: "Natural Beauty" },
  "hero.description": {
    ar: "رموش فاخرة في جدة. كلاسيك، فوليوم، هايبرد، وت ست، ويسبي ورموش أسبوعية. تجربة استوديو رموش منزلي فاخرة.",
    en: "Premium eyelash extensions in Jeddah. Classic, volume, hybrid, wet set, wispy & weekly lashes. Luxury home-based lash studio experience.",
  },
  "hero.bookAppointment": { ar: "احجزي موعدك", en: "Book Your Appointment" },
  "hero.exploreServices": { ar: "استكشفي الخدمات", en: "Explore Services" },

  // Featured Services
  "services.signatureTitle": { ar: "خدماتنا المميزة", en: "Our Signature Services" },
  "services.signatureSubtitle": {
    ar: "من الطبيعي إلى الدراماتيكي، لدينا الخدمة المثالية لك",
    en: "From natural to dramatic, we have the perfect lash service for you",
  },
  "services.classic": { ar: "كلاسيك", en: "Classic Lashes" },
  "services.classicDesc": { ar: "تعزيز طبيعي وأنيق للجمال اليومي", en: "Natural, elegant enhancement for everyday beauty" },
  "services.volume": { ar: "فوليوم", en: "Volume Lashes" },
  "services.volumeDesc": { ar: "رموش كثيفة وناعمة تلفت الأنظار", en: "Full, fluffy, dramatic lashes that make a statement" },
  "services.hybrid": { ar: "هايبرد", en: "Hybrid Lashes" },
  "services.hybridDesc": { ar: "المزيج المثالي من الكلاسيك والفوليوم", en: "The perfect blend of classic and volume" },
  "services.lashLift": { ar: "رفع الرموش", en: "Lash Lift" },
  "services.lashLiftDesc": { ar: "تعزيز الرموش الطبيعية مع تجعيد رائع", en: "Natural lash enhancement with stunning curl" },

  // Services & Pricing Page
  "services.pageTitle": { ar: "الخدمات والأسعار", en: "Services & Pricing" },
  "services.pageSubtitle": { ar: "رموش فاخرة بأسعار شفافة. بدون رسوم مخفية.", en: "Premium lash extensions with transparent pricing. No hidden fees." },
  "services.notSure": { ar: "مو متأكدة أي خدمة تختارين؟", en: "Not Sure Which Service to Choose?" },
  "services.notSureDesc": {
    ar: "فنانات الرموش لدينا هنا لمساعدتك! احجزي استشارة مجانية لمناقشة الإطلالة المطلوبة.",
    en: "Our expert lash artists are here to help! Book a free consultation to discuss your desired look.",
  },
  "services.bookConsultation": { ar: "احجزي استشارة", en: "Book Consultation" },
  "services.contactUs": { ar: "تواصلي معنا", en: "Contact Us" },
  "services.min": { ar: "دقيقة", en: "min" },

  // FAQ
  "faq.title": { ar: "الأسئلة الشائعة", en: "Frequently Asked Questions" },
  "faq.subtitle": { ar: "كل ما تحتاجين معرفته عن رموش الإكستنشن", en: "Everything you need to know about lash extensions" },
  "faq.q1": { ar: "كم تدوم رموش الإكستنشن؟", en: "How long do lash extensions last?" },
  "faq.a1": {
    ar: "مع العناية المناسبة، تدوم رموش الإكستنشن من ٤-٦ أسابيع. ننصح بالصيانة كل ٢-٣ أسابيع للحفاظ على مظهر كثيف وجميل.",
    en: "With proper care, lash extensions typically last 4-6 weeks. We recommend fills every 2-3 weeks to maintain a full, beautiful look.",
  },
  "faq.q2": { ar: "هل رموش الإكستنشن آمنة؟", en: "Are lash extensions safe?" },
  "faq.a2": {
    ar: "نعم! عند تطبيقها من قبل متخصصة معتمدة باستخدام منتجات عالية الجودة، رموش الإكستنشن آمنة تمامًا. نستخدم لاصق طبي مضاد للحساسية.",
    en: "Yes! When applied by a certified professional using high-quality products, lash extensions are completely safe. We use hypoallergenic, medical-grade adhesive.",
  },
  "faq.q3": { ar: "كم تستغرق الجلسة؟", en: "How long does the application take?" },
  "faq.a3": {
    ar: "التركيب الكامل يستغرق ٩٠-١٢٠ دقيقة، والصيانة ٤٥-٩٠ دقيقة حسب الخدمة.",
    en: "A full set typically takes 90-120 minutes, while fills take 45-90 minutes depending on the service.",
  },
  "faq.q4": { ar: "هل أقدر أستخدم مكياج مع الرموش؟", en: "Can I wear makeup with lash extensions?" },
  "faq.a4": {
    ar: "نعم، لكن ننصح باستخدام منتجات خالية من الزيوت. تجنبي الماسكارا المقاومة للماء ومزيلات المكياج الزيتية.",
    en: "Yes, but we recommend using oil-free products. Avoid waterproof mascara and oil-based makeup removers.",
  },
  "faq.q5": { ar: "ما الفرق بين الكلاسيك والهايبرد والفوليوم؟", en: "What's the difference between Classic, Hybrid, and Volume?" },
  "faq.a5": {
    ar: "الكلاسيك يعطي مظهر طبيعي برمش واحد على كل رمش. الفوليوم يخلق دراما بعدة رموش رقيقة. الهايبرد يجمع بين التقنيتين.",
    en: "Classic gives a natural look with one extension per lash. Volume creates drama with multiple thin extensions. Hybrid combines both.",
  },
  "faq.q6": { ar: "ماذا لو لم أكن راضية عن النتيجة؟", en: "What if I'm not happy with my lashes?" },
  "faq.a6": {
    ar: "رضاك أولويتنا! إذا كان لديك أي ملاحظات خلال ٤٨ ساعة من موعدك، تواصلي معنا وسنصلح الأمر.",
    en: "Your satisfaction is our priority! If you have any concerns within 48 hours, contact us and we'll make it right.",
  },

  // Why Choose Us
  "why.title": { ar: "لماذا لاش سبيس", en: "Why Choose Lash Space" },
  "why.subtitle": { ar: "اكتشفي الفرق في فن الرموش الفاخرة", en: "Experience the difference of true luxury lash artistry" },
  "why.expertTitle": { ar: "فنانات خبيرات", en: "Expert Artists" },
  "why.expertDesc": { ar: "فنيات رموش معتمدات بسنوات من الخبرة والتعليم المستمر في أحدث التقنيات.", en: "Certified lash technicians with years of experience and continuous education." },
  "why.premiumTitle": { ar: "منتجات فاخرة", en: "Premium Products" },
  "why.premiumDesc": { ar: "نستخدم فقط أجود المنتجات المضادة للحساسية الآمنة وطويلة الأمد.", en: "We use only the highest quality, hypoallergenic products that are safe and long-lasting." },
  "why.luxuryTitle": { ar: "تجربة فاخرة", en: "Luxury Experience" },
  "why.luxuryDesc": { ar: "استرخي في استوديونا الهادئ بينما نحوّل رموشك في راحة تامة.", en: "Relax in our serene studio while we transform your lashes in ultimate comfort." },

  // Testimonials
  "testimonials.title": { ar: "ماذا تقول عميلاتنا", en: "What Our Clients Say" },
  "testimonials.subtitle": { ar: "لا تأخذي كلمتنا فقط", en: "Don't just take our word for it" },

  // Instagram
  "instagram.title": { ar: "تابعي أعمالنا", en: "Follow Our Work" },
  "instagram.subtitle": { ar: "شاهدي أحدث تحولات الرموش على انستقرام", en: "See our latest lash transformations on Instagram" },
  "instagram.follow": { ar: "تابعينا", en: "Follow" },
  "instagram.followOnTiktok": { ar: "تابعينا على تيك توك", en: "Follow on TikTok" },

  // CTA
  "cta.title": { ar: "جاهزة لتغيير إطلالتك؟", en: "Ready to Transform Your Look?" },
  "cta.subtitle": { ar: "احجزي موعدك اليوم واستمتعي بتجربة الرموش الفاخرة", en: "Book your appointment today and experience the luxury of perfect lashes" },
  "cta.scheduleNow": { ar: "احجزي الآن", en: "Schedule Now" },

  // Footer
  "footer.quickLinks": { ar: "روابط سريعة", en: "Quick Links" },
  "footer.hours": { ar: "ساعات العمل", en: "Hours" },
  "footer.contactUs": { ar: "تواصلي معنا", en: "Contact Us" },
  "footer.rights": { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
  "footer.privacy": { ar: "سياسة الخصوصية", en: "Privacy Policy" },
  "footer.terms": { ar: "الشروط والأحكام", en: "Terms of Service" },
  "footer.sunThu": { ar: "الأحد - الخميس", en: "Sun - Thu" },
  "footer.friday": { ar: "الجمعة", en: "Friday" },
  "footer.saturday": { ar: "السبت", en: "Saturday" },
  "footer.closed": { ar: "مغلق", en: "Closed" },

  // Blog
  "blog.title": { ar: "مدونة الرموش", en: "Lash Extension Blog" },
  "blog.subtitle": { ar: "نصائح وإرشادات من فنانات الرموش المحترفات", en: "Expert tips and guides from our professional lash artists." },
  "blog.filterByTopic": { ar: "تصفية حسب الموضوع", en: "Filter by topic" },
  "blog.allPosts": { ar: "جميع المقالات", en: "All Posts" },
  "blog.noPosts": { ar: "لا توجد مقالات متاحة بعد.", en: "No blog posts available yet." },
  "blog.noPostsTag": { ar: "لا توجد مقالات بوسم", en: "No posts found with tag" },
  "blog.readMore": { ar: "اقرأي المزيد", en: "Read More" },

  // About
  "about.title": { ar: "عن لاش سبيس", en: "About Lash Space" },
  "about.subtitle": { ar: "استوديو رموش منزلي فاخر في قلب جدة", en: "A premium home-based lash studio in the heart of Jeddah" },
  "about.ourStory": { ar: "قصتنا", en: "Our Story" },
  "about.whyHomeStudio": { ar: "لماذا استوديو منزلي؟", en: "Why a Home Studio?" },
  "about.whatWeStandFor": { ar: "قيمنا", en: "What We Stand For" },
  "about.principlesBehind": { ar: "المبادئ وراء كل تركيبة رموش", en: "The principles behind every lash set we create" },
  "about.ourCommitment": { ar: "التزامنا", en: "Our Commitment" },
  "about.qualitySafety": { ar: "الجودة والسلامة أمر لا يقبل التفاوض", en: "Quality and safety are non-negotiable" },
  "about.experienceDifference": { ar: "اكتشفي فرق لاش سبيس", en: "Experience the Lash Space Difference" },
  "about.bookPrivate": { ar: "احجزي موعدك الخاص وشاهدي لماذا عميلاتنا يعدن دائمًا", en: "Book your private appointment and see why our clients keep coming back" },
  "about.bookAppointment": { ar: "احجزي موعدك", en: "Book Your Appointment" },

  // Contact
  "contact.title": { ar: "تواصلي معنا", en: "Contact Us" },
  "contact.subtitle": { ar: "نحب نسمع منك", en: "We'd love to hear from you" },
  "contact.haveQuestions": { ar: "عندك أسئلة؟", en: "Have Questions?" },
  "contact.checkFaq": { ar: "اطلعي على الأسئلة الشائعة للإجابات السريعة", en: "Check out our FAQ for quick answers" },
  "contact.viewFaq": { ar: "عرض الأسئلة الشائعة", en: "View FAQ" },

  // Gallery
  "gallery.title": { ar: "معرض أعمالنا", en: "Our Gallery" },
  "gallery.subtitle": { ar: "شاهدي تحولات الرموش الأخيرة", en: "See our latest lash transformations" },
  "gallery.comingSoon": { ar: "الصور قادمة قريبًا!", en: "Photos coming soon!" },

  // Booking
  "booking.title": { ar: "احجزي موعدك", en: "Book Your Appointment" },
  "booking.subtitle": { ar: "اختاري الخدمة والوقت المناسب لك", en: "Choose your service and preferred time" },

  // Common
  "common.popular": { ar: "مميز", en: "Popular" },
  "common.sar": { ar: "ر.س", en: "SAR" },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");

  useEffect(() => {
    const saved = localStorage.getItem("lashspace-locale") as Locale | null;
    if (saved && (saved === "ar" || saved === "en")) {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("lashspace-locale", newLocale);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[locale] ?? key;
    },
    [locale],
  );

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <I18nContext.Provider value={{ locale, dir, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
