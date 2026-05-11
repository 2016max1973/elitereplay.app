import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CampDeliveryPage from "@/components/CampDeliveryPage";
import {
  camps,
  getCampAccessKey,
  getVisibleCampHighlights,
  isCampSlug,
} from "@/data/camps";

export const metadata: Metadata = {
  title: "Private Camp Highlights | ÉliteReplay",
  robots: {
    index: false,
    follow: false,
  },
};

type CampPageProps = {
  params: Promise<{ locale: string; camp: string }>;
  searchParams: Promise<{ key?: string }>;
};

export default async function CampPage({ params, searchParams }: CampPageProps) {
  const { locale, camp: campParam } = await params;
  const { key } = await searchParams;

  if (!isCampSlug(campParam)) {
    notFound();
  }

  const camp = camps[campParam];

  // Temporary privacy gate only. This is not real authentication.
  const hasAccess = key === getCampAccessKey(camp);

  return (
    <CampDeliveryPage
      camp={camp}
      highlights={hasAccess ? getVisibleCampHighlights(camp) : []}
      hasAccess={hasAccess}
      locale={locale}
    />
  );
}
