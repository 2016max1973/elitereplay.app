'use client'

import { useEffect } from 'react'
import { Analytics, type BeforeSend } from '@vercel/analytics/next'
import { track } from '@vercel/analytics'
import { classifyAnalyticsLink, cleanAnalyticsUrl } from '@/lib/analytics-policy'

const beforeSend: BeforeSend = (event) => {
  const url = cleanAnalyticsUrl(event.url)
  return url ? { ...event, url } : null
}

export function WebsiteAnalytics() {
  const enabled = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
  const eventsEnabled = process.env.NEXT_PUBLIC_ANALYTICS_EVENTS_ENABLED === 'true'
  useEffect(() => {
    if (!enabled || !eventsEnabled) return
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const anchor = event.target.closest('a[href]')
      if (!anchor) return
      const name = classifyAnalyticsLink(anchor.getAttribute('href') || '', window.location.href)
      if (!name) return
      const placement = anchor.closest('header') ? 'header' : anchor.closest('footer') ? 'footer' : 'content'
      try { track(name, { placement }) } catch { /* Never block navigation. */ }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [enabled, eventsEnabled])
  return enabled ? <Analytics beforeSend={beforeSend} /> : null
}
