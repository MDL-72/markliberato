'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* Tells the fixed header what is behind it, so CSS can keep it readable:
   data-over-hero  the dark hero band is behind it, so it takes light text.
   data-scrolled   page content is behind it, so it gets a surface. */
export default function HeaderScroll() {
    const pathname = usePathname();

    useEffect(() => {
        const header = document.querySelector('.site-header');
        if (!header) return;
        const update = () => {
            const reel = document.querySelector('.reel');
            const overHero = !!reel && reel.getBoundingClientRect().bottom > header.getBoundingClientRect().height;
            header.toggleAttribute('data-over-hero', overHero);
            header.toggleAttribute('data-scrolled', !overHero && window.scrollY > 8);
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [pathname]);

    return null;
}
