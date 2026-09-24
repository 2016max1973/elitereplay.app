import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import LegalDocument, { type LegalSection } from "@/components/LegalDocument";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://elitereplay.de/${locale}/privacy`,
      languages: {
        de: "https://elitereplay.de/de/privacy",
        es: "https://elitereplay.de/es/privacy",
        en: "https://elitereplay.de/en/privacy",
        "x-default": "https://elitereplay.de/de/privacy",
      },
    },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <LegalDocument
      title={t("title")}
      subtitle={t("subtitle")}
      lastUpdated={t("lastUpdated")}
      sections={t.raw("sections") as LegalSection[]}
    />
  );
}
