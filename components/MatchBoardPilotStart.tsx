"use client";

import Image from "next/image";
import { useState } from "react";

import type { Locale } from "@/i18n/config";

type Copy = {
  eyebrow: string;
  title: string;
  claim: string;
  body: string;
  steps: Array<{
    label: string;
    detail?: string;
  }>;
  button: string;
  buttonHint: string;
};

// Pilot court target: EliteReplayScoreboardMVP runs its Vite frontend on :5173.
// Its route detection opens the real local setup screen for /setup.
const LOCAL_MATCHBOARD_SETUP_URL = "http://localhost:5173/setup";

const copyByLocale: Record<Locale, Copy> = {
  de: {
    eyebrow: "Court Match System",
    title: "ÉliteReplay MatchBoard",
    claim: "Your score. Your focus. Your moment.",
    body:
      "Tragt die Teams ein, startet das Warm-up und bestätigt vor Spielbeginn per Doppelklick, dass beide Seiten spielbereit sind. Danach läuft das MatchBoard live und speichert Punkte, Replay-Marker und Match-Momente.",
    steps: [
      { label: "Teams eintragen" },
      { label: "Warm-up starten" },
      { label: "Beide Teams bestätigen", detail: "Doppelklick = spielbereit" },
      { label: "MatchBoard geht live" },
      { label: "Punkte & Replay-Momente speichern" },
    ],
    button: "MatchBoard starten",
    buttonHint: "Pilot: öffnet das lokale MatchBoard am Court.",
  },
  en: {
    eyebrow: "Court Match System",
    title: "ÉliteReplay MatchBoard",
    claim: "Your score. Your focus. Your moment.",
    body:
      "Enter the teams, start warm-up and confirm before play starts that both sides are ready. Then the MatchBoard runs live and stores points, replay markers and match moments.",
    steps: [
      { label: "Enter teams" },
      { label: "Start warm-up" },
      { label: "Both teams confirm", detail: "Double click = ready to play" },
      { label: "MatchBoard goes live" },
      { label: "Save points & replay moments" },
    ],
    button: "Start MatchBoard",
    buttonHint: "Pilot: opens the local MatchBoard at court.",
  },
  es: {
    eyebrow: "Court Match System",
    title: "ÉliteReplay MatchBoard",
    claim: "Your score. Your focus. Your moment.",
    body:
      "Introduce los equipos, inicia el warm-up y confirma antes del partido que ambos lados están listos. Después el MatchBoard funciona en vivo y guarda puntos, replay markers y match moments.",
    steps: [
      { label: "Introducir equipos" },
      { label: "Iniciar warm-up" },
      { label: "Ambos equipos confirman", detail: "Doble clic = listo" },
      { label: "MatchBoard en vivo" },
      { label: "Guardar puntos y replay moments" },
    ],
    button: "Start MatchBoard",
    buttonHint: "Piloto: abre el MatchBoard local en la pista.",
  },
};

function buildLocalMatchBoardSetupUrl(pilotCode: string) {
  const url = new URL(LOCAL_MATCHBOARD_SETUP_URL);
  url.searchParams.set("pilot", pilotCode);
  return url.toString();
}

export default function MatchBoardPilotStart({
  locale,
  pilotCode,
}: {
  locale: Locale;
  pilotCode: string;
}) {
  const [logoFailed, setLogoFailed] = useState(false);
  const t = copyByLocale[locale] ?? copyByLocale.en;
  const setupHref = buildLocalMatchBoardSetupUrl(pilotCode);

  return (
    <main className="matchboard-start-shell">
      <section className="matchboard-start-panel" aria-label="ÉliteReplay MatchBoard start">
        <header className="matchboard-start-brand">
          {logoFailed ? (
            <span>ÉliteReplay</span>
          ) : (
            <Image
              src="/images/elitereplay-logo.png"
              alt="ÉliteReplay"
              width={210}
              height={105}
              priority
              onError={() => setLogoFailed(true)}
            />
          )}
        </header>

        <div className="matchboard-start-copy">
          <p className="matchboard-start-eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <strong>{t.claim}</strong>
          <p>{t.body}</p>
        </div>

        <ol className="matchboard-start-flow" aria-label="MatchBoard flow">
          {t.steps.map((step, index) => (
            <li key={step.label}>
              <span>{index + 1}</span>
              {step.detail ? (
                <>
                  <strong>{step.label}</strong>
                  <small>{step.detail}</small>
                </>
              ) : (
                step.label
              )}
            </li>
          ))}
        </ol>

        <div className="matchboard-start-action">
          <a className="matchboard-start-primary-button" href={setupHref}>
            {t.button}
          </a>
          <small>{t.buttonHint}</small>
        </div>
      </section>

      <style jsx>{`
        .matchboard-start-shell {
          min-height: 100vh;
          min-height: 100dvh;
          display: grid;
          place-items: center;
          padding: clamp(24px, 5vw, 96px);
          overflow: hidden;
          color: #f4efe4;
          background:
            radial-gradient(circle at 22% 18%, rgba(244, 239, 228, 0.085), transparent 31%),
            radial-gradient(circle at 76% 62%, rgba(201, 162, 77, 0.11), transparent 36%),
            linear-gradient(90deg, rgba(0, 0, 0, 0.38), transparent 18%, transparent 82%, rgba(0, 0, 0, 0.42)),
            linear-gradient(135deg, #171816 0%, #0b0c0b 58%, #030303 100%);
        }

        .matchboard-start-panel {
          width: min(1180px, 100%);
          display: grid;
          align-content: center;
          gap: clamp(22px, 3vw, 38px);
        }

        .matchboard-start-brand {
          min-height: 44px;
          display: flex;
          align-items: center;
        }

        .matchboard-start-brand :global(img) {
          width: auto;
          max-width: min(210px, 38vw);
          max-height: 52px;
          object-fit: contain;
          object-position: left center;
          filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.42));
        }

        .matchboard-start-brand span {
          color: #f4efe4;
          font-size: clamp(1rem, 1.35vw, 1.45rem);
          font-weight: 820;
        }

        .matchboard-start-copy {
          max-width: 780px;
          display: grid;
          align-content: center;
          gap: clamp(12px, 1.6vw, 18px);
        }

        .matchboard-start-eyebrow {
          margin: 0;
          color: #c9a24d;
          font-size: clamp(0.72rem, 0.78vw, 0.88rem);
          font-weight: 820;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .matchboard-start-copy h1 {
          margin: 0;
          max-width: 940px;
          color: #f4efe4;
          font-family: "Barlow Condensed", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          font-size: clamp(4.2rem, 8vw, 9.2rem);
          font-weight: 400;
          line-height: 0.88;
          letter-spacing: 0;
        }

        .matchboard-start-copy strong {
          display: block;
          color: #c9a24d;
          font-size: clamp(1.1rem, 1.8vw, 2rem);
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .matchboard-start-copy p:last-child {
          margin: 0;
          max-width: 720px;
          color: rgba(244, 239, 228, 0.72);
          font-size: clamp(0.98rem, 1.14vw, 1.24rem);
          line-height: 1.65;
        }

        .matchboard-start-flow {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 1px;
          margin: 0;
          padding: 0;
          list-style: none;
          overflow: hidden;
          border: 1px solid rgba(244, 239, 228, 0.08);
          border-radius: 12px;
          background: rgba(244, 239, 228, 0.06);
        }

        .matchboard-start-flow li {
          min-height: 124px;
          display: grid;
          align-content: center;
          gap: 12px;
          padding: 20px 18px;
          color: rgba(244, 239, 228, 0.72);
          background:
            linear-gradient(135deg, rgba(244, 239, 228, 0.04), rgba(244, 239, 228, 0.012)),
            rgba(5, 5, 5, 0.56);
          font-size: clamp(0.82rem, 0.9vw, 1rem);
          font-weight: 720;
          line-height: 1.32;
        }

        .matchboard-start-flow li strong,
        .matchboard-start-flow li small {
          display: block;
        }

        .matchboard-start-flow li strong {
          color: rgba(244, 239, 228, 0.78);
          font-size: inherit;
          font-weight: 760;
          line-height: 1.22;
        }

        .matchboard-start-flow li small {
          margin-top: -4px;
          color: rgba(244, 239, 228, 0.54);
          font-size: 0.82em;
          font-weight: 700;
          line-height: 1.25;
        }

        .matchboard-start-flow li span {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(201, 162, 77, 0.28);
          border-radius: 50%;
          color: #c9a24d;
          font-family: "Barlow Condensed", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          font-size: 1.18rem;
          line-height: 1;
        }

        .matchboard-start-action {
          display: grid;
          justify-items: start;
          gap: 10px;
          margin-top: clamp(-10px, -0.7vw, -4px);
        }

        .matchboard-start-action small {
          color: rgba(244, 239, 228, 0.58);
          font-size: 0.9rem;
          font-weight: 650;
        }

        .matchboard-start-primary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          justify-self: start;
          min-width: min(100%, 340px);
          min-height: 76px;
          border: 1px solid rgba(201, 162, 77, 0.42);
          border-radius: 999px;
          padding: 18px 42px;
          color: #080808;
          background: linear-gradient(180deg, #d4b05f, #a17a35);
          box-shadow:
            0 22px 58px rgba(0, 0, 0, 0.48),
            0 0 0 1px rgba(244, 239, 228, 0.08),
            inset 0 1px 0 rgba(244, 239, 228, 0.35);
          font-size: clamp(1rem, 1.1vw, 1.24rem);
          font-weight: 950;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.075em;
        }

        .matchboard-start-primary-button:hover {
          transform: translateY(-1px);
          background: linear-gradient(180deg, #e2bf6b, #aa8239);
          box-shadow:
            0 26px 70px rgba(0, 0, 0, 0.52),
            0 0 34px rgba(201, 162, 77, 0.16),
            inset 0 1px 0 rgba(244, 239, 228, 0.4);
        }

        @media (max-width: 860px) {
          .matchboard-start-shell {
            overflow: auto;
            padding: 24px;
          }

          .matchboard-start-panel {
            min-height: calc(100vh - 48px);
            gap: 28px;
          }

          .matchboard-start-flow {
            grid-template-columns: 1fr;
          }

          .matchboard-start-flow li {
            min-height: auto;
            grid-template-columns: auto 1fr;
            align-items: center;
          }

          .matchboard-start-action,
          .matchboard-start-primary-button {
            justify-self: stretch;
          }

        }
      `}</style>
    </main>
  );
}
