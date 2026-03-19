"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Camera,
  Zap,
  Server,
  QrCode,
  Play,
  Users,
  TrendingUp,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function LandingPage() {
  const locale = useLocale();
  const t = useTranslations("HomePage");
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* 1. Hero Section with Full-screen Video */}
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source
              src="/placeholder.svg?height=1080&width=1920&text=Slow-Motion+Basketball+Highlights"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-blue-800/10 to-black/80"></div>
        </div>

        {/* Animated particles overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="particle absolute rounded-full bg-[#F5BE2D]/30"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 15}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          {/* Centered Logo */}
          <div className="mb-12 animate-fade-in">
            <Image
              src="/images/elitereplay-logo.png"
              alt="ÉliteReplay Logo"
              width={450}
              height={225}
              className="mx-auto drop-shadow-2xl"
              priority
            />
          </div>

          {/* Slogan */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight animate-slide-up">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#F5BE2D] to-white">
              {t("title")}
            </span>
          </h1>

          <p className="text-md md:text-2xl max-w-5xl mx-auto mb-12 text-gray-200 animate-fade-in-delay">
            {t("description")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up-delay">
            <Button
              asChild
              size="lg"
              className="bg-[#F5BE2D] hover:bg-[#F5BE2D]/90 text-black font-semibold rounded-full px-10 py-4 shadow-2xl shadow-[#F5BE2D]/30 hover:shadow-[#F5BE2D]/50 transition-all duration-300 hover:scale-105"
            >
              <Link href="#apply">
                {t("button1")} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-[#F5BE2D] hover:bg-[#F5BE2D]/90 text-black font-semibold rounded-full px-10 py-4 shadow-2xl shadow-[#F5BE2D]/30 hover:shadow-[#F5BE2D]/50 transition-all duration-300 hover:scale-105"
            >
              <Link
                href={{
                  pathname: `/${locale}/start`,
                  query: { court: "demo123" },
                }}
              >
                {t("button2")} <Play className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 !bg-transparent border-white text-white hover:text-white hover:bg-white/10 rounded-full px-10 py-4 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Link href={`/${locale}/session/demo123`}>
                {t("button3")} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-0 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-8 h-12 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
            <div className="w-1 h-3 bg-[#F5BE2D] rounded-full animate-pulse"></div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float-up {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 0.5;
            }
            100% {
              transform: translateY(-100vh) rotate(360deg);
              opacity: 0;
            }
          }
          .particle {
            animation: float-up linear infinite;
          }
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
          .animate-fade-in-delay {
            animation: fade-in 1s ease-out 0.3s both;
          }
          .animate-slide-up {
            animation: slide-up 1s ease-out 0.5s both;
          }
          .animate-slide-up-delay {
            animation: slide-up 1s ease-out 0.8s both;
          }
        `}</style>
      </div>

      {/* 2. Player Features - REDESIGNED */}
      <div className="py-24 bg-gradient-to-b from-black/90 to-blue-800/30 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-blue-700/10 blur-3xl"></div>
          <div className="absolute -bottom-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-blue-700/5 blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] rounded-full bg-blue-700/5 blur-3xl"></div>

          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-6 opacity-10">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
                style={{ left: `${(i / 6) * 100}%` }}
              ></div>
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{ top: `${(i / 6) * 100}%` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20 relative">
              <div className="inline-block">
                <span className="text-xs font-semibold tracking-widest uppercase text-[#F5BE2D] bg-[#F5BE2D]/10 px-4 py-2 rounded-full mb-4 inline-block">
                  Elite Features
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#F5BE2D]">
                    {t("Features.headline")}
                  </span>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F5BE2D]"></div>
                </h2>
              </div>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mt-8">
                {t("Features.description")}
              </p>
            </div>

            {/* Features - Staggered Layout */}
            <div className="relative">
              {/* Feature 1 - Replay Wall */}
              <div className="feature-card-wrapper mb-16 md:mb-32">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="feature-image-container md:w-3/5 relative mb-8 md:mb-0">
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#F5BE2D]/10">
                      <div className="aspect-[16/9]">
                        <Image
                          src="/images/replay-wall-card-bg.png"
                          alt="Replay Wall"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                        <div className="flex items-center">
                          <div className="bg-[#F5BE2D]/20 backdrop-blur-md p-4 rounded-full mr-5">
                            <Camera className="h-8 w-8 text-[#F5BE2D]" />
                          </div>
                          <h3 className="text-3xl font-bold text-white">
                            Replay Wall
                          </h3>
                        </div>
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[#F5BE2D]/30 rounded-full"></div>
                    <div className="absolute -top-6 -left-6 w-20 h-20 border border-[#F5BE2D]/20 rounded-full"></div>
                  </div>
                  <div className="feature-content md:w-2/5 md:pl-16">
                    <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-gray-800 transform md:translate-x-[-80px] hover:border-[#F5BE2D]/30 transition-all duration-500 shadow-lg">
                      <h4 className="text-2xl font-semibold mb-4 text-white">
                        {t("Features.replayWall.title")}
                      </h4>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {t("Features.replayWall.description")}
                      </p>
                      <ul className="space-y-3">
                        
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                          {t("Features.replayWall.list1")}
                        </li>
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                          {t("Features.replayWall.list2")}
                        </li>
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                          {t("Features.replayWall.list3")}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 - AI Detection */}
              <div className="feature-card-wrapper mb-16 md:mb-32">
                <div className="flex flex-col md:flex-row-reverse items-center">
                  <div className="feature-image-container md:w-3/5 relative mb-8 md:mb-0">
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#F5BE2D]/10">
                      <div className="aspect-[16/9]">
                        <Image
                          src="/images/ai-detection-feature.png"
                          alt="AI Detection"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-0 right-0 w-full p-6 md:p-10 text-right">
                        <div className="flex items-center justify-end">
                          <h3 className="text-3xl font-bold text-white mr-5">
                            AI Detection
                          </h3>
                          <div className="bg-[#F5BE2D]/20 backdrop-blur-md p-4 rounded-full">
                            <Zap className="h-8 w-8 text-[#F5BE2D]" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-[#F5BE2D]/30 rounded-full"></div>
                    <div className="absolute -top-6 -right-6 w-20 h-20 border border-[#F5BE2D]/20 rounded-full"></div>
                  </div>
                  <div className="feature-content md:w-2/5 md:pr-16">
                    <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-gray-800 transform md:translate-x-[80px] hover:border-[#F5BE2D]/30 transition-all duration-500 shadow-lg">
                      <h4 className="text-2xl font-semibold mb-4 text-white">
                        {t("Features.smartHighlight.title")}
                      </h4>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {t("Features.smartHighlight.description")}
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                          {t("Features.smartHighlight.list1")}
                        </li>
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                          {t("Features.smartHighlight.list2")}
                        </li>
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                          {t("Features.smartHighlight.list3")}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 3 - Edge Processing */}
              <div className="feature-card-wrapper mb-16 md:mb-32">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="feature-image-container md:w-3/5 relative mb-8 md:mb-0">
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#F5BE2D]/10">
                      <div className="aspect-[16/9]">
                        <Image
                          src="/images/edge-processing-feature.png"
                          alt="Edge Processing"
                          fill
                          className="object-cover"
                          />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                        <div className="flex items-center">
                          <div className="bg-[#F5BE2D]/20 backdrop-blur-md p-4 rounded-full mr-5">
                            <Server className="h-8 w-8 text-[#F5BE2D]" />
                          </div>
                          <h3 className="text-3xl font-bold text-white">
                            Edge Processing
                          </h3>
                        </div>
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[#F5BE2D]/30 rounded-full"></div>
                    <div className="absolute -top-6 -left-6 w-20 h-20 border border-[#F5BE2D]/20 rounded-full"></div>
                  </div>
                  <div className="feature-content md:w-2/5 md:pl-16">
                    <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-gray-800 transform md:translate-x-[-80px] hover:border-[#F5BE2D]/30 transition-all duration-500 shadow-lg">
                      <h4 className="text-2xl font-semibold mb-4 text-white">
                          {t("Features.instantProcessing.title")}
                      </h4>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {t("Features.instantProcessing.description")}
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                          {t("Features.instantProcessing.list1")}
                        </li>
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                          {t("Features.instantProcessing.list2")}
                        </li>
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                          {t("Features.instantProcessing.list3")}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 4 - QR Access */}
              <div className="feature-card-wrapper">
                <div className="flex flex-col md:flex-row-reverse items-center">
                  <div className="feature-image-container md:w-3/5 relative mb-8 md:mb-0">
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#F5BE2D]/10">
                      <div className="aspect-[16/9]">
                        <Image
                          src="/images/seamless-experience-qr.png"
                          alt="QR Access"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-0 right-0 w-full p-6 md:p-10 text-right">
                        <div className="flex items-center justify-end">
                          <h3 className="text-3xl font-bold text-white mr-5">
                            QR Access
                          </h3>
                          <div className="bg-[#F5BE2D]/20 backdrop-blur-md p-4 rounded-full">
                            <QrCode className="h-8 w-8 text-[#F5BE2D]" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-[#F5BE2D]/30 rounded-full"></div>
                    <div className="absolute -top-6 -right-6 w-20 h-20 border border-[#F5BE2D]/20 rounded-full"></div>
                  </div>
                  <div className="feature-content md:w-2/5 md:pr-16">
                    <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-gray-800 transform md:translate-x-[80px] hover:border-[#F5BE2D]/30 transition-all duration-500 shadow-lg">
                      <h4 className="text-2xl font-semibold mb-4 text-white">
                        {t("Features.seamlessExperience.title")}
                      </h4>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {t("Features.seamlessExperience.description")}
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                          {t("Features.seamlessExperience.list1")}
                        </li>
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                          {t("Features.seamlessExperience.list2")}
                        </li>
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-[#F5BE2D] rounded-full mr-3"></div>
                          {t("Features.seamlessExperience.list3")}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Demo Section */}
            <div className="mt-24 text-center relative">
              <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-px h-40 bg-gradient-to-b from-transparent to-[#F5BE2D]/30"></div>
              <Button
                asChild
                size="lg"
                className="relative bg-black hover:bg-black/80 text-[#F5BE2D] border-2 border-[#F5BE2D] rounded-full px-10 py-6 shadow-xl shadow-[#F5BE2D]/10 hover:shadow-[#F5BE2D]/30 transition-all duration-500 hover:scale-105 group"
              >
                <Link href={`/${locale}/demo`} className="flex items-center">
                  <span className="mr-3 text-lg font-semibold">
                    {t("Features.cta")}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#F5BE2D] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-5 w-5 text-black ml-1" />
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Player Journey Section  */}
      <section className="relative bg-gradient-to-b from-blue-800/30 to-black/90 py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 sm:mb-12">
            {t("journey.title")}
          </h2>
          <div className="relative flex flex-col sm:flex-row justify-between mt-8 sm:mt-12 px-0 sm:px-4 gap-8 sm:gap-0">
            <div className="hidden sm:block absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 z-0"></div>
            <div className="flex flex-row sm:flex-col items-start sm:items-center w-full sm:w-1/5 relative z-10">
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-lg sm:text-2xl font-bold text-black mr-4 sm:mr-0 sm:mb-4 shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl relative group">
                1
                <div className="absolute inset-0 rounded-full border-2 border-yellow-400 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
              </div>
              <div className="text-left sm:text-center">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                  {t("journey.step1.heading")}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  {t("journey.step1.description")}
                </p>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-start sm:items-center w-full sm:w-1/5 relative z-10">
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-lg sm:text-2xl font-bold text-black mr-4 sm:mr-0 sm:mb-4 shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl relative group">
                2
                <div className="absolute inset-0 rounded-full border-2 border-yellow-400 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
              </div>
              <div className="text-left sm:text-center">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                  {t("journey.step2.heading")}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  {t("journey.step2.description")}
                </p>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-start sm:items-center w-full sm:w-1/5 relative z-10">
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-lg sm:text-2xl font-bold text-black mr-4 sm:mr-0 sm:mb-4 shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl relative group">
                3
                <div className="absolute inset-0 rounded-full border-2 border-yellow-400 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
              </div>
              <div className="text-left sm:text-center">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                  {t("journey.step3.heading")}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  {t("journey.step3.description")}
                </p>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-start sm:items-center w-full sm:w-1/5 relative z-10">
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-lg sm:text-2xl font-bold text-black mr-4 sm:mr-0 sm:mb-4 shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl relative group">
                4
                <div className="absolute inset-0 rounded-full border-2 border-yellow-400 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
              </div>
              <div className="text-left sm:text-center">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                  {t("journey.step4.heading")}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  {t("journey.step4.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Experience Section */}
      <section className="relative py-20 bg-gradient-to-r from-black/90 to-[#051937]/70 ">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className=" font-bold text-4xl text-white mb-8 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-20 after:h-[3px] after:bg-gradient-to-r after:from-[#ffc107] after:to-[#fff7b00] after:shadow-[0_0_10px_rgba(255,193,7,0.5)]">
                {t("start.title")}
              </h2>
              <p className="text-[#aaa] text-lg mb-8">
                {t("start.description")}
              </p>
              <div className="bg-[#0a1128]/70 rounded-xl p-6 shadow-[0_8px_16px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center text-center md:text-left">
                <Image
                  width={60}
                  height={60}
                  src="/images/player-avatar.jpg"
                  alt="Player Avatar"
                  className="w-16 h-16 rounded-full object-cover mr-0 md:mr-4 mb-4 md:mb-0 border-2 border-[#ffc107] shadow-[0_0_10px_rgba(255,193,7,0.3)]"
                />
                <div>
                  <p className="text-white italic mb-2">
                    {t("start.testimonial.quote")}
                  </p>
                  <p className="text-[#ffc107] font-medium text-sm not-italic">
                    {t("start.testimonial.author")}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.3),0_0_20px_rgba(255,193,7,0.2)]">
              <Image
                width={60}
                height={60}
                src="/images/player-avatar.jpg"
                alt="Player watching highlights"
                className="w-full h-auto transition-transform duration-500 hover:scale-103"
              />
              <div className="absolute bottom-8 right-8 bg-black/70 p-4 rounded-lg flex flex-col items-center glow-yellow-box rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
                <Image
                  width={60}
                  height={60}
                  src="/images/qr-code.png"
                  alt="QR —Access"
                  className="w-24 h-24 mb-2 border-2 bg-white border-[#ffc107]"
                />
                <span className=" text-[#ffc107] text-sm uppercase tracking-wider">
                  Scan to Start
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Demo CTA / Highlight Preview - UPDATED WITH AI IMAGE */}
      <div className="py-24 bg-gradient-to-b from-blue-800/30 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#F5BE2D]">
                {t("action.title")}
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-16 max-w-4xl mx-auto">
              {t("action.description")}
            </p>
            <VideoPlayer />

            {/* Start Session Now Button */}
            <Button
              asChild
              size="lg"
              className="bg-[#F5BE2D] hover:bg-[#F5BE2D]/90 text-black font-bold rounded-full px-16 py-6 text-lg shadow-2xl shadow-[#F5BE2D]/30 hover:shadow-[#F5BE2D]/50 transition-all duration-300 hover:scale-105"
            >
              <Link href={`/${locale}/start?court=demo123`}>
                {t("action.cta")} <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Community Showcase Section  */}
      <section className="relative py-20 bg-gradient-to-b from-[#051937]/70 to-black/90">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className=" font-bold text-4xl text-center text-white mb-4 glow-yellow">
            {t("community.title")}
          </h2>
          <p className="text-center text-[#aaa] text-lg mb-12 max-w-2xl mx-auto">
            {t("community.description")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#0a1128]/70 rounded-xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.3),0_0_20px_rgba(255,193,7,0.2)] hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  width={60}
                  height={60}
                  src="/images/community-highlight1.jpg"
                  alt="Community highlight"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="play-button absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#ffc107]/90 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,193,7,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(255,193,7,0.7)] transition-all duration-300 ">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="p-6">
                <p className="font-bold text-lg text-white mb-2">
                  {t("community.highlights.highlight1.title")}
                </p>
                <p className="text-[#aaa] text-sm mb-4">by Michael J.</p>
                <div className="flex justify-between text-[#ffc107] text-sm">
                  <span>2.4K views</span>
                  <span>347 likes</span>
                </div>
              </div>
            </div>
            <div className="bg-[#0a1128]/70 rounded-xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.3),0_0_20px_rgba(255,193,7,0.2)] hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  width={60}
                  height={60}
                  src="/images/community-highlight2.jpg"
                  alt="Community highlight"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="play-button absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#ffc107]/90 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,193,7,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(255,193,7,0.7)] transition-all duration-300 ">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="p-6">
                <p className="font-bold text-lg text-white mb-2">
                  {t("community.highlights.highlight2.title")}
                </p>
                <p className="text-[#aaa] text-sm mb-4">by Eastside Ballers</p>
                <div className="flex justify-between text-[#ffc107] text-sm">
                  <span>1.8K views</span>
                  <span>293 likes</span>
                </div>
              </div>
            </div>
            <div className="bg-[#0a1128]/70 rounded-xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.3),0_0_20px_rgba(255,193,7,0.2)] hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  width={60}
                  height={60}
                  src="/images/community-highlight3.jpg"
                  alt="Community highlight"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="play-button absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#ffc107]/90 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,193,7,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(255,193,7,0.7)] transition-all duration-300 ">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="p-6">
                <p className="font-bold text-lg text-white mb-2">
                  {t("community.highlights.highlight3.title")}
                </p>
                <p className="text-[#aaa] text-sm mb-4">by Sarah K.</p>
                <div className="flex justify-between text-[#ffc107] text-sm">
                  <span>3.1K views</span>
                  <span>512 likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Court Operators & Partner Section */}
      <div
        id="apply"
        className="py-24 bg-gradient-to-b from-black to-blue-800/30"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#F5BE2D]">
              {t("partners.title")}
            </span>
          </h2>
          <p className="text-xl text-center text-gray-400 max-w-4xl mx-auto mb-20">
            {t("partners.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {/* Monetization */}
            <div className="group bg-gradient-to-br from-black to-gray-900 p-10 rounded-2xl border border-gray-800 hover:border-[#F5BE2D] transition-all duration-300 hover:shadow-2xl hover:shadow-[#F5BE2D]/20 hover:scale-105">
              <div className="bg-[#F5BE2D]/20 p-4 rounded-full w-fit mb-8 group-hover:bg-[#F5BE2D]/30 transition-all duration-300">
                <TrendingUp className="h-8 w-8 text-[#F5BE2D]" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 group-hover:text-[#F5BE2D] transition-colors">
                Monetization
                {t("partners.monetization.title")}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {t("partners.monetization.description")}
              </p>
              <div className="h-1 w-24 bg-[#F5BE2D] rounded-full group-hover:w-40 transition-all duration-500"></div>
            </div>

            {/* Club Branding */}
            <div className="group bg-gradient-to-br from-black to-gray-900 p-10 rounded-2xl border border-gray-800 hover:border-[#F5BE2D] transition-all duration-300 hover:shadow-2xl hover:shadow-[#F5BE2D]/20 hover:scale-105">
              <div className="bg-[#F5BE2D]/20 p-4 rounded-full w-fit mb-8 group-hover:bg-[#F5BE2D]/30 transition-all duration-300">
                <Award className="h-8 w-8 text-[#F5BE2D]" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 group-hover:text-[#F5BE2D] transition-colors">
                {t("partners.clubBranding.title")}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {t("partners.clubBranding.description")}
              </p>
              <div className="h-1 w-24 bg-[#F5BE2D] rounded-full group-hover:w-40 transition-all duration-500"></div>
            </div>

            {/* Community Features */}
            <div className="group bg-gradient-to-br from-black to-gray-900 p-10 rounded-2xl border border-gray-800 hover:border-[#F5BE2D] transition-all duration-300 hover:shadow-2xl hover:shadow-[#F5BE2D]/20 hover:scale-105">
              <div className="bg-[#F5BE2D]/20 p-4 rounded-full w-fit mb-8 group-hover:bg-[#F5BE2D]/30 transition-all duration-300">
                <Users className="h-8 w-8 text-[#F5BE2D]" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 group-hover:text-[#F5BE2D] transition-colors">
                {t("partners.communityFeatures.title")}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {t("partners.communityFeatures.description")}
              </p>
              <div className="h-1 w-24 bg-[#F5BE2D] rounded-full group-hover:w-40 transition-all duration-500"></div>
            </div>
          </div>

          {/* Partner CTA */}
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-[#F5BE2D] hover:bg-[#F5BE2D]/90 text-black font-bold rounded-full px-12 py-6 text-lg shadow-2xl shadow-[#F5BE2D]/30 hover:shadow-[#F5BE2D]/50 transition-all duration-300 hover:scale-105"
              >
              <Link href={`/${locale}/contact`}>
              {t("partners.applyButton")} <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
