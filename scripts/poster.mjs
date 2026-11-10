// Bakes the intro's first frame into public/scene/room.png (640×360) and room-2x.png (1280×720),
// the posters that show while the scene builds. No browser needed: the engine only wants a canvas to put pixels in.
// Run: pnpm poster   (after pnpm scene, whenever the room changes)
import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';

globalThis.matchMedia = () => ({ matches: false });
globalThis.scheduler = { yield: () => Promise.resolve() };
globalThis.document = {
  createElement() {
    const c = { width: 0, height: 0, image: null };
    c.getContext = () => ({
      createImageData: (w, h) => ({ width: w, height: h, data: new Uint8ClampedArray(w * h * 4) }),
      putImageData: img => { c.image = img; },
    });
    return c;
  },
};
const { createScene } = await import('../src/scene/engine.js');

const CRC = Array.from({ length: 256 }, (_, n) => { for (let k = 0; k < 8; k++) n = n & 1 ? 0xedb88320 ^ (n >>> 1) : n >>> 1; return n >>> 0; });
const crc = buf => { let c = 0xffffffff; for (const b of buf) c = CRC[(c ^ b) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function chunk(type, data) {
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0); out.write(type, 4, 'latin1'); data.copy(out, 8);
  out.writeUInt32BE(crc(out.subarray(4, 8 + data.length)), 8 + data.length);
  return out;
}
// 8-bit PNG: a palette when the frame has 256 colors or fewer, RGB otherwise
function png(w, h, rgba) {
  const colors = new Map();
  for (let i = 0; i < rgba.length && colors.size <= 256; i += 4) { const k = (rgba[i] << 16) | (rgba[i + 1] << 8) | rgba[i + 2]; if (!colors.has(k)) colors.set(k, colors.size); }
  const indexed = colors.size <= 256, bpp = indexed ? 1 : 3, raw = Buffer.alloc(h * (1 + w * bpp));
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4, o = y * (1 + w * bpp) + 1 + x * bpp;
    if (indexed) raw[o] = colors.get((rgba[i] << 16) | (rgba[i + 1] << 8) | rgba[i + 2]);
    else { raw[o] = rgba[i]; raw[o + 1] = rgba[i + 1]; raw[o + 2] = rgba[i + 2]; }
  }
  const head = Buffer.alloc(13); head.writeUInt32BE(w, 0); head.writeUInt32BE(h, 4); head[8] = 8; head[9] = indexed ? 3 : 2;
  const parts = [Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', head)];
  if (indexed) parts.push(chunk('PLTE', Buffer.from([...colors.keys()].flatMap(k => [k >> 16, (k >> 8) & 255, k & 255]))));
  parts.push(chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0)));
  return { file: Buffer.concat(parts), colors: indexed ? colors.size : 'more than 256' };
}

for (const [ss, name] of [[1, 'room.png'], [2, 'room-2x.png']]) {
  const s = await createScene(ss);
  s.frameRoom(2);
  const { width, height, data } = s.natW.image, { file, colors } = png(width, height, data);
  writeFileSync(`public/scene/${name}`, file);
  console.log(`public/scene/${name}: ${width}×${height}, ${colors} colors, ${(file.length / 1024).toFixed(0)} KB`);
}
