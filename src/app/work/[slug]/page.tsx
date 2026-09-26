import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categoryLabel } from '@/data/portfolio';
import { findWork, publishedWork } from '@/lib/work';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return publishedWork.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const entry = findWork((await params).slug);
    if (!entry) return {};
    return {
        title: entry.title,
        description: entry.summary,
        alternates: { canonical: `/work/${entry.slug}` },
    };
}

export default async function WorkPage({ params }: Params) {
    const entry = findWork((await params).slug);
    // Anything unpublished or unknown is a normal 404, not a stub page.
    if (!entry) notFound();

    return (
        <main id="main" tabIndex={-1} className="shell page">
            <p className="mono breadcrumb">
                <Link href="/#work">Work</Link> / {entry.title}
            </p>
            <h1>{entry.title}</h1>
            <p className="lede">{entry.summary}</p>

            <dl className="fact-row">
                <div>
                    <dt className="mono">Category</dt>
                    <dd>{categoryLabel(entry.category)}</dd>
                </div>
                <div>
                    <dt className="mono">Role</dt>
                    <dd>{entry.role}</dd>
                </div>
                <div>
                    <dt className="mono">Period</dt>
                    <dd>{entry.period}</dd>
                </div>
            </dl>

            {entry.media && (
                <figure className="work-figure">
                    <Image
                        src={entry.media.src}
                        alt={entry.media.alt}
                        width={entry.media.width}
                        height={entry.media.height}
                        sizes="(max-width: 900px) 90vw, 1100px"
                        priority
                    />
                </figure>
            )}

            <section className="notes" aria-labelledby="did-title">
                <h2 id="did-title">What I implemented</h2>
                <ul className="note-list">
                    {entry.contributions.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <h2>Constraints and decisions</h2>
                <ul className="note-list">
                    {entry.decisions.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <h2>What you can inspect</h2>
                <p>{entry.inspect}</p>
                {entry.links.length > 0 && (
                    <ul className="link-list">
                        {entry.links.map((link) => (
                            <li key={link.href}>
                                <a className="text-link" href={link.href} target="_blank" rel="noreferrer">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}

                <h2>Technologies</h2>
                <ul className="tag-row" aria-label="Technologies">
                    {entry.technologies.map((tech) => (
                        <li key={tech} className="mono">
                            {tech}
                        </li>
                    ))}
                </ul>
            </section>

            <nav className="page-next" aria-label="Other work">
                {publishedWork
                    .filter((other) => other.slug !== entry.slug)
                    .slice(0, 3)
                    .map((other) => (
                        <Link key={other.slug} className="text-link" href={`/work/${other.slug}`}>
                            {other.title}
                        </Link>
                    ))}
            </nav>
        </main>
    );
}
