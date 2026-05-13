"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, ExternalLink, Play } from "lucide-react";
import type { CampHighlight } from "@/data/camps";

type CampHighlightCardProps = {
  highlight: CampHighlight;
  variant?: "hero" | "grid";
};

export default function CampHighlightCard({
  highlight,
  variant = "grid",
}: CampHighlightCardProps) {
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  const hasPreview = Boolean(highlight.preview);
  const hasDownload = Boolean(highlight.download);
  const isHero = variant === "hero";

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl shadow-black/40 transition-all duration-300 hover:border-[#D6B25E]/35 ${
        isHero ? "lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]" : ""
      }`}
    >
      <div className={`relative bg-black ${isHero ? "aspect-[16/10] lg:aspect-auto lg:min-h-[420px]" : "aspect-video"}`}>
        {!isPreviewActive ? (
          <>
            {highlight.thumbnail ? (
              <Image
                src={highlight.thumbnail}
                alt={highlight.title}
                fill
                sizes={isHero ? "(min-width: 1024px) 720px, 100vw" : "(min-width: 1024px) 360px, 100vw"}
                className="object-cover opacity-85"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,178,94,0.18),transparent_42%),linear-gradient(135deg,#050505,#111827_45%,#050505)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6B25E]">
                ÉliteReplay Highlight
              </p>
              <h2 className={`mt-2 font-bold text-white ${isHero ? "text-2xl md:text-3xl" : "text-lg"}`}>
                {highlight.title}
              </h2>
            </div>
            {hasPreview ? (
              <button
                type="button"
                onClick={() => setIsPreviewActive(true)}
                className={`absolute left-4 top-4 inline-flex items-center rounded-full border border-white/15 bg-black/65 font-semibold text-white backdrop-blur-sm transition-colors hover:border-[#D6B25E]/45 hover:text-[#D6B25E] ${
                  isHero ? "px-4 py-2 text-sm" : "px-3 py-2 text-xs"
                }`}
              >
                <Play className={`${isHero ? "mr-2 h-4 w-4" : "mr-2 h-3.5 w-3.5"}`} />
                Clip ansehen
              </button>
            ) : null}
          </>
        ) : hasPreview ? (
          <video
            className="h-full w-full bg-black object-cover"
            controls
            playsInline
            preload="metadata"
            poster={highlight.thumbnail}
          >
            <source src={highlight.preview} type="video/mp4" />
          </video>
        ) : (
          <div className="flex h-full w-full items-center justify-center border border-dashed border-white/15 bg-black/40 text-sm text-gray-500">
            Clip wird vorbereitet
          </div>
        )}
      </div>

      <div className={isHero ? "p-6 md:p-7" : "p-4"}>
        <p className={`text-gray-400 ${isHero ? "mb-6 text-base leading-relaxed" : "mb-4 text-sm leading-relaxed"}`}>
          {highlight.description}
        </p>

        <div className={`flex ${isHero ? "flex-col gap-3 sm:flex-row sm:flex-wrap" : "flex-col gap-2.5 sm:flex-row sm:flex-wrap"}`}>
          {hasDownload ? (
            <a
              href={highlight.download}
              download
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center rounded-xl bg-[#D6B25E] font-bold text-black transition-colors hover:bg-[#D6B25E]/90 ${
                isHero ? "flex-1 px-4 py-3 text-sm" : "px-3 py-2.5 text-sm"
              }`}
            >
              <Download className="mr-2 h-4 w-4" />
              Download MP4
            </a>
          ) : null}
          {hasPreview ? (
            isPreviewActive ? (
              <a
                href={highlight.preview}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] font-semibold text-white transition-colors hover:border-[#D6B25E]/40 ${
                  isHero ? "px-4 py-3 text-sm" : "px-3 py-2.5 text-sm"
                }`}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Clip direkt
              </a>
            ) : (
              <button
                type="button"
                onClick={() => setIsPreviewActive(true)}
                className={`inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] font-semibold text-white transition-colors hover:border-[#D6B25E]/40 ${
                  isHero ? "px-4 py-3 text-sm" : "px-3 py-2.5 text-sm"
                }`}
              >
                <Play className="mr-2 h-4 w-4" />
                Play
              </button>
            )
          ) : null}
        </div>
      </div>
    </article>
  );
}
