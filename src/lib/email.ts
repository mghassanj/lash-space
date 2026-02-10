import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface BookingNotificationData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  serviceName: string;
  serviceNameAr: string;
  date: Date;
  duration: number;
  price: number;
  allergies?: string | null;
  dateOfBirth?: string | null;
  notes?: string | null;
}

export async function sendBookingNotification(data: BookingNotificationData): Promise<boolean> {
  // If Resend API key is not configured, log and skip
  if (!resend || !process.env.RESEND_API_KEY) {
    console.log("📧 Email notification skipped (RESEND_API_KEY not configured)");
    console.log("Booking details:", {
      customer: data.customerName,
      service: data.serviceName,
      date: data.date.toLocaleString("ar-SA"),
      phone: data.customerPhone,
    });
    return false;
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL || "lashspace.sa@gmail.com";
  const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

  try {
    const formattedDate = new Intl.DateTimeFormat("ar-SA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(data.date);

    await resend.emails.send({
      from: fromEmail,
      to: notificationEmail,
      subject: `🌟 حجز جديد - ${data.customerName}`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f5f5f5;
              padding: 20px;
              direction: rtl;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #9C8974 0%, #898A73 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: bold;
            }
            .content {
              padding: 30px;
            }
            .info-row {
              display: flex;
              padding: 15px 0;
              border-bottom: 1px solid #E8E8DC;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .info-label {
              font-weight: bold;
              color: #898A73;
              width: 140px;
              flex-shrink: 0;
            }
            .info-value {
              color: #1A1A1A;
            }
            .highlight {
              background-color: #E8E8DC;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              text-align: center;
            }
            .highlight strong {
              font-size: 24px;
              color: #9C8974;
              display: block;
              margin-bottom: 5px;
            }
            .footer {
              background-color: #1A1A1A;
              color: #BBBAB3;
              padding: 20px;
              text-align: center;
              font-size: 14px;
            }
            .badge {
              display: inline-block;
              background-color: #9C8974;
              color: white;
              padding: 5px 12px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ حجز جديد في لاش سبيس</h1>
            </div>
            
            <div class="content">
              <div class="highlight">
                <strong>${data.serviceName}</strong>
                <span class="badge">حجز جديد</span>
              </div>

              <div class="info-row">
                <div class="info-label">👤 اسم العميلة:</div>
                <div class="info-value">${data.customerName}</div>
              </div>

              <div class="info-row">
                <div class="info-label">📱 رقم الجوال:</div>
                <div class="info-value"><a href="tel:${data.customerPhone}" style="color: #9C8974; text-decoration: none;">${data.customerPhone}</a></div>
              </div>

              ${
                data.customerEmail
                  ? `
              <div class="info-row">
                <div class="info-label">📧 البريد الإلكتروني:</div>
                <div class="info-value"><a href="mailto:${data.customerEmail}" style="color: #9C8974; text-decoration: none;">${data.customerEmail}</a></div>
              </div>
              `
                  : ""
              }

              <div class="info-row">
                <div class="info-label">📅 التاريخ والوقت:</div>
                <div class="info-value">${formattedDate}</div>
              </div>

              <div class="info-row">
                <div class="info-label">⏱️ المدة:</div>
                <div class="info-value">${data.duration} دقيقة</div>
              </div>

              <div class="info-row">
                <div class="info-label">💰 السعر:</div>
                <div class="info-value">${data.price} ر.س</div>
              </div>

              ${
                data.dateOfBirth
                  ? `
              <div class="info-row">
                <div class="info-label">🎂 تاريخ الميلاد:</div>
                <div class="info-value">${data.dateOfBirth}</div>
              </div>
              `
                  : ""
              }

              ${
                data.allergies
                  ? `
              <div class="info-row">
                <div class="info-label">⚠️ الحساسية:</div>
                <div class="info-value" style="color: #d9534f;">${data.allergies}</div>
              </div>
              `
                  : ""
              }

              ${
                data.notes
                  ? `
              <div class="info-row">
                <div class="info-label">📝 ملاحظات:</div>
                <div class="info-value">${data.notes}</div>
              </div>
              `
                  : ""
              }
            </div>

            <div class="footer">
              <p style="margin: 0;">LASH SPACE | لاش سبيس</p>
              <p style="margin: 5px 0 0 0;">جدة، المملكة العربية السعودية</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("✅ Booking notification email sent successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to send booking notification email:", error);
    return false;
  }
}
