// src/server/prisma/gallery-type.ts
export const GalleryTypeMap = {
  EDUCATION_WORKSHOPS: { code: "education-workshops", text: "교육 및 워크숍" },
  PUBLICATIONS_REPORTS: { code: "publications-reports", text: "출판물 및 보고서" },
  MEDIA_COVERAGE: { code: "media-coverage", text: "미디어 보도" },
    RESEARCH_OUTCOMES: { code: "research-outcomes", text: "연구성과" },

  GALLERY: { code: "gallery", text: "갤러리" },
} as const;

export const GalleryTypes = Object.values(GalleryTypeMap);
export type GalleryType = (typeof GalleryTypes)[number];