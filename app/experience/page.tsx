import type { Metadata } from "next";
import ExperienceHub from "@/components/experience/ExperienceHub";

export const metadata: Metadata = {
  title: "Make Every Court Feel Live | ÉliteReplay",
  description:
    "ÉliteReplay turns a padel court into a live experience with score, replay moments, QR access and premium player memories.",
};

export default function ExperiencePage() {
  return <ExperienceHub />;
}
