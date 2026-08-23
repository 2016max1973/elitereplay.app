import Image from "next/image";

type PlayerButtonCopy = {
  ariaLabel: string;
  headline: string;
  subline: string;
  teamA: string;
  teamB: string;
  point: string;
  undo: string;
  hold: string;
  boardResponse: string;
  stayOnCourt: string;
  noApp: string;
  buttonLabel: string;
  buttonAlt: (team: string) => string;
};

const copyByLocale: Record<"de" | "en" | "es", PlayerButtonCopy> = {
  de: {
    ariaLabel: "Ein ÉliteReplay Player Button pro Team steuert den Spielstand",
    headline: "One button per team",
    subline: "Direkt am Court. Ohne App. Ohne Weg zum Bildschirm.",
    teamA: "Team A",
    teamB: "Team B",
    point: "Punkt",
    undo: "Undo",
    hold: "Hold",
    boardResponse: "reagiert sofort",
    stayOnCourt: "Spieler bleiben am Court",
    noApp: "Keine App nötig",
    buttonLabel: "ÉliteReplay Player Button",
    buttonAlt: (team) => `Weißer ÉliteReplay Player Button für ${team}`,
  },
  en: {
    ariaLabel: "One ÉliteReplay Player Button per team controls the score",
    headline: "One button per team",
    subline: "At court. No app. No walk to the screen.",
    teamA: "Team A",
    teamB: "Team B",
    point: "Point",
    undo: "Undo",
    hold: "Hold",
    boardResponse: "updates instantly",
    stayOnCourt: "Players stay on court",
    noApp: "No app needed",
    buttonLabel: "ÉliteReplay Player Button",
    buttonAlt: (team) => `White ÉliteReplay Player Button for ${team}`,
  },
  es: {
    ariaLabel: "Un ÉliteReplay Player Button por equipo controla el marcador",
    headline: "One button per team",
    subline: "En la pista. Sin app. Sin desplazarse hasta la pantalla.",
    teamA: "Equipo A",
    teamB: "Equipo B",
    point: "Punto",
    undo: "Undo",
    hold: "Hold",
    boardResponse: "reacciona al instante",
    stayOnCourt: "Los jugadores siguen en la pista",
    noApp: "Sin app",
    buttonLabel: "ÉliteReplay Player Button",
    buttonAlt: (team) => `Player Button blanco de ÉliteReplay para ${team}`,
  },
};

export default function PlayerButtonControlVisual({ locale }: { locale: string }) {
  const copy = locale === "de" || locale === "es" ? copyByLocale[locale] : copyByLocale.en;
  const controls = [
    { gesture: "1×", action: copy.point },
    { gesture: "2×", action: copy.undo },
    { gesture: copy.hold, action: "MyMoment" },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-[1.5rem] border border-[#F5BE2D]/30 bg-[#020305] shadow-[0_34px_100px_rgba(0,0,0,0.62)]"
      aria-label={copy.ariaLabel}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_30%,rgba(245,190,45,0.11),transparent_28%),radial-gradient(circle_at_84%_30%,rgba(245,190,45,0.11),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.045),transparent_38%)]" />

      <div className="relative z-10 border-b border-white/10 px-5 py-6 text-center sm:px-8 sm:py-8">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#F5BE2D] sm:text-xs">
          {copy.headline}
        </p>
        <p className="mt-3 text-sm font-semibold text-white/48 sm:text-base">
          {copy.subline}
        </p>
      </div>

      <div className="relative z-10 grid min-w-0 grid-cols-2 lg:grid-cols-[1fr_1.25fr_1fr] lg:items-stretch">
        <TeamButton team={copy.teamA} copy={copy} />

        <div className="order-3 col-span-2 border-t border-white/10 px-4 py-7 sm:px-7 sm:py-9 lg:order-none lg:col-span-1 lg:border-x lg:border-t-0 lg:px-7">
          <div className="grid grid-cols-3 border-y border-white/10">
            {controls.map((control) => (
              <div
                key={control.gesture}
                className="min-w-0 border-r border-white/10 px-1.5 py-4 text-center last:border-r-0 sm:px-3 sm:py-5"
              >
                <p className="text-base font-bold uppercase tracking-[-0.02em] text-[#F5BE2D] sm:text-xl">
                  {control.gesture}
                </p>
                <p className="mt-1.5 whitespace-nowrap text-[0.48rem] font-bold uppercase tracking-[0.04em] text-white/72 sm:text-[0.54rem] sm:tracking-[0.06em]">
                  {control.action}
                </p>
              </div>
            ))}
          </div>

          <div className="relative mx-auto mt-7 max-w-sm sm:mt-9">
            <div className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 -translate-y-6 bg-gradient-to-b from-[#F5BE2D]/15 to-[#F5BE2D]/70 sm:h-8 sm:-translate-y-8" />
            <div className="rounded-[1rem] border border-white/12 bg-black/70 px-4 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.5)] sm:px-5 sm:py-5">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                <span className="text-[0.54rem] font-bold uppercase tracking-[0.18em] text-white/38">
                  MatchBoard
                </span>
                <span className="inline-flex items-center gap-1.5 text-[0.52rem] font-bold uppercase tracking-[0.16em] text-[#F5BE2D]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F5BE2D] shadow-[0_0_9px_rgba(245,190,45,0.8)]" />
                  {copy.boardResponse}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                <ScoreTeam label={copy.teamA} score="30" />
                <span className="text-xl font-medium text-[#F5BE2D]">:</span>
                <ScoreTeam label={copy.teamB} score="15" />
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.54rem] font-bold uppercase tracking-[0.16em] text-white/35 sm:mt-6">
            <span>{copy.stayOnCourt}</span>
            <span className="hidden h-1 w-1 rounded-full bg-[#F5BE2D]/70 sm:block" />
            <span>{copy.noApp}</span>
          </div>
        </div>

        <TeamButton team={copy.teamB} copy={copy} />
      </div>
    </div>
  );
}

function TeamButton({ team, copy }: { team: string; copy: PlayerButtonCopy }) {
  return (
    <div className="relative flex min-w-0 flex-col items-center justify-center px-2 py-6 first:border-r first:border-white/10 sm:px-4 sm:py-8 lg:border-r-0 lg:py-10">
      <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-white/44 sm:text-[0.68rem]">
        {team}
      </p>
      <Image
        src="/images/elitereplay-player-button.png"
        alt={copy.buttonAlt(team)}
        width={588}
        height={468}
        sizes="(min-width: 1024px) 18vw, 38vw"
        className="mt-1 h-auto w-[132px] max-w-full drop-shadow-[0_20px_18px_rgba(0,0,0,0.68)] sm:w-[190px] lg:w-[220px]"
      />
      <p className="-mt-1 text-center text-[0.5rem] font-bold uppercase tracking-[0.15em] text-[#F5BE2D]/70 sm:text-[0.58rem]">
        {copy.buttonLabel}
      </p>
    </div>
  );
}

function ScoreTeam({ label, score }: { label: string; score: string }) {
  return (
    <div>
      <p className="text-[0.5rem] font-bold uppercase tracking-[0.16em] text-white/35">{label}</p>
      <p className="mt-1.5 text-3xl font-semibold tabular-nums tracking-[-0.05em] text-white sm:text-4xl">{score}</p>
    </div>
  );
}
