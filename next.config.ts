import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Performance: compress output ──────────────────────────────────────────
  compress: true,

  // ─── Security & Caching Headers ────────────────────────────────────────────
  async headers() {
    return [
      // Static assets — aggressive caching
      {
        source: "/:path*.webp",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.ico",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // All routes — security headers
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Google Tag Manager, Analytics, Ads
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' www.googletagmanager.com googleads.g.doubleclick.net www.google.com",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com data:",
              // Google Ads pixels + analytics
              "img-src 'self' data: blob: www.googletagmanager.com www.google.com googleads.g.doubleclick.net",
              // GA4 + Ads data endpoints
              "connect-src 'self' www.google-analytics.com www.googletagmanager.com analytics.google.com googleads.g.doubleclick.net",
              "frame-src googleads.g.doubleclick.net www.google.com",
            ].join("; "),
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // ─── Image Optimization ────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 64, 128, 256],
  },

  // ─── Build optimizations ───────────────────────────────────────────────────
  poweredByHeader: false, // Remove X-Powered-By header (security + minor perf)
};

export default nextConfig;
