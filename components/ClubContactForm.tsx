"use client";

import Link from "next/link";
import { Mail, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const inputClass =
  "h-12 rounded-xl border-white/12 bg-white/[0.045] text-white placeholder:text-white/32 focus-visible:ring-[#F5BE2D]";

export default function ClubContactForm() {
  const locale = useLocale();
  const t = useTranslations("ContactPage.clubForm");
  const [draftOpened, setDraftOpened] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const club = String(data.get("club") || "").trim();
    const lines = [
      t("emailIntro"),
      "",
      `${t("name")}: ${data.get("name") || "-"}`,
      `${t("club")}: ${club || "-"}`,
      `${t("role")}: ${data.get("role") || "-"}`,
      `${t("email")}: ${data.get("email") || "-"}`,
      `${t("location")}: ${data.get("location") || "-"}`,
      `${t("courts")}: ${data.get("courts") || "-"}`,
      `${t("useCase")}: ${data.get("useCase") || "-"}`,
      "",
      `${t("message")}:`,
      String(data.get("message") || "-"),
    ];
    const subject = t("emailSubject", { club: club || "ÉliteReplay" });
    const mailto = `mailto:contact@elitereplay.de?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    setDraftOpened(true);
    window.location.href = mailto;
  }

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_26px_80px_rgba(0,0,0,0.35)] sm:p-8">
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F5BE2D]">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58">
          {t("intro")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label={t("name")} htmlFor="name" required>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              required
              placeholder={t("namePlaceholder")}
              className={inputClass}
            />
          </Field>
          <Field label={t("club")} htmlFor="club" required>
            <Input
              id="club"
              name="club"
              autoComplete="organization"
              required
              placeholder={t("clubPlaceholder")}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label={t("role")} htmlFor="role">
            <Input
              id="role"
              name="role"
              autoComplete="organization-title"
              placeholder={t("rolePlaceholder")}
              className={inputClass}
            />
          </Field>
          <Field label={t("email")} htmlFor="email" required>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@example.com"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label={t("location")} htmlFor="location">
            <Input
              id="location"
              name="location"
              autoComplete="address-level2"
              placeholder={t("locationPlaceholder")}
              className={inputClass}
            />
          </Field>
          <Field label={t("courts")} htmlFor="courts">
            <Input
              id="courts"
              name="courts"
              type="number"
              inputMode="numeric"
              min="1"
              placeholder={t("courtsPlaceholder")}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label={t("useCase")} htmlFor="useCase">
          <select
            id="useCase"
            name="useCase"
            defaultValue=""
            className={`${inputClass} w-full px-3 text-sm`}
          >
            <option className="bg-[#111]" value="">
              {t("useCasePlaceholder")}
            </option>
            <option className="bg-[#111]">{t("useCases.club")}</option>
            <option className="bg-[#111]">{t("useCases.premiumCourt")}</option>
            <option className="bg-[#111]">{t("useCases.tournament")}</option>
            <option className="bg-[#111]">{t("useCases.camp")}</option>
            <option className="bg-[#111]">{t("useCases.hotel")}</option>
            <option className="bg-[#111]">{t("useCases.sponsorEvent")}</option>
          </select>
        </Field>

        <Field label={t("message")} htmlFor="message">
          <Textarea
            id="message"
            name="message"
            rows={5}
            placeholder={t("messagePlaceholder")}
            className="rounded-xl border-white/12 bg-white/[0.045] text-white placeholder:text-white/32 focus-visible:ring-[#F5BE2D]"
          />
        </Field>

        <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/66">
          <input
            type="checkbox"
            name="privacy"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-[#F5BE2D]"
          />
          <span>
            {t("privacyPrefix")} {" "}
            <Link
              href={`/${locale}/privacy`}
              className="font-semibold text-[#F5BE2D] underline decoration-[#F5BE2D]/40 underline-offset-4"
            >
              {t("privacyLink")}
            </Link>
            {t("privacySuffix")}
          </span>
        </label>

        <Button
          type="submit"
          size="lg"
          className="h-[52px] rounded-full bg-[#F5BE2D] font-bold text-black hover:bg-[#F7CC58]"
        >
          {t("submit")}
          <Send aria-hidden="true" className="h-4 w-4" />
        </Button>

        <p className="text-center text-xs leading-5 text-white/42">
          {t("deliveryNote")}
        </p>

        {draftOpened ? (
          <div
            role="status"
            className="rounded-xl border border-[#F5BE2D]/25 bg-[#F5BE2D]/8 p-4 text-sm leading-6 text-white/78"
          >
            <Mail aria-hidden="true" className="mr-2 inline h-4 w-4 text-[#F5BE2D]" />
            {t("draftOpened")} {" "}
            <a
              href="mailto:contact@elitereplay.de"
              className="font-semibold text-[#F5BE2D] underline underline-offset-4"
            >
              contact@elitereplay.de
            </a>
            .
          </div>
        ) : null}
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-sm font-semibold text-white/82">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </Label>
      {children}
    </div>
  );
}
