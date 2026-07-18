import { Phone, MessageCircle, Clock, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function ContactSection() {
  return (
    <Section id="contact" variant="dark-contact">
      {/* Decorative radial gradients — standardizing on CSS variable tokens */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, var(--teal) 0%, transparent 50%), radial-gradient(circle at 75% 75%, var(--copper) 0%, transparent 50%)",
        }}
      />

      <Container className="max-w-3xl relative z-10">
        <div className="flex flex-col items-center text-center w-full">
        {/* Badge — inline, responsive, using token-based opacity colors */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 font-bold text-sm bg-primary/20 border border-primary/50 text-primary-light">
          <Clock size={16} />
          <span>متاحون الآن — 24 ساعة / 7 أيام</span>
        </div>

        {/* Section Heading */}
        <h2
          className="font-black mb-3 text-white"
          style={{ fontSize: "clamp(1.8rem,5vw,2.8rem)" }}
        >
          تواصل معنا الآن
        </h2>
        <p className="mb-3 text-lg text-white/80">
          مشكلتك حتُحل في نفس اليوم — نصلك في أسرع وقت
        </p>

        {/* Stars Rating */}
        <div className="flex justify-center gap-1 mb-8">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={20} fill="#F59E0B" color="#F59E0B" />
          ))}
          <span className="text-white/70 text-sm mr-2 self-center">خدمة موثوقة ومضمونة</span>
        </div>

        {/* Phone Number Display Box — unified dark-glass card and standardized text size */}
        <Card variant="dark-glass" className="p-6 mb-6 max-w-xl mx-auto">
          <p className="text-white/60 text-sm mb-1">رقم الهاتف والواتساب</p>
          <p
            className="font-black text-white text-3xl sm:text-4xl lg:text-5xl tracking-wide"
            style={{ letterSpacing: "0.05em", direction: "ltr" }}
          >
            {siteConfig.phone}
          </p>
        </Card>

        {/* CTA Buttons — standardized sizing */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            href={`tel:${siteConfig.phone}`}
            variant="primary"
            className="w-full sm:w-auto"
            id="cta-call-contact"
          >
            <Phone size={22} />
            اتصل بنا الآن
          </Button>
          <Button
            href={`https://wa.me/${siteConfig.whatsapp}?text=مرحباً، أريد الاستفسار عن خدمة تسليك المجاري`}
            variant="whatsapp"
            className="w-full sm:w-auto"
            id="cta-whatsapp-contact"
          >
            <MessageCircle size={22} />
            راسلنا على واتساب
          </Button>
        </div>
        </div>
      </Container>
    </Section>
  );
}
