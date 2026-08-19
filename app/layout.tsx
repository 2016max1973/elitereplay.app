import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { getLocale } from "next-intl/server"

export const metadata: Metadata = {
  metadataBase: new URL("https://elitereplay.de"),
  title: {
    default: "ÉliteReplay",
    template: "%s | ÉliteReplay",
  },
  description:
    "ÉliteReplay verbindet Court-Erlebnis, Matchdaten und Club-Content für Padelanlagen.",
  icons: {
    icon: "/images/elitereplay-logo.png",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
