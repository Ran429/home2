"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useWindowSize from "@/hooks/use-window-size";
import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Fragment } from "react";

type BreadcrumbParam = {
  href?: string;
  text: string;
};

type Props = {
  breadcrumbs: BreadcrumbParam[];
  hiddenInMobile?: boolean;
};

export default function CommonBreadcrumb({
  breadcrumbs,
  hiddenInMobile,
}: Props) {
  const { isMobile } = useWindowSize();

  if (hiddenInMobile && isMobile === true) {
    return null;
  }

  return (
    <div className="w-full mt-20">
      <div className="w-full px-5 mt-5 pt-4 pb-4 border-b border-t border-klea_box_border z-20">
        <Breadcrumb className="container">
          <BreadcrumbList className="gap-3">
            {breadcrumbs.map((bread, index) => (
              <Fragment key={bread.text}>
                <BreadcrumbItem className="font-semibold text-sm lg:text-base text-[#555555]">
                  {bread.href ? (
                    <BreadcrumbLink asChild>
                      <Link href={bread.href}>
                        {bread.text === "홈" ? (
                          <HomeIcon className="size-5 mb-[2px]" />
                        ) : (
                          bread.text
                        )}
                      </Link>
                    </BreadcrumbLink>
                  ) : bread.text === "홈" ? (
                    <HomeIcon className="size-5 mb-[2px]" />
                  ) : (
                    bread.text
                  )}
                </BreadcrumbItem>
                {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
