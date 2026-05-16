import Image from "next/image";
import { LockKeyhole } from "lucide-react";
import type { CampArchive, CampHighlight } from "@/data/camps";
import CampHighlightCard from "@/components/CampHighlightCard";

type CampDeliveryPageProps = {
  camp: CampArchive;
  highlights: CampHighlight[];
  hasAccess: boolean;
  locale: string;
};

export default function CampDeliveryPage({
  camp,
  highlights,
  hasAccess,
  locale: _locale,
}: CampDeliveryPageProps) {
  const [heroHighlight, ...gridHighlights] = highlights;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            main[data-private-camp-page="true"] + footer {
              display: none;
            }
          `,
        }}
      />
      <main
        className="min-h-screen bg-[#050505] text-white"
        data-private-camp-page="true"
      >
        <header className="border-b border-white/10 bg-black/80">
        <div className="container mx-auto flex items-center justify-between px-4 py-5">
          <div
            className="flex items-center"
            aria-label="ÉliteReplay private camp archive"
          >
            <Image
              src="/images/elitereplay-logo.png"
              alt="ÉliteReplay Logo"
              width={150}
              height={75}
              className="select-none"
            />
          </div>
          <span className="hidden rounded-full border border-[#D6B25E]/30 bg-[#D6B25E]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#D6B25E] sm:inline-flex">
            Private Archive
          </span>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-black via-[#051937]/60 to-[#050505] py-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,178,94,0.14),transparent_36%)]" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-[#D6B25E]/30 bg-[#D6B25E]/10 px-4 py-2 text-sm font-semibold text-[#D6B25E]">
              <LockKeyhole className="mr-2 h-4 w-4" />
              {camp.label}
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              ÉliteReplay Camp Moments
            </h1>
            <h2 className="mt-4 text-2xl font-semibold text-[#D6B25E] md:text-3xl">
              {camp.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
              Hier findest du ausgewählte Match-Momente aus deinem Camp. Du
              kannst die Clips ansehen und als MP4 herunterladen. Bitte teile
              private Downloadlinks nicht öffentlich.
            </p>
            <p className="mt-5 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-gray-400">
              Wenn du ein Video entfernen lassen möchtest, schreibe an
              info@elitereplay.es.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {!hasAccess ? (
            <div className="mx-auto max-w-2xl rounded-2xl border border-[#D6B25E]/25 bg-[#111111] p-8 text-center shadow-2xl shadow-black/40">
              <LockKeyhole className="mx-auto mb-5 h-10 w-10 text-[#D6B25E]" />
              <h2 className="text-2xl font-semibold text-white">
                Dieses Camp-Archiv ist privat.
              </h2>
              <p className="mt-3 text-gray-400">
                Bitte nutze den Direktlink, den du erhalten hast.
              </p>
              <p className="mt-5 text-xs leading-relaxed text-gray-500">
                Dies ist ein einfacher temporärer Zugangsschutz, keine echte
                Authentifizierung.
              </p>
            </div>
          ) : highlights.length > 0 ? (
            <div className="space-y-10">
              {heroHighlight ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B25E]">
                        Hero Highlight
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                        Erster Match-Moment
                      </h2>
                    </div>
                  </div>
                  <CampHighlightCard highlight={heroHighlight} variant="hero" />
                </div>
              ) : null}

              {gridHighlights.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B25E]">
                        Weitere Highlights
                      </p>
                      <h2 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                        Kompakte Uebersicht
                      </h2>
                    </div>
                    <p className="text-sm text-gray-500">
                      {gridHighlights.length} weitere Clips
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {gridHighlights.map((highlight) => (
                      <CampHighlightCard
                        key={`${highlight.sort_order}-${highlight.title}`}
                        highlight={highlight}
                        variant="grid"
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#111111] p-8 text-center">
              <h2 className="text-2xl font-semibold text-white">
                Highlights werden vorbereitet
              </h2>
              <p className="mt-3 text-gray-400">
                Sobald Clips freigegeben sind, erscheinen sie hier. Es werden
                keine Platzhalter-Videos angezeigt.
              </p>
            </div>
          )}

          <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-gray-500">
            Diese Seite ist nur für Teilnehmer mit Direktlink gedacht. Bitte
            teile private Downloadlinks nicht öffentlich. Kontakt:
            info@elitereplay.es
          </p>
        </div>
        </section>
      </main>
    </>
  );
}
