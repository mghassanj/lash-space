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
    saturday: { en: "10:00 AM – 9:00 PM", ar: "١٠:٠٠ ص – ٩:٠٠ م" },
  },
  currency: "SAR",
  locale: "en",
};

export const SERVICE_CATEGORIES = [
  {
    slug: "classic",
    name: "Classic",
    nameAr: "كلاسيك",
    description: "Natural, elegant enhancement",
    descriptionAr: "تعزيز طبيعي وأنيق",
  },
  {
    slug: "hybrid",
    name: "Hybrid",
    nameAr: "هايبرد",
    description: "Best of both worlds",
    descriptionAr: "الأفضل من كلا العالمين",
  },
  {
    slug: "volume",
    name: "Volume",
    nameAr: "فوليوم",
    description: "Full, fluffy, dramatic",
    descriptionAr: "كثيفة وناعمة ودراماتيكية",
  },
  {
    slug: "wet-set",
    name: "Wet Set",
    nameAr: "وت ست",
    description: "Sleek, defined, glossy",
    descriptionAr: "أنيقة ومحددة ولامعة",
  },
  {
    slug: "wispy",
    name: "Wispy",
    nameAr: "ويسبي",
    description: "Feathery, textured, trendy",
    descriptionAr: "ريشية ومميزة وعصرية",
  },
  {
    slug: "weekly",
    name: "Weekly Lashes",
    nameAr: "رموش أسبوعية",
    description: "Quick, temporary glam",
    descriptionAr: "إطلالة سريعة ومؤقتة",
  },
  {
    slug: "other",
    name: "Other Services",
    nameAr: "خدمات أخرى",
    description: "Removal & maintenance",
    descriptionAr: "إزالة وصيانة",
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
