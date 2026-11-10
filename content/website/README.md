# English and Spanish marketing versions

Release authorized by Oliver on 10 November 2026: finish and publish English
and Spanish, preserving German page content, design and the original claim.
Prepared against production commit `7a06aeb8f75a2a64b872b082468a90c2220e5123`
on isolated branch `codex/website-languages-release-20261110`.

The five marketing pages are available in DE, EN and ES. Their layouts, real
media and original English claim remain shared. Existing demo software and
original video/image content are not translated; English/Spanish demo links
identify the interactive demo as German-language content.

## Editing

- The published German HTML in `public/website-2026/de/` supplies the page
  layouts. Event pages retain their existing three language versions.
- `capture-source-de.html` is the latest approved local Capture reference for
  the EN/ES versions, including Trainer Tool, Player Mode and original overlay
  media. It does not replace the published German Capture page.
- `source-copy.json` contains stable source phrases. TSV row IDs refer to these
  array indices: append new phrases; do not reorder the array.
- `translations.tsv` contains `id|English|Spanish`.
- `ui-translations.json` covers extra interactive labels and video captions.
- `lib/enquiries/form-copy.json` is the shared form/error copy in all languages.
- Run `python3 scripts/localize-website.py` to generate the eight translated
  product pages and shared language controls/metadata on all 15 pages.
  Untranslated new source phrases stop generation.

The language control preserves the section anchor and a valid event-type
selection. Product enquiries accept and retain the selected locale; the email
draft and all browser form states are localized.

German pages keep `app.js`; translated pages use `app-localized.js` and
`ui-copy.js`. The German-only `language-switch.js` handles locale navigation.
Shared spam protection, idempotency, SMTP transport and all demo code remain
unchanged. The existing privacy notice is translated into EN/ES; analytics
is limited to the 15 public marketing routes on the two production hosts.

## Local preview and verification

Build with `npm run build`. Start only in simulation mode:

```sh
ELITEREPLAY_MAIL_MODE=preview npm run start -- --hostname 127.0.0.1 --port 4180
```

Entry points: `http://127.0.0.1:4180/en` and `http://127.0.0.1:4180/es`.
No email is sent in this mode.

Verified on 10 November: 41 automated tests passed; one unchanged external
Redis integration test skipped because its dedicated test service was not
configured. Local production build passed. All ten EN/ES pages checked at
320, 390 and 1440px: no horizontal overflow, missing loaded images, broken
section anchors or browser exceptions. All 18 event-type/language-switch
combinations retain the selection and section. All ten forms checked for
localized validation, simulated service error, rejection of unconfirmed
delivery and explicit simulation success. Every browser POST was intercepted
locally; no enquiry reached the mail service. The original seven-second Player
Mode clip and localized captions were checked in both languages. Original
media hashes and the claim remain covered by regression tests.

Local evidence: `output/language-release-20261110/` and
`output/playwright/languages-20261110/` in the isolated release workspace.

## Corrections verified on 21 October

- Revised literal EN/ES wording in the translation sources, interactive copy
  and event pages, including Capture replay timing and iPhone onboarding.
- Mobile History now shows the heading, introduction and action links before
  the product image. Desktop composition and original media remain unchanged.
- Language switching reads the currently selected event radio button before
  falling back to the URL. Manual changes take priority over an earlier `art`
  query; the contact anchor is retained.
- Local build and all 21 website tests pass. Browser checks covered all ten
  EN/ES pages at 320, 390 and 1440px, plus all 18 combinations of event type
  and language-switch direction across DE/EN/ES. The original no-query failure
  was also retested successfully. No real enquiry was submitted.
- Evidence: `qa/language-fixes-20261021.json` and
  `qa/history-mobile-corrected-20261021.png`.
