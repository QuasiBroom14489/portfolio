// Screens that get the scene at two samples per pixel (1280×720): wide and sharp, or very wide.
// intro.ts picks the renderer with it and index.astro picks the matching poster.
export const HIRES = '(min-width: 1200px) and (min-resolution: 2dppx), (min-width: 1200px) and (-webkit-min-device-pixel-ratio: 2), (min-width: 2400px)';
