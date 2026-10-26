
<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!--
  The block above is managed by `next dev`; it only rewrites text between the
  markers. All other content in this file is yours — edit outside the markers.
-->

## Repo shape

- Single Next.js 16.4.3 App Router app (not a monorepo). Real code lives in `src/`; `src/app/` is the router. Existing routes: `/` (composes server components from `src/components/` — `navbar`, `banner`, `features`, `testimonials` (its `"use client"` slider), `cta`, `footer`; `newsletter-form` is its own `"use client"` piece), `/add-destination` (renders `destination-form`, `"use client"`; submit is a no-op TODO until an API exists) and `/destinations` (static server-component card grid fed by `public/assets/destinations/image1–6.png`; BOOK NOW links point at `#` until a booking route/API exists). Navbar links (`/my-bookings`, `/admin`, `/profile`, `/login`, `/signup`) are still placeholders; those routes don't exist yet.
- `public/assets/` holds the design's real crops — Banner, CTA, person1/person2 testimonial portraits, ShieldCheck/MapTrifold/Headset feature icons, the Wanderlast wordmarks (`Wanderlast.png` teal for light bg, `Wanderlast-1.png` white for dark bg) and `destinations/image1–6.png` card images. Check there before reaching for remote image URLs; only testimonials' extra slides still use pravatar placeholders.
- Path alias `@/*` → `./src/*` (tsconfig + `components.json`).
- No test runner, no CI, no Prettier/editorconfig. ESLint is the only linter; generated shadcn files are semicolon-free, so formatting is intentionally mixed — don't mass-reformat.

## Commands (verified)

- `npm run dev` — Turbopack dev server.
- `npm run build` — passes today (`next build` also type-checks).
- `npx tsc --noEmit` — there is **no** `typecheck` script; this passes today.
- `npm run lint` — runs `eslint` on the repo root (flat config, `eslint-config-next`). **Currently fails with 2 pre-existing errors** in shadcn-generated files: `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts` (`react-hooks/set-state-in-effect`). Don't mistake them for regressions from your change; fixing generated files means the fix is lost on the next `shadcn add`.
- No `npm test` — verification is lint + `tsc --noEmit` + `build`.

## Next.js 16 specifics

- `next.config.ts` enables `cacheComponents: true` + `partialPrefetching: true`: fetching is dynamic by default, opt into caching with `"use cache"` / `cacheLife` / `cacheTag`; PPR is always on. `params` and `searchParams` are **Promises** — await them.
- Page/layout props use the global (no-import) helpers `PageProps<'/route'>` / `LayoutProps<'/route'>`.
- `reactCompiler: true` (babel-plugin-react-compiler): components must be render-pure — no mutating props/state/refs during render.
- Version-matched docs ship with the install at `node_modules/next/dist/docs/` (mirrors nextjs.org/docs). Prefer them over training data.

## UI stack (shadcn "base-nova")

- Primitives are `@base-ui/react`, **not Radix** — don't assume `@radix-ui/react-*` imports. Icons are lucide.
- `src/components/ui/` (63 files), plus `src/lib/`, `src/hooks/` and `components.json`, are shadcn-generated and currently **untracked in git — commit them**. So are the hand-written app components `src/components/*.tsx`, `public/assets/`, the newer app files (`src/app/add-destination/`, `src/app/destinations/`, `src/components/destination-form.tsx`) and the root `types.ts` (`Destination` interface — the shared data shape for future API/booking work). Add new primitives with `npx shadcn add <component>` instead of writing them from scratch.
- `cn` comes from the `cn` npm package (`src/lib/utils.ts` just re-exports it), not clsx + tailwind-merge.
- `src/lib/highlighter.tsx` is a shared shiki core highlighter with a fixed language map; supporting a new language means adding an entry there.

## Tailwind 4 (CSS-first)

- No `tailwind.config.*` and no PostCSS config — don't add them. Styling lives in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline` tokens, `@custom-variant dark`); CSS is loaded via the `@tailwindcss/turbopack` rule in `next.config.ts`.
- Dark mode is the `dark` **class** variant, but no theme provider is installed — `.dark` must be toggled on an ancestor manually.
