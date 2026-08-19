import { notFound } from "next/navigation";
import MatchDetailPage from "@/components/MatchDetailPage";
import { findMatchDeliveryByMatchId } from "@/data/match-deliveries";

type MatchDetailRouteProps = {
  params: Promise<{ locale: string; matchId: string }>;
};

export default async function MatchDetailRoute({ params }: MatchDetailRouteProps) {
  const { locale, matchId } = await params;
  const delivery = await findMatchDeliveryByMatchId(matchId);

  if (!delivery) {
    notFound();
  }

  return (
    <MatchDetailPage
      delivery={delivery}
      locale={locale}
      canonicalPath={`https://elitereplay.de/match/${delivery.matchId}`}
    />
  );
}
