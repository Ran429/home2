import DividerY from "@/components/common/divider-y";
import CopyrightPolicyDialog from "@/components/footer/copyright-policy-dialog";
import EmailPolicyDialog from "@/components/footer/email-policy-dialog";
import PrivacyPolicyDialog from "@/components/footer/privacy-policy-dialog";
import {
  KLEA_ADDRESS,
  KLEA_EMAIL,
  KLEA_FAX_NUMBER,
  KLEA_PHONE_NUMBER,
} from "@/constants/klea-info.const";
import { cn } from "@/lib/utils";
import { getDialogValues } from "@/server/prisma/config.db";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import FooterButton from "./footer-button";
import { Skeleton } from "../ui/skeleton";
import { DIALOG_TYPE } from "@/constants/dialog.const";

export default async function Footer() {
  return (
    <footer className="w-full bg-[#212B4E] py-10 lg:py-7 mt-20">
      <div className="container container:px-0 lg:px-4 px-8">
        <div
          className={cn(
            "flex justify-between items-center gap-10 lg:gap-12",
            "pc lg:flex-row",
            "mobile flex-col"
          )}
        >
          <Image
            src="/images/logo/logo_white.png"
            width="284"
            height="4"
            alt="logo_white"
          />

          <div
            className={cn(
              "w-full text-white text-base gap-[10px] relative",
              "pc lg:flex lg:flex-row lg:justify-end",
              "mobile grid grid-cols-2"
            )}
          >
            <Suspense
              fallback={
                <>
                  <Skeleton
                    className={cn(
                      "w-[140px] rounded-[27px] text-center",
                      "text-sm lg:text-[15px] px-3 lg:px-[18px] py-[10px]"
                    )}
                  />
                  <Skeleton
                    className={cn(
                      "w-[140px] rounded-[27px] text-center",
                      "text-sm lg:text-[15px] px-3 lg:px-[18px] py-[10px]"
                    )}
                  />
                  <Skeleton
                    className={cn(
                      "w-[140px] rounded-[27px] text-center",
                      "text-sm lg:text-[15px] px-3 lg:px-[18px] py-[10px]"
                    )}
                  />
                </>
              }
            >
              <FooterDialogs />
            </Suspense>

            <Link href="/sitemap">
              <FooterButton title="사이트맵" />
            </Link>
          </div>
        </div>

        <div className="hidden lg:block h-px bg-white bg-opacity-30 my-6" />

        <div className="flex flex-col mt-8 lg:mt-0 text-center lg:text-start">
          <p className="text-sm lg:text-base text-[#A0A8C2]">{KLEA_ADDRESS}</p>
          <div
            className={cn(
              "flex justify-center items-start text-sm text-[#A0A8C2] flex-wrap",
              "lg:justify-start lg:items-center flex-row lg:text-base"
            )}
          >
            <p>TEL : {KLEA_PHONE_NUMBER}</p>
            <DividerY className="bg-[#A0A8C2] h-[13px] mx-3 mt-1 lg:mt-0" />
            <p>FAX : {KLEA_FAX_NUMBER}</p>
            <DividerY className="bg-[#A0A8C2] h-[13px] mx-3 mt-1 lg:mt-0" />
            <p>Email : {KLEA_EMAIL}</p>
          </div>
          <p className="mt-3 text-sm lg:text-base text-[#677195]">
            Copyright 2024 KLEA All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

async function FooterDialogs() {
  const dialogValues = await getDialogValues();

  const privacyPolicy = dialogValues.find(
    (dialogValue) => dialogValue.key === DIALOG_TYPE.PRIVACY_POLICY.code
  )?.value;
  const copyrightPolicy = dialogValues.find(
    (dialogValue) => dialogValue.key === DIALOG_TYPE.COPYRIGHT_POLICY.code
  )?.value;
  const emailPolicy = dialogValues.find(
    (dialogValue) => dialogValue.key === DIALOG_TYPE.EMAIL_POLICY.code
  )?.value;

  return (
    <>
      <PrivacyPolicyDialog content={privacyPolicy ?? ""} />
      <CopyrightPolicyDialog content={copyrightPolicy ?? ""} />
      <EmailPolicyDialog content={emailPolicy ?? ""} />
    </>
  );
}
