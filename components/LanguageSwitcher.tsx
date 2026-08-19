"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

type LanguageSwitcherProps = {
  label: string;
  className?: string;
  onLocaleChange?: () => void;
};

export default function LanguageSwitcher({
  label,
  className = "",
  onLocaleChange,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function changeLocale(nextLocale: string) {
    const localizedPath = pathname.match(/^\/(en|de|es)(\/|$)/)
      ? pathname.replace(/^\/(en|de|es)/, `/${nextLocale}`)
      : `/${nextLocale}${pathname === "/" ? "" : pathname}`;
    const hash = typeof window === "undefined" ? "" : window.location.hash;

    onLocaleChange?.();
    router.push(`${localizedPath}${hash}`);
  }

  return (
    <select
      value={locale}
      onChange={(event) => changeLocale(event.target.value)}
      aria-label={label}
      className={`h-11 rounded-full border border-white/14 bg-white/[0.06] px-3 text-xs font-bold uppercase tracking-[0.12em] text-white outline-none transition-colors hover:border-[#F5BE2D]/50 focus-visible:ring-2 focus-visible:ring-[#F5BE2D] ${className}`}
    >
      <option className="bg-[#111] text-white" value="de">
        DE
      </option>
      <option className="bg-[#111] text-white" value="en">
        EN
      </option>
      <option className="bg-[#111] text-white" value="es">
        ES
      </option>
    </select>
  );
}
