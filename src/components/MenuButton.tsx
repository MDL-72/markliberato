'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/* Narrow-screen menu toggle. The links stay in the server-rendered header; this
   only flips data-menu-open on it, so the menu is plain HTML without JavaScript
   on wide screens and simply hidden behind the button on narrow ones. */
export default function MenuButton() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        document.querySelector('.site-header')?.toggleAttribute('data-menu-open', open);
    }, [open]);

    /* Close after navigating. */
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!open) return;
        const header = document.querySelector('.site-header');
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };
        /* Tapping a link (including an in-page anchor, which does not change the path) closes it. */
        const onClick = (event: MouseEvent) => {
            if ((event.target as HTMLElement).closest('.header-panel a')) setOpen(false);
        };
        const onResize = () => {
            if (window.innerWidth > 700) setOpen(false);
        };
        document.addEventListener('keydown', onKey);
        header?.addEventListener('click', onClick as EventListener);
        window.addEventListener('resize', onResize);
        return () => {
            document.removeEventListener('keydown', onKey);
            header?.removeEventListener('click', onClick as EventListener);
            window.removeEventListener('resize', onResize);
        };
    }, [open]);

    return (
        <button
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
        >
            <span />
            <span />
        </button>
    );
}
