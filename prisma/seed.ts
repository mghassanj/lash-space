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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
