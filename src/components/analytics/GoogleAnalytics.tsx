"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsId = process.env.NEXT_PUBLIC_GADS_ID; // Google Ads Conversion ID (AW-XXXXXXXXXX)

  // At least one tracking ID must be present
  if (!gaId && !adsId) return null;

  // Use GA4 ID as the primary gtag config, fallback to Ads ID
  const primaryId = gaId || adsId!;

  return (
    <>
      {/* Google Tag Manager / gtag.js — loaded after interaction to not block render */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          ${gaId ? `gtag('config', '${gaId}', { page_path: window.location.pathname, send_page_view: true });` : ""}
          ${adsId ? `gtag('config', '${adsId}');` : ""}
        `}
      </Script>
    </>
  );
}
