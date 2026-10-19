import Link from "next/link";
import { ArrowRight, MessageCircle, Play } from "lucide-react";
import { matchboardDemoCopy, matchboardWhatsAppHref } from "@/lib/matchboard-demo-contact";

export default function MatchBoardDemoActions({ locale }: { locale: string }) {
  const copy = matchboardDemoCopy(locale);
  return <div className="mt-8">
    <div className="flex flex-col gap-3 sm:items-start">
      <Link href={`/${locale}/matchboard/demo`} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#F5BE2D] px-6 py-4 text-center text-sm font-bold text-black transition hover:bg-[#ffce50] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5BE2D]">
        <Play aria-hidden="true" className="h-4 w-4 shrink-0" />{copy.demo}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
      </Link>
      <a href={matchboardWhatsAppHref(locale)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#F5BE2D]/70 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5BE2D]">
        <MessageCircle aria-hidden="true" className="h-4 w-4" />{copy.whatsapp}
      </a>
    </div>
    <p className="mt-4 text-xs leading-5 text-white/55">{copy.note}</p>
  </div>;
}
