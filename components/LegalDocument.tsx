import { Fragment, type ReactNode } from "react";

export type LegalSubsection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export type LegalSection = LegalSubsection & {
  subsections?: LegalSubsection[];
};

type LegalDocumentProps = {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
};

const linkPattern = /(https:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g;

function renderText(text: string): ReactNode[] {
  return text.split(linkPattern).map((part, index) => {
    if (part.startsWith("https://")) {
      const punctuation = /[.,;:]$/.test(part) ? part.slice(-1) : "";
      const href = punctuation ? part.slice(0, -1) : part;

      return (
        <Fragment key={`${part}-${index}`}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="break-words font-semibold text-[#F5BE2D] underline decoration-[#F5BE2D]/35 underline-offset-4"
          >
            {href}
          </a>
          {punctuation}
        </Fragment>
      );
    }

    if (part.includes("@")) {
      return (
        <a
          key={`${part}-${index}`}
          href={`mailto:${part}`}
          className="font-semibold text-[#F5BE2D] underline decoration-[#F5BE2D]/35 underline-offset-4"
        >
          {part}
        </a>
      );
    }

    return part;
  });
}

function SectionBody({ section }: { section: LegalSubsection }) {
  return (
    <>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{renderText(paragraph)}</p>
      ))}

      {section.items && section.items.length > 0 ? (
        <ul className="list-disc space-y-2 pl-6 marker:text-[#F5BE2D]">
          {section.items.map((item) => (
            <li key={item}>{renderText(item)}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export default function LegalDocument({
  title,
  subtitle,
  lastUpdated,
  sections,
}: LegalDocumentProps) {
  return (
    <main className="min-h-screen bg-black pt-[76px] text-white">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <header className="mx-auto mb-14 max-w-4xl text-center">
          <h1 className="bg-gradient-to-r from-white to-[#F5BE2D] bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/58 sm:text-xl">
            {subtitle}
          </p>
          <p className="mt-5 text-sm text-white/42">{lastUpdated}</p>
        </header>

        <div className="space-y-10 rounded-[28px] border border-white/10 bg-gradient-to-br from-gray-900 to-black p-6 text-[0.98rem] leading-7 text-gray-300 shadow-2xl shadow-black/35 sm:p-10 lg:p-12">
          {sections.map((section) => (
            <section key={section.title} className="space-y-5">
              <h2 className="text-2xl font-bold leading-tight text-[#F5BE2D]">
                {section.title}
              </h2>
              <SectionBody section={section} />

              {section.subsections?.map((subsection) => (
                <div
                  key={subsection.title}
                  className="space-y-4 rounded-2xl border border-white/8 bg-white/[0.025] p-5 sm:p-6"
                >
                  <h3 className="text-xl font-semibold leading-tight text-white">
                    {subsection.title}
                  </h3>
                  <SectionBody section={subsection} />
                </div>
              ))}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
