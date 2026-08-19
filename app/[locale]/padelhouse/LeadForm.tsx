"use client";

import type { FormEvent } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const whatsappNumber = "34640772955";

const fieldClass =
  "h-11 rounded-xl border-[#D8C79D] bg-white text-[#11161C] placeholder:text-[#7A8493] focus-visible:ring-[#D8AA54]";

const selectClass =
  "flex h-11 w-full rounded-xl border border-[#D8C79D] bg-white px-3 py-2 text-sm text-[#11161C] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8AA54] focus-visible:ring-offset-2";

export function LeadForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const lines = [
      "Hallo, ich möchte einen der 6 Plätze im ÉliteReplay PadelHouse Pilotcamp auf Fuerteventura anfragen.",
      "",
      `Name: ${data.get("name") || "-"}`,
      `E-Mail: ${data.get("email") || "-"}`,
      `Spielerlevel: ${data.get("level") || "-"}`,
      `Wunschmonat: ${data.get("month") || "-"}`,
    ];

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#AD7A22]">
          Pilotplatz anfragen
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-normal text-[#11161C]">
          Bist du einer der ersten sechs?
        </h2>
        <p className="mt-3 leading-7 text-[#5D6570]">
          Vier kurze Angaben genügen. Deine Anfrage öffnet sich in WhatsApp –
          Termin, Zimmeroption und Leistungsumfang werden danach persönlich
          bestätigt.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[#11161C]">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Dein Name"
            className={fieldClass}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#11161C]">
            E-Mail
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="level" className="text-[#11161C]">
            Spielerlevel
          </Label>
          <select id="level" name="level" defaultValue="" className={selectClass}>
            <option value="" disabled>
              Bitte auswählen
            </option>
            <option>Anfänger</option>
            <option>Freizeitspieler</option>
            <option>Fortgeschritten</option>
            <option>Turnierspieler</option>
            <option>Unsicher</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="month" className="text-[#11161C]">
            Wunschmonat
          </Label>
          <Input
            id="month"
            name="month"
            placeholder="z. B. Oktober oder Frühjahr"
            className={fieldClass}
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-12 rounded-full bg-[#11161C] text-[#EAC878] hover:bg-black"
      >
        Pilotplatz unverbindlich anfragen
        <Send className="h-4 w-4" />
      </Button>

      <p className="text-center text-xs leading-5 text-[#747B83]">
        Keine direkte Buchung. Du entscheidest erst nach den persönlich
        bestätigten Details.
      </p>
    </form>
  );
}
