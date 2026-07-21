"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "areas",
    question: "ما هي المناطق التي تغطونها في الكويت؟",
    answer:
      "نغطي جميع محافظات الكويت الست: العاصمة، حولي، الفروانية، الأحمدي، الجهراء، ومبارك الكبير — بما فيها جميع المناطق والمجمعات السكنية. إذا كنت في أي منطقة بالكويت، نصل إليك.",
  },
  {
    id: "price",
    question: "كيف تحدد أسعار الخدمة؟",
    answer:
      "أسعارنا شفافة ومنافسة دون أي رسوم مخفية. السعر يتحدد بعد معاينة المشكلة وحجمها. نلتزم بالسعر المتفق عليه قبل بدء العمل، ولا توجد مفاجآت.",
  },
  {
    id: "speed",
    question: "ما هو الوقت المتوقع للوصول؟",
    answer:
      "نحرص على الوصول خلال 30 دقيقة من استلام الاتصال في معظم مناطق الكويت. قد يختلف الوقت حسب موقعك وظروف المرور، لكنك ستكون على علم بموعد وصولنا.",
  },
  {
    id: "hours",
    question: "هل تعملون في الإجازات والعطلات الرسمية؟",
    answer:
      "نعم، فني صحي الكويت 24 ساعة في خدمتكم طوال أيام الأسبوع، 365 يوماً في السنة — بما في ذلك الإجازات الرسمية والعطلات. المجاري لا تنتظر إجازة!",
  },
  {
    id: "types",
    question: "ما أنواع المجاري التي تتعاملون معها؟",
    answer:
      "نتعامل مع جميع أنواع الانسدادات: مجاري المطابخ والحمامات، البواليع، المناهيل، الجور، وخطوط الصرف الرئيسية. كما نقدم خدمة كشف تسربات المياه وتصوير بيبات المجاري بالكاميرا.",
  },
  {
    id: "guarantee",
    question: "هل تقدمون كفالة على العمل؟",
    answer:
      "نعم، نقدم كفالة على جميع أعمالنا. إذا عادت المشكلة بسبب خلل في العمل، نعود لإصلاحها دون أي تكلفة إضافية. رضاك التام هو معيار نجاحنا.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section id="faq" variant="light">
      {/* FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Container>
        {/* Centralized Section Title */}
        <SectionTitle
          title="أسئلة شائعة"
          subtitle="إجابات لأكثر الأسئلة التي يسألها عملاؤنا"
          badge="لديك استفسار?"
          badgeColor="primary"
        />

        {/* FAQ Accordion - Grid of 2 columns on desktop (md+), 1 column on mobile/tablet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <Card
                key={faq.id}
                variant={isOpen ? "accordion-active" : "accordion-inactive"}
                role="listitem"
                className="self-start"
              >
                <button
                  className={`w-full flex items-center justify-between px-5 py-4 text-right font-bold cursor-pointer transition-colors border-none min-h-[60px] ${
                    isOpen ? "text-secondary bg-accent/5" : "text-text-dark bg-transparent"
                  }`}
                  style={{
                    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                  }}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-q-${idx + 1}`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                        isOpen
                          ? "bg-gradient-to-br from-accent to-secondary text-white"
                          : "bg-secondary/8 text-secondary"
                      }`}
                      aria-hidden="true"
                    >
                      {idx + 1}
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 transition-transform duration-300 mr-2 text-accent ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-q-${idx + 1}`}
                  hidden={!isOpen}
                  className="px-5 pb-5 pt-1 text-sm leading-relaxed text-text-muted text-center"
                >
                  <div
                    className="h-px w-full mb-4 bg-accent/20"
                    aria-hidden="true"
                  ></div>
                  {faq.answer}
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
