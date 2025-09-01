"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import MainCarouselButton from "./main-carousel-button";
import MainCarouselContent from "./main-carousel-content";
import { MainCarouselScrollButton } from "./main-carousel-scroll-button";

export default function MainCarousel() {
  const carouselItems = [
    { image: "/images/background/main/bg_carousel2.jpg", alt: "bg_main2" },
    { image: "/images/background/main/bg_carousel3.jpg", alt: "bg_main3" },
    { image: "/images/background/main/bg_carousel4.jpg", alt: "bg_main4" },
    { image: "/images/background/main/bg_carousel5.jpg", alt: "bg_main5" },
  ];

  return (
    <Carousel
      className="w-full h-screen relative"
      orientation="horizontal"
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 5000 })]}
    >
      <CarouselContent className="w-full h-full">
        {carouselItems.map((item, index) => (
          <CarouselItem className="w-full" key={item.alt}>
            <div className="w-full md:h-screen h-[95vh] relative">
              <Image
                src={item.image}
                width={0}
                height={0}
                sizes="100vw"
                className={cn(
                  "absolute w-full h-full -z-10 opacity-80",
                  "top-1/2 left-1/2 object-cover -translate-x-1/2 -translate-y-1/2",
                  "pc lg:rounded-b-none",
                  "mobile rounded-b-[210px]"
                )}
                alt={item.alt}
                priority
                quality={100}
              />

              <MainCarouselContent useSemanticTags={index === 0} />
              <MainCarouselScrollButton />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <MainCarouselButton />
    </Carousel>
  );
}
