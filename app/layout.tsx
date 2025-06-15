import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

import LanguageSwitcher from "@/components/LanguageSwitcher"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ÉliteReplay - AI-Powered Sports Highlights",
  description: "Capture your best moments with AI-powered sports highlight system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageSwitcher />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
