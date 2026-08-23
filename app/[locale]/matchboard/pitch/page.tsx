import type { Metadata } from "next";
import Image from "next/image";

import styles from "./matchboard-pitch.module.css";

export const metadata: Metadata = {
  title: "ÉliteReplay MatchBoard — Premium Sales Presentation",
  description: "Die ÉliteReplay MatchBoard Präsentation für Clubs und Court-Betreiber.",
  robots: { index: false, follow: false },
};

const clubQuestions = [
  "Wer kommt wieder?",
  "Wie oft?",
  "Welche Spieler verschwinden?",
  "Welche Teams entstehen?",
  "Welche Formate funktionieren?",
  "Welche Events bringen Spieler zurück?",
  "Welche Courts werden tatsächlich genutzt?",
  "Welche Spieler verbinden die Community?",
];

const intelligenceTerms = [
  "ACTIVE PLAYERS",
  "RETURNING PLAYERS",
  "PLAY FREQUENCY",
  "RETENTION",
  "AT RISK",
  "COMMUNITY",
  "COURT INTELLIGENCE",
  "TOURNAMENT ENGAGEMENT",
];

const smartcourtCore = ["SCORE", "MATCH STATE", "PLAYER HISTORY", "MYMOMENT"];
const smartcourtVision = ["CLUB INTELLIGENCE", "RETENTION", "TOURNAMENTS", "SPONSORED MOMENTS"];

export default function MatchboardPitchPage() {
  return (
    <main className={styles.deck}>
      <article className={`${styles.slide} ${styles.hook}`} aria-labelledby="hook-title">
        <Image
          src="/images/matchboard-real-reference.jpg"
          alt="Padel-Court mit ÉliteReplay MatchBoard"
          fill
          priority
          sizes="1122px"
          className={styles.hookImage}
        />
        <div className={styles.hookShade} />
        <SlideHeader page="01" label="The Hook" />
        <div className={styles.hookCopy}>
          <p className={styles.eyebrow}>THE COURT, REMEMBERED.</p>
          <h1 id="hook-title">YOUR COURT.<br />NOW IT REMEMBERS.</h1>
          <p className={styles.hookStory}>
            Jeden Tag werden auf deinem Court Punkte gewonnen. Matchbälle vergeben.
            Golden Points entschieden. Revanchen gespielt. Siege gefeiert.
          </p>
          <div className={styles.hookTurn}>
            <p>Und danach?</p>
            <strong>WAR ALLES WEG.</strong>
            <span>Bis jetzt.</span>
          </div>
        </div>
        <div className={styles.productTag}>
          <span>ÉLITEREPLAY</span>
          <strong>MATCHBOARD</strong>
        </div>
      </article>

      <article className={`${styles.slide} ${styles.meet}`} aria-labelledby="meet-title">
        <SlideHeader page="02" label="Meet MatchBoard" />
        <div className={styles.meetIntro}>
          <p className={styles.eyebrow}>THE MEMORY LAYER</p>
          <h2 id="meet-title">MEET<br />MATCHBOARD.</h2>
          <p>ÉliteReplay MatchBoard zeigt nicht einfach den Spielstand.</p>
          <strong>ES KENNT DAS MATCH.</strong>
        </div>
        <div className={styles.meetVisual}>
          <Image
            src="/images/matchboard-real-reference.jpg"
            alt="ÉliteReplay MatchBoard im laufenden Padel-Match"
            fill
            priority
            sizes="650px"
            className={styles.meetImage}
          />
          <div className={styles.meetVisualShade} />
          <div className={styles.matchFacts} aria-label="MatchBoard kennt die Struktur des Matches">
            {[
              ["WER", "SPIELT."],
              ["MIT", "WEM."],
              ["GEGEN", "WEN."],
              ["WO", "ES PASSIERT."],
              ["WIE OFT", "SIE SPIELEN."],
              ["WIE", "ES AUSGING."],
            ].map(([lead, tail]) => (
              <div key={lead + tail}>
                <span>{lead}</span><strong>{tail}</strong>
              </div>
            ))}
          </div>
        </div>
        <p className={styles.meetClose}>AND NEXT TIME? <strong>IT REMEMBERS.</strong></p>
      </article>

      <article className={`${styles.slide} ${styles.history}`} aria-labelledby="history-title">
        <SlideHeader page="03" label="Player History" />
        <div className={styles.historyTitle}>
          <p className={styles.eyebrow}>PLAYER HISTORY</p>
          <h2 id="history-title">EVERY MATCH<br />BECOMES PART<br />OF THE STORY.</h2>
          <p>Mit jedem Match wächst die persönliche Padel-Historie.</p>
        </div>
        <section className={styles.playerNumbers} aria-label="Beispiel einer persönlichen Match-Historie">
          <StatusLabel tone="live">HEUTE VERFÜGBAR</StatusLabel>
          <div className={styles.primaryPlayerStats}>
            <BigStat value="143" label="MATCHES" />
            <BigStat value="87" label="WINS" />
            <BigStat value="61%" label="WIN RATE" />
          </div>
          <div className={styles.playerRelations}>
            <SmallStat label="BEST PARTNER" value="Ricky" />
            <SmallStat label="RIVAL" value="Carlos" vision />
            <SmallStat label="WIN STREAK" value="7" />
            <SmallStat label="MYMOMENTS" value="24" />
          </div>
        </section>
        <section className={styles.historyVision} aria-label="Zukünftige Kennzahlen">
          <StatusLabel tone="vision">MIT WACHSENDER DATENBASIS MÖGLICH</StatusLabel>
          <div>
            {["Golden Points", "Tiebreaks", "Match Points", "Comebacks", "Personal Records"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
        <p className={styles.historyClose}>YOUR GAME. <strong>YOUR HISTORY.</strong></p>
      </article>

      <article className={`${styles.slide} ${styles.clubView}`} aria-labelledby="club-title">
        <SlideHeader page="04" label="The Club View" />
        <div className={styles.clubIntro}>
          <p className={styles.eyebrow}>THE PERSPECTIVE SHIFTS</p>
          <h2 id="club-title">YOUR PLAYERS PLAY.<br /><span>YOU LEARN.</span></h2>
          <p>
            Buchungen zeigen dir, wann ein Court reserviert wurde.
            <strong> ÉLITEREPLAY ZEIGT, WAS DANACH PASSIERT.</strong>
          </p>
        </div>
        <p className={styles.sampleNote}>ILLUSTRATIVE BEISPIELDATEN</p>
        <section className={styles.clubNumbers} aria-label="Illustrative Club-Kennzahlen">
          <ClubStat value="186" label="ACTIVE PLAYERS" status="MATCH-HISTORIE" />
          <ClubStat value="74%" label="RETURNING PLAYERS" status="ANALYTIK-VISION" vision />
          <ClubStat value="2.4×" label="PLAY FREQUENCY" status="MATCH-HISTORIE" />
          <ClubStat value="23" label="AT RISK" status="ANALYTIK-VISION" vision />
        </section>
        <div className={styles.clubSignals}>
          <span>MATCHBOARD ENGAGEMENT</span>
          <span>MYMOMENTS</span>
          <span>COURT ACTIVITY</span>
          <span>NEW PLAYERS</span>
        </div>
      </article>

      <article className={`${styles.slide} ${styles.returns}`} aria-labelledby="returns-title">
        <SlideHeader page="05" label="Club Intelligence" />
        <div className={styles.returnsIntro}>
          <p className={styles.eyebrow}>FROM ACTIVITY TO UNDERSTANDING</p>
          <h2 id="returns-title">KNOW WHAT<br />BRINGS THEM BACK.</h2>
        </div>
        <div className={styles.questionField}>
          {clubQuestions.map((question, index) => (
            <p key={question}><span>{String(index + 1).padStart(2, "0")}</span>{question}</p>
          ))}
        </div>
        <div className={styles.intelligenceTerms} aria-label="Künftige Club-Intelligence-Perspektiven">
          <StatusLabel tone="vision">ANALYTIK-VISION</StatusLabel>
          <div>{intelligenceTerms.map((term) => <span key={term}>{term}</span>)}</div>
        </div>
        <p className={styles.returnsClose}>AUS COURT-AKTIVITÄT <strong>WIRD CLUB INTELLIGENCE.</strong></p>
      </article>

      <article className={`${styles.slide} ${styles.buttonSlide}`} aria-labelledby="button-title">
        <SlideHeader page="06" label="Simple On Court" />
        <div className={styles.buttonIntro}>
          <p className={styles.eyebrow}>PLAYER CONTROL, SIMPLIFIED.</p>
          <h2 id="button-title">ONE BUTTON.<br />A WHOLE NEW LAYER.</h2>
          <p>Ein Button pro Team. Kein Smartphone auf dem Court.</p>
        </div>
        <div className={styles.buttonStage}>
          <div className={styles.buttonHalo} />
          <Image
            src="/images/elitereplay-player-button.png"
            alt="ÉliteReplay Player Button"
            width={588}
            height={468}
            priority
            sizes="430px"
            className={styles.buttonImage}
          />
          <span className={styles.buttonCaption}>ONE BUTTON PER TEAM</span>
        </div>
        <section className={styles.gestures} aria-label="Bedienung des Player Buttons">
          <Gesture command="1×" action="PUNKT" detail="für dein Team" />
          <Gesture command="2×" action="UNDO" detail="letzten Punkt korrigieren" />
          <Gesture command="HOLD" action="MYMOMENT" detail="einen Moment markieren" />
        </section>
        <div className={styles.buttonPromise}>
          <strong>SPIELER BLEIBEN IM MATCH.</strong>
          <p>Keine App während des Spiels. ÉliteReplay kümmert sich um den Rest.</p>
        </div>
      </article>

      <article className={`${styles.slide} ${styles.product}`} aria-labelledby="product-title">
        <SlideHeader page="07" label="MatchBoard Is The Product" />
        <div className={styles.productIntro}>
          <p className={styles.eyebrow}>NOT A WAITING ROOM FOR CAMERAS</p>
          <h2 id="product-title">THIS IS ALREADY<br /><span>A SMARTCOURT.</span></h2>
        </div>
        <div className={styles.productVocabulary}>
          <section>
            <StatusLabel tone="live">DAS FUNDAMENT HEUTE</StatusLabel>
            <div>{smartcourtCore.map((item) => <strong key={item}>{item}</strong>)}</div>
          </section>
          <section>
            <StatusLabel tone="vision">DARAUF AUFBAUEND</StatusLabel>
            <div>{smartcourtVision.map((item) => <strong key={item}>{item}</strong>)}</div>
          </section>
        </div>
        <div className={styles.memoryStatement}>
          <p>DAS MATCHBOARD IST</p>
          <strong>DAS GEDÄCHTNIS<br />DEINES COURTS.</strong>
        </div>
      </article>

      <article className={`${styles.slide} ${styles.cameras}`} aria-labelledby="cameras-title">
        <Image
          src="/images/elitereplay/sidecam-moment.jpg"
          alt="ÉliteReplay Kameraperspektive eines Padel-Matches"
          fill
          priority
          sizes="1122px"
          className={styles.cameraImage}
        />
        <div className={styles.cameraShade} />
        <SlideHeader page="08" label="The Upgrade" />
        <div className={styles.cameraIntro}>
          <p className={styles.eyebrow}>THE REVEAL</p>
          <h2 id="cameras-title">AND THEN<br />YOU ADD CAMERAS.</h2>
          <p>MatchBoard kennt bereits den Match Point, den Golden Point, den Winner und den MyMoment.</p>
          <strong>NOW GIVE THE MOMENT A PICTURE.</strong>
        </div>
        <div className={styles.transformations} aria-label="Vom Match-Ereignis zum Bild">
          <Transformation from="MYMOMENT" to="VIDEO" />
          <Transformation from="GOLDEN POINT" to="REPLAY" />
          <Transformation from="WINNER" to="HIGHLIGHT" />
          <Transformation from="MATCH" to="CONTENT" />
        </div>
        <div className={styles.smartcourtReveal}>
          <p>ÉLITEREPLAY <strong>SMARTCOURT</strong></p>
          <span>Multi-Camera Replay</span>
          <span>Automatic Highlights</span>
          <span>Player Content</span>
          <span>Club Content</span>
          <span>Sponsored Moments</span>
        </div>
      </article>

      <article className={`${styles.slide} ${styles.closing}`} aria-labelledby="closing-title">
        <SlideHeader page="09" label="Closing" />
        <div className={styles.closingStatement}>
          <p id="closing-title">FIRST,<br /><strong>THE COURT REMEMBERS.</strong></p>
          <span />
          <p>THEN,<br /><strong>IT REPLAYS.</strong></p>
        </div>
        <div className={styles.closingBrand}>
          <Image
            src="/images/elitereplay-logo.png"
            alt="ÉliteReplay"
            width={1040}
            height={595}
            className={styles.closingLogo}
          />
          <p>Your score. Your focus. Your moment.</p>
        </div>
        <div className={styles.closingAction}>
          <p>MAKE YOUR COURT <strong>UNFORGETTABLE.</strong></p>
          <span>CLUB-PILOT KENNENLERNEN</span>
        </div>
      </article>
    </main>
  );
}

function SlideHeader({ page, label }: { page: string; label: string }) {
  return (
    <header className={styles.masthead}>
      <Image
        src="/images/elitereplay-logo.png"
        alt="ÉliteReplay"
        width={1040}
        height={595}
        className={styles.logo}
        priority={page === "01"}
      />
      <span>{label}</span>
      <b>MATCHBOARD / {page}</b>
    </header>
  );
}

function StatusLabel({ children, tone }: { children: React.ReactNode; tone: "live" | "vision" }) {
  return <p className={`${styles.statusLabel} ${styles[tone]}`}><i />{children}</p>;
}

function BigStat({ value, label }: { value: string; label: string }) {
  return <div><strong>{value}</strong><span>{label}</span></div>;
}

function SmallStat({ value, label, vision = false }: { value: string; label: string; vision?: boolean }) {
  return (
    <div className={vision ? styles.futureRelation : undefined}>
      <span>{label}</span><strong>{value}</strong>{vision ? <em>IM AUSBAU</em> : null}
    </div>
  );
}

function ClubStat({ value, label, status, vision = false }: { value: string; label: string; status: string; vision?: boolean }) {
  return (
    <div className={vision ? styles.visionStat : undefined}>
      <span>{status}</span>
      <strong>{value}</strong>
      <p>{label}</p>
    </div>
  );
}

function Gesture({ command, action, detail }: { command: string; action: string; detail: string }) {
  return (
    <div>
      <strong>{command}</strong>
      <p>{action}</p>
      <span>{detail}</span>
    </div>
  );
}

function Transformation({ from, to }: { from: string; to: string }) {
  return <div><span>{from}</span><i>→</i><strong>{to}</strong></div>;
}
