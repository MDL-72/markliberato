'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';

type Easing = 'linear' | 'ease-out' | 'ease-in-out';

/** The documented defaults. Reset restores exactly these. */
const DEFAULTS = { progress: 0, depth: 60, separation: 55, easing: 'ease-out' as Easing };

/** One pass of the sequence. It plays once and stops; it never loops. */
const DURATION_MS = 8000;
/** Fraction of the remaining gap still left after one second of settling. */
const REMAINING_PER_SECOND = 0.0001;
/** Close enough to snap, so the frame loop can end instead of easing forever. */
const SETTLED = 0.0005;

const EASINGS: Record<Easing, (t: number) => number> = {
    linear: (t) => t,
    'ease-out': (t) => 1 - Math.pow(1 - t, 3),
    'ease-in-out': (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
};

function vars(progress: number, easing: Easing = DEFAULTS.easing): CSSProperties {
    return {
        '--p': EASINGS[easing](progress).toFixed(4),
        '--depth': String(DEFAULTS.depth),
        '--sep': String(DEFAULTS.separation),
    } as CSSProperties;
}

/**
 * The artwork itself. Plain elements driven entirely by --p, --depth and --sep,
 * so the same markup serves the live exhibit and the static fallbacks.
 */
function Composition() {
    return (
        <div className="dm-space">
            <div className="dm-field" />
            <div className="dm-panel dm-panel-back">
                <span className="dm-bar" />
                <span className="dm-bar dm-bar-short" />
            </div>
            <div className="dm-panel dm-panel-mid">
                <span className="dm-bar" />
                <span className="dm-bar dm-bar-short" />
            </div>
            <div className="dm-subject">
                <div className="dm-subject-head">
                    <span className="dm-dot" />
                    <span className="dm-rule" />
                </div>
                <div className="dm-subject-body">
                    <span className="dm-bar" />
                    <span className="dm-bar dm-bar-short" />
                    <div className="dm-meter">
                        <i style={{ height: '38%' }} />
                        <i style={{ height: '72%' }} />
                        <i style={{ height: '54%' }} />
                        <i style={{ height: '88%' }} />
                    </div>
                </div>
            </div>
            <div className="dm-chip dm-chip-a" />
            <div className="dm-chip dm-chip-b" />
        </div>
    );
}

function Stage({ progress, easing, label }: { progress: number; easing?: Easing; label: string }) {
    return (
        <div className="dm-stage" style={vars(progress, easing)} role="img" aria-label={label}>
            <Composition />
        </div>
    );
}

const STAGE_LABEL =
    'A layered composition: two angled surfaces, a central panel and two foreground fragments that separate in depth at the start of the timeline and align into a flat, readable arrangement at the end.';

export default function DepthMotion({ variant = 'full' }: { variant?: 'full' | 'preview' }) {
    const stageRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLInputElement>(null);
    const depthRef = useRef<HTMLInputElement>(null);
    const sepRef = useRef<HTMLInputElement>(null);
    const easingSelectRef = useRef<HTMLSelectElement>(null);
    const progressLabelRef = useRef<HTMLSpanElement>(null);
    const depthLabelRef = useRef<HTMLSpanElement>(null);
    const sepLabelRef = useRef<HTMLSpanElement>(null);

    /* Progress, depth and separation change on every frame or every pointer move.
       They live in refs and are written straight to CSS custom properties, so a
       drag or a playthrough never queues a React render. */
    const targetRef = useRef(DEFAULTS.progress);
    const shownRef = useRef(DEFAULTS.progress);
    const easingRef = useRef<Easing>(DEFAULTS.easing);
    const playingRef = useRef(false);
    const reducedRef = useRef(false);
    const frameRef = useRef(0);
    const lastRef = useRef(0);

    // Only genuinely discrete state renders: whether the sequence is running,
    // and whether the system is asking for reduced motion.
    const [playing, setPlaying] = useState(false);
    const [reduced, setReduced] = useState(false);

    const paint = useCallback(() => {
        const stage = stageRef.current;
        if (!stage) return;
        const eased = EASINGS[easingRef.current](shownRef.current);
        stage.style.setProperty('--p', eased.toFixed(4));
        if (progressLabelRef.current) {
            progressLabelRef.current.textContent = `${Math.round(shownRef.current * 100)}%`;
        }
    }, []);

    const stop = useCallback(() => {
        playingRef.current = false;
        setPlaying(false);
    }, []);

    const tick = useCallback(
        (now: number) => {
            frameRef.current = 0;
            const dt = lastRef.current ? Math.min(64, now - lastRef.current) : 16.7;
            lastRef.current = now;
            let more: boolean;

            if (playingRef.current) {
                targetRef.current = Math.min(1, targetRef.current + dt / DURATION_MS);
                // Playback is itself the motion, so it drives the shown value directly
                // rather than being chased by the smoother.
                shownRef.current = targetRef.current;
                if (sliderRef.current) sliderRef.current.value = String(Math.round(targetRef.current * 100));
                if (targetRef.current >= 1) {
                    stop();
                    more = false;
                } else {
                    more = true;
                }
            } else {
                // Scrubbing arrives in coarse steps, so the composition eases toward
                // the slider instead of snapping to it.
                const wanted = targetRef.current;
                shownRef.current += (wanted - shownRef.current) * (1 - Math.pow(REMAINING_PER_SECOND, dt / 1000));
                if (Math.abs(wanted - shownRef.current) < SETTLED) shownRef.current = wanted;
                more = shownRef.current !== wanted;
            }

            paint();
            if (more) frameRef.current = window.requestAnimationFrame(tick);
            else lastRef.current = 0;
        },
        [paint, stop],
    );

    const schedule = useCallback(() => {
        // Reduced motion gets the value with no smoothing and no frame loop at all.
        if (reducedRef.current) {
            shownRef.current = targetRef.current;
            paint();
            return;
        }
        if (frameRef.current) return;
        lastRef.current = 0;
        frameRef.current = window.requestAnimationFrame(tick);
    }, [paint, tick]);

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const syncMotion = () => {
            reducedRef.current = media.matches;
            setReduced(media.matches);
            if (media.matches) {
                // Takes effect mid-use: any running sequence ends here.
                playingRef.current = false;
                setPlaying(false);
                if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
                frameRef.current = 0;
                lastRef.current = 0;
                shownRef.current = targetRef.current;
                paint();
            }
        };
        const onHidden = () => {
            if (document.hidden && playingRef.current) stop();
        };

        syncMotion();
        media.addEventListener('change', syncMotion);
        document.addEventListener('visibilitychange', onHidden);
        return () => {
            media.removeEventListener('change', syncMotion);
            document.removeEventListener('visibilitychange', onHidden);
            playingRef.current = false;
            if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
            frameRef.current = 0;
        };
    }, [paint, stop]);

    const play = () => {
        if (reducedRef.current) return;
        // Finishing at the end and pressing Play again starts a fresh pass.
        if (targetRef.current >= 1) {
            targetRef.current = 0;
            shownRef.current = 0;
            if (sliderRef.current) sliderRef.current.value = '0';
        }
        playingRef.current = true;
        setPlaying(true);
        schedule();
    };

    const pause = () => {
        stop();
        lastRef.current = 0;
    };

    const setNumber = (name: '--depth' | '--sep', value: number, label: HTMLSpanElement | null) => {
        stageRef.current?.style.setProperty(name, String(value));
        if (label) label.textContent = String(value);
    };

    const reset = () => {
        stop();
        targetRef.current = DEFAULTS.progress;
        easingRef.current = DEFAULTS.easing;
        if (sliderRef.current) sliderRef.current.value = String(DEFAULTS.progress * 100);
        if (depthRef.current) depthRef.current.value = String(DEFAULTS.depth);
        if (sepRef.current) sepRef.current.value = String(DEFAULTS.separation);
        if (easingSelectRef.current) easingSelectRef.current.value = DEFAULTS.easing;
        setNumber('--depth', DEFAULTS.depth, depthLabelRef.current);
        setNumber('--sep', DEFAULTS.separation, sepLabelRef.current);
        schedule();
    };

    return (
        <div className="dm">
            <div
                ref={stageRef}
                className="dm-stage"
                style={vars(DEFAULTS.progress)}
                role="img"
                aria-label={STAGE_LABEL}
            >
                <Composition />
            </div>

            <div className="dm-app">
                <div className="dm-controls">
                    <div className="dm-timeline">
                        <label htmlFor={`dm-progress-${variant}`}>Timeline</label>
                        <input
                            id={`dm-progress-${variant}`}
                            ref={sliderRef}
                            type="range"
                            min={0}
                            max={100}
                            step={1}
                            defaultValue={DEFAULTS.progress * 100}
                            onInput={(event) => {
                                if (playingRef.current) pause();
                                targetRef.current = event.currentTarget.valueAsNumber / 100;
                                schedule();
                            }}
                        />
                        <span className="dm-value" ref={progressLabelRef}>
                            0%
                        </span>
                    </div>

                    <div className="dm-buttons">
                        {!reduced &&
                            (playing ? (
                                <button type="button" onClick={pause}>
                                    Pause
                                </button>
                            ) : (
                                <button type="button" onClick={play}>
                                    Play
                                </button>
                            ))}
                        <button type="button" onClick={reset}>
                            Reset
                        </button>
                        {variant === 'preview' && (
                            <Link className="dm-open" href="/lab/motion">
                                Open the full experiment
                            </Link>
                        )}
                    </div>

                    {variant === 'full' && (
                        <div className="dm-adjust">
                            <div className="dm-adjust-row">
                                <label htmlFor="dm-depth">Depth</label>
                                <input
                                    id="dm-depth"
                                    ref={depthRef}
                                    type="range"
                                    min={0}
                                    max={100}
                                    step={1}
                                    defaultValue={DEFAULTS.depth}
                                    onInput={(event) =>
                                        setNumber('--depth', event.currentTarget.valueAsNumber, depthLabelRef.current)
                                    }
                                />
                                <span className="dm-value" ref={depthLabelRef}>
                                    {DEFAULTS.depth}
                                </span>
                            </div>
                            <div className="dm-adjust-row">
                                <label htmlFor="dm-sep">Separation</label>
                                <input
                                    id="dm-sep"
                                    ref={sepRef}
                                    type="range"
                                    min={0}
                                    max={100}
                                    step={1}
                                    defaultValue={DEFAULTS.separation}
                                    onInput={(event) =>
                                        setNumber('--sep', event.currentTarget.valueAsNumber, sepLabelRef.current)
                                    }
                                />
                                <span className="dm-value" ref={sepLabelRef}>
                                    {DEFAULTS.separation}
                                </span>
                            </div>
                            <div className="dm-adjust-row">
                                <label htmlFor="dm-easing">Easing</label>
                                <select
                                    id="dm-easing"
                                    ref={easingSelectRef}
                                    defaultValue={DEFAULTS.easing}
                                    onChange={(event) => {
                                        easingRef.current = event.currentTarget.value as Easing;
                                        paint();
                                    }}
                                >
                                    <option value="linear">linear</option>
                                    <option value="ease-out">ease-out</option>
                                    <option value="ease-in-out">ease-in-out</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {reduced && (
                        <p className="dm-note">
                            Your system asks for reduced motion, so playback and smoothing are switched off. The
                            timeline still moves the composition directly.
                        </p>
                    )}
                </div>
            </div>

            {/* No JavaScript: the layout stylesheet hides the controls above and reveals
                this block, so nothing inert is ever on screen. The sequence is shown as
                three fixed positions instead. */}
            <div className="dm-fallback dm-nojs">
                    <p>
                        This composition is normally scrubbed with a timeline. Without JavaScript it is shown at three
                        fixed positions: separated at the start, travelling in the middle, aligned at the end.
                    </p>
                    <div className="dm-frames">
                        {/* Linear, so the middle frame really is the midpoint of the
                            sequence rather than wherever the default easing lands. */}
                        <figure>
                            <Stage progress={0} easing="linear" label="Start: the surfaces are separated and angled." />
                            <figcaption>Start · separated</figcaption>
                        </figure>
                        <figure>
                            <Stage
                                progress={0.5}
                                easing="linear"
                                label="Middle: foreground and background travel at different rates."
                            />
                            <figcaption>Middle · travelling</figcaption>
                        </figure>
                        <figure>
                            <Stage progress={1} easing="linear" label="End: the layers align into a flat, readable composition." />
                            <figcaption>End · aligned</figcaption>
                        </figure>
                    </div>
            </div>
        </div>
    );
}
