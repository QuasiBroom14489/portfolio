import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://zanejohnson.vercel.app',
  trailingSlash: 'never',
  build: { format: 'file' },
});
