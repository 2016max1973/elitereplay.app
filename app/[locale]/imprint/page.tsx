import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import LegalDocument, { type LegalSection } from "@/components/LegalDocument";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "imprint.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://elitereplay.de/${locale}/imprint`,
      languages: {
        de: "https://elitereplay.de/de/imprint",
        es: "https://elitereplay.de/es/imprint",
        en: "https://elitereplay.de/en/imprint",
        "x-default": "https://elitereplay.de/de/imprint",
      },
    },
  };
}

export default async function ImprintPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "imprint" });

  return (
    <LegalDocument
      title={t("title")}
      subtitle={t("subtitle")}
      lastUpdated={t("lastUpdated")}
      sections={t.raw("sections") as LegalSection[]}
    />
  );
}
