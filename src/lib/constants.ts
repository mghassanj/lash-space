export const SITE_CONFIG = {
  name: "LASH SPACE",
  nameAr: "لاش سبيس",
  tagline: "Elevate Your Natural Beauty",
  taglineAr: "ارتقي بجمالك الطبيعي",
  description:
    "Premium eyelash extensions in Jeddah. Classic, volume, hybrid, wet set, wispy & weekly lashes. Luxury home-based lash studio experience.",
  descriptionAr:
    "رموش فاخرة في جدة. كلاسيك، فوليوم، هايبرد، وت ست، ويسبي ورموش أسبوعية. تجربة استوديو رموش منزلي فاخرة.",
  url: "https://lashspace.sa",
  phone: "+966560878383",
  whatsapp: "https://wa.me/966560878383",
  email: "hello@lashspace.sa",
  address: "Jeddah, Al-Manar",
  addressAr: "جدة، حي المنار",
  city: "Jeddah",
  cityAr: "جدة",
  type: "Home-based Studio",
  typeAr: "استوديو منزلي",
  social: {
    instagram: "https://instagram.com/lashspace.sa",
    tiktok: "https://tiktok.com/@lashspace.sa",
    linktree: "https://linktr.ee/lashspace.sa",
  },
  hashtags: ["lash_space222", "تركيب_رموش", "رموش_جدة", "jeddahlashes"],
  hours: {
    sunday: { en: "10:00 AM – 9:00 PM", ar: "١٠:٠٠ ص – ٩:٠٠ م" },
    monday: { en: "10:00 AM – 9:00 PM", ar: "١٠:٠٠ ص – ٩:٠٠ م" },
    tuesday: { en: "10:00 AM – 9:00 PM", ar: "١٠:٠٠ ص – ٩:٠٠ م" },
    wednesday: { en: "10:00 AM – 9:00 PM", ar: "١٠:٠٠ ص – ٩:٠٠ م" },
    thursday: { en: "10:00 AM – 9:00 PM", ar: "١٠:٠٠ ص – ٩:٠٠ م" },
    friday: { en: "Closed", ar: "مغلق" },
    saturday: { en: "Closed", ar: "مغلق" },
  },
  currency: "SAR",
  locale: "en",
};

export const SERVICE_CATEGORIES = [
  {
    slug: "monthly",
    name: "Monthly Sessions",
    nameAr: "الجلسات الشهرية",
    description: "Full lash extensions — 3 hours of luxury",
    descriptionAr: "تركيب رموش كامل — ٣ ساعات من الفخامة",
  },
  {
    slug: "addon",
    name: "Add-ons",
    nameAr: "إضافات",
    description: "Enhance any lash style with custom touches",
    descriptionAr: "عززي أي نوع رموش بلمسات مخصصة",
  },
  {
    slug: "half_set",
    name: "Half Sets",
    nameAr: "طرف",
    description: "Outer corner only — 2 hours for a subtle lift",
    descriptionAr: "الطرف الخارجي فقط — ساعتين لإطلالة خفيفة",
  },
  {
    slug: "other",
    name: "Other Services",
    nameAr: "خدمات أخرى",
    description: "Weekly lashes & safe removal",
    descriptionAr: "رموش أسبوعية وإزالة آمنة",
  },
  {
    slug: "retouch",
    name: "Retouch / Fill",
    nameAr: "روتوش",
    description: "Maintenance sessions — half price of any monthly session",
    descriptionAr: "جلسات صيانة — نصف سعر أي جلسة شهرية",
  },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home", labelAr: "الرئيسية" },
  { href: "/services", label: "Services & Pricing", labelAr: "الخدمات والأسعار" },
  { href: "/gallery", label: "Gallery", labelAr: "المعرض" },
  { href: "/about", label: "About", labelAr: "عنّا" },
  { href: "/blog", label: "Blog", labelAr: "المدونة" },
  { href: "/contact", label: "Contact", labelAr: "تواصلي معنا" },
] as const;

export const COLORS = {
  olive: "#898A73",      // Olive gray — earthy sage
  ivory: "#E8E8DC",      // Off-white / cream
  silver: "#BBBAB3",     // Silver gray — neutral
  taupe: "#BAB0A5",      // Warm taupe — greige
  mocha: "#9C8974",      // Medium brown — warm earthy
  black: "#000000",      // Background black
  dark: "#1A1A1A",       // Near black
  white: "#FFFFFF",
} as const;
