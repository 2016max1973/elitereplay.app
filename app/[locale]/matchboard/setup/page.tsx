import { notFound } from "next/navigation";

import { locales, type Locale } from "@/i18n/config";

type SearchParams = Promise<{
  pilot?: string;
}>;

type Copy = {
  eyebrow: string;
  title: string;
  body: string;
  pilotCode: string;
  note: string;
};

const copyByLocale: Record<Locale, Copy> = {
  de: {
    eyebrow: "Öffentliches Pilot-Setup",
    title: "MatchBoard Setup",
    body: "Hier werden Teamnamen und Sessiondaten eingegeben.",
    pilotCode: "Pilot-Code",
    note: "Keine Backend-Logik, keine Jetson-Abhängigkeit und kein lokales WLAN nötig.",
  },
  en: {
    eyebrow: "Public pilot setup",
    title: "MatchBoard Setup",
    body: "Team names and session data will be entered here.",
    pilotCode: "Pilot code",
    note: "No backend logic, no Jetson dependency and no local Wi-Fi required.",
  },
  es: {
    eyebrow: "Setup público piloto",
    title: "MatchBoard Setup",
    body: "Aquí se introducirán los nombres de los equipos y los datos de la sesión.",
    pilotCode: "Código piloto",
    note: "Sin lógica backend, sin dependencia de Jetson y sin Wi-Fi local.",
  },
};

export default async function MatchBoardSetupPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const { locale } = await params;
  const { pilot } = await searchParams;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const t = copyByLocale[locale as Locale] ?? copyByLocale.en;
  const pilotCode = pilot?.trim() || "mg_pilot_01";

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-24 text-[#f4efe4]">
      <section className="mx-auto max-w-3xl rounded-xl border border-[#c9a24d]/30 bg-black/55 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c9a24d]">
          {t.eyebrow}
        </p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
          {t.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#f4efe4]/75">
          {t.body}
        </p>
        <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f4efe4]/55">
            {t.pilotCode}
          </p>
          <p className="mt-2 break-all text-2xl font-bold text-[#c9a24d]">
            {pilotCode}
          </p>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-[#f4efe4]/55">
          {t.note}
        </p>
      </section>
    </main>
  );
}
