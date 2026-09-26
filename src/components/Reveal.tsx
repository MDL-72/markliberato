'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';

/* Fades its content in once it scrolls into view. Content is visible by default:
   it is only hidden if it starts below the fold and scripting is running, so
   no-JS visitors, reduced motion and anything already on screen never flash. */
export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

        el.setAttribute('data-reveal', 'pending');
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.setAttribute('data-reveal', 'in');
                    observer.disconnect();
                }
            },
            { threshold: 0.25 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
