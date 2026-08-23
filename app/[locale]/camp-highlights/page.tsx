import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, LockKeyhole } from "lucide-react";

export const metadata: Metadata = {
  title: "Private Camp Highlights | ÉliteReplay",
  robots: {
    index: false,
    follow: false,
  },
};

type CampHighlightsPageProps = {
  params: Promise<{ locale: string }>;
};

const camps = ["Camp A", "Camp B"];

export default async function CampHighlightsPage({
  params,
}: CampHighlightsPageProps) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-black via-[#051937] to-black py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,190,45,0.14),transparent_35%)]" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-[#F5BE2D]/30 bg-[#F5BE2D]/10 px-4 py-2 text-sm font-semibold text-[#F5BE2D]">
              <LockKeyhole className="mr-2 h-4 w-4" />
              Einfacher Teilnehmerbereich
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
              <span className="bg-gradient-to-r from-white via-[#F5BE2D] to-white bg-clip-text text-transparent">
                Private Camp Highlights
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 md:text-2xl">
              Diese Seite ist nur für Teilnehmer gedacht, die den direkten Link
              erhalten haben.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-black to-blue-800/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            {camps.map((camp) => (
              <article
                key={camp}
                className="rounded-2xl border border-gray-800 bg-black/40 p-8 shadow-2xl shadow-[#F5BE2D]/10"
              >
                <h2 className="mb-4 text-3xl font-bold text-white">{camp}</h2>
                <div className="mb-6 rounded-xl border border-dashed border-[#F5BE2D]/40 bg-[#F5BE2D]/10 p-6">
                  <p className="text-lg font-semibold text-white">Privater Bereich</p>
                  <p className="mt-2 text-sm text-gray-400">
                    Highlight-Links werden nur direkt an berechtigte Teilnehmer
                    weitergegeben.
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-[#F5BE2D]/30 bg-[#F5BE2D]/10 p-6 text-gray-200">
            Bitte teile private Downloadlinks nicht öffentlich. Wenn du ein
            Video entfernen lassen möchtest, schreibe an contact@elitereplay.de.
          </div>

          <div className="mt-12 text-center">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center text-[#F5BE2D] transition-colors hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zur ÉliteReplay Startseite
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
