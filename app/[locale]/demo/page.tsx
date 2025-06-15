
"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Camera, Zap, Server, QrCode, Play, RefreshCw, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function DemoPage() {
  const { toast } = useToast()
  const [activeDemo, setActiveDemo] = useState<string>("replay-wall")
  const [isProcessing, setIsProcessing] = useState(false)
  const [detectedObjects, setDetectedObjects] = useState<any[]>([])
  const [processingProgress, setProcessingProgress] = useState(0)
  const [edgeDeviceStatus, setEdgeDeviceStatus] = useState("idle")
  const [qrScanned, setQrScanned] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const locale = useLocale();
  const t = useTranslations('demo');

  // Simulate AI Detection
  const simulateAIDetection = () => {
    setIsProcessing(true)
    setDetectedObjects([])
    let progress = 0

    const interval = setInterval(() => {
      progress += 10
      setProcessingProgress(progress)

      // Add detected objects at different progress points
      if (progress === 30) {
        setDetectedObjects((prev) => [
          ...prev,
          { type: "player", id: 1, confidence: 0.95, position: { x: 150, y: 200 } },
        ])
      }
      if (progress === 50) {
        setDetectedObjects((prev) => [...prev, { type: "ball", id: 2, confidence: 0.89, position: { x: 300, y: 250 } }])
      }
      if (progress === 70) {
        setDetectedObjects((prev) => [
          ...prev,
          { type: "player", id: 3, confidence: 0.92, position: { x: 450, y: 180 } },
        ])
      }
      if (progress === 90) {
        setDetectedObjects((prev) => [
          ...prev,
          { type: "key_moment", description: "Three-point shot detected", confidence: 0.97 },
        ])
      }

      if (progress >= 100) {
        clearInterval(interval)
        setIsProcessing(false)
        toast({
          title: "AI Detection Complete",
          description: "Found 2 players, 1 ball, and 1 key moment",
        })
      }
    }, 200)
  }

  // Simulate Edge Processing
  const simulateEdgeProcessing = () => {
    setEdgeDeviceStatus("connecting")

    setTimeout(() => {
      setEdgeDeviceStatus("processing")

      setTimeout(() => {
        setEdgeDeviceStatus("complete")
        toast({
          title: "Edge Processing Complete",
          description: "Video processed locally in 4.2 seconds",
        })
      }, 4000)
    }, 1000)
  }

  // Simulate QR Code Scan
  const simulateQRScan = () => {
    setQrScanned(true)
    toast({
      title: "QR Code Scanned",
      description: "Session started for Court ABC123",
    })

    setTimeout(() => {
      window.open(`/${locale}/start?court=ABC123`, "_blank")
    }, 1500)
  }

  // Draw on canvas for replay wall demo
  useEffect(() => {
    if (activeDemo === "replay-wall" && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      // Draw camera viewpoints with enhanced styling
      const cameras = [
        { x: 120, y: 80, angle: 45, label: "CAM 1" },
        { x: 480, y: 80, angle: 135, label: "CAM 2" },
        { x: 120, y: 320, angle: -45, label: "CAM 3" },
        { x: 480, y: 320, angle: -135, label: "CAM 4" },
      ]

      cameras.forEach((cam, index) => {
        // Draw camera with glow effect
        ctx.shadowColor = "#F5BE2D"
        ctx.shadowBlur = 15
        ctx.fillStyle = "#F5BE2D"
        ctx.beginPath()
        ctx.arc(cam.x, cam.y, 18, 0, 2 * Math.PI)
        ctx.fill()

        // Reset shadow
        ctx.shadowBlur = 0

        // Draw camera inner circle
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(cam.x, cam.y, 12, 0, 2 * Math.PI)
        ctx.fill()

        // Draw camera lens
        ctx.fillStyle = "#F5BE2D"
        ctx.beginPath()
        ctx.arc(cam.x, cam.y, 6, 0, 2 * Math.PI)
        ctx.fill()

        // Draw camera label with background
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
        ctx.fillRect(cam.x - 25, cam.y + 25, 50, 20)
        ctx.fillStyle = "#F5BE2D"
        ctx.font = "bold 12px Arial"
        ctx.textAlign = "center"
        ctx.fillText(cam.label, cam.x, cam.y + 38)

        // Draw viewing angle with gradient
        const gradient = ctx.createRadialGradient(cam.x, cam.y, 0, cam.x, cam.y, 120)
        gradient.addColorStop(0, "rgba(245, 190, 45, 0.4)") // Increased opacity
        gradient.addColorStop(1, "rgba(245, 190, 45, 0.1)") // Increased opacity

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.moveTo(cam.x, cam.y)
        const angleRad = (cam.angle * Math.PI) / 180
        ctx.arc(cam.x, cam.y, 120, angleRad - 0.4, angleRad + 0.4)
        ctx.closePath()
        ctx.fill()

        // Draw viewing angle outline
        ctx.strokeStyle = "rgba(245, 190, 45, 0.7)" // Increased opacity
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(cam.x, cam.y)
        ctx.lineTo(cam.x + Math.cos(angleRad - 0.4) * 120, cam.y + Math.sin(angleRad - 0.4) * 120)
        ctx.moveTo(cam.x, cam.y)
        ctx.lineTo(cam.x + Math.cos(angleRad + 0.4) * 120, cam.y + Math.sin(angleRad + 0.4) * 120)
        ctx.stroke()
      })

      // Draw court outline with enhanced styling (brighter for better visibility on image)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)" // Brighter white
      ctx.lineWidth = 3
      ctx.strokeRect(180, 140, 240, 160)

      // Draw center line
      ctx.beginPath()
      ctx.moveTo(300, 140)
      ctx.lineTo(300, 300)
      ctx.stroke()

      // Draw service boxes
      ctx.lineWidth = 2
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)" // Brighter white
      ctx.strokeRect(180, 190, 120, 60)
      ctx.strokeRect(300, 190, 120, 60)

      // Add court label
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
      ctx.fillRect(270, 310, 60, 25)
      ctx.fillStyle = "#FFFFFF"
      ctx.font = "bold 14px Arial"
      ctx.textAlign = "center"
      ctx.fillText("PADEL COURT", 300, 327)

      // Add "100% Coverage" text
      ctx.fillStyle = "rgba(0, 0, 0, 0.9)"
      ctx.fillRect(220, 210, 160, 30)
      ctx.fillStyle = "#F5BE2D"
      ctx.font = "bold 16px Arial"
      ctx.fillText("100% COVERAGE", 300, 230)
    }
  }, [activeDemo])

  // Draw AI detections
  useEffect(() => {
    if (activeDemo === "ai-detection" && canvasRef.current && detectedObjects.length > 0) {
      const ctx = canvasRef.current.getContext("2d")
      if (!ctx) return

      // Clear previous drawings
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      detectedObjects.forEach((obj) => {
        if (obj.position) {
          // Draw bounding box with glow effect
          ctx.shadowColor = "#F5BE2D"
          ctx.shadowBlur = 10
          ctx.strokeStyle = "#F5BE2D"
          ctx.lineWidth = 3
          ctx.strokeRect(obj.position.x - 40, obj.position.y - 60, 80, 120)
          ctx.shadowBlur = 0

          // Draw label with enhanced styling
          ctx.fillStyle = "rgba(0, 0, 0, 0.9)"
          ctx.fillRect(obj.position.x - 40, obj.position.y - 85, 120, 25)
          ctx.fillStyle = "#F5BE2D"
          ctx.font = "bold 14px Arial"
          ctx.fillText(`${obj.type} (${(obj.confidence * 100).toFixed(0)}%)`, obj.position.x - 35, obj.position.y - 67)
        }
      })
    }
  }, [detectedObjects, activeDemo])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center group">
            <ArrowLeft className="h-5 w-5 mr-3 group-hover:text-[#F5BE2D] transition-colors" />
            <Image
              src="/images/elitereplay-logo.png"
              alt="ÉliteReplay Logo"
              width={150}
              height={75}
              className="group-hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#F5BE2D]">
                {t('title')}
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('description')}
            </p>
          </div>

          {/* Demo Tabs */}
          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="space-y-8">
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-transparent h-auto p-0">
              <TabsTrigger
                value="replay-wall"
                className="bg-gray-900 border border-gray-800 rounded-xl p-4 data-[state=active]:bg-[#F5BE2D]/20 data-[state=active]:border-[#F5BE2D]"
              >
                <Camera className="h-5 w-5 mr-2" />
                Replay Wall
              </TabsTrigger>
              <TabsTrigger
                value="ai-detection"
                className="bg-gray-900 border border-gray-800 rounded-xl p-4 data-[state=active]:bg-[#F5BE2D]/20 data-[state=active]:border-[#F5BE2D]"
              >
                <Zap className="h-5 w-5 mr-2" />
                AI Detection
              </TabsTrigger>
              <TabsTrigger
                value="edge-processing"
                className="bg-gray-900 border border-gray-800 rounded-xl p-4 data-[state=active]:bg-[#F5BE2D]/20 data-[state=active]:border-[#F5BE2D]"
              >
                <Server className="h-5 w-5 mr-2" />
                Edge Processing
              </TabsTrigger>
              <TabsTrigger
                value="qr-access"
                className="bg-gray-900 border border-gray-800 rounded-xl p-4 data-[state=active]:bg-[#F5BE2D]/20 data-[state=active]:border-[#F5BE2D]"
              >
                <QrCode className="h-5 w-5 mr-2" />
                QR Access
              </TabsTrigger>
            </TabsList>

            {/* Replay Wall Demo */}
            <TabsContent value="replay-wall" className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6">{t('tabs.replayWall.title')}</h2>
                <p className="text-gray-400 mb-8">
                  {t('tabs.replayWall.description')}
                </p>

                {/* Enhanced Court Visualization with Background Image */}
                <div
                  className="relative rounded-xl p-4 mb-6 overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/padel-court-night.jpg')" }}
                >
                  {/* Darkening overlay to ensure canvas elements are visible */}
                  <div className="absolute inset-0 bg-black/60"></div>

                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    className="w-full max-w-2xl mx-auto relative z-10" // Ensure canvas is above overlay
                    style={{ maxHeight: "400px" }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/50 p-6 rounded-xl border border-gray-800">
                    <h3 className="font-semibold mb-3 text-[#F5BE2D]">{t('tabs.replayWall.cameraSpecs.title')}</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                        {t('tabs.replayWall.cameraSpecs.items.resolution')}
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                        {t('tabs.replayWall.cameraSpecs.items.fps')}
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                        {t('tabs.replayWall.cameraSpecs.items.lenses')}
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                        {t('tabs.replayWall.cameraSpecs.items.sync')}
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                        {t('tabs.replayWall.cameraSpecs.items.nightVision')}
                      </li>
                    </ul>
                  </div>
                  <div className="bg-black/50 p-6 rounded-xl border border-gray-800">
                    <h3 className="font-semibold mb-3 text-[#F5BE2D]">{t('tabs.replayWall.coverageBenefits.title')}</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                        {t('tabs.replayWall.coverageBenefits.items.view')}
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                        {t('tabs.replayWall.coverageBenefits.items.angles')}
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                        {t('tabs.replayWall.coverageBenefits.items.selection')}
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                        {t('tabs.replayWall.coverageBenefits.items.blindSpots')}
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                        {t('tabs.replayWall.coverageBenefits.items.quality')}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Court Environment Info */}
                <div className="mt-6 bg-gradient-to-r from-[#F5BE2D]/10 to-transparent p-6 rounded-xl border border-[#F5BE2D]/20">
                  <h3 className="font-semibold mb-3 text-[#F5BE2D] flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    {t('tabs.replayWall.courtEnv.title')}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t('tabs.replayWall.courtEnv.description')}
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* AI Detection Demo */}
            <TabsContent value="ai-detection" className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6">{t('tabs.aiDetection.title')}</h2>
                <p className="text-gray-400 mb-8">
                  {t('tabs.aiDetection.description')}
                </p>

                <div className="bg-black rounded-xl p-4 mb-6 relative">
                  <video
                    ref={videoRef}
                    className="w-full max-w-2xl mx-auto rounded-lg"
                    poster="/ai-detection-poster.jpg"
                    style={{ maxHeight: "400px" }}
                  >
                    <source src="/demo-video.mp4" type="video/mp4" />
                  </video>
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ maxHeight: "400px" }}
                  />
                </div>

                {isProcessing && (
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Processing...</span>
                      <span className="text-sm text-[#F5BE2D]">{processingProgress}%</span>
                    </div>
                    <Progress value={processingProgress} className="h-2" />
                  </div>
                )}

                {detectedObjects.length > 0 && (
                  <div className="bg-black/50 p-6 rounded-xl mb-6">
                    <h3 className="font-semibold mb-4 text-[#F5BE2D]">{t('tabs.aiDetection.detectedObjects')}</h3>
                    <div className="space-y-3">
                      {detectedObjects.map((obj, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-[#F5BE2D] mr-3" />
                            <span className="capitalize">{obj.type === "key_moment" ? obj.description : obj.type}</span>
                          </div>
                          <span className="text-[#F5BE2D] font-mono">
                            {(obj.confidence * 100).toFixed(0)}% confidence
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={simulateAIDetection}
                  disabled={isProcessing}
                  className="bg-[#F5BE2D] hover:bg-[#F5BE2D]/90 text-black font-bold rounded-xl px-8 py-3"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Start AI Detection
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            {/* Edge Processing Demo */}
            <TabsContent value="edge-processing" className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6">{t('tabs.edgeProcessing.title')}</h2>
                <p className="text-gray-400 mb-8">
                  {t('tabs.edgeProcessing.description')}
                </p>

                <div className="bg-black rounded-xl p-8 mb-6">
                  <div className="max-w-2xl mx-auto">
                    {/* Device Status */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full mr-3 ${
                            edgeDeviceStatus === "idle"
                              ? "bg-gray-500"
                              : edgeDeviceStatus === "connecting"
                                ? "bg-yellow-500 animate-pulse"
                                : edgeDeviceStatus === "processing"
                                  ? "bg-[#F5BE2D] animate-pulse"
                                  : "bg-green-500"
                          }`}
                        />
                        <span className="font-semibold">NVIDIA Jetson Orin</span>
                      </div>
                      <span className="text-gray-400 capitalize">{edgeDeviceStatus}</span>
                    </div>

                    {/* Processing Visualization */}
                    {edgeDeviceStatus === "processing" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-900 p-4 rounded-lg">
                            <div className="text-sm text-gray-400 mb-1">CPU Usage</div>
                            <div className="text-2xl font-bold text-[#F5BE2D]">87%</div>
                          </div>
                          <div className="bg-gray-900 p-4 rounded-lg">
                            <div className="text-sm text-gray-400 mb-1">GPU Usage</div>
                            <div className="text-2xl font-bold text-[#F5BE2D]">94%</div>
                          </div>
                          <div className="bg-gray-900 p-4 rounded-lg">
                            <div className="text-sm text-gray-400 mb-1">Memory</div>
                            <div className="text-2xl font-bold text-[#F5BE2D]">12.3 GB</div>
                          </div>
                          <div className="bg-gray-900 p-4 rounded-lg">
                            <div className="text-sm text-gray-400 mb-1">Temperature</div>
                            <div className="text-2xl font-bold text-[#F5BE2D]">72°C</div>
                          </div>
                        </div>

                        <div className="bg-gray-900 p-4 rounded-lg">
                          <div className="text-sm text-gray-400 mb-2">Processing Pipeline</div>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              <span className="text-sm">Video Ingestion</span>
                            </div>
                            <div className="flex items-center">
                              <Loader2 className="h-4 w-4 text-[#F5BE2D] mr-2 animate-spin" />
                              <span className="text-sm">AI Model Inference</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-gray-600 mr-2" />
                              <span className="text-sm text-gray-500">Video Encoding</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {edgeDeviceStatus === "complete" && (
                      <div className="bg-green-900/20 border border-green-800 rounded-xl p-6">
                        <div className="flex items-center mb-4">
                          <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                          <h3 className="text-lg font-semibold">Processing Complete</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Total Time:</span>
                            <span className="ml-2 font-semibold">4.2 seconds</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Frames Processed:</span>
                            <span className="ml-2 font-semibold">7,240</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Highlights Found:</span>
                            <span className="ml-2 font-semibold">5</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Output Quality:</span>
                            <span className="ml-2 font-semibold">4K 60fps</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={simulateEdgeProcessing}
                    disabled={edgeDeviceStatus !== "idle" && edgeDeviceStatus !== "complete"}
                    className="bg-[#F5BE2D] hover:bg-[#F5BE2D]/90 text-black font-bold rounded-xl px-8 py-3"
                  >
                    <Server className="mr-2 h-4 w-4" />
                    Start Edge Processing
                  </Button>
                  {edgeDeviceStatus === "complete" && (
                    <Button
                      onClick={() => setEdgeDeviceStatus("idle")}
                      variant="outline"
                      className="border-gray-700 text-white hover:bg-white/10 rounded-xl px-8 py-3"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* QR Access Demo */}
            <TabsContent value="qr-access" className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6">{t('tabs.qrAccess.title')}</h2>
                <p className="text-gray-400 mb-8">
                  {t('tabs.qrAccess.description')}
                </p>

                <div className="max-w-md mx-auto">
                  <div className="bg-black rounded-xl p-8 mb-6 text-center">
                    {!qrScanned ? (
                      <>
                        <div className="bg-white p-8 rounded-xl mb-6 inline-block">
                          <QrCode className="h-32 w-32 text-black" />
                        </div>
                        <p className="text-gray-400 mb-4">
                          {t('tabs.qrAccess.scanMessage')}
                        </p>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-32 w-32 text-[#F5BE2D] mx-auto mb-6" />
                        <h3 className="text-2xl font-semibold mb-4">QR Code Scanned!</h3>
                        <p className="text-gray-400 mb-4">{t('tabs.qrAccess.scannedMessage')}</p>
                        <div className="bg-gray-900 rounded-lg p-4">
                          <p className="text-sm text-gray-400">{t('tabs.qrAccess.courtInfo.courtId')}</p>
                          <p className="text-sm text-gray-400">{t('tabs.qrAccess.courtInfo.location')}</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={simulateQRScan}
                      disabled={qrScanned}
                      className="w-full bg-[#F5BE2D] hover:bg-[#F5BE2D]/90 text-black font-bold rounded-xl px-8 py-3"
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      Simulate QR Scan
                    </Button>
                    {qrScanned && (
                      <Button
                        onClick={() => setQrScanned(false)}
                        variant="outline"
                        className="w-full border-gray-700 text-white hover:bg-white/10 rounded-xl px-8 py-3"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reset Demo
                      </Button>
                    )}
                  </div>

                  <div className="mt-8 bg-black/50 p-6 rounded-xl">
                    <h3 className="font-semibold mb-3 text-[#F5BE2D]">{t('tabs.qrAccess.howItWorks.title')}</h3>
                    <ol className="space-y-3 text-gray-400">
                      <li className="flex">
                        <span className="text-[#F5BE2D] font-bold mr-3">1.</span>
                        {t('tabs.qrAccess.howItWorks.steps.find')}
                      </li>
                      <li className="flex">
                        <span className="text-[#F5BE2D] font-bold mr-3">2.</span>
                        {t('tabs.qrAccess.howItWorks.steps.scan')}
                      </li>
                      <li className="flex">
                        <span className="text-[#F5BE2D] font-bold mr-3">3.</span>
                        {t('tabs.qrAccess.howItWorks.steps.email')}
                      </li>
                      <li className="flex">
                        <span className="text-[#F5BE2D] font-bold mr-3">4.</span>
                        {t('tabs.qrAccess.howItWorks.steps.play')}
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}