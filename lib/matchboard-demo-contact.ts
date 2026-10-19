// ÉliteReplay's confirmed WhatsApp Business contact for MatchBoard campaigns.
// Keep separate from the PadelHouse contact. No click analytics or automatic messages.
const number = "34646301315";
export function matchboardWhatsAppHref(locale = "de") {
  const text = locale === "es"
    ? "Hola Oliver, me interesa MatchBoard para mi club y me gustaría saber más."
    : locale === "en"
      ? "Hi Oliver, I am interested in MatchBoard for my club and would like to learn more."
      : "Hallo Oliver, ich interessiere mich für MatchBoard für meinen Club und möchte mehr erfahren.";
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function matchboardDemoCopy(locale: string) {
  if (locale === "es") return {
    demo: "Probar MatchBoard en vivo", whatsapp: "Consultar por WhatsApp", back: "Volver a MatchBoard",
    club: "MatchBoard para mi club", note: "Demo interactiva en alemán · Sin registro", history: "Explorar el historial de partidos",
    title: "Prueba MatchBoard", intro: "Golden Point, punto de set, punto de partido e historial de jugadores. Una demo interactiva con datos ficticios.",
  };
  if (locale === "en") return {
    demo: "Try MatchBoard live", whatsapp: "Ask on WhatsApp", back: "Back to MatchBoard",
    club: "MatchBoard for my club", note: "Interactive demo in German · No sign-up", history: "Explore Match History",
    title: "Try MatchBoard", intro: "Golden Point, set point, match point and player history. An interactive demo with fictional data.",
  };
  return {
    demo: "MatchBoard live ausprobieren", whatsapp: "Über WhatsApp anfragen", back: "Zurück zu MatchBoard",
    club: "MatchBoard für meinen Club", note: "Direkt ausprobieren · Ohne Anmeldung", history: "Match History selbst entdecken",
    title: "MatchBoard live ausprobieren", intro: "Golden Point, Satzball, Matchball und Spieler-History. Eine interaktive Demo mit fiktiven Daten.",
  };
}
