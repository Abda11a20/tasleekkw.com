import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "اتصل بنا",
      desc: "تواصل معنا عبر الهاتف أو الواتساب في أي وقت — خدمة 24 ساعة طوال أيام الأسبوع",
      icon: "📞",
    },
    {
      number: "02",
      title: "نوصل خلال 30 دقيقة",
      desc: "فريقنا المتخصص يصل إليك في أسرع وقت مع جميع المعدات اللازمة",
      icon: "🚗",
    },
    {
      number: "03",
      title: "نحل المشكلة",
      desc: "نشخص المشكلة ونحلها بالكامل مع ضمان على العمل ورضاك التام",
      icon: "✅",
    },
  ];

  const stepBackgrounds = [
    "bg-gradient-to-br from-secondary to-secondary-light",
    "bg-gradient-to-br from-primary to-primary-dark",
    "bg-gradient-to-br from-accent to-accent-light",
  ];

  return (
    <Section id="how-it-works" variant="white">
      <Container>
        {/* Centralized Section Title */}
        <SectionTitle
          title="كيف نعمل؟"
          subtitle="3 خطوات بسيطة وسريعة لحل مشكلتك"
          badge="ببساطة وسرعة"
          badgeColor="primary"
        />

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) — using token colors */}
          <div
            className="hidden md:block absolute top-16 right-[calc(16.666%+2rem)] left-[calc(16.666%+2rem)] h-0.5"
            style={{
              background: "linear-gradient(90deg, var(--teal), var(--copper))",
              zIndex: 0,
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                {/* Icon circle */}
                <div
                  className={`relative w-28 h-28 rounded-full flex items-center justify-center mb-5 shadow-xl border-4 border-white ${stepBackgrounds[idx]}`}
                  style={{
                    boxShadow: "0 8px 30px rgba(15,59,77,0.2)",
                  }}
                  aria-hidden="true"
                >
                  <span className="text-4xl">{step.icon}</span>
                  {/* Step number badge — using token color */}
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white bg-secondary-dark">
                    {idx + 1}
                  </span>
                </div>

                <h3 className="font-bold text-lg mb-2 text-text-dark">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed max-w-xs text-text-muted">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA — Standardized layout and unified button size */}
        <div className="mt-8 text-center">
          <Button
            href={`tel:${siteConfig.phone}`}
            variant="primary"
            className="w-full sm:w-auto max-w-xs"
            id="cta-call-how-it-works"
            aria-label="اتصل بنا الآن لتسليك المجاري"
          >
            اتصل الآن — {siteConfig.phone}
          </Button>
        </div>
      </Container>

      {/* Wave divider transitioning to FAQ (light gray #f5fafb) */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 sm:h-12" aria-hidden="true">
          <path d="M0,40 C360,0 1080,80 1440,20 L1440,60 L0,60 Z" style={{ fill: "var(--bg-light)" }} />
        </svg>
      </div>
    </Section>
  );
}
