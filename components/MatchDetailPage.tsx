import Image from "next/image";
import Link from "next/link";
import { Download, QrCode } from "lucide-react";
import type { MatchDelivery } from "@/data/match-deliveries";

type MatchDetailPageProps = {
  delivery: MatchDelivery;
  locale: string;
  canonicalPath: string;
};

function getFactValue(delivery: MatchDelivery, label: string) {
  return delivery.matchFacts.find((fact) => fact.label === label)?.value || "";
}

export default function MatchDetailPage({
  delivery,
  locale,
  canonicalPath,
}: MatchDetailPageProps) {
  const club = getFactValue(delivery, "Club");
  const court = getFactValue(delivery, "Court");

  const facts = [
    { label: "Club", value: club },
    { label: "Court", value: court },
    { label: "Session", value: "First Pilot Test" },
    { label: "Feature", value: "MatchBoard & Highlights" },
  ].filter((fact) => fact.value);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/10 bg-black/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image
              src="/images/elitereplay-logo.png"
              alt="ÉliteReplay Logo"
              width={150}
              height={75}
              className="h-auto w-[120px] select-none transition-opacity hover:opacity-80 sm:w-[150px]"
            />
          </Link>

          <div className="inline-flex items-center rounded-full border border-[#D6B25E]/20 bg-[#D6B25E]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D6B25E]">
            Teilbarer Highlight-Link
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,178,94,0.18),transparent_32%),linear-gradient(180deg,#050505_0%,#07111d_42%,#050505_100%)]" />
        <div className="relative mx-auto max-w-[1480px] px-4 pb-12 pt-12 sm:px-6 md:pb-16 md:pt-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_360px] lg:items-end">
            <div className="max-w-5xl">
              <span className="inline-flex rounded-full border border-[#D6B25E]/25 bg-[#D6B25E]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D6B25E]">
                First Pilot Test
              </span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                ÉliteReplay MatchBoard & Highlights
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
                Padel Germany · Center Court
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-400 sm:text-base">
                Your score. Your moment. Your highlight.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={delivery.heroVideoSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#D6B25E]/35 bg-[#D6B25E]/12 px-5 py-3 text-sm font-semibold text-[#F4E7C0] transition-colors hover:bg-[#D6B25E]/18"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Highlight öffnen
                </a>
                <a
                  href="#compare-angles"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.07]"
                >
                  NetCam Duel
                </a>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.42)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6B25E]">
                Highlight-Link
              </p>
              <p className="mt-3 break-all text-sm leading-relaxed text-gray-300">
                {canonicalPath}
              </p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Share this pilot
                </p>
                <p className="mt-2 text-sm text-white">Per WhatsApp oder QR teilen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-4 pb-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0a0c] shadow-[0_36px_90px_rgba(0,0,0,0.45)]">
          <div className="relative aspect-[16/10] bg-black sm:aspect-video">
            <video
              className="h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster={delivery.heroPosterSrc}
              src={delivery.heroVideoSrc}
            />
          </div>
        </div>
      </section>

      <section
        id="compare-angles"
        className="mx-auto max-w-[1480px] px-4 pb-10 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B25E]">
              ÉliteReplay
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              NetCam Duel
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
              Zieh den Slider und vergleiche Punkt 12 aus beiden NetCam-Perspektiven.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0a0c] shadow-[0_36px_90px_rgba(0,0,0,0.45)]">
          <iframe
            src="/netcam-compare-test/viewer.html"
            title="ÉliteReplay NetCam Compare Viewer"
            className="h-[68vh] min-h-[420px] w-full border-0 md:min-h-[560px]"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-4 pb-16 sm:px-6 lg:px-8">
        {delivery.finalHighlights && delivery.finalHighlights.length > 0 ? (
          <div className="mb-10">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B25E]">
                Final Highlights
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Final Highlights
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {delivery.finalHighlights.map((highlight) => (
                <article
                  key={highlight.src}
                  className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b0e] shadow-[0_24px_70px_rgba(0,0,0,0.3)]"
                >
                  <div className="relative aspect-video bg-black">
                    <video
                      className="h-full w-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                      poster={highlight.posterSrc || undefined}
                      src={highlight.src}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 p-4">
                    <div>
                      <h3 className="text-base font-semibold text-white">{highlight.title}</h3>
                    </div>

                    <a
                      href={highlight.src}
                      download={highlight.downloadName}
                      className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#D6B25E]/30 bg-[#D6B25E]/10 px-4 py-2 text-xs font-semibold text-[#F4E7C0] transition-colors hover:bg-[#D6B25E]/15"
                    >
                      Download
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                  {fact.label}
                </p>
                <p className="mt-3 text-lg font-semibold leading-snug text-white">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6B25E]">
              Share this pilot
            </p>
            <div className="mt-4 flex items-center gap-4">
              {delivery.shareQrSrc ? (
                <div className="flex h-[96px] w-[96px] items-center justify-center rounded-2xl border border-white/10 bg-white p-2">
                  <Image
                    src={delivery.shareQrSrc}
                    alt="ÉliteReplay QR Code"
                    width={88}
                    height={88}
                    className="h-auto w-full"
                  />
                </div>
              ) : null}

              <div>
                <p className="text-sm font-semibold text-white">Per WhatsApp oder QR teilen.</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  Ein Link reicht, um Highlight und NetZone direkt zu oeffnen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
