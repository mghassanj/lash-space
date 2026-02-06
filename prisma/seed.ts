import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.appointment.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.service.deleteMany();
  await prisma.businessSettings.deleteMany();
  await prisma.adminUser.deleteMany();

  // Seed Lash Space services (Jeddah pricing in SAR)
  const services = [
    {
      name: "Classic Full Set",
      slug: "classic-full-set",
      description:
        "One premium extension per natural lash for a naturally enhanced, elegant look. Perfect for first-timers who want subtle beauty. Includes personalized consultation and aftercare guide.\n\nتركيب رمش واحد على كل رمش طبيعي لإطلالة طبيعية وأنيقة. مثالي للمرة الأولى.",
      duration: 120,
      price: 350,
      category: "classic",
      sortOrder: 1,
    },
    {
      name: "Classic Refill",
      slug: "classic-refill",
      description:
        "Maintain your classic set with a professional touch-up every 2-3 weeks. We replace fallen lashes and fill gaps for a fresh, full look.\n\nصيانة الرموش الكلاسيكية كل ٢-٣ أسابيع.",
      duration: 60,
      price: 150,
      category: "classic",
      sortOrder: 2,
    },
    {
      name: "Hybrid Full Set",
      slug: "hybrid-full-set",
      description:
        "The best of both worlds — a stunning mix of classic and volume techniques for a textured, wispy effect. Adds beautiful dimension while keeping a natural base.\n\nمزيج رائع من الكلاسيك والفوليوم لإطلالة مميزة.",
      duration: 150,
      price: 450,
      category: "hybrid",
      sortOrder: 3,
    },
    {
      name: "Hybrid Refill",
      slug: "hybrid-refill",
      description:
        "Keep your hybrid set looking full and textured. Recommended every 2-3 weeks for optimal retention.\n\nصيانة رموش الهايبرد كل ٢-٣ أسابيع.",
      duration: 75,
      price: 200,
      category: "hybrid",
      sortOrder: 4,
    },
    {
      name: "Volume Full Set",
      slug: "volume-full-set",
      description:
        "Handmade fans of 3-6 ultra-fine lashes applied to each natural lash. Creates a dramatic, fluffy look with incredible fullness. Our signature service.\n\nمراوح يدوية من ٣-٦ رموش رقيقة على كل رمش طبيعي. خدمتنا المميزة.",
      duration: 180,
      price: 550,
      category: "volume",
      sortOrder: 5,
    },
    {
      name: "Volume Refill",
      slug: "volume-refill",
      description:
        "Maintain your volume set's fullness and drama. We carefully replace fans and fill any sparse areas.\n\nصيانة رموش الفوليوم للحفاظ على الكثافة.",
      duration: 90,
      price: 250,
      category: "volume",
      sortOrder: 6,
    },
    {
      name: "Wet Set Full",
      slug: "wet-set-full",
      description:
        "Sleek, defined, and glossy — the wet look lash set creates a stunning editorial effect. Fans are closed tightly for a spiky, separated look that's all over social media.\n\nإطلالة أنيقة ولامعة بأسلوب الوت ست المميز.",
      duration: 150,
      price: 500,
      category: "wet-set",
      sortOrder: 7,
    },
    {
      name: "Wet Set Refill",
      slug: "wet-set-refill",
      description:
        "Keep your wet set looking sharp and defined. Touch-up every 2-3 weeks.\n\nصيانة رموش الوت ست كل ٢-٣ أسابيع.",
      duration: 75,
      price: 220,
      category: "wet-set",
      sortOrder: 8,
    },
    {
      name: "Wispy Full Set",
      slug: "wispy-full-set",
      description:
        "Trendy textured look with alternating short and long lashes creating a feathery, editorial finish. The Kim-K inspired style that's dominating social media.\n\nإطلالة ريشية عصرية بأطوال متنوعة على طريقة كيم كارداشيان.",
      duration: 150,
      price: 480,
      category: "wispy",
      sortOrder: 9,
    },
    {
      name: "Wispy Refill",
      slug: "wispy-refill",
      description:
        "Maintain your wispy set's feathery texture and dimension.\n\nصيانة رموش الويسبي للحفاظ على الملمس الريشي.",
      duration: 75,
      price: 210,
      category: "wispy",
      sortOrder: 10,
    },
    {
      name: "Weekly Lashes",
      slug: "weekly-lashes",
      description:
        "Quick, beautiful temporary lash enhancement perfect for events, parties, or a weekly glam boost. Easy application and comfortable wear for up to 7 days.\n\nرموش أسبوعية مؤقتة مثالية للمناسبات والحفلات.",
      duration: 45,
      price: 120,
      category: "weekly",
      sortOrder: 11,
    },
    {
      name: "Lash Removal",
      slug: "lash-removal",
      description:
        "Safe, professional removal of existing lash extensions using a gentle dissolving technique. Zero damage to your natural lashes.\n\nإزالة احترافية وآمنة للرموش بدون أي ضرر.",
      duration: 30,
      price: 80,
      category: "other",
      sortOrder: 12,
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
    const volumeService = allServices.find((s) => s.slug === "volume-full-set");
    const classicRefill = allServices.find((s) => s.slug === "classic-refill");
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
      slug: "ultimate-guide-eyelash-extensions",
      excerpt: "Thinking about getting eyelash extensions? This comprehensive guide covers everything from types of lashes to aftercare.",
      tags: "guide, lash-extensions, beginners",
      content: `If you've been considering eyelash extensions but feel overwhelmed by all the information out there, you're not alone. This comprehensive guide will walk you through everything you need to know.\n\n## What Are Eyelash Extensions?\n\nEyelash extensions are semi-permanent fibers attached to your natural lashes to create a fuller, longer, and more dramatic look. Unlike false lashes that you apply and remove daily, extensions are professionally applied one lash at a time and can last several weeks with proper care.\n\n## Types of Lash Extensions\n\n**Classic Lashes** are the most natural-looking option, with one extension applied to each natural lash. Perfect for first-timers.\n\n**Volume Lashes** involve applying multiple ultra-fine extensions to each natural lash, creating a fuller, fluffier appearance.\n\n**Hybrid Lashes** combine both classic and volume techniques, offering a customizable look.\n\n**Wet Set Lashes** create a sleek, defined, glossy editorial look.\n\n**Wispy Lashes** feature alternating lengths for a feathery, textured finish.\n\n## Aftercare Is Key\n\nAvoid water for the first 24 hours after application. Keep your lashes clean, avoid oil-based products, and brush them daily with a clean spoolie. With proper care, expect extensions to last 4-6 weeks.`,
      published: true,
      publishedAt: new Date("2024-01-15"),
    },
    {
      title: "Classic vs Volume vs Hybrid Lashes: Which Style is Right for You?",
      slug: "classic-volume-hybrid-lashes-comparison",
      excerpt: "Not sure which lash style to choose? We break down the differences between classic, volume, and hybrid lashes.",
      tags: "comparison, classic, volume, hybrid",
      content: `Choosing between classic, volume, and hybrid lashes can feel overwhelming. Each style offers unique benefits.\n\n## Classic Lashes: Natural Elegance\n\nOne individual extension per natural lash. Think of it as a mascara effect that lasts for weeks.\n\n**Best for:** First-time clients, those with naturally thick lashes, subtle everyday look.\n\n## Volume Lashes: Fluffy Drama\n\nMultiple ultra-fine extensions (2-8) per natural lash. Despite using more extensions, they're lighter than classics.\n\n**Best for:** Sparse or fine natural lashes, dramatic look, special events.\n\n## Hybrid Lashes: Best of Both Worlds\n\nMixes individual extensions with volume fans for a textured, dimensional look.\n\n**Best for:** Versatility, more fullness than classics but softer than full volume.\n\n## Making Your Decision\n\nConsider your natural lash condition, lifestyle, maintenance commitment, and budget. Book a consultation to discuss which style suits you best!`,
      published: true,
      publishedAt: new Date("2024-01-22"),
    },
    {
      title: "How to Make Your Lash Extensions Last Longer: 10 Expert Tips",
      slug: "make-lash-extensions-last-longer",
      excerpt: "Maximize your investment with these professional tips for extending the life of your lash extensions.",
      tags: "aftercare, tips, maintenance",
      content: `Follow these expert tips to keep your lashes looking fresh and full for as long as possible.\n\n## 1. Keep Them Dry for 24 Hours\nAvoid water, steam, and sweat for at least 24 hours after your appointment.\n\n## 2. Cleanse Daily\nUse a lash-specific cleanser and soft brush to gently remove dirt and oil.\n\n## 3. Avoid Oil-Based Products\nOil is the enemy of lash adhesive. Check all your skincare products.\n\n## 4. Sleep on Your Back\nSleeping face-down puts pressure on your lashes. Try a silk pillowcase.\n\n## 5. Brush Them Daily\nUse a clean spoolie every morning to keep them neat.\n\n## 6. Don't Pick or Pull\nResist the urge! Contact your lash artist if something feels off.\n\n## 7. Skip the Mascara\nYou don't need it! If you must, use water-based formula on tips only.\n\n## 8. Avoid Excessive Heat\nKeep your face away from ovens, grills, and candles.\n\n## 9. Schedule Regular Fills\nEvery 2-3 weeks for optimal fullness.\n\n## 10. Use a Lash Sealant\nCreates a protective barrier around the adhesive.`,
      published: true,
      publishedAt: new Date("2024-02-01"),
    },
    {
      title: "What to Expect at Your First Lash Extension Appointment",
      slug: "first-lash-extension-appointment-guide",
      excerpt: "Nervous about your first lash appointment? This guide walks you through the entire process.",
      tags: "beginners, guide, first-time",
      content: `Getting lash extensions for the first time is exciting! Here's everything you need to know.\n\n## Before Your Appointment\n- Remove all eye makeup\n- Avoid caffeine\n- Remove contact lenses\n- Arrive on time\n\n## The Consultation\nYour lash artist will discuss your desired look, assess your natural lashes, and recommend the best style. Share any allergies or sensitivities.\n\n## During Application\nYou'll recline comfortably with your eyes closed for 2-3 hours. Most clients fall asleep! The process is completely painless.\n\n## Immediately After\n- Slight redness (fades within hours)\n- Watery eyes or mild sensitivity\n- New sensation on your lashes (fades quickly)\n\n## The First 24 Hours\nKeep lashes completely dry. Avoid showers (neck up), saunas, and heavy sweating.\n\n## Common Questions\n**Will it hurt?** No! Completely painless with a trained professional.\n**Can I wear makeup?** Yes, but avoid eye makeup for 24 hours. Use oil-free products after.\n**What if I hate them?** Professional removal is available, but most first-timers love their results!`,
      published: true,
      publishedAt: new Date("2024-02-10"),
    },
    {
      title: "Lash Extension Aftercare: The Complete Do's and Don'ts Guide",
      slug: "lash-extension-aftercare-dos-donts",
      excerpt: "Master the art of lash extension aftercare with this comprehensive guide.",
      tags: "aftercare, guide, maintenance",
      content: `Proper aftercare is the secret to long-lasting, beautiful lash extensions.\n\n## THE DO'S\n- **Keep Them Dry** for 24 hours\n- **Cleanse Daily** with lash-specific cleanser\n- **Brush Every Morning** with a clean spoolie\n- **Use Oil-Free Products** for all skincare\n- **Sleep on Your Back** or use silk pillowcase\n- **Book Regular Fills** every 2-3 weeks\n- **Pat Dry Gently** with lint-free towel\n\n## THE DON'TS\n- **Don't Use Oil-Based Products** — dissolves adhesive\n- **Don't Wear Mascara** — you don't need it!\n- **Don't Use Eyelash Curlers** — can damage extensions\n- **Don't Pull or Pick** — contact your lash artist instead\n- **Don't Get Them Wet Too Soon** — 24 hour rule\n- **Don't Use Cotton Pads** — fibers catch on extensions\n\n## When to Call Your Lash Artist\n- Persistent irritation or redness\n- Unusual lash loss\n- Discomfort or pain`,
      published: true,
      publishedAt: new Date("2024-02-18"),
    },
    {
      title: "Volume Lashes vs Mega Volume: Understanding the Difference",
      slug: "volume-vs-mega-volume-lashes",
      excerpt: "Learn the key differences between volume and mega volume lashes to choose the perfect level of drama.",
      tags: "volume, mega-volume, comparison",
      content: `When it comes to dramatic, full lashes, volume and mega volume techniques reign supreme.\n\n## What Are Volume Lashes?\nMultiple ultra-fine extensions (2-5) per natural lash using hand-made fans. Creates a fuller, fluffier appearance while remaining lightweight.\n\n## What Are Mega Volume Lashes?\n6-16 extensions per natural lash using extremely fine 0.03mm fibers. Maximum fullness and drama.\n\n## Key Differences\n- **Fullness:** Volume = noticeable fullness. Mega = maximum density.\n- **Extensions per lash:** Volume = 2-5. Mega = 6-16.\n- **Application time:** Volume = 2-3 hours. Mega = 3-4 hours.\n- **Price:** Mega is typically more expensive.\n\n## Who Should Choose Volume?\nThose wanting fullness without extreme drama, sparse natural lashes, everyday versatility.\n\n## Who Should Choose Mega Volume?\nBold lash lovers, special events, very sparse natural lashes, Instagram-worthy looks.\n\nBoth styles are comfortable when applied correctly. Book a consultation to find your perfect volume level!`,
      published: true,
      publishedAt: new Date("2024-02-25"),
    },
    {
      title: "Is Getting Lash Extensions Worth It? Honest Pros and Cons",
      slug: "are-lash-extensions-worth-it",
      excerpt: "Considering lash extensions but not sure if they're worth the investment? Here's an honest breakdown.",
      tags: "guide, cost, pros-cons",
      content: `Let's examine the honest pros and cons to help you decide.\n\n## THE PROS\n- **Wake Up Ready** — perfect lashes every day, no mascara\n- **Time Savings** — save 10-20 minutes each morning\n- **Waterproof Beauty** — swim, shower, cry without worry\n- **Confidence Boost** — look polished effortlessly\n- **Customizable** — from natural to dramatic\n- **Long-Lasting** — weeks of continuous beauty\n\n## THE CONS\n- **Cost** — initial sets + regular fills add up\n- **Time Commitment** — 2-3 hour initial appointment + fills\n- **Maintenance Required** — daily cleansing, careful product selection\n- **Sleeping Position** — may need to adjust\n- **Product Restrictions** — no oil-based products\n\n## The Verdict\nLash extensions are absolutely worth it for the right person. If you value convenience, consistently beautiful lashes, and are willing to invest in maintenance, they can be life-changing. Start with a trial set for a special occasion to experience the benefits firsthand!`,
      published: true,
      publishedAt: new Date("2024-03-05"),
    },
    {
      title: "How Often Should You Get Lash Fills? A Professional Guide",
      slug: "lash-fill-frequency-guide",
      excerpt: "Timing your lash fills correctly is crucial for maintaining full, beautiful lashes.",
      tags: "maintenance, fills, guide",
      content: `One of the most common questions: "How often should I get fills?"\n\n## The Standard Schedule\n**Every 2-3 weeks** is recommended for most clients. This maintains fullness and prevents needing a full new set.\n\n## Factors That Affect Your Schedule\n- **Natural Lash Cycle** — faster turnover = more frequent fills\n- **Aftercare Habits** — excellent care can stretch to 3-4 weeks\n- **Lash Style** — volume retains better than classic\n- **Lifestyle** — swimming, gym, sleeping position\n- **Hormones** — pregnancy, thyroid conditions affect retention\n\n## What Happens If You Wait Too Long?\n- **3-4 weeks:** Noticeable sparseness, longer fill appointment\n- **4-6 weeks:** May need a partial or full new set\n- **6+ weeks:** Definitely need a new set\n\n## Maximizing Time Between Fills\n- Optimize aftercare\n- Use a lash sealant\n- Avoid excessive touching\n- Stay hydrated\n- Manage stress\n\n## Our Recommendation\nEvery 2.5 to 3 weeks hits the sweet spot. Maintain good fullness, shorter appointments, and consistent results. Book a consultation to find your ideal timing!`,
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
