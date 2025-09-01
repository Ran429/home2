import MainBoard from "@/components/main/board/main-board";
import MainBoardSkeleton from "@/components/main/board/main-board-skeleton";
import MainBusiness from "@/components/main/business/main-business";
import MainCarousel from "@/components/main/carousel/main-carousel";
import MainGallery from "@/components/main/gallery/main-gallery";
import MainGallerySkeleton from "@/components/main/gallery/main-gallery-skeleton";
import MainAssociateCompany from "@/components/main/main-associate-company";
import MainInfoSytem from "@/components/main/main-info-system";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import AssociateCompanyDB from "@/server/prisma/associate-company.db";
import { sleep } from "@/server/prisma/config.db";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <MainCarousel />

      <Suspense fallback={<MainBoardSkeleton />}>
        <MainBoard />
      </Suspense>

      <MainBusiness />

      <section className="w-full relative z-0">
        <div
          className={cn(
            "container flex container:px-0",
            "pc lg:flex-row lg:gap-5 lg:pt-20 lg:pb-24",
            "mobile flex-col gap-10 pt-[58px] pb-20 px-4"
          )}
        >
          <Suspense fallback={<MainGallerySkeleton />}>
            <MainGallery />
          </Suspense>
        </div>
        <div className="bg-[#F4F7FF] absolute bottom-0 w-full h-[140%] -z-10 left-0"></div>
      </section>

      <MainInfoSytem />
      <Suspense
        fallback={
          <Skeleton
            className={cn(
              "w-full h-[134px] -mb-20 shadow-[rgba(0,0,0,0.25)_0_3px_10px]"
            )}
          />
        }
      >
        <MainAssociateCompanyHelper />
      </Suspense>
    </>
  );
}

async function MainAssociateCompanyHelper() {
  const associateCompanies = await AssociateCompanyDB.findAllActive();
  return <MainAssociateCompany associateCompanies={associateCompanies} />;
}
