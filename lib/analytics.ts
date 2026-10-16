'use client'

import { track } from '@vercel/analytics'
import { cleanAnalyticsUrl } from './analytics-policy'

export function trackContactDraft(channel: 'email' | 'whatsapp') {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' || process.env.NEXT_PUBLIC_ANALYTICS_EVENTS_ENABLED !== 'true') return
  if (!cleanAnalyticsUrl(window.location.href)) return
  // Never pass form values, destination URLs or message contents to analytics.
  try { track('contact_draft_opened', { channel }) } catch { /* Contact must still work. */ }
}
