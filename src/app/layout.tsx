import type { Metadata } from 'next';
import Link from 'next/link';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import HeaderScroll from '@/components/HeaderScroll';
import MenuButton from '@/components/MenuButton';
import ThemeToggle from '@/components/ThemeToggle';
import { profile } from '@/data/portfolio';
import './globals.css';

const description =
    'The personal lab of Mark Liberato, a full-stack engineer: working experiments, selected project contributions, and notes on how they were built.';

export const metadata: Metadata = {
    metadataBase: new URL(profile.site),
    title: {
        default: `${profile.name} — ${profile.role}`,
        template: `%s — ${profile.name}`,
    },
    description,
    alternates: { canonical: '/' },
    openGraph: {
        title: `${profile.name} — ${profile.role}`,
        description,
        url: '/',
        type: 'website',
        locale: 'en_US',
        siteName: profile.name,
    },
    robots: { index: true, follow: true },
};

/* Runs before first paint so a remembered choice never flashes the other theme.
   Absence of a stored value deliberately falls through to the OS media query.
   The motion flag is set here for the same reason: the desktop scene reserves
   180dvh of scroll and pins its stage, and doing that after hydration would
   jump the page. Setting it here also means a scriptless browser never gets
   the flag, so it never gets pinned with no way to advance progress. */
const bootScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}try{if(matchMedia('(min-width:1024px) and (min-height:700px) and (prefers-reduced-motion: no-preference)').matches)document.documentElement.dataset.motion='on'}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: bootScript }} />
                {/* Both experiments ship their interactive UI and their static fallback
                    in the same HTML. With scripting on, the fallback is display:none and
                    never contributes layout, so nothing swaps after hydration and no
                    layout shift is introduced. With scripting off, this rule inverts the
                    pair, which is also what keeps inert controls off the page. */}
                <noscript
                    dangerouslySetInnerHTML={{
                        __html:
                            '<style>.td-app,.se-app{display:none!important}.td-fallback,.se-fallback{display:block!important}</style>',
                    }}
                />
            </head>
            <body>
                <a className="skip-link" href="#main">
                    Skip to content
                </a>
                <header className="site-header">
                    <div className="shell header-inner">
                        <Link className="identity" href="/">
                            <span className="identity-name">{profile.name}</span>
                            <span className="identity-role mono">{profile.role}</span>
                        </Link>
                        <MenuButton />
                        <div className="header-panel" id="site-menu">
                            <nav aria-label="Main">
                                <Link href="/#work">Work</Link>
                                <Link href="/#about">About</Link>
                                <Link href="/#lab">Lab</Link>
                            </nav>
                            <div className="header-aside">
                                <a className="mono" href={profile.github} target="_blank" rel="noreferrer">
                                    GitHub
                                </a>
                                <a className="mono" href={profile.resume} download>
                                    Résumé
                                </a>
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </header>
                <HeaderScroll />
                {children}
                <footer className="site-footer">
                    <div className="shell footer-inner">
                        <p className="mono footer-copy">
                            © {new Date().getFullYear()} {profile.name}
                        </p>
                        <nav aria-label="Elsewhere">
                            <a href={profile.github} target="_blank" rel="noreferrer">
                                GitHub
                            </a>
                            <a href={profile.linkedin} target="_blank" rel="noreferrer">
                                LinkedIn
                            </a>
                            <a href={`mailto:${profile.email}`}>{profile.email}</a>
                            <a href={profile.resume} download>
                                Résumé
                            </a>
                        </nav>
                    </div>
                </footer>
            </body>
        </html>
    );
}
