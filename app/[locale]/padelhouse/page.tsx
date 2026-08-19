import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BedDouble,
  Camera,
  Check,
  Flame,
  MapPin,
  MessageCircle,
  Sun,
  Trophy,
  Users,
  Utensils,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LeadForm } from "./LeadForm";

export const metadata: Metadata = {
  title: "ÉliteReplay PadelHouse Fuerteventura | Pilotcamp für 6 Spieler",
  description:
    "Das erste ÉliteReplay PadelHouse: persönliches Coaching, Matchplay, MatchBoard und eigene Highlights auf Fuerteventura. Maximal 6 Spieler.",
};

const whatsappHref =
  "https://wa.me/34640772955?text=Hallo%2C%20ich%20m%C3%B6chte%20einen%20der%206%20Pl%C3%A4tze%20im%20%C3%89liteReplay%20PadelHouse%20Pilotcamp%20auf%20Fuerteventura%20anfragen.%20Mein%20Level%20ist%3A%20____.%20Wunschzeitraum%3A%20____.";

const media = {
  heroVideo:
    "/deliveries/padel-germany-v1/final-highlights/h10_point_31_interleaved_match_moments_v5_final.mp4",
  heroPoster: "/images/matchboard-real-reference.jpg",
  highlightVideo:
    "/deliveries/padel-germany-v1/final-highlights/h06_point_21_interleaved_match_moments_v5_final.mp4",
  highlightPoster:
    "/deliveries/padel-germany-v1/posters/h06_last_topdown_frame.png",
  matchBoard: "/images/matchboard-real-reference.jpg",
  playerCard: "/images/cards/player-card-olli.jpg",
  corralejo: "/images/padelhouse/corralejo-grandes-playas.jpg",
};

const navItems = [
  ["Erlebnis", "#camp"],
  ["ÉliteReplay", "#elitereplay"],
  ["Training", "#training"],
  ["Fuerteventura", "#fuerteventura"],
  ["Woche", "#woche"],
  ["Camp-Base", "#base"],
];

const campPillars: Array<{
  title: string;
  text: string;
  Icon: LucideIcon;
}> = [
  {
    title: "Du wirst gesehen",
    text: "Maximal 6 Spieler. Persönliches Coaching. Raum für dein Spiel und deinen Fortschritt.",
    Icon: Flame,
  },
  {
    title: "Du spielst um echte Punkte",
    text: "Matchplay, Drucksituationen und ein Finale, das sich nach Turnier anfühlt.",
    Icon: Trophy,
  },
  {
    title: "Du lebst die Insel",
    text: "Sonne, Corralejo und gemeinsame Zeit mit Menschen, die Padel genauso fühlen.",
    Icon: Sun,
  },
  {
    title: "Du nimmst den Beweis mit",
    text: "MatchBoard, persönliche Highlights und deine Player Card machen die Woche unvergesslich.",
    Icon: Camera,
  },
];

const trainingRhythm: Array<{
  label: string;
  title: string;
  text: string;
  Icon: LucideIcon;
}> = [
  {
    label: "COACHING",
    title: "Der Coach sieht dein Spiel",
    text: "Persönliche Stärken, Entscheidungen und die Situationen, die dich wirklich weiterbringen.",
    Icon: Sun,
  },
  {
    label: "MATCHPLAY",
    title: "Du setzt es unter Druck um",
    text: "Aus Technik werden echte Punkte, Partnerplay, Wettbewerb und wachsendes Selbstvertrauen.",
    Icon: Flame,
  },
  {
    label: "PROOF",
    title: "Du siehst deinen Fortschritt",
    text: "MatchBoard, Kameraperspektiven und persönliche Momente zeigen, was sich auf dem Court verändert.",
    Icon: Trophy,
  },
];

const cameraViews = [
  {
    title: "NETCAM",
    claim: "Ganz nah an deinem entscheidenden Punkt.",
    text: "Der Volley direkt vor der Kamera. Die schnelle Reaktion. Der Moment, in dem du den Punkt öffnest.",
    detail: "NetCam · Volley · Netzaktion",
    image: "/images/elitereplay/netcam-moment.jpg",
  },
  {
    title: "SIDECAM",
    claim: "Dein Sprint. Dein Partner. Euer Punkt.",
    text: "Der Weg zur Scheibe, die Bewegung ans Netz und der Blick zum Partner – plötzlich wird Zusammenspiel sichtbar.",
    detail: "SideCam · Bewegung · Partnerplay",
    image: "/images/elitereplay/sidecam-moment.jpg",
  },
  {
    title: "TOP-DOWN",
    claim: "Hier wird aus vier Spielern ein Match.",
    text: "Abstände, Laufwege und der Matchball im ganzen Bild. Du siehst, wie der Punkt wirklich entschieden wurde.",
    detail: "Top-Down · Raum · Team",
    image:
      "/deliveries/padel-germany-v1/posters/h10_last_topdown_frame.png",
  },
];

const campBaseGallery = [
  {
    src: "/images/padelhouse/roof-loungers-view.png",
    alt: "Dachterrasse der Camp-Base mit Blick über Corralejo",
    label: "Dachterrasse & Aussicht",
    className: "col-span-2 row-span-2",
  },
  {
    src: "/images/padelhouse/terrace-pool.jpg",
    alt: "Sonnige Terrasse mit Pool an der Camp-Base",
    label: "Pool & Sonne",
    className: "lg:row-span-2",
  },
  {
    src: "/images/padelhouse/living-room-warm.png",
    alt: "Gemeinsamer Wohnbereich der Camp-Base",
    label: "Gemeinsame Zeit",
    className: "",
  },
  {
    src: "/images/padelhouse/bedroom.jpg",
    alt: "Helles Schlafzimmer der Camp-Base",
    label: "Zimmer",
    className: "",
  },
  {
    src: "/images/padelhouse/sunset-bbq.png",
    alt: "Gemeinsames Essen am Grill bei Sonnenuntergang",
    label: "BBQ & Abende",
    className: "",
  },
];

const weekPlan = [
  {
    day: "Sonntag",
    focus: "ANKOMMEN",
    title: "Ankommen, kennenlernen, Ziele setzen",
    intro:
      "Du kommst in der gemeinsamen Camp-Base an, lernst die kleine Gruppe kennen und startest in die Woche.",
    items: [
      "Ankommen im Haus und gemeinsamer Start",
      "Spielniveau, Ziele und persönliche Entwicklungsthemen besprechen",
      "Maximal 6 Teilnehmer: gemeinsam wohnen, trainieren, Matches spielen und Erinnerungen sammeln",
    ],
  },
  {
    day: "Montag",
    focus: "TECHNIK & SPIELERIDENTITÄT",
    title: "Die Basis für deine Woche",
    intro:
      "Ab 9:00 Uhr beginnt die erste Trainingseinheit. Wir schaffen eine gemeinsame Grundlage und schauen gleichzeitig auf dein individuelles Spiel.",
    items: [
      "Basics, Ballkontrolle und Positionierung",
      "Volleys, Netzspiel, persönliche Stärken und Entwicklungsfelder",
      "Ausgewählte Übungen aus mehreren Kameraperspektiven",
      "Erste Clips können Ausgangslage und Entwicklungsthemen sichtbar machen",
      "Zweite Einheit am Nachmittag",
      "Erste Abendmatches mit MatchBoard",
    ],
  },
  {
    day: "Dienstag",
    focus: "KONTROLLE & NETZ",
    title: "Spielsituationen unter Druck",
    intro:
      "Technik wird in Entscheidungen übersetzt: vom Spielaufbau bis zum gemeinsamen Weg ans Netz.",
    items: [
      "Spielaufbau und Übergang von der Defensive ans Netz",
      "Volley, Bandeja und Vibora",
      "Partnerarbeit und Entscheidungen unter Druck",
      "Gezielte Aufnahmen mit NetCam, SideCam und Top-Down",
      "Coach-Feedback plus visuelle Perspektive",
      "Abends MatchBoard und Matchplay",
    ],
  },
  {
    day: "Mittwoch",
    focus: "RECOVERY & INSEL",
    title: "Durchatmen auf Fuerteventura",
    intro:
      "Ein freier oder leichterer Tag gibt Körper und Kopf Zeit, das Training zu verarbeiten.",
    items: [
      "Strand, Inselzeit oder eine entspannte Gruppenaktivität",
      "Regeneration und gemeinsame Zeit",
      "Je nach Ablauf können erste Szenen oder Trainingsbilder sichtbar werden",
    ],
  },
  {
    day: "Donnerstag",
    focus: "ANGRIFF & VERTEIDIGUNG",
    title: "Entwicklung sichtbar machen",
    intro:
      "Ab 9:00 Uhr geht es um Situationen, die im Match den Unterschied machen. Der Coach setzt die Schwerpunkte passend zur Gruppe.",
    items: [
      "Angriff am Netz und Verteidigung über die Scheibe",
      "Lob, Gegenangriff und gemeinsames Verschieben",
      "Individuelle Spielsituationen gezielt bearbeiten",
      "Kameras dort einsetzen, wo Fortschritt sichtbar werden kann",
    ],
  },
  {
    day: "Freitag",
    focus: "MATCH PERFORMANCE",
    title: "Das Gelernte im Punkt anwenden",
    intro:
      "Technik, Matchsituationen, Punkte und kleine Challenges greifen ineinander. Jetzt zählt, wie du unter echten Bedingungen entscheidest.",
    items: [
      "Matchnahe Aufgaben und Wettkampfsituationen",
      "Optional Matches mit lokalen Spielern – abhängig von Level und Verfügbarkeit",
      "Abendliches Matchplay",
      "Highlights mit Spielstand, Atmosphäre und echten Aktionen",
    ],
  },
  {
    day: "Samstag",
    focus: "FINALE",
    title: "Final Battle",
    intro:
      "Die Campwoche läuft im Abschlussturnier zusammen: Teams, echte Punkte, MatchBoard, Kameras und spürbare Turnieratmosphäre.",
    items: [
      "Turnier mit Teams und Matchplay",
      "Head Coach, taktische Tipps und sportlicher Abschluss",
      "Persönliche Aktionen, Bilder und Videos festhalten",
      "Matchball, Jubel und gemeinsame Momente",
    ],
  },
  {
    day: "Sonntag",
    focus: "ABREISE",
    title: "Leave with proof",
    intro:
      "Du verlässt die Insel mit einem neuen Verständnis für dein Spiel – und mit Momenten, die deine Woche greifbar machen.",
    items: [
      "Coaching-Impulse und neue Match-Erfahrung",
      "Bilder, Videos und persönliche Replay-Momente",
      "Eine gemeinsame Woche, an die du dich nicht nur erinnern musst",
    ],
  },
];

const campBaseFacts: Array<{ label: string; Icon: LucideIcon }> = [
  { label: "kleine Campgruppe mit maximal 6 Teilnehmern", Icon: Users },
  { label: "3 Schlafzimmer als gemeinsame Camp-Base", Icon: BedDouble },
  { label: "Pool und Terrasse für die Zeit zwischen den Einheiten", Icon: Waves },
  { label: "Dachterrasse und BBQ für gemeinsame Abende", Icon: Utensils },
];

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#071218]/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-5 pl-5 pr-24 sm:pl-6 sm:pr-28 lg:pl-8 xl:pr-32">
        <Link
          href="#top"
          className="min-w-0 text-sm font-semibold tracking-normal sm:text-base"
        >
          ÉliteReplay <span className="text-[#E4B65D]">Padelcamp</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-white/66 xl:flex">
          {navItems.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="transition hover:text-[#E4B65D]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <Button
          asChild
          size="sm"
          className="hidden rounded-full bg-[#E4B65D] px-5 font-bold text-[#071218] hover:bg-[#F3D18E] sm:inline-flex"
        >
          <Link href="#lead">Pilotplatz · 1.099 €</Link>
        </Button>
      </div>
    </header>
  );
}

function Eyebrow({
  children,
  light = false,
  blue = false,
}: {
  children: ReactNode;
  light?: boolean;
  blue?: boolean;
}) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.24em] sm:text-sm ${
        blue
          ? "text-[#6FD6E8]"
          : light
            ? "text-[#E4B65D]"
            : "text-[#A66D12]"
      }`}
    >
      {children}
    </p>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
  light = false,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-4xl`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-4 text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-6xl ${
          light ? "text-white" : "text-[#0B151B]"
        }`}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={`mt-5 max-w-3xl text-lg leading-8 ${
            light ? "text-white/68" : "text-[#56616A]"
          } ${centered ? "mx-auto" : ""}`}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}

function MediaLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex rounded-full border border-white/18 bg-[#071218]/82 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur ${className}`}
    >
      {children}
    </span>
  );
}

function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-[#071218] text-white"
    >
      <Image
        src={media.heroPoster}
        alt="Vier Spieler in einem ÉliteReplay Match mit MatchBoard im Padel Club Germany"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[55%_center]"
      />
      <video
        className="absolute inset-0 h-full w-full object-cover object-[55%_center] motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={media.heroPoster}
        aria-hidden="true"
      >
        <source src={media.heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,12,17,0.94)_0%,rgba(4,12,17,0.72)_43%,rgba(4,12,17,0.18)_78%),linear-gradient(0deg,rgba(4,12,17,0.80)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(49,184,205,0.18),transparent_34%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-5 pb-28 pt-32 sm:px-6 sm:pb-16 lg:px-8 lg:pb-12">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/24 bg-[#071218]/58 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/88 backdrop-blur sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#6FD6E8]" />
            Das erste ÉliteReplay PadelHouse · maximal 6 Spieler
          </div>

          <h1 className="mt-7 max-w-5xl text-[3.15rem] font-semibold leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-[5.7rem]">
            Spiel die Woche, über die du noch Jahre sprichst.
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-white/88 sm:text-2xl sm:leading-9">
            Persönliches Coaching. Matchplay in der Sonne. Und deine besten
            Momente als ÉliteReplay-Highlights.
          </p>

          <div className="mt-7 flex max-w-3xl flex-col gap-5 rounded-2xl border border-white/18 bg-[#071218]/64 p-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6FD6E8]">
                Pilotcamp · Fuerteventura
              </p>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-3xl font-semibold text-[#E4B65D] sm:text-4xl">
                  1.099 €
                </span>
                <span className="text-sm text-white/48">
                  später regulär 1.399 €
                </span>
              </div>
              <p className="mt-2 text-sm text-white/58">
                Ein besonderer Einstiegspreis für die ersten sechs.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="h-12 shrink-0 rounded-full bg-[#E4B65D] px-7 font-bold text-[#071218] hover:bg-[#F3D18E]"
            >
              <Link href="#lead">
                Pilotplatz anfragen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-[0.16em] text-white/68">
          {[
            "Persönliches Coaching",
            "MatchBoard",
            "Eigene Highlights",
            "Player Card",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#6FD6E8]" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-5 top-20 z-10 text-right md:bottom-7 md:right-7 md:top-auto">
        <MediaLabel>
          ÉliteReplay Produktbeispiel · Padel Club Germany
        </MediaLabel>
        <p className="mt-3 hidden text-xs uppercase tracking-[0.18em] text-white/52 md:block">
          Vier Spieler · MatchBoard · Matchmoment
        </p>
      </div>
    </section>
  );
}

function CampPillarsSection() {
  return (
    <section id="camp" className="bg-[#071218] px-5 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/12 pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div className="flex items-end gap-5">
            <span className="text-[7rem] font-semibold leading-[0.75] tracking-[-0.08em] text-[#E4B65D] sm:text-[10rem]">
              6
            </span>
            <div className="pb-1">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#6FD6E8]">
                Plätze insgesamt
              </p>
              <p className="mt-2 max-w-xs text-lg leading-7 text-white/60">
                Keine anonyme Reisegruppe. Eine Crew, in der jeder zählt.
              </p>
            </div>
          </div>
          <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
            Du bist nicht Teilnehmer Nummer 37.{" "}
            <span className="text-white/38">Der Coach kennt dein Spiel.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4">
          {campPillars.map(({ title, text, Icon }, index) => (
            <article
              key={title}
              className="group relative border-b border-white/12 px-0 py-8 sm:px-6 sm:[&:nth-child(odd)]:border-r xl:border-b-0 xl:border-r xl:first:pl-0 xl:last:border-r-0 xl:last:pr-0"
            >
              <div className="flex items-center justify-between gap-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#102933] text-[#6FD6E8]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold tracking-[0.18em] text-white/28">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-white/58">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-between gap-5 rounded-2xl bg-[#102832] p-6 sm:flex-row sm:items-center sm:p-8">
          <p className="max-w-3xl text-xl font-semibold leading-8 sm:text-2xl">
            Eine Woche für Menschen, die besser spielen wollen – und die guten
            Momente nicht auf dem Court zurücklassen möchten.
          </p>
          <Button
            asChild
            variant="outline"
            className="shrink-0 rounded-full border-white/20 bg-white/8 px-6 font-bold text-white hover:bg-white hover:text-[#071218]"
          >
            <Link href="#elitereplay">Das macht ÉliteReplay besonders</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function TrainingSection() {
  return (
    <section
      id="training"
      className="overflow-hidden bg-[#F3E7D2] px-5 py-16 text-[#0B151B] sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <SectionIntro
            eyebrow="Persönliches Coaching. Echte Spielsituationen."
            title="Nicht mehr trainieren. Besser spielen."
            text="Du arbeitest nicht an beliebigen Übungen. In der kleinen Gruppe geht es um dein Spiel: deine Entscheidungen, deine Stärken und die Situationen, die im Match den Unterschied machen."
          />

          <div className="rounded-2xl bg-[#0A171D] p-7 text-white shadow-[0_24px_60px_rgba(7,18,24,0.16)] sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6FD6E8]">
              Was sich verändert
            </p>
            <p className="mt-4 text-2xl font-semibold leading-9 sm:text-3xl">
              Du verstehst früher, entscheidest klarer und gehst bewusster in
              den nächsten Punkt.
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-white/12 pt-5 text-sm text-white/54">
              <Users className="h-5 w-5 text-[#E4B65D]" />
              Persönliche Aufmerksamkeit statt Training in der Masse.
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {trainingRhythm.map(({ label, title, text, Icon }, index) => (
            <article
              key={label}
              className="relative overflow-hidden rounded-2xl border border-black/8 bg-white p-7 shadow-[0_16px_40px_rgba(36,30,18,0.05)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DDF2F4] text-[#176B7A]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold tracking-[0.18em] text-[#A66D12]">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-6 text-xs font-bold tracking-[0.18em] text-[#176B7A]">
                {label}
              </p>
              <h3 className="mt-3 text-2xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-[#5D6870]">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-y border-[#D7C49F] py-5 text-sm font-semibold text-[#344047]">
          {[
            "morgens Training",
            "abends Training oder Matchplay",
            "Samstag Abschlussturnier",
            "ein leichterer Tag für Insel & Recovery",
          ].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#2BAFC6]" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function WeekTimelineSection() {
  return (
    <section
      id="woche"
      className="bg-[#FFF8EA] px-5 py-16 text-[#0B151B] sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Von Sonntag bis Sonntag"
          title="Eine Woche mit einem klaren Spannungsbogen."
          text="Ankommen. Das eigene Spiel verstehen. Unter Druck besser entscheiden. Im Final Battle alles zusammenbringen. Und mit sichtbaren Momenten abreisen."
          centered
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-3 md:grid-cols-2">
          {weekPlan.map((day, index) => (
            <details
              key={`${day.day}-${day.focus}`}
              className="group rounded-2xl border border-[#DDCBA8] bg-white p-5 shadow-[0_12px_34px_rgba(36,30,18,0.05)] open:border-[#2BAFC6]/40 open:bg-[#F7FBFB] sm:p-6"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0A171D] text-xs font-bold text-[#6FD6E8]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#A66D12]">
                    {day.day} · {day.focus}
                  </span>
                  <span className="mt-1 block text-xl font-semibold leading-7">
                    {day.title}
                  </span>
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D7C49F] text-lg text-[#176B7A] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="ml-[3.75rem] mt-5 border-t border-[#D7C49F] pt-5">
                <p className="leading-7 text-[#59656C]">{day.intro}</p>
                <ul className="mt-4 grid gap-2 text-sm text-[#344047]">
                  {day.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 leading-6">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[#2BAFC6]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-5xl flex-col items-center justify-between gap-6 rounded-2xl bg-[#0A171D] p-7 text-center text-white sm:p-9 lg:flex-row lg:text-left">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6FD6E8]">
              Das Ziel
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              Besser spielen. Mehr erleben. Den Fortschritt mitnehmen.
            </p>
          </div>
          <Button
            asChild
            className="shrink-0 rounded-full bg-[#E4B65D] px-7 font-bold text-[#071218] hover:bg-[#F3D18E]"
          >
            <Link href="#lead">Einen der 6 Plätze anfragen</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function EliteReplaySection() {
  return (
    <section
      id="elitereplay"
      className="overflow-hidden bg-[#061116] px-5 py-16 text-white sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-2xl border border-white/12 bg-[#0A1A21] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <Eyebrow blue>Der ÉliteReplay-Unterschied</Eyebrow>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              Dein Match endet. Dein Moment bleibt.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/64">
              MatchBoard, professionelle Kameraperspektiven und persönliche
              Highlights machen aus deinem Ballwechsel eine Szene, die sich
              genauso besonders anfühlt wie der Punkt selbst.
            </p>
            <p className="mt-8 border-l-2 border-[#6FD6E8] pl-5 text-2xl font-semibold leading-9 text-[#D7F1F5]">
              Du siehst dich selbst plötzlich wie einen echten Spieler.
            </p>
          </div>
          <div className="relative min-h-[390px] bg-black lg:min-h-[600px]">
            <Image
              src={media.matchBoard}
              alt="ÉliteReplay MatchBoard als Produktbeispiel aus dem Padel Club Germany"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/5 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <MediaLabel>
                ÉliteReplay Produktbeispiel · Padel Club Germany
              </MediaLabel>
              <p className="mt-4 text-2xl font-semibold sm:text-3xl">
                Spielstand. Matchzeit. Echte Emotion.
              </p>
              <p className="mt-2 max-w-xl text-white/62">
                Nicht irgendein Handyvideo – dein Punkt mit Kontext,
                Perspektive und Atmosphäre.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <Eyebrow blue>Drei Perspektiven auf dein Spiel</Eyebrow>
              <h3 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Plötzlich sieht dein Padel nach großer Bühne aus.
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-6 text-white/54">
              Die gezeigten Medien sind bestehende ÉliteReplay-Produktbeispiele
              und keine Aufnahmen eines bereits durchgeführten Fuerteventura-Camps.
            </p>
          </div>

          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            {cameraViews.map((view, index) => (
              <article
                key={view.title}
                className="overflow-hidden rounded-2xl border border-white/12 bg-[#0A1A21]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <Image
                    src={view.image}
                    alt={`${view.title} als ÉliteReplay Produktbeispiel aus dem Padel Club Germany`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-black/10" />
                  <div className="absolute left-4 top-4">
                    <MediaLabel>
                      ÉliteReplay Produktbeispiel · Padel Club Germany
                    </MediaLabel>
                  </div>
                  <span className="absolute bottom-4 right-4 text-xs font-bold tracking-[0.18em] text-white/50">
                    0{index + 1}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold tracking-[0.22em] text-[#6FD6E8]">
                    {view.title}
                  </p>
                  <h4 className="mt-3 text-2xl font-semibold">{view.claim}</h4>
                  <p className="mt-3 text-sm leading-6 text-white/58">{view.text}</p>
                  <p className="mt-5 border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#E4B65D]">
                    {view.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="relative min-h-[380px] overflow-hidden rounded-2xl border border-white/12 bg-black">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster={media.highlightPoster}
            >
              <source src={media.highlightVideo} type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute left-4 top-4">
              <MediaLabel>
                ÉliteReplay Produktbeispiel · Padel Club Germany
              </MediaLabel>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-20">
              <p className="text-2xl font-semibold">Deine persönlichen Highlights.</p>
              <p className="mt-2 text-sm leading-6 text-white/62">
                Je nach Ablauf können bereits während der Woche erste Bilder,
                Szenen oder Replay-Momente sichtbar werden.
              </p>
            </div>
          </div>

          <div className="grid overflow-hidden rounded-2xl border border-white/12 bg-[#102832] sm:grid-cols-[0.78fr_1.22fr]">
            <div className="relative min-h-[330px] bg-black">
              <Image
                src={media.playerCard}
                alt="Persönliche ÉliteReplay PlayerCard als Produktbeispiel aus dem Padel Club Germany"
                fill
                sizes="(min-width: 1024px) 22vw, 50vw"
                className="object-contain p-3"
              />
              <div className="absolute bottom-3 left-3">
                <MediaLabel>
                  ÉliteReplay Produktbeispiel · mögliche Player Card
                </MediaLabel>
              </div>
            </div>
            <div className="flex flex-col justify-center p-7">
              <Eyebrow blue>Player Card</Eyebrow>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
                Dein Name. Dein Team. Deine Woche.
              </h3>
              <p className="mt-4 leading-7 text-white/62">
                Deine Player Card macht aus einem Camp eine persönliche
                Erinnerung – und aus sechs Teilnehmern eine Crew.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-y border-white/14 py-12 text-center sm:py-16">
          <p className="text-3xl font-semibold tracking-[-0.035em] text-[#E4B65D] sm:text-5xl">
            Train hard. Leave with proof.
          </p>
          <div className="mx-auto mt-7 max-w-4xl text-lg leading-8 text-white/66 sm:text-xl">
            <p className="font-semibold text-white">
              Du verlässt das Camp nicht nur mit dem Gefühl, besser gespielt zu
              haben. Du nimmst die Momente mit, in denen du besser aussiehst,
              besser entscheidest und besser spielst.
            </p>
            <p className="mt-3">Deine Woche wird nicht nur erinnert. Sie wird festgehalten.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FuerteventuraSection() {
  return (
    <section
      id="fuerteventura"
      className="relative isolate flex min-h-[680px] items-end overflow-hidden bg-[#0A161C] px-5 py-16 text-white sm:px-6 lg:px-8 lg:py-24"
    >
      <Image
        src={media.corralejo}
        alt="Sonniger Strand bei Corralejo auf Fuerteventura"
        fill
        sizes="100vw"
        className="object-cover object-[80%_center] sm:object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 sm:hidden" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(4,13,18,0.84)_0%,rgba(4,13,18,0.42)_58%,rgba(4,13,18,0.12)_100%),linear-gradient(0deg,rgba(4,13,18,0.78)_0%,transparent_66%)] sm:block" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <Eyebrow light>Padel. Sonne. Deine Crew.</Eyebrow>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            Du kommst für Padel. Und willst noch nicht zurück.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
            Morgens der Court. Danach Sonne, Corralejo und Atlantik. Abends
            sitzt du mit fünf Menschen zusammen, mit denen aus einer
            Sportreise eine gemeinsame Geschichte geworden ist.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Sonne", "Corralejo", "Strand", "Recovery", "Campgemeinschaft"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm font-semibold text-white/84 backdrop-blur"
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CampBaseSection() {
  return (
    <section
      id="base"
      className="bg-white px-5 py-16 text-[#0B151B] sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <div className="grid auto-rows-[145px] grid-cols-2 gap-3 sm:auto-rows-[170px] lg:h-[560px] lg:auto-rows-auto lg:grid-cols-3 lg:grid-rows-3">
            {campBaseGallery.map((image, index) => (
              <div
                key={image.src}
                className={`group relative overflow-hidden rounded-2xl bg-[#0A171D] shadow-[0_20px_50px_rgba(16,27,32,0.12)] ${image.className}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(min-width: 1024px) 38vw, 100vw"
                      : "(min-width: 1024px) 19vw, 50vw"
                  }
                  className="object-cover transition duration-500 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/92 sm:bottom-4 sm:left-4 sm:text-xs">
                  {image.label}
                </span>
                {index === 0 ? (
                  <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                    <MediaLabel>Deine Camp-Base</MediaLabel>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-[#7B858A]">
            Visuelle Unterkunftsreferenz · die konkrete Camp-Base wird vor der
            Buchung bestätigt.
          </p>
        </div>

        <div>
          <SectionIntro
            eyebrow="Der Ort zwischen den Momenten"
            title="Die Base. Nicht das Ziel."
            text="Hier kommt die Crew zusammen. Zwischen Court und Insel, zwischen Matchanalyse und dem nächsten gemeinsamen Abend. Das Haus trägt die Woche – im Mittelpunkt steht, was ihr erlebt."
          />

          <div className="mt-9 border-y border-[#E0CFAD]">
            {campBaseFacts.map(({ label, Icon }) => (
              <div
                key={label}
                className="flex items-center gap-4 border-b border-[#E0CFAD] py-5 last:border-b-0"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A171D] text-[#E4B65D]">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="font-semibold leading-7 text-[#344047]">{label}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-[#667078]">
            <MapPin className="h-4 w-4 text-[#2BAFC6]" />
            Corralejo · Fuerteventura · kurze Wege zur Padelanlage
          </p>
        </div>
      </div>
    </section>
  );
}

function LeadSection() {
  return (
    <section
      id="lead"
      className="bg-[#071218] px-5 py-16 text-white sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto mb-12 max-w-7xl border-b border-white/12 pb-12">
        <Eyebrow light>Das erste ÉliteReplay PadelHouse</Eyebrow>
        <h2 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
          Sechs Plätze. Eine erste Woche.{" "}
          <span className="text-white/38">Vielleicht deine.</span>
        </h2>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="rounded-2xl border border-[#E4B65D]/26 bg-[#E4B65D]/10 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6FD6E8]">
              Pilotpreis
            </p>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span className="text-5xl font-semibold tracking-[-0.04em] text-[#E4B65D] sm:text-7xl">
                1.099 €
              </span>
              <span className="text-sm text-white/54">
                später regulär 1.399 €
              </span>
            </div>
            <p className="mt-5 text-lg leading-8 text-white/74">
              Kein Rabattcode. Eine besondere Chance für die ersten sechs, die
              dieses neue Format mit uns auf Fuerteventura erleben.
            </p>
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#6FD6E8]">
            Darum geht es in deiner Woche
          </p>
          <ul className="mt-5 grid gap-3">
            {[
              "persönliches Coaching in einer Gruppe von maximal 6 Spielern",
              "Training, Matchplay und gemeinsames Abschlussturnier",
              "MatchBoard und professionelle Kameraperspektiven",
              "persönliche Highlights und deine Player Card",
              "Fuerteventura, Sonne und echte Campgemeinschaft",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/74">
                <Check className="mt-1 h-4 w-4 shrink-0 text-[#6FD6E8]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-7 border-l-2 border-[#E4B65D] pl-5 text-lg font-semibold leading-8 text-white">
            Wenn sechs Spieler dabei sind, ist dieses erste Kapitel
            geschlossen.
          </p>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="mt-6 h-12 rounded-full border-white/22 bg-white/8 px-7 font-bold text-white hover:bg-white hover:text-[#071218]"
          >
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              Direkt per WhatsApp anfragen
              <MessageCircle className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="rounded-2xl border border-[#E4B65D]/20 bg-[#FFF8EA] p-5 shadow-[0_34px_90px_rgba(0,0,0,0.34)] sm:p-8">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#071218]/95 p-3 backdrop-blur-xl sm:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Button
          asChild
          className="rounded-full bg-[#E4B65D] font-bold text-[#071218] hover:bg-[#F3D18E]"
        >
          <Link href="#lead">Pilotplatz · 1.099 €</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="rounded-full border-white/20 bg-white font-bold text-[#071218]"
        >
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}

export default function PadelHousePage() {
  return (
    <main className="min-h-screen bg-[#FFF8EA] font-sans">
      <Header />
      <HeroSection />
      <CampPillarsSection />
      <EliteReplaySection />
      <TrainingSection />
      <FuerteventuraSection />
      <WeekTimelineSection />
      <CampBaseSection />
      <LeadSection />
      <MobileStickyCTA />
    </main>
  );
}
