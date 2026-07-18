import { Phone, MessageCircle, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  const badges = [
    "خدمة سريعة",
    "أحدث المعدات",
    "أقل الأسعار",
    "ضمان على العمل",
  ];

  return (
    <Section
      variant="dark-hero"
      spacing="hero"
      id="hero"
      className="hero-section-padding"
    >
      {/* Decorative blobs */}
      <div className="absolute top-24 left-16 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none bg-accent" />
      <div className="absolute bottom-24 right-16 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none bg-primary" />

      <Container className="relative z-10 lg:py-24">
        {/*
          FIX: text-center + flex flex-col items-center ensures all content
          is horizontally centered on every viewport — overrides the RTL
          browser default of text-align:right which was pinning everything
          to the right edge with empty space on the left.
        */}
        <div className="flex flex-col items-center text-center w-full">

          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 font-semibold text-[11px] sm:text-sm bg-primary/15 border border-primary/40 text-primary-light">
            <span className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse bg-primary-light" aria-hidden="true" />
            خدمة 24 ساعة / 7 أيام — الكويت
          </div>

          {/* H1 Title */}
          <h1 className="font-black mb-4 text-white text-2xl sm:text-4xl lg:text-5xl max-w-xl">
            تسليك مجاري وبواليع{" "}
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              بالكويت
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-white/80 leading-relaxed mb-6 text-sm sm:text-lg max-w-lg">
            {siteConfig.tagline}
          </p>

          {/* Checkmarks — centered list */}
          <ul className="flex flex-col gap-3 mb-8 w-full max-w-xs sm:max-w-sm">
            {badges.map((b) => (
              <li key={b} className="flex items-center justify-center gap-2.5 text-white/90 font-medium text-xs sm:text-base">
                <CheckCircle2 size={18} className="flex-shrink-0 text-accent" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Button
              href={`tel:${siteConfig.phone}`}
              variant="primary"
              id="cta-call-hero"
              className="w-full sm:w-auto"
            >
              <Phone size={20} />
              اتصل الآن — {siteConfig.phone}
            </Button>
            <Button
              href={`https://wa.me/${siteConfig.whatsapp}?text=مرحباً، أريد الاستفسار عن خدمة تسليك المجاري`}
              variant="whatsapp"
              id="cta-whatsapp-hero"
              className="w-full sm:w-auto"
            >
              <MessageCircle size={20} />
              راسلنا على واتساب
            </Button>
          </div>
        </div>
      </Container>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 sm:h-12" aria-hidden="true">
          <path d="M0,40 C360,0 1080,80 1440,20 L1440,60 L0,60 Z" className="fill-surface-muted" />
        </svg>
      </div>
    </Section>
  );
}
