import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectRing from '@/components/ProjectRing';
import { pageSocial } from '@/lib/seo';

export const metadata: Metadata = {
    title: '3D project ring',
    description: 'Screenshots of real projects placed on a ring in three-dimensional space, rendered with WebGL.',
    alternates: { canonical: '/lab/3d' },
    ...pageSocial('3D project ring', 'Screenshots of real projects placed on a ring in three-dimensional space, rendered with WebGL.', '/lab/3d'),
};

export default function ThreeDExperiment() {
    return (
        <main id="main" tabIndex={-1} className="shell page">
            <p className="mono breadcrumb">
                <Link href="/#lab">Lab</Link> / 3D project ring
            </p>
            <h1>3D project ring</h1>
            <p className="lede">
                Screenshots of projects on this site, standing on a ring in real 3D space. Drag to spin it around,
                click a panel to see which project it is.
            </p>

            <ProjectRing />

            <section className="notes" aria-labelledby="notes-title">
                <h2 id="notes-title">How it works</h2>

                <h3>A real 3D scene</h3>
                <p>
                    Each screenshot is a flat plane placed on a circle. The camera looks at the circle from slightly
                    above, and dragging moves the camera around it, so panels at the back are genuinely farther away.
                    It uses three.js through React Three Fiber.
                </p>

                <h3>Nothing runs at rest</h3>
                <p>
                    The canvas renders on demand. A frame is drawn only when you drag or click, so an idle page uses no
                    GPU time.
                </p>

                <h3>Without JavaScript</h3>
                <p>The same screenshots are shown as a plain list instead.</p>
            </section>

            <p className="page-next">
                <Link className="text-link" href="/lab/data-explorer">
                    Next experiment: Search and state
                </Link>
            </p>
        </main>
    );
}
