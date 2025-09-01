"use client";

import { UploadFile } from "@/@types/upload-file";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { getUploadFileUrl } from "@/lib/client-file-util";
import { cn } from "@/lib/utils";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { AssociateCompany } from "@prisma/client";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

type Props = {
  associateCompanies: AssociateCompany[];
};

export default function MainAssociateCompany({ associateCompanies }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [pause, setPause] = useState<boolean>(false);

  const visibleCompanies: AssociateCompany[] = [];
  while (visibleCompanies.length < 10) {
    visibleCompanies.push(...associateCompanies);
  }

  return (
    <section
      className={cn("w-full -mb-20 shadow-[rgba(0,0,0,0.25)_0_3px_10px]")}
    >
      <div className="container py-8 px-4 flex flex-row gap-10 items-center justify-center">
        <Carousel
          setApi={setApi}
          className="w-full max-w-[66%] lg:max-w-full"
          opts={{
            loop: true,
            slidesToScroll: 1,
          }}
          plugins={[Autoplay({ delay: 2500, active: !pause })]}
        >
          <CarouselContent>
            {visibleCompanies.map((company, index) => (
              <CarouselItem
                key={company.id + "_" + index}
                className="flex items-center mx-7 basis-auto self-stretch"
              >
                <Link
                  href={company.link}
                  target="_blank"
                  className={HOVER_CLASSNAME}
                >
                  <Image
                    src={getUploadFileUrl((company.image as UploadFile[])[0])}
                    width={0}
                    height={0}
                    sizes="25vw"
                    alt="business_logo"
                    className="w-[160px] h-[60px]"
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex flex-row gap-1">
          <button
            className={cn(
              "rounded-full border border-klea_box_border flex justify-center items-center px-2 py-1",
              HOVER_CLASSNAME
            )}
            onClick={() => {
              if (!api) return;
              api.scrollPrev();
            }}
          >
            <ArrowLeftIcon className="w-4" />
          </button>

          <button
            className={cn(
              "rounded-full border border-klea_box_border flex justify-center items-center p-2",
              HOVER_CLASSNAME
            )}
            onClick={() => {
              if (!api) return;
              setPause((prev) => !prev);
            }}
          >
            {pause ? (
              <PlayIcon className="size-4" />
            ) : (
              <PauseIcon className="size-4" />
            )}
          </button>

          <button
            className={cn(
              "rounded-full border border-klea_box_border flex justify-center items-center p-2",
              HOVER_CLASSNAME
            )}
            onClick={() => {
              if (!api) return;
              api.scrollNext();
            }}
          >
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
