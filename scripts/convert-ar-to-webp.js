/**
 * Convert Arabic PNG assets to WebP for mobile LCP optimization.
 * Run once: `node scripts/convert-ar-to-webp.js`
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const targets = [
  // Panel ROAS — hero LCP image (Arabic default)
  { src: 'public/assets/panel-roas-ar.png',   out: 'public/assets/panel-roas-ar.webp',   q: 80, resize: 1280 },
  { src: 'public/assets/panel-roas-2-ar.png', out: 'public/assets/panel-roas-2-ar.webp', q: 80, resize: 1280 },
  // Prova testimonials carousel
  { src: 'public/provas/prova-1-ar.png', out: 'public/provas/prova-1-ar.webp', q: 78, resize: 1280 },
  { src: 'public/provas/prova-2-ar.png', out: 'public/provas/prova-2-ar.webp', q: 78, resize: 1280 },
  { src: 'public/provas/prova-3-ar.png', out: 'public/provas/prova-3-ar.webp', q: 78, resize: 1280 },
  { src: 'public/provas/prova-4-ar.png', out: 'public/provas/prova-4-ar.webp', q: 78, resize: 1280 },
  { src: 'public/provas/prova-5-ar.png', out: 'public/provas/prova-5-ar.webp', q: 78, resize: 1280 },
];

for (const t of targets) {
  const inStat = await fs.stat(t.src).catch(() => null);
  if (!inStat) { console.log(`skip (missing): ${t.src}`); continue; }
  await sharp(t.src)
    .resize({ width: t.resize, withoutEnlargement: true })
    .webp({ quality: t.q, effort: 6 })
    .toFile(t.out);
  const outStat = await fs.stat(t.out);
  const inKb  = Math.round(inStat.size  / 1024);
  const outKb = Math.round(outStat.size / 1024);
  const save  = Math.round((1 - outStat.size / inStat.size) * 100);
  console.log(`${path.basename(t.src)}: ${inKb} kB → ${outKb} kB (-${save}%)`);
}
