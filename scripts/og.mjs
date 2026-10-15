// Renders the 1200×630 share cards into public/og/ with headless Chrome.
// Vercel's build image has no Chrome, so run this locally and commit the PNGs.
// Run: pnpm og   (rerun after changing a project's title, one-liner or hero)
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse } from 'yaml';
import { glyphs } from '../src/data/icons.ts';
import { site } from '../src/data/site.ts';
import { capabilities } from '../src/data/capabilities.ts';

const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const url = p => pathToFileURL(resolve(p)).href;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const host = 'zanejohnson.vercel.app';

// same drawing as src/components/Icon.astro
function icon(name, accent, size) {
  const rows = glyphs[name] ?? glyphs.folder;
  const n = parseInt(accent.slice(1), 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  const ink = lum > 0.62 ? '#1b1410' : '#fffaf0', sh = lum > 0.62 ? '#fff' : '#000';
  const px = [];
  rows.forEach((r, y) => [...r].forEach((c, x) => c === 'w' && px.push([x + 2, y + 2])));
  return `<svg width="${size}" height="${size}" viewBox="0 0 16 16" shape-rendering="crispEdges">
    <rect x="0" y="1" width="16" height="14" fill="#1b1410"/><rect x="1" y="0" width="14" height="16" fill="#1b1410"/>
    <rect x="1" y="1" width="14" height="14" fill="${accent}"/>
    <rect x="1" y="1" width="14" height="1" fill="#fff" opacity=".35"/><rect x="1" y="14" width="14" height="1" fill="#000" opacity=".25"/>
    ${px.map(([x, y]) => `<rect x="${x}" y="${y + 1}" width="1" height="1" fill="${sh}" opacity=".35"/>`).join('')}
    ${px.map(([x, y]) => `<rect x="${x}" y="${y}" width="1" height="1" fill="${ink}"/>`).join('')}
  </svg>`;
}

const css = `
@font-face { font-family: Silkscreen; src: url('${url('node_modules/@fontsource/silkscreen/files/silkscreen-latin-400-normal.woff2')}'); }
@font-face { font-family: Figtree; font-weight: 500; src: url('${url('node_modules/@fontsource/figtree/files/figtree-latin-500-normal.woff2')}'); }
@font-face { font-family: Figtree; font-weight: 700; src: url('${url('node_modules/@fontsource/figtree/files/figtree-latin-700-normal.woff2')}'); }
@font-face { font-family: PixelAmp; src: url('${url('node_modules/@fontsource/figtree/files/figtree-latin-700-normal.woff2')}'); unicode-range: U+0026; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body { position: relative; font-family: Figtree, sans-serif; color: #1d1813; background: #15120f; image-rendering: pixelated; }
.bg { position: absolute; image-rendering: pixelated; }
.shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(21,18,15,0) 30%, rgba(21,18,15,.6) 100%); }
.win { position: absolute; background: #f7efdf; border: 4px solid #1b1410; box-shadow: 8px 8px 0 rgba(10,6,2,.5); }
.bar { display: flex; align-items: center; gap: 14px; background: #14234f; color: #ffe27a; padding: 12px 18px; border-bottom: 4px solid #1b1410;
  background-image: repeating-linear-gradient(180deg, rgba(255,255,255,.06) 0 2px, transparent 2px 6px); font: 400 22px/1 PixelAmp, Silkscreen; letter-spacing: .04em; }
.bar .sp { flex: 1; }
.bar .host { color: #c9b99c; font-size: 18px; }
.body { padding: 26px 32px 30px; }
.row { display: flex; align-items: center; gap: 22px; }
h1 { font: 400 58px/1.05 PixelAmp, Silkscreen; letter-spacing: .01em; }
.role { font: 400 22px/1 Silkscreen; color: #5a4c3b; margin-top: 10px; letter-spacing: .04em; }
.one { font: 500 29px/1.32 Figtree; margin-top: 20px; }
.hero { display: flex; flex-direction: column; gap: 8px; margin-top: 22px; padding: 14px 18px; background: #14234f; border: 4px solid #1b1410; }
.hero b { font: 400 36px/1.1 PixelAmp, Silkscreen; color: #ffe27a; }
.hero span { font: 500 22px/1.3 Figtree; color: #f5ebd6; }
.tag { font: 400 18px/1 Silkscreen; padding: 7px 10px 8px; border: 3px solid #1b1410; background: #efe3cb; }
.pill { display: inline-block; margin-top: 22px; font: 400 20px/1 PixelAmp, Silkscreen; padding: 10px 14px; background: #ebbd2a; border: 3px solid #1b1410; }
`;

const tagBg = { Live: '#b8f0c2', Beta: '#f0c8ee', 'Daily use': '#c9d6ff', 'Public repo': '#ffe9a8', Building: '#f5d0a8' };

// the room poster at 2×, cropped to the card; the wallpaper (the view out the window) at 3×
const room = `<img class="bg" src="${url('public/scene/room.png')}" style="width:1280px;height:720px;left:-40px;top:-60px">`;
const view = `<img class="bg" src="${url('public/wallpaper.png')}" style="width:1356px;height:678px;left:-78px;top:-30px">`;
const bar = left => `<div class="bar"><span>${esc(left)}</span><span class="sp"></span><span class="host">${host}</span></div>`;

function page(bg, win) {
  return `<!doctype html><meta charset="utf-8"><style>${css}</style><body>${bg}<div class="shade"></div>${win}</body>`;
}

const cards = {};

cards.home = page(room, `
  <div class="win" style="left:48px;bottom:44px;width:820px">${bar('Zane Johnson')}
    <div class="body">
      <h1>Zane Johnson</h1>
      <p class="one" style="margin-top:14px">${esc(site.headline)}</p>
      <span class="pill">CS @ Notre Dame ’29 · Open to Summer 2027</span>
    </div>
  </div>`);

const simple = (title, line, extra = '') => page(view, `
  <div class="win" style="left:64px;right:64px;bottom:56px">${bar('Zane Johnson')}
    <div class="body"><h1>${esc(title)}</h1><p class="one">${esc(line)}</p>${extra}</div>
  </div>`);

cards.about = simple('About', `${site.headline} ${site.school}, from ${site.hometown}.`, `<span class="pill">${esc(site.availability)}</span>`);
cards.skills = simple('Skills', `${capabilities.length} capabilities, each linked to the exact proof in a real project.`,
  `<span class="pill">${esc(capabilities.slice(0, 2).map(c => c.label).join(' · '))}</span>`);
cards.contact = simple('Contact', `${site.links.email.handle} · LinkedIn · GitHub @${site.links.github.handle}`, `<span class="pill">${esc(site.availability)}</span>`);
cards.resume = simple('Résumé', `${site.name} — ${site.school}.`, `<span class="pill">${esc(site.availability)}</span>`);
cards.list = simple('All projects', 'Every project as a plain list: what it does, the proof, and the stack.');

for (const f of readdirSync('src/content/projects').filter(f => f.endsWith('.md'))) {
  const p = parse(readFileSync(join('src/content/projects', f), 'utf8').split(/^---$/m)[1]);
  cards[f.replace(/\.md$/, '')] = page(view, `
    <div class="win" style="left:56px;right:56px;bottom:48px">${bar('Zane Johnson · Projects')}
      <div class="body">
        <div class="row">${icon(p.icon, p.accent, 84)}
          <div style="flex:1"><h1>${esc(p.title)}</h1><div class="role">${esc(p.role)}</div></div>
          <span class="tag" style="background:${tagBg[p.status] ?? '#efe3cb'}">${esc(p.status)}</span>
        </div>
        <p class="one">${esc(p.oneLiner)}</p>
        <div class="hero"><b>${esc(p.hero.value)}</b><span>${esc(p.hero.label)}</span></div>
      </div>
    </div>`);
}

const tmp = mkdtempSync(join(tmpdir(), 'og-'));
mkdirSync('public/og', { recursive: true });
for (const [name, html] of Object.entries(cards)) {
  const src = join(tmp, `${name}.html`), out = resolve(`public/og/${name}.png`);
  writeFileSync(src, html);
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--allow-file-access-from-files',
    '--window-size=1200,630', '--virtual-time-budget=3000', `--screenshot=${out}`, pathToFileURL(src).href], { stdio: 'ignore' });
  console.log(`public/og/${name}.png`);
}
