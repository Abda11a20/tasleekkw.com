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
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  // ─── Title & Description ────────────────────────────────────────────────────
  title: {
    default: "فني تسليك مجاري الكويت | خدمة 24 ساعة بأحدث المكائن - تسليككو",
    template: "%s | تسليك مجاري الكويت",
  },
  description:
    "أفضل فني تسليك مجاري في الكويت، نصلك خلال 30 دقيقة. حل انسداد البالوعات، تنظيف مجاري، كشف تسريبات المياه، وخدمات صحية شاملة في جميع مناطق الكويت بأسعار تنافسية. اتصل الآن 69682100.",

  // ─── Keywords ───────────────────────────────────────────────────────────────
  keywords: keywords,

  // ─── Canonical ──────────────────────────────────────────────────────────────
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "ar-KW": siteConfig.url,
    },
  },

  // ─── Open Graph (WhatsApp / Facebook / Twitter previews) ────────────────────
  openGraph: {
    title: "فني تسليك مجاري الكويت | خدمة 24 ساعة - اتصل 69682100",
    description:
      "أفضل فني تسليك مجاري في الكويت، نصلك خلال 30 دقيقة. تسليك بواليع، كشف تسريبات، خدمات صحية في جميع مناطق الكويت. اتصل الآن.",
    url: siteConfig.url,
    siteName: "تسليك مجاري الكويت",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "تسليك مجاري الكويت - خدمة 24 ساعة في جميع المناطق",
        type: "image/webp",
      },
      {
        url: "/ad-vertical.webp",
        width: 400,
        height: 534,
        alt: "فني تسليك مجاري الكويت",
        type: "image/webp",
      },
    ],
    locale: "ar_KW",
    type: "website",
  },

  // ─── Twitter / X Card ───────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "فني تسليك مجاري الكويت | خدمة 24 ساعة",
    description:
      "أفضل فني تسليك مجاري في الكويت، نصلك خلال 30 دقيقة. تسليك بواليع، كشف تسريبات. اتصل 69682100.",
    images: ["/og-image.webp"],
  },

  // ─── Icons / Favicon ────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },

  // ─── Robots ─────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ─── Google Search Console Verification ─────────────────────────────────────
  verification: {
    google: "446c1af9fa55d089",
  },

  // ─── Author / Publisher ─────────────────────────────────────────────────────
  authors: [{ name: "تسليك مجاري الكويت", url: siteConfig.url }],
  creator: "تسليك مجاري الكويت",
  publisher: "تسليك مجاري الكويت",

  // ─── Category ───────────────────────────────────────────────────────────────
  category: "خدمات منزلية",
};

// ─── JSON-LD Structured Data ───────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#business`,
  name: "تسليك مجاري الكويت",
  alternateName: ["تسليككو", "Tasleeq Kuwait", "tasleekkw"],
  description:
    "أفضل فني تسليك مجاري في الكويت، نصلك خلال 30 دقيقة. حل انسداد البالوعات، تنظيف مجاري، كشف تسريبات المياه في جميع مناطق الكويت.",
  url: siteConfig.url,
  telephone: `+965${siteConfig.phone}`,
  image: `${siteConfig.url}/og-image.webp`,
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/og-image.webp`,
    width: 1200,
    height: 630,
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "KW",
    addressLocality: "Kuwait City",
    addressRegion: "الكويت",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 29.3759,
    longitude: 47.9774,
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
  currenciesAccepted: "KWD",
  paymentAccepted: "Cash",
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
  sameAs: [
    `https://wa.me/${siteConfig.whatsapp}`,
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e3a5f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="تسليك مجاري" />
        {/* Preconnect to external resources for speed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`${cairo.className} antialiased`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
