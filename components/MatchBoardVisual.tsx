import Image from "next/image";

import { cn } from "@/lib/utils";

type MatchBoardVisualProps = {
  className?: string;
  compact?: boolean;
  courtLabel: string;
  liveLabel: string;
  matchTimeLabel: string;
  setLabel: string;
  clubLabel: string;
};

export default function MatchBoardVisual({
  className,
  compact = false,
  courtLabel,
  liveLabel,
  matchTimeLabel,
  setLabel,
  clubLabel,
}: MatchBoardVisualProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.35rem] border border-[#F5BE2D]/35 bg-[#020202] text-white shadow-[0_34px_100px_rgba(0,0,0,0.72)]",
        compact ? "p-4 sm:p-5" : "p-4 sm:p-7 lg:p-8",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,190,45,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.055),transparent_36%)]" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/elitereplay-logo.png"
              alt="ÉliteReplay"
              width={148}
              height={74}
              className={cn("h-auto", compact ? "w-[92px]" : "w-[112px] sm:w-[132px]")}
            />
            <span className="hidden h-6 w-px bg-white/15 sm:block" />
            <span className="hidden text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/45 sm:block">
              MatchBoard
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="hidden text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/45 sm:block">
              {courtLabel}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-red-300">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]" />
              {liveLabel}
            </span>
          </div>
        </div>

        <div className={cn("grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center", compact ? "py-5" : "py-7 sm:py-10")}>
          <TeamBlock players={["Oliver", "Basti"]} team="Team A" compact={compact} />

          <div className={cn("border-x border-[#F5BE2D]/22", compact ? "px-3 sm:px-5" : "px-2 sm:px-8 lg:px-10")}>
            <p className={cn("font-semibold tabular-nums leading-none tracking-[-0.06em]", compact ? "text-4xl sm:text-5xl" : "text-4xl sm:text-7xl lg:text-8xl")}>
              30<span className="mx-1.5 text-[#F5BE2D]">:</span>15
            </p>
            <p className="mt-3 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-[#F5BE2D]">
              {setLabel}
            </p>
          </div>

          <TeamBlock players={["Philipp", "Pascal"]} team="Team B" compact={compact} />
        </div>

        <div className="grid grid-cols-3 border-y border-white/10 bg-white/[0.025] text-center">
          <BoardStat label="Sets" value="1 — 0" />
          <BoardStat label="Games" value="5 — 0" />
          <BoardStat label={matchTimeLabel} value="42:18" />
        </div>

        <div className="mt-4 flex flex-col items-start gap-2 text-[0.58rem] font-bold uppercase tracking-[0.18em] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="text-white/38">Your score. Your focus. Your moment.</span>
          <span className="shrink-0 text-[#F5BE2D]">{clubLabel}</span>
        </div>
      </div>
    </div>
  );
}

function TeamBlock({
  players,
  team,
  compact,
}: {
  players: [string, string];
  team: string;
  compact: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[0.5rem] font-bold uppercase tracking-[0.18em] text-white/38">{team}</p>
      <p className={cn("mt-2 truncate font-semibold leading-tight", compact ? "text-sm sm:text-lg" : "text-sm sm:text-2xl lg:text-3xl")}>
        {players[0]}
      </p>
      <p className={cn("truncate font-semibold leading-tight text-white/58", compact ? "text-xs sm:text-base" : "text-xs sm:text-xl lg:text-2xl")}>
        {players[1]}
      </p>
    </div>
  );
}

function BoardStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-white/10 px-2 py-3 last:border-r-0 sm:px-4">
      <p className="text-[0.5rem] font-bold uppercase tracking-[0.18em] text-white/35">{label}</p>
      <p className="mt-1.5 text-xs font-semibold tabular-nums text-white/82 sm:text-sm">{value}</p>
    </div>
  );
}
