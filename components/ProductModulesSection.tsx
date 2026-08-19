import { ImageIcon, MonitorPlay, Sparkles, Target } from "lucide-react";
import { getTranslations } from "next-intl/server";

import PlayerCardsSection from "@/components/PlayerCardsSection";

const modules = [
  { key: "highlightDetection", icon: MonitorPlay, step: "01" },
  { key: "multiView", icon: Target, step: "02" },
  { key: "coachReview", icon: Sparkles, step: "03" },
  { key: "matchFacts", icon: ImageIcon, step: "04" },
] as const;

export default async function ProductModulesSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "HomePage.productModules" });

  return (
    <section id="experience" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-black via-[#061226] to-[#030712] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#F5BE2D]/35 to-transparent" />
        <div className="absolute right-[8%] top-20 h-72 w-72 rounded-full bg-[#F5BE2D]/[0.07] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="max-w-2xl lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F5BE2D]">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 text-pretty text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              {t("intro")}
            </p>
            <p className="mt-7 border-l-2 border-[#F5BE2D] pl-5 text-sm leading-6 text-white/75">
              {t("closing")}
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[24px] border border-white/10 bg-white/10 sm:grid-cols-2">
            {modules.map(({ key, icon: Icon, step }) => (
              <article key={key} className="min-h-64 bg-[linear-gradient(145deg,#0B1322,#050505)] p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5BE2D] text-black">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-bold tracking-[0.16em] text-white/30">{step}</span>
                </div>
                <p className="mt-7 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#F5BE2D]/80">
                  {t(`${key}.label`)}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">{t(`${key}.title`)}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{t(`${key}.text`)}</p>
              </article>
            ))}
          </div>
        </div>

        <PlayerCardsSection locale={locale} />
      </div>
    </section>
  );
}
