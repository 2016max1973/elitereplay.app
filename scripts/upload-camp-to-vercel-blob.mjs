import { promises as fs } from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";

const VIDEO_EXTENSIONS = new Set([".mp4"]);
const THUMB_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const VALID_CAMPS = new Set(["camp-1", "camp-2"]);
const ENV_PATH = path.resolve(".env.local");

function parseArgs(argv) {
  let dryRun = false;
  let camp = "";
  let sourceDir = "";

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--dry-run") {
      dryRun = true;
      continue;
    }

    if (arg === "--camp" && argv[index + 1]) {
      camp = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg.startsWith("--camp=")) {
      camp = arg.slice("--camp=".length);
      continue;
    }

    if (arg === "--source" && argv[index + 1]) {
      sourceDir = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg.startsWith("--source=")) {
      sourceDir = arg.slice("--source=".length);
    }
  }

  if (!camp) {
    throw new Error("--camp fehlt. Erlaubt sind: camp-1 oder camp-2.");
  }

  if (!VALID_CAMPS.has(camp)) {
    throw new Error(`Ungueltiger Camp-Wert: ${camp}. Erlaubt sind nur camp-1 oder camp-2.`);
  }

  if (!sourceDir) {
    throw new Error("--source fehlt. Bitte den Delivery-Ordner angeben.");
  }

  return { dryRun, camp, sourceDir };
}

async function ensureDirectoryExists(dirPath, label) {
  let stats;

  try {
    stats = await fs.stat(dirPath);
  } catch {
    throw new Error(`${label} existiert nicht: ${dirPath}`);
  }

  if (!stats.isDirectory()) {
    throw new Error(`${label} ist kein Ordner: ${dirPath}`);
  }
}

async function loadEnvLocal() {
  try {
    const raw = await fs.readFile(ENV_PATH, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      if (!key || process.env[key]) {
        continue;
      }

      let value = trimmed.slice(separatorIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return;
    }
    throw error;
  }
}

async function readFiles(dirPath, extensions) {
  const dirEntries = await fs.readdir(dirPath, { withFileTypes: true });

  return dirEntries
    .filter((entry) => entry.isFile())
    .map((entry) => ({
      name: entry.name,
      ext: path.extname(entry.name).toLowerCase(),
      fullPath: path.join(dirPath, entry.name),
    }))
    .filter((entry) => extensions.has(entry.ext))
    .sort((left, right) => left.name.localeCompare(right.name));
}

function normalizeThumbnailStem(filename) {
  return path.parse(filename).name.replace(/_thumb$/i, "");
}

function formatBytes(bytes) {
  if (bytes === 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** unitIndex;

  return `${value.toFixed(unitIndex === 0 ? 0 : 2)} ${units[unitIndex]}`;
}

function buildTitle(index) {
  return `ÉliteReplay Camp Moment ${String(index + 1).padStart(2, "0")}`;
}

function buildHighlightMetadata(camp, index) {
  const sequence = String(index + 1).padStart(2, "0");
  if (camp === "camp-2") {
    return {
      title: `ÉliteReplay Training Moment ${sequence}`,
      description: "Camp 2 · Training Moment",
    };
  }

  return {
    title: buildTitle(index),
    description: "Camp 1 · Match Moment",
  };
}

function buildPathsForCamp(camp) {
  const campNumber = camp === "camp-1" ? "1" : "2";

  return {
    resultPath: path.resolve(`data/camps/${camp}-blob-upload-result.json`),
    reportPath: path.resolve(`CAMP${campNumber}_BLOB_UPLOAD_REPORT.md`),
  };
}

function getCampReportLabel(camp) {
  return camp === "camp-1" ? "CAMP1" : "CAMP2";
}

function buildReport({
  camp,
  sourceDir,
  dryRun,
  videoFiles,
  thumbnailFiles,
  videoBytes,
  thumbnailBytes,
  missingThumbnails,
  results,
  warnings,
}) {
  const lines = [
    `# ${getCampReportLabel(camp)}_BLOB_UPLOAD_REPORT`,
    "",
    `- Camp: \`${camp}\``,
    `- Quelle: \`${sourceDir}\``,
    `- Modus: ${dryRun ? "Dry-run" : "Echter Upload"}`,
    `- Anzahl Videos: ${videoFiles.length}`,
    `- Anzahl Thumbnails: ${thumbnailFiles.length}`,
    `- Gesamtgröße Videos: ${formatBytes(videoBytes)}`,
    `- Gesamtgröße Thumbnails: ${formatBytes(thumbnailBytes)}`,
    "",
    "## Fehlende Thumbnails",
  ];

  if (missingThumbnails.length === 0) {
    lines.push("- Keine");
  } else {
    for (const missing of missingThumbnails) {
      lines.push(`- ${missing}`);
    }
  }

  lines.push("", "## Geplante Blob-Pfade");

  if (results.length === 0) {
    lines.push("- Keine Dateien gefunden");
  } else {
    for (const result of results) {
      lines.push(`- Video: \`${result.blob_video_path}\``);
      if (result.blob_thumbnail_path) {
        lines.push(`- Thumbnail: \`${result.blob_thumbnail_path}\``);
      } else {
        lines.push(`- Thumbnail: fehlt fuer \`${result.source_video_file}\``);
      }
    }
  }

  lines.push("", "## Fehler/Warnungen");

  if (warnings.length === 0) {
    lines.push("- Keine");
  } else {
    for (const warning of warnings) {
      lines.push(`- ${warning}`);
    }
  }

  lines.push("");
  return `${lines.join("\n")}\n`;
}

async function main() {
  await loadEnvLocal();
  const { dryRun, camp, sourceDir } = parseArgs(process.argv.slice(2));
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const warnings = [];

  if (!dryRun && !token) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN fehlt. Echter Upload wird ohne Token abgebrochen.",
    );
  }

  if (dryRun && !token) {
    warnings.push(
      "BLOB_READ_WRITE_TOKEN fehlt. Dry-run laeuft trotzdem ohne echten Upload.",
    );
  }

  const videosDir = path.join(sourceDir, "videos");
  const thumbnailsDir = path.join(sourceDir, "thumbnails");

  await ensureDirectoryExists(videosDir, "source/videos");
  await ensureDirectoryExists(thumbnailsDir, "source/thumbnails");

  const { resultPath, reportPath } = buildPathsForCamp(camp);

  const [videoFiles, thumbnailFiles] = await Promise.all([
    readFiles(videosDir, VIDEO_EXTENSIONS),
    readFiles(thumbnailsDir, THUMB_EXTENSIONS),
  ]);

  const [videoStats, thumbnailStats] = await Promise.all([
    Promise.all(videoFiles.map((file) => fs.stat(file.fullPath))),
    Promise.all(thumbnailFiles.map((file) => fs.stat(file.fullPath))),
  ]);

  const thumbnailByStem = new Map(
    thumbnailFiles.map((file) => [normalizeThumbnailStem(file.name), file]),
  );

  const missingThumbnails = [];
  const results = [];

  for (const [index, videoFile] of videoFiles.entries()) {
    const stem = path.parse(videoFile.name).name;
    const thumbnailFile = thumbnailByStem.get(stem);

    if (!thumbnailFile) {
      missingThumbnails.push(videoFile.name);
      warnings.push(`Kein Thumbnail gefunden fuer ${videoFile.name}`);
    }

    const blobVideoPath = `camp-assets/${camp}/videos/${videoFile.name}`;
    const blobThumbnailPath = thumbnailFile
      ? `camp-assets/${camp}/thumbs/${thumbnailFile.name}`
      : "";

    let blobVideoUrl = dryRun ? "DRY_RUN" : "";
    let blobThumbnailUrl = dryRun ? "DRY_RUN" : "";

    if (!dryRun) {
      const videoBuffer = await fs.readFile(videoFile.fullPath);
      const videoUpload = await put(blobVideoPath, videoBuffer, {
        access: "public",
        token,
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      blobVideoUrl = videoUpload.url;

      if (thumbnailFile) {
        const thumbnailBuffer = await fs.readFile(thumbnailFile.fullPath);
        const thumbnailUpload = await put(blobThumbnailPath, thumbnailBuffer, {
          access: "public",
          token,
          addRandomSuffix: false,
          allowOverwrite: true,
        });
        blobThumbnailUrl = thumbnailUpload.url;
      } else {
        blobThumbnailUrl = "";
      }
    }

    const highlightMetadata = buildHighlightMetadata(camp, index);

    results.push({
      title: highlightMetadata.title,
      description: highlightMetadata.description,
      thumbnail: thumbnailFile ? blobThumbnailUrl : "",
      preview: blobVideoUrl,
      download: blobVideoUrl,
      visible: true,
      sort_order: index + 1,
      source_video_file: videoFile.name,
      source_thumbnail_file: thumbnailFile ? thumbnailFile.name : "",
      blob_video_path: blobVideoPath,
      blob_thumbnail_path: blobThumbnailPath,
      blob_video_url: blobVideoUrl,
      blob_thumbnail_url: thumbnailFile ? blobThumbnailUrl : "",
    });
  }

  const videoBytes = videoStats.reduce((sum, stat) => sum + stat.size, 0);
  const thumbnailBytes = thumbnailStats.reduce((sum, stat) => sum + stat.size, 0);

  const report = buildReport({
    camp,
    sourceDir,
    dryRun,
    videoFiles,
    thumbnailFiles,
    videoBytes,
    thumbnailBytes,
    missingThumbnails,
    results,
    warnings,
  });

  await fs.writeFile(resultPath, `${JSON.stringify(results, null, 2)}\n`, "utf8");
  await fs.writeFile(reportPath, report, "utf8");

  const summary = {
    mode: dryRun ? "dry-run" : "upload",
    camp,
    sourceDir,
    videoCount: videoFiles.length,
    thumbnailCount: thumbnailFiles.length,
    totalVideoBytes: videoBytes,
    totalThumbnailBytes: thumbnailBytes,
    missingThumbnails,
    resultPath,
    reportPath,
    tokenPresent: Boolean(token),
    warnings,
    plannedBlobPaths: results.map((result) => ({
      video: result.blob_video_path,
      thumbnail: result.blob_thumbnail_path,
    })),
  };

  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
