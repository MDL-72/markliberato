'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { workCategories } from '@/data/portfolio';
import type { QueryResult, WorkSummary } from '@/lib/work';

type Mode = 'normal' | 'slow' | 'failure';
type Status = 'loading' | 'success' | 'empty' | 'error';

const DEBOUNCE_MS = 250;
/** Applied in the browser only. The endpoint is never asked to be slow. */
const SIMULATED_DELAY_MS = 1500;
const SIMULATED_FAILURE_MS = 350;

const labelFor = (id: string) => workCategories.find((c) => c.id === id)?.label ?? id;

export default function SearchExplorer({ fallback }: { fallback: WorkSummary[] }) {
    const [q, setQ] = useState('');
    const [debouncedQ, setDebouncedQ] = useState('');
    const [category, setCategory] = useState('all');
    const [sort, setSort] = useState('title-asc');
    const [page, setPage] = useState(1);
    const [mode, setMode] = useState<Mode>('normal');
    const [attempt, setAttempt] = useState(0);

    const [data, setData] = useState<QueryResult | null>(null);
    const [status, setStatus] = useState<Status>('loading');
    const [error, setError] = useState('');

    /* Every request gets a sequence number. A response whose number is no longer
       the newest is dropped, so a slow older reply cannot overwrite a newer result. */
    const runRef = useRef(0);
    const abortRef = useRef<AbortController | null>(null);
    /* Which query has already been failed once by the demonstration, so that
       Retry on the same query is allowed through and actually recovers. */
    const failedKeyRef = useRef('');

    useEffect(() => {
        const timer = window.setTimeout(() => setDebouncedQ(q), DEBOUNCE_MS);
        return () => window.clearTimeout(timer);
    }, [q]);

    useEffect(() => {
        const params = new URLSearchParams({ q: debouncedQ, category, sort, page: String(page) });
        const key = params.toString();
        const id = ++runRef.current;

        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        const current = () => id === runRef.current;
        setStatus('loading');
        setError('');

        const sleep = (ms: number) =>
            new Promise<void>((resolve, reject) => {
                const timer = window.setTimeout(resolve, ms);
                controller.signal.addEventListener('abort', () => {
                    window.clearTimeout(timer);
                    reject(new DOMException('Aborted', 'AbortError'));
                });
            });

        const run = async () => {
            if (mode === 'failure' && failedKeyRef.current !== key) {
                failedKeyRef.current = key;
                await sleep(SIMULATED_FAILURE_MS);
                throw new Error('Simulated failure: this error was produced in the browser, not by the server.');
            }
            if (mode === 'slow') await sleep(SIMULATED_DELAY_MS);

            const response = await fetch(`/api/lab/projects?${key}`, { signal: controller.signal });
            if (!response.ok) {
                const body = (await response.json().catch(() => null)) as { error?: string } | null;
                throw new Error(body?.error ?? `The endpoint responded with ${response.status}.`);
            }
            return (await response.json()) as QueryResult;
        };

        run()
            .then((result) => {
                if (!current()) return;
                setData(result);
                setStatus(result.total === 0 ? 'empty' : 'success');
            })
            .catch((cause: unknown) => {
                if (!current()) return;
                if (cause instanceof DOMException && cause.name === 'AbortError') return;
                setError(cause instanceof Error ? cause.message : 'Something went wrong.');
                setStatus('error');
            });

        return () => controller.abort();
    }, [debouncedQ, category, sort, page, mode, attempt]);

    // Changing what is being asked for invalidates the page number.
    const changeQuery = useCallback((next: string) => {
        setQ(next);
        setPage(1);
    }, []);

    const reset = () => {
        setQ('');
        setDebouncedQ('');
        setCategory('all');
        setSort('title-asc');
        setPage(1);
        failedKeyRef.current = '';
    };

    const busy = status === 'loading';
    const totalPages = data?.totalPages ?? 1;

    return (
        <div className="se">
            {/* Rendered in the same HTML as the app and hidden while scripting is on,
                so switching to the live results never moves the page. */}
            <div className="se-fallback">
                <p className="se-note">
                    This explorer needs JavaScript for search, filtering and paging. The full list of published work is
                    below.
                </p>
                <ul className="se-results">
                    {fallback.map((entry) => (
                        <li key={entry.slug}>
                            <Link href={entry.href}>
                                <span className="se-result-title">{entry.title}</span>
                                <span className="mono se-result-meta">{labelFor(entry.category)}</span>
                            </Link>
                            <p>{entry.summary}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="se-app">
                <div className="se-controls">
                    <div className="se-field se-field-wide">
                        <label htmlFor="se-q">Search</label>
                        <input
                            id="se-q"
                            type="search"
                            value={q}
                            maxLength={100}
                            placeholder="angular, cms, next.js…"
                            onChange={(event) => changeQuery(event.target.value)}
                        />
                    </div>
                    <div className="se-field">
                        <label htmlFor="se-category">Category</label>
                        <select
                            id="se-category"
                            value={category}
                            onChange={(event) => {
                                setCategory(event.target.value);
                                setPage(1);
                            }}
                        >
                            <option value="all">All categories</option>
                            {workCategories.map((entry) => (
                                <option key={entry.id} value={entry.id}>
                                    {entry.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="se-field">
                        <label htmlFor="se-sort">Sort</label>
                        <select
                            id="se-sort"
                            value={sort}
                            onChange={(event) => {
                                setSort(event.target.value);
                                setPage(1);
                            }}
                        >
                            <option value="title-asc">Title A–Z</option>
                            <option value="title-desc">Title Z–A</option>
                        </select>
                    </div>
                    <div className="se-field">
                        <label htmlFor="se-mode">Demonstration</label>
                        <select
                            id="se-mode"
                            value={mode}
                            onChange={(event) => {
                                setMode(event.target.value as Mode);
                                failedKeyRef.current = '';
                            }}
                        >
                            <option value="normal">Normal</option>
                            <option value="slow">Simulated slow response</option>
                            <option value="failure">Simulated failure</option>
                        </select>
                    </div>
                    <button type="button" className="se-reset" onClick={reset}>
                        Reset filters
                    </button>
                </div>

                {mode !== 'normal' && (
                    <p className="se-mode-note mono">
                        {mode === 'slow'
                            ? 'Simulated slow response is on. The delay is added in the browser; the endpoint answers at its normal speed.'
                            : 'Simulated failure is on. The error is produced in the browser; the endpoint is not failing. Retry succeeds.'}
                    </p>
                )}

                <p className="se-status mono" role="status" aria-live="polite">
                    {status === 'loading' && 'Loading results…'}
                    {status === 'success' &&
                        `${data?.total ?? 0} result${data?.total === 1 ? '' : 's'} · page ${data?.page} of ${totalPages}`}
                    {status === 'empty' && 'No results match those filters.'}
                    {status === 'error' && 'Request failed.'}
                </p>

                {status === 'error' ? (
                    <div className="se-error">
                        <p>{error}</p>
                        <button type="button" onClick={() => setAttempt((value) => value + 1)}>
                            Retry
                        </button>
                    </div>
                ) : status === 'empty' ? (
                    <div className="se-empty">
                        <p>Nothing matched. Try a broader search, or reset the filters.</p>
                    </div>
                ) : (
                    /* Previous results stay on screen while the next request is in flight. */
                    <ul className="se-results" data-updating={busy ? 'true' : undefined}>
                        {data
                            ? data.results.map((entry) => (
                                  <li key={entry.slug}>
                                      <Link href={entry.href}>
                                          <span className="se-result-title">{entry.title}</span>
                                          <span className="mono se-result-meta">{labelFor(entry.category)}</span>
                                      </Link>
                                      <p>{entry.summary}</p>
                                      <ul className="tag-row" aria-label="Technologies">
                                          {entry.technologies.map((tech) => (
                                              <li key={tech} className="mono">
                                                  {tech}
                                              </li>
                                          ))}
                                      </ul>
                                  </li>
                              ))
                            : /* First load only: placeholders the height of a real row, so
                                 arriving results do not push the rest of the page down. */
                              [0, 1, 2].map((index) => <li key={index} className="se-skeleton" aria-hidden="true" />)}
                    </ul>
                )}

                <div className="se-pager">
                    <button
                        type="button"
                        onClick={() => setPage((value) => Math.max(1, value - 1))}
                        disabled={page <= 1}
                    >
                        Previous
                    </button>
                    <span className="mono">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        type="button"
                        onClick={() => setPage((value) => value + 1)}
                        disabled={status !== 'success' || page >= totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
