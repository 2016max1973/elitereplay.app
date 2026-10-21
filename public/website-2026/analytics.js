(() => {
  'use strict';

  // These static pages bypass the Next.js layout and its WebsiteAnalytics component.
  // Only the published German marketing pages may load the existing counter.
  const hosts = new Set(['elitereplay.de', 'www.elitereplay.de']);
  const pages = new Set(['/de', '/de/matchboard', '/de/history', '/de/capture', '/de/camps-events']);
  // Keep the same campaign allowlist as lib/analytics-policy.ts.
  const campaignValues = {
    utm_source: ['instagram', 'facebook', 'google', 'whatsapp', 'newsletter', 'qr'],
    utm_medium: ['social', 'paid_social', 'cpc', 'email', 'qr', 'referral'],
    utm_campaign: ['club_pilot', 'trainer_pilot', 'padelhouse'],
  };

  function cleanUrl(input) {
    try {
      const url = new URL(input);
      const path = url.pathname.replace(/\/$/, '');
      if (url.protocol !== 'https:' || !hosts.has(url.host) || !pages.has(path)) return null;
      const query = new URLSearchParams();
      for (const [key, allowed] of Object.entries(campaignValues)) {
        const value = url.searchParams.get(key);
        if (allowed.includes(value)) query.set(key, value);
      }
      url.username = '';
      url.password = '';
      url.pathname = path;
      url.hash = '';
      url.search = query.toString();
      return url.toString();
    } catch {
      return null;
    }
  }

  if (!cleanUrl(window.location.href)) return;
  const source = '/_vercel/insights/script.js';
  if (document.querySelector(`script[src="${source}"]`)) return;

  window.va = window.va || function () {
    (window.vaq = window.vaq || []).push(arguments);
  };
  // Register before loading the vendor script, including its first automatic view.
  // No form, click, identity or other custom events are enabled here.
  window.va('beforeSend', event => {
    if (event.type !== 'pageview') return null;
    const url = cleanUrl(event.url);
    return url ? {type: 'pageview', url} : null;
  });
  const script = document.createElement('script');
  script.src = source;
  script.defer = true;
  document.head.appendChild(script);
})();
