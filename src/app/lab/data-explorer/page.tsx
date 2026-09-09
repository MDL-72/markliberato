import type { Metadata } from 'next';
import Link from 'next/link';
import SearchExplorer from '@/components/SearchExplorer';
import { publishedWork, toSummary } from '@/lib/work';

export const metadata: Metadata = {
    title: 'Search and state',
    description:
        'A search and filter interface over this site’s published work records, talking to a real read-only Next.js route handler.',
    alternates: { canonical: '/lab/data-explorer' },
};

export default function DataExplorer() {
    return (
        <main id="main" tabIndex={-1} className="shell page">
            <p className="mono breadcrumb">
                <Link href="/#lab">Lab</Link> / Search and state
            </p>
            <h1>Search and state</h1>
            <p className="lede">
                Search, filter, sort and page through this site’s own published work records. The requests are real; the
                slow and failing modes are simulated in the browser and say so.
            </p>

            <SearchExplorer fallback={publishedWork.map(toSummary)} />

            <section className="notes" aria-labelledby="notes-title">
                <h2 id="notes-title">How it works</h2>

                <h3>The endpoint</h3>
                <p>
                    Searches call <span className="mono">GET /api/lab/projects</span>, a read-only Next.js route
                    handler over the same published records this site renders. There is no database, no authentication
                    and no API key, and nothing about a visitor is stored.
                </p>
                <dl className="param-list">
                    <div>
                        <dt className="mono">q</dt>
                        <dd>Trimmed text, 100 characters maximum. Matched against title, summary, role and technologies.</dd>
                    </div>
                    <div>
                        <dt className="mono">category</dt>
                        <dd>
                            One of the published category values, or <span className="mono">all</span>.
                        </dd>
                    </div>
                    <div>
                        <dt className="mono">sort</dt>
                        <dd>
                            <span className="mono">title-asc</span> or <span className="mono">title-desc</span>.
                        </dd>
                    </div>
                    <div>
                        <dt className="mono">page</dt>
                        <dd>A positive integer. The page size is fixed at three and is not client-supplied.</dd>
                    </div>
                </dl>
                <p>
                    The response carries the matching result summaries, the total count, the current page and the total
                    page count. Validation rejects rather than silently corrects: anything outside that contract returns
                    a <span className="mono">400</span> naming the offending parameter. A valid page number past the end
                    of the results is not an error, and returns an empty result list.
                </p>
                <p>
                    Only a fixed summary shape leaves the server — slug, title, category, summary, role, period,
                    technologies and the entry’s own path. The longer authoring notes on each record are never
                    serialized into a response.
                </p>

                <h3>Request handling in the browser</h3>
                <p>
                    Typing is debounced by 250 milliseconds, so a search phrase costs one request rather than one per
                    keystroke. Each new request aborts the previous one through an{' '}
                    <span className="mono">AbortController</span>, and also gets a sequence number: when a response
                    arrives, it is discarded unless its number is still the newest. Aborting alone is not enough,
                    because a response can already be in flight when the abort lands — the sequence check is what
                    guarantees a slow older reply can never overwrite a newer result. Changing the query, the category
                    or the sort resets the page number, since a page three of the previous result set means nothing in
                    the new one.
                </p>
                <p>
                    While a request is in flight the previous results stay on screen, dimmed, with the status line
                    announcing the update through an <span className="mono">aria-live</span> region. Loading, empty,
                    error and success are four distinct states rather than one spinner.
                </p>

                <h3>The demonstration modes are not the server</h3>
                <p>
                    The slow and failing modes exist entirely in the browser. The slow mode adds a delay in front of a
                    normal request; the endpoint answers at its usual speed and is never asked to sleep. The failing
                    mode produces its error locally without any network call at all — the endpoint is not made to crash
                    or do expensive work. Both label themselves on screen, so the failure is never mistaken for a real
                    outage, and Retry on the same query is allowed through so the recovery path is genuinely reachable.
                </p>
                <p>
                    The slow mode is also the easiest way to see the stale-response protection: switch it on, type a
                    search, then immediately change it. The older, slower response is discarded rather than replacing
                    what you asked for last.
                </p>

                <h3>Without JavaScript</h3>
                <p>
                    The controls are hidden rather than left inert. The full list of published work is rendered on the
                    server instead, with each entry linked to its own page. Both the interactive interface and that
                    list ship in the same HTML, so switching between them never moves the page.
                </p>
            </section>

            <p className="page-next">
                <Link className="text-link" href="/lab/motion">
                    Other experiment: Depth and motion
                </Link>
            </p>
        </main>
    );
}
