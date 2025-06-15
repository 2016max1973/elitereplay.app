"use client"

import { useEffect, useRef, useState } from "react"
import * as tf from "@tensorflow/tfjs"
import "@tensorflow/tfjs-backend-webgl"
import * as cocossd from "@tensorflow-models/coco-ssd"
import * as poseDetection from "@tensorflow-models/pose-detection"
import { Loader2 } from "lucide-react"

interface AIVideoProcessorProps {
  videoSrc: string
  onDetectionsUpdate?: (detections: any[]) => void
  onKeyMomentDetected?: (moment: { time: number; description: string; confidence: number }) => void
  showOverlay?: boolean
  autoPlay?: boolean
  width?: number
  height?: number
}

export function AIVideoProcessor({
  videoSrc,
  onDetectionsUpdate,
  onKeyMomentDetected,
  showOverlay = true,
  autoPlay = true,
  width = 640,
  height = 360,
}: AIVideoProcessorProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isModelLoading, setIsModelLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [detections, setDetections] = useState<any[]>([])
  const [poses, setPoses] = useState<any[]>([])
  const [modelLoadingProgress, setModelLoadingProgress] = useState(0)
  const [processingStats, setProcessingStats] = useState({
    fps: 0,
    objectsDetected: 0,
    confidence: 0,
  })

  // References to hold the models
  const objectDetectorRef = useRef<cocossd.ObjectDetection | null>(null)
  const poseDetectorRef = useRef<poseDetection.PoseDetector | null>(null)

  // Track frames for FPS calculation
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(0)
  const requestAnimationRef = useRef<number | null>(null)

  // Track key moments
  const lastKeyMomentTimeRef = useRef(0)
  const movementHistoryRef = useRef<any[]>([])

  // Load models
  useEffect(() => {
    async function loadModels() {
      try {
        // Set up TensorFlow.js
        await tf.ready()
        setModelLoadingProgress(20)
        console.log("TensorFlow.js is ready")

        // Load object detection model
        setModelLoadingProgress(40)
        objectDetectorRef.current = await cocossd.load({
          base: "mobilenet_v2",
        })
        console.log("Object detection model loaded")
        setModelLoadingProgress(70)

        // Load pose detection model
        const poseDetector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        })
        poseDetectorRef.current = poseDetector
        console.log("Pose detection model loaded")
        setModelLoadingProgress(100)

        setIsModelLoading(false)
      } catch (error) {
        console.error("Error loading AI models:", error)
      }
    }

    loadModels()

    // Cleanup function
    return () => {
      if (requestAnimationRef.current) {
        cancelAnimationFrame(requestAnimationRef.current)
      }
    }
  }, [])

  // Set up video and start detection when models are loaded
  useEffect(() => {
    const video = videoRef.current
    if (!video || isModelLoading) return

    const setupVideo = async () => {
      video.src = videoSrc
      video.crossOrigin = "anonymous"

      if (autoPlay) {
        try {
          await video.play()
        } catch (error) {
          console.error("Error playing video:", error)
        }
      }

      video.addEventListener("play", startDetection)
      video.addEventListener("pause", stopDetection)
      video.addEventListener("ended", stopDetection)

      // If autoplay is enabled, start detection right away
      if (autoPlay && !video.paused && !video.ended) {
        startDetection()
      }
    }

    setupVideo()

    return () => {
      video.removeEventListener("play", startDetection)
      video.removeEventListener("pause", stopDetection)
      video.removeEventListener("ended", stopDetection)
      stopDetection()
    }
  }, [videoSrc, isModelLoading, autoPlay])

  const startDetection = () => {
    if (isProcessing) return
    setIsProcessing(true)
    detectFrame()
  }

  const stopDetection = () => {
    setIsProcessing(false)
    if (requestAnimationRef.current) {
      cancelAnimationFrame(requestAnimationRef.current)
      requestAnimationRef.current = null
    }
  }

  const detectFrame = async () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const objectDetector = objectDetectorRef.current
    const poseDetector = poseDetectorRef.current

    if (!video || !canvas || !objectDetector || !poseDetector || video.paused || video.ended) {
      setIsProcessing(false)
      return
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    try {
      // Calculate FPS
      const now = performance.now()
      frameCountRef.current++
      const elapsed = now - lastTimeRef.current

      if (elapsed >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / elapsed)
        lastTimeRef.current = now
        frameCountRef.current = 0
        setProcessingStats((prev) => ({ ...prev, fps }))
      }

      // Detect objects
      const objectDetections = await objectDetector.detect(video)
      setDetections(objectDetections)

      // Detect poses
      const poseDetections = await poseDetector.estimatePoses(video)
      setPoses(poseDetections)

      // Calculate average confidence
      const allConfidences = [
        ...objectDetections.map((d) => d.score),
        ...poseDetections.flatMap((p) => p.keypoints.map((k) => k.score)),
      ]
      const avgConfidence =
        allConfidences.length > 0 ? allConfidences.reduce((sum, score) => sum + score, 0) / allConfidences.length : 0

      // Update stats
      setProcessingStats((prev) => ({
        ...prev,
        objectsDetected: objectDetections.length,
        confidence: avgConfidence,
      }))

      // Notify parent component
      if (onDetectionsUpdate) {
        onDetectionsUpdate([...objectDetections, ...poseDetections])
      }

      // Track movement for key moment detection
      trackMovementForKeyMoments(objectDetections, poseDetections, video.currentTime)

      // Draw results on canvas if overlay is enabled
      if (showOverlay) {
        drawResults(ctx, objectDetections, poseDetections)
      }
    } catch (error) {
      console.error("Error during detection:", error)
    }

    // Continue detection loop
    requestAnimationRef.current = requestAnimationFrame(detectFrame)
  }

  const trackMovementForKeyMoments = (
    objectDetections: cocossd.DetectedObject[],
    poseDetections: poseDetection.Pose[],
    currentTime: number,
  ) => {
    // Add current detections to history
    movementHistoryRef.current.push({
      time: currentTime,
      objects: objectDetections,
      poses: poseDetections,
    })

    // Keep only the last 30 frames (about 1 second at 30fps)
    if (movementHistoryRef.current.length > 30) {
      movementHistoryRef.current.shift()
    }

    // Only check for key moments every 15 frames to avoid too frequent detections
    if (frameCountRef.current % 15 !== 0) return

    // Don't detect another key moment if one was detected in the last 3 seconds
    if (currentTime - lastKeyMomentTimeRef.current < 3) return

    // Analyze movement patterns to detect key moments
    const keyMoment = detectKeyMoment(movementHistoryRef.current, objectDetections, poseDetections)

    if (keyMoment && onKeyMomentDetected) {
      onKeyMomentDetected(keyMoment)
      lastKeyMomentTimeRef.current = currentTime
    }
  }

  const detectKeyMoment = (
    history: any[],
    currentObjects: cocossd.DetectedObject[],
    currentPoses: poseDetection.Pose[],
  ) => {
    if (history.length < 10) return null

    // Look for basketball-related key moments
    const basketballDetected = currentObjects.some((obj) => obj.class === "sports ball" && obj.score > 0.7)
    const personDetected = currentObjects.some((obj) => obj.class === "person" && obj.score > 0.8)

    if (basketballDetected && personDetected) {
      // Check for rapid movement of the ball
      const ballPositions = history
        .filter((frame) => frame.objects.some((obj: any) => obj.class === "sports ball"))
        .map((frame) => {
          const ball = frame.objects.find((obj: any) => obj.class === "sports ball")
          return ball ? { x: ball.bbox[0] + ball.bbox[2] / 2, y: ball.bbox[1] + ball.bbox[3] / 2 } : null
        })
        .filter(Boolean)

      if (ballPositions.length >= 5) {
        // Calculate ball velocity
        const velocities = []
        for (let i = 1; i < ballPositions.length; i++) {
          const dx = ballPositions[i].x - ballPositions[i - 1].x
          const dy = ballPositions[i].y - ballPositions[i - 1].y
          velocities.push(Math.sqrt(dx * dx + dy * dy))
        }

        const avgVelocity = velocities.reduce((sum, v) => sum + v, 0) / velocities.length

        // Check for high velocity (fast movement) followed by low velocity (shot or pass completion)
        const hasHighVelocity = velocities.some((v) => v > 20)
        const hasLowVelocity = velocities.slice(-3).some((v) => v < 5)

        if (hasHighVelocity && hasLowVelocity) {
          // This could be a shot or pass
          const confidence = Math.min(0.9, 0.5 + avgVelocity / 100)
          return {
            time: history[history.length - 1].time,
            description: "Possible shot or pass detected",
            confidence,
          }
        }
      }

      // Check for jumping motion in poses
      if (currentPoses.length > 0) {
        const currentPose = currentPoses[0]
        const keypoints = currentPose.keypoints

        // Get nose and hip positions to estimate vertical movement
        const nose = keypoints.find((kp) => kp.name === "nose")
        const leftHip = keypoints.find((kp) => kp.name === "left_hip")
        const rightHip = keypoints.find((kp) => kp.name === "right_hip")

        if (nose && (leftHip || rightHip)) {
          const hipY = leftHip ? leftHip.y : rightHip!.y
          const verticalDistance = hipY - nose.y

          // Check previous frames for a jumping motion
          const previousPoses = history
            .slice(-10)
            .filter((frame) => frame.poses.length > 0)
            .map((frame) => {
              const pose = frame.poses[0]
              const noseKp = pose.keypoints.find((kp: any) => kp.name === "nose")
              const leftHipKp = pose.keypoints.find((kp: any) => kp.name === "left_hip")
              const rightHipKp = pose.keypoints.find((kp: any) => kp.name === "right_hip")

              if (noseKp && (leftHipKp || rightHipKp)) {
                const hipY = leftHipKp ? leftHipKp.y : rightHipKp!.y
                return hipY - noseKp.y
              }
              return null
            })
            .filter(Boolean)

          if (previousPoses.length >= 5) {
            const minDist = Math.min(...previousPoses)
            const maxDist = Math.max(...previousPoses)
            const jumpHeight = maxDist - minDist

            if (jumpHeight > 30) {
              // This could be a jump shot or dunk
              const confidence = Math.min(0.95, 0.7 + jumpHeight / 200)
              return {
                time: history[history.length - 1].time,
                description: "Jump shot or dunk detected",
                confidence,
              }
            }
          }
        }
      }
    }

    return null
  }

  const drawResults = (
    ctx: CanvasRenderingContext2D,
    objectDetections: cocossd.DetectedObject[],
    poseDetections: poseDetection.Pose[],
  ) => {
    const video = videoRef.current
    if (!video) return

    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Draw video frame
    ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height)

    // Draw object detections
    objectDetections.forEach((detection) => {
      const [x, y, width, height] = detection.bbox
      const text = `${detection.class} ${Math.round(detection.score * 100)}%`

      // Draw bounding box
      ctx.strokeStyle = "#7A5CFA"
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, width, height)

      // Draw label
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      ctx.fillRect(x, y - 20, text.length * 8, 20)
      ctx.fillStyle = "#7A5CFA"
      ctx.font = "16px Arial"
      ctx.fillText(text, x + 5, y - 5)
    })

    // Draw pose detections
    poseDetections.forEach((pose) => {
      const keypoints = pose.keypoints

      // Draw keypoints
      keypoints.forEach((keypoint) => {
        if (keypoint.score > 0.3) {
          ctx.fillStyle = "#7A5CFA"
          ctx.beginPath()
          ctx.arc(keypoint.x, keypoint.y, 4, 0, 2 * Math.PI)
          ctx.fill()
        }
      })

      // Draw skeleton
      const connections = [
        ["nose", "left_eye"],
        ["nose", "right_eye"],
        ["left_eye", "left_ear"],
        ["right_eye", "right_ear"],
        ["nose", "left_shoulder"],
        ["nose", "right_shoulder"],
        ["left_shoulder", "left_elbow"],
        ["right_shoulder", "right_elbow"],
        ["left_elbow", "left_wrist"],
        ["right_elbow", "right_wrist"],
        ["left_shoulder", "right_shoulder"],
        ["left_shoulder", "left_hip"],
        ["right_shoulder", "right_hip"],
        ["left_hip", "right_hip"],
        ["left_hip", "left_knee"],
        ["right_hip", "right_knee"],
        ["left_knee", "left_ankle"],
        ["right_knee", "right_ankle"],
      ]

      connections.forEach(([p1Name, p2Name]) => {
        const p1 = keypoints.find((kp) => kp.name === p1Name)
        const p2 = keypoints.find((kp) => kp.name === p2Name)

        if (p1 && p2 && p1.score > 0.3 && p2.score > 0.3) {
          ctx.strokeStyle = "rgba(122, 92, 250, 0.7)"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      })
    })

    // Draw processing stats
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    ctx.fillRect(10, 10, 200, 80)
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "14px Arial"
    ctx.fillText(`FPS: ${processingStats.fps}`, 20, 30)
    ctx.fillText(`Objects: ${processingStats.objectsDetected}`, 20, 50)
    ctx.fillText(`Confidence: ${Math.round(processingStats.confidence * 100)}%`, 20, 70)
  }

  return (
    <div className="relative">
      {isModelLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 rounded-lg">
          <Loader2 className="h-8 w-8 animate-spin text-[#7A5CFA] mb-4" />
          <div className="text-white font-medium">Loading AI Models ({modelLoadingProgress}%)</div>
          <div className="w-48 h-2 bg-gray-700 rounded-full mt-2">
            <div className="h-full bg-[#7A5CFA] rounded-full" style={{ width: `${modelLoadingProgress}%` }}></div>
          </div>
        </div>
      ) : null}

      <div className="relative" style={{ width, height }}>
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          width={width}
          height={height}
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          className={`absolute top-0 left-0 w-full h-full ${showOverlay ? "opacity-100" : "opacity-0"}`}
          width={width}
          height={height}
        />
      </div>
    </div>
  )
}
