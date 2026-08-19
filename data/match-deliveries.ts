import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import camp1Highlights from "@/data/camps/camp-1.json";
import camp2Highlights from "@/data/camps/camp-2.json";
import padelGermanyFinalHighlights from "@/data/deliveries/padel-germany-v1/final-highlights.json";

export type MatchDelivery = {
  matchId: string;
  deliveryId: string;
  title: string;
  subtitle: string;
  claim: string;
  heroVideoSrc: string;
  heroPosterSrc?: string;
  compare?: {
    leftSrc?: string;
    rightSrc?: string;
    leftLabel: string;
    rightLabel: string;
  };
  playerCard?: {
    imageSrc: string;
    alt: string;
    title: string;
    subtitle: string;
  };
  matchFacts: Array<{
    label: string;
    value: string;
  }>;
  shareQrSrc?: string;
  finalHighlights?: Array<{
    id?: string;
    title: string;
    pointId?: number | null;
    src: string;
    downloadName?: string;
    posterSrc?: string | null;
    filename?: string;
  }>;
  source: "delivery-manifest" | "dev-fallback";
};

type DeliverySourceReport = {
  source: "delivery-manifest" | "dev-fallback";
  deliveryRoot: string | null;
  availableFields: string[];
  missingFields: string[];
};

type DeliveryRow = Record<string, string>;
type SetupSnapshot = Record<string, unknown> & {
  club?: string;
  court?: string;
  team_a_name?: string;
  team_b_name?: string;
  playerA?: string;
  playerB?: string;
  players?: {
    team_a?: string[];
    team_b?: string[];
  };
};

const camp1Hero = camp1Highlights[0];
const camp2Hero = camp2Highlights[0];

const devFallbackDeliveries: MatchDelivery[] = [
  {
    matchId: "camp-1-home-demo",
    deliveryId: "highlight-camp-1-001",
    title: "Your match. Your angles. Your moment.",
    subtitle: "ÉliteReplay Delivery Link",
    claim:
      "Öffne dein Highlight, vergleiche beide Perspektiven und teile deinen ÉliteReplay-Link.",
    heroVideoSrc: camp1Hero.preview,
    heroPosterSrc: camp1Hero.thumbnail,
    compare: {
      leftSrc: camp1Hero.preview,
      rightSrc: camp1Hero.preview,
      leftLabel: "NetCam Left",
      rightLabel: "NetCam Right",
    },
    playerCard: {
      imageSrc: "/images/cards/player-card-olli.jpg",
      alt: "ÉliteReplay Player Card Beispiel",
      title: "PlayerCard",
      subtitle: "A premium keepsake from the same match moment.",
    },
    matchFacts: [
      { label: "Rally", value: "6 shots" },
      { label: "Court pressure", value: "High" },
      { label: "Net presence", value: "72%" },
      { label: "Replay mode", value: "NetCam vs NetCam" },
    ],
    shareQrSrc: "/images/qr-code.png",
    source: "dev-fallback",
  },
  {
    matchId: "camp-2-training-demo",
    deliveryId: "highlight-camp-2-001",
    title: "Your match. Your angles. Your moment.",
    subtitle: "ÉliteReplay Delivery Link",
    claim:
      "Öffne dein Highlight, vergleiche beide Perspektiven und teile deinen ÉliteReplay-Link.",
    heroVideoSrc: camp2Hero.preview,
    heroPosterSrc: camp2Hero.thumbnail,
    compare: {
      leftSrc: camp2Hero.preview,
      rightSrc: camp2Hero.preview,
      leftLabel: "SideCam",
      rightLabel: "NetCam",
    },
    playerCard: {
      imageSrc: "/images/cards/team-card-olli-basti.jpg",
      alt: "ÉliteReplay Team Card Beispiel",
      title: "TeamCard",
      subtitle:
        "Built from the same delivery dataset for camp pairs and doubles teams.",
    },
    matchFacts: [
      { label: "Training set", value: "Camp 2" },
      { label: "Moment type", value: "Net exchange" },
      { label: "Tempo", value: "Fast rally" },
      { label: "Replay mode", value: "SideCam vs NetCam" },
    ],
    shareQrSrc: "/images/qr-code.png",
    source: "dev-fallback",
  },
];

const deliveryRoot = path.join(process.cwd(), "data", "deliveries");

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const next = line[index + 1];

    if (character === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (character === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += character;
  }

  values.push(current.trim());
  return values;
}

async function readCsv(filePath: string) {
  const raw = await readFile(filePath, "utf8");
  const lines = raw.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) {
    return [] as DeliveryRow[];
  }

  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return headers.reduce<DeliveryRow>((row, header, index) => {
      row[header] = values[index] || "";
      return row;
    }, {});
  });
}

async function tryReadJson<T>(filePath: string) {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function fileExists(filePath: string) {
  try {
    await readFile(filePath, "utf8");
    return true;
  } catch {
    return false;
  }
}

function toPublicUrl(value?: string | null) {
  if (!value) {
    return "";
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.startsWith("/")) {
    return value;
  }

  if (value.includes("public/")) {
    const normalized = value.split("public/").pop();
    return normalized ? `/${normalized}` : "";
  }

  return "";
}

function pickFirst(row: DeliveryRow, keys: string[]) {
  for (const key of keys) {
    const value = row[key];
    if (value) {
      return value;
    }
  }
  return "";
}

function formatFinalHighlightTitle(fileName: string) {
  const baseName = fileName.replace(/\.[^.]+$/, "");
  const match = baseName.match(/^h(\d+)_point_(\d+)/i);

  if (match) {
    const [, highlightNumber, pointNumber] = match;
    return `Highlight ${highlightNumber.padStart(2, "0")} · Point ${pointNumber}`;
  }

  return baseName
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildMatchFacts(
  row: DeliveryRow,
  setupSnapshot: SetupSnapshot | null,
  compareMode: string,
) {
  const club = String(setupSnapshot?.club || "");
  const court = String(setupSnapshot?.court || "");
  const teamA = String(setupSnapshot?.team_a_name || "");
  const teamB = String(setupSnapshot?.team_b_name || "");

  const facts = [
    {
      label: "Club",
      value: club,
    },
    {
      label: "Court",
      value: court,
    },
    {
      label: "Teams",
      value: [teamA, teamB].filter(Boolean).join(" vs "),
    },
    {
      label: "Score before",
      value: pickFirst(row, ["score_before", "scoreBefore"]),
    },
    {
      label: "Score after",
      value: pickFirst(row, ["score_after", "scoreAfter"]),
    },
    {
      label: "Players",
      value:
        pickFirst(row, ["players", "player_names", "team_names"]) ||
        [
          ...(Array.isArray(setupSnapshot?.players?.team_a)
            ? setupSnapshot.players.team_a
            : []),
          ...(Array.isArray(setupSnapshot?.players?.team_b)
            ? setupSnapshot.players.team_b
            : []),
          setupSnapshot?.playerA,
          setupSnapshot?.playerB,
        ]
          .filter(Boolean)
          .join(" / "),
    },
    {
      label: "Replay mode",
      value: compareMode,
    },
  ];

  return facts.filter((fact) => fact.value);
}

function buildSourceReport(
  root: string | null,
  fields: Record<string, string | undefined>,
  source: "delivery-manifest" | "dev-fallback",
): DeliverySourceReport {
  const availabilityMap: Record<string, boolean> = {
    heroVideoSrc: Boolean(fields.heroVideoSrc),
    compareLeftSrc: Boolean(fields.compareLeftSrc),
    compareRightSrc: Boolean(fields.compareRightSrc),
    playerCardImage: Boolean(fields.playerCardImage),
    teamOrPlayerNames: Boolean(fields.teamOrPlayerNames),
    scoreBefore: Boolean(fields.scoreBefore),
    scoreAfter: Boolean(fields.scoreAfter),
  };

  return {
    source,
    deliveryRoot: root,
    availableFields: Object.entries(availabilityMap)
      .filter(([, present]) => present)
      .map(([key]) => key),
    missingFields: Object.entries(availabilityMap)
      .filter(([, present]) => !present)
      .map(([key]) => key),
  };
}

async function readDeliveryFolders() {
  try {
    const entries = await readdir(deliveryRoot, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(deliveryRoot, entry.name));
  } catch {
    return [];
  }
}

function getStaticFinalHighlights(folderName: string) {
  if (folderName === "padel-germany-v1") {
    return padelGermanyFinalHighlights.map((highlight) => ({
      id: highlight.id,
      title: highlight.title,
      pointId: highlight.pointId,
      src: highlight.src,
      downloadName: highlight.filename || highlight.downloadUrl || highlight.src.split("/").pop(),
      posterSrc: highlight.poster || null,
      filename: highlight.filename,
    }));
  }

  return [] as MatchDelivery["finalHighlights"];
}

async function readManifestDeliveries() {
  const folders = await readDeliveryFolders();
  const deliveries: MatchDelivery[] = [];
  const reports = new Map<string, DeliverySourceReport>();

  for (const folder of folders) {
    const folderName = path.basename(folder);
    const manifestPath = path.join(folder, "sendable_highlights_manifest.csv");
    const deliverySessionPath = path.join(folder, "delivery-session.json");
    const setupSnapshotPath = path.join(folder, "setup-snapshot.json");
    const playerCardOutputPath = path.join(folder, "playercard-output.json");

    if (!(await fileExists(manifestPath))) {
      continue;
    }

    const [manifestRows, deliverySession, setupSnapshot, playerCardOutput] =
      await Promise.all([
        readCsv(manifestPath),
        tryReadJson<Record<string, unknown>>(deliverySessionPath),
        tryReadJson<SetupSnapshot>(setupSnapshotPath),
        tryReadJson<Record<string, unknown>>(playerCardOutputPath),
      ]);
    const finalHighlights = getStaticFinalHighlights(folderName);

    const baseMatchId =
      String(deliverySession?.match_id || deliverySession?.matchId || path.basename(folder));

    manifestRows.forEach((row, index) => {
      const matchId = pickFirst(row, ["match_id", "matchId"]) || baseMatchId;
      const deliveryId =
        pickFirst(row, ["delivery_id", "deliveryId", "highlight_id", "highlightId"]) ||
        `${matchId}-${index + 1}`;

      const heroVideoSrc = toPublicUrl(
        pickFirst(row, [
          "heroVideoSrc",
          "hero_video_src",
          "preview_url",
          "previewUrl",
          "video_url",
          "videoUrl",
          "public_video_url",
        ]),
      );
      const heroPosterSrc = toPublicUrl(
        pickFirst(row, [
          "heroPosterSrc",
          "hero_poster_src",
          "thumbnail_url",
          "thumbnailUrl",
          "public_thumbnail_url",
        ]),
      );
      const compareLeftSrc = toPublicUrl(
        pickFirst(row, [
          "compare_left_src",
          "compareLeftSrc",
          "left_video_url",
          "leftVideoUrl",
          "netcam_left_url",
        ]),
      );
      const compareRightSrc = toPublicUrl(
        pickFirst(row, [
          "compare_right_src",
          "compareRightSrc",
          "right_video_url",
          "rightVideoUrl",
          "netcam_right_url",
        ]),
      );
      const playerCardImage = toPublicUrl(
        pickFirst(row, [
          "player_card_image",
          "playerCardImage",
          "player_card_url",
          "playerCardUrl",
          "card_image_url",
        ]) || String(playerCardOutput?.image_url || playerCardOutput?.imageUrl || ""),
      );

      const compareMode =
        pickFirst(row, ["compare_mode", "compareMode"]) ||
        (compareLeftSrc && compareRightSrc ? "Compare Angles" : "");
      const teamATitle = String(setupSnapshot?.team_a_name || "");
      const teamBTitle = String(setupSnapshot?.team_b_name || "");
      const club = String(setupSnapshot?.club || "");
      const court = String(setupSnapshot?.court || "");
      const teamOrPlayerNames =
        pickFirst(row, ["players", "player_names", "team_names"]) ||
        [
          setupSnapshot?.playerA,
          setupSnapshot?.playerB,
          setupSnapshot?.teamA,
          setupSnapshot?.teamB,
        ]
          .filter(Boolean)
          .join(" / ");

      deliveries.push({
        matchId,
        deliveryId,
        title: "ÉliteReplay MatchBoard & Highlights",
        subtitle: "First Pilot Test",
        claim: "Padel Germany · Center Court",
        heroVideoSrc,
        heroPosterSrc,
        compare:
          compareLeftSrc || compareRightSrc
            ? {
                leftSrc: compareLeftSrc || heroVideoSrc,
                rightSrc: compareRightSrc || heroVideoSrc,
                leftLabel: pickFirst(row, ["left_label", "leftLabel"]) || "Left Angle",
                rightLabel: pickFirst(row, ["right_label", "rightLabel"]) || "Right Angle",
              }
            : undefined,
        playerCard: playerCardImage
          ? {
              imageSrc: playerCardImage,
              alt: "ÉliteReplay PlayerCard",
              title: "PlayerCard",
              subtitle: "Built from the delivery output for this exact moment.",
            }
          : undefined,
        matchFacts: buildMatchFacts(row, setupSnapshot, compareMode || "Single angle"),
        shareQrSrc: "/images/qr-code.png",
        finalHighlights,
        source: "delivery-manifest",
      });

      reports.set(
        deliveryId,
        buildSourceReport(
          folder,
          {
            heroVideoSrc,
            compareLeftSrc,
            compareRightSrc,
            playerCardImage,
            teamOrPlayerNames,
            scoreBefore: pickFirst(row, ["score_before", "scoreBefore"]),
            scoreAfter: pickFirst(row, ["score_after", "scoreAfter"]),
          },
          "delivery-manifest",
        ),
      );
    });
  }

  return { deliveries, reports };
}

async function getDeliveryStore() {
  const real = await readManifestDeliveries();
  if (real.deliveries.length > 0) {
    return real;
  }

  const fallbackReports = new Map<string, DeliverySourceReport>();
  for (const delivery of devFallbackDeliveries) {
    fallbackReports.set(
      delivery.deliveryId,
      buildSourceReport(
        null,
        {
          heroVideoSrc: delivery.heroVideoSrc,
          compareLeftSrc: delivery.compare?.leftSrc,
          compareRightSrc: delivery.compare?.rightSrc,
          playerCardImage: delivery.playerCard?.imageSrc,
          teamOrPlayerNames: "",
          scoreBefore: "",
          scoreAfter: "",
        },
        "dev-fallback",
      ),
    );
  }

  return { deliveries: devFallbackDeliveries, reports: fallbackReports };
}

export async function findMatchDeliveryByMatchId(matchId: string) {
  const store = await getDeliveryStore();
  return store.deliveries.find((entry) => entry.matchId === matchId) || null;
}

export async function findMatchDeliveryByDeliveryId(deliveryId: string) {
  const store = await getDeliveryStore();
  return store.deliveries.find((entry) => entry.deliveryId === deliveryId) || null;
}

export async function getDeliverySourceReportByDeliveryId(deliveryId: string) {
  const store = await getDeliveryStore();
  return store.reports.get(deliveryId) || null;
}
