import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

type CampPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ key?: string }>;
};

export default async function CampAPage({
  searchParams,
}: CampPageProps) {
  const { key } = await searchParams;
  redirect(`/de/camp/camp-1${key ? `?key=${encodeURIComponent(key)}` : ""}`);
}
