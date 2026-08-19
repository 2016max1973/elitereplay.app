import Image from "next/image";
import Link from "next/link";
import { AlertCircle, ArrowLeft, CheckCircle, Clock, Loader2 } from "lucide-react";
import { findReplaySessionByCode } from "@/lib/replay-sessions";

type SessionPageProps = {
  params: Promise<{ locale: string; code: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusLabel(status: string) {
  switch (status) {
    case "ready":
      return "Highlights bereit";
    case "processing":
      return "Highlights werden verarbeitet";
    default:
      return "Session gestartet";
  }
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { locale, code } = await params;
  const session = await findReplaySessionByCode(code);

  if (!session) {
    return (
      <main className="min-h-screen bg-black text-white">
        <header className="border-b border-gray-800 py-6">
          <div className="container mx-auto px-4">
            <Link href={`/${locale}`} className="flex items-center group">
              <ArrowLeft className="mr-3 h-5 w-5 transition-colors group-hover:text-[#F5BE2D]" />
              <Image
                src="/images/elitereplay-logo.png"
                alt="ÉliteReplay Logo"
                width={150}
                height={75}
                className="transition-opacity group-hover:opacity-80"
              />
            </Link>
          </div>
        </header>

        <section className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="max-w-md rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 text-center shadow-2xl">
            <AlertCircle className="mx-auto mb-6 h-14 w-14 text-[#F5BE2D]" />
            <h1 className="mb-3 text-3xl font-bold">Session nicht gefunden.</h1>
            <p className="text-gray-400">
              Bitte prüfe den Link oder starte die Session erneut über den QR-Code
              am Court.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const hasHighlights = session.highlights.length > 0;

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <Link href={`/${locale}`} className="flex items-center group">
            <ArrowLeft className="mr-3 h-5 w-5 transition-colors group-hover:text-[#F5BE2D]" />
            <Image
              src="/images/elitereplay-logo.png"
              alt="ÉliteReplay Logo"
              width={150}
              height={75}
              className="transition-opacity group-hover:opacity-80"
            />
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-black via-[#051937]/50 to-black py-16">
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-[#F5BE2D]/30 bg-[#F5BE2D]/10 px-4 py-2 text-sm font-semibold text-[#F5BE2D]">
              <CheckCircle className="mr-2 h-4 w-4" />
              {statusLabel(session.status)}
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              ÉliteReplay Session
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">
              Session gestartet. Highlights werden später hier erscheinen.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 shadow-2xl">
            {hasHighlights ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Highlights</h2>
                <p className="text-gray-400">
                  Für diese Session sind {session.highlights.length} Highlight(s)
                  vorbereitet.
                </p>
              </div>
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-[#F5BE2D]/30 bg-black/35 p-8 text-center">
                <Loader2 className="mb-5 h-10 w-10 text-[#F5BE2D]" />
                <h2 className="mb-3 text-2xl font-semibold">
                  Session gestartet. Highlights werden später hier erscheinen.
                </h2>
                <p className="max-w-xl text-gray-400">
                  Deine Session ist angelegt. Sobald Recorder und Pipeline später
                  Clips zuordnen, werden sie hier sichtbar.
                </p>
              </div>
            )}
          </div>

          <aside className="rounded-2xl border border-gray-800 bg-[#0b0b0b] p-6">
            <h2 className="mb-5 text-xl font-semibold">Session-Daten</h2>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-gray-500">Session-Code</dt>
                <dd className="mt-1 break-all font-mono text-[#F5BE2D]">
                  {session.sessionCode}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Court</dt>
                <dd className="mt-1 font-semibold uppercase">{session.courtId}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Status</dt>
                <dd className="mt-1 font-semibold">{statusLabel(session.status)}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Pipeline</dt>
                <dd className="mt-1 font-semibold">{session.pipelineStatus}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Gestartet</dt>
                <dd className="mt-1 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#F5BE2D]" />
                  {formatDate(session.createdAt)}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Kontakt</dt>
                <dd className="mt-1 text-gray-300">E-Mail gespeichert</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </main>
  );
}
