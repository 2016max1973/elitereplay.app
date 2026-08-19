import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CirclePlay } from "lucide-react";
import { getTranslations } from "next-intl/server";

import MatchBoardVisual from "@/components/MatchBoardVisual";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type ClubBenefit = {
  title: string;
  text: string;
};

type ExperienceStep = {
  label: string;
  title: string;
};

type ProductModule = {
  label: string;
  title: string;
  text: string;
  detail?: string;
};

type HowStep = {
  number: string;
  title: string;
  text: string;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ClubLanding" });
  const url = `https://elitereplay.de/${locale}`;

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: [
      "Padel SmartCourt",
      "Padel MatchBoard",
      "Padel Club Experience",
      "Padel Multi-Camera Replay",
      "Padel Club Content",
      "Padel Sponsorship",
    ],
    alternates: {
      canonical: url,
      languages: {
        de: "https://elitereplay.de/de",
        en: "https://elitereplay.de/en",
        es: "https://elitereplay.de/es",
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: "ÉliteReplay",
      locale: locale === "de" ? "de_DE" : locale === "es" ? "es_ES" : "en_US",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [
        {
          url: "/images/matchboard-real-reference.jpg",
          width: 1920,
          height: 1080,
          alt: t("meta.imageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: ["/images/matchboard-real-reference.jpg"],
    },
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ClubLanding" });
  const benefits = t.raw("clubValue.benefits") as ClubBenefit[];
  const experienceSteps = t.raw("action.steps") as ExperienceStep[];
  const products = t.raw("products.items") as ProductModule[];
  const howSteps = t.raw("how.steps") as HowStep[];

  return (
    <main id="content" className="club-home min-h-screen overflow-hidden bg-[#050505] pt-[76px] text-white">
      <section className="relative isolate min-h-[calc(100svh-76px)] overflow-hidden border-b border-white/10">
        <Image
          src="/images/elitereplay/sidecam-moment.jpg"
          alt={t("hero.imageAlt")}
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(3,4,6,0.98)_0%,rgba(3,4,6,0.92)_42%,rgba(3,4,6,0.42)_76%,rgba(3,4,6,0.52)_100%),linear-gradient(0deg,#050505_0%,transparent_45%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="mx-auto flex min-h-[calc(100svh-76px)] max-w-[1480px] items-end px-4 pb-14 pt-24 sm:px-6 sm:pb-20 lg:items-center lg:px-8 lg:py-24">
          <div className="home-reveal max-w-4xl">
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 className="mt-6 max-w-4xl text-balance text-[clamp(3.2rem,8vw,7.6rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
              {t("hero.title")}
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-xl font-medium leading-8 text-white/88 sm:text-2xl sm:leading-9">
              {t("hero.subtitle")}
            </p>
            <p className="mt-6 max-w-3xl text-sm font-semibold leading-7 text-white/58 sm:text-base">
              {t("hero.features")}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/48 sm:text-base sm:leading-7">
              {t("hero.statement")}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href={`/${locale}/contact`}>{t("hero.primary")}</PrimaryButton>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-[52px] rounded-full border-white/24 bg-black/30 px-7 font-bold text-white backdrop-blur-md hover:border-white/50 hover:bg-white/10 hover:text-white"
              >
                <Link href={`/${locale}#experience`}>
                  <CirclePlay aria-hidden="true" className="h-4 w-4" />
                  {t("hero.secondary")}
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.13em] text-white/38">{t("hero.trust")}</p>
          </div>
        </div>
      </section>

      <section id="content-engine" className="border-b border-white/10 bg-[#050505] py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="home-reveal max-w-6xl">
            <Eyebrow>{t("contentStory.eyebrow")}</Eyebrow>
            <h2 className="mt-6 text-balance text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
              {t("contentStory.title")}
            </h2>
          </div>

          <div className="mt-14 grid gap-14 sm:mt-16 lg:mt-20 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
            <div className="home-reveal space-y-2 text-[clamp(1.5rem,3.3vw,3rem)] font-semibold leading-[1.15] tracking-[-0.035em] text-white/30">
              <p className="text-white">{t("contentStory.everyDay")}</p>
              <p className="text-white/78">{t("contentStory.onCourts")}</p>
              <div className="pt-7">
                {(t.raw("contentStory.moments") as string[]).map((moment) => (
                  <p key={moment}>{moment}</p>
                ))}
              </div>
            </div>

            <div className="home-reveal overflow-hidden rounded-[1.75rem] border border-white/10 bg-black shadow-[0_40px_130px_rgba(0,0,0,0.58)]">
              <video
                className="aspect-video w-full bg-black object-cover"
                src="/deliveries/padel-germany-v1/final-highlights/h03_point_12_interleaved_match_moments_v5_final.mp4"
                poster="/deliveries/padel-germany-v1/posters/h03_last_topdown_frame.png"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                aria-label={t("contentStory.videoLabel")}
              />
            </div>
          </div>

          <div className="home-reveal mt-16 max-w-5xl border-t border-white/12 pt-12 sm:mt-20 sm:pt-16 lg:mt-24">
            <p className="text-balance text-2xl font-medium leading-tight tracking-[-0.03em] text-white/48 sm:text-4xl">
              {t("contentStory.disappears")}
            </p>
            <p className="mt-10 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:mt-12 sm:text-6xl">
              {t("contentStory.courtsCreate")}
            </p>
            <p className="mt-3 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#F5BE2D] sm:text-6xl">
              {t("contentStory.together")}
            </p>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/56">{t("contentStory.text")}</p>
          </div>
        </div>
      </section>

      <section id="clubs" className="bg-[#F1F0EB] py-20 text-[#101114] sm:py-28 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="home-reveal max-w-5xl">
            <Eyebrow dark>{t("clubValue.eyebrow")}</Eyebrow>
            <h2 className="mt-6 text-balance text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
              {t("clubValue.title")}
            </h2>
          </div>

          <div className="mt-14 border-t border-black/15 sm:mt-20">
            {benefits.map((benefit, index) => (
              <article key={benefit.title} className="home-reveal grid gap-5 border-b border-black/15 py-8 sm:py-10 lg:grid-cols-[120px_0.75fr_1.25fr] lg:items-start lg:gap-10">
                <span className="text-xs font-bold tracking-[0.2em] text-black/35">0{index + 1}</span>
                <h3 className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">{benefit.title}</h3>
                <p className="max-w-2xl text-base leading-7 text-black/58 sm:text-lg sm:leading-8">{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="border-y border-white/10 bg-[#08090B] py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="home-reveal max-w-5xl">
            <Eyebrow>{t("action.eyebrow")}</Eyebrow>
            <h2 className="mt-6 text-balance text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
              {t("action.title")}
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/58">{t("action.text")}</p>
          </div>

          <div className="home-reveal mx-auto mt-12 sm:mt-16">
            <MatchBoardVisual
              courtLabel={t("action.board.court")}
              liveLabel={t("action.board.live")}
              matchTimeLabel={t("action.board.time")}
              setLabel={t("action.board.set")}
              clubLabel={t("action.board.club")}
            />
          </div>

          <ol className="home-reveal mx-auto mt-10 grid border-y border-white/12 md:grid-cols-4 md:divide-x md:divide-white/10">
            {experienceSteps.map((step, index) => (
              <li key={step.label} className="border-b border-white/10 py-7 last:border-b-0 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#F5BE2D]">{step.label}</p>
                <p className="mt-3 text-lg font-semibold leading-6 tracking-[-0.025em]">{step.title}</p>
                {index < experienceSteps.length - 1 ? <ArrowRight aria-hidden="true" className="mt-5 hidden h-4 w-4 text-white/18 md:block" /> : null}
              </li>
            ))}
          </ol>

          <div className="home-reveal mx-auto mt-14 overflow-hidden rounded-[1.5rem] border border-white/10 sm:mt-20 sm:rounded-[2rem]">
            <video
              className="block aspect-video w-full object-cover"
              src="/videos/elitereplay-match-highlights.mp4"
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              aria-label={t("action.videoLabel")}
            />
          </div>
        </div>
      </section>

      <section id="matchboard" className="bg-[#050505] py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="home-reveal max-w-5xl">
            <Eyebrow>{t("products.eyebrow")}</Eyebrow>
            <h2 className="mt-6 text-balance text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
              {t("products.title")}
            </h2>
          </div>

          <div className="mt-14 space-y-20 sm:mt-20 sm:space-y-24 lg:space-y-28">
            {products.map((product, index) => (
              <article
                id={index === 1 ? "highlights" : undefined}
                key={product.label}
                className="home-reveal grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F5BE2D]">{product.label}</p>
                  <h3 className="mt-5 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl">{product.title}</h3>
                  <p className="mt-6 max-w-xl text-lg leading-8 text-white/58">{product.text}</p>
                  {product.detail ? <p className="mt-6 max-w-xl border-l border-[#F5BE2D]/60 pl-5 text-sm leading-6 text-white/40">{product.detail}</p> : null}
                </div>
                <ProductVisual index={index} t={t} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate min-h-[85svh] overflow-hidden border-y border-white/10">
        <Image
          src="/images/elitereplay/sidecam-moment.jpg"
          alt={t("sponsor.imageAlt")}
          fill
          sizes="100vw"
          className="-z-30 object-cover object-center"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(3,3,3,0.95),rgba(3,3,3,0.64)_55%,rgba(3,3,3,0.4)),linear-gradient(0deg,#050505,transparent_45%,rgba(0,0,0,0.28))]" />

        <div className="mx-auto grid min-h-[85svh] max-w-[1480px] items-center gap-16 px-4 py-24 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div className="home-reveal">
            <Eyebrow>{t("sponsor.eyebrow")}</Eyebrow>
            <h2 className="mt-6 text-balance text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
              {t("sponsor.title")}
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/62">{t("sponsor.text")}</p>
            <p className="mt-8 max-w-xl text-2xl font-semibold leading-8 tracking-[-0.03em]">{t("sponsor.closing")}</p>
          </div>

          <div className="home-reveal lg:justify-self-end">
            <div className="border-y border-[#F5BE2D]/55 py-8 text-center sm:px-14 sm:py-12">
              <p className="text-xs font-bold uppercase tracking-[0.34em] text-white/48">{t("sponsor.presentedBy")}</p>
              <p className="mt-5 text-4xl font-black tracking-[0.12em] sm:text-6xl">{t("sponsor.exampleBrand")}</p>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.28em] text-[#F5BE2D]">{t("sponsor.exampleMoment")}</p>
            </div>
            <p className="mt-4 text-center text-[0.62rem] uppercase tracking-[0.16em] text-white/32">{t("sponsor.pilotNote")}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#F1F0EB] py-20 text-[#101114] sm:py-28 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="home-reveal max-w-5xl">
            <Eyebrow dark>{t("how.eyebrow")}</Eyebrow>
            <h2 className="mt-6 text-balance text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.06em]">{t("how.title")}</h2>
          </div>
          <ol className="mt-14 grid border-y border-black/15 sm:mt-20 lg:grid-cols-3 lg:divide-x lg:divide-black/15">
            {howSteps.map((step) => (
              <li key={step.number} className="home-reveal border-b border-black/15 py-8 last:border-b-0 lg:border-b-0 lg:px-10 lg:py-10 lg:first:pl-0 lg:last:pr-0">
                <span className="text-xs font-bold tracking-[0.2em] text-black/35">{step.number}</span>
                <h3 className="mt-8 text-3xl font-semibold tracking-[-0.04em]">{step.title}</h3>
                <p className="mt-4 text-base leading-7 text-black/58">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="pilot" className="relative isolate overflow-hidden py-28 text-center sm:py-40 lg:py-52">
        <Image
          src="/images/matchboard-real-reference.jpg"
          alt={t("pilot.imageAlt")}
          fill
          sizes="100vw"
          className="-z-30 object-cover object-center opacity-48"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(0deg,rgba(3,3,3,0.98),rgba(3,3,3,0.68)_52%,rgba(3,3,3,0.94))]" />
        <div className="home-reveal mx-auto max-w-6xl px-4 sm:px-6">
          <Eyebrow>{t("pilot.eyebrow")}</Eyebrow>
          <h2 className="mt-6 text-balance text-[clamp(3.1rem,7.2vw,7rem)] font-semibold leading-[0.91] tracking-[-0.06em]">{t("pilot.title")}</h2>
          <p className="mx-auto mt-7 max-w-2xl text-xl leading-8 text-white/64 sm:text-2xl sm:leading-9">{t("pilot.text")}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryButton href={`/${locale}/contact`}>{t("pilot.primary")}</PrimaryButton>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-[52px] rounded-full border-white/24 bg-black/30 px-7 font-bold text-white backdrop-blur-md hover:border-white/50 hover:bg-white/10 hover:text-white"
            >
              <Link href={`/${locale}#experience`}>{t("pilot.secondary")}</Link>
            </Button>
          </div>
          <div className="mt-16 flex flex-col items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-white/34 sm:flex-row sm:gap-8">
            <span>{t("pilot.brandClaim")}</span>
            <span className="hidden h-px w-8 bg-white/20 sm:block" />
            <span>{t("pilot.trophyClaim")}</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductVisual({ index, t }: { index: number; t: Awaited<ReturnType<typeof getTranslations>> }) {
  if (index === 0) {
    return (
      <div>
        <MatchBoardVisual
          compact
          courtLabel={t("action.board.court")}
          liveLabel={t("action.board.live")}
          matchTimeLabel={t("action.board.time")}
          setLabel={t("action.board.set")}
          clubLabel={t("action.board.club")}
        />
      </div>
    );
  }

  if (index === 1) {
    const views = [
      ["/deliveries/padel-germany-v1/posters/h03_last_topdown_frame.png", "TopDown"],
      ["/images/elitereplay/sidecam-moment.jpg", "NetCam"],
      ["/images/elitereplay/netcam-moment.jpg", "SideCam"],
    ] as const;

    return (
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {views.map(([src, label]) => (
          <div key={label} className="relative overflow-hidden rounded-[1rem] border border-white/10">
            <div className="relative aspect-[3/5]">
              <Image src={src} alt={label} fill sizes="(min-width: 1024px) 16vw, 33vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/15" />
              <span className="absolute bottom-4 left-4 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#F5BE2D]">{label}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="relative aspect-[16/11] overflow-hidden rounded-[1.5rem] border border-white/10">
        <Image src="/images/MatchDown.jpg" alt={t("products.tournamentImageAlt")} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/5 to-black/20" />
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7">
          <div>
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#F5BE2D]">{t("products.tournamentStatus")}</p>
            <p className="mt-2 text-xl font-semibold sm:text-2xl">{t("products.tournamentCourt")}</p>
          </div>
          <p className="text-right text-xs font-semibold text-white/55">{t("products.tournamentNext")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/11] overflow-hidden rounded-[1.5rem] border border-white/10">
      <Image src="/images/elitereplay/netcam-moment.jpg" alt={t("products.myMomentImageAlt")} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/15" />
      <span className="absolute bottom-5 left-5 rounded-full border border-[#F5BE2D]/40 bg-black/60 px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#F5BE2D] backdrop-blur-md sm:bottom-7 sm:left-7">
        MyMoment
      </span>
    </div>
  );
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`text-xs font-bold uppercase tracking-[0.22em] ${dark ? "text-[#8A6712]" : "text-[#F5BE2D]"}`}>{children}</p>;
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Button asChild size="lg" className="h-[52px] rounded-full bg-[#F5BE2D] px-7 font-bold text-black hover:bg-[#F7CC58]">
      <Link href={href}>
        {children}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </Button>
  );
}
