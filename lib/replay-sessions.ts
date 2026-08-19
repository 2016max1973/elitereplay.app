import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type ReplaySessionStatus = "started" | "processing" | "ready";

export type ReplaySessionHighlight = {
  videoUrl: string;
  thumbnailUrl?: string;
  downloadUrl?: string;
  sortOrder: number;
};

export type ReplaySession = {
  sessionCode: string;
  courtId: string;
  email: string;
  createdAt: string;
  status: ReplaySessionStatus;
  highlights: ReplaySessionHighlight[];
  consentAccepted: false;
  pipelineStatus: "not_started";
};

const sessionsDir = path.join(process.cwd(), "data", "replay-sessions");
const sessionsFile = path.join(sessionsDir, "sessions.json");

export function normalizeCourtId(courtId: string) {
  return courtId.trim().toLowerCase();
}

export function normalizeSessionCode(sessionCode: string) {
  return sessionCode.trim().toUpperCase();
}

export function createSessionCode(courtId: string) {
  return `${normalizeCourtId(courtId)}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 7)}`.toUpperCase();
}

async function ensureSessionStore() {
  await mkdir(sessionsDir, { recursive: true });

  try {
    await readFile(sessionsFile, "utf8");
  } catch {
    await writeFile(sessionsFile, "[]\n", "utf8");
  }
}

export async function readReplaySessions(): Promise<ReplaySession[]> {
  await ensureSessionStore();

  const raw = await readFile(sessionsFile, "utf8");
  if (!raw.trim()) {
    return [];
  }

  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error("Replay sessions store must contain a JSON array.");
  }

  return parsed as ReplaySession[];
}

export async function writeReplaySessions(sessions: ReplaySession[]) {
  await ensureSessionStore();
  await writeFile(sessionsFile, `${JSON.stringify(sessions, null, 2)}\n`, "utf8");
}

export async function appendReplaySession(session: ReplaySession) {
  const sessions = await readReplaySessions();
  sessions.push(session);
  await writeReplaySessions(sessions);
}

export async function findReplaySessionByCode(sessionCode: string) {
  const normalizedCode = normalizeSessionCode(sessionCode);
  const sessions = await readReplaySessions();

  return (
    sessions.find(
      (session) => normalizeSessionCode(session.sessionCode) === normalizedCode,
    ) || null
  );
}
