# AGENTS.md — MtgTop8-Nextjs-Front

## Repository purpose
Next.js 16 + React 19 frontend for the MTG Stats website (Magic: The Gathering tournament/league stats). Internationalized (en/es/cat) via next-intl, deployed on Vercel. Consumes the MtgTop8Api FastAPI backend.

## Tech stack
- Framework: Next.js 16 (App Router), React 19
- Language: TypeScript (strict mode, `noImplicitAny: false`, `strictNullChecks: true`)
- i18n: next-intl (locales: en, es, cat; messages in `messages/*.json`)
- HTTP client: axios
- Email: emailjs (@emailjs/browser)
- PDF generation: pdf-lib + downloadjs
- Styling: CSS modules + `globals.css` utility classes
- Package manager: pnpm
- Lint/format: ESLint (eslint-config-next/typescript) + Prettier

## Project layout (front/)
```
front/
├── src/
│   ├── app/              # Next.js App Router pages (layouts, pages, route handlers)
│   ├── components/       # Shared UI components (Header, Footer, List, Forms, Tournament, etc.)
│   ├── hooks/            # Custom React hooks (useApi, useCommon)
│   ├── i18n/             # next-intl locale config
│   ├── types/            # TypeScript schemas (database + website) and server constants
│   └── fakeData/         # Blur/placeholder data for loading states
├── messages/             # i18n messages (en.json, es.json, cat.json)
└── public/
    ├── images/           # Static image assets
    └── pdf/              # PDF templates/assets
```

## Coding rules & conventions

### 1. TypeScript
- `strict: true`, `strictNullChecks: true` in `tsconfig.json`.
- Path alias `@/*` maps to `./src/*`.
- Import types from `src/types/schemas/database/*` and `src/types/schemas/website/*`.
- Declare interfaces for component props (`React.FC<PropsType>`).
- Run `npx tsc --noEmit` before pushing; type errors must be zero.

### 2. Data fetching
- Detail pages (`leagues/[id]`, `tournaments/[id]`) fetch **server-side** in `page.tsx` and pass data as props to the client component. This avoids the double-fetch pattern (server metadata fetch + client `useEffect` refetch).
- Client components accept `initial*` props and use them as initial `useState`; refetch only on client-side navigation (`useParams` changes).
- List pages use `getAxiosEndpoint` (axios) from `src/hooks/useApi.tsx`; `generateMetadata` uses native `fetch` for SEO.
- Pagination: `addUrlPaginationParams(endpoint, numItems, currentPage)`; ID interpolation: `replaceUrlIdParam(endpoint, value)`.

### 3. React keys (critical)
- **Never** use `Math.random()` or `uuidv4()` as React `key`.
- Use stable, deterministic values: `item.id`, `index`, or a static string (e.g. `"prev-button"`, `"blured-league-list"`).
- `uuid` import exists only for potential future use; do not import it for keys.

### 4. Components
- Client components that need browser APIs: add `'use client'` at the top.
- Server components for pages that fetch data (SEO-friendly).
- Loading/blur state: components receive `isBlured` boolean and apply `blink blured` CSS classes; fake data from `src/fakeData/` shown while loading.
- Use `next/link` for internal navigation, `next/image` for images (with `priority` for above-fold).

### 5. Styling
- Base styles in `src/app/globals.css` (CSS custom properties for colors).
- Modern flexbox utilities available: `.flex`, `.flex-col`, `.items-center`, `.justify-between`, `.gap-5/10/15/20`, `.w-full`, `.h-full`.
- Legacy float utilities (`.left`, `.right`) still exist; prefer flexbox for new layouts.
- Component-scoped styles use CSS modules (`*.module.css`).
- Container: max-width, responsive padding, centered.

### 6. Internationalization
- Locales: `en`, `es`, `cat` (defined in `src/types/server/languages.tsx`).
- Messages: `messages/{locale}.json`; namespaces: `home`, `decklist`, `contact`, `not-found`, `seo-tags`, `stats`, `league`, `tournaments`, `errors`, `language`, `alt-tags`, `header`.
- Use `useTranslations('namespace')` in client components; `getTranslations({ locale, namespace })` in server components.
- `src/i18n/request.ts` resolves locale from cookie `locale` or `params.locale`, default `en`.

### 7. Forms
- Contact form: emailjs with env vars `NEXT_PUBLIC_MAIL_SERVICE_ID`, `NEXT_PUBLIC_MAIL_TEMPLATE`, `NEXT_PUBLIC_MAIL_PUBLIC_ID`. Public key is exposed to the browser — treat as non-secret.
- Decklist form: generates a PDF via pdf-lib from a template at `NEXT_PUBLIC_DECKLIST_PDF_URL` (default `/pdf/decklist.pdf`). Validate card input with regex `/^(\d+)\s+(.+)$/`; sideboard max 15 cards.

### 8. SEO / metadata
- Every page exports `generateMetadata` using `getTranslations` and `seo_tags()` helper.
- `baseUrl` from `src/types/server/baseUrl.tsx` (`NEXT_PUBLIC_BASE_WEBSITE_URL` env, default `https://mtg-stats.vercel.app`).
- `sitemap.ts` and `robots.ts` fetch from the API at build time — ensure API is reachable during builds.
- OG image generated at `api/og/route.tsx` via `next/og` (`ImageResponse`).

### 9. Environment
Required env vars (`.env_example` template):
- `NEXT_PUBLIC_API_URL` (backend base URL)
- `NEXT_PUBLIC_BASE_WEBSITE_URL`
- `NEXT_PUBLIC_MAIL_SERVICE_ID`, `NEXT_PUBLIC_MAIL_TEMPLATE`, `NEXT_PUBLIC_MAIL_PUBLIC_ID`
- `NEXT_PUBLIC_DECKLIST_PDF_URL` (optional)
`.env` is gitignored — never commit secrets.

### 10. Scripts
- `pnpm dev` — dev server (`next dev`)
- `pnpm build` — production build (`next build`)
- `pnpm start` — production server (`next start`)
- `pnpm lint` — ESLint + Prettier check (`eslint src && prettier src --check`)
- `pnpm test` — stub (`echo 'No tests yet'`); add tests when modifying behavior.

### 11. Deployment
- Vercel; `next.config.ts` wraps config with `createNextIntlPlugin()`.
- `devIndicators: false` to disable Next.js dev overlays.

## Pull request rules
- Create a new branch per improvement/fix.
- Open a PR against `main`; do not merge — wait for review.
- Keep PRs small and single-purpose.
- Ensure `tsc --noEmit` and `pnpm lint` pass before requesting review.