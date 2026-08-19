import { notFound } from "next/navigation";

import MatchBoardPilotStart from "@/components/MatchBoardPilotStart";
import { locales, type Locale } from "@/i18n/config";

type SearchParams = Promise<{
  pilot?: string;
}>;

export default async function MatchBoardStartPage({
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

  return (
    <MatchBoardPilotStart
      locale={locale as Locale}
      pilotCode={pilot?.trim() || "mg_pilot_01"}
    />
  );
}
