
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

- Single Next.js 16.4.3 App Router app (not a monorepo). Real code lives in `src/`; `src/app/` is the router. Components are organized by feature folder, not flat: `src/components/home/` (`navbar`, `banner`, `features`, `testimonials` — the one `"use client"` slider — `cta`), `src/components/Footer/` (`footer`, `newsletter-form`), `src/components/destination/` (`destination-form`, `EditDestinationDialog`, `DeleteDestination`).
- Existing routes: `/`, `/destinations` (server-fetches card data), `/destinations/[id]` (detail page + edit/delete dialogs), `/add-destination` (`destination-form`, `"use client"`), `/sign-up` (Better Auth sign-up form calling `signUp.email`; links "Sign In" to the still-missing `/login`), `/api/auth/[...all]` (Better Auth handler). Still placeholders: `/my-bookings`, `/profile`, `/login`. **Navbar links to `/signup` but the actual route dir is `/sign-up`** — the link is currently dead; don't "fix" one side without the other.
- `public/assets/` holds the design's real crops — Banner, CTA, person portraits, feature icons, the Wanderlast wordmarks (`Wanderlast.png` teal for light bg, `Wanderlast-1.png` white for dark bg) and `destinations/image1–6.png` card images. Check there before reaching for remote image URLs; testimonials' extra slides still use pravatar placeholders. `next.config.ts` whitelists only `images.unsplash.com` for next/image remote patterns — other hosts need an entry there.
- Path alias `@/*` → `./src/*` (tsconfig + `components.json`).
- No test runner, no CI, no Prettier/editorconfig. Formatting is intentionally mixed (newer files are semicolon-free, others aren't) — don't mass-reformat.

## Architecture: separate backend API

**Writes and reads for destinations go through a separate backend on `http://localhost:8000` — hardcoded, not env-configurable, and NOT in this repo.** It must be run separately or the pages below throw at runtime (the production build still passes because PPR only prerenders the static shell). Endpoints in use:

- `GET /destinations` — list, rendered by `src/app/destinations/page.tsx`
- `GET /destination/:id` — detail, rendered by `src/app/destinations/[id]/page.tsx`
- `PATCH /destination/:id` — update from `EditDestinationDialog`
- `DELETE /destination/:id` — delete from `DeleteDestination`
- `POST /add-destination` — create from `destination-form`

The shape is the root `types.ts` `Destination` interface (`_id`, `destinationName`, `country`, `category`, `price`, `duration`, `departureDate`, `imageUrl`, `description`) — keep it in sync when changing fields on either side. The detail page's "Book Now" button is still a no-op until a booking endpoint exists.

## Auth (Better Auth + MongoDB)

- Server config: `src/lib/auth.ts` — `betterAuth` + `mongodbAdapter`, database name hardcoded as `wanderlast`, `emailAndPassword.enabled`. Route handler `src/app/api/auth/[...all]/route.js` (plain `.js`, not `.ts`) exports the handlers via `toNextJsHandler`.
- Client: `src/lib/auth-client.ts` exports `signIn` / `signUp` / `useSession` — reuse those. Note it constructs `createAuthClient()` a second time (the earlier one with `baseURL` is discarded), so all exported helpers run baseURL-less.
- Requires a `.env` with `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI` plus a running MongoDB for auth to work at runtime. `.env*` is gitignored, so a fresh clone has no `.env` — create it manually; don't commit real secrets.

## Commands (verified)

- `npm run dev` — Turbopack dev server.
- `npm run build` — passes today (`next build` also type-checks) without the backend or MongoDB running.
- `npx tsc --noEmit` — there is **no** `typecheck` script; this passes today.
- `npm run lint` — runs `eslint` on the repo root (flat config, `eslint-config-next`). **Currently fails with 2 pre-existing errors** in shadcn-generated files (`src/components/ui/carousel.tsx`, `src/hooks/use-mobile.ts`, `react-hooks/set-state-in-effect`) plus 1 expected warning in `EditDestinationDialog.tsx`. It exits nonzero — verify your diff against the baseline, not against zero problems.
- No `npm test` — verification is lint + `tsc --noEmit` + `build`.

## Next.js 16 specifics

- `next.config.ts` enables `cacheComponents: true` + `partialPrefetching: true`: fetching is dynamic by default, opt into caching with `"use cache"` / `cacheLife` / `cacheTag`; PPR is always on. `params` and `searchParams` are **Promises** — await them.
- Page/layout props use the global (no-import) helpers `PageProps<'/route'>` / `LayoutProps<'/route'>`.
- `reactCompiler: true` (babel-plugin-react-compiler): components must be render-pure — no mutating props/state/refs during render.
- Version-matched docs ship with the install at `node_modules/next/dist/docs/` (mirrors nextjs.org/docs). Prefer them over training data.
- The root layout wraps `<Navbar />` in `<Suspense>` because it reads `usePathname()` — under `cacheComponents`, a Client Component using runtime URL data must stream in via Suspense or dynamic-segment routes fail to prerender. Follow that pattern for new layout-level client components that use runtime data.

## UI stack (shadcn "base-nova")

- Primitives are `@base-ui/react`, **not Radix** — don't assume `@radix-ui/react-*` imports. Icons are lucide.
- `src/components/ui/`, plus `src/lib/`, `src/hooks/` and `components.json`, are shadcn-generated — add new primitives with `npx shadcn add <component>` instead of writing them from scratch, and expect your edits to `src/components/ui/*` to be lost on the next `shadcn add`.
- `src/lib/highlighter.tsx` is a shared shiki core highlighter with a fixed language map; supporting a new language means adding an entry there.
- `cn` comes from the `cn` npm package (`src/lib/utils.ts` just re-exports it), not clsx + tailwind-merge.

## Tailwind 4 (CSS-first)

- No `tailwind.config.*` and no PostCSS config — don't add them. Styling lives in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline` tokens, `@custom-variant dark`); CSS is loaded via the `@tailwindcss/turbopack` rule in `next.config.ts`.
- Dark mode is the `dark` **class** variant, but no theme provider is installed — `.dark` must be toggled on an ancestor manually.
