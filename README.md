# portfolio

Zane Johnson's portfolio. A pixel-art scene of his St. Edward's Hall room pushes in to the laptop, and the laptop's desktop is the portfolio: every project is a window with its own URL.

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static site in dist/
```

- `src/content/projects/*.md`: one file per project (typed in `src/content.config.ts`). Every number was verified against the project's own repo or data.
- `src/data/site.ts`: name, headline, links, experience. `src/data/capabilities.ts`: the skills matrix.
- `src/scripts/wm.ts`: opens pages as windows over the desktop. Without JS every link is a normal page.
- `public/ZaneJohnson_Resume.pdf`: the résumé. Replace this file to update it.
- `design/style-test.html`: where the pixel scene is authored. After editing it, run `pnpm scene` to regenerate `src/scene/engine.js`. `src/scene/intro.ts` drives the scene from scroll on the home page.
