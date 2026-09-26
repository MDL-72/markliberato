// Public summaries only. Raw profile notes, private contact details and internal URLs
// stay out of this module: everything here is allowed to be serialized into a public
// response or rendered on a public page. Figures come from the published résumé.

export const profile = {
    name: 'Mark Liberato',
    role: 'Full-Stack Engineer',
    location: 'Taguig, Philippines',
    email: 'markdavidliberato@gmail.com',
    github: 'https://github.com/markliberato',
    linkedin: 'https://www.linkedin.com/in/mdl72/',
    site: 'https://www.markliberato.com',
    resume: '/resume.pdf',
};

/** The published category values. `category` on the API accepts one of these, or `all`. */
export const workCategories = [
    { id: 'platform', label: 'Platform modernization' },
    { id: 'client-site', label: 'Client website' },
    { id: 'event-platform', label: 'Event platform' },
    { id: 'enterprise', label: 'Enterprise application' },
] as const;

export type WorkCategoryId = (typeof workCategories)[number]['id'];

export function categoryLabel(id: WorkCategoryId): string {
    return workCategories.find((category) => category.id === id)?.label ?? id;
}

export type WorkEntry = {
    slug: string;
    title: string;
    category: WorkCategoryId;
    period: string;
    /** One line: what this is. */
    summary: string;
    /** What the role actually was. */
    role: string;
    /** What was implemented or changed. Each item is a discrete, checkable claim. */
    contributions: string[];
    /** Constraints and decisions that shaped the work. */
    decisions: string[];
    /** What a visitor can go and look at, stated honestly. */
    inspect: string;
    technologies: string[];
    media?: { src: string; alt: string; width: number; height: number };
    links: { label: string; href: string }[];
    published: boolean;
    /** Shown in the homepage Selected work rows rather than the compact list. */
    featured: boolean;
};

export const work: WorkEntry[] = [
    {
        slug: 'soshub',
        title: 'SOSHUB — Samsung Open Source Hub',
        category: 'platform',
        period: '2023 — present',
        summary: 'Modernizing a platform that was already in use, without stopping it.',
        role: 'Main Front-End Engineer',
        contributions: [
            'Led the Angular 17 to 19 upgrade of the existing platform.',
            'Removed jQuery from the older implementation and refactored the code it was holding together.',
            'Worked on-site in Korea with Korean and Ukrainian counterparts on the same codebase.',
        ],
        decisions: [
            'The platform was live, so the upgrade had to move through Angular major versions rather than being rewritten.',
            'Removing jQuery meant replacing direct DOM manipulation with Angular rendering and state handling, not swapping one library for another.',
            'Collaboration ran across three locations and time zones, which pushed decisions into written form.',
        ],
        inspect: 'This is an internal Samsung platform, so there are no public screenshots or source links. The notes above are a contribution record, not a demo.',
        technologies: ['Angular', 'TypeScript', 'RxJS'],
        links: [],
        published: true,
        featured: false,
    },
    {
        slug: 'corebridge',
        title: 'Core Bridge Solutions',
        category: 'client-site',
        period: '2024 — 2025',
        summary: 'A business website with a content platform behind it.',
        role: 'Front-End Lead / Full Stack',
        contributions: [
            'Built the public-facing pages in Next.js and Tailwind CSS.',
            'Integrated Strapi as the content layer and consumed it over GraphQL.',
            'Extended the same stack to related landing pages, Ayuda Lesiones and Move to South Florida.',
        ],
        decisions: [
            'Content had to be editable without a developer, which is what put a CMS behind the marketing pages.',
            'GraphQL kept each page fetching only the fields it renders instead of whole content entries.',
        ],
        inspect: 'The live site is public. The screenshot below is of the production homepage.',
        technologies: ['Next.js', 'Tailwind CSS', 'Strapi', 'GraphQL'],
        media: {
            src: '/work/corebridge.webp',
            alt: 'Core Bridge Solutions website with an orange bridge motif and coastal photography',
            width: 1600,
            height: 800,
        },
        links: [{ label: 'corebridgesolutions.com', href: 'https://www.corebridgesolutions.com/' }],
        published: true,
        featured: true,
    },
    {
        slug: '8gigki',
        title: '8GIG Konstruct',
        category: 'client-site',
        period: 'Rebuilt in 2025',
        summary: 'A company showcase built twice, with the front-end practice in between.',
        role: 'Full-Stack Developer',
        contributions: [
            'Built the original showcase site in React with BEM-organized CSS.',
            'Rebuilt it in 2025 on Next.js and Tailwind CSS with a new design.',
            'Carried the existing Google Analytics setup across the rebuild.',
        ],
        decisions: [
            'The rebuild kept the same content and analytics history, so the migration had to preserve page structure rather than start from an empty site.',
            'BEM in the first version and utility classes in the second is the clearest before-and-after of how the styling approach changed.',
        ],
        inspect: 'The live site is the 2025 rebuild. The earlier React version is no longer deployed.',
        technologies: ['React', 'Next.js', 'Tailwind CSS', 'Google Analytics'],
        media: {
            src: '/work/8gigki.webp',
            alt: '8GIG Konstruct company website with a dark hero reading Building Dreams, Crafting Futures',
            width: 1600,
            height: 800,
        },
        links: [{ label: '8gigki.net', href: 'https://www.8gigki.net/' }],
        published: true,
        featured: true,
    },
    {
        slug: 'svis',
        title: 'Spring of Virtue Integrated School',
        category: 'client-site',
        period: '2023 — 2024',
        summary: 'A school public site, plus the portal the staff actually use.',
        role: 'Full-Stack Developer',
        contributions: [
            'Developed the public school landing page in Next.js and Tailwind CSS.',
            'Worked on the employee portal behind it, using Firebase for data and authentication.',
        ],
        decisions: [
            'A public marketing page and an internal staff portal have different access rules, so the portal work sat behind Firebase authentication rather than on the public site.',
            'Firebase kept the project without a server to operate, which suited a school with no technical staff.',
        ],
        inspect: 'The public school website is live. The employee portal is not public.',
        technologies: ['Next.js', 'Tailwind CSS', 'Firebase'],
        media: {
            src: '/work/svis.webp',
            alt: 'Spring of Virtue Integrated School landing page featuring the school building and navigation',
            width: 1600,
            height: 800,
        },
        links: [{ label: 'springofvirtue.com', href: 'https://www.springofvirtue.com/' }],
        published: true,
        featured: true,
    },
    {
        slug: 'soscon',
        title: 'Samsung Open Source Conference',
        category: 'event-platform',
        period: '2023 — 2025',
        summary: 'Three conference editions, from the registration form to the certificate.',
        role: 'Front-End Engineer',
        contributions: [
            'Delivered the conference event websites across three editions.',
            'Implemented attendee registration.',
            'Implemented attendance confirmation.',
            'Implemented certificate-of-attendance generation.',
        ],
        decisions: [
            'An event site has a hard deadline that does not move, which shaped how much was built new each year versus carried over.',
            'Registration, attendance and certificates are one chain: a certificate is only valid if the attendance record behind it is.',
        ],
        inspect: 'The conference sites are taken down between editions, so there is nothing live to link to. This is a contribution record.',
        technologies: ['React', 'Next.js', 'TypeScript'],
        links: [],
        published: true,
        featured: false,
    },
    {
        slug: 'enterprise-platforms',
        title: 'Samsung enterprise applications',
        category: 'enterprise',
        period: '2023 — present',
        summary: 'Module ownership, a framework migration, and the pipeline around both.',
        role: 'Full-Stack Engineer',
        contributions: [
            'Owned and operated modules within existing enterprise portals.',
            'Migrated an application from React to Next.js.',
            'Built GitHub Actions pipelines for the work.',
            'Added automated testing.',
            'Scaffolded new applications alongside contributions to existing ones.',
        ],
        decisions: [
            'Owning a module in a shared portal means the boundary is the module, not the product: these notes describe that scope and no more.',
            'Migration and CI landed together, because a migration without automated checks moves risk rather than removing it.',
        ],
        inspect: 'These are internal applications. There are no public screenshots or repositories, and none are reconstructed here.',
        technologies: ['React', 'Next.js', 'GitHub Actions', 'Testing'],
        links: [],
        published: true,
        featured: false,
    },
];

export type Experiment = {
    slug: string;
    title: string;
    href: string;
    summary: string;
    /** What the visitor can actually do. */
    instruction: string;
    /** Which engineering behavior the experiment demonstrates. */
    demonstrates: string[];
    component: 'project-ring-3d' | 'search-state';
};

export const experiments: Experiment[] = [
    {
        slug: 'project-ring-3d',
        title: '3D project ring',
        href: '/lab/3d',
        summary: 'Screenshots of real projects placed on a ring in three-dimensional space, rendered with WebGL.',
        instruction: 'Drag to rotate the ring. Click a panel to see which project it is.',
        demonstrates: [
            'WebGL scene built with three.js and React Three Fiber',
            'Render on demand, so nothing runs at rest',
            'Static image fallback without JavaScript',
        ],
        component: 'project-ring-3d',
    },
    {
        slug: 'search-and-state',
        title: 'Search and state',
        href: '/lab/data-explorer',
        summary:
            "A search and filter interface over this site's own work records, talking to a real read-only endpoint.",
        instruction: 'Search, filter and page through the results, then break it on purpose.',
        demonstrates: [
            'Debounced input and request cancellation',
            'Stale-response protection',
            'Loading, empty, error and retry states',
        ],
        component: 'search-state',
    },
];

/** Grouped as on the résumé. */
export const skills = [
    {
        group: 'Frontend',
        items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'SCSS/BEM', 'Material UI', 'ShadCN', 'Angular'],
    },
    {
        group: 'UI and data',
        items: ['Figma', 'Reusable components', 'Redux', 'Zustand', 'TanStack Query', 'REST APIs', 'GraphQL', 'Chart.js', 'ECharts'],
    },
    {
        group: 'Testing and delivery',
        items: ['Jest', 'React Testing Library', 'Jasmine', 'Karma', 'GitHub Actions', 'CI/CD', 'pnpm', 'Vercel', 'AWS'],
    },
];

export const experience = [
    {
        period: 'May 2023 — Present',
        company: 'Samsung Research and Development Philippines',
        role: 'Engineer',
        detail: 'Reusable components, performance work and unit tests across internal portals and public websites. Led a React to Next.js migration, the SOSHUB Angular 17 to 19 upgrade, and set up automated testing (85%+ coverage) with faster GitHub Actions CI/CD.',
    },
    {
        period: 'Mar 2022 — Apr 2023',
        company: 'Collabera Digital Philippines',
        role: 'React.js Developer',
        detail: 'Essilor Eye Locator for Brazil and China with React and Google Maps. Moved analytics to GA4 with Google Tag Manager and modernized the toolchain with pnpm.',
    },
    {
        period: 'Jul 2016 — Jan 2022',
        company: 'University of Makati and Rimport Industries',
        role: 'IT operations and system administration',
        detail: 'The foundation in systems, infrastructure and user support.',
    },
    {
        period: '2016',
        company: 'STI College, Global City',
        role: 'BS Computer Engineering',
        detail: 'Where it started. Later added Responsive Web Design (FreeCodeCamp) and ReactJS (Cognixia).',
    },
];
