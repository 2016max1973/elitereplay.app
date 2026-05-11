import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

type RedirectPageProps = {
  searchParams: Promise<{ key?: string }>;
};

export default async function CampARedirectPage({
  searchParams,
}: RedirectPageProps) {
  const { key } = await searchParams;
  redirect(`/de/camp/camp-1${key ? `?key=${encodeURIComponent(key)}` : ""}`);
}
