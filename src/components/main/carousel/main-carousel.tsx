"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useWindowSize from "@/hooks/use-window-size";
import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

function MainCarouselButton() {
  const { isMobile } = useWindowSize();
  if (isMobile) return null;
  return (
    <>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20" />
    </>
  );
}

export function MainCarouselScrollButton() {
  const handleClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };
  return (
    <div
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="white"
        viewBox="0 0 24 24"
        className="animate-bounce"
      >
        <path d="M12 16.5l-6-6h12l-6 6z" />
      </svg>
    </div>
  );
}

const slides = [
  {
    id: 1,
    image: "/images/background/main/bg_carousel1.webp",
    title: "인간취약성연구소",
    description: "Institute for Human Vulnerability",
  },
  {
    id: 2,
    image: "/images/background/main/bg_carousel2.webp",
    title: "연구와 교육",
    description: "취약성 극복을 위한 지식과 실천",
  },
  {
    id: 3,
    image: "/images/background/main/bg_carousel3.webp",
    title: "사회적 공헌",
    description: "함께하는 사회를 향해",
  },
];

export default function MainCarousel() {
  const autoplay = useRef<any>(null);

  useEffect(() => {
    autoplay.current = Autoplay({ delay: 5000, stopOnInteraction: false });
    console.log("✅ Autoplay initialized:", autoplay.current);
  }, []);

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
  <Carousel
    opts={{ loop: true }}
    plugins={autoplay.current ? [autoplay.current] : []}
    className="w-full h-full"
  >
    <CarouselContent>
      {slides.map((slide) => (
        <CarouselItem
          key={slide.id}
          className="relative w-full h-[600px] flex-shrink-0 basis-full"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            onLoadingComplete={() =>
              console.log(`✅ Loaded image: ${slide.image}`)
            }
          />
          {/* 어두운 오버레이 */}
          <div className="absolute inset-0 bg-black/40" />
          {/* 텍스트 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              {slide.title}
            </h2>
            <p className="text-lg md:text-2xl">{slide.description}</p>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>

    <MainCarouselButton />
    <MainCarouselScrollButton />
  </Carousel>
</section>
  );
}