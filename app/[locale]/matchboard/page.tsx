import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MatchBoardPage" });
  const url = `https://elitereplay.de/${locale}/matchboard`;

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: url,
      languages: {
        de: "https://elitereplay.de/de/matchboard",
        en: "https://elitereplay.de/en/matchboard",
        es: "https://elitereplay.de/es/matchboard",
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
          alt: t("hero.imageAlt"),
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

export default async function MatchBoardPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MatchBoardPage" });
  const contextSignals = t.raw("core.signals") as ContextSignal[];
  const highlightFlow = t.raw("highlight.flow") as string[];
  const historySteps = t.raw("history.steps") as string[];
  const dnaMatches = t.raw("dna.matches") as DnaMatch[];
  const dnaOutputs = t.raw("dna.outputs") as string[];
  const teamInsights = t.raw("dna.teamInsights") as TeamInsight[];
  const clubBenefits = t.raw("clubs.benefits") as string[];

  return (
    <main id="content" className="min-h-screen overflow-hidden bg-[#050505] pt-[76px] text-white">
      <section className="relative isolate min-h-[calc(100svh-76px)] overflow-hidden border-b border-white/10">
        <Image
          src="/images/matchboard-real-reference.jpg"
          alt={t("hero.imageAlt")}
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover object-center"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(3,4,6,0.98)_0%,rgba(3,4,6,0.88)_42%,rgba(3,4,6,0.5)_76%,rgba(3,4,6,0.58)_100%),linear-gradient(0deg,#050505_0%,transparent_48%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="mx-auto grid min-h-[calc(100svh-76px)] max-w-[1480px] items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16 lg:px-8 lg:py-20">
          <div className="order-2 max-w-4xl lg:order-1">
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 className="mt-6 max-w-4xl text-balance text-[clamp(3.25rem,7vw,7rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
              {t("hero.title")}
            </h1>
            <p className="mt-7 max-w-3xl text-pretty text-lg font-medium leading-8 text-white/82 sm:text-2xl sm:leading-9">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="order-1 lg:order-2 lg:justify-self-end">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.25rem] border border-white/20 bg-black shadow-[0_35px_110px_rgba(0,0,0,0.65)] sm:rounded-[1.75rem] lg:w-[min(58vw,760px)]">
              <Image
                src="/images/matchboard-real-reference.jpg"
                alt={t("hero.screenAlt")}
                fill
                priority
                sizes="(min-width: 1024px) 760px, 100vw"
                className="origin-top-left scale-[1.52] object-cover object-left-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-6">
                <div>
                  <p className="text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#F5BE2D]">{t("hero.screenLabel")}</p>
                  <p className="mt-2 text-xs font-semibold text-white/76 sm:text-sm">{t("hero.screenCaption")}</p>
                </div>
                <span className="shrink-0 rounded-full border border-[#F5BE2D]/55 bg-black/65 px-3 py-2 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#F5BE2D] backdrop-blur-md">
                  {t("hero.liveLabel")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <Eyebrow>{t("core.eyebrow")}</Eyebrow>
            <h2 className="mt-6 text-balance text-[clamp(2.8rem,5.6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
              {t("core.title")}
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/58">{t("core.text")}</p>
          </div>

          <div className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-[0.72fr_1.56fr_0.72fr] lg:items-center">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contextSignals.slice(0, 3).map((signal) => <ContextSignalView key={signal.label} signal={signal} />)}
            </div>

            <div className="relative aspect-video overflow-hidden rounded-[1.4rem] border border-white/14 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:rounded-[2rem]">
              <Image
                src="/images/matchboard-real-reference.jpg"
                alt={t("core.imageAlt")}
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/88 via-black/30 to-transparent p-5 pt-14 sm:p-7 sm:pt-20">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#F5BE2D]">{t("core.visualLabel")}</p>
                <p className="mt-2 text-sm font-semibold text-white/76">{t("core.visualCaption")}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contextSignals.slice(3).map((signal) => <ContextSignalView key={signal.label} signal={signal} />)}
            </div>
          </div>
          <p className="mt-5 text-center text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/32">{t("core.sampleNote")}</p>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#08090B] py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <Eyebrow>{t("myMoment.eyebrow")}</Eyebrow>
            <h2 className="mt-5 text-balance text-[clamp(2.7rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.055em]">
              {t("myMoment.title")}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/58">{t("myMoment.text")}</p>
            <p className="mt-7 text-xl font-semibold tracking-[-0.03em] text-white">{t("myMoment.action")}</p>
          </div>
          <div className="relative aspect-[16/8.5] overflow-hidden rounded-[1.4rem] border border-white/12 bg-black sm:rounded-[2rem]">
            <Image
              src="/images/elitereplay/netcam-moment.jpg"
              alt={t("myMoment.imageAlt")}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/20" />
            <span className="absolute bottom-5 left-5 rounded-full border border-[#F5BE2D]/50 bg-black/70 px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#F5BE2D] backdrop-blur-md sm:bottom-7 sm:left-7">
              {t("myMoment.marked")}
            </span>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
            <div>
              <Eyebrow>{t("highlight.eyebrow")}</Eyebrow>
              <h2 className="mt-6 text-balance text-[clamp(2.9rem,5.8vw,5.6rem)] font-semibold leading-[0.91] tracking-[-0.06em]">
                {t("highlight.title")}
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/58">{t("highlight.text")}</p>
              <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-white/82">{t("highlight.logic")}</p>
            </div>

            <div className="overflow-hidden rounded-[1.4rem] border border-white/12 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:rounded-[2rem]">
              <video
                className="block aspect-video w-full object-cover"
                src="/deliveries/padel-germany-v1/final-highlights/h03_point_12_interleaved_match_moments_v5_final.mp4"
                poster="/deliveries/padel-germany-v1/posters/h03_last_topdown_frame.png"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                aria-label={t("highlight.videoLabel")}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-y border-white/14 py-6 sm:flex-row sm:gap-3">
            {highlightFlow.map((step, index) => (
              <div key={step} className="contents">
                <span className="text-center text-sm font-bold uppercase tracking-[0.16em] text-white/76 sm:text-[0.7rem] lg:text-sm">{step}</span>
                {index < highlightFlow.length - 1 ? (
                  <ArrowRight aria-hidden="true" className="h-4 w-4 rotate-90 text-[#F5BE2D] sm:rotate-0" />
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <PerspectiveFrame src="/deliveries/padel-germany-v1/posters/h03_last_topdown_frame.png" label="TopDown" alt={t("highlight.topDownAlt")} />
            <PerspectiveFrame src="/images/elitereplay/sidecam-moment.jpg" label="SideCam" alt={t("highlight.sideCamAlt")} />
            <PerspectiveFrame src="/images/elitereplay/netcam-moment.jpg" label="NetCam" alt={t("highlight.netCamAlt")} />
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-6 text-white/38">{t("highlight.note")}</p>
        </div>
      </section>

      <section className="bg-[#F1F0EB] py-20 text-[#101114] sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div>
              <Eyebrow dark>{t("history.eyebrow")}</Eyebrow>
              <h2 className="mt-6 text-balance text-[clamp(2.7rem,5vw,4.9rem)] font-semibold leading-[0.94] tracking-[-0.055em]">
                {t("history.title")}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-black/58">{t("history.text")}</p>
            </div>

            <ol className="border-t border-black/15">
              {historySteps.map((step, index) => (
                <li key={step} className="grid grid-cols-[44px_1fr] items-center gap-4 border-b border-black/15 py-5 sm:grid-cols-[64px_1fr]">
                  <span className="text-[0.62rem] font-bold tracking-[0.2em] text-[#8A6712]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-base font-semibold tracking-[-0.025em] sm:text-xl">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 border-t border-black/15 pt-14 sm:mt-20 sm:pt-16">
            <Eyebrow dark>{t("dna.eyebrow")}</Eyebrow>
            <h2 className="mt-6 max-w-5xl text-balance text-[clamp(3rem,6.2vw,6rem)] font-semibold leading-[0.9] tracking-[-0.062em]">
              {t("dna.title")}
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-black/58">{t("dna.text")}</p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.22fr_0.78fr] lg:gap-16">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-black/38">{t("dna.matchesLabel")}</p>
              <ol className="mt-4 border-t border-black/15">
                {dnaMatches.map((match, index) => (
                  <li key={match.number} className="relative grid gap-4 border-b border-black/15 py-6 sm:grid-cols-[80px_1fr_auto] sm:items-center">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A6712]">{match.number}</span>
                    <div>
                      <p className="text-xl font-semibold tracking-[-0.03em]">{match.team}</p>
                      <p className="mt-1 text-sm text-black/48">{match.opponents}</p>
                    </div>
                    <p className="text-sm font-semibold text-black/62 sm:text-right">{match.outcome}</p>
                    {index < dnaMatches.length - 1 ? <span aria-hidden="true" className="absolute -bottom-2 left-8 h-4 w-px bg-[#F5BE2D] sm:left-10" /> : null}
                  </li>
                ))}
              </ol>
              <div className="border-b border-black/15 py-8 text-center">
                <ArrowRight aria-hidden="true" className="mx-auto h-5 w-5 rotate-90 text-[#8A6712]" />
                <p className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{t("dna.grows")}</p>
              </div>
              <div className="grid grid-cols-2 border-b border-black/15 sm:grid-cols-3">
                {dnaOutputs.map((item) => (
                  <span key={item} className="border-r border-black/10 px-3 py-4 text-center text-[0.66rem] font-bold uppercase tracking-[0.15em] text-black/58 last:border-r-0">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <aside className="border-t border-black/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0" aria-label={t("dna.teamLabel")}>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#8A6712]">{t("dna.teamLabel")}</p>
              <h3 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">{t("dna.teamTitle")}</h3>
              <dl className="mt-8 border-t border-black/15">
                {teamInsights.map((insight) => (
                  <div key={insight.label} className="flex items-baseline justify-between gap-5 border-b border-black/15 py-4">
                    <dt className="text-sm text-black/48">{insight.label}</dt>
                    <dd className="text-right text-lg font-semibold tracking-[-0.025em]">{insight.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-sm leading-6 text-black/45">{t("dna.teamNote")}</p>
            </aside>
          </div>

          <div className="mt-14 border-t border-black/15 pt-10 sm:mt-16 sm:pt-12">
            <div className="flex flex-col gap-4 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-black/48 sm:flex-row sm:items-center sm:gap-5">
              <span>{t("continuity.identity")}</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 rotate-90 text-[#8A6712] sm:rotate-0" />
              <span>{t("continuity.history")}</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 rotate-90 text-[#8A6712] sm:rotate-0" />
              <span>{t("continuity.dna")}</span>
            </div>
            <h3 className="mt-7 max-w-5xl text-balance text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[0.94] tracking-[-0.055em]">{t("continuity.title")}</h3>
            <p className="mt-6 max-w-3xl text-base leading-7 text-black/52">{t("continuity.text")}</p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.76fr_1.24fr] lg:gap-20 lg:px-8">
          <div>
            <Eyebrow>{t("nextMatch.eyebrow")}</Eyebrow>
            <h2 className="mt-5 text-balance text-[clamp(2.7rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.055em]">{t("nextMatch.title")}</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/58">{t("nextMatch.text")}</p>
          </div>
          <div className="border-t border-white/14 pt-7 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <Eyebrow>{t("clubs.eyebrow")}</Eyebrow>
            <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">{t("clubs.title")}</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/52">{t("clubs.text")}</p>
            <ul className="mt-7 grid border-t border-white/12 sm:grid-cols-2">
                {clubBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 border-b border-white/12 py-4 text-sm font-semibold text-white/72 sm:pr-5 sm:odd:border-r sm:even:pl-5">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5BE2D]" />
                    {benefit}
                  </li>
                ))}
              </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

type ContextSignal = {
  label: string;
  value: string;
};

type DnaMatch = {
  number: string;
  team: string;
  opponents: string;
  outcome: string;
};

type TeamInsight = {
  label: string;
  value: string;
};

function ContextSignalView({ signal }: { signal: ContextSignal }) {
  return (
    <div className="border-l border-[#F5BE2D]/55 bg-white/[0.035] px-5 py-4">
      <p className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#F5BE2D]">{signal.label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-white/82">{signal.value}</p>
    </div>
  );
}

function PerspectiveFrame({ src, label, alt }: { src: string; label: string; alt: string }) {
  return (
    <figure className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-black">
      <Image src={src} alt={alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
      <figcaption className="absolute bottom-3 left-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white">{label}</figcaption>
    </figure>
  );
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.22em] ${dark ? "text-[#8A6712]" : "text-[#F5BE2D]"}`}>
      {children}
    </p>
  );
}
