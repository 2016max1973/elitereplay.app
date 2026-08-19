const chromeExcludedSegments = [
  "/padelhouse",
  "/start",
  "/session",
  "/match/",
  "/highlight/",
  "/matchboard/",
  "/camp/",
  "/camp-a",
  "/camp-b",
  "/camp-highlights",
  "/netcam-compare-test",
  "/product-sheet",
];

export function isMarketingChromeExcluded(pathname: string) {
  const pathWithoutLocale = pathname.replace(/^\/(en|de|es)/, "") || "/";

  return chromeExcludedSegments.some((segment) =>
    pathWithoutLocale.startsWith(segment),
  );
}
