import test from 'node:test'
import assert from 'node:assert/strict'
import { cleanAnalyticsUrl, classifyAnalyticsLink } from '../lib/analytics-policy.ts'

test('only public localized marketing pages are measured', () => {
  for (const locale of ['de', 'en', 'es']) {
    assert.ok(cleanAnalyticsUrl(`https://elitereplay.de/${locale}`))
    assert.ok(cleanAnalyticsUrl(`https://elitereplay.de/${locale}/contact`))
    for (const path of ['session/secret', 'match/123', 'highlight/private', 'start', 'camp/a', 'matchboard/setup', 'unknown'])
      assert.equal(cleanAnalyticsUrl(`https://elitereplay.de/${locale}/${path}`), null)
  }
  assert.equal(cleanAnalyticsUrl('invalid'), null)
})
test('removes identifiers, arbitrary campaign values and fragments', () => {
  assert.equal(cleanAnalyticsUrl('https://elitereplay.de/de?email=person@example.com&token=secret&utm_source=instagram&utm_campaign=club_pilot&utm_content=person#private'), 'https://elitereplay.de/de?utm_source=instagram&utm_campaign=club_pilot')
  assert.equal(cleanAnalyticsUrl('https://elitereplay.de/de?utm_source=person@example.com'), 'https://elitereplay.de/de')
})
test('classifies actions without exposing destinations or draft contents', () => {
  const current = 'https://elitereplay.de/de'
  for (const [href, name] of [['mailto:contact@elitereplay.de?body=private', 'email_click'], ['https://wa.me/123?text=private', 'whatsapp_click'], ['https://capture.elitereplay.de', 'trainer_pilot_click'], ['/en/contact', 'contact_click']])
    assert.equal(classifyAnalyticsLink(href, current), name)
  assert.equal(classifyAnalyticsLink('https://capture.elitereplay.de.evil.test', current), null)
  assert.equal(classifyAnalyticsLink('/de/contact', 'https://elitereplay.de/de/session/secret'), null)
  assert.equal(classifyAnalyticsLink('https://example.com/de/contact', current), null)
})
