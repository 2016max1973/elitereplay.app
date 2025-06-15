"use client"

import Link from "next/link"
import Image from "next/image"
import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowRight, CheckCircle, Loader2, ArrowLeft, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useLocale, useTranslations } from "next-intl";
export default function StartSessionPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const courtId = searchParams.get("court") || ""

  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [sessionCode, setSessionCode] = useState("")
  const locale = useLocale();
  const t = useTranslations("recording");
  useEffect(() => {
    // Try to get email from localStorage
    const savedEmail = localStorage.getItem("eliteReplayEmail")
    if (savedEmail) {
      setEmail(savedEmail)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address")
      }

      // Make API call to start session
      const response = await fetch("/api/start-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courtId,
          email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to start session")
      }

      // Store session code for later use
      setSessionCode(data.sessionCode)

      // Show success message
      setIsSuccess(true)

      // Store email in localStorage for future use
      localStorage.setItem("eliteReplayEmail", email)

      // Show toast notification
      toast({
        title: "Session Started",
        description: "Your recording session has been started successfully.",
      })

      // After 5 seconds, redirect to the session page if we have a session code
      if (data.sessionCode) {
        setTimeout(() => {
          router.push(`/${locale}/session/${data.sessionCode}`)
        }, 5000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")

      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="py-6 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center group">
            <ArrowLeft className="h-5 w-5 mr-3 group-hover:text-[#F5BE2D] transition-colors" />
            <Image
              src="/images/elitereplay-logo.png"
              alt="ÉliteReplay Logo"
              width={180}
              height={90}
              className="group-hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-10">
            {courtId ? (
              <>
                <div className="bg-[#F5BE2D]/20 p-4 rounded-full w-fit mx-auto mb-6">
                  <Zap className="h-12 w-12 text-[#F5BE2D]" />
                </div>
                <h2 className="text-4xl font-bold mb-4">{t("title")}</h2>
                <p className="text-gray-400 text-lg">
                  {t("description")} <span className="text-[#F5BE2D] font-semibold">{courtId}</span>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold mb-4">{t("courtNotFound.title")}</h2>
                <p className="text-gray-400 text-lg">{t("courtNotFound.message")}</p>
              </>
            )}
          </div>

          {!isSuccess ? (
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-10 border border-gray-800 shadow-2xl">
              <h3 className="text-2xl font-semibold mb-8 text-center">{t("session.title")}</h3>

              {error && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-xl text-red-200 text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="block mb-3 text-lg font-medium">
                    {t("session.emailLabel")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="bg-gray-800 border-gray-700 text-white h-14 text-lg rounded-xl focus:border-[#F5BE2D] focus:ring-[#F5BE2D]"
                    disabled={isSubmitting || !courtId}
                  />
                  <p className="mt-3 text-sm text-gray-400">{t("session.emailDescription")}</p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !courtId}
                  className="w-full bg-[#F5BE2D] hover:bg-[#F5BE2D]/90 text-black font-bold h-14 text-lg rounded-xl shadow-lg shadow-[#F5BE2D]/20 hover:shadow-[#F5BE2D]/40 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {t("session.button")} <ArrowRight className="ml-3 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-10 border border-gray-800 text-center shadow-2xl">
              <div className="flex justify-center mb-8">
                <CheckCircle className="h-20 w-20 text-[#F5BE2D]" />
              </div>
              <h3 className="text-3xl font-semibold mb-6">{t("success.title")}</h3>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                {t("success.description")}{" "}
                <span className="text-white font-semibold">{email}</span>.
              </p>
              <div className="p-6 bg-black/50 rounded-xl border border-gray-700 mb-8">
                <p className="text-gray-400">
                  {t("success.encouragement")}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => router.push(`/${locale}/session/${sessionCode}`)}
                  className="bg-[#F5BE2D] hover:bg-[#F5BE2D]/90 text-black font-bold h-14 text-lg rounded-xl shadow-lg shadow-[#F5BE2D]/20 hover:shadow-[#F5BE2D]/40 transition-all duration-300"
                >
                  {t("success.viewButton")} <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
                <Button
                  onClick={() => window.close()}
                  variant="outline"
                  className="border-gray-700 bg-transparent hover:text-white text-white hover:bg-white/10 h-14 text-lg rounded-xl"
                >
                  {t("success.closeButton")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

  
    </div>
  )
}
