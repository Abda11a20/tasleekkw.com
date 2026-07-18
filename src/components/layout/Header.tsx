"use client";
 
import Link from "next/link";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { navLinks } from "@/config/navigation";
import { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
 
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
 
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "shadow-2xl"
          : ""
      }`}
      style={{
        background: isScrolled
          ? "rgba(15,59,77,0.97)"
          : "rgba(15,59,77,0.95)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo / Name */}
          <Link href="/" className="flex flex-col leading-tight group">
            <span
              className="font-black text-lg sm:text-xl tracking-tight transition-colors"
              style={{ color: "#fff" }}
            >
              تسليك مجاري
            </span>
            <span
              className="font-bold text-sm sm:text-base"
              style={{ color: "#3FA9B8" }}
            >
              الكويت 🇰🇼
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white font-medium text-sm transition-colors duration-200 hover:underline underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            {/* WhatsApp — circular */}
            <Button
              href={`https://wa.me/${siteConfig.whatsapp}`}
              variant="circle-whatsapp"
              className="hidden sm:flex"
              aria-label="تواصل عبر واتساب"
            >
              <MessageCircle size={20} />
            </Button>
 
            {/* Call — circular */}
            <Button
              href={`tel:${siteConfig.phone}`}
              variant="circle-call"
              aria-label={`اتصل بنا: ${siteConfig.phone}`}
            >
              <Phone size={20} />
            </Button>
 
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white p-2 rounded-full transition-colors flex items-center justify-center"
              style={{ height: 48, width: 48 }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="القائمة"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
 
        {/* Mobile Nav */}
        {menuOpen && (
          <div
            id="mobile-nav"
            className="md:hidden border-t py-4"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 px-4 text-white/90 font-semibold text-base border-b transition-colors hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}
