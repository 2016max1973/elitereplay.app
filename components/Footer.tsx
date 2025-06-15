'use client';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useLocale, useTranslations } from 'next-intl';
const Footer = () => {
      const locale = useLocale();
      const t = useTranslations("Footer");
  return (
      <footer className="py-16 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo */}
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <Image
                src="/images/elitereplay-logo.png"
                alt="ÉliteReplay Logo"
                width={250}
                height={125}
                className="mx-auto md:mx-0 mb-4"
              />
              <p className="text-gray-400 text-lg">
                {t('text')}
              </p>
            </div>
            {/* Contact, Imprint, Privacy links */}
            <div className="flex flex-col sm:flex-row gap-8 text-center">
              <Link
                href={`/${locale}/contact`}
                className="text-gray-400 hover:text-[#F5BE2D] transition-colors text-lg font-medium"
              >
                {t('contact')}
              </Link>
              <Link
                href={`/${locale}/imprint`}
                className="text-gray-400 hover:text-[#F5BE2D] transition-colors text-lg font-medium"
              >
                Imprint
              </Link>
              <Link
                href={`/${locale}/privacy`}
                className="text-gray-400 hover:text-[#F5BE2D] transition-colors text-lg font-medium"
              >
                Privacy
              </Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            © {new Date().getFullYear()} {t('copyright')}
          </div>
        </div>
      </footer>
  )
}

export default Footer