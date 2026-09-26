'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export type CarouselEntry = {
    slug: string;
    title: string;
    category: string;
    summary: string;
    role: string;
    technologies: string[];
    media: { src: string; alt: string; width: number; height: number };
};

/* Peek carousel: the active project is centred and large, its neighbours show at
   the edges. The browser does the scrolling and snapping, so touch, trackpad and
   keyboard all work; this component only tracks which slide is centred and
   provides the arrows and dots. */
export default function WorkCarousel({ entries }: { entries: CarouselEntry[] }) {
    const scroller = useRef<HTMLUListElement>(null);
    /* Opens on the second project so both neighbours peek in from the start. */
    const first = Math.min(1, entries.length - 1);
    const [active, setActive] = useState(first);

    useLayoutEffect(() => {
        const el = scroller.current;
        const slide = el?.children[first] as HTMLElement | undefined;
        if (el && slide) el.scrollLeft = slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2;
    }, [first]);

    const updateActive = useCallback(() => {
        const el = scroller.current;
        if (!el) return;
        const middle = el.scrollLeft + el.clientWidth / 2;
        let closest = 0;
        let best = Infinity;
        Array.from(el.children).forEach((child, index) => {
            const slide = child as HTMLElement;
            const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - middle);
            if (distance < best) {
                best = distance;
                closest = index;
            }
        });
        setActive(closest);
    }, []);

    useEffect(() => {
        const el = scroller.current;
        if (!el) return;
        let frame = 0;
        const onScroll = () => {
            if (!frame) {
                frame = requestAnimationFrame(() => {
                    frame = 0;
                    updateActive();
                });
            }
        };
        updateActive();
        el.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            el.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [updateActive]);

    const goTo = (index: number) => {
        const el = scroller.current;
        const slide = el?.children[Math.min(entries.length - 1, Math.max(0, index))] as HTMLElement | undefined;
        if (!el || !slide) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollTo({
            left: slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2,
            behavior: reduce ? 'auto' : 'smooth',
        });
    };

    return (
        <div className="carousel" role="region" aria-roledescription="carousel" aria-label="Selected work">
            <ul
                className="carousel-track"
                ref={scroller}
                tabIndex={0}
                aria-label="Projects, scroll or use the arrow keys"
                onKeyDown={(event) => {
                    if (event.key === 'ArrowRight') {
                        event.preventDefault();
                        goTo(active + 1);
                    } else if (event.key === 'ArrowLeft') {
                        event.preventDefault();
                        goTo(active - 1);
                    }
                }}
            >
                {entries.map((entry, index) => (
                    <li
                        className="carousel-slide"
                        key={entry.slug}
                        data-active={index === active ? '' : undefined}
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${entries.length}`}
                    >
                        <Link className="carousel-shot" href={`/work/${entry.slug}`} tabIndex={index === active ? 0 : -1}>
                            <Image
                                src={entry.media.src}
                                alt={entry.media.alt}
                                width={entry.media.width}
                                height={entry.media.height}
                                sizes="(max-width: 900px) 80vw, 920px"
                                priority={index === first}
                            />
                        </Link>
                        <div className="carousel-caption">
                            <p className="mono feature-index">
                                {String(index + 1).padStart(2, '0')} — {entry.category}
                            </p>
                            <h3>{entry.title}</h3>
                            <p className="carousel-summary">{entry.summary}</p>
                            <p className="mono feature-role">{entry.role}</p>
                            <ul className="tag-row" aria-label="Technologies">
                                {entry.technologies.map((tech) => (
                                    <li key={tech} className="mono">
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                            <Link className="text-link" href={`/work/${entry.slug}`} tabIndex={index === active ? 0 : -1}>
                                Read the notes
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="carousel-controls">
                <button type="button" className="carousel-arrow" aria-label="Previous project" disabled={active === 0} onClick={() => goTo(active - 1)}>
                    ←
                </button>
                <div className="carousel-dots">
                    {entries.map((entry, index) => (
                        <button
                            type="button"
                            key={entry.slug}
                            className="carousel-dot"
                            aria-label={`Go to ${entry.title}`}
                            aria-current={index === active}
                            onClick={() => goTo(index)}
                        />
                    ))}
                </div>
                <p className="mono carousel-count" aria-hidden="true">
                    {String(active + 1).padStart(2, '0')} / {String(entries.length).padStart(2, '0')}
                </p>
                <button
                    type="button"
                    className="carousel-arrow"
                    aria-label="Next project"
                    disabled={active === entries.length - 1}
                    onClick={() => goTo(active + 1)}
                >
                    →
                </button>
            </div>
        </div>
    );
}
