import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.appointment.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.service.deleteMany();
  await prisma.businessSettings.deleteMany();
  await prisma.adminUser.deleteMany();

  // Seed Lash Space services — REAL prices from @lashspace.sa (Jan 2025)
  const services = [
    // Classic
    {
      name: "Classic",
      slug: "classic",
      description: "One premium extension per natural lash for a naturally enhanced, elegant look. Perfect for first-timers.\n\nكلاسيك — رمش واحد على كل رمش طبيعي لإطلالة طبيعية وأنيقة. مثالي للمرة الأولى.",
      duration: 120,
      price: 300,
      category: "classic",
      sortOrder: 1,
    },
    {
      name: "Classic Wispy",
      slug: "classic-wispy",
      description: "Classic technique with alternating lengths for a feathery, textured finish. Natural base with trendy wispy dimension.\n\nكلاسيك ويسبي — تقنية الكلاسيك بأطوال متنوعة لإطلالة ريشية مميزة.",
      duration: 150,
      price: 350,
      category: "classic",
      sortOrder: 2,
    },
    {
      name: "Classic Half Set",
      slug: "classic-half-set",
      description: "Touch-up and fill for your classic set. Maintains fullness between appointments.\n\nطرف كلاسيك — تعبئة وصيانة لرموشك الكلاسيكية. يحافظ على الكثافة بين المواعيد.",
      duration: 60,
      price: 150,
      category: "classic",
      sortOrder: 3,
    },
    // Hybrid
    {
      name: "Hybrid",
      slug: "hybrid",
      description: "The best of both worlds — a stunning mix of classic and volume techniques for a textured, dimensional look.\n\nهايبرد — مزيج رائع من الكلاسيك والفوليوم لإطلالة مميزة بملمس وبُعد جميل.",
      duration: 150,
      price: 400,
      category: "hybrid",
      sortOrder: 4,
    },
    {
      name: "Hybrid Wispy",
      slug: "hybrid-wispy",
      description: "Hybrid technique with wispy, feathery texture. Combines volume fans with classic spikes for an editorial finish.\n\nهايبرد ويسبي — تقنية الهايبرد مع ملمس ريشي. يجمع مراوح الفوليوم مع الكلاسيك لإطلالة عصرية.",
      duration: 150,
      price: 450,
      category: "hybrid",
      sortOrder: 5,
    },
    {
      name: "Hybrid Half Set",
      slug: "hybrid-half-set",
      description: "Touch-up and fill for your hybrid set. Keeps that perfect textured look fresh.\n\nهايبرد طرف — تعبئة وصيانة لرموشك الهايبرد. يحافظ على الإطلالة المميزة.",
      duration: 75,
      price: 200,
      category: "hybrid",
      sortOrder: 6,
    },
    // Volume
    {
      name: "Volume",
      slug: "volume",
      description: "Handmade fans of ultra-fine lashes applied to each natural lash. Creates dramatic, fluffy fullness. Our signature service.\n\nفوليوم — مراوح يدوية من رموش رقيقة على كل رمش طبيعي. كثافة دراماتيكية وناعمة. خدمتنا المميزة.",
      duration: 180,
      price: 550,
      category: "volume",
      sortOrder: 7,
    },
    {
      name: "Volume Wispy",
      slug: "volume-wispy",
      description: "Full volume with alternating wispy spikes for maximum drama with textured dimension. The ultimate glam look.\n\nفوليوم ويسبي — فوليوم كامل مع أطراف ريشية متنوعة لأقصى دراما مع بُعد مميز. إطلالة الفخامة.",
      duration: 180,
      price: 600,
      category: "volume",
      sortOrder: 8,
    },
    {
      name: "Volume Half Set",
      slug: "volume-half-set",
      description: "Touch-up and fill for your volume set. Maintains that full, fluffy drama between appointments.\n\nفوليوم طرف — تعبئة وصيانة لرموشك الفوليوم. يحافظ على الكثافة والنعومة.",
      duration: 90,
      price: 275,
      category: "volume",
      sortOrder: 9,
    },
    // Wet Set
    {
      name: "Wet Set",
      slug: "wet-set",
      description: "Sleek, defined, and glossy — the wet look creates a stunning editorial effect. Tightly closed fans for a spiky, separated look.\n\nويت سيت — إطلالة أنيقة ولامعة بأسلوب المجلات. مراوح مغلقة بإحكام لمظهر محدد ولافت.",
      duration: 150,
      price: 450,
      category: "wet-set",
      sortOrder: 10,
    },
    {
      name: "Wet Set Wispy",
      slug: "wet-set-wispy",
      description: "Wet set technique combined with wispy spikes. Glossy, defined base with feathery texture for a unique editorial look.\n\nويت سيت ويسبي — تقنية الويت سيت مع أطراف ريشية. قاعدة لامعة ومحددة مع ملمس ريشي لإطلالة فريدة.",
      duration: 150,
      price: 500,
      category: "wet-set",
      sortOrder: 11,
    },
    // Weekly
    {
      name: "Weekly Lashes",
      slug: "weekly-lashes",
      description: "Quick, beautiful temporary lash enhancement perfect for events, parties, or a weekly glam boost. Comfortable wear for up to 7 days.\n\nرموش أسبوعية مؤقتة مثالية للمناسبات والحفلات. مريحة لمدة تصل إلى ٧ أيام.",
      duration: 45,
      price: 120,
      category: "weekly",
      sortOrder: 12,
    },
    // Other
    {
      name: "Lash Removal",
      slug: "lash-removal",
      description: "Safe, professional removal of existing lash extensions using a gentle dissolving technique. Zero damage to your natural lashes.\n\nإزالة احترافية وآمنة للرموش بدون أي ضرر للرموش الطبيعية.",
      duration: 30,
      price: 80,
      category: "other",
      sortOrder: 13,
    },
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  // Seed business settings
  await prisma.businessSettings.create({
    data: {
      id: "default",
      businessName: "LASH SPACE",
      phone: "+966XXXXXXXXX",
      email: "hello@lashspace.sa",
      address: "Jeddah, Saudi Arabia",
      city: "Jeddah",
      openingHours: JSON.stringify({
        sunday: { open: "10:00", close: "21:00" },
        monday: { open: "10:00", close: "21:00" },
        tuesday: { open: "10:00", close: "21:00" },
        wednesday: { open: "10:00", close: "21:00" },
        thursday: { open: "10:00", close: "21:00" },
        friday: { closed: true },
        saturday: { open: "10:00", close: "21:00" },
      }),
      socialLinks: JSON.stringify({
        instagram: "https://instagram.com/lashspace.sa",
      }),
      aboutText:
        "Lash Space is a luxury home-based lash studio in Jeddah, dedicated to enhancing your natural beauty with premium eyelash extensions. We create a comfortable, private experience with meticulous attention to detail and only the finest materials.\n\nلاش سبيس هو استوديو رموش منزلي فاخر في جدة، مكرّس لتعزيز جمالك الطبيعي برموش فاخرة. نوفر تجربة مريحة وخاصة مع اهتمام دقيق بالتفاصيل.",
      heroTagline: "Elevate Your Natural Beauty",
    },
  });

  // Seed sample customers
  const customers = [
    {
      name: "سارة أحمد",
      email: "sara@example.com",
      phone: "+966501234001",
      notes: "تفضل فوليوم، عيون حساسة / Prefers volume, sensitive eyes",
    },
    {
      name: "نورة محمد",
      email: "noura@example.com",
      phone: "+966501234002",
      notes: "عميلة منتظمة، كلاسيك / Regular client, classic set",
    },
    {
      name: "ريم خالد",
      email: "reem@example.com",
      phone: "+966501234003",
      notes: "حساسية من اللاتكس / Allergic to latex tape",
      allergies: "Latex",
    },
    {
      name: "لمياء عبدالله",
      email: "lamia@example.com",
      phone: "+966501234004",
    },
    {
      name: "هيفاء سعود",
      email: "haifa@example.com",
      phone: "+966501234005",
      notes: "تفضل ميغا فوليوم / Prefers mega volume, Kim-K style",
    },
  ];

  for (const customer of customers) {
    await prisma.customer.create({ data: customer });
  }

  // Seed admin user
  await prisma.adminUser.create({
    data: {
      email: "admin@lashspace.sa",
      password: "$2b$10$dummyhashforseeding",
      name: "Admin",
      role: "admin",
    },
  });

  // Seed sample appointments
  const allCustomers = await prisma.customer.findMany();
  const allServices = await prisma.service.findMany();

  if (allCustomers.length > 0 && allServices.length > 0) {
    const now = new Date();
    const volumeService = allServices.find((s) => s.slug === "volume");
    const classicRefill = allServices.find((s) => s.slug === "classic-half-set");
    const weeklyLashes = allServices.find((s) => s.slug === "weekly-lashes");

    const appointments = [
      {
        customerId: allCustomers[0].id,
        serviceId: volumeService!.id,
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0),
        status: "confirmed",
        totalPrice: volumeService!.price,
      },
      {
        customerId: allCustomers[1].id,
        serviceId: classicRefill!.id,
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0),
        status: "pending",
        totalPrice: classicRefill!.price,
      },
      {
        customerId: allCustomers[2].id,
        serviceId: weeklyLashes!.id,
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 11, 0),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 11, 45),
        status: "pending",
        totalPrice: weeklyLashes!.price,
      },
    ];

    for (const appt of appointments) {
      await prisma.appointment.create({ data: appt });
    }
  }

  console.log("✅ Lash Space database seeded successfully!");

  // --- Blog Posts ---
  console.log("🌱 Seeding blog posts...");

  const blogPosts = [
    {
      title: "The Ultimate Guide to Eyelash Extensions: Everything You Need to Know",
      titleAr: "الدليل الشامل لرموش الإكستنشن: كل ما تحتاجين معرفته",
      slug: "ultimate-guide-eyelash-extensions",
      excerpt: "Thinking about getting eyelash extensions? This comprehensive guide covers everything from types of lashes to aftercare.",
      excerptAr: "تفكرين في تركيب رموش إكستنشن؟ هذا الدليل الشامل يغطي كل شيء من أنواع الرموش إلى العناية بعد التركيب.",
      tags: "guide, lash-extensions, beginners",
      tagsAr: "دليل, رموش-إكستنشن, مبتدئات",
      content: `If you've been considering eyelash extensions but feel overwhelmed by all the information out there, you're not alone. This comprehensive guide will walk you through everything you need to know.\n\n## What Are Eyelash Extensions?\n\nEyelash extensions are semi-permanent fibers attached to your natural lashes to create a fuller, longer, and more dramatic look. Unlike false lashes that you apply and remove daily, extensions are professionally applied one lash at a time and can last several weeks with proper care.\n\n## Types of Lash Extensions\n\n**Classic Lashes** are the most natural-looking option, with one extension applied to each natural lash. Perfect for first-timers.\n\n**Volume Lashes** involve applying multiple ultra-fine extensions to each natural lash, creating a fuller, fluffier appearance.\n\n**Hybrid Lashes** combine both classic and volume techniques, offering a customizable look.\n\n**Wet Set Lashes** create a sleek, defined, glossy editorial look.\n\n**Wispy Lashes** feature alternating lengths for a feathery, textured finish.\n\n## Aftercare Is Key\n\nAvoid water for the first 24 hours after application. Keep your lashes clean, avoid oil-based products, and brush them daily with a clean spoolie. With proper care, expect extensions to last 4-6 weeks.`,
      contentAr: `إذا كنتي تفكرين في تركيب رموش إكستنشن لكن تحسين إن المعلومات كثيرة ومحتارة، ما أنتي لوحدك. هذا الدليل الشامل بيمشي معك خطوة بخطوة.\n\n## ما هي رموش الإكستنشن؟\n\nرموش الإكستنشن هي ألياف شبه دائمة تُركَّب على رموشك الطبيعية لإطلالة أكثف وأطول وأكثر دراماتيكية. على عكس الرموش الصناعية اليومية، الإكستنشن يتم تركيبها بشكل احترافي رمش برمش وتدوم أسابيع مع العناية المناسبة.\n\n## أنواع رموش الإكستنشن\n\n**كلاسيك** — الأكثر طبيعية، رمش واحد على كل رمش طبيعي. مثالي للمرة الأولى.\n\n**فوليوم** — عدة رموش رقيقة جدًا على كل رمش طبيعي لإطلالة كثيفة وناعمة.\n\n**هايبرد** — مزيج من الكلاسيك والفوليوم لإطلالة متنوعة.\n\n**وت ست** — إطلالة أنيقة ولامعة بأسلوب المجلات.\n\n**ويسبي** — أطوال متنوعة لملمس ريشي وعصري.\n\n## العناية بعد التركيب\n\nتجنبي الماء أول ٢٤ ساعة. حافظي على نظافة الرموش، ابتعدي عن المنتجات الزيتية، ومشطيها يوميًا. مع العناية الصحيحة، تدوم ٤-٦ أسابيع.`,
      published: true,
      publishedAt: new Date("2024-01-15"),
    },
    {
      title: "Classic vs Volume vs Hybrid Lashes: Which Style is Right for You?",
      titleAr: "كلاسيك vs فوليوم vs هايبرد: أي نوع يناسبك؟",
      slug: "classic-volume-hybrid-lashes-comparison",
      excerpt: "Not sure which lash style to choose? We break down the differences between classic, volume, and hybrid lashes.",
      excerptAr: "محتارة أي نوع رموش تختارين؟ نشرح لك الفرق بين الكلاسيك والفوليوم والهايبرد.",
      tags: "comparison, classic, volume, hybrid",
      tagsAr: "مقارنة, كلاسيك, فوليوم, هايبرد",
      content: `Choosing between classic, volume, and hybrid lashes can feel overwhelming. Each style offers unique benefits.\n\n## Classic Lashes: Natural Elegance\n\nOne individual extension per natural lash. Think of it as a mascara effect that lasts for weeks.\n\n**Best for:** First-time clients, those with naturally thick lashes, subtle everyday look.\n\n## Volume Lashes: Fluffy Drama\n\nMultiple ultra-fine extensions (2-8) per natural lash. Despite using more extensions, they're lighter than classics.\n\n**Best for:** Sparse or fine natural lashes, dramatic look, special events.\n\n## Hybrid Lashes: Best of Both Worlds\n\nMixes individual extensions with volume fans for a textured, dimensional look.\n\n**Best for:** Versatility, more fullness than classics but softer than full volume.\n\n## Making Your Decision\n\nConsider your natural lash condition, lifestyle, maintenance commitment, and budget. Book a consultation to discuss which style suits you best!`,
      contentAr: `الاختيار بين الكلاسيك والفوليوم والهايبرد ممكن يكون محيّر. كل نوع له مميزاته.\n\n## كلاسيك: أناقة طبيعية\n\nرمش واحد على كل رمش طبيعي. فكري فيه كتأثير ماسكارا يدوم أسابيع.\n\n**الأفضل لـ:** المرة الأولى، صاحبات الرموش الكثيفة طبيعيًا، الإطلالة اليومية الناعمة.\n\n## فوليوم: كثافة ناعمة\n\nعدة رموش رقيقة (٢-٨) على كل رمش طبيعي. رغم الكثرة، أخف من الكلاسيك.\n\n**الأفضل لـ:** الرموش الخفيفة، الإطلالة الدراماتيكية، المناسبات.\n\n## هايبرد: أفضل ما في العالمين\n\nمزيج من الرموش الفردية ومراوح الفوليوم لإطلالة مميزة وبُعد جميل.\n\n**الأفضل لـ:** التنوع، كثافة أكثر من الكلاسيك لكن أنعم من الفوليوم الكامل.\n\n## قرارك\n\nفكري في حالة رموشك الطبيعية، نمط حياتك، والتزامك بالصيانة. احجزي استشارة لمناقشة النوع المناسب لك!`,
      published: true,
      publishedAt: new Date("2024-01-22"),
    },
    {
      title: "How to Make Your Lash Extensions Last Longer: 10 Expert Tips",
      titleAr: "١٠ نصائح خبيرة لجعل رموشك تدوم أطول",
      slug: "make-lash-extensions-last-longer",
      excerpt: "Maximize your investment with these professional tips for extending the life of your lash extensions.",
      excerptAr: "استثمري في رموشك بأفضل شكل مع هالنصائح الاحترافية لإطالة عمر رموش الإكستنشن.",
      tags: "aftercare, tips, maintenance",
      tagsAr: "عناية, نصائح, صيانة",
      content: `Follow these expert tips to keep your lashes looking fresh and full for as long as possible.\n\n## 1. Keep Them Dry for 24 Hours\nAvoid water, steam, and sweat for at least 24 hours after your appointment.\n\n## 2. Cleanse Daily\nUse a lash-specific cleanser and soft brush to gently remove dirt and oil.\n\n## 3. Avoid Oil-Based Products\nOil is the enemy of lash adhesive. Check all your skincare products.\n\n## 4. Sleep on Your Back\nSleeping face-down puts pressure on your lashes. Try a silk pillowcase.\n\n## 5. Brush Them Daily\nUse a clean spoolie every morning to keep them neat.\n\n## 6. Don't Pick or Pull\nResist the urge! Contact your lash artist if something feels off.\n\n## 7. Skip the Mascara\nYou don't need it! If you must, use water-based formula on tips only.\n\n## 8. Avoid Excessive Heat\nKeep your face away from ovens, grills, and candles.\n\n## 9. Schedule Regular Fills\nEvery 2-3 weeks for optimal fullness.\n\n## 10. Use a Lash Sealant\nCreates a protective barrier around the adhesive.`,
      contentAr: `اتبعي هالنصائح الخبيرة عشان رموشك تبقى طازجة وكثيفة أطول فترة ممكنة.\n\n## ١. خليها جافة ٢٤ ساعة\nابتعدي عن الماء والبخار والعرق أول ٢٤ ساعة.\n\n## ٢. نظفيها يوميًا\nاستخدمي منظف خاص بالرموش وفرشاة ناعمة.\n\n## ٣. ابتعدي عن المنتجات الزيتية\nالزيت عدو لاصق الرموش. راجعي مكونات منتجاتك.\n\n## ٤. نامي على ظهرك\nالنوم على الوجه يضغط على الرموش. جربي مخدة حرير.\n\n## ٥. مشطيها يوميًا\nاستخدمي سبولي نظيف كل صباح.\n\n## ٦. لا تسحبين أو تنتفين\nقاومي الرغبة! تواصلي مع فنانة الرموش إذا حسيتي بشيء.\n\n## ٧. استغني عن الماسكارا\nما تحتاجينها! إذا لازم، ضعيها على الأطراف فقط.\n\n## ٨. ابتعدي عن الحرارة\nابعدي وجهك عن الفرن والشموع.\n\n## ٩. التزمي بمواعيد الصيانة\nكل ٢-٣ أسابيع للكثافة المثالية.\n\n## ١٠. استخدمي سيلانت الرموش\nيخلق حاجز حماية حول اللاصق.`,
      published: true,
      publishedAt: new Date("2024-02-01"),
    },
    {
      title: "What to Expect at Your First Lash Extension Appointment",
      titleAr: "ماذا تتوقعين في أول موعد رموش إكستنشن؟",
      slug: "first-lash-extension-appointment-guide",
      excerpt: "Nervous about your first lash appointment? This guide walks you through the entire process.",
      excerptAr: "متوترة من أول موعد رموش؟ هذا الدليل يمشي معك خطوة بخطوة.",
      tags: "beginners, guide, first-time",
      tagsAr: "مبتدئات, دليل, أول-مرة",
      content: `Getting lash extensions for the first time is exciting! Here's everything you need to know.\n\n## Before Your Appointment\n- Remove all eye makeup\n- Avoid caffeine\n- Remove contact lenses\n- Arrive on time\n\n## The Consultation\nYour lash artist will discuss your desired look, assess your natural lashes, and recommend the best style. Share any allergies or sensitivities.\n\n## During Application\nYou'll recline comfortably with your eyes closed for 2-3 hours. Most clients fall asleep! The process is completely painless.\n\n## Immediately After\n- Slight redness (fades within hours)\n- Watery eyes or mild sensitivity\n- New sensation on your lashes (fades quickly)\n\n## The First 24 Hours\nKeep lashes completely dry. Avoid showers (neck up), saunas, and heavy sweating.\n\n## Common Questions\n**Will it hurt?** No! Completely painless with a trained professional.\n**Can I wear makeup?** Yes, but avoid eye makeup for 24 hours. Use oil-free products after.\n**What if I hate them?** Professional removal is available, but most first-timers love their results!`,
      contentAr: `تركيب رموش إكستنشن لأول مرة تجربة ممتعة! هنا كل اللي تحتاجين تعرفينه.\n\n## قبل الموعد\n- أزيلي كل مكياج العيون\n- تجنبي الكافيين\n- أزيلي العدسات اللاصقة\n- وصلي بالوقت\n\n## الاستشارة\nفنانة الرموش بتناقش معك الإطلالة المطلوبة وتقيّم رموشك الطبيعية وتنصحك بأفضل نوع. شاركيها أي حساسية عندك.\n\n## أثناء التركيب\nبتستلقين بكل راحة وعيونك مغمضة لمدة ٢-٣ ساعات. أغلب العميلات ينامون! العملية بدون أي ألم.\n\n## بعد التركيب مباشرة\n- احمرار خفيف (يروح خلال ساعات)\n- دموع أو حساسية خفيفة\n- إحساس جديد على الرموش (يتلاشى بسرعة)\n\n## أول ٢٤ ساعة\nخلي الرموش جافة تمامًا. تجنبي الاستحمام (من الرقبة وفوق) والساونا.\n\n## أسئلة شائعة\n**بتألم؟** لا! بدون ألم مع فنانة محترفة.\n**أقدر أحط مكياج؟** نعم، لكن تجنبي مكياج العيون أول ٢٤ ساعة.\n**إذا ما عجبتني؟** الإزالة الاحترافية متاحة، لكن أغلب العميلات يحبون النتيجة!`,
      published: true,
      publishedAt: new Date("2024-02-10"),
    },
    {
      title: "Lash Extension Aftercare: The Complete Do's and Don'ts Guide",
      titleAr: "العناية برموش الإكستنشن: دليل المسموح والممنوع",
      slug: "lash-extension-aftercare-dos-donts",
      excerpt: "Master the art of lash extension aftercare with this comprehensive guide.",
      excerptAr: "اتقني فن العناية برموش الإكستنشن مع هذا الدليل الشامل.",
      tags: "aftercare, guide, maintenance",
      tagsAr: "عناية, دليل, صيانة",
      content: `Proper aftercare is the secret to long-lasting, beautiful lash extensions.\n\n## THE DO'S\n- **Keep Them Dry** for 24 hours\n- **Cleanse Daily** with lash-specific cleanser\n- **Brush Every Morning** with a clean spoolie\n- **Use Oil-Free Products** for all skincare\n- **Sleep on Your Back** or use silk pillowcase\n- **Book Regular Fills** every 2-3 weeks\n- **Pat Dry Gently** with lint-free towel\n\n## THE DON'TS\n- **Don't Use Oil-Based Products** — dissolves adhesive\n- **Don't Wear Mascara** — you don't need it!\n- **Don't Use Eyelash Curlers** — can damage extensions\n- **Don't Pull or Pick** — contact your lash artist instead\n- **Don't Get Them Wet Too Soon** — 24 hour rule\n- **Don't Use Cotton Pads** — fibers catch on extensions\n\n## When to Call Your Lash Artist\n- Persistent irritation or redness\n- Unusual lash loss\n- Discomfort or pain`,
      contentAr: `العناية الصحيحة هي سر الرموش الجميلة طويلة الأمد.\n\n## المسموح\n- **خليها جافة** ٢٤ ساعة\n- **نظفيها يوميًا** بمنظف خاص\n- **مشطيها كل صباح** بسبولي نظيف\n- **استخدمي منتجات خالية من الزيوت**\n- **نامي على ظهرك** أو استخدمي مخدة حرير\n- **احجزي صيانة** كل ٢-٣ أسابيع\n- **جففيها بلطف** بمنديل بدون وبر\n\n## الممنوع\n- **لا تستخدمين منتجات زيتية** — تذوّب اللاصق\n- **لا تحطين ماسكارا** — ما تحتاجينها!\n- **لا تستخدمين مكبس الرموش** — يتلف الإكستنشن\n- **لا تسحبين أو تنتفين** — تواصلي مع الفنانة\n- **لا تبللينها بدري** — قاعدة الـ ٢٤ ساعة\n- **لا تستخدمين قطن** — الألياف تعلق بالرموش\n\n## متى تتواصلين مع فنانة الرموش؟\n- تهيج أو احمرار مستمر\n- تساقط غير طبيعي\n- ألم أو إزعاج`,
      published: true,
      publishedAt: new Date("2024-02-18"),
    },
    {
      title: "Volume Lashes vs Mega Volume: Understanding the Difference",
      titleAr: "فوليوم vs ميغا فوليوم: ما الفرق؟",
      slug: "volume-vs-mega-volume-lashes",
      excerpt: "Learn the key differences between volume and mega volume lashes to choose the perfect level of drama.",
      excerptAr: "اعرفي الفرق بين الفوليوم والميغا فوليوم عشان تختارين مستوى الدراما المثالي.",
      tags: "volume, mega-volume, comparison",
      tagsAr: "فوليوم, ميغا-فوليوم, مقارنة",
      content: `When it comes to dramatic, full lashes, volume and mega volume techniques reign supreme.\n\n## What Are Volume Lashes?\nMultiple ultra-fine extensions (2-5) per natural lash using hand-made fans. Creates a fuller, fluffier appearance while remaining lightweight.\n\n## What Are Mega Volume Lashes?\n6-16 extensions per natural lash using extremely fine 0.03mm fibers. Maximum fullness and drama.\n\n## Key Differences\n- **Fullness:** Volume = noticeable fullness. Mega = maximum density.\n- **Extensions per lash:** Volume = 2-5. Mega = 6-16.\n- **Application time:** Volume = 2-3 hours. Mega = 3-4 hours.\n- **Price:** Mega is typically more expensive.\n\n## Who Should Choose Volume?\nThose wanting fullness without extreme drama, sparse natural lashes, everyday versatility.\n\n## Who Should Choose Mega Volume?\nBold lash lovers, special events, very sparse natural lashes, Instagram-worthy looks.\n\nBoth styles are comfortable when applied correctly. Book a consultation to find your perfect volume level!`,
      contentAr: `لما نتكلم عن رموش دراماتيكية وكثيفة، الفوليوم والميغا فوليوم هم الملوك.\n\n## ما هي رموش الفوليوم؟\nعدة رموش رقيقة جدًا (٢-٥) على كل رمش طبيعي بمراوح يدوية. إطلالة أكثف وأنعم مع وزن خفيف.\n\n## ما هي رموش الميغا فوليوم؟\n٦-١٦ رمش على كل رمش طبيعي بألياف رقيقة جدًا ٠.٠٣مم. أقصى كثافة ودراما.\n\n## الفروقات الرئيسية\n- **الكثافة:** فوليوم = كثافة ملحوظة. ميغا = أقصى كثافة.\n- **الرموش لكل رمش:** فوليوم = ٢-٥. ميغا = ٦-١٦.\n- **وقت التركيب:** فوليوم = ٢-٣ ساعات. ميغا = ٣-٤ ساعات.\n- **السعر:** الميغا عادة أغلى.\n\n## من تختار الفوليوم؟\nاللي تبين كثافة بدون دراما مبالغة، الرموش الخفيفة، التنوع اليومي.\n\n## من تختار الميغا فوليوم؟\nمحبات الرموش الجريئة، المناسبات، الرموش الخفيفة جدًا، إطلالة انستقرام.\n\nكلا النوعين مريحين مع التركيب الصحيح. احجزي استشارة!`,
      published: true,
      publishedAt: new Date("2024-02-25"),
    },
    {
      title: "Is Getting Lash Extensions Worth It? Honest Pros and Cons",
      titleAr: "هل رموش الإكستنشن تستاهل؟ إيجابيات وسلبيات بصراحة",
      slug: "are-lash-extensions-worth-it",
      excerpt: "Considering lash extensions but not sure if they're worth the investment? Here's an honest breakdown.",
      excerptAr: "تفكرين في رموش إكستنشن لكن مو متأكدة إنها تستاهل؟ هنا تحليل صريح.",
      tags: "guide, cost, pros-cons",
      tagsAr: "دليل, تكلفة, إيجابيات-سلبيات",
      content: `Let's examine the honest pros and cons to help you decide.\n\n## THE PROS\n- **Wake Up Ready** — perfect lashes every day, no mascara\n- **Time Savings** — save 10-20 minutes each morning\n- **Waterproof Beauty** — swim, shower, cry without worry\n- **Confidence Boost** — look polished effortlessly\n- **Customizable** — from natural to dramatic\n- **Long-Lasting** — weeks of continuous beauty\n\n## THE CONS\n- **Cost** — initial sets + regular fills add up\n- **Time Commitment** — 2-3 hour initial appointment + fills\n- **Maintenance Required** — daily cleansing, careful product selection\n- **Sleeping Position** — may need to adjust\n- **Product Restrictions** — no oil-based products\n\n## The Verdict\nLash extensions are absolutely worth it for the right person. If you value convenience, consistently beautiful lashes, and are willing to invest in maintenance, they can be life-changing. Start with a trial set for a special occasion to experience the benefits firsthand!`,
      contentAr: `خلينا نشوف الإيجابيات والسلبيات بصراحة عشان تقدرين تقررين.\n\n## الإيجابيات\n- **صحي جاهزة** — رموش مثالية كل يوم بدون ماسكارا\n- **توفير وقت** — وفري ١٠-٢٠ دقيقة كل صباح\n- **جمال مقاوم للماء** — اسبحي، استحمي، ابكي بدون قلق\n- **ثقة أكبر** — إطلالة مرتبة بدون مجهود\n- **قابلة للتخصيص** — من الطبيعي للدراماتيكي\n- **تدوم طويل** — أسابيع من الجمال المستمر\n\n## السلبيات\n- **التكلفة** — التركيب الأول + الصيانة الدورية\n- **الوقت** — ٢-٣ ساعات للتركيب + مواعيد صيانة\n- **تحتاج عناية** — تنظيف يومي ومنتجات خاصة\n- **وضعية النوم** — ممكن تحتاجين تعديل\n- **قيود المنتجات** — بدون منتجات زيتية\n\n## الحكم\nرموش الإكستنشن تستاهل للشخص المناسب. إذا تقدرين الراحة والجمال المستمر ومستعدة للعناية، ممكن تغير حياتك. جربي تركيب أول لمناسبة وشوفي بنفسك!`,
      published: true,
      publishedAt: new Date("2024-03-05"),
    },
    {
      title: "How Often Should You Get Lash Fills? A Professional Guide",
      titleAr: "كم مرة تحتاجين صيانة الرموش؟ دليل احترافي",
      slug: "lash-fill-frequency-guide",
      excerpt: "Timing your lash fills correctly is crucial for maintaining full, beautiful lashes.",
      excerptAr: "توقيت صيانة الرموش مهم جدًا للحفاظ على رموش كثيفة وجميلة.",
      tags: "maintenance, fills, guide",
      tagsAr: "صيانة, تعبئة, دليل",
      content: `One of the most common questions: "How often should I get fills?"\n\n## The Standard Schedule\n**Every 2-3 weeks** is recommended for most clients. This maintains fullness and prevents needing a full new set.\n\n## Factors That Affect Your Schedule\n- **Natural Lash Cycle** — faster turnover = more frequent fills\n- **Aftercare Habits** — excellent care can stretch to 3-4 weeks\n- **Lash Style** — volume retains better than classic\n- **Lifestyle** — swimming, gym, sleeping position\n- **Hormones** — pregnancy, thyroid conditions affect retention\n\n## What Happens If You Wait Too Long?\n- **3-4 weeks:** Noticeable sparseness, longer fill appointment\n- **4-6 weeks:** May need a partial or full new set\n- **6+ weeks:** Definitely need a new set\n\n## Maximizing Time Between Fills\n- Optimize aftercare\n- Use a lash sealant\n- Avoid excessive touching\n- Stay hydrated\n- Manage stress\n\n## Our Recommendation\nEvery 2.5 to 3 weeks hits the sweet spot. Maintain good fullness, shorter appointments, and consistent results. Book a consultation to find your ideal timing!`,
      contentAr: `من أكثر الأسئلة: "كم مرة أحتاج صيانة؟"\n\n## الجدول المعتاد\n**كل ٢-٣ أسابيع** ننصح به لأغلب العميلات. يحافظ على الكثافة ويمنع الحاجة لتركيب جديد.\n\n## عوامل تأثر على جدولك\n- **دورة الرموش الطبيعية** — تجدد أسرع = صيانة أكثر\n- **عادات العناية** — العناية الممتازة تمدد لـ ٣-٤ أسابيع\n- **نوع الرموش** — الفوليوم يثبت أحسن من الكلاسيك\n- **نمط الحياة** — السباحة، الرياضة، وضعية النوم\n- **الهرمونات** — الحمل والغدة الدرقية تأثر على الثبات\n\n## ماذا يحصل إذا تأخرتي؟\n- **٣-٤ أسابيع:** فراغات ملحوظة، موعد صيانة أطول\n- **٤-٦ أسابيع:** ممكن تحتاجين تركيب جزئي أو كامل\n- **٦+ أسابيع:** أكيد تحتاجين تركيب جديد\n\n## نصيحتنا\nكل ٢.٥ إلى ٣ أسابيع هو التوقيت المثالي. كثافة جيدة، مواعيد أقصر، ونتائج ثابتة. احجزي استشارة لمعرفة التوقيت المثالي لك!`,
      published: true,
      publishedAt: new Date("2024-03-12"),
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
    console.log(`  ✅ Blog: ${post.title}`);
  }

  console.log("✨ All seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
