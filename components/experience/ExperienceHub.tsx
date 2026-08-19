import Link from "next/link";
import { ArrowRight, Camera, Film, Monitor, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type StripStep = {
  title: string;
  text: string;
  Icon: LucideIcon;
};

const stripSteps: StripStep[] = [
  { title: "Capture", text: "The match is recorded.", Icon: Camera },
  { title: "MatchBoard", text: "The court becomes live.", Icon: Monitor },
  { title: "Highlights", text: "The moment is shareable.", Icon: Film },
  { title: "Moments", text: "The player keeps it.", Icon: Sparkles },
];

function PageChromeStyles() {
  return (
    <style>{`
      body > select {
        background: rgba(6, 6, 6, 0.78) !important;
        color: #f8f0df !important;
        border: 1px solid rgba(213, 175, 92, 0.36) !important;
        border-radius: 9999px !important;
        font-size: 12px !important;
        font-weight: 700 !important;
        letter-spacing: 0.12em !important;
        padding: 8px 26px 8px 12px !important;
        backdrop-filter: blur(16px) !important;
        -webkit-backdrop-filter: blur(16px) !important;
      }
    `}</style>
  );
}

function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#D5AF5C]", className)}>
      {children}
    </p>
  );
}

function GoldLine({ className }: { className?: string }) {
  return (
    <span className={cn("block h-px w-24 bg-gradient-to-r from-transparent via-[#D5AF5C] to-transparent", className)} />
  );
}

function PremiumButton({
  href,
  children,
  variant = "gold",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "outline";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#D5AF5C]/70 focus:ring-offset-2 focus:ring-offset-black",
        variant === "gold"
          ? "bg-[#D5AF5C] text-black shadow-[0_18px_60px_rgba(213,175,92,0.18)] hover:bg-[#E7C87B]"
          : "border border-[#D5AF5C]/38 bg-black/22 text-[#F8F0DF] hover:border-[#D5AF5C]/70 hover:bg-[#D5AF5C]/10",
      )}
    >
      {children}
      <ArrowRight size={17} strokeWidth={1.8} />
    </Link>
  );
}

function QrCodeMark() {
  const active = new Set([
    0, 1, 2, 4, 6, 7, 8,
    9, 13, 15, 19, 20,
    18, 19, 20, 22, 24, 25, 26,
    28, 31, 32, 35, 37, 39,
    42, 43, 45, 47, 48,
    50, 52, 53, 55, 57, 58, 60,
    63, 64, 65, 67, 69, 70, 71,
  ]);

  return (
    <div className="grid h-20 w-20 grid-cols-9 gap-0.5 border border-[#D5AF5C]/28 bg-[#F8F0DF] p-2">
      {Array.from({ length: 81 }).map((_, index) => (
        <span
          key={index}
          className={cn("block", active.has(index) ? "bg-black" : "bg-transparent")}
        />
      ))}
    </div>
  );
}

function MatchBoardDisplay({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-[#D5AF5C]/40 bg-[#030303] shadow-[0_30px_90px_rgba(0,0,0,0.74)]",
        compact ? "p-4" : "p-5 md:p-6",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(213,175,92,0.14),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_32%)]" />
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 border-b border-[#D5AF5C]/22 pb-4">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#D5AF5C]">
              ÉliteReplay MatchBoard
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#F8F0DF]/52">
              Court 01 · Live
            </p>
          </div>
          <span className="rounded-full border border-[#D5AF5C]/28 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#D5AF5C]">
            Highlight saved
          </span>
        </div>

        <div className={cn("grid items-center gap-5 py-5", compact ? "grid-cols-[1fr_auto_1fr]" : "grid-cols-[1fr_auto_1fr] md:py-8")}>
          <ScoreTeam name="NOVA" side="Team A" />
          <div className="border-x border-[#D5AF5C]/28 px-4 text-center md:px-7">
            <p className={cn("font-semibold leading-none text-[#F8F0DF]", compact ? "text-4xl" : "text-5xl md:text-7xl")}>6:4</p>
            <p className="mt-2 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#D5AF5C]">
              Set point
            </p>
          </div>
          <ScoreTeam name="ATLAS" side="Team B" />
        </div>

        <div className="grid gap-4 border-t border-white/10 pt-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-[#D5AF5C]">
              Replay Moment
            </p>
            <p className={cn("mt-2 font-semibold leading-tight text-[#FFF8EA]", compact ? "text-xl" : "text-2xl md:text-4xl")}>
              Golden rally saved
            </p>
            <div className="mt-4 grid max-w-md grid-cols-3 gap-2 text-center text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-[#F8F0DF]/58">
              <span className="border border-white/10 bg-white/[0.035] px-2 py-2">Replay</span>
              <span className="border border-white/10 bg-white/[0.035] px-2 py-2">QR access</span>
              <span className="border border-white/10 bg-white/[0.035] px-2 py-2">Memory</span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-4 md:justify-end">
            <div className="min-w-28 border border-[#D5AF5C]/20 bg-black/50 px-3 py-3 text-center">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-[#F8F0DF]/48">
                Sponsor slot
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D5AF5C]">
                Club partner
              </p>
            </div>
            <QrCodeMark />
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreTeam({ name, side }: { name: string; side: string }) {
  return (
    <div className="text-center">
      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[#F8F0DF]/45">{side}</p>
      <p className="mt-2 text-xl font-semibold uppercase tracking-[0.05em] text-[#FFF8EA] md:text-3xl">{name}</p>
    </div>
  );
}

function CourtScene() {
  return (
    <div className="relative mx-auto aspect-[1.08/1] w-full max-w-[760px] overflow-hidden rounded-[2rem] border border-[#D5AF5C]/18 bg-[#070707] shadow-[0_45px_140px_rgba(0,0,0,0.82)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_4%,rgba(213,175,92,0.22),transparent_28%),linear-gradient(180deg,#11110f_0%,#050505_42%,#000_100%)]" />

      <div className="absolute left-1/2 top-[10%] h-28 w-[70%] -translate-x-1/2 rounded-full bg-[#F5D27E]/12 blur-3xl" />
      <div className="absolute left-[11%] top-[15%] h-3 w-3 rounded-full bg-[#F8F0DF]/80 shadow-[0_0_34px_12px_rgba(248,240,223,0.18)]" />
      <div className="absolute right-[11%] top-[15%] h-3 w-3 rounded-full bg-[#F8F0DF]/80 shadow-[0_0_34px_12px_rgba(248,240,223,0.18)]" />

      <div className="absolute left-[7%] right-[7%] top-[16%] z-20">
        <MatchBoardDisplay />
      </div>

      <div className="absolute left-[8%] right-[8%] top-[49%] z-30 h-[28%] border-x border-t border-[#F8F0DF]/22">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,240,223,0.2)_1px,transparent_1px)] bg-[size:12.5%_100%] opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,240,223,0.18)_1px,transparent_1px)] bg-[size:100%_33.33%] opacity-50" />
        <div className="absolute inset-x-0 top-0 h-px bg-[#D5AF5C]/40" />
      </div>

      <div
        className="absolute bottom-[4%] left-1/2 z-10 h-[43%] w-[88%] -translate-x-1/2 border border-[#D5AF5C]/22 bg-[linear-gradient(180deg,rgba(27,78,103,0.4),rgba(20,69,91,0.62)_38%,rgba(8,22,30,0.96))]"
        style={{ clipPath: "polygon(18% 0, 82% 0, 100% 100%, 0 100%)" }}
      >
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#F8F0DF]/42" />
        <div className="absolute left-[18%] right-[18%] top-[38%] h-px bg-[#F8F0DF]/34" />
        <div className="absolute left-[31%] top-[18%] h-[64%] w-px bg-[#F8F0DF]/24" />
        <div className="absolute right-[31%] top-[18%] h-[64%] w-px bg-[#F8F0DF]/24" />
        <div className="absolute left-[18%] right-[18%] top-[18%] h-[64%] border border-[#F8F0DF]/18" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-40 h-44 bg-gradient-to-t from-black via-black/48 to-transparent" />
      <div className="absolute inset-0 z-50 rounded-[2rem] ring-1 ring-inset ring-white/8" />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-[#F8F0DF]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(213,175,92,0.12),transparent_30%),linear-gradient(120deg,#000_0%,#060606_48%,#11100d_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D5AF5C]/45 to-transparent" />
      <div className="container relative z-10 mx-auto grid min-h-screen gap-10 px-5 pb-12 pt-28 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:pt-16">
        <div className="max-w-3xl">
          <Eyebrow>ÉliteReplay Court Experience</Eyebrow>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.96] tracking-normal text-[#FFF8EA] md:text-7xl lg:text-8xl">
            Make Every Court Feel Live
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#D8CFBD]/86 md:text-xl">
            ÉliteReplay turns a padel court into a live experience — with score,
            replay moments, QR access and premium player memories.
          </p>
          <GoldLine className="mt-8" />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PremiumButton href="#experience-sentence">
              See the court experience
            </PremiumButton>
            <PremiumButton href="#final-cta" variant="outline">
              Build your court setup
            </PremiumButton>
          </div>
        </div>
        <CourtScene />
      </div>
    </section>
  );
}

function OneSentenceSection() {
  return (
    <section id="experience-sentence" className="border-t border-white/[0.06] bg-[#050505] px-5 py-16 text-center text-[#F8F0DF] md:py-24">
      <p className="mx-auto max-w-5xl text-3xl font-semibold leading-tight text-[#FFF8EA] md:text-5xl">
        From score to replay, from rally to memory — ÉliteReplay makes the court feel alive.
      </p>
    </section>
  );
}

function SimpleSystemStrip() {
  return (
    <section className="border-t border-white/[0.06] bg-black py-10 text-[#F8F0DF] md:py-14">
      <div className="container mx-auto px-5">
        <div className="grid gap-3 md:grid-cols-4">
          {stripSteps.map(({ title, text, Icon }) => (
            <article key={title} className="border border-white/10 bg-[#090908] p-5">
              <div className="mb-5 flex h-10 w-10 items-center justify-center border border-[#D5AF5C]/32 text-[#D5AF5C]">
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <h2 className="text-xl font-semibold text-[#FFF8EA]">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#D8CFBD]/70">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PreviewCardsRow() {
  return (
    <section className="border-t border-white/[0.06] bg-[#060606] py-16 text-[#F8F0DF] md:py-24">
      <div className="container mx-auto px-5">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Eyebrow>Three outputs</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#FFF8EA] md:text-5xl">
              One court. Three premium moments.
            </h2>
          </div>
          <GoldLine className="md:mb-4" />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <PreviewCard title="MatchBoard" label="Live court screen">
            <MiniMatchBoard />
          </PreviewCard>
          <PreviewCard title="Highlight" label="Replay moment">
            <MiniHighlight />
          </PreviewCard>
          <PreviewCard title="Player Moment" label="Premium memory">
            <MiniPlayerMoment />
          </PreviewCard>
        </div>
      </div>
    </section>
  );
}

function PreviewCard({
  title,
  label,
  children,
}: {
  title: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <article className="overflow-hidden border border-[#D5AF5C]/18 bg-[#0A0A09] p-4 shadow-[0_26px_80px_rgba(0,0,0,0.36)]">
      <div className="relative aspect-[16/11] overflow-hidden border border-white/10 bg-black">
        {children}
      </div>
      <div className="px-1 pt-5">
        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-[#D5AF5C]">
          {label}
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-[#FFF8EA]">{title}</h3>
      </div>
    </article>
  );
}

function MiniMatchBoard() {
  return (
    <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_50%_0%,rgba(213,175,92,0.14),transparent_38%),linear-gradient(180deg,#111,#020202)] p-6">
      <div className="w-full max-w-sm border border-[#D5AF5C]/42 bg-black p-4">
        <div className="flex items-center justify-between border-b border-[#D5AF5C]/22 pb-3">
          <span className="text-[0.54rem] font-semibold uppercase tracking-[0.22em] text-[#D5AF5C]">
            ÉliteReplay
          </span>
          <span className="text-[0.52rem] uppercase tracking-[0.18em] text-[#F8F0DF]/48">
            Live
          </span>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center py-5 text-center">
          <span className="text-sm font-semibold text-[#FFF8EA]">NOVA</span>
          <span className="px-4 text-4xl font-semibold text-[#D5AF5C]">6:4</span>
          <span className="text-sm font-semibold text-[#FFF8EA]">ATLAS</span>
        </div>
        <p className="border-t border-white/10 pt-3 text-center text-[0.58rem] uppercase tracking-[0.18em] text-[#F8F0DF]/58">
          Highlight saved
        </p>
      </div>
    </div>
  );
}

function MiniHighlight() {
  return (
    <div className="relative h-full bg-[linear-gradient(180deg,#111,#020202)]">
      <div
        className="absolute bottom-0 left-1/2 h-[70%] w-[86%] -translate-x-1/2 border border-[#D5AF5C]/24 bg-[#12364a]"
        style={{ clipPath: "polygon(18% 0, 82% 0, 100% 100%, 0 100%)" }}
      >
        <span className="absolute left-1/2 top-0 h-full w-px bg-[#F8F0DF]/40" />
        <span className="absolute left-[18%] right-[18%] top-1/2 h-px bg-[#F8F0DF]/34" />
      </div>
      <div className="absolute left-5 top-5 border-y border-[#D5AF5C]/52 px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#D5AF5C]">
        Replay Moment
      </div>
      <div className="absolute bottom-5 left-5 right-5">
        <p className="text-2xl font-semibold text-[#FFF8EA]">Golden rally</p>
      </div>
    </div>
  );
}

function MiniPlayerMoment() {
  return (
    <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_50%_0%,rgba(213,175,92,0.14),transparent_36%),linear-gradient(180deg,#0c0c0b,#020202)] p-6">
      <div className="aspect-[4/5] h-full max-h-60 border border-[#D5AF5C]/42 bg-[#080807] p-4">
        <div className="flex justify-between text-[0.5rem] font-semibold uppercase tracking-[0.18em]">
          <span className="text-[#D5AF5C]">Player Moment</span>
          <span className="text-[#F8F0DF]/48">QR</span>
        </div>
        <div className="mt-5 h-20 border border-white/10 bg-[linear-gradient(135deg,#12364a,#050505)]" />
        <p className="mt-5 text-2xl font-semibold leading-tight text-[#FFF8EA]">
          Match memory
        </p>
        <p className="mt-3 border-t border-[#D5AF5C]/20 pt-3 text-[0.58rem] uppercase tracking-[0.17em] text-[#D8CFBD]/64">
          Saved · Shared
        </p>
      </div>
    </div>
  );
}

function FinalCTA() {
  return (
    <section id="final-cta" className="relative overflow-hidden border-t border-[#D5AF5C]/18 bg-black px-5 py-20 text-center text-[#F8F0DF] md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(213,175,92,0.12),transparent_35%)]" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <Eyebrow>Next court</Eyebrow>
        <h2 className="mt-5 text-4xl font-semibold leading-tight text-[#FFF8EA] md:text-6xl">
          Build your court experience.
        </h2>
        <p className="mt-6 text-lg leading-8 text-[#D8CFBD]/82">
          ÉliteReplay makes every player feel like the match mattered.
        </p>
      </div>
    </section>
  );
}

export default function ExperienceHub() {
  return (
    <main className="min-h-screen bg-black font-sans text-[#F8F0DF]">
      <PageChromeStyles />
      <HeroSection />
      <OneSentenceSection />
      <SimpleSystemStrip />
      <PreviewCardsRow />
      <FinalCTA />
    </main>
  );
}
