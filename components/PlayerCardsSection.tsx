import Image from "next/image";
import { getTranslations } from "next-intl/server";

const cards = [
  {
    key: "player",
    image: "/images/cards/player-card-olli.jpg",
    altKey: "playerAlt",
    className: "",
    sizes: "(min-width: 1024px) 300px, (min-width: 640px) 32vw, 82vw",
  },
  {
    key: "team",
    image: "/images/cards/team-card-olli-basti.jpg",
    altKey: "teamAlt",
    className: "lg:-translate-y-5",
    sizes: "(min-width: 1024px) 320px, (min-width: 640px) 32vw, 82vw",
  },
  {
    key: "club",
    image: "/images/cards/club-card-setpoint.jpg",
    altKey: "clubAlt",
    className: "",
    sizes: "(min-width: 1024px) 300px, (min-width: 640px) 32vw, 82vw",
  },
] as const;

export default async function PlayerCardsSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "HomePage.cards" });

  return (
    <div aria-label={t("eyebrow")} className="relative mt-16 border-t border-white/10 pt-12 sm:mt-20 sm:pt-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 sm:flex-row sm:items-start sm:gap-4 lg:gap-7">
        {cards.map((card) => (
          <article key={card.key} className={`w-full max-w-[310px] ${card.className}`}>
            <div className="relative h-[430px] overflow-hidden rounded-[24px] border border-[#F5BE2D]/20 bg-[#030303] p-2 shadow-2xl shadow-black/60 ring-1 ring-white/10 sm:h-[380px] lg:h-[470px]">
              <div className="relative h-full overflow-hidden rounded-[18px] bg-gradient-to-br from-[#07111f] via-black to-[#1a1203]">
                <Image
                  src={card.image}
                  alt={t(card.altKey)}
                  fill
                  sizes={card.sizes}
                  className="object-contain object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/[0.04]" />
              </div>
            </div>
            <div className="px-2 pt-5 text-center">
              <h3 className="text-lg font-semibold text-white">{t(`${card.key}.title`)}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/50">{t(`${card.key}.chip`)}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
