// src/constants/gallery-view-map.ts
import { GalleryTypeMap } from "./gallery-type";

export const GalleryViewMap = {
  [GalleryTypeMap.EDUCATION_WORKSHOPS.code]: "gallery",
  [GalleryTypeMap.PUBLICATIONS_REPORTS.code]: "gallery",
  [GalleryTypeMap.MEDIA_COVERAGE.code]: "gallery",
  [GalleryTypeMap.GALLERY.code]: "gallery", // 옵션
} as const;

export type GalleryViewType = "gallery";