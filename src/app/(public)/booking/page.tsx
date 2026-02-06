export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { BookingClient } from "./booking-client";

export const metadata = {
  title: "Book Appointment - LASH SPACE",
  description: "Book your lash extension appointment online. Choose from classic, hybrid, volume, and mega volume lash sets.",
};

async function getServices() {
  const services = await prisma.service.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return services.map((service) => ({
    id: service.id,
    name: service.name,
    nameAr: service.nameAr,
    description: service.description,
    descriptionAr: service.descriptionAr,
    duration: service.duration,
    price: service.price,
    category: service.category,
    isAddOn: service.isAddOn,
    isRetouch: service.isRetouch,
  }));
}

export default async function BookingPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-[#E8E8DC] py-12">
      <div className="container mx-auto px-4">
        {/* Header is rendered inside BookingClient for i18n support */}

        <BookingClient services={services} />

        {/* Booking Policy */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-2 text-center">
              سياسة الحجز
            </h2>
            <p className="text-center text-sm text-muted-foreground mb-6">Booking Policy</p>
            <ul className="space-y-4 text-[#1A1A1A]" dir="rtl">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#9C8974]">•</span>
                <span>لتأكيد الحجز دفع عربون <strong>٥٠ ريال</strong> غير مستردة في حال الإلغاء قبل الموعد بيوم أو في نفس اليوم</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#9C8974]">•</span>
                <span>الحضور في الموعد وفي حال التأخر لـ <strong>١٥ دقيقة</strong> سيتم إلغاء الموعد تلقائيًا</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#9C8974]">•</span>
                <span>الدفع <strong>كاش</strong> أو عن طريق <strong>STC PAY</strong> فقط</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#9C8974]">•</span>
                <span>مدة جلسة تركيب الرموش الشهرية <strong>ساعتين إلى ثلاث ساعات</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#9C8974]">•</span>
                <span>مدة تركيب الرموش الأسبوعية من <strong>٣٠ إلى ٤٥ دقيقة</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#9C8974]">•</span>
                <span>ممنوع اصطحاب الأطفال أو المرافقين وفي حال الاضطرار الرجاء الإبلاغ</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#9C8974]">•</span>
                <span>قبل الموعد اتباع إرشادات عناية ما قبل التركيب</span>
              </li>
            </ul>
          </div>

          {/* Pre-Care Instructions */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mt-6">
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-2 text-center">
              عناية ما قبل التركيب
            </h2>
            <p className="text-center text-sm text-muted-foreground mb-6">Pre-Care Instructions</p>
            <p className="text-center text-muted-foreground mb-6" dir="rtl">
              تأكدي لما تحجزي موعد الرموش تتجنبي كل من الآتي:
            </p>
            <ul className="space-y-4 text-[#1A1A1A]" dir="rtl">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#9C8974]">✕</span>
                <span>المكياج بأنواعه خصوصًا حول منطقة العين — ماسكارا، كونسيلر، كحل.. إلخ</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#9C8974]">✕</span>
                <span>منتجات العناية مثل المرطبات وواقي الشمس — لأنها صعب تطلع من الرموش وتضعف أداء الغراء فبالتالي تساقط رموش أسرع</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#9C8974]">✕</span>
                <span>تركيب الرموش اليومية أو الأسبوعية</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-[#9C8974]">✕</span>
                <span>شرب القهوة أو أنواع المنبهات بشكل عام</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-[#E8E8DC]/50 rounded-lg" dir="rtl">
              <p className="text-[#9C8974] font-medium">✓ تأكدي قبل لا تجي موعد الرموش تحطي قطرة مرطبة وتشيلي عدساتك</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
