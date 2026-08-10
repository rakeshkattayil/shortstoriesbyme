# Little Storybook

A static React/Vite interactive storybook with keyboard, touch, menu, home, page-turn and Web Audio-based music-toggle interactions.

## Run locally

Use Node 20+ and pnpm:

```bash
pnpm install
pnpm dev
```

## GitHub Pages deployment

The production base path defaults to `/shortstories/`, so this repository builds correctly at `https://rakeshkattayil.github.io/shortstories/`.

```bash
pnpm build
```

Publish the generated `dist/` folder with GitHub Pages (for example via a GitHub Actions Pages workflow). For a custom domain or a differently named repository, set the base before building:

```bash
VITE_BASE=/my-repository/ pnpm build
```

All illustration content is organized in `src/data/stories.js`; replace `src/assets/images/sunrise-journey.png` or add further images without touching the UI components.
