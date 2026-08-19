import { NextResponse } from "next/server";
import {
  appendReplaySession,
  createSessionCode,
  normalizeCourtId,
  type ReplaySession,
} from "@/lib/replay-sessions";

export const runtime = "nodejs";

const activeCourts = ["demo123", "abc123", "xyz789", "court001", "court002"];

export async function POST(request: Request) {
  try {
    const { courtId, email } = await request.json();
    const normalizedCourtId = normalizeCourtId(String(courtId || ""));
    const normalizedEmail = String(email || "").trim();

    // Validate inputs
    if (!normalizedCourtId) {
      return NextResponse.json({ message: "Court ID is required" }, { status: 400 });
    }

    if (!normalizedEmail) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    // Check if court exists
    if (!activeCourts.includes(normalizedCourtId)) {
      return NextResponse.json({ message: "Court not found or inactive" }, { status: 404 });
    }

    // Generate a unique session code
    const sessionCode = createSessionCode(normalizedCourtId);
    const createdAt = new Date().toISOString();

    // Store session information
    const session: ReplaySession = {
      sessionCode,
      courtId: normalizedCourtId,
      email: normalizedEmail,
      createdAt,
      status: "started",
      highlights: [],
      consentAccepted: false,
      pipelineStatus: "not_started",
    };

    await appendReplaySession(session);

    // Log session start (in a real app, this would communicate with the edge device)
    console.log(
      `Created replay session ${sessionCode} for court ${normalizedCourtId}`,
    );

    return NextResponse.json({
      success: true,
      message: "Session started successfully",
      sessionCode,
      courtId: normalizedCourtId,
      createdAt,
    });
  } catch (error) {
    console.error("Error starting session:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
