import { NextResponse } from "next/server"

// In a real application, this would be a database or external API
const activeCourts = ["demo123", "abc123", "XYZ789", "court001", "court002"]
const sessions: Record<
  string,
  { courtId: string; email: string; startTime: number; status: string; aiStatus: string }
> = {}

export async function POST(request: Request) {
  try {
    const { courtId, email } = await request.json()

    // Validate inputs
    if (!courtId) {
      return NextResponse.json({ message: "Court ID is required" }, { status: 400 })
    }

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    // Check if court exists
    if (!activeCourts.includes(courtId)) {
      return NextResponse.json({ message: "Court not found or inactive" }, { status: 404 })
    }

    // Generate a unique session code
    const sessionCode =
      `${courtId}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`.toUpperCase()

    // Store session information
    sessions[sessionCode] = {
      courtId,
      email,
      startTime: Date.now(),
      status: "recording",
      aiStatus: "initializing",
    }

    // Log session start (in a real app, this would communicate with the edge device)
    console.log(`Starting session ${sessionCode} for court ${courtId} with email ${email}`)

    // Simulate communication with edge device
    // In a real application, this would send a request to the edge device
    await simulateCommunicationWithEdgeDevice(courtId, email, sessionCode)

    return NextResponse.json({
      success: true,
      message: "Session started successfully",
      sessionCode,
      courtId,
      startTime: Date.now(),
    })
  } catch (error) {
    console.error("Error starting session:", error)
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    )
  }
}

// Simulate communication with edge device
async function simulateCommunicationWithEdgeDevice(courtId: string, email: string, sessionCode: string) {
  // In a real application, this would send a request to the edge device
  // For demo purposes, we'll just simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  console.log(`Edge device at court ${courtId} received recording request for session ${sessionCode}`)

  // Simulate AI initialization
  console.log(`AI models initializing on Jetson Orin device for session ${sessionCode}`)

  // Update session status to indicate AI is processing
  if (sessions[sessionCode]) {
    sessions[sessionCode].aiStatus = "processing"
  }

  // Simulate edge device response
  return {
    status: "recording",
    deviceId: `JETSON_${courtId}`,
    aiStatus: "active",
    modelVersion: "EliteReplay-CV-v3.2",
    timestamp: Date.now(),
  }
}

// Get session information
export async function GET(request: Request) {
  const url = new URL(request.url)
  const sessionCode = url.searchParams.get("code")

  if (!sessionCode) {
    return NextResponse.json({ message: "Session code is required" }, { status: 400 })
  }

  const session = sessions[sessionCode]

  if (!session) {
    return NextResponse.json({ message: "Session not found" }, { status: 404 })
  }

  // In a real application, we would also fetch the AI processing status
  const aiProcessingStatus = await getAIProcessingStatus(sessionCode, session.courtId)

  return NextResponse.json({
    success: true,
    session: {
      ...session,
      aiProcessingStatus,
    },
  })
}

// Simulate getting AI processing status
async function getAIProcessingStatus(sessionCode: string, courtId: string) {
  // In a real application, this would query the edge device for the current AI processing status

  // For demo purposes, we'll return a mock status
  return {
    status: "processing",
    progress: Math.floor(Math.random() * 100),
    detectedObjects: {
      players: Math.floor(Math.random() * 10) + 1,
      ball: true,
      keyMoments: Math.floor(Math.random() * 5) + 1,
    },
    estimatedCompletionTime: Date.now() + 1000 * 60 * 2, // 2 minutes from now
    deviceId: `JETSON_${courtId}`,
    modelVersion: "EliteReplay-CV-v3.2",
  }
}
