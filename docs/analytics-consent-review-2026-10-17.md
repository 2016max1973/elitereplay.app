# Website analytics: consent review, 17 October 2026

## Scope and observed configuration

Website: `elitereplay.de`, Vercel project `elitereplay-app`, standard Web Analytics on Pro. Source baseline: `78eb7ff5be2e8e61fd1fa2489b29ac09a77d8ef6`.

The production browser check on 17 October confirmed a JavaScript analytics script and a successful page-view POST containing the public URL, route and referrer. Internal navigation generated another page view. The SDK is `@vercel/analytics/next` 2.0.1. This is active browser instrumentation, not merely counting ordinary server logs.

`lib/analytics-policy.ts` allows public DE/EN/ES marketing and legal pages, strips arbitrary query parameters and fragments, and excludes session, match and highlight URLs. Vercel documents a request-derived visitor hash discarded after 24 hours, no cross-site identifiers and aggregated statistics. Neither that description nor URL redaction proves exemption from consent.

## Applicable guidance and assessment

The published controller is established in Spain. Article 22.2 LSSI and the AEPD's guidance are therefore the primary national reference for this review; a German translation of the site is not, by itself, a basis for treating German law as the only applicable rule. GDPR and the EDPB's interpretation of Article 5(3) ePrivacy remain relevant. This is an engineering assessment of published requirements, not a binding legal opinion.

EDPB Guidelines 2/2023, final version, paragraph 33 explicitly include JavaScript instructing a browser to transmit information. Paragraphs 40 and 56 require a separate exemption assessment. The absence of cookies alone does not settle the question.

The AEPD permits narrowly limited audience measurement without consent if its listed safeguards are met. Evidence for this installation:

| Requirement | Evidence / remaining gap |
| --- | --- |
| Restricted audience statistics, no advertising or cross-site tracking | Consistent with the documented product and URL restrictions. |
| Inform visitors | Existing section 8, updated in this change. |
| Identifier lifespan limited | Vercel documents 24 hours. |
| Retention of collected information no more than 25 months | NOT established by the 12-month Pro reporting window. Dashboard availability is not a contractual deletion guarantee. |
| Provider acts exclusively for the publisher and does not reuse collected data | Vercel's DPA distinguishes Customer Data from Service-Generated Data. A product-specific guarantee covering every relevant analytics data category has not been established. Do not infer a violation, or a guarantee, from that distinction alone. |
| Independent data/identifiers for different publishers | Product documentation disclaims cross-site identifiers; complete contractual guarantees have not been independently verified. |
| Article 28 agreement, transfer safeguards, documented configuration assessment | Vercel publishes a DPA for Pro/Enterprise and transfer terms. The account-specific contractual record and all exemption conditions have not been fully verified. |

**Conclusion:** This review cannot substantiate a consent exemption for the current installation. The recommended implementation is prior opt-in for analytics, equal accept/reject choices, continued site access on rejection, and an easy withdrawal control. Alternatively stop analytics until an exemption is documented. Do not claim that all cookieless analytics always require a banner, or that a privacy notice alone makes tracking lawful. A banner also does not replace the processor agreement or international-transfer safeguards.

## Retention wording

Vercel's standard Pro plan documents a 12-month **reporting window**. The 24-hour identifier lifespan is separate. Do not promise deletion of all source data or backups after either period without a documented provider guarantee. Do not change the subscription or purchase Analytics Plus for this task.

## Primary sources checked on 17 October 2026

- LSSI Article 22.2: https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a22
- AEPD audience measurement exemption, January 2024, sections II and III: https://www.aepd.es/guias/guia-cookies-analiticas-externas.pdf
- AEPD cookie guidance, May 2024: https://www.aepd.es/documento/guia-cookies.pdf
- EDPB Guidelines 2/2023, final version adopted 7 October 2024: https://www.edpb.europa.eu/system/files/documents/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf
- Vercel analytics privacy: https://vercel.com/docs/analytics/privacy-policy
- Vercel reporting windows: https://vercel.com/docs/analytics/limits-and-pricing
- Vercel DPA, especially sections 4, 6, 12 and Schedule 1: https://vercel.com/legal/dpa
