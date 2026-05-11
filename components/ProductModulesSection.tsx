"use client";

import { BarChart3, Camera, ClipboardCheck, PanelsTopLeft } from "lucide-react";
import { useTranslations } from "next-intl";

const modules = [
  { key: "highlightDetection", icon: Camera, step: "01" },
  { key: "multiView", icon: PanelsTopLeft, step: "02" },
  { key: "coachReview", icon: ClipboardCheck, step: "03" },
  { key: "matchFacts", icon: BarChart3, step: "04" },
] as const;

export default function ProductModulesSection() {
  const t = useTranslations("HomePage.productModules");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-[#04142d]/60 to-[#030712] py-10 md:py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#F5BE2D]/35 to-transparent" />
        <div className="absolute right-1/4 top-10 h-48 w-48 rounded-full bg-[#F5BE2D]/7 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div className="max-w-xl">
            <span className="mb-3 inline-block rounded-full bg-[#F5BE2D]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F5BE2D]">
              {t("eyebrow")}
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              <span className="bg-gradient-to-r from-white via-[#F5BE2D] to-white bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-400 md:text-base">
              {t("intro")}
            </p>
            <p className="mt-5 border-l border-[#F5BE2D]/35 pl-4 text-sm leading-relaxed text-gray-300">
              {t("closing")}
            </p>
          </div>

          <div className="relative">
            <div className="absolute bottom-8 left-5 top-8 hidden w-px bg-gradient-to-b from-[#F5BE2D]/0 via-[#F5BE2D]/35 to-[#F5BE2D]/0 sm:block" />
            <div className="space-y-3">
            {modules.map((module) => {
              const Icon = module.icon;

              return (
                <article
                  key={module.key}
                  className="group relative flex gap-4 overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-4 shadow-xl shadow-black/25 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F5BE2D]/35 sm:ml-10"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5BE2D]/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex shrink-0 flex-col items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#F5BE2D]/20 bg-black text-[#F5BE2D] shadow-lg shadow-black/30">
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <span className="text-[10px] font-semibold text-[#F5BE2D]/70">
                      {module.step}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-white md:text-lg">
                        {t(`${module.key}.title`)}
                      </h3>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F5BE2D]/75">
                      {t(`${module.key}.label`)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {t(`${module.key}.text`)}
                    </p>
                  </div>
                </article>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
