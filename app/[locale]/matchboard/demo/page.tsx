import type { Metadata } from "next";
import MatchBoardWebsiteDemo from "@/components/MatchBoardWebsiteDemo";
import { matchboardDemoCopy } from "@/lib/matchboard-demo-contact";

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ view?: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = matchboardDemoCopy(locale);
  return { title: copy.title, description: copy.intro, alternates: { canonical: `https://elitereplay.de/${locale}/matchboard/demo` } };
}
export default async function MatchBoardDemoPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { view } = await searchParams;
  return <MatchBoardWebsiteDemo locale={locale} initialView={view === "history" ? "history" : "matchboard"} />;
}
