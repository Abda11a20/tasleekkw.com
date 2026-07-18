import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { keywords } from "@/config/seo";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} | تسليك مجاري الكويت 24 ساعة`,
  description: siteConfig.description,
  keywords: keywords,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.name} | تسليك مجاري الكويت 24 ساعة`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: "/ad-vertical.webp", width: 400, height: 534, alt: siteConfig.name }],
    locale: "ar_KW",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} | تسليك مجاري الكويت 24 ساعة`,
    description: siteConfig.description,
    images: ["/ad-vertical.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  telephone: siteConfig.phone,
  url: siteConfig.url,
  image: `${siteConfig.url}/ad-vertical.webp`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "KW",
    addressLocality: "Kuwait City",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday", "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  priceRange: "$$",
  areaServed: [
    { "@type": "AdministrativeArea", name: "محافظة العاصمة" },
    { "@type": "AdministrativeArea", name: "محافظة حولي" },
    { "@type": "AdministrativeArea", name: "محافظة الفروانية" },
    { "@type": "AdministrativeArea", name: "محافظة الأحمدي" },
    { "@type": "AdministrativeArea", name: "محافظة الجهراء" },
    { "@type": "AdministrativeArea", name: "محافظة مبارك الكبير" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "خدمات تسليك المجاري",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "تسليك مجاري" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "فني صحي" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "كشف تسريب المياه" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "تنكر مجاري" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "تسليك بواليع المطابخ والحمام" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "تنظيف جور ومناهيل" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "تصوير بيبات المجاري" } },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${cairo.className} antialiased`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
