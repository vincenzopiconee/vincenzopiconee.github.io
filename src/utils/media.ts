import fs from 'node:fs';
import path from 'node:path';

export interface MediaItem {
  src: string;
  label: string;
  width?: number;
  height?: number;
  isLandscape?: boolean;
}

export interface VideoMediaItem extends MediaItem {
  poster?: string;
}

export interface ProjectMedia {
  icon?: string;
  iconDark?: string;
  iconTinted?: string;
  background?: string;
  demoVideo?: string;
  demoPoster?: string;
  demoVideos: VideoMediaItem[];
  screenshots: MediaItem[];
  artworks: MediaItem[];
  characters: MediaItem[];
  rewards: MediaItem[];
  isLandscapeGallery: boolean;
  hasRealMedia: boolean;
}

const IMAGE_EXTS = ['.png', '.webp', '.jpg', '.jpeg', '.avif', '.svg'];
const VIDEO_EXTS = ['.mp4', '.webm', '.mov'];

const RESERVED_ROOT_STEMS = new Set([
  'icon',
  'app-icon',
  'appicon',
  'icon-dark',
  'app-icon-dark',
  'icon-tinted',
  'app-icon-tinted',
  'background',
  'bg',
  'sfondo',
  'demo-poster',
  'poster',
  'cover',
]);

function formatLabel(filename: string): string {
  const stem = path.basename(filename, path.extname(filename));
  return stem
    .replace(/^\d+[-_]?/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (ch) => ch.toUpperCase())
    .replace(/\bPdf\b/g, 'PDF')
    .replace(/\bUi\b/g, 'UI')
    .replace(/\b3d\b/gi, '3D');
}

function getImageDimensions(filePath: string): { width: number; height: number } | undefined {
  if (!fs.existsSync(filePath)) return undefined;
  const buf = Buffer.alloc(32);
  const fd = fs.openSync(filePath, 'r');
  try {
    const bytesRead = fs.readSync(fd, buf, 0, 32, 0);
    if (bytesRead < 24) return undefined;

    // PNG signature: 89 50 4E 47 0D 0A 1A 0A
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }

    // WebP signature: RIFF....WEBP
    if (
      bytesRead >= 30 &&
      buf.toString('ascii', 0, 4) === 'RIFF' &&
      buf.toString('ascii', 8, 12) === 'WEBP'
    ) {
      const chunk = buf.toString('ascii', 12, 16);
      if (chunk === 'VP8X') {
        const width = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
        const height = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
        return { width, height };
      }
      if (chunk === 'VP8 ' && buf[23] === 0x9d && buf[24] === 0x01 && buf[25] === 0x2a) {
        return {
          width: buf.readUInt16LE(26) & 0x3fff,
          height: buf.readUInt16LE(28) & 0x3fff,
        };
      }
      if (chunk === 'VP8L' && buf[20] === 0x2f) {
        const bits = buf.readUInt32LE(21);
        return {
          width: (bits & 0x3fff) + 1,
          height: ((bits >> 14) & 0x3fff) + 1,
        };
      }
    }
  } finally {
    fs.closeSync(fd);
  }
  return undefined;
}

function findFirstMatch(
  dir: string,
  publicBase: string,
  baseNames: string[],
  exts: string[]
): { src: string; fullPath: string } | undefined {
  for (const name of baseNames) {
    for (const ext of exts) {
      const fullPath = path.join(dir, `${name}${ext}`);
      if (fs.existsSync(fullPath)) {
        return { src: `${publicBase}/${name}${ext}`, fullPath };
      }
    }
  }
  return undefined;
}

function findFirst(dir: string, publicBase: string, baseNames: string[], exts: string[]): string | undefined {
  return findFirstMatch(dir, publicBase, baseNames, exts)?.src;
}

function listImagesInSubdir(baseDir: string, publicBase: string, subdir: string): MediaItem[] {
  const targetDir = path.join(baseDir, subdir);
  if (!fs.existsSync(targetDir)) return [];

  return fs
    .readdirSync(targetDir)
    .filter((file) => IMAGE_EXTS.includes(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((file) => {
      const dims = getImageDimensions(path.join(targetDir, file));
      return {
        src: `${publicBase}/${subdir}/${file}`,
        label: formatLabel(file),
        width: dims?.width,
        height: dims?.height,
        isLandscape: dims ? dims.width > dims.height : false,
      };
    });
}

function listVideosInSubdir(baseDir: string, publicBase: string, subdir: string): VideoMediaItem[] {
  const targetDir = path.join(baseDir, subdir);
  if (!fs.existsSync(targetDir)) return [];

  return fs
    .readdirSync(targetDir)
    .filter((file) => VIDEO_EXTS.includes(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((file) => {
      const stem = path.basename(file, path.extname(file));
      const posterMatch = findFirstMatch(targetDir, `${publicBase}/${subdir}`, [stem], IMAGE_EXTS);
      const dims = posterMatch ? getImageDimensions(posterMatch.fullPath) : undefined;
      return {
        src: `${publicBase}/${subdir}/${file}`,
        label: formatLabel(file),
        poster: posterMatch?.src,
        width: dims?.width,
        height: dims?.height,
        isLandscape: dims ? dims.width > dims.height : false,
      };
    });
}

/**
 * Automatically discovers drop-in assets under `public/media/<slug>/` at build time:
 * - icon.png / icon-dark.png / icon-tinted.png
 * - background.png / background.jpg
 * - demo.mp4 / demo-poster.webp (single walkthrough, portrait or landscape)
 * - demos/*.mp4 (+ matching *.webp poster for synchronized multi-device walkthroughs)
 * - screen-*.png / 01-*.webp (root screenshots, portrait or landscape)
 * - artworks/*, characters/*, rewards/*
 */
export function getProjectMedia(slug: string): ProjectMedia {
  const mediaDir = path.join(process.cwd(), 'public', 'media', slug);
  const publicBase = `/media/${slug}`;

  if (!fs.existsSync(mediaDir)) {
    return {
      demoVideos: [],
      screenshots: [],
      artworks: [],
      characters: [],
      rewards: [],
      isLandscapeGallery: false,
      hasRealMedia: false,
    };
  }

  const icon = findFirst(mediaDir, publicBase, ['icon', 'app-icon', 'appicon'], IMAGE_EXTS);
  const iconDark = findFirst(mediaDir, publicBase, ['icon-dark', 'app-icon-dark'], IMAGE_EXTS);
  const iconTinted = findFirst(mediaDir, publicBase, ['icon-tinted', 'app-icon-tinted'], IMAGE_EXTS);
  const background = findFirst(mediaDir, publicBase, ['background', 'bg', 'sfondo'], IMAGE_EXTS);
  const demoVideo = findFirst(mediaDir, publicBase, ['demo', 'preview', 'recording'], VIDEO_EXTS);
  const explicitPosterMatch = findFirstMatch(mediaDir, publicBase, ['demo-poster', 'poster', 'cover'], IMAGE_EXTS);

  const files = fs.readdirSync(mediaDir);
  const screenshots: MediaItem[] = files
    .filter((file) => {
      const fullPath = path.join(mediaDir, file);
      if (fs.statSync(fullPath).isDirectory()) return false;
      const ext = path.extname(file).toLowerCase();
      if (!IMAGE_EXTS.includes(ext)) return false;
      const stem = path.basename(file, ext).toLowerCase();
      return !RESERVED_ROOT_STEMS.has(stem);
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((file) => {
      const dims = getImageDimensions(path.join(mediaDir, file));
      return {
        src: `${publicBase}/${file}`,
        label: formatLabel(file),
        width: dims?.width,
        height: dims?.height,
        isLandscape: dims ? dims.width > dims.height : false,
      };
    });

  const artworks = listImagesInSubdir(mediaDir, publicBase, 'artworks');
  const characters = listImagesInSubdir(mediaDir, publicBase, 'characters');
  const rewards = listImagesInSubdir(mediaDir, publicBase, 'rewards');
  const syncedDemos = listVideosInSubdir(mediaDir, publicBase, 'demos');

  const explicitPosterDims = explicitPosterMatch
    ? getImageDimensions(explicitPosterMatch.fullPath)
    : undefined;
  const demoPoster = explicitPosterMatch?.src ?? screenshots[0]?.src;
  const singleDemoIsLandscape = explicitPosterDims
    ? explicitPosterDims.width > explicitPosterDims.height
    : Boolean(screenshots[0]?.isLandscape);
  const singleDemoWidth = explicitPosterDims?.width ?? (singleDemoIsLandscape ? 1138 : 604);
  const singleDemoHeight = explicitPosterDims?.height ?? (singleDemoIsLandscape ? 640 : 1314);

  const demoVideos: VideoMediaItem[] =
    syncedDemos.length > 0
      ? syncedDemos
      : demoVideo
        ? [
            {
              src: demoVideo,
              label: 'App Demo Walkthrough',
              poster: demoPoster,
              width: singleDemoWidth,
              height: singleDemoHeight,
              isLandscape: singleDemoIsLandscape,
            },
          ]
        : [];

  const isLandscapeGallery =
    demoVideos.some((v) => v.isLandscape) || screenshots.some((s) => s.isLandscape);
  const hasRealMedia = Boolean(
    demoVideos.length > 0 || screenshots.length > 0 || artworks.length > 0 || characters.length > 0 || rewards.length > 0
  );

  return {
    icon,
    iconDark,
    iconTinted,
    background,
    demoVideo,
    demoPoster,
    demoVideos,
    screenshots,
    artworks,
    characters,
    rewards,
    isLandscapeGallery,
    hasRealMedia,
  };
}
