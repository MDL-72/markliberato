'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/**
 * Follows the operating system until the visitor chooses. Only that explicit
 * choice is remembered; nothing else about the visitor is stored.
 */
export default function ThemeToggle() {
    const [ready, setReady] = useState(false);
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        setReady(true);
        const media = window.matchMedia('(prefers-color-scheme: light)');
        const stored = (() => {
            try {
                return window.localStorage.getItem('theme');
            } catch {
                return null;
            }
        })();

        if (stored === 'light' || stored === 'dark') {
            setTheme(stored);
            return;
        }

        const follow = () => setTheme(media.matches ? 'light' : 'dark');
        follow();
        media.addEventListener('change', follow);
        return () => media.removeEventListener('change', follow);
    }, []);

    if (!ready) return null;

    const next: Theme = theme === 'dark' ? 'light' : 'dark';

    return (
        <button
            type="button"
            className="theme-toggle"
            aria-label={`Switch to ${next} theme`}
            onClick={() => {
                document.documentElement.dataset.theme = next;
                try {
                    window.localStorage.setItem('theme', next);
                } catch {
                    // A visitor blocking storage still gets the switch for this visit.
                }
                setTheme(next);
            }}
        >
            <span aria-hidden="true">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
    );
}
