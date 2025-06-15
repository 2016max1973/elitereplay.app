"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Download,
  Share2,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Heart,
  MessageSquare,
  Info,
  Zap,
  Brain,
  Copy,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLocale, useTranslations } from "next-intl";
// Mock data for video sessions
const videoSessions = {
  demo123: {
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Basketball Highlights - May 22, 2025",
    date: "May 22, 2025",
    duration: "2:34",
    likes: 24,
    comments: 5,
    court: "Downtown Basketball Court",
    player: "Guest Player",
    aiAnalysis: {
      detectedMoments: [
        { time: "0:12", description: "Fast break leading to layup", confidence: 0.94 },
        { time: "0:45", description: "Three-point shot from corner", confidence: 0.89 },
        { time: "1:23", description: "Defensive block", confidence: 0.92 },
        { time: "1:58", description: "Slam dunk after assist", confidence: 0.98 },
      ],
      playerStats: {
        movementIntensity: 8.7,
        topSpeed: "18 mph",
        verticalJump: "28 inches",
        distanceCovered: "1.2 miles",
      },
      processingDetails: {
        processingTime: "4 minutes 12 seconds",
        framesAnalyzed: 7240,
        camerasUsed: 3,
        aiConfidence: 0.93,
      },
    },
  },
  XYZ789: {
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    title: "Tennis Match Highlights - May 21, 2025",
    date: "May 21, 2025",
    duration: "3:12",
    likes: 18,
    comments: 3,
    court: "City Tennis Club",
    player: "Guest Player",
    aiAnalysis: {
      detectedMoments: [
        { time: "0:18", description: "Powerful serve ace", confidence: 0.95 },
        { time: "0:52", description: "Forehand winner down the line", confidence: 0.91 },
        { time: "1:34", description: "Backhand volley at net", confidence: 0.88 },
        { time: "2:47", description: "Match point rally", confidence: 0.97 },
      ],
      playerStats: {
        movementIntensity: 7.9,
        topSpeed: "15 mph",
        servingSpeed: "105 mph",
        distanceCovered: "1.8 miles",
      },
      processingDetails: {
        processingTime: "3 minutes 45 seconds",
        framesAnalyzed: 6480,
        camerasUsed: 4,
        aiConfidence: 0.92,
      },
    },
  },
}

export default function SessionPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const isMobile = useMobile()
  const videoRef = useRef<HTMLVideoElement>(null)
  const locale = useLocale();
  const sessionCode = params.code as string
  const t = useTranslations('sessionDemo');

  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<any>(null)
  const [email, setEmail] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showAIOverlay, setShowAIOverlay] = useState(false)

  useEffect(() => {
    // Try to get email from localStorage
    const savedEmail = localStorage.getItem("eliteReplayEmail")
    if (savedEmail) {
      setEmail(savedEmail)
    }

    // Simulate API fetch with a timeout
    const timer = setTimeout(() => {
      setIsLoading(false)
      const sessionData = videoSessions[sessionCode as keyof typeof videoSessions]

      if (sessionData) {
        setSession(sessionData)
        setLikesCount(sessionData.likes)
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [sessionCode])

  const handleShare = async () => {
    const url = window.location.href
    const title = session?.title || "ÉliteReplay Highlights"

    try {
      if (navigator.share && isMobile) {
        await navigator.share({
          title,
          url,
        })

        toast({
          title: "Shared successfully",
          description: "Your highlight video has been shared.",
        })
      } else {
        await navigator.clipboard.writeText(url)
        setIsCopied(true)

        toast({
          title: "Link copied",
          description: "Video link copied to clipboard.",
        })

        setTimeout(() => setIsCopied(false), 2000)
      }
    } catch (error) {
      console.error("Error sharing:", error)

      toast({
        title: "Sharing failed",
        description: "There was an error sharing this video.",
        variant: "destructive",
      })
    }
  }

  const handleDownload = async () => {
    if (!session?.videoUrl) return

    setIsDownloading(true)

    try {
      // Create a temporary anchor element to trigger download
      const a = document.createElement("a")
      a.href = session.videoUrl
      a.download = `${session.title.replace(/\s+/g, "_")}.mp4`
      a.target = "_blank"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      toast({
        title: "Download started",
        description: "Your video download has been initiated.",
      })
    } catch (error) {
      console.error("Download error:", error)

      toast({
        title: "Download failed",
        description: "There was an error downloading this video.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address")
      }

      // In a real app, this would send the email to a server
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store email in localStorage
      localStorage.setItem("eliteReplayEmail", email)

      toast({
        title: "Subscription successful",
        description: "Thank you! We'll send future updates to your email.",
      })
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))

    toast({
      title: isLiked ? "Removed like" : "Added like",
      description: isLiked ? "You've removed your like from this video." : "You've liked this video!",
    })
  }

  const toggleAIOverlay = () => {
    setShowAIOverlay(!showAIOverlay)
  }

  const seekToMoment = (timeString: string) => {
    if (videoRef.current) {
      // Convert time string (e.g., "1:23") to seconds
      const parts = timeString.split(":")
      const seconds = Number.parseInt(parts[0]) * 60 + Number.parseInt(parts[1])
      videoRef.current.currentTime = seconds
      videoRef.current.play()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin mx-auto mb-6 text-[#F5BE2D]" />
          <h2 className="text-2xl font-semibold mb-2">{t('loading.title')}</h2>
          <p className="text-gray-400">{t('loading.subtitle')}</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 mx-auto mb-6 text-[#F5BE2D]" />
          <h2 className="text-3xl font-semibold mb-4">{t('notFound.title')}</h2>
          <p className="text-gray-400 mb-8 text-lg">{t('notFound.message')}</p>
          <Button
            onClick={() => router.push("/")}
            className="bg-[#F5BE2D] hover:bg-[#F5BE2D]/90 text-black font-bold rounded-xl px-8 py-3"
          >
            {t('notFound.return')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 border-b border-gray-800">
        <div className="container mx-auto px-4 flex items-center">
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Title and Info */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{session.title}</h1>
            <div className="flex flex-wrap items-center text-gray-400 gap-6">
              <span className="flex items-center">
                <span className="font-medium">{t('titleInfo.date')}</span>
                <span className="ml-2">{session.date}</span>
              </span>
              <span className="flex items-center">
                <span className="font-medium">{t('titleInfo.duration')}</span>
                <span className="ml-2">{session.duration}</span>
              </span>
              <span className="flex items-center">
                <span className="font-medium">{t('titleInfo.court')}</span>
                <span className="ml-2">{session.court}</span>
              </span>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden mb-8 shadow-2xl">
            <video
              ref={videoRef}
              controls
              className="w-full h-full"
              poster="/images/video-poster.jpg"
              onPlay={() => {
                console.log("Video started playing")
              }}
            >
              <source src={session.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* AI Overlay */}
            {showAIOverlay && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Player tracking */}
                <div className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-[#F5BE2D] rounded-full animate-pulse"></div>
                <div className="absolute top-1/4 left-1/4 transform -translate-x-10 -translate-y-10 bg-black/90 px-3 py-2 rounded-lg text-sm text-[#F5BE2D] font-medium">
                  Player 1
                </div>

                {/* Ball tracking */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-[#F5BE2D] rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform translate-x-6 -translate-y-6 bg-black/90 px-3 py-2 rounded-lg text-sm text-[#F5BE2D] font-medium">
                  Ball
                </div>

                {/* Movement path */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M200,150 C250,130 300,200 350,180 S400,120 450,150"
                    fill="none"
                    stroke="#F5BE2D"
                    strokeWidth="3"
                    strokeDasharray="8,8"
                    opacity="0.8"
                  />
                </svg>

                {/* Key moment indicator */}
                <div className="absolute bottom-1/3 right-1/4 flex items-center justify-center">
                  <div className="w-24 h-24 border-2 border-[#F5BE2D] rounded-full animate-pulse"></div>
                  <div className="absolute bg-black/90 px-3 py-2 rounded-lg text-sm text-[#F5BE2D] font-medium">
                    Key Moment Detected
                  </div>
                </div>

                {/* AI Status */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/90 p-4 rounded-xl flex justify-between items-center">
                  <div className="text-sm text-[#F5BE2D] font-medium">AI Analysis Active</div>
                  <div className="text-sm text-gray-400">Confidence: 93%</div>
                </div>
              </div>
            )}

            {/* AI Overlay Toggle Button */}
            <Button
              onClick={toggleAIOverlay}
              variant="outline"
              size="sm"
              className="absolute top-4 right-4 bg-black/70 border-[#F5BE2D] hover:text-white text-[#F5BE2D] hover:bg-[#F5BE2D]/20 backdrop-blur-sm"
            >
              {showAIOverlay ? "Hide AI Analysis" : "Show AI Analysis"}
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-[#F5BE2D] hover:bg-[#F5BE2D]/90 text-black font-bold rounded-lg px-6 py-3"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('buttons.downloading')}
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" /> {t('buttons.download')}
                </>
              )}
            </Button>

            <Button
              onClick={handleShare}
              variant="outline"
              className="border-gray-700 text-white bg-transparent hover:text-white hover:bg-white/10 rounded-lg px-6 py-3"
            >
              {isCopied ? (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  {t('buttons.copied')}
                </>
              ) : (
                <>
                  <Share2 className="mr-2 h-4 w-4" />
                  {t('buttons.share')}
                </>
              )}
            </Button>

            <Button
              onClick={handleLike}
              variant={isLiked ? "default" : "ghost"}
              className={
                isLiked
                  ? "bg-[#F5BE2D] hover:bg-[#F5BE2D]/90 text-black rounded-lg px-6 py-3"
                  : "text-white hover:text-white hover:bg-white/10 rounded-lg px-6 py-3"
              }
            >
              <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              {likesCount}
            </Button>

            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 rounded-lg px-6 py-3">
              <MessageSquare className="mr-2 h-4 w-4" />
              {session.comments} {t('buttons.comment')}
            </Button>
          </div>

          {/* Tabs for Video Info and AI Analysis */}
          <Tabs defaultValue="highlights" className="mb-12">
            <TabsList className="bg-gray-900 border border-gray-800 rounded-xl">
              <TabsTrigger value="highlights" className="rounded-lg">
                {t('tabs.highlights')}
              </TabsTrigger>
              <TabsTrigger value="ai-analysis" className="rounded-lg">
                {t('tabs.aiAnalysis')}
              </TabsTrigger>
              <TabsTrigger value="details" className="rounded-lg">
                {t('tabs.details')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="highlights" className="mt-6">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
                <h3 className="text-2xl font-semibold mb-6">{t('highlights.title')}</h3>
                <div className="space-y-4">
                  {session.aiAnalysis.detectedMoments.map((moment: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-black/40 rounded-xl hover:bg-[#F5BE2D]/10 cursor-pointer transition-all duration-300 group"
                      onClick={() => seekToMoment(moment.time)}
                    >
                      <div className="flex items-center">
                        <div className="bg-[#F5BE2D]/20 p-3 rounded-full mr-4 group-hover:bg-[#F5BE2D]/30 transition-all">
                          <Zap className="h-5 w-5 text-[#F5BE2D]" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{moment.description}</div>
                          <div className="text-sm text-gray-400">
                            Confidence: {(moment.confidence * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                      <div className="text-[#F5BE2D] font-mono text-lg font-bold">{moment.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai-analysis" className="mt-6">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
                <div className="flex items-center mb-8">
                  <div className="bg-[#F5BE2D]/20 p-4 rounded-full mr-6">
                    <Brain className="h-8 w-8 text-[#F5BE2D]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">{t('aiAnalysis.title')}</h3>
                    <p className="text-gray-400 text-lg">{t('aiAnalysis.subtitle')}</p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="player-stats">
                    <AccordionTrigger className="text-xl font-medium">{t('aiAnalysis.playerStats')}</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                        {Object.entries(session.aiAnalysis.playerStats).map(([key, value]: [string, any]) => (
                          <div key={key} className="bg-black/40 p-6 rounded-xl">
                            <div className="text-gray-400 mb-2 text-lg">
                              {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                            </div>
                            <div className="text-2xl font-bold text-[#F5BE2D]">{value}</div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="detection-details">
                    <AccordionTrigger className="text-xl font-medium">{t('aiAnalysis.detectionDetails')}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6 mt-4">
                        <div className="bg-black/40 p-6 rounded-xl">
                          <h4 className="font-semibold mb-3 text-lg">{t('aiAnalysis.howItWorks.title')}</h4>
                          <p className="text-gray-400 leading-relaxed">{t('aiAnalysis.howItWorks.text')}</p>
                        </div>

                        <div className="bg-black/40 p-6 rounded-xl">
                          <h4 className="font-semibold mb-4 text-lg">{t('aiAnalysis.detectionConfidence')}</h4>
                          <div className="space-y-4">
                            {session.aiAnalysis.detectedMoments.map((moment: any, index: number) => (
                              <div key={index} className="flex items-center justify-between">
                                <div className="text-gray-400 flex-1">{moment.description}</div>
                                <div className="flex items-center ml-4">
                                  <div className="w-32 bg-gray-700 h-3 rounded-full mr-3">
                                    <div
                                      className="bg-[#F5BE2D] h-3 rounded-full transition-all duration-1000"
                                      style={{ width: `${moment.confidence * 100}%` }}
                                    ></div>
                                  </div>
                                  <div className="text-sm font-bold text-[#F5BE2D] w-12">
                                    {(moment.confidence * 100).toFixed(0)}%
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="processing-info">
                    <AccordionTrigger className="text-xl font-medium">Processing Information</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                        {Object.entries(session.aiAnalysis.processingDetails).map(([key, value]: [string, any]) => (
                          <div key={key} className="bg-black/40 p-6 rounded-xl">
                            <div className="text-gray-400 mb-2 text-lg">
                              {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                            </div>
                            <div className="text-2xl font-bold text-[#F5BE2D]">{value}</div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
                <h3 className="text-2xl font-semibold mb-6">{t('details.title')}</h3>
                <div className="space-y-6">
                  <div className="flex border-b border-gray-800 pb-4">
                    <div className="w-40 font-medium text-gray-400 text-lg">{t('details.fields.date')}</div>
                    <div className="text-lg font-medium">{session.date}</div>
                  </div>
                  <div className="flex border-b border-gray-800 pb-4">
                    <div className="w-40 font-medium text-gray-400 text-lg">{t('details.fields.duration')}</div>
                    <div className="text-lg font-medium">{session.duration}</div>
                  </div>
                  <div className="flex border-b border-gray-800 pb-4">
                    <div className="w-40 font-medium text-gray-400 text-lg">{t('details.fields.court')}</div>
                    <div className="text-lg font-medium">{session.court}</div>
                  </div>
                  <div className="flex border-b border-gray-800 pb-4">
                    <div className="w-40 font-medium text-gray-400 text-lg">{t('details.fields.player')}</div>
                    <div className="text-lg font-medium">{session.player}</div>
                  </div>
                  <div className="flex border-b border-gray-800 pb-4">
                    <div className="w-40 font-medium text-gray-400 text-lg">{t('details.fields.sessionId')}</div>
                    <div className="text-lg font-medium">{sessionCode}</div>
                  </div>
                  <div className="flex border-b border-gray-800 pb-4">
                    <div className="w-40 font-medium text-gray-400 text-lg">{t('details.fields.quality')}</div>
                    <div className="text-lg font-medium">4K Ultra HD</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Player Info */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 mb-8">
            <h3 className="text-2xl font-semibold mb-6">{t('playerInfo.title')}</h3>
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-[#F5BE2D]/20 flex items-center justify-center mr-6">
                <span className="text-[#F5BE2D] font-bold text-xl">{session.player.charAt(0)}</span>
              </div>
              <div>
                <p className="font-bold text-xl">{session.player}</p>
                <p className="text-gray-400 text-lg">{t('playerInfo.recordedAt')} {session.court}</p>
              </div>
            </div>
          </div>

          {/* AI Technology Info */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 mb-8">
            <div className="flex items-center mb-6">
              <Info className="h-6 w-6 text-[#F5BE2D] mr-3" />
              <h3 className="text-2xl font-semibold">{t('aiTechInfo.title')}</h3>
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">{t('aiTechInfo.description')}</p>
            <div className="flex justify-between items-center flex-wrap gap-6">
              <div className="flex items-center">
                <div className="bg-[#F5BE2D]/20 p-3 rounded-full mr-4">
                  <Zap className="h-5 w-5 text-[#F5BE2D]" />
                </div>
                <div>
                  <div className="font-semibold text-lg">{t('aiTechInfo.processingTime')}</div>
                  <div className="text-gray-400">{session.aiAnalysis.processingDetails.processingTime}</div>
                </div>
              </div>
              <Link href={`/${locale}/technology`}>
                <Button
                  variant="outline"
                  className="border-[#F5BE2D] text-[#F5BE2D] bg-transparent hover:text-white hover:bg-[#F5BE2D]/10 rounded-xl px-6 py-3"
                >
                  {t('aiTechInfo.learnMore')} <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Email Subscription */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-semibold mb-4">{t('subscription.title')}</h3>
            <p className="text-gray-400 mb-6 text-lg">{t('subscription.message')}</p>

            <form onSubmit={handleSubmitEmail} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('subscription.placeholder')}
                required
                className="bg-gray-800 border-gray-700 text-white flex-1 h-12 rounded-xl focus:border-[#F5BE2D] focus:ring-[#F5BE2D]"
              />
              <Button
                type="submit"
                className="bg-[#F5BE2D] hover:bg-[#F5BE2D]/90 text-black font-bold whitespace-nowrap h-12 px-8 rounded-xl"
              >
                {t('subscription.button')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
