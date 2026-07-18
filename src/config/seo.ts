export const seoConfig = {
  primaryKeywords: [
    "تسليك مجاري الكويت",
    "فني صحي الكويت",
    "سباك الكويت",
  ],
  serviceKeywords: [
    "تسليك مجاري بالضغط",
    "تسليك بواليع",
    "كشف تسربات المياه",
    "تنظيف مناهيل وجور",
    "تصوير بيبات المجاري بالكاميرا",
  ],
  localKeywords: [
    "تسليك مجاري حولي",
    "تسليك مجاري الفروانية",
    "تسليك مجاري الأحمدي",
    "تسليك مجاري الجهراء",
    "تسليك مجاري العاصمة",
    "تسليك مجاري مبارك الكبير",
  ],
  longTailKeywords: [
    "رقم تسليك مجاري الكويت",
    "تسليك مجاري 24 ساعة",
    "فني صحي الكويت 24 ساعة",
  ],
} as const;
 
export const keywords = [
  ...seoConfig.primaryKeywords,
  ...seoConfig.serviceKeywords,
  ...seoConfig.localKeywords,
  ...seoConfig.longTailKeywords,
];
