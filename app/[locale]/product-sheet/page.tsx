import type { Metadata } from "next";
import Image from "next/image";

import styles from "./product-sheet.module.css";

export const metadata: Metadata = {
  title: "From MatchBoard to SmartCourt",
  description:
    "Das ÉliteReplay Product Sheet für MatchBoard, SmartCourt, Content und Sponsoring.",
  robots: {
    index: false,
    follow: false,
  },
};

const stages = [
  { number: "01", label: "MatchBoard" },
  { number: "02", label: "SmartCourt" },
  { number: "03", label: "SmartCourt Pro" },
  { number: "04", label: "Sponsored Moments" },
];

const scoreAutomation = [
  "Score",
  "Games",
  "Sets",
  "Golden Point",
  "Tiebreak",
  "Match Time",
  "Match Winner",
];

export default function ProductSheetPage() {
  return (
    <main className={styles.root}>
      <article className={`${styles.sheet} ${styles.journeyPage}`} aria-labelledby="journey-title">
        <SheetMasthead page="01 / 02" label="Product Journey" />

        <header className={styles.journeyHero}>
          <p className={styles.kicker}>A court that grows with your club.</p>
          <h1 id="journey-title">FROM MATCHBOARD<br />TO SMARTCOURT</h1>
          <div className={styles.heroCopy}>
            <p className={styles.heroClaim}>Start simple. Grow when you’re ready.</p>
            <p>
              ÉliteReplay verwandelt einen normalen Padelcourt Schritt für Schritt in einen SmartCourt.
              Der Einstieg beginnt mit dem digitalen MatchBoard. Kameras, Highlights, Multi-Camera-Replays
              und Sponsoring können später ergänzt werden.
            </p>
          </div>
        </header>

        <nav className={styles.journeyRail} aria-label="ÉliteReplay Ausbaustufen">
          {stages.map((stage, index) => (
            <div className={styles.railStage} key={stage.number}>
              <div className={styles.railMarker}>
                <span>{stage.number}</span>
              </div>
              <p>{stage.label}</p>
              {index < stages.length - 1 ? <span className={styles.railArrow} aria-hidden="true">→</span> : null}
            </div>
          ))}
        </nav>

        <div className={styles.stageGrid}>
          <section className={styles.stage} aria-labelledby="matchboard-stage">
            <StageHeading
              number="01"
              title="MATCHBOARD"
              subtitle="The foundation of every SmartCourt."
              detail="Score. Match state. MyMoment. Ready for cameras and highlights."
              id="matchboard-stage"
            />
            <div className={styles.matchboardProduct} aria-label="ÉliteReplay MatchBoard Matchanzeige">
              <div className={styles.boardTopline}>
                <strong><i /> MATCHBOARD</strong>
                <span>COURT 04</span>
              </div>
              <div className={styles.boardTeam}>
                <span>OLIVER &amp; BASTI</span><strong>30</strong>
              </div>
              <div className={styles.boardTeam}>
                <span>PHILIPP &amp; PASCAL</span><strong>15</strong>
              </div>
              <div className={styles.boardStats}>
                <span>SET 01</span><span>GAMES 5—0</span><span>42:18</span>
              </div>
            </div>
            <FeatureRun
              items={["Live Score", "Match Timer", "Games & Sets", "Golden Point", "Tiebreak", "Match Winner", "MyMoment", "Club Branding", "Sponsor Branding"]}
            />
            <StageClaim>Everything the match needs.</StageClaim>
          </section>

          <section className={styles.stage} aria-labelledby="smartcourt-stage">
            <StageHeading
              number="02"
              title="SMARTCOURT"
              subtitle="MatchBoard + Cameras + Highlights"
              id="smartcourt-stage"
            />
            <div className={styles.courtVisual}>
              <Image
                src="/images/matchboard-real-reference.jpg"
                alt="Padelcourt mit eingeblendeter ÉliteReplay MatchBoard Anzeige"
                fill
                priority
                sizes="(max-width: 700px) 100vw, 397px"
                className={styles.coverImage}
              />
              <span className={styles.visualTag}>CAPTURE THE MOMENT</span>
            </div>
            <FeatureRun
              items={["Match Recording", "MyMoment Video", "Match Moments", "Golden Point Moments", "Match Point Moments", "Winner Moments", "Highlight Clips"]}
            />
            <StageClaim>Your score becomes your content.</StageClaim>
          </section>

          <section className={styles.stage} aria-labelledby="pro-stage">
            <StageHeading
              number="03"
              title="SMARTCOURT PRO"
              subtitle="Multi-Camera + Automated Content"
              id="pro-stage"
            />
            <div className={styles.multiCameraVisual} aria-label="Drei ÉliteReplay Kameraperspektiven">
              <CameraAngle label="TOP VIEW" image="/images/matchboard-real-reference.jpg" position="50% 70%" />
              <CameraAngle label="SIDE CAM" image="/images/elitereplay/sidecam-moment.jpg" position="50% 62%" />
              <CameraAngle label="NET CAM" image="/images/elitereplay/netcam-moment.jpg" position="50% 50%" />
            </div>
            <FeatureRun
              items={["Multiple Camera Angles", "Multi-Camera Replay", "Slow Motion", "Player Highlights", "Match Highlights", "Social Content", "Tournament Content"]}
            />
            <StageClaim>Turn your court into a content machine.</StageClaim>
          </section>

          <section className={`${styles.stage} ${styles.sponsorStage}`} aria-labelledby="sponsor-stage">
            <StageHeading
              number="04"
              title="SPONSORED MOMENTS"
              subtitle="Own the moment."
              id="sponsor-stage"
            />
            <div className={styles.sponsorMoments}>
              <div className={styles.sponsorHero}>
                <strong>CUPRA</strong>
                <span>GOLDEN POINT</span>
              </div>
              <p>MATCH POINT <i>·</i> WINNER MOMENT <i>·</i> MYMOMENT</p>
            </div>
            <StageClaim>Don’t just show a logo. Own the moment.</StageClaim>
          </section>
        </div>

        <footer className={styles.pageFooter}>
          <p><span>START</span> MatchBoard ist die Basis.</p>
          <p><span>GROW</span> SmartCourt erweitert das Erlebnis.</p>
          <p><span>VALUE</span> Content schafft neue Club- und Partnerflächen.</p>
        </footer>
      </article>

      <article className={`${styles.sheet} ${styles.playPage}`} aria-labelledby="play-title">
        <SheetMasthead page="02 / 02" label="Player Experience" />

        <header className={styles.playHero}>
          <p className={styles.kicker}>Player control, simplified.</p>
          <h2 id="play-title">YOUR MATCH.<br />ONE BUTTON.</h2>
          <div className={styles.playHeroCopy}>
            <p>Score the match without leaving the game.</p>
            <span>Simple for players. Automatic for the club.</span>
          </div>
        </header>

        <section className={styles.flicHero} aria-label="Ein Flic Button pro Team">
          <div className={styles.teamButton}>
            <span>TEAM A</span>
            <Image
              src="/images/elitereplay-player-button.png"
              alt="Weißer ÉliteReplay Player Button für Team A"
              width={588}
              height={468}
              className={styles.flicButton}
              priority
            />
          </div>
          <div className={styles.oneButtonCopy}>
            <p className={styles.sectionNumber}>ONE BUTTON PER TEAM</p>
            <h3>Team A has one button.<br />Team B has one button.</h3>
            <span>ÉLITEREPLAY PLAYER BUTTON</span>
          </div>
          <div className={styles.teamButton}>
            <span>TEAM B</span>
            <Image
              src="/images/elitereplay-player-button.png"
              alt="Weißer ÉliteReplay Player Button für Team B"
              width={588}
              height={468}
              className={styles.flicButton}
              priority
            />
          </div>
        </section>

        <section className={styles.gestureStrip} aria-label="Drei Flic Button Aktionen">
          <div className={styles.gestureCard}>
            <span>1×<small>PRESS</small></span>
            <div>
              <h3>POINT</h3>
              <p>Point for your team.</p>
            </div>
          </div>
          <div className={styles.gestureCard}>
            <span>2×<small>PRESS</small></span>
            <div>
              <h3>UNDO</h3>
              <p>Correct the last point.</p>
            </div>
          </div>
          <div className={styles.gestureCard}>
            <span className={styles.holdLabel}>HOLD</span>
            <div>
              <h3>MYMOMENT</h3>
              <p>Save a moment worth remembering.</p>
            </div>
          </div>
        </section>

        <section className={styles.automaticSection} aria-labelledby="automatic-title">
          <div className={styles.restClaim}>
            <p className={styles.sectionNumber}>THAT’S IT.</p>
            <h3 id="automatic-title">ÉliteReplay<br />handles the rest.</h3>
          </div>
          <div className={styles.automaticCopy}>
            <ul className={styles.automationList}>
              {scoreAutomation.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className={styles.noDistraction}>
              <strong>NO PHONE. NO APP. NO DISTRACTION.</strong>
              <span>Just play. Press. Keep playing.</span>
            </div>
          </div>
        </section>

        <section className={styles.matchFlow} aria-labelledby="flow-title">
          <div className={styles.flowIntro}>
            <p className={styles.sectionNumber}>MATCH FLOW</p>
            <h3 id="flow-title">Four steps.<br />Zero distraction.</h3>
          </div>
          <ol>
            <FlowStep number="01" label="GET READY" detail="Each team gets its button." />
            <FlowStep number="02" label="READY" detail="Both teams double-press to confirm." />
            <FlowStep number="03" label="PLAY" detail="Press once after every point won." />
            <FlowStep number="04" label="WINNER" detail="ÉliteReplay manages the match automatically." last />
          </ol>
        </section>

        <footer className={styles.brandClose}>
          <div>
            <p>ONE BUTTON FOR THE PLAYERS.<br /><strong>THE WHOLE MATCH FOR ÉLITEREPLAY.</strong></p>
            <span>WIN IT. DEFEND IT.</span>
          </div>
          <Image
            src="/images/elitereplay-logo.png"
            alt="ÉliteReplay"
            width={1040}
            height={595}
            className={styles.footerLogo}
          />
        </footer>
      </article>
    </main>
  );
}

function SheetMasthead({ page, label }: { page: string; label: string }) {
  return (
    <div className={styles.masthead}>
      <Image
        src="/images/elitereplay-logo.png"
        alt="ÉliteReplay"
        width={1040}
        height={595}
        className={styles.logo}
        priority
      />
      <div className={styles.printWordmark} aria-hidden="true">
        <b>ER</b><strong>ÉliteReplay</strong>
      </div>
      <p>{label}</p>
      <span>{page}</span>
    </div>
  );
}

function StageHeading({
  number,
  title,
  subtitle,
  detail,
  id,
}: {
  number: string;
  title: string;
  subtitle: string;
  detail?: string;
  id: string;
}) {
  return (
    <div className={styles.stageHeading}>
      <span>{number}</span>
      <div>
        <h3 id={id}>{title}</h3>
        <p>{subtitle}</p>
        {detail ? <small>{detail}</small> : null}
      </div>
    </div>
  );
}

function FeatureRun({ items }: { items: string[] }) {
  return (
    <ul className={styles.featureRun}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

function StageClaim({ children }: { children: React.ReactNode }) {
  return <p className={styles.stageClaim}>{children}<span aria-hidden="true">↗</span></p>;
}

function CameraAngle({ label, image, position }: { label: string; image: string; position: string }) {
  return (
    <div className={styles.cameraAngle}>
      <Image
        src={image}
        alt=""
        fill
        sizes="132px"
        className={styles.coverImage}
        style={{ objectPosition: position }}
      />
      <span>{label}</span>
    </div>
  );
}

function FlowStep({ number, label, detail, last = false }: { number: string; label: string; detail: string; last?: boolean }) {
  return (
    <li>
      <span>{number}</span>
      <strong>{label}</strong>
      <small>{detail}</small>
      {!last ? <i aria-hidden="true">→</i> : null}
    </li>
  );
}
