
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

- Single Next.js 16.4.3 App Router app (not a monorepo). Real code lives in `src/`; `src/app/` is the router. Components are organized by feature folder, not flat: `src/components/home/` (`navbar`, `banner`, `features`, `testimonials` — the one `"use client"` slider — `cta`), `src/components/Footer/` (`footer`, `newsletter-form`), `src/components/destination/` (`destination-form`, `EditDestinationDialog`, `DeleteDestination`), `src/components/Booking/` (`BookingCard`, `MyBookingCard`, `BookingStatusBadge`).
- Routes: `/`, `/destinations` (server-fetches card data), `/destinations/[id]` (detail + edit/delete dialogs + `BookingCard`), `/add-destination` (`destination-form`, `"use client"`), `/login` & `/sign-up` (Better Auth client forms), `/api/auth/[...all]` (Better Auth handler), `/my-bookings` (server component: session via `auth.api.getSession` + fetch per signed-in email). **`/profile` (navbar) and `/forgot-password` (login page) are linked but have no route dirs yet** — don't "fix" one side without the other.
- `public/assets/` holds the design's real crops — Banner, CTA, person portraits, feature icons, the Wanderlast wordmarks (`Wanderlast.png` teal for light bg, `Wanderlast-1.png` white for dark bg) and `destinations/image1–6.png` card images. Check there before reaching for remote image URLs; testimonials' extra slides still use pravatar placeholders. `next.config.ts` whitelists only `images.unsplash.com` for next/image remote patterns — other hosts need an entry there.
- Path alias `@/*` → `./src/*` (tsconfig + `components.json`).
- No test runner, no CI, no Prettier/editorconfig. Formatting is intentionally mixed (newer files are semicolon-free, others aren't) — don't mass-reformat.

## Auth guard: src/proxy.ts

- `proxy.ts` is Next.js 16's middleware replacement (build output lists it as "Proxy (Middleware)"). It checks the Better Auth session and redirects unauthenticated users to `/login`. Matcher: `/my-bookings`, `/destinations/:path`, `/add-destination`.
- It runs the full server `auth` config, so requests through guarded routes need MongoDB + env vars up, not just the Next server.

## Architecture: separate backend API

**All destination/booking data flows through a separate backend on `http://localhost:8000` — hardcoded, not env-configurable, and NOT in this repo.** It must be run separately or dynamic pages throw at runtime (the production build still passes because PPR only prerenders the static shell). Endpoints in use:

- `GET /destinations` — list → `src/app/destinations/page.tsx` (no auth header)
- `GET /destination/:id` — detail → `src/app/destinations/[id]/page.tsx` (sends `Authorization: Bearer <JWT>` from `getTokenFromServer()`)
- `PATCH /destination/:id` / `DELETE /destination/:id` — from `EditDestinationDialog` / `DeleteDestination`
- `POST /add-destination` — create, sends JWT from `GetTokenFromClient()`
- Booking: `POST /booking` (from `BookingCard`), `GET /my-booking/:email` (my-bookings page), `DELETE /my-booking/:id` (`MyBookingCard`); these send no auth header.

The root `types.ts` `Destination` and `Booking` interfaces are the payload contracts — keep them in sync when changing fields on either side.

## Auth (Better Auth + MongoDB + JWT)

- Server: `src/lib/auth.ts` — `betterAuth` + `mongodbAdapter`, database name hardcoded `wanderlast`, `emailAndPassword.enabled`, plus the `jwt()` plugin and session cookieCache (JWT strategy, 7-day maxAge).
- JWT helpers: `src/lib/GetTokenFromServer.tsx` (`auth.api.getToken`, needs the request's `headers()`) and `src/lib/GetTokenFromClient.tsx` (`authClient.token()`). Use these for backend calls instead of minting your own.
- Client: `src/lib/auth-client.ts` exports `authClient` (with `baseURL` + `jwtClient`) **and separately** `signIn` / `signUp` / `signOut` / `useSession`. Quirk: those helpers come from a second `createAuthClient()` call without `baseURL` — the login page and navbar use the baseURL-less ones.
- Requires a `.env` with `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI` plus a running MongoDB for auth to work at runtime. `.env*` is gitignored, so a fresh clone has no `.env` — create it manually; don't commit real secrets.

## Commands (verified)

- `npm run dev` — Turbopack dev server.
- `npm run build` — passes today (`next build` also type-checks) without the backend or MongoDB running.
- `npx tsc --noEmit` — there is **no** `typecheck` script; this passes today.
- `npm run lint` — flat config (`eslint-config-next`), repo root. **Currently exits nonzero with 2 pre-existing errors** in shadcn-generated files (`src/components/ui/carousel.tsx`, `src/hooks/use-mobile.ts`, rule `react-hooks/set-state-in-effect`) plus 2 expected warnings (`EditDestinationDialog.tsx` unused `_id`, `destination-form.tsx` unused `authClient`). Verify your diff against this baseline, not against zero problems.
- No `npm test` — verification is lint + `tsc --noEmit` + `build`.

## Next.js 16 specifics

- `next.config.ts` enables `cacheComponents: true` + `partialPrefetching: true`: fetching is dynamic by default, opt into caching with `"use cache"` / `cacheLife` / `cacheTag`; PPR is always on. `params` and `searchParams` are **Promises** — await them.
- Page/layout props use the global (no-import) helpers `PageProps<'/route'>` / `LayoutProps<'/route'>` — see the detail page.
- `reactCompiler: true` (babel-plugin-react-compiler): components must be render-pure — no mutating props/state/refs during render.
- Under `cacheComponents`, any Client Component using runtime URL data (e.g. `usePathname`) or any dynamic fetch inside a static route must stream in via `<Suspense>` — the root layout wraps `<Navbar />` this way, and the destinations / detail / my-bookings pages wrap their data sections. Follow that pattern for new pages that fetch.
- Version-matched docs ship with the install at `node_modules/next/dist/docs/` (mirrors nextjs.org/docs). Prefer them over training data.

## UI stack (shadcn "base-nova")

- Primitives are `@base-ui/react`, **not Radix** — don't assume `@radix-ui/react-*` imports (e.g. `DialogTrigger`/`AlertDialogTrigger` take `render={...}` props). Icons are lucide.
- `src/components/ui/`, plus `src/lib/`, `src/hooks/` and `components.json`, are shadcn-generated — add new primitives with `npx shadcn add <component>` instead of writing them from scratch, and expect edits to `src/components/ui/*` to be lost on the next `shadcn add`.
- `<Toaster />` (sonner) is mounted in the root layout — use `sonner` for toasts.
- `src/lib/highlighter.tsx` is a shared shiki core highlighter with a fixed language map; supporting a new language means adding an entry there.
- `cn` comes from the `cn` npm package (`src/lib/utils.ts` just re-exports it), not clsx + tailwind-merge.

## Tailwind 4 (CSS-first)

- No `tailwind.config.*` and no PostCSS config — don't add them. Styling lives in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline` tokens, `@custom-variant dark`); CSS is loaded via the `@tailwindcss/turbopack` rule in `next.config.ts`.
- Dark mode is the `dark` **class** variant, but no theme provider is installed — `.dark` must be toggled on an ancestor manually.
