// Public marketing pages only. Never send session codes or delivery identifiers.
const publicPages = new Set(['', '/contact', '/technology', '/matchboard', '/padelhouse', '/product-sheet', '/privacy', '/privacy/capture', '/imprint'])
const campaignValues: Record<string, readonly string[]> = {
  utm_source: ['instagram', 'facebook', 'google', 'whatsapp', 'newsletter', 'qr'],
  utm_medium: ['social', 'paid_social', 'cpc', 'email', 'qr', 'referral'],
  utm_campaign: ['club_pilot', 'trainer_pilot', 'padelhouse'],
}

export function cleanAnalyticsUrl(input: string): string | null {
  try {
    const url = new URL(input)
    if (!['https:', 'http:'].includes(url.protocol)) return null
    const path = url.pathname.replace(/\/$/, '')
    const match = path.match(/^\/(de|en|es)(\/.*)?$/)
    if (!match || !publicPages.has(match[2] || '')) return null
    const query = new URLSearchParams()
    for (const [key, allowed] of Object.entries(campaignValues)) {
      const value = url.searchParams.get(key)
      if (value && allowed.includes(value)) query.set(key, value)
    }
    url.username = ''; url.password = ''; url.hash = ''; url.search = query.toString()
    return url.toString()
  } catch { return null }
}

export function classifyAnalyticsLink(href: string, currentUrl: string): string | null {
  if (!cleanAnalyticsUrl(currentUrl)) return null
  try {
    const url = new URL(href, currentUrl)
    if (url.protocol === 'mailto:') return 'email_click'
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null
    if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com') return 'whatsapp_click'
    if (url.hostname === 'capture.elitereplay.de') return 'trainer_pilot_click'
    if (url.origin === new URL(currentUrl).origin && /^\/(de|en|es)\/contact\/?$/.test(url.pathname)) return 'contact_click'
    return null
  } catch { return null }
}
