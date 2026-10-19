"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { matchboardDemoCopy, matchboardWhatsAppHref } from "@/lib/matchboard-demo-contact";

export default function MatchBoardWebsiteDemo({ locale, initialView }: { locale: string; initialView: "matchboard" | "history" }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1200);
  const copy = matchboardDemoCopy(locale);
  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type !== "elitereplay-demo-height" || typeof event.data.height !== "number" || !Number.isFinite(event.data.height)) return;
      setHeight(Math.max(480, Math.min(30000, Math.ceil(event.data.height))));
    }
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);
  const src = `/demos/matchboard/index.html?demo=showcase&view=%2F${initialView}`;
  return <main className="min-h-screen bg-[#030303] text-white">
    <h1 className="sr-only">{copy.title}</h1>
    <div className="border-b border-white/10 bg-[#080808]">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href={`/${locale}/matchboard`} className="inline-flex min-h-10 items-center gap-2 text-xs text-white/65 hover:text-white sm:text-sm"><ArrowLeft className="h-4 w-4" aria-hidden="true" />{copy.back}</Link>
        <a href={matchboardWhatsAppHref(locale)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#F5BE2D]/45 bg-[#F5BE2D]/10 px-4 py-3 text-xs font-semibold text-[#F5BE2D] hover:bg-[#F5BE2D]/20 sm:text-sm">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />{copy.club}<span className="hidden text-xs font-normal text-white/60 sm:inline">· WhatsApp</span>
        </a>
      </div>
    </div>
    <iframe ref={frame} src={src} title="ÉliteReplay MatchBoard und Match History – interaktive Demo" className="block w-full border-0" style={{ height }} onLoad={() => window.scrollTo({ top: 0 })} />
    <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-4 border-t border-white/10 px-6 py-9 text-center">
      <p className="text-base font-medium">{copy.club}</p>
      <a href={matchboardWhatsAppHref(locale)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#F5BE2D] px-6 py-3 text-sm font-bold text-black hover:bg-[#ffce50]"><MessageCircle className="h-4 w-4" aria-hidden="true" />{copy.whatsapp}</a>
      <Link href={`/${locale}/privacy`} className="text-xs text-white/45 underline">{locale === "de" ? "Datenschutz" : locale === "es" ? "Privacidad" : "Privacy"}</Link>
    </div>
  </main>;
}
