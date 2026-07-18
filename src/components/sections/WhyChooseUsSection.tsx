import { features } from "@/data/whyChooseUs";
import Image from "next/image";
import { Zap, Clock, BadgeDollarSign, UserCheck, Cpu, ShieldCheck } from "lucide-react";
import type { Feature } from "@/types";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
 
const featureIcons = {
  Zap,
  Clock,
  BadgeDollarSign,
  UserCheck,
  Cpu,
  ShieldCheck,
};
 
type FeatureIconName = keyof typeof featureIcons;
 
function FeatureItem({ feature }: { feature: Feature }) {
  const IconComponent = featureIcons[feature.icon as FeatureIconName];
 
  return (
    <Card
      variant="dark-glass"
      hoverable={true}
      className="flex items-start gap-4 p-4"
    >
      {/* Icon wrapper — aligned right in RTL, using theme gradients */}
      <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary-light/25">
        {IconComponent ? (
          <IconComponent size={22} strokeWidth={1.8} className="text-primary-light" />
        ) : (
          <span className="text-primary-light text-2xl">●</span>
        )}
      </div>
      
      {/* Text wrapper */}
      <div className="flex-1">
        <h3 className="font-bold text-white text-sm mb-2">{feature.title}</h3>
        <p className="text-white/60 text-xs leading-relaxed">{feature.desc}</p>
      </div>
    </Card>
  );
}

export default function WhyChooseUsSection() {
  return (
    <Section id="why-us" variant="dark-why-us">

      {/* Decorative blobs */}
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none bg-accent"
      />
      <div
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none bg-primary"
      />

      <Container className="relative z-10">
        {/* Centralized Section Title */}
        <SectionTitle
          title="لماذا تختار شركتنا؟"
          subtitle="خبرة + جودة + سرعة + أسعار منافسة = رضاك التام"
          badge="ميزتنا التنافسية"
          badgeColor="accent"
          theme="dark"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Feature Items — RIGHT on desktop (RTL primary focus) */}
          <div className="order-1 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feature) => (
              <FeatureItem key={feature.id} feature={feature} />
            ))}
          </div>

          {/* Ad Vertical Image — LEFT on desktop (secondary visual) — static stable wrapper */}
          <div className="flex justify-center order-2 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm border-2 border-accent/30 bg-secondary/20">
              <Image
                src="/ad-vertical.webp"
                alt="شركة تسليك مجاري الكويت — خبرة وجودة وكفالة"
                width={400}
                height={534}
                className="w-full h-auto object-cover"
                sizes="(max-width: 640px) 90vw, 400px"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Wave divider transitioning to HowItWorks (white) */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 sm:h-12" aria-hidden="true">
          <path d="M0,40 C360,0 1080,80 1440,20 L1440,60 L0,60 Z" style={{ fill: "var(--white)" }} />
        </svg>
      </div>
    </Section>
  );
}
