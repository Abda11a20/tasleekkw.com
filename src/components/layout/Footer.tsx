import { Phone, MessageCircle, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { navLinks } from "@/config/navigation";
import Container from "@/components/ui/Container";
 
export default function Footer() {

  return (
    <footer className="text-white pt-12 pb-6 bg-secondary-dark">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-b pb-8 border-white/10">
          {/* Brand */}
          <div className="text-center sm:text-right flex flex-col items-center sm:items-start">
            <h3 className="font-black text-xl mb-3 text-accent w-full">
              {siteConfig.name}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              {siteConfig.tagline}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-4 text-white/60 text-sm w-full">
              <MapPin size={14} />
              <span>جميع مناطق الكويت</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-right">
            <h4 className="font-bold text-base mb-3 text-white/90">روابط سريعة</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors block sm:inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-right flex flex-col items-center sm:items-start">
            <h4 className="font-bold text-base mb-3 text-white/90 w-full">تواصل معنا</h4>
            <div className="space-y-3 w-full flex flex-col items-center sm:items-start">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center justify-center sm:justify-start gap-2 text-white/80 hover:text-white transition-colors text-sm w-full"
              >
                <Phone size={16} className="text-primary" />
                <span dir="ltr">{siteConfig.phone}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-2 text-white/80 hover:text-white transition-colors text-sm w-full"
              >
                <MessageCircle size={16} className="text-[#25d366]" />
                <span>واتساب</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 text-center text-white/40 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 mt-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} — جميع الحقوق محفوظة
          </p>
          <a
            href="https://wa.me/201016864615?text=مرحباً، أعجبني تصميم موقع تسليك مجاري الكويت وأريد الاستفسار عن خدمات تصميم المواقع"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors text-white/50 py-1"
            title="تواصل مع مصمم الموقع عبر واتساب"
          >
            <span>تصميم وتطوير الموقع:</span>
            <span className="font-semibold underline text-primary">أحمد</span>
            <MessageCircle size={14} className="text-[#25d366]" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
