// Scroll drives the scene: 0 room → 1 desk → 2 laptop open → 3 screen fills the
// view, then the canvas fades and the HTML desktop underneath takes over.
import { createScene } from './engine.js';

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const smooth = (x: number) => { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };
const SCREEN_ZOOM = 4.27; // close-up screen rect x 245–395 fills the frame

export function startIntro(root: HTMLElement) {
  const html = document.documentElement;
  const stage = root.querySelector('.stage') as HTMLElement;
  const view = root.querySelector('canvas') as HTMLCanvasElement;
  const ctx = view.getContext('2d')!;
  const caption = root.querySelector('.cap') as HTMLElement;
  const hint = root.querySelector('.hint') as HTMLElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const s = createScene();
  const { natW, natD, RW, RH, W, H, ZW, CWX, CWY } = s;

  function layout() {
    const vw = innerWidth, vh = innerHeight, dpr = Math.min(devicePixelRatio || 1, 2);
    const cover = vw / vh >= 1.25;
    // portrait: fill ~58% of the height and crop the sides around the window and desk
    const f = cover ? Math.max(vw / RW, vh / RH) : Math.max(vw / RW, (vh * 0.58) / RH);
    // whole-pixel scaling when it costs little crop; otherwise exact (uneven pixels are invisible at that size)
    const k = Math.ceil(f * dpr) / (f * dpr) <= 1.08 ? Math.ceil(f * dpr) : f * dpr;
    view.width = Math.round(RW * k); view.height = Math.round(RH * k);
    view.style.width = `${(RW * k) / dpr}px`; view.style.height = `${(RH * k) / dpr}px`;
    stage.classList.toggle('contain', !cover);
    // when the sides are cropped, stop the last zoom where the laptop screen still fits the width
    zoomEnd = Math.max(2, Math.min(SCREEN_ZOOM, SCREEN_ZOOM * vw / ((RW * k) / dpr)));
    dirty = true;
  }

  const progress = () => {
    const span = root.offsetHeight - innerHeight;
    return span > 0 ? clamp(-root.getBoundingClientRect().top / span, 0, 1) * 3 : 0;
  };

  let sp = progress(), lastTick = -1, dirty = true, running = false, zoomEnd = SCREEN_ZOOM;

  function drawDesk(z: number, lid: number) {
    // snap to whole device pixels per scene pixel so no rows or columns drop mid-zoom
    const k = view.width / W;
    if (z > 1) z = Math.max(1, Math.round(z * k) / k);
    const sw = W / z, sh = H / z, fx = 320, fy = 254 - lid * 50;
    ctx.drawImage(natD, clamp(fx - sw / 2, 0, W - sw), clamp(fy - sh / 2, 0, H - sh), sw, sh, 0, 0, view.width, view.height);
  }

  function present() {
    ctx.imageSmoothingEnabled = false;
    ctx.globalAlpha = 1;
    if (sp < 1) {
      const e = ease(clamp(sp, 0, 1)), z = 1 + (ZW - 1) * e;
      const cx = 320 + (CWX - 320) * e, cy = 180 + (CWY - 180) * e, sw = RW / z, sh = RH / z;
      ctx.drawImage(natW, clamp(cx - sw / 2, 0, RW - sw), clamp(cy - sh / 2, 0, RH - sh), sw, sh, 0, 0, view.width, view.height);
      const a = smooth((sp - 0.55) / 0.45);
      if (a > 0) { ctx.globalAlpha = a; drawDesk(1, 0); ctx.globalAlpha = 1; }
    } else if (sp < 2) {
      drawDesk(1 + ease(sp - 1), smooth((sp - 1.15) / 0.7));
    } else {
      drawDesk(2 + (zoomEnd - 2) * ease(clamp(sp - 2, 0, 1)), 1);
    }
  }

  function apply() {
    const fade = smooth((sp - 2.7) / 0.28);
    stage.style.opacity = String(1 - fade);
    stage.style.visibility = fade >= 1 ? 'hidden' : '';
    caption.style.opacity = String(1 - smooth((sp - 0.15) / 0.35));
    hint.style.opacity = String(1 - smooth(sp / 0.12));
    html.classList.toggle('intro-done', sp > 2.9);
  }

  function frame(now: number) {
    const target = progress();
    const next = reduce ? target : sp + (target - sp) * 0.18;
    const moved = Math.abs(next - sp) > 1e-4;
    sp = Math.abs(target - next) < 0.002 ? target : next;
    const tick = reduce ? 0 : Math.floor(now / 83); // 12 fps scene animation
    const visible = sp < 2.99;
    if (visible && (tick !== lastTick || moved || dirty)) {
      if (sp < 1) s.frameRoom(now / 1000);
      if (sp > 0.5) { s.setLid(sp < 2 ? smooth((sp - 1.15) / 0.7) : 1); s.frameDesk(now / 1000); }
      present();
      if (lastTick < 0) root.classList.add('ready');
      lastTick = tick; dirty = false;
    }
    apply();
    if (visible || moved) requestAnimationFrame(frame); else running = false;
  }
  const wake = () => { if (!running) { running = true; requestAnimationFrame(frame); } };

  new ResizeObserver(layout).observe(document.documentElement);
  addEventListener('scroll', wake, { passive: true });
  addEventListener('resize', wake);
  layout();
  wake();
}
