"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { areaGroups } from "@/data/areas";
import AreaButton from "@/components/ui/AreaButton";
import { MapPin, ChevronDown, Search, X, MessageCircle, CheckCircle2 } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

// Helper to normalize Arabic characters for search comparison
function normalizeArabic(text: string): string {
  if (!text) return "";
  let normalized = text.trim().toLowerCase();
  // Remove Arabic diacritics/tashkeel
  normalized = normalized.replace(/[\u064B-\u0652]/g, "");
  // Normalize Alif forms (أ, إ, آ, ٱ) -> ا
  normalized = normalized.replace(/[أإآٱ]/g, "ا");
  // Normalize Teh Marbuta (ة) -> Heh (ه)
  normalized = normalized.replace(/ة/g, "ه");
  // Normalize Alif Maqsura (ى) -> Yeh (ي)
  normalized = normalized.replace(/ى/g, "ي");
  // Normalize multiple spaces
  normalized = normalized.replace(/\s+/g, " ");
  return normalized;
}

// Levenshtein distance algorithm for minor spelling mistakes
function getLevenshteinDistance(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  return matrix[a.length][b.length];
}

export default function AreasSection() {
  const [openGov, setOpenGov] = useState<string | null>(areaGroups[0].governorate);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedResult, setSelectedResult] = useState<{ area: string; governorate: string } | null>(null);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Flatten the areas list for easier search
  const allAreasList = useMemo(() => {
    return areaGroups.flatMap((group) =>
      group.areas.map((area) => ({
        area,
        governorate: group.governorate,
      }))
    );
  }, []);

  // Compute fuzzy matching suggestions
  const suggestions = useMemo(() => {
    const q = normalizeArabic(searchQuery);
    if (!q) return [];

    const results: Array<{ area: string; governorate: string; score: number }> = [];

    for (const item of allAreasList) {
      const n = normalizeArabic(item.area);
      let score = 0;

      if (n === q) {
        score = 100; // Exact normalized match
      } else if (n.startsWith(q)) {
        score = 80 + (q.length / n.length) * 10; // Starts with query
      } else if (n.includes(q)) {
        score = 60 + (q.length / n.length) * 10; // Contains query
      } else if (q.length >= 3) {
        const distance = getLevenshteinDistance(q, n);
        const maxLength = Math.max(q.length, n.length);
        const similarity = 1 - distance / maxLength;
        if (similarity >= 0.65) {
          score = 40 + similarity * 20; // Fuzzy match for spelling mistakes
        }
      }

      if (score > 0) {
        results.push({
          area: item.area,
          governorate: item.governorate,
          score,
        });
      }
    }

    // Sort by score descending, then by area length ascending (shorter matched words first)
    return results
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return a.area.length - b.area.length;
      })
      .slice(0, 8); // Top 8 suggestions
  }, [searchQuery, allAreasList]);

  // Click outside listener to close suggestion list
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Keyboard navigation handler for suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
        e.preventDefault();
        const selected = suggestions[activeSuggestionIndex];
        setSelectedResult({ area: selected.area, governorate: selected.governorate });
        setSearchQuery(selected.area);
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

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

        {/* Smart Search Widget */}
        <div ref={searchContainerRef} className="max-w-xl mx-auto mb-12 relative z-20">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-text-dark text-right flex items-center gap-2">
              <Search size={20} className="text-primary" strokeWidth={2.5} />
              <span>ابحث عن منطقتك</span>
            </h3>

            <div className="flex items-center border border-secondary/12 rounded-xl bg-white focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent overflow-hidden shadow-[0_2px_8px_rgba(15,59,77,0.04)]">
              {/* Fixed Search Icon Area (on the right in RTL) */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border-l border-secondary/12 text-text-muted bg-secondary/3">
                <Search size={18} />
              </div>

              {/* Text Input Area (on the left in RTL) */}
              <div className="relative flex-1 flex items-center min-w-0 h-12">
                <input
                  id="area-search-input"
                  type="text"
                  dir="rtl"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedResult(null);
                    setShowSuggestions(true);
                    setActiveSuggestionIndex(-1);
                  }}
                  onFocus={() => {
                    setShowSuggestions(true);
                    setActiveSuggestionIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="اكتب اسم المنطقة، مثلاً: السالمية، كبد، سلوى..."
                  className="w-full text-right py-3 px-4 pl-10 bg-transparent text-text-dark focus:outline-none text-sm font-semibold border-none"
                  aria-expanded={showSuggestions && (suggestions.length > 0 || searchQuery.length > 0)}
                  aria-controls="area-search-results"
                  role="combobox"
                  aria-autocomplete="list"
                />

                {/* Clear button (on the left in RTL) */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedResult(null);
                      setShowSuggestions(false);
                      setActiveSuggestionIndex(-1);
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-secondary/10 text-text-muted hover:text-text-dark transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center"
                    aria-label="مسح البحث"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && searchQuery.trim().length > 0 && (
            <div
              id="area-search-results"
              role="listbox"
              className="absolute left-0 right-0 mt-2 bg-white border border-secondary/12 rounded-xl shadow-premium overflow-hidden z-50 text-right max-h-[300px] overflow-y-auto"
            >
              {suggestions.length > 0 ? (
                suggestions.map((item, index) => {
                  const isActive = index === activeSuggestionIndex;
                  return (
                    <button
                      key={`${item.area}-${item.governorate}`}
                      role="option"
                      aria-selected={isActive}
                      type="button"
                      onClick={() => {
                        setSelectedResult({ area: item.area, governorate: item.governorate });
                        setSearchQuery(item.area);
                        setShowSuggestions(false);
                      }}
                      onMouseEnter={() => setActiveSuggestionIndex(index)}
                      className={`w-full text-right px-4 py-3 border-none flex items-center justify-between transition-colors cursor-pointer text-sm ${
                        isActive ? "bg-accent/8 text-secondary font-bold" : "bg-transparent text-text-dark hover:bg-secondary/4"
                      }`}
                    >
                      <span className="font-semibold">{item.area}</span>
                      <span className="text-xs text-text-muted">محافظة {item.governorate}</span>
                    </button>
                  );
                })
              ) : (
                /* No match state */
                <div className="p-5 text-center flex flex-col items-center gap-4">
                  <p className="text-text-muted text-sm font-semibold">
                    لم نجد منطقة مطابقة تمامًا باسم &quot;{searchQuery}&quot;
                  </p>
                  <p className="text-xs text-text-muted max-w-sm leading-relaxed">
                    يمكنك تجربة كتابة جزء مختلف من اسم المنطقة أو التواصل معنا مباشرة للتأكد من إمكانية تقديم الخدمة في منطقتك.
                  </p>
                  <Button
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                      `السلام عليكم، أود الاستفسار عن توفر خدمات تسليك المجاري في منطقة: ${searchQuery}`
                    )}`}
                    variant="whatsapp"
                    className="w-full sm:w-auto text-xs py-2 px-5 min-h-[36px]"
                  >
                    <MessageCircle size={16} />
                    <span>تأكيد التوفر عبر واتساب</span>
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Selected result success state */}
          {selectedResult && (
            <Card variant="accordion-active" className="mt-4 p-5 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3 text-right w-full md:w-auto">
                  <CheckCircle2 size={24} className="text-[#25d366] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-base text-text-dark">
                      نعم، نقدم خدماتنا في منطقة {selectedResult.area}
                    </h4>
                    <p className="text-xs text-text-muted mt-1">
                      محافظة {selectedResult.governorate} — نصلك خلال دقائق
                    </p>
                  </div>
                </div>

                <Button
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                    `السلام عليكم، أحتاج خدمة تسليك مجاري في منطقة ${selectedResult.area}.`
                  )}`}
                  variant="whatsapp"
                  className="w-full md:w-auto"
                >
                  <MessageCircle size={18} />
                  <span>اطلب الخدمة الآن</span>
                </Button>
              </div>
            </Card>
          )}
        </div>

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

