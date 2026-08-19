"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { isMarketingChromeExcluded } from "@/lib/marketing-chrome";

const navigationItems = [
  ["product", "matchboard"],
  ["clubs", "clubs"],
  ["experience", "experience"],
  ["highlights", "highlights"],
  ["pilot", "pilot"],
] as const;

export default function MarketingHeader() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("MarketingNav");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  if (isMarketingChromeExcluded(pathname)) {
    return null;
  }

  const homepage = `/${locale}`;

  return (
    <header className="fixed inset-x-0 top-0 z-[70] border-b border-white/10 bg-[#050505]/92 text-white shadow-[0_14px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1480px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href={homepage}
          aria-label={t("homeLabel")}
          className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5BE2D] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        >
          <Image
            src="/images/elitereplay-logo.png"
            alt="ÉliteReplay"
            width={148}
            height={74}
            className="h-auto w-[118px] sm:w-[138px]"
            priority
          />
        </Link>

        <nav
          aria-label={t("navigationLabel")}
          className="ml-auto hidden items-center gap-4 xl:flex"
        >
          {navigationItems.map(([key, anchor]) => (
            <Link
              key={key}
              href={`${homepage}#${anchor}`}
              className="rounded-sm py-3 text-[0.79rem] font-semibold text-white/68 transition-colors hover:text-[#F5BE2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5BE2D]"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 sm:flex xl:ml-3">
          <LanguageSwitcher label={t("languageLabel")} />
          <Button
            asChild
            className="hidden rounded-full bg-[#F5BE2D] px-5 font-bold text-black hover:bg-[#F7CC58] lg:inline-flex"
          >
            <Link href={`/${locale}/contact`}>{t("cta")}</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="marketing-mobile-navigation"
          aria-label={isOpen ? t("closeMenu") : t("openMenu")}
          onClick={() => setIsOpen((current) => !current)}
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/[0.04] text-white transition-colors hover:border-[#F5BE2D]/50 hover:text-[#F5BE2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5BE2D] sm:ml-0 xl:hidden"
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {isOpen ? (
        <div
          id="marketing-mobile-navigation"
          className="border-t border-white/10 bg-[#050505] px-4 pb-5 pt-3 shadow-2xl xl:hidden"
        >
          <nav
            aria-label={t("mobileNavigationLabel")}
            className="mx-auto grid max-w-[1480px] gap-1"
          >
            {navigationItems.map(([key, anchor]) => (
              <Link
                key={key}
                href={`${homepage}#${anchor}`}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3.5 text-base font-semibold text-white/82 hover:bg-white/[0.06] hover:text-[#F5BE2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5BE2D]"
              >
                {t(key)}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-white/10 pt-4 sm:hidden">
              <LanguageSwitcher
                label={t("languageLabel")}
                className="w-full"
                onLocaleChange={() => setIsOpen(false)}
              />
              <Button
                asChild
                className="h-12 rounded-full bg-[#F5BE2D] font-bold text-black hover:bg-[#F7CC58]"
              >
                <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)}>
                  {t("cta")}
                </Link>
              </Button>
            </div>
            <Button
              asChild
              className="mt-3 hidden h-12 rounded-full bg-[#F5BE2D] font-bold text-black hover:bg-[#F7CC58] sm:inline-flex lg:hidden"
            >
              <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)}>
                {t("cta")}
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
