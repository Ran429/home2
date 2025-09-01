import { UploadFile } from "@/@types/upload-file";
import { HOVER_CLASSNAME } from "@/lib/classname-util";
import { getUploadFileUrl } from "@/lib/client-file-util";
import { yyyymmdd } from "@/lib/time-util";
import { cn } from "@/lib/utils";
import {
  GALLERY_SHOWING_COUNT,
  getMainGalleryItems,
} from "@/server/prisma/board.db";
import Image from "next/image";
import Link from "next/link";
import MainTitle from "../main-title";

export default async function MainGallery() {
  const galleryItems = await getMainGalleryItems();

  return (
    <article className="w-full">
      <MainTitle strongText="KLEA" normalText="갤러리" />

      <div
        className={cn("mt-5 flex gap-3", "pc lg:flex-row", "mobile flex-col")}
      >
        {galleryItems.map((item) => (
          <Link
            href={`/board/gallery/${item.id}`}
            key={item.id}
            className={cn(
              "flex-1 rounded-xl flex justify-end flex-col text-white relative aspect-[2/1] max-h-[300px]",
              HOVER_CLASSNAME
            )}
          >
            {item.images && (
              <GalleryImage image={(item.images as UploadFile[])[0]} />
            )}

            <div className="mx-6 mb-5 z-10">
              <h3 className="text-base font-bold">{item.title}</h3>
              <div className="flex flex-row gap-1 mt-1 items-center">
                <Image
                  src="/images/icons/icon_clock.png"
                  width="10"
                  height="10"
                  alt="clock"
                />
                <span className="font-medium text-sm">
                  {yyyymmdd(item.createdAt)}
                </span>
              </div>
            </div>
          </Link>
        ))}
        {galleryItems.length < GALLERY_SHOWING_COUNT &&
          new Array(GALLERY_SHOWING_COUNT - galleryItems.length)
            .fill(null)
            .map((_, index) => <NoImage key={index} />)}
      </div>
    </article>
  );
}

function GalleryImage({ image }: { image: UploadFile }) {
  return (
    <Image
      src={getUploadFileUrl(image)}
      width={0}
      height={0}
      sizes="100vw"
      className="w-full h-full object-cover absolute top-0 left-0 rounded-[inherit] aspect-[2/1] lg:aspect-square"
      alt={image.fileName}
    />
  );
}

function NoImage() {
  return (
    <div
      className={cn(
        "flex-1 rounded-xl flex justify-center items-center max-h-[300px] aspect-[2/1] lg:aspect-square",
        "bg-white border-klea_text_primary border-[3px]"
      )}
    >
      <Image
        src="/images/logo/logo_col.png"
        width={164}
        height={89}
        className="opacity-50"
        alt="gallery"
      />
    </div>
  );
}
