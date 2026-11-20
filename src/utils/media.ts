import fs from 'node:fs';
import path from 'node:path';

export interface MediaItem {
  src: string;
  label: string;
}

export interface ProjectMedia {
  icon?: string;
  iconDark?: string;
  iconTinted?: string;
  background?: string;
  demoVideo?: string;
  demoPoster?: string;
  screenshots: MediaItem[];
  artworks: MediaItem[];
  characters: MediaItem[];
  rewards: MediaItem[];
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
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

function findFirst(dir: string, publicBase: string, baseNames: string[], exts: string[]): string | undefined {
  for (const name of baseNames) {
    for (const ext of exts) {
      const fullPath = path.join(dir, `${name}${ext}`);
      if (fs.existsSync(fullPath)) {
        return `${publicBase}/${name}${ext}`;
      }
    }
  }
  return undefined;
}

function listImagesInSubdir(baseDir: string, publicBase: string, subdir: string): MediaItem[] {
  const targetDir = path.join(baseDir, subdir);
  if (!fs.existsSync(targetDir)) return [];

  return fs
    .readdirSync(targetDir)
    .filter((file) => IMAGE_EXTS.includes(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((file) => ({
      src: `${publicBase}/${subdir}/${file}`,
      label: formatLabel(file),
    }));
}

/**
 * Automatically discovers drop-in assets under `public/media/<slug>/` at build time:
 * - icon.png / icon-dark.png / icon-tinted.png
 * - background.png / background.jpg
 * - demo.mp4 / demo-poster.png
 * - screen-*.png (root screenshots)
 * - artworks/*, characters/*, rewards/*
 */
export function getProjectMedia(slug: string): ProjectMedia {
  const mediaDir = path.join(process.cwd(), 'public', 'media', slug);
  const publicBase = `/media/${slug}`;

  if (!fs.existsSync(mediaDir)) {
    return {
      screenshots: [],
      artworks: [],
      characters: [],
      rewards: [],
      hasRealMedia: false,
    };
  }

  const icon = findFirst(mediaDir, publicBase, ['icon', 'app-icon', 'appicon'], IMAGE_EXTS);
  const iconDark = findFirst(mediaDir, publicBase, ['icon-dark', 'app-icon-dark'], IMAGE_EXTS);
  const iconTinted = findFirst(mediaDir, publicBase, ['icon-tinted', 'app-icon-tinted'], IMAGE_EXTS);
  const background = findFirst(mediaDir, publicBase, ['background', 'bg', 'sfondo'], IMAGE_EXTS);
  const demoVideo = findFirst(mediaDir, publicBase, ['demo', 'preview', 'recording'], VIDEO_EXTS);
  const explicitPoster = findFirst(mediaDir, publicBase, ['demo-poster', 'poster', 'cover'], IMAGE_EXTS);

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
    .map((file) => ({
      src: `${publicBase}/${file}`,
      label: formatLabel(file),
    }));

  const artworks = listImagesInSubdir(mediaDir, publicBase, 'artworks');
  const characters = listImagesInSubdir(mediaDir, publicBase, 'characters');
  const rewards = listImagesInSubdir(mediaDir, publicBase, 'rewards');

  const demoPoster = explicitPoster ?? screenshots[0]?.src;
  const hasRealMedia = Boolean(
    demoVideo || screenshots.length > 0 || artworks.length > 0 || characters.length > 0 || rewards.length > 0
  );

  return {
    icon,
    iconDark,
    iconTinted,
    background,
    demoVideo,
    demoPoster,
    screenshots,
    artworks,
    characters,
    rewards,
    hasRealMedia,
  };
}
