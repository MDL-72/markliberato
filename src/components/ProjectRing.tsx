'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { publishedWork } from '@/lib/work';

const ProjectRing3D = dynamic(() => import('./ProjectRing3D'), {
    ssr: false,
    loading: () => <div className="td-stage td-loading mono">Loading 3D scene…</div>,
});

/** Real screenshots only; entries without media are skipped. */
const shots = publishedWork.flatMap((entry) => (entry.media ? [{ entry, media: entry.media }] : []));

export default function ProjectRing() {
    return (
        <>
            <div className="td-app">
                <ProjectRing3D panels={shots.map(({ entry, media }) => ({ src: media.src, label: entry.title }))} />
            </div>
            {/* Shown only when scripting is off; see the noscript rule in layout.tsx. */}
            <ul className="td-fallback">
                {shots.map(({ entry, media }) => (
                    <li key={entry.slug}>
                        <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="360px" />
                        <p className="mono">{entry.title}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}
