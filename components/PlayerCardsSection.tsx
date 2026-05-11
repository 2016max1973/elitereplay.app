"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

const cards = [
  {
    key: "player",
    image: "/images/cards/player-card-olli.jpg",
    altKey: "playerAlt",
    className: "",
    sizes: "(min-width: 768px) 220px, 70vw",
  },
  {
    key: "team",
    image: "/images/cards/team-card-olli-basti.jpg",
    altKey: "teamAlt",
    className: "md:-mt-3",
    sizes: "(min-width: 768px) 240px, 70vw",
  },
  {
    key: "club",
    image: "/images/cards/club-card-setpoint.jpg",
    altKey: "clubAlt",
    className: "",
    sizes: "(min-width: 768px) 220px, 70vw",
  },
] as const;

const productTypes = ["player", "team", "club"] as const;

export default function PlayerCardsSection() {
  const t = useTranslations("HomePage.cards");
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#030712] via-[#051937]/40 to-black py-8 md:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#F5BE2D]/30 to-transparent" />
        <div className="absolute left-1/2 top-24 h-56 w-72 -translate-x-1/2 rounded-full bg-[#F5BE2D]/8 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-6 max-w-3xl text-center">
          <span className="mb-3 inline-block rounded-full bg-[#F5BE2D]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F5BE2D]">
            {t("eyebrow")}
          </span>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            <span className="bg-gradient-to-r from-white via-[#F5BE2D] to-white bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-300 md:text-base">
            {t("text")}
          </p>
          <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-gray-500 md:text-sm">
            {t("subtext")}
          </p>
        </div>

        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 md:flex-row md:items-start md:gap-5">
          {cards.map((card) => (
            <div
              key={card.key}
              className={`w-full max-w-[220px] md:max-w-[240px] ${card.className}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#F5BE2D]/20 bg-[#050505] p-1 shadow-2xl shadow-black/60 ring-1 ring-white/10">
                <div className="relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-[#07111f] via-black to-[#1a1203]">
                  {failedImages[card.key] ? (
                    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F5BE2D]">
                        {t(`${card.key}.title`)}
                      </span>
                      <span className="mt-3 block h-px w-16 bg-[#F5BE2D]/50" />
                      <span className="mt-4 text-sm text-gray-400">
                        {t(`${card.key}.chip`)}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={card.image}
                      alt={t(card.altKey)}
                      fill
                      sizes={card.sizes}
                      className="object-cover"
                      onError={() =>
                        setFailedImages((current) => ({
                          ...current,
                          [card.key]: true,
                        }))
                      }
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-3xl gap-2 sm:grid-cols-3">
          {productTypes.map((type) => (
            <div
              key={type}
              className="rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-center"
            >
              <h3 className="text-sm font-semibold text-white">
                {t(`${type}.title`)}
              </h3>
              <p className="mt-1 text-xs leading-snug text-gray-500">
                {t(`${type}.chip`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <span className="inline-flex rounded-full border border-[#F5BE2D]/25 bg-[#F5BE2D]/8 px-4 py-1.5 text-xs font-semibold text-[#F5BE2D]">
            {t("cta")}
          </span>
        </div>
      </div>
    </section>
  );
}
