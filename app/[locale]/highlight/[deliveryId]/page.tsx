import { notFound } from "next/navigation";
import MatchDetailPage from "@/components/MatchDetailPage";
import { findMatchDeliveryByDeliveryId } from "@/data/match-deliveries";

type HighlightDetailRouteProps = {
  params: Promise<{ locale: string; deliveryId: string }>;
};

export default async function HighlightDetailRoute({
  params,
}: HighlightDetailRouteProps) {
  const { locale, deliveryId } = await params;
  const delivery = await findMatchDeliveryByDeliveryId(deliveryId);

  if (!delivery) {
    notFound();
  }

  return (
    <MatchDetailPage
      delivery={delivery}
      locale={locale}
      canonicalPath={`https://elitereplay.de/highlight/${delivery.deliveryId}`}
    />
  );
}
