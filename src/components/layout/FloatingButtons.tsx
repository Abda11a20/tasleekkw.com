"use client";
 
import { useState, useEffect } from "react";
import { Phone, MessageCircle, ChevronUp } from "lucide-react";
import { siteConfig } from "@/config/site";
import Button from "@/components/ui/Button";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* WhatsApp + Call: Stacked vertically on the bottom LEFT */}
      <div
        className="fixed bottom-6 left-6 z-50 flex flex-col gap-3.5"
        style={{ pointerEvents: "auto" }}
        role="group"
        aria-label="أزرار التواصل السريع"
      >
        {/* WhatsApp — Glassmorphism themed */}
        <Button
          href={`https://wa.me/${siteConfig.whatsapp}?text=مرحباً، أريد الاستفسار عن خدمة تسليك المجاري`}
          target="_blank"
          rel="noopener noreferrer"
          variant="floating-whatsapp"
          aria-label="تواصل عبر واتساب"
        >
          <MessageCircle size={26} color="white" fill="white" />
        </Button>

        {/* Call — Glassmorphism themed */}
        <Button
          href={`tel:${siteConfig.phone}`}
          variant="floating-call"
          aria-label={`اتصال بنا هاتفياً: ${siteConfig.phone}`}
        >
          <Phone size={24} color="white" />
        </Button>
      </div>

      {/* Scroll to Top: Positioned on the bottom RIGHT — fixed to float outside document flow */}
      <Button
        onClick={scrollToTop}
        variant="scroll-to-top"
        className="fixed bottom-6 right-6 z-50 transition-all duration-300"
        aria-label="العودة لأعلى الصفحة"
        style={{
          background: showTop ? "rgba(15,59,77,0.85)" : "transparent",
          border: showTop ? "1.5px solid rgba(63,169,184,0.4)" : "none",
          color: "#3FA9B8",
          pointerEvents: showTop ? "auto" : "none",
          opacity: showTop ? 0.95 : 0,
          transform: showTop ? "translateY(0) scale(1)" : "translateY(15px) scale(0.8)",
        }}
      >
        <ChevronUp size={24} strokeWidth={2.5} />
      </Button>
    </>
  );
}
