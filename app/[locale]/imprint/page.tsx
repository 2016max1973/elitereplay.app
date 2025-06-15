'use client'
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import {  useTranslations } from "next-intl"

export default function ImprintPage() {
  const t = useTranslations("imprint")
   const currentYear = new Date().getFullYear()
  return (
     <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center group">
            <ArrowLeft className="h-5 w-5 mr-3 group-hover:text-[#F5BE2D] transition-colors" />
            <Image
              src="/images/elitereplay-logo.png"
              alt={t('company.name')}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#F5BE2D]">{t('title')}</span>
            </h1>
            <p className="text-xl text-gray-400">{t('subtitle')}</p>
          </div>

          {/* Content */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 md:p-12 border border-gray-800">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-[#F5BE2D] mb-6">{t('company.title')}</h2>

              <div className="space-y-6 text-gray-300 leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t('company.name')}</h3>
                  <p>
                    {t('company.address')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t('contact.title')}</h3>
                  <p>
                    <strong>Email:</strong> {t('contact.email')}
                    <br />
                    <strong>Phone:</strong> {t('contact.phone')}
                    <br />
                    <strong>Website:</strong> {t('contact.website')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t('legal.title')}</h3>
                  <p>
                    <strong>{t('legal.ceo')}</strong>
                    <br />
                    <strong>{t('legal.cto')}</strong>
                    <br />
                    <strong>{t('legal.legalCounsel')}</strong>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t('registration.title')}</h3>
                  <p>
                    <strong>Company Registration:</strong> {t('registration.companyType')}
                    <br />
                    <strong>Registration Number:</strong> {t('registration.registrationNumber')}
                    <br />
                    <strong>Tax ID:</strong> {t('registration.taxId')}
                    <br />
                    <strong>Founded:</strong> {t('registration.founded')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t('responsible.title')}</h3>
                  <p>
                    {t('responsible.name')}
                    <br />
                    {t('responsible.position')}
                    <br />
                    {t('responsible.address')}
                    <br />
                    Email: {t('responsible.email')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t('disclaimer.title')}</h3>
                  <p>{t('disclaimer.text')}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t('copyright.title')}</h3>
                  <p>{t('copyright.text', { year: currentYear })}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t('thirdParty.title')}</h3>
                  <p>{t('thirdParty.text')}</p>
                </div>

                <div className="pt-6 border-t border-gray-700">
                  <p className="text-sm text-gray-400">
                    <strong>Last updated:</strong> {t('lastUpdated')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
