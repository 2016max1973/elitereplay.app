import { redirect } from "next/navigation";

type StartRedirectPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function StartRedirectPage({
  searchParams,
}: StartRedirectPageProps) {
  const params = await searchParams;
  const court = firstParam(params.court);
  const query = court ? `?court=${encodeURIComponent(court)}` : "";

  redirect(`/de/start${query}`);
}
