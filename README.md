# Mark Liberato — Personal Lab

A personal site built with Next.js 15, React 19, TypeScript and Tailwind CSS 4. It is a lab rather than a brochure: a short introduction, two working experiments you can use, and notes on real project contributions.

## Development

```sh
npm install
npm run dev
npm run lint
npm run build
npm start
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Introduction, motion exhibit, experiments, selected work, about |
| `/lab/motion` | The depth-and-motion experiment with its controls and implementation notes |
| `/lab/data-explorer` | The search-and-state experiment over a real read-only endpoint |
| `/work/[slug]` | One project or contribution record |
| `/api/lab/projects` | Read-only search endpoint backing the search experiment |

`GET /api/lab/projects` accepts `q` (trimmed, 100 characters maximum), `category` (a published category id or `all`), `sort` (`title-asc` or `title-desc`) and `page` (a positive integer). The page size is fixed at three and is not client-supplied. Invalid input returns `400` naming the parameter; a valid page past the end returns an empty result list. Only a fixed summary shape is serialized — the longer authoring notes on each record never leave the server.

## Layout

- `src/data/portfolio.ts` — typed `WorkEntry` and `Experiment` records, profile links, categories and career history. Everything here is publishable.
- `src/lib/work.ts` — filtering, sorting, paging and query validation, shared by the endpoint and the server-rendered pages so they cannot disagree.
- `src/components/DepthMotion.tsx` — the motion exhibit. One component serves both the homepage preview and `/lab/motion`.
- `src/components/SearchExplorer.tsx` — the search experiment.
- `src/app/globals.css` — theme tokens, layout, and the exhibit's transforms.
- `archive/` — previous source kept for reference. Excluded from routing, lint and type checks; not a runnable second application.

## Progressive enhancement

Page content is server rendered. Both experiments ship their interactive UI and their static fallback in the same HTML: a `noscript` rule hides the interactive half and reveals the fallback, so without JavaScript no control is left inert, and with JavaScript nothing swaps after hydration and no layout shift is introduced.

The motion exhibit requests no animation frame while at rest, after pausing, or once a pass has finished. Reduced-motion preferences remove playback and bypass smoothing entirely, and are picked up during use rather than only at load.

Themes follow the operating system until the visitor chooses; only that choice is stored.

## Content boundaries

Project content comes from the supplied vault profile. Unsupported metrics, proficiency percentages and private or internal information are excluded. Samsung work is text-led: no internal interfaces are reconstructed and no screenshots are fabricated. Screenshots of client sites are historical snapshots and the live sites may have changed. The résumé PDF is labelled a previous edition and needs a separate refresh.

Canonical URL, Open Graph URL, robots and sitemap use `profile.site` (`https://markliberato.com`). That configuration neither deploys the site nor verifies domain ownership.

## Validation

Production builds enforce TypeScript and ESLint. Browser verification evidence — screenshots and the interaction-check results — is in `docs/qa/`. See the vault implementation log for what was actually checked, and for what has not been independently reviewed.
