"use client";

import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import useWindowSize from "@/hooks/use-window-size";

export default function MainCarouselButton() {
  const { isMobile } = useWindowSize();

  if (isMobile) return null;

  return (
    <>
      <CarouselNext />
      <CarouselPrevious />
    </>
  );
}
