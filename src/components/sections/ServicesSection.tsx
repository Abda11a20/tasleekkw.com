import { services } from "@/data/services";
import InfoCard from "@/components/ui/InfoCard";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export default function ServicesSection() {
  return (
    <Section id="services" variant="light">
      <Container>
        {/* Unified Section Title */}
        <SectionTitle
          title="خدماتنا المتخصصة"
          subtitle="نقدم جميع خدمات السباكة والمجاري بأحدث المعدات وأيدي فنية متخصصة"
          badge="ما نقدمه لك"
          badgeColor="primary"
        />

        {/* Services Grid — 2 cols mobile, 3 cols tablet+, uniform icon cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service) => (
            <InfoCard key={service.id} item={service} variant="service" />
          ))}
        </div>
      </Container>

      {/* Wave divider transitioning to WhyChooseUs (dark petroleum) */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 sm:h-12" aria-hidden="true">
          <path d="M0,40 C360,0 1080,80 1440,20 L1440,60 L0,60 Z" style={{ fill: "var(--petroleum)" }} />
        </svg>
      </div>
    </Section>
  );
}
