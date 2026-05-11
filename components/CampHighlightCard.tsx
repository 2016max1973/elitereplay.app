"use client";

import Image from "next/image";
import { Download, ExternalLink, Share2 } from "lucide-react";
import type { CampHighlight } from "@/data/camps";

type CampHighlightCardProps = {
  highlight: CampHighlight;
};

export default function CampHighlightCard({
  highlight,
}: CampHighlightCardProps) {
  const shareHighlight = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: highlight.title,
        url: shareUrl,
      });
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
  };

  const hasPreview = Boolean(highlight.preview);
  const hasDownload = Boolean(highlight.download);

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl shadow-black/40 transition-all duration-300 hover:border-[#D6B25E]/35">
      <div className="relative aspect-video bg-black">
        {highlight.thumbnail ? (
          <Image
            src={highlight.thumbnail}
            alt={highlight.title}
            fill
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-cover opacity-80"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,178,94,0.18),transparent_42%),linear-gradient(135deg,#050505,#111827_45%,#050505)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6B25E]">
            ÉliteReplay Highlight
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            {highlight.title}
          </h2>
        </div>
      </div>

      <div className="p-5">
        <p className="mb-5 text-sm leading-relaxed text-gray-400">
          {highlight.description}
        </p>

        {hasPreview ? (
          <video
            className="mb-5 aspect-video w-full rounded-xl border border-white/10 bg-black"
            controls
            playsInline
            preload="metadata"
            poster={highlight.thumbnail}
          >
            <source src={highlight.preview} type="video/mp4" />
          </video>
        ) : (
          <div className="mb-5 flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-white/15 bg-black/40 text-sm text-gray-500">
            Clip wird vorbereitet
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          {hasDownload ? (
            <a
              href={highlight.download}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#D6B25E] px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-[#D6B25E]/90"
            >
              <Download className="mr-2 h-4 w-4" />
              MP4 herunterladen
            </a>
          ) : null}
          {hasPreview ? (
            <a
              href={highlight.preview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-[#D6B25E]/40"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Clip ansehen
            </a>
          ) : null}
          <button
            type="button"
            onClick={shareHighlight}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-[#D6B25E]/40"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Teilen
          </button>
        </div>
      </div>
    </article>
  );
}
