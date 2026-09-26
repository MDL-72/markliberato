import { MetadataRoute } from 'next';
import { experiments, profile } from '@/data/portfolio';
import { publishedWork } from '@/lib/work';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: profile.site, changeFrequency: 'monthly', priority: 1 },
        ...experiments.map((experiment) => ({
            url: `${profile.site}${experiment.href}`,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
        ...publishedWork.map((entry) => ({
            url: `${profile.site}/work/${entry.slug}`,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ];
}
