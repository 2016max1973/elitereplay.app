"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

export default function PrivacyPage() {
  const t = useTranslations('privacy')
  const locale = useLocale();
  console.log(`Current locale: ${locale}`)
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

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#F5BE2D]">
                {t('title')}
              </span>
            </h1>
            <p className="text-xl text-gray-400">{t('subtitle')}</p>
          </div>

          {/* Content */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 md:p-12 border border-gray-800">
            <div className="prose prose-invert max-w-none">
              <div className="space-y-8 text-gray-300 leading-relaxed">
                <div>
                  <p className="text-sm text-gray-400 mb-6">
                    <strong>{t('effectiveDate')}</strong>
                    <br />
                    <strong>{t('lastUpdated')}</strong>
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#F5BE2D] mb-4">{t('sections.introduction.title')}</h2>
                  <p>{t('sections.introduction.text')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#F5BE2D] mb-4">{t('sections.informationCollected.title')}</h2>

                  <h3 className="text-xl font-semibold text-white mb-3">{t('sections.informationCollected.personal.title')}</h3>
                  <p className="mb-4">{t('sections.informationCollected.personal.text')}</p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>{t('sections.informationCollected.personal.item1')}</li>
                    <li>{t('sections.informationCollected.personal.item2')}</li>
                    <li>{t('sections.informationCollected.personal.item3')}</li>
                    <li>{t('sections.informationCollected.personal.item4')}</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">{t('sections.informationCollected.videoData.title')}</h3>
                  <p className="mb-4">{t('sections.informationCollected.videoData.text')}</p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>{t('sections.informationCollected.videoData.item1')}</li>
                    <li>{t('sections.informationCollected.videoData.item2')}</li>
                    <li>{t('sections.informationCollected.videoData.item3')}</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">{t('sections.informationCollected.technical.title')}</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>{t('sections.informationCollected.technical.item1')}</li>
                    <li>{t('sections.informationCollected.technical.item2')}</li>
                    <li>{t('sections.informationCollected.technical.item3')}</li>
                    <li>{t('sections.informationCollected.technical.item4')}</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#F5BE2D] mb-4">{t('sections.useInformation.title')}</h2>
                  <p className="mb-4">{t('sections.useInformation.text')}</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>{t('sections.useInformation.item1')}</li>
                    <li>{t('sections.useInformation.item2')}</li>
                    <li>{t('sections.useInformation.item3')}</li>
                    <li>{t('sections.useInformation.item4')}</li>
                    <li>{t('sections.useInformation.item5')}</li>
                    <li>{t('sections.useInformation.item6')}</li>
                    <li>{t('sections.useInformation.item7')}</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#F5BE2D] mb-4">{t('sections.dataProcessing.title')}</h2>
                  <p className="mb-4">{t('sections.dataProcessing.text')}</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>{t('sections.dataProcessing.item1')}</li>
                    <li>{t('sections.dataProcessing.item2')}</li>
                    <li>{t('sections.dataProcessing.item3')}</li>
                    <li>{t('sections.dataProcessing.item4')}</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#F5BE2D] mb-4">{t('sections.dataSharing.title')}</h2>
                  <p className="mb-4">{t('sections.dataSharing.text')}</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>{t('sections.dataSharing.item1')}</li>
                    <li>{t('sections.dataSharing.item2')}</li>
                    <li>{t('sections.dataSharing.item3')}</li>
                    <li>{t('sections.dataSharing.item4')}</li>
                    <li>{t('sections.dataSharing.item5')}</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#F5BE2D] mb-4">{t('sections.dataSecurity.title')}</h2>
                  <p>{t('sections.dataSecurity.text')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#F5BE2D] mb-4">{t('sections.dataRetention.title')}</h2>
                  <p className="mb-4">{t('sections.dataRetention.text')}</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>{t('sections.dataRetention.item1')}</li>
                    <li>{t('sections.dataRetention.item2')}</li>
                    <li>{t('sections.dataRetention.item3')}</li>
                    <li>{t('sections.dataRetention.item4')}</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#F5BE2D] mb-4">{t('sections.yourRights.title')}</h2>
                  <p className="mb-4">{t('sections.yourRights.text')}</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>{t('sections.yourRights.item1')}</li>
                    <li>{t('sections.yourRights.item2')}</li>
                    <li>{t('sections.yourRights.item3')}</li>
                    <li>{t('sections.yourRights.item4')}</li>
                    <li>{t('sections.yourRights.item5')}</li>
                    <li>{t('sections.yourRights.item6')}</li>
                  </ul>
                  <p className="mt-4">{t('sections.yourRights.contact')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#F5BE2D] mb-4">{t('sections.internationalTransfers.title')}</h2>
                  <p>{t('sections.internationalTransfers.text')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#F5BE2D] mb-4">{t('sections.childrensPrivacy.title')}</h2>
                  <p>{t('sections.childrensPrivacy.text')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#F5BE2D] mb-4">{t('sections.policyChanges.title')}</h2>
                  <p>{t('sections.policyChanges.text')}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#F5BE2D] mb-4">{t('sections.contactUs.title')}</h2>
                  <p className="mb-4">{t('sections.contactUs.text')}</p>
                  <div className="bg-black/40 p-6 rounded-xl">
                    <p>
                      <strong>{t('sections.contactUs.address.company')}</strong>
                      <br />
                      {t('sections.contactUs.address.line1')}
                      <br />
                      {t('sections.contactUs.address.line2')}
                      <br />
                      Email: {t('sections.contactUs.address.email')}
                      <br />
                      Phone: {t('sections.contactUs.address.phone')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
