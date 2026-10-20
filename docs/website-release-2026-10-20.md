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
