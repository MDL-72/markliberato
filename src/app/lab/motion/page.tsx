import type { Metadata } from 'next';
import Link from 'next/link';
import DepthMotion from '@/components/DepthMotion';

export const metadata: Metadata = {
    title: 'Depth and motion',
    description:
        'An interactive layered composition driven by a single progress value, with depth, separation and easing exposed as controls.',
    alternates: { canonical: '/lab/motion' },
};

export default function MotionExperiment() {
    return (
        <main id="main" tabIndex={-1} className="shell page">
            <p className="mono breadcrumb">
                <Link href="/#lab">Lab</Link> / Depth and motion
            </p>
            <h1>Depth and motion</h1>
            <p className="lede">
                One progress value from 0 to 100 drives every layer in this composition. Scrub the timeline to explore
                it, or press Play for a single eight-second pass.
            </p>

            <DepthMotion variant="full" />

            <section className="notes" aria-labelledby="notes-title">
                <h2 id="notes-title">How it works</h2>

                <h3>Progress maps to transforms</h3>
                <p>
                    The slider writes a single number into a CSS custom property on the stage element. Every layer is
                    positioned from that one value: the two background surfaces interpolate their rotation and their
                    offset along the depth axis, the central panel rotates toward the viewer, and the foreground
                    fragments travel in the opposite direction. At progress 0 the layers are separated and angled so the
                    depth is legible; at progress 1 every rotation and offset reaches zero and the composition flattens
                    into a readable arrangement. Nothing computes a per-layer position in JavaScript, so scrubbing
                    backward reverses the sequence exactly.
                </p>
                <p>
                    The <span className="mono">Depth</span> control scales how far the layers travel along that axis, and{' '}
                    <span className="mono">Separation</span> changes how much faster the foreground moves than the
                    background. Because both are also custom properties on the same element, changing either one is
                    visible immediately at whatever progress the timeline is currently at.
                </p>

                <h3>Continuous values stay out of render state</h3>
                <p>
                    Progress, depth and separation change on every animation frame and on every pointer move. If they
                    were React state, a single drag would queue hundreds of renders of a component tree that does not
                    change shape. They are held in refs instead and written directly to the DOM as custom properties and
                    label text. Only genuinely discrete things render: whether the sequence is playing, and whether the
                    system is asking for reduced motion.
                </p>

                <h3>Smoothing settles, then stops</h3>
                <p>
                    Pointer and keyboard input arrive in coarse steps, so the composition eases toward the slider value
                    rather than snapping to it. Each frame closes a fixed proportion of the remaining gap, scaled by the
                    real elapsed time so the settle takes the same wall-clock time regardless of frame rate. Once the gap
                    falls below a small threshold the value snaps to the target and the loop ends: no frame is requested
                    while the composition is at rest. Playback is treated separately, because playback is itself the
                    motion, so it drives the value directly instead of being chased by the smoother. Pausing, finishing
                    the pass, hiding the tab, or navigating away all cancel the pending frame.
                </p>

                <h3>Reduced motion and the no-JavaScript fallback</h3>
                <p>
                    A live media query listener watches for reduced-motion preferences and takes effect during use, not
                    only on load. When it is set, playback is switched off, the Play control is removed rather than left
                    inert, and the smoother is bypassed entirely so the timeline updates the composition directly with
                    no frame loop at all.
                </p>
                <p>
                    Without JavaScript, the controls are hidden rather than left inert, so nothing on the page is a button that does nothing.
                    The same composition markup is rendered three times at fixed progress values instead, showing the
                    start, middle and end of the sequence with captions. On small screens the layer count and the depth
                    range are both reduced, but the timeline stays directly interactive.
                </p>

                <h3>Where the code lives</h3>
                <p>
                    The exhibit is one client component, <span className="mono">src/components/DepthMotion.tsx</span>,
                    with its layout and transforms in <span className="mono">src/app/globals.css</span>. The homepage
                    preview and this page render that same component; the preview simply hides the depth, separation and
                    easing controls.
                </p>
            </section>

            <p className="page-next">
                <Link className="text-link" href="/lab/data-explorer">
                    Next experiment: Search and state
                </Link>
            </p>
        </main>
    );
}
