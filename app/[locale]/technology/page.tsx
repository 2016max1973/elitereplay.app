'use client'
import Link from "next/link"
import { ArrowLeft, Cpu, Brain, Zap, Camera, Server, Film, Clock, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function TechnologyPage() {
  const locale = useLocale();
  const t = useTranslations('technology');
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="py-6 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <Image src="/images/elitereplay-logo.png" alt="ÉliteReplay Logo" width={120} height={60} />
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <div className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#F5BE2D]">
                  {t('hero.title')}
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                {t('hero.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Hardware Section */}
        <div className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">{t('hardware.title')}</h2>

              <div className="bg-gray-900 rounded-xl p-8 mb-12">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="bg-black p-6 rounded-xl flex items-center justify-center md:w-1/3">
                    <Cpu className="h-24 w-24 text-[#F5BE2D]" />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-semibold mb-4">{t('hardware.nvidia.title')}</h3>
                    <p className="text-gray-300 mb-4">
                      {t('hardware.nvidia.description')}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="font-semibold">{t('hardware.nvidia.specs.processing')}</div>
                      </div>
                      <div className="flex items-center">
                        <div className=" font-semibold">{t('hardware.nvidia.specs.memory')}</div>
                      </div>
                      <div className="flex items-center">
                        <div className=" font-semibold">{t('hardware.nvidia.specs.connectivity')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gray-900 p-6 rounded-xl">
                  <Camera className="h-10 w-10 text-[#F5BE2D] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t('hardware.features.multiCamera.title')}</h3>
                  <p className="text-gray-400">
                    {t('hardware.features.multiCamera.description')}
                  </p>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl">
                  <Server className="h-10 w-10 text-[#F5BE2D] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t('hardware.features.localStorage.title')}</h3>
                  <p className="text-gray-400">
                    {t('hardware.features.localStorage.description')}
                  </p>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl">
                  <Zap className="h-10 w-10 text-[#F5BE2D] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t('hardware.features.powerEfficiency.title')}</h3>
                  <p className="text-gray-400">
                    {t('hardware.features.powerEfficiency.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Technology Section */}
        <div className="py-16 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">{t('aiTech.title')}</h2>

              <div className="space-y-12">
                <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="bg-[#F5BE2D]/20 p-4 rounded-full">
                      <Brain className="h-12 w-12 text-[#F5BE2D]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-4">{t('aiTech.visionModels.title')}</h3>
                      <p className="text-gray-300 mb-6">
                        {t('aiTech.visionModels.description')}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-black/40 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">{t('aiTech.visionModels.features.objectDetection.title')}</h4>
                          <p className="text-gray-400 text-sm">
                            {t('aiTech.visionModels.features.objectDetection.description')}
                          </p>
                        </div>
                        <div className="bg-black/40 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">{t('aiTech.visionModels.features.actionRecognition.title')}</h4>
                          <p className="text-gray-400 text-sm">
                            {t('aiTech.visionModels.features.actionRecognition.description')}
                          </p>
                        </div>
                        <div className="bg-black/40 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">{t('aiTech.visionModels.features.poseEstimation.title')}</h4>
                          <p className="text-gray-400 text-sm">
                            {t('aiTech.visionModels.features.poseEstimation.description')}
                          </p>
                        </div>
                        <div className="bg-black/40 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">{t('aiTech.visionModels.features.trajectoryAnalysis.title')}</h4>
                          <p className="text-gray-400 text-sm">
                            {t('aiTech.visionModels.features.trajectoryAnalysis.description')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="bg-[#F5BE2D]/20 p-4 rounded-full">
                      <Film className="h-12 w-12 text-[#F5BE2D]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-4">{t('aiTech.highlightEngine.title')}</h3>
                      <p className="text-gray-300 mb-6">
                        {t('aiTech.highlightEngine.description')}
                      </p>
                      <div className="space-y-4">
                        <div className="bg-black/40 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">{t('aiTech.highlightEngine.features.excitementScore.title')}</h4>
                          <p className="text-gray-400">
                            {t('aiTech.highlightEngine.features.excitementScore.description')}
                          </p>
                          <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                            <li>{t('aiTech.highlightEngine.features.excitementScore.items.movement')}</li>
                            <li>{t('aiTech.highlightEngine.features.excitementScore.items.ballSpeed')}</li>
                            <li>{t('aiTech.highlightEngine.features.excitementScore.items.uniqueness')}</li>
                            <li>{t('aiTech.highlightEngine.features.excitementScore.items.context')}</li>
                          </ul>
                        </div>
                        <div className="bg-black/40 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">{t('aiTech.highlightEngine.features.autoEditing.title')}</h4>
                          <p className="text-gray-400">{t('aiTech.highlightEngine.features.autoEditing.description')}</p>
                          <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                            <li>{t('aiTech.highlightEngine.features.autoEditing.items.angles')}</li>
                            <li>{t('aiTech.highlightEngine.features.autoEditing.items.slowMotion')}</li>
                            <li>{t('aiTech.highlightEngine.features.autoEditing.items.transitions')}</li>
                            <li>{t('aiTech.highlightEngine.features.autoEditing.items.timing')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="bg-[#F5BE2D]/20 p-4 rounded-full">
                      <Clock className="h-12 w-12 text-[#F5BE2D]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-4">{t('aiTech.realTimePipeline.title')}</h3>
                      <p className="text-gray-300 mb-6">
                        {t('aiTech.realTimePipeline.description')}
                      </p>

                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#F5BE2D]/30"></div>
                        <div className="space-y-8 relative">
                          <div className="pl-12 relative">
                            <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-[#F5BE2D]/20 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-full bg-[#F5BE2D]"></div>
                            </div>
                            <h4 className="font-semibold mb-1">{t('aiTech.realTimePipeline.steps.capture.title')}</h4>
                            <p className="text-gray-400">
                              {t('aiTech.realTimePipeline.steps.capture.description')}
                            </p>
                          </div>

                          <div className="pl-12 relative">
                            <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-[#F5BE2D]/20 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-full bg-[#F5BE2D]"></div>
                            </div>
                            <h4 className="font-semibold mb-1">{t('aiTech.realTimePipeline.steps.preProcessing.title')}</h4>
                            <p className="text-gray-400">
                              {t('aiTech.realTimePipeline.steps.preProcessing.description')}
                            </p>
                          </div>

                          <div className="pl-12 relative">
                            <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-[#F5BE2D]/20 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-full bg-[#F5BE2D]"></div>
                            </div>
                            <h4 className="font-semibold mb-1">{t('aiTech.realTimePipeline.steps.aiAnalysis.title')}</h4>
                            <p className="text-gray-400">
                              {t('aiTech.realTimePipeline.steps.aiAnalysis.description')}
                            </p>
                          </div>

                          <div className="pl-12 relative">
                            <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-[#F5BE2D]/20 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-full bg-[#F5BE2D]"></div>
                            </div>
                            <h4 className="font-semibold mb-1">{t('aiTech.realTimePipeline.steps.highlightSelection.title')}</h4>
                            <p className="text-gray-400">
                              {t('aiTech.realTimePipeline.steps.highlightSelection.description')}
                            </p>
                          </div>

                          <div className="pl-12 relative">
                            <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-[#F5BE2D]/20 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-full bg-[#F5BE2D]"></div>
                            </div>
                            <h4 className="font-semibold mb-1">{t('aiTech.realTimePipeline.steps.autoEditing.title')}</h4>
                            <p className="text-gray-400">
                              {t('aiTech.realTimePipeline.steps.autoEditing.description')}
                            </p>
                          </div>

                          <div className="pl-12 relative">
                            <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-[#F5BE2D]/20 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-full bg-[#F5BE2D]"></div>
                            </div>
                            <h4 className="font-semibold mb-1">{t('aiTech.realTimePipeline.steps.delivery.title')}</h4>
                            <p className="text-gray-400">
                              {t('aiTech.realTimePipeline.steps.delivery.description')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">{t('results.title')}</h2>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                {t('results.description')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-gray-900 p-6 rounded-xl">
                  <div className="text-4xl font-bold text-[#F5BE2D] mb-2">{t('results.metrics.accuracy.value')}</div>
                  <div className="text-gray-300 font-semibold">{t('results.metrics.accuracy.label')}</div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl">
                  <div className="text-4xl font-bold text-[#F5BE2D] mb-2">{t('results.metrics.time.value')}</div>
                  <div className="text-gray-300 font-semibold">{t('results.metrics.time.label')}</div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl">
                  <div className="text-4xl font-bold text-[#F5BE2D] mb-2">{t('results.metrics.quality.value')}</div>
                  <div className="text-gray-300 font-semibold">{t('results.metrics.quality.label')}</div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl">
                  <div className="text-4xl font-bold text-[#F5BE2D] mb-2">{t('results.metrics.satisfaction.value')}</div>
                  <div className="text-gray-300 font-semibold">{t('results.metrics.satisfaction.label')}</div>
                </div>
              </div>

              <div className="flex justify-center">
                <Link href={`/${locale}/start?court=demo123`}>
                  <Button size="lg" className="bg-[#F5BE2D] hover:bg-[#F5BE2D]/90 text-white">
                    {t('results.cta')} <Award className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

     
    </div>
  )
}