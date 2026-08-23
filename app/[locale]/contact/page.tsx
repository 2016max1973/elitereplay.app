import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

import ClubContactForm from "@/components/ClubContactForm";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://elitereplay.de/${locale}/contact`,
      languages: {
        de: "https://elitereplay.de/de/contact",
        en: "https://elitereplay.de/en/contact",
        es: "https://elitereplay.de/es/contact",
      },
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const useCases = ["clubs", "courts", "tournaments", "camps", "hotels", "sponsorEvents"] as const;

  return (
    <main className="min-h-screen bg-[#050505] pt-[76px] text-white">
      <section className="relative overflow-hidden border-b border-white/10 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(245,190,45,0.14),transparent_34%)]" />
        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}#pilot`}
            className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-white/54 hover:text-[#F5BE2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5BE2D]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            {t("clubForm.back")}
          </Link>
          <p className="mt-9 text-xs font-bold uppercase tracking-[0.22em] text-[#F5BE2D]">
            {t("clubForm.pageEyebrow")}
          </p>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            {t("clubForm.pageTitle")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
            {t("clubForm.pageDescription")}
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <aside className="space-y-7">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-6">
              <Mail aria-hidden="true" className="h-5 w-5 text-[#F5BE2D]" />
              <h2 className="mt-5 text-lg font-semibold">{t("clubForm.directTitle")}</h2>
              <p className="mt-2 text-sm leading-6 text-white/52">{t("clubForm.directText")}</p>
              <a
                href="mailto:contact@elitereplay.de"
                className="mt-4 inline-block font-semibold text-[#F5BE2D] underline decoration-[#F5BE2D]/35 underline-offset-4"
              >
                contact@elitereplay.de
              </a>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-6">
              <MapPin aria-hidden="true" className="h-5 w-5 text-[#F5BE2D]" />
              <h2 className="mt-5 text-lg font-semibold">{t("clubForm.useCaseTitle")}</h2>
              <ul className="mt-4 grid gap-2 text-sm text-white/58">
                {useCases.map((key) => (
                  <li key={key}>{t(`clubForm.useCases.${key}`)}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 rounded-[20px] border border-[#F5BE2D]/20 bg-[#F5BE2D]/7 p-5 text-sm leading-6 text-white/64">
              <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#F5BE2D]" />
              <p>{t("clubForm.privacyNote")}</p>
            </div>
          </aside>

          <ClubContactForm />
        </div>
      </section>
    </main>
  );
}
