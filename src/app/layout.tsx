import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { generateLocalBusinessJsonLd } from "@/lib/seo";
import { I18nProvider } from "@/lib/i18n";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "eyelash extensions",
    "lash extensions",
    "volume lashes",
    "classic lashes",
    "hybrid lashes",
    "mega volume lashes",
    "lash lift",
    "beauty salon",
    "Jeddah",
    "premium lash extensions",
    "lash extension aftercare",
    "lash fills",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Premium Eyelash Extensions`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ["/og-image.jpg"],
    creator: "@lashstudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = generateLocalBusinessJsonLd();

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${notoArabic.variable} font-sans antialiased`}
      >
        <I18nProvider>
          {children}
        </I18nProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
