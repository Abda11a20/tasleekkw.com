"use client";

import { useState } from "react";
import { areaGroups } from "@/data/areas";
import AreaButton from "@/components/ui/AreaButton";
import { MapPin, ChevronDown } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

export default function AreasSection() {
  const [openGov, setOpenGov] = useState<string | null>(areaGroups[0].governorate);

  return (
    <Section id="areas" variant="light">
      <Container>
        {/* Centralized Section Title */}
        <SectionTitle
          title="مناطق الخدمة"
          subtitle="نغطي جميع محافظات ومناطق الكويت"
          badge="نصلك أينما كنت"
          badgeColor="primary"
        />

        {/* Accordion by governorate - 2 Columns Grid on desktop (md+), 1 Column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {areaGroups.map((group) => {
            const isOpen = openGov === group.governorate;
            return (
              <Card
                key={group.governorate}
                variant={isOpen ? "accordion-active" : "accordion-inactive"}
                className="self-start"
              >
                {/* Accordion Header */}
                <button
                  className={`w-full flex items-center justify-between px-5 py-4 font-bold text-base cursor-pointer transition-colors border-none min-h-[56px] ${
                    isOpen ? "text-secondary bg-accent/6" : "text-text-dark bg-transparent"
                  }`}
                  onClick={() =>
                    setOpenGov(isOpen ? null : group.governorate)
                  }
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2">
                    <MapPin
                      size={18}
                      className={isOpen ? "text-accent" : "text-primary"}
                    />
                    <span>محافظة {group.governorate}</span>
                    <span className="text-xs font-normal px-2 py-0.5 rounded-full mr-2 bg-secondary/8 text-text-muted">
                      {group.areas.length} منطقة
                    </span>
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 text-accent ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* Areas - flex wrap centered on mobile, grid on desktop (md+) */}
                {isOpen && (
                  <div className="px-5 pb-5">
                    <div className="flex flex-wrap justify-center md:grid md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {group.areas.map((area) => (
                        <AreaButton key={area} area={area} />
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </Container>

      {/* Wave divider transitioning to Contact (dark petroleum) */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 sm:h-12" aria-hidden="true">
          <path d="M0,40 C360,0 1080,80 1440,20 L1440,60 L0,60 Z" style={{ fill: "var(--petroleum)" }} />
        </svg>
      </div>
    </Section>
  );
}
