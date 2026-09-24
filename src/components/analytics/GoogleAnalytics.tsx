"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsId = process.env.NEXT_PUBLIC_GADS_ID || process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const callConversion = process.env.NEXT_PUBLIC_GADS_CALL_CONVERSION;
  const waConversion = process.env.NEXT_PUBLIC_GADS_WA_CONVERSION;

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href") || "";

      // Phone Call Click tracking
      if (href.startsWith("tel:")) {
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "contact_call",
            event_category: "conversion",
            event_label: href,
          });
        }
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "generate_lead", {
            event_category: "contact",
            event_label: "phone_call",
            value: 1,
          });
          if (callConversion) {
            window.gtag("event", "conversion", {
              send_to: callConversion,
            });
          }
        }
      }

      // WhatsApp Click tracking
      if (href.includes("wa.me") || href.includes("whatsapp.com")) {
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "contact_whatsapp",
            event_category: "conversion",
            event_label: href,
          });
        }
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "generate_lead", {
            event_category: "contact",
            event_label: "whatsapp_message",
            value: 1,
          });
          if (waConversion) {
            window.gtag("event", "conversion", {
              send_to: waConversion,
            });
          }
        }
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => document.removeEventListener("click", handleGlobalClick, { capture: true });
  }, [callConversion, waConversion]);

  // If no tracking ID is provided at all, don't output tracking scripts
  if (!gaId && !adsId && !gtmId) return null;

  return (
    <>
      {/* ─── Google Tag Manager (GTM) ─── */}
      {gtmId && (
        <>
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {/* ─── Google Analytics (GA4) & Google Ads (gtag.js) ─── */}
      {(gaId || adsId) && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId || adsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              ${gaId ? `gtag('config', '${gaId}', { page_path: window.location.pathname, send_page_view: true });` : ""}
              ${adsId ? `gtag('config', '${adsId}');` : ""}
            `}
          </Script>
        </>
      )}
    </>
  );
}
