"""Generate the EN/ES marketing pages from the approved German layouts.

Only text, language metadata and locale links change. Media, claims, form
field values and product structure remain shared. Never deploys or sends mail.
"""
from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public/website-2026"
CONTENT = ROOT / "content/website"
LOCALES = ("de", "en", "es")
SLUGS = ("index", "matchboard", "history", "capture", "camps-events")
source = json.loads((CONTENT / "source-copy.json").read_text())
preserved = {
    "ÉliteReplay", "MatchBoard", "History", "Highlights", "Capture",
    "YOUR SCORE.", "YOUR FOCUS.", "YOUR MOMENT.", "ÉliteReplay Capture",
    "01 / MATCHBOARD", "Player Button", "MyMoment", "02 / MATCHBOARD HISTORY",
    "contact@elitereplay.de", "© 2026 ÉliteReplay", "MatchBoard History",
    "ÉLITEREPLAY / MATCHBOARD", "1×", "2×", "Oliver & Basti", "Philipp & Pascal",
    "01 / TOPDOWN", "02 / SIDECAM", "03 / NETCAM",
    "ÉLITEREPLAY / MATCHBOARD / HISTORY", "CAPTURE", "LOGO",
}
translations = {text: [text, text] for text in sorted(preserved)}
seen = set()
for line in (CONTENT / "translations.tsv").read_text().splitlines():
    key, english, spanish = line.split("|")
    index = int(key)
    assert index not in seen, f"Duplicate translation: {index}"
    seen.add(index)
    translations[source[index]] = [english, spanish]
assert all(s in translations for s in source), "Missing source translations"
extras = json.loads((CONTENT / "ui-translations.json").read_text())
translations.update(extras)
forms = json.loads((ROOT / "lib/enquiries/form-copy.json").read_text())
labels = {"de": "Sprache wählen", "en": "Choose language", "es": "Elegir idioma"}
language_names = {"de": "Deutsch", "en": "English", "es": "Español"}


def translate(value, locale):
    plain = html.unescape(value.strip())
    if not plain or not re.search(r"[a-zA-ZÀ-ÿ]", plain):
        return plain
    if plain not in translations:
        raise ValueError(f"Untranslated {locale} text: {plain}")
    return translations[plain][LOCALES.index(locale) - 1]


def localize_document(document, locale):
    chunks = re.split(
        r"(<script\b.*?</script>|<style\b.*?</style>|<!--.*?-->|<[^>]+>)",
        document, flags=re.S | re.I,
    )
    output = []
    for chunk in chunks:
        if chunk.startswith(("<script", "<style", "<!--")):
            output.append(chunk)
        elif chunk.startswith("<"):
            def attribute(match):
                key, value = match.groups()
                return f'{key}="{html.escape(translate(value, locale), quote=True)}"'
            chunk = re.sub(
                r'\b(alt|aria-label|placeholder|title|data-alt|data-label)="([^"]*)"',
                attribute, chunk,
            )
            if re.match(r"<meta\b", chunk, re.I) and re.search(
                r'(?:name="description"|property="og:(?:title|description)")', chunk
            ):
                chunk = re.sub(r'\b(content)="([^"]*)"', attribute, chunk)
            output.append(chunk)
        else:
            stripped = chunk.strip()
            if stripped:
                left = chunk[:len(chunk)-len(chunk.lstrip())]
                right = chunk[len(chunk.rstrip()):]
                chunk = left + html.escape(translate(stripped, locale), quote=False) + right
            output.append(chunk)
    result = "".join(output)
    result = result.replace('<html lang="de">', f'<html lang="{locale}">')
    result = re.sub(r'(["\'])/de(?=[/#?"\'])', rf'\1/{locale}', result)
    result = result.replace("https://elitereplay.de/de", f"https://elitereplay.de/{locale}")
    return result


def path_for(locale, slug):
    return f"/{locale}" + ("" if slug == "index" else f"/{slug}")


def chrome(document, locale, slug):
    # Remove the earlier event-only switch and our generated controls on reruns.
    document = re.sub(r'<div class="e-language-bar v-dark"><div class="wrap"><nav\b[^>]*>.*?</nav>(?:<small>.*?</small>)?</div></div>', "", document, flags=re.S)
    document = re.sub(r'<!-- language-switch -->.*?<!-- /language-switch -->', "", document, flags=re.S)
    document = re.sub(r'<!-- locale-meta -->.*?<!-- /locale-meta -->', "", document, flags=re.S)
    document = re.sub(r'<link rel="alternate" hreflang="[^"]+" href="[^"]+">', "", document)
    document = re.sub(r'<script src="/website-2026/ui-copy.js" defer></script>', "", document)
    document = re.sub(r'<link rel="stylesheet" href="/website-2026/languages.css">', "", document)
    if locale != "de":
        document = re.sub(r'href="/de(?=[/#?"])', f'href="/{locale}', document)
        document = document.replace("https://elitereplay.de/de", f"https://elitereplay.de/{locale}")
    switch = '<!-- language-switch --><div class="site-language-row"><nav class="site-languages" aria-label="' + labels[locale] + '">'
    for lang in LOCALES:
        current = ' aria-current="page"' if lang == locale else ""
        switch += f'<a href="{path_for(lang, slug)}" lang="{lang}" hreflang="{lang}" aria-label="{language_names[lang]}"{current}>{lang.upper()}</a>'
    switch += '</nav></div><!-- /language-switch -->'
    document = document.replace("</header>", switch + "</header>", 1)
    alternates = '<!-- locale-meta -->' + "".join(
        f'<link rel="alternate" hreflang="{lang}" href="https://elitereplay.de{path_for(lang,slug)}">'
        for lang in (*LOCALES, "x-default")
    ).replace("/x-default", "/de") + '<!-- /locale-meta -->'
    document = document.replace("</head>", alternates + '<link rel="stylesheet" href="/website-2026/languages.css"></head>')
    if locale == 'de':
        document = re.sub(r'<script src="/website-2026/language-switch.js" defer></script>', '', document)
        document = document.replace('</body>', '<script src="/website-2026/language-switch.js" defer></script></body>')
        # German copy, media and form configuration remain exactly as in production.
        return document
    document = re.sub(r'<script src="/website-2026/language-switch.js" defer></script>', '', document)
    document = document.replace('/website-2026/app-localized.js', '/website-2026/app.js')
    # Sharing metadata follows the current page title and description.
    title = html.escape(html.unescape(re.search(r'<title>(.*?)</title>', document, re.S).group(1)), quote=True)
    description = re.search(r'<meta name="description" content="([^"]*)"', document).group(1)
    document = re.sub(r'(<meta property="og:title" content=")[^"]*', lambda m: m.group(1) + title, document)
    document = re.sub(r'(<meta property="og:description" content=")[^"]*', lambda m: m.group(1) + description, document)
    if '/website-2026/analytics.js' not in document:
        document = document.replace('</head>', '<script src="/website-2026/analytics.js" defer></script></head>')
    document = document.replace('<script src="/website-2026/app.js"', '<script src="/website-2026/ui-copy.js" defer></script><script src="/website-2026/app-localized.js"')
    # Preserve the existing event copy and use the same authoritative form copy.
    def enquiry_copy(match):
        copy = json.loads(match.group(1))
        copy["locale"] = locale
        copy["form"] = {k:v for k,v in forms[locale].items() if k != "localNote"}
        if slug != "camps-events":
            copy["form"]["message"] = "Dein Club, Training oder deine Spielrunde" if locale == "de" else translate("Dein Club, Training oder deine Spielrunde", locale)
        return '<script id="enquiryCopy" type="application/json">' + json.dumps(copy, ensure_ascii=False).replace("</", "<\\/") + "</script>"
    document = re.sub(r'<script id="enquiryCopy" type="application/json">(.*?)</script>', enquiry_copy, document, flags=re.S)
    return document


for slug in SLUGS:
    german = (PUBLIC / "de" / f"{slug}.html").read_text()
    # Strip generated additions before translating the German source on reruns.
    clean = re.sub(r'<!-- language-switch -->.*?<!-- /language-switch -->', "", german, flags=re.S)
    clean = re.sub(r'<!-- locale-meta -->.*?<!-- /locale-meta -->', "", clean, flags=re.S)
    for locale in LOCALES:
        if locale == "de":
            document = german
        elif slug == "camps-events":
            document = (PUBLIC / locale / f"{slug}.html").read_text()
        else:
            reference = (CONTENT / 'capture-source-de.html').read_text() if slug == 'capture' else clean
            document = localize_document(reference, locale)
            if slug == "capture":
                for screen in ("student", "appointment"):
                    document = document.replace(f"capture-training-2026-11/{screen}-de.png", f"capture-training-2026-11/{screen}-{locale}.png")
            # The live German media and copy remain intact; translation-only aids
            # such as the German-demo note are restored from the prepared copy.
        (PUBLIC / locale / f"{slug}.html").write_text(chrome(document, locale, slug))

app_source = (PUBLIC / "app-localized.js").read_text() + (PUBLIC / 'capture-current.js').read_text()
ui = {lang: {} for lang in ("en", "es")}
for text, values in translations.items():
    if text in app_source or text in extras:
        for index, lang in enumerate(("en", "es")):
            ui[lang][text] = values[index]
(PUBLIC / "ui-copy.js").write_text(
    "// Generated by scripts/localize-website.py. Edit content/website instead.\n"
    "window.EliteReplayTranslations=" + json.dumps(ui, ensure_ascii=False).replace("</", "<\\/") + ";\n"
)
print("Generated 15 localized pages, language navigation and interactive UI copy.")
