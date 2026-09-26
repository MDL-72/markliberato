'use client';

import { useEffect, useRef, useState } from 'react';

type Job = { period: string; company: string; role: string; detail: string };

const HORIZONTAL = '(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)';

/* Wide screens: when the section comes into view the career plays by itself, left
   to right, first job to last, like a short clip (with a replay button). Narrow
   screens, reduced motion and no-JS: a plain vertical timeline, fully visible. */
export default function CareerTimeline({ jobs }: { jobs: Job[] }) {
    const [horizontal, setHorizontal] = useState(false);

    useEffect(() => {
        const query = window.matchMedia(HORIZONTAL);
        const sync = () => setHorizontal(query.matches);
        sync();
        query.addEventListener('change', sync);
        return () => query.removeEventListener('change', sync);
    }, []);

    return horizontal ? <HorizontalReel jobs={jobs} /> : <VerticalTimeline jobs={jobs} />;
}

function HorizontalReel({ jobs: newestFirst }: { jobs: Job[] }) {
    /* The data is newest first; the reel starts in the past and runs forward. */
    const jobs = [...newestFirst].reverse();
    const wrap = useRef<HTMLDivElement>(null);
    const track = useRef<HTMLDivElement>(null);
    const stop = useRef<() => void>(() => {});
    const [active, setActive] = useState(-1);
    const [playing, setPlaying] = useState(false);
    const [plays, setPlays] = useState(0);

    /* Plays once when the section is mostly on screen; the button replays it. */
    useEffect(() => {
        const wrapEl = wrap.current;
        if (!wrapEl) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setPlays((count) => (count === 0 ? 1 : count));
                    observer.disconnect();
                }
            },
            { threshold: 0.6 },
        );
        observer.observe(wrapEl);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const trackEl = track.current;
        if (!trackEl || plays === 0) return;
        const cards = Array.from(trackEl.querySelectorAll<HTMLElement>('.hcareer-card'));
        const perJob = 1500;
        let frame = 0;
        let start = 0;

        const draw = (now: number) => {
            if (!start) start = now;
            const width = window.innerWidth;
            const trackWidth = trackEl.scrollWidth;
            const distance = Math.max(0, trackWidth - width);
            const total = perJob * cards.length;
            const t = Math.min(1, (now - start) / total);
            /* The line leads. The track pans once the line passes most of the way across the screen. */
            const line = t * trackWidth;
            const shift = Math.min(distance, Math.max(0, line - width * 0.75));
            trackEl.style.transform = `translate3d(${-shift}px, 0, 0)`;
            trackEl.style.setProperty('--fill', `${line}px`);
            let reached = -1;
            cards.forEach((card, index) => {
                const on = card.offsetLeft + 27 <= line;
                card.toggleAttribute('data-active', on);
                if (on) reached = index;
            });
            setActive(reached);
            if (t < 1) {
                frame = requestAnimationFrame(draw);
            } else {
                setPlaying(false);
            }
        };

        cards.forEach((card) => card.removeAttribute('data-active'));
        trackEl.style.transform = 'translate3d(0, 0, 0)';
        trackEl.style.setProperty('--fill', '0px');
        setActive(-1);
        setPlaying(true);
        frame = requestAnimationFrame(draw);
        stop.current = () => cancelAnimationFrame(frame);
        return () => cancelAnimationFrame(frame);
    }, [plays]);

    return (
        <div className="hcareer" ref={wrap}>
            <div className="hcareer-pin">
                <div className="hcareer-head">
                    <h3 className="hcareer-title">Career</h3>
                    <div className="hcareer-controls">
                        <p className="mono hcareer-count" aria-hidden="true">
                            {String(Math.max(active, 0) + 1).padStart(2, '0')} / {String(jobs.length).padStart(2, '0')}
                        </p>
                        <button
                            type="button"
                            className="mono hcareer-replay"
                            disabled={playing}
                            onClick={() => {
                                stop.current();
                                setPlays((count) => count + 1);
                            }}
                        >
                            Replay
                        </button>
                    </div>
                </div>
                <div className="hcareer-viewport">
                    <div className="hcareer-track" ref={track}>
                        <div className="hcareer-line" aria-hidden="true">
                            <span />
                        </div>
                        {jobs.map((job, index) => (
                            <article className="hcareer-card" key={job.company} data-side={index % 2 === 0 ? 'down' : 'up'}>
                                <span className="hcareer-node" aria-hidden="true">
                                    <i />
                                </span>
                                <p className="mono hcareer-year">{job.period}</p>
                                <span className="hcareer-stem" aria-hidden="true" />
                                <div className="hcareer-body">
                                    <h4>{job.company}</h4>
                                    <p className="mono career-role">{job.role}</p>
                                    <p className="hcareer-detail">{job.detail}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* Vertical line that fills as the list scrolls into view, dots lighting as it arrives. */
function VerticalTimeline({ jobs }: { jobs: Job[] }) {
    const list = useRef<HTMLOListElement>(null);

    useEffect(() => {
        const el = list.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const items = Array.from(el.children) as HTMLElement[];
        let frame = 0;

        const update = () => {
            frame = 0;
            const trigger = window.innerHeight * 0.65;
            const box = el.getBoundingClientRect();
            const progress = Math.min(1, Math.max(0, (trigger - box.top) / box.height));
            el.style.setProperty('--progress', String(progress));
            items.forEach((item) => {
                item.toggleAttribute('data-active', item.getBoundingClientRect().top < trigger);
            });
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        el.setAttribute('data-animated', '');
        update();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        return () => {
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div className="shell vcareer">
            <h3 className="subhead">Career</h3>
            <ol className="timeline" ref={list}>
                {jobs.map((job) => (
                    <li key={job.company}>
                        <p className="mono career-period">{job.period}</p>
                        <h4>{job.company}</h4>
                        <p className="mono career-role">{job.role}</p>
                        <p className="timeline-detail">{job.detail}</p>
                    </li>
                ))}
            </ol>
        </div>
    );
}
