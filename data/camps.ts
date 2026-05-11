import camp1Highlights from "@/data/camps/camp-1.json";
import camp2Highlights from "@/data/camps/camp-2.json";

export type CampSlug = "camp-1" | "camp-2";

export type CampHighlight = {
  title: string;
  description: string;
  thumbnail?: string;
  preview?: string;
  download?: string;
  visible: boolean;
  sort_order: number;
};

export type CampArchive = {
  slug: CampSlug;
  label: string;
  title: string;
  description: string;
  accessEnvVar: "CAMP_1_ACCESS_KEY" | "CAMP_2_ACCESS_KEY";
  temporaryFallbackKey: string;
  highlights: CampHighlight[];
};

export const camps: Record<CampSlug, CampArchive> = {
  "camp-1": {
    slug: "camp-1",
    label: "Camp 1",
    title: "Camp 1 – private Highlights",
    description: "Ausgewählte Match-Momente aus Camp 1.",
    accessEnvVar: "CAMP_1_ACCESS_KEY",
    temporaryFallbackKey: "CAMP1_PRIVATE_7KQ4",
    highlights: camp1Highlights satisfies CampHighlight[],
  },
  "camp-2": {
    slug: "camp-2",
    label: "Camp 2",
    title: "Camp 2 – private Highlights",
    description: "Ausgewählte Match-Momente aus Camp 2.",
    accessEnvVar: "CAMP_2_ACCESS_KEY",
    temporaryFallbackKey: "CAMP2_PRIVATE_M9X2",
    highlights: camp2Highlights satisfies CampHighlight[],
  },
};

export function getCampAccessKey(camp: CampArchive) {
  return process.env[camp.accessEnvVar] || camp.temporaryFallbackKey;
}

export function getVisibleCampHighlights(camp: CampArchive) {
  return camp.highlights
    .filter((highlight) => highlight.visible)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export function isCampSlug(slug: string): slug is CampSlug {
  return slug === "camp-1" || slug === "camp-2";
}
