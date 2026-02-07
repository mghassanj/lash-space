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

            {/* Booking & Confirmation */}
            <div className="mb-8" dir="rtl">
              <h3 className="text-lg font-bold text-[#9C8974] mb-3 flex items-center gap-2">📅 الحجز والتأكيد</h3>
              <ul className="space-y-3 text-[#1A1A1A]">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-[#9C8974]">•</span>
                  <span>الحجز عبر الموقع الإلكتروني قبل <strong>48 ساعة</strong> على الأقل</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-[#9C8974]">•</span>
                  <span>يتم تأكيد الموعد خلال <strong>24 ساعة</strong> من الطلب</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-[#9C8974]">•</span>
                  <span>ستصلك رسالة تذكيرية قبل الموعد بـ 24 ساعة — يرجى الرد لتأكيد حضورك</span>
                </li>
              </ul>
            </div>

            {/* Payment */}
            <div className="mb-8" dir="rtl">
              <h3 className="text-lg font-bold text-[#9C8974] mb-3 flex items-center gap-2">💳 الدفع</h3>
              <ul className="space-y-3 text-[#1A1A1A]">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-[#9C8974]">•</span>
                  <span>دفعة تأمينية <strong>50 ريال</strong> عند الحجز (تُخصم من إجمالي الخدمة)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-[#9C8974]">•</span>
                  <span>طرق الدفع: <strong>نقداً</strong> أو <strong>تحويل بنكي</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-[#9C8974]">•</span>
                  <span>الدفعة غير مستردة في حال الإلغاء المتأخر أو عدم الحضور</span>
                </li>
              </ul>
            </div>

            {/* Cancellation & Rescheduling */}
            <div className="mb-8" dir="rtl">
              <h3 className="text-lg font-bold text-[#9C8974] mb-3 flex items-center gap-2">❌ الإلغاء وإعادة الجدولة</h3>
              <ul className="space-y-3 text-[#1A1A1A]">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-[#9C8974]">•</span>
                  <span>الإلغاء قبل <strong>24 ساعة</strong>: استرداد الدفعة أو تحويلها لموعد آخر</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-[#9C8974]">•</span>
                  <span>الإلغاء في نفس اليوم أو عدم الحضور: فقدان الدفعة</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-[#9C8974]">•</span>
                  <span>الإلغاء المتكرر (أكثر من مرتين): قد يُطلب دفع كامل قيمة الخدمة مقدماً</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-[#9C8974]">•</span>
                  <span>إعادة الجدولة <strong>مرة واحدة مجاناً</strong> (قبل 24 ساعة، خلال 30 يوم من الموعد الأصلي)</span>
                </li>
              </ul>
            </div>

            {/* Attendance */}
            <div className="mb-8" dir="rtl">
              <h3 className="text-lg font-bold text-[#9C8974] mb-3 flex items-center gap-2">⏰ الحضور</h3>
              <ul className="space-y-3 text-[#1A1A1A]">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-[#9C8974]">•</span>
                  <span>يرجى الحضور قبل الموعد بـ <strong>5 دقائق</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-[#9C8974]">•</span>
                  <span>التأخير أكثر من <strong>15 دقيقة</strong> = إلغاء تلقائي وفقدان الدفعة</span>
                </li>
              </ul>
            </div>

            {/* Specialist Cancellation */}
            <div className="mb-8" dir="rtl">
              <h3 className="text-lg font-bold text-[#9C8974] mb-3 flex items-center gap-2">🔄 إلغاء من قبل الأخصائية</h3>
              <ul className="space-y-3 text-[#1A1A1A]">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-[#9C8974]">•</span>
                  <span>في حالة الطوارئ ستُشعرين فوراً مع إعادة جدولة أو استرداد كامل</span>
                </li>
              </ul>
            </div>

            {/* Agreement */}
            <div className="mt-6 p-4 bg-[#E8E8DC]/50 rounded-lg" dir="rtl">
              <p className="text-[#9C8974] font-medium text-center">✅ بحجز الموعد، فإنك توافقين على شروط وسياسات الخدمة. يرجى إبلاغنا بأي حساسية أو مشاكل صحية في العين قبل الموعد.</p>
            </div>
          </div>

          {/* Pre-Care Instructions removed — merged into booking policy above */}
        </div>
      </div>
    </div>
  );
}
