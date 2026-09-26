import type { Metadata } from 'next';
import { profile } from '@/data/portfolio';

export const siteDescription =
    'Mark Liberato is a front-end focused full-stack engineer in Taguig, Philippines, with 4+ years building web applications in React, Next.js and TypeScript. Selected work, experiments and résumé.';

/* A page that sets openGraph or twitter replaces the layout's whole object rather
   than merging into it, so every page gets the full set from here. That keeps
   og:title and og:url pointing at the page being shared, not the homepage. */
export function pageSocial(title: string, description: string, path: string): Pick<Metadata, 'openGraph' | 'twitter'> {
    return {
        openGraph: {
            title: `${title} — ${profile.name}`,
            description,
            url: path,
            type: 'website',
            locale: 'en_US',
            siteName: profile.name,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} — ${profile.name}`,
            description,
        },
    };
}

/** Site-wide structured data: who the site is about, and the site itself. */
export function siteJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': `${profile.site}/#person`,
                name: 'Mark David Liberato',
                alternateName: profile.name,
                url: profile.site,
                jobTitle: profile.role,
                description: siteDescription,
                address: { '@type': 'PostalAddress', addressLocality: 'Taguig', addressCountry: 'PH' },
                alumniOf: { '@type': 'CollegeOrUniversity', name: 'STI College, Global City' },
                worksFor: { '@type': 'Organization', name: 'Samsung Electronics Philippines Corporation' },
                sameAs: [profile.github, profile.linkedin],
                knowsAbout: ['React', 'Next.js', 'TypeScript', 'Angular', 'Tailwind CSS', 'GraphQL', 'Web performance', 'Automated testing'],
            },
            {
                '@type': 'WebSite',
                '@id': `${profile.site}/#website`,
                url: profile.site,
                name: profile.name,
                description: siteDescription,
                inLanguage: 'en',
                publisher: { '@id': `${profile.site}/#person` },
            },
        ],
    };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${profile.site}${item.path}`,
        })),
    };
}
