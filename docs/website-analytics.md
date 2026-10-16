# ÉliteReplay: Besucher- und Kontaktmessung

Stand 16.10.2026. Projekt `elitereplay-app`, Team `oliver-s-projects-e79bbd96`.
Die Live-Seite enthielt nur einen manuellen Script-Verweis. Der Script-Endpunkt lieferte 404; die Vercel Analytics API meldete für das korrekte Projekt „Web Analytics not found“. Das bedeutet fehlende Messung, nicht null Besucher. Frühere Besucherzahlen lassen sich damit nicht rückwirkend rekonstruieren.

## Vorbereitet

- Offizielles `@vercel/analytics/next` ersetzt das manuelle Script und unterstützt clientseitige Navigation.
- Nur Production (`NEXT_PUBLIC_VERCEL_ENV=production`), keine Preview-/Entwicklungsbesuche.
- Öffentliche Marketingseiten in DE/EN/ES; genaue Freigabeliste in `lib/analytics-policy.ts`. Neue Seiten dort bewusst ergänzen. Session-, Match-, Highlight-, Camp- und andere nicht freigegebene Seiten werden verworfen.
- Seiten-URL ohne Fragment und ohne beliebige Queryparameter. Nur fest erlaubte UTM-Werte bleiben erhalten. Keine Formulareingaben oder Nachrichteninhalte in eigenen Ereignissen.
- Datenschutzhinweise in allen drei Sprachen um den tatsächlichen Messumfang ergänzt.

| Ereignis | Bedeutung |
| --- | --- |
| contact_click | Klick zur Kontaktseite |
| email_click | Klick auf einen E-Mail-Link |
| whatsapp_click | Klick auf einen WhatsApp-Link |
| trainer_pilot_click | Wechsel zu capture.elitereplay.de |
| contact_draft_opened | Formular übergibt einen Entwurf an E-Mail oder WhatsApp |

Klick-Ereignisse haben nur `placement` (header/footer/content), Entwurf-Ereignisse nur `channel` (email/whatsapp). Ein Entwurf bestätigt weder eine versendete Nachricht noch eine erfolgreiche Anfrage. Trainer-Anmeldungen müssten separat in der Capture-App gemessen werden. Popupblocker oder fehlende Mail-Apps können das tatsächliche Öffnen verhindern; gemessen wird der gestartete Übergabeversuch. Keine Ereignisse addieren, um daraus die Anzahl eindeutiger Leads zu behaupten.

## Aktivierung nach Review

1. Vercel → Team `oliver-s-projects-e79bbd96` → `elitereplay-app` → Analytics → Web Analytics aktivieren. Vor etwaigen kostenpflichtigen Änderungen den Tarif prüfen. Dieser PR bucht nichts.
2. In den Projekteinstellungen sicherstellen, dass Vercel-Systemvariablen exponiert werden und `NEXT_PUBLIC_VERCEL_ENV` im Production-Build `production` ist. Nicht manuell für Preview auf production setzen.
3. Für Klick-/Formularereignisse: Custom Events sind laut Vercel-Dokumentation auf Pro/Enterprise verfügbar. Nur bei passendem Tarif `NEXT_PUBLIC_ANALYTICS_EVENTS_ENABLED=true` für **Production** setzen; sonst bleibt die Basismessung für Seitenaufrufe unabhängig nutzbar.
4. PR prüfen/mergen und **nach** Aktivierung neu in Production deployen. Öffentliche NEXT_PUBLIC-Variablen werden beim Build eingebunden; nach Änderungen neu bauen.
5. In einem Browser ohne Blocker die Live-Seite besuchen. Netzwerk prüfen: Analytics-Script HTTP 200, erfolgreicher Pageview-POST (SDK 2 kann einen projektspezifischen Intake-Pfad nutzen). Interne Navigation darf pro Seitenwechsel nur einen Pageview auslösen.
6. Bei aktivierten Custom Events Kontakt-/Trainer-/WhatsApp-Links und beide gültigen Formulare prüfen. Erwartete Ereignisse im Netzwerk und anschließend Dashboard bestätigen. Ungültige Formulare dürfen kein Entwurf-Ereignis auslösen. Keine Testnachricht absenden.
7. Payload prüfen: keine Namen, E-Mails, Nachrichtentexte, Tokens oder freie Queryparameter. Auf einer Session-/Highlight-Seite dürfen keine Pageview-/Custom-Event-Requests ausgelöst werden. Preview muss messfrei bleiben.
8. Erst bei sichtbaren Daten im Dashboard als live/abgenommen markieren. Die Aktivierung und diese Live-Abnahme sind mit diesem Vorbereitungs-PR noch nicht erfolgt.

## Auswertung und Kampagnen

Dashboard: Besucher (geschätzte eindeutige Besucher), Seitenaufrufe, meistbesuchte Seiten, verweisende Websites, Länder und Geräte. Herkunft ist nicht immer verfügbar: Apps, Browser und direkte Aufrufe können keinen Referrer liefern. „Direkt/unbekannt“ ist kein Beweis für manuelle URL-Eingabe. Die Vercel-eigene Referrer-/Geräteverarbeitung richtet sich nach dessen SDK und Datenschutzbeschreibung.

Für eindeutige Kampagnen diese Links nutzen:

- Instagram: https://elitereplay.de/de?utm_source=instagram&utm_medium=social&utm_campaign=club_pilot
- WhatsApp: https://elitereplay.de/de?utm_source=whatsapp&utm_medium=referral&utm_campaign=trainer_pilot
- QR: https://elitereplay.de/de?utm_source=qr&utm_medium=qr&utm_campaign=club_pilot

UTM-Auswertung im Dashboard ist laut Dokumentation Web Analytics Plus/Enterprise vorbehalten; Tarif vor Buchung prüfen. Erlaubte Quellen: instagram, facebook, google, whatsapp, newsletter, qr. Medien: social, paid_social, cpc, email, qr, referral. Kampagnen: club_pilot, trainer_pilot, padelhouse. Andere Werte und utm_content/utm_term werden entfernt. Keine personenbezogenen Angaben in Kampagnenlinks.

## Prüfung und Rücknahme

`node --test tests/analytics-policy.test.mjs` (Node 22.18+ oder 24) prüft Seitenfreigaben, URL-Bereinigung und Ereigniszuordnung. `npm run build` prüft die Next.js-Integration. Die echte Datenerfassung lässt sich erst nach Aktivierung auf Production abnehmen.

Custom Events abschalten: Production-Variable auf false setzen und neu deployen. Gesamte Messung abschalten: WebsiteAnalytics aus RootLayout entfernen und deployen oder Web Analytics im Dashboard deaktivieren. Keine Formulardaten/Token zum Debuggen protokollieren.

Quellen: https://vercel.com/docs/analytics/quickstart · https://vercel.com/docs/analytics/troubleshooting · https://vercel.com/docs/analytics/filtering · https://vercel.com/docs/analytics/privacy-policy
