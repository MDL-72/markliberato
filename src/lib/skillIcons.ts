import {
    siAngular,
    siApacheecharts,
    siChartdotjs,
    siCss,
    siFigma,
    siGithubactions,
    siGraphql,
    siHtml5,
    siJasmine,
    siJavascript,
    siJest,
    siMui,
    siNextdotjs,
    siPnpm,
    siReact,
    siReactquery,
    siRedux,
    siSass,
    siShadcnui,
    siTailwindcss,
    siTestinglibrary,
    siTypescript,
    siVercel,
    type SimpleIcon,
} from 'simple-icons';

/* Logos for the skills list, from Simple Icons (CC0). Skills without a brand mark
   (REST, CI/CD, reusable components) or whose mark is not in the set (Zustand,
   Karma, AWS) get no logo and a neutral dot instead. */
const icons: Record<string, SimpleIcon> = {
    React: siReact,
    'Next.js': siNextdotjs,
    TypeScript: siTypescript,
    JavaScript: siJavascript,
    HTML5: siHtml5,
    CSS3: siCss,
    'Tailwind CSS': siTailwindcss,
    'SCSS/BEM': siSass,
    'Material UI': siMui,
    ShadCN: siShadcnui,
    Angular: siAngular,
    Figma: siFigma,
    Redux: siRedux,
    'TanStack Query': siReactquery,
    GraphQL: siGraphql,
    'Chart.js': siChartdotjs,
    ECharts: siApacheecharts,
    Jest: siJest,
    'React Testing Library': siTestinglibrary,
    Jasmine: siJasmine,
    'GitHub Actions': siGithubactions,
    pnpm: siPnpm,
    Vercel: siVercel,
};

/** Relative luminance of a hex colour, 0 (black) to 1 (white). */
function luminance(hex: string): number {
    const channel = (start: number) => {
        const value = parseInt(hex.slice(start, start + 2), 16) / 255;
        return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    }
    return 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
}

export type SkillIcon = { path: string; color: string | null };

export function skillIcon(name: string): SkillIcon | null {
    const icon = icons[name];
    if (!icon) return null;
    /* Near-black or near-white marks would vanish on one of the two themes, so they
       fall back to the text colour on hover. */
    const l = luminance(icon.hex);
    return { path: icon.path, color: l < 0.08 || l > 0.85 ? null : `#${icon.hex}` };
}
