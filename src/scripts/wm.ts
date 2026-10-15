// Progressive enhancement: links marked data-open load their page and show its
// window over the desktop. Without JS every link is a normal page.
const layer = document.getElementById('layer') as HTMLDivElement;
const home = location.pathname === '/' ? '/' : null;
let opener: HTMLElement | null = null;
const cache = new Map<string, { html: string; title: string }>();

async function load(href: string) {
  if (!cache.has(href)) {
    const res = await fetch(href);
    if (!res.ok) throw new Error(String(res.status));
    const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
    const win = doc.querySelector('main .win');
    if (!win) throw new Error('no window');
    cache.set(href, { html: win.outerHTML, title: doc.title });
  }
  return cache.get(href)!;
}

async function open(href: string, push: boolean) {
  let html: string, pageTitle: string;
  try { ({ html, title: pageTitle } = await load(href)); } catch { location.href = href; return; }
  layer.innerHTML = `<div class="scrim" data-close></div><div class="frame" role="dialog" aria-modal="true">${html}</div>`;
  const frame = layer.querySelector('.frame') as HTMLElement;
  const title = frame.querySelector('h1');
  if (title) { title.id ||= 'dlg-title'; frame.setAttribute('aria-labelledby', title.id); }
  layer.hidden = false;
  document.body.classList.add('modal');
  if (push) history.pushState({ win: href }, '', href);
  document.title = pageTitle;
  (frame.querySelector('[data-close]') as HTMLElement | null)?.focus();
  frame.scrollTop = 0;
}

function close(fromPop = false) {
  if (layer.hidden) return;
  layer.hidden = true;
  layer.innerHTML = '';
  document.body.classList.remove('modal');
  document.title = 'Zane Johnson — AI systems & data';
  if (!fromPop && home) history.pushState({}, '', home);
  opener?.focus();
}

document.addEventListener('click', e => {
  const a = (e.target as HTMLElement).closest('a, [data-close]') as HTMLElement | null;
  if (!a || e.defaultPrevented || e instanceof MouseEvent && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0)) return;
  if (a.hasAttribute('data-close') && !layer.hidden && layer.contains(a)) { e.preventDefault(); close(); return; }
  const href = a.getAttribute('href') ?? '';
  const internal = href.startsWith('/') && !href.startsWith('//') && !href.includes('#') && !href.endsWith('.pdf');
  const winLink = a.hasAttribute('data-open') || (!layer.hidden && layer.contains(a) && /^\/(projects\/|skills|about|resume|contact)/.test(href));
  if (internal && winLink) { e.preventDefault(); if (layer.hidden) opener = a; open(href, true); }
  else if (!layer.hidden && layer.contains(a) && href.startsWith('/skills#')) { e.preventDefault(); open('/skills', true).then(() => layer.querySelector(href.slice(7))?.scrollIntoView()); }
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
addEventListener('popstate', () => {
  const p = location.pathname;
  if (p === '/' || p === '') close(true); else open(p, false);
});
