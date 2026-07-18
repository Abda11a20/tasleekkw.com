import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import Hero from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FAQSection from "@/components/sections/FAQSection";
import AreasSection from "@/components/sections/AreasSection";
import ContactSection from "@/components/sections/ContactSection";


export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="pb-24 sm:pb-0">
        {/* 1 */ }<Hero />
        {/* 2 */ }<ServicesSection />
        {/* 3 */ }<WhyChooseUsSection />
        {/* 4 */ }<HowItWorksSection />
        {/* 5 — Testimonials: skipped until real reviews received */ }
        {/* 6 */ }<FAQSection />
        {/* 7 */ }<AreasSection />
        {/* 8 */ }<ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
