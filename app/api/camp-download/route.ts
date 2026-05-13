import { NextRequest } from "next/server";
import {
  camps,
  getCampAccessKey,
  getVisibleCampHighlights,
  isCampSlug,
} from "@/data/camps";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function buildDownloadFilename(sortOrder: number) {
  return `EliteReplay_Highlight_${String(sortOrder).padStart(2, "0")}.mp4`;
}

function buildContentDisposition(filename: string) {
  return `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}

function getAuthorizedHighlight(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const campParam = searchParams.get("camp") || "";
  const key = searchParams.get("key") || "";
  const indexParam = searchParams.get("index") || "";
  const sortOrder = Number.parseInt(indexParam, 10);

  if (!isCampSlug(campParam) || campParam !== "camp-1") {
    return { error: new Response("Not found", { status: 404 }) };
  }

  const camp = camps[campParam];

  if (key !== getCampAccessKey(camp)) {
    return { error: new Response("Unauthorized", { status: 401 }) };
  }

  if (!Number.isInteger(sortOrder) || sortOrder < 1) {
    return { error: new Response("Invalid highlight", { status: 400 }) };
  }

  const highlight = getVisibleCampHighlights(camp).find(
    (item) => item.sort_order === sortOrder,
  );

  if (!highlight?.preview) {
    return { error: new Response("Highlight not found", { status: 404 }) };
  }

  return {
    highlight,
    filename: buildDownloadFilename(sortOrder),
  };
}

function buildDownloadHeaders(filename: string, contentLength?: string | null) {
  const headers = new Headers();
  headers.set("Content-Type", "video/mp4");
  headers.set("Content-Disposition", buildContentDisposition(filename));
  headers.set("Cache-Control", "private, no-store");

  if (contentLength) {
    headers.set("Content-Length", contentLength);
  }

  return headers;
}

export async function HEAD(request: NextRequest) {
  const result = getAuthorizedHighlight(request);

  if ("error" in result) {
    return result.error;
  }

  const upstream = await fetch(result.highlight.preview!, {
    method: "HEAD",
    cache: "no-store",
  });

  if (!upstream.ok) {
    return new Response(null, { status: 502 });
  }

  return new Response(null, {
    status: 200,
    headers: buildDownloadHeaders(
      result.filename,
      upstream.headers.get("content-length"),
    ),
  });
}

export async function GET(request: NextRequest) {
  const result = getAuthorizedHighlight(request);

  if ("error" in result) {
    return result.error;
  }

  const upstream = await fetch(result.highlight.preview!, {
    cache: "no-store",
  });

  if (!upstream.ok || !upstream.body) {
    return new Response("Download unavailable", { status: 502 });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: buildDownloadHeaders(
      result.filename,
      upstream.headers.get("content-length"),
    ),
  });
}
