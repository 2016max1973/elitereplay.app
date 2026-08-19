"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import { isMarketingChromeExcluded } from "@/lib/marketing-chrome";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("Footer");
  const navigationT = useTranslations("MarketingNav");
  const pathname = usePathname();

  if (isMarketingChromeExcluded(pathname)) {
    return null;
  }

  return (
    <footer className="border-t border-white/10 bg-black py-14 text-white">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <Image
              src="/images/elitereplay-logo.png"
              alt="ÉliteReplay"
              width={190}
              height={95}
              className="h-auto w-[155px]"
            />
            <p className="mt-4 max-w-xl text-base leading-7 text-white/52">
              {t("text")}
            </p>
          </div>

          <nav
            aria-label={t("navigationLabel")}
            className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm font-semibold text-white/62 sm:grid-cols-3 lg:justify-items-end"
          >
            <Link href={`/${locale}#matchboard`} className="hover:text-[#F5BE2D]">
              {navigationT("product")}
            </Link>
            <Link href={`/${locale}#clubs`} className="hover:text-[#F5BE2D]">
              {t("clubs")}
            </Link>
            <Link href={`/${locale}#experience`} className="hover:text-[#F5BE2D]">
              {navigationT("experience")}
            </Link>
            <Link href={`/${locale}#highlights`} className="hover:text-[#F5BE2D]">
              {navigationT("highlights")}
            </Link>
            <Link href={`/${locale}#content-engine`} className="hover:text-[#F5BE2D]">
              {t("content")}
            </Link>
            <Link href={`/${locale}#pilot`} className="hover:text-[#F5BE2D]">
              {t("pilot")}
            </Link>
            <Link href={`/${locale}/contact`} className="hover:text-[#F5BE2D]">
              {t("contact")}
            </Link>
            <Link href={`/${locale}/imprint`} className="hover:text-[#F5BE2D]">
              {t("imprint")}
            </Link>
            <Link href={`/${locale}/privacy`} className="hover:text-[#F5BE2D]">
              {t("privacy")}
            </Link>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/38">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
