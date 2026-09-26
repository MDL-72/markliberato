import { NextResponse } from 'next/server';
import { parseQuery, queryWork } from '@/lib/work';

/**
 * GET /api/lab/projects
 *
 * Read-only search over the same published work records the site renders.
 * No database, no authentication, no visitor data is stored.
 *
 * q        trimmed text, 100 characters maximum
 * category one of the published category ids, or "all"
 * sort     title-asc | title-desc
 * page     positive integer, page size fixed at 3
 */
export async function GET(request: Request) {
    const params = new URL(request.url).searchParams;
    const parsed = parseQuery(params);

    if (!parsed.ok) {
        return NextResponse.json(
            { error: parsed.error, parameter: parsed.parameter },
            { status: 400 },
        );
    }

    return NextResponse.json(queryWork(parsed.value), {
        headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' },
    });
}
