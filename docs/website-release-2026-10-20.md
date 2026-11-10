# Website release — 20 October 2026

## Scope

Publish the approved five German marketing pages, plus the existing English and
Spanish event translations. Preserve the original claim, real media, existing
MatchBoard/History demo, legal routes and match/camp delivery routes. Other
English and Spanish product pages remain on their existing version.

Source fidelity is recorded in `website-preview-source.json`. The separate local
preview and the original working checkout are not modified by this release.

## Enquiries

Production uses United Domains SMTP over verified TLS. Credentials are Vercel
Production Secrets, never repository files or client JavaScript. The production
prebuild authenticates without sending an email and blocks publication on error.
Preview deployments always simulate, regardless of any SMTP environment values.

Local verification: 19 automated website tests passed, Next.js production build
passed, five desktop and mobile pages checked, simulated general and tournament
submissions checked. No real enquiry or test email was sent. SMTP acceptance
does not prove inbox delivery. Rate limiting and deduplication are bounded,
process-local safeguards, not distributed guarantees.

Next.js was patched to 15.5.28 and compatible dependency fixes applied. The audit
has no remaining critical findings; 12 inherited moderate/high findings remain,
mainly in build-tool dependency chains. Breaking framework/style upgrades are
outside this design-preserving release.

## Deployment and rollback

Project: `elitereplay-app` (`prj_UJjI8sTSRbpxzxma9b3rIaszLVHN`).
Team: `oliver-s-projects-e79bbd96`.

Previous production deployment:
`dpl_7xgjNdgM9rMxDTeLpXK6nP7uKDy8`.
Previous production commit:
`ab4c985b61a5c064c08d011e4e2ce7dcd394540b`.

After deployment, verify all five public pages, legal pages, existing demos,
media playback and read-only enquiry availability. Do not submit production
forms as a test. The previous ready deployment is the rollback target if needed.

## Language release — 10 November 2026

Oliver explicitly authorized finishing and publishing the English and Spanish
versions, preserving German content, design and the original claim. The release
starts from the current production commit `7a06aeb8f75a2a64b872b082468a90c2220e5123`
and deployment `dpl_7T9KQ6B2NJ95qZQbpx9xF1jF3c2S`; the earlier rollback identifiers
above are historical and must not be used for this release.

Scope: all five EN/ES marketing pages, DE/EN/ES language navigation, localized
enquiry validation/drafts, EN/ES translation of the existing privacy notice,
and inclusion of the new public language routes in the existing analytics
allowlist. The latest local Capture reference supplies the EN/ES Trainer Tool,
Player Mode, controls and original overlay media. German Capture and all other
German page content remain unchanged apart from language navigation/metadata.

The later distributed spam/deduplication protection and retired archive/test
routes in the production base are retained. The process-local protection note
above describes the October 20 release only. No security rollback, credential
change, demo change or real test enquiry is part of this release.

Verification and reproduction: `content/website/README.md`. Browser checks
cover ten translated pages at three widths, all 18 event language-switch
combinations, ten simulated forms and both translated Player Mode dialogs.
41 automated tests passed; the existing external Redis integration test was
skipped without a dedicated test service. The Next.js production build passed.
Publishing uses the existing GitHub/Vercel production integration. The existing
prebuild verifies the shared store and SMTP authentication without sending mail.
