import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import LegalDocument, { type LegalSection } from "@/components/LegalDocument";
import styles from "./privacy.module.css";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "capturePrivacy.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://elitereplay.de/${locale}/privacy/capture`,
      languages: {
        de: "https://elitereplay.de/de/privacy/capture",
        es: "https://elitereplay.de/es/privacy/capture",
        en: "https://elitereplay.de/en/privacy/capture",
        "x-default": "https://elitereplay.de/de/privacy/capture",
      },
    },
  };
}

export default async function CapturePrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "capturePrivacy" });

  return (
    <LegalDocument
      className={styles.compact}
      title={t("title")}
      subtitle={t("subtitle")}
      lastUpdated={t("lastUpdated")}
      sections={t.raw("sections") as LegalSection[]}
    />
  );
}
