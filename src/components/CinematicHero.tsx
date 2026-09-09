'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';

export type HeroPlane = { src: string; alt: string; width: number; height: number };

const ELIGIBLE = '(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)';
/* Fraction of the remaining gap still left after one second of settling.
   Frame-rate independent, matching the DepthMotion exhibit's convention. */
const REMAINING_PER_SECOND = 0.0001;
/* Close enough to snap, so the loop ends instead of easing forever. */
const SETTLED = 0.0005;

/* The planes duplicate imagery that is already presented, with its real alt
   text, in Selected work below. Here they are composition, not content, so
   every one of them is empty-alt and aria-hidden. */
function Plane({ plane, className }: { plane: HeroPlane; className: string }) {
    return (
        <div className={`hero-plane ${className}`} aria-hidden="true">
            <Image
                src={plane.src}
                alt=""
                width={plane.width}
                height={plane.height}
                sizes="(max-width: 1024px) 90vw, 640px"
                priority={className.includes('hero-focal')}
            />
        </div>
    );
}

export default function CinematicHero({
    name,
    role,
    tagline,
    focal,
    support,
}: {
    name: string;
    role: string;
    tagline: string;
    focal: HeroPlane;
    support: [HeroPlane, HeroPlane];
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);

    /* Progress changes on every scroll event and every frame. It lives in refs and
       is written straight to a CSS custom property, so scrolling never queues a
       React render. Nothing about the sequence is discrete, so nothing is state. */
    const targetRef = useRef(0);
    const shownRef = useRef(0);
    const frameRef = useRef(0);
    const lastRef = useRef(0);
    const onScreenRef = useRef(true);
    const eligibleRef = useRef(false);

    const paint = useCallback(() => {
        sceneRef.current?.style.setProperty('--p', shownRef.current.toFixed(4));
    }, []);

    /* Progress is a pure function of geometry, never an accumulated delta. That is
       what makes reverse scrolling restore identical positions, and what makes a
       mid-page reload or an anchor jump land correctly instead of at zero. */
    const measure = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        const distance = rect.height - window.innerHeight;
        if (distance <= 0) {
            targetRef.current = 0;
            return;
        }
        targetRef.current = Math.min(1, Math.max(0, -rect.top / distance));
    }, []);

    const tick = useCallback(
        (now: number) => {
            frameRef.current = 0;
            const dt = lastRef.current ? Math.min(64, now - lastRef.current) : 16.7;
            lastRef.current = now;

            const gap = targetRef.current - shownRef.current;
            if (Math.abs(gap) < SETTLED) {
                shownRef.current = targetRef.current;
                paint();
                lastRef.current = 0;
                return; // Settled. The loop ends rather than idling.
            }

            shownRef.current += gap * (1 - Math.pow(REMAINING_PER_SECOND, dt / 1000));
            paint();
            frameRef.current = requestAnimationFrame(tick);
        },
        [paint],
    );

    const schedule = useCallback(() => {
        if (!eligibleRef.current || !onScreenRef.current) return;
        if (!frameRef.current) frameRef.current = requestAnimationFrame(tick);
    }, [tick]);

    const cancel = useCallback(() => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
        lastRef.current = 0;
    }, []);

    useEffect(() => {
        const media = window.matchMedia(ELIGIBLE);

        const applyEligibility = () => {
            eligibleRef.current = media.matches;
            document.documentElement.dataset.motion = media.matches ? 'on' : '';
            if (!media.matches) {
                /* Release immediately. Leaving --p behind would keep a half-turned
                   plane frozen in the static layout. */
                cancel();
                shownRef.current = 0;
                targetRef.current = 0;
                sceneRef.current?.style.removeProperty('--p');
                return;
            }
            measure();
            shownRef.current = targetRef.current; // Snap on entry, do not animate into place.
            paint();
        };

        const onScroll = () => {
            measure();
            schedule();
        };

        const onVisibility = () => {
            if (document.hidden) cancel();
            else onScroll();
        };

        applyEligibility();

        const observer = new IntersectionObserver(
            ([entry]) => {
                onScreenRef.current = entry.isIntersecting;
                if (!entry.isIntersecting) cancel();
                else onScroll();
            },
            { rootMargin: '200px' },
        );
        if (trackRef.current) observer.observe(trackRef.current);

        const resize = new ResizeObserver(onScroll);
        if (trackRef.current) resize.observe(trackRef.current);

        media.addEventListener('change', applyEligibility);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            cancel();
            observer.disconnect();
            resize.disconnect();
            media.removeEventListener('change', applyEligibility);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [cancel, measure, paint, schedule]);

    return (
        <div className="hero-track" id="home" ref={trackRef}>
            <div className="hero-stage">
                <div className="hero-inner">
                    <div className="hero-identity">
                        <h1>{name}</h1>
                        <p className="hero-role mono">{role}</p>
                        <p className="hero-tagline">{tagline}</p>
                        <div className="hero-actions">
                            <Link className="hero-cta" href="#work">
                                View selected work
                            </Link>
                            <Link className="hero-ghost" href="#contact">
                                Get in touch
                            </Link>
                        </div>
                    </div>

                    <div className="hero-scene" ref={sceneRef}>
                        <div className="hero-field" aria-hidden="true" />
                        <Plane plane={support[0]} className="hero-support hero-support-a" />
                        <Plane plane={support[1]} className="hero-support hero-support-b" />
                        <Plane plane={focal} className="hero-focal" />
                        {/* foreground-a: an intentionally empty edge frame. Outline plus
                            accent corner ticks read as "empty by design," not a broken image. */}
                        <div className="hero-frame hero-frame-l" aria-hidden="true">
                            <span className="hero-tick hero-tick-a" />
                            <span className="hero-tick hero-tick-b" />
                        </div>
                        {/* foreground-b: the caption card labelling the focal plane. The
                            image's real, descriptive alt text lives on the Selected work
                            figure below; this repeats only the title, decoratively. */}
                        <div className="hero-frame hero-frame-r hero-caption" aria-hidden="true">
                            <p className="hero-caption-k mono">Focal plane</p>
                            <p className="hero-caption-v">Core Bridge Solutions</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
