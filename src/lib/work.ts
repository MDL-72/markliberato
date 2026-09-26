import { work, workCategories, type WorkCategoryId, type WorkEntry } from '@/data/portfolio';

/** Fixed by the endpoint contract. Not a client-supplied value. */
export const PAGE_SIZE = 3;

export const sortValues = ['title-asc', 'title-desc'] as const;
export type SortValue = (typeof sortValues)[number];

export const categoryIds = workCategories.map((category) => category.id);

/** The only shape that leaves the server. Anything not listed here is not public. */
export type WorkSummary = {
    slug: string;
    title: string;
    category: WorkCategoryId;
    summary: string;
    role: string;
    period: string;
    technologies: string[];
    href: string;
};

export function toSummary(entry: WorkEntry): WorkSummary {
    return {
        slug: entry.slug,
        title: entry.title,
        category: entry.category,
        summary: entry.summary,
        role: entry.role,
        period: entry.period,
        technologies: entry.technologies,
        href: `/work/${entry.slug}`,
    };
}

export const publishedWork = work.filter((entry) => entry.published);

export function findWork(slug: string): WorkEntry | undefined {
    return publishedWork.find((entry) => entry.slug === slug);
}

export type WorkQuery = {
    q: string;
    category: WorkCategoryId | 'all';
    sort: SortValue;
    page: number;
};

export const defaultQuery: WorkQuery = { q: '', category: 'all', sort: 'title-asc', page: 1 };

export type QueryResult = {
    results: WorkSummary[];
    total: number;
    page: number;
    totalPages: number;
    pageSize: number;
};

export function queryWork({ q, category, sort, page }: WorkQuery): QueryResult {
    const needle = q.trim().toLowerCase();
    const matched = publishedWork.filter((entry) => {
        if (category !== 'all' && entry.category !== category) return false;
        if (!needle) return true;
        const haystack = [entry.title, entry.summary, entry.role, ...entry.technologies].join(' ').toLowerCase();
        return haystack.includes(needle);
    });

    const direction = sort === 'title-desc' ? -1 : 1;
    const ordered = [...matched].sort((a, b) => a.title.localeCompare(b.title) * direction);

    const total = ordered.length;
    // An empty result set still has one (empty) page, so page 1 is always valid.
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const start = (page - 1) * PAGE_SIZE;

    return {
        // A valid page past the end simply yields nothing rather than an error.
        results: ordered.slice(start, start + PAGE_SIZE).map(toSummary),
        total,
        page,
        totalPages,
        pageSize: PAGE_SIZE,
    };
}

export type ParseFailure = { ok: false; error: string; parameter: string };
export type ParseSuccess = { ok: true; value: WorkQuery };

/** Rejects anything outside the documented contract rather than silently correcting it. */
export function parseQuery(params: URLSearchParams): ParseSuccess | ParseFailure {
    const rawQ = params.get('q') ?? '';
    if (rawQ.length > 100) {
        return { ok: false, parameter: 'q', error: 'q must be 100 characters or fewer.' };
    }

    const rawCategory = params.get('category') ?? 'all';
    if (rawCategory !== 'all' && !categoryIds.includes(rawCategory as WorkCategoryId)) {
        return {
            ok: false,
            parameter: 'category',
            error: `category must be "all" or one of: ${categoryIds.join(', ')}.`,
        };
    }

    const rawSort = params.get('sort') ?? 'title-asc';
    if (!sortValues.includes(rawSort as SortValue)) {
        return { ok: false, parameter: 'sort', error: `sort must be one of: ${sortValues.join(', ')}.` };
    }

    const rawPage = params.get('page') ?? '1';
    if (!/^[1-9][0-9]*$/.test(rawPage)) {
        return { ok: false, parameter: 'page', error: 'page must be a positive integer.' };
    }

    return {
        ok: true,
        value: {
            q: rawQ.trim(),
            category: rawCategory as WorkCategoryId | 'all',
            sort: rawSort as SortValue,
            page: Number(rawPage),
        },
    };
}
