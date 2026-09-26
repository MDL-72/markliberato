'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

/* A five-scene daily loop: skate, code, hoop, lift, sleep. Each scene is a
   still that cross-fades and slowly pushes in, with pointer parallax and rain
   on the window scenes. The first scene is also the section background, so the
   composition is complete before scripts run, with reduced motion, and with
   scripting off. The scenes are decorative: aria-hidden, no controls except the
   scene labels. */
const SCENES = [
    { id: 'skate', label: 'Skate', src: '/hero/scene-skate.jpg', rain: false, glow: false, pos: '60% 78%', posM: '80% 60%' },
    { id: 'code', label: 'Code', src: '/hero/scene-code.jpg', rain: true, glow: true, pos: '60% 50%', posM: '78% 40%' },
    { id: 'hoop', label: 'Hoop', src: '/hero/scene-hoop.jpg', rain: false, glow: false, pos: '55% 12%', posM: '58% 30%' },
    { id: 'gym', label: 'Lift', src: '/hero/scene-gym.jpg', rain: false, glow: false, pos: '55% 80%', posM: '62% 55%' },
    { id: 'sleep', label: 'Sleep', src: '/hero/scene-sleep.jpg', rain: true, glow: false, pos: '65% 50%', posM: '80% 40%' },
] as const;

const SCENE_MS = 6000;

type Drop = { x: number; y: number; len: number; speed: number };

export default function CinematicHero({ name, role, tagline }: { name: string; role: string; tagline: string }) {
    const sceneRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rainRef = useRef(false);
    const [index, setIndex] = useState(0);
    const [reduced, setReduced] = useState(false);
    const [tick, setTick] = useState(0); // bumped on a manual pick to restart the timer

    rainRef.current = SCENES[index].rain;

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduced(mq.matches);
        const onChange = () => setReduced(mq.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    useEffect(() => {
        if (reduced) return;
        const id = window.setInterval(() => {
            if (!document.hidden) setIndex((i) => (i + 1) % SCENES.length);
        }, SCENE_MS);
        return () => window.clearInterval(id);
    }, [reduced, tick]);

    useEffect(() => {
        const scene = sceneRef.current;
        const canvas = canvasRef.current;
        if (!scene || !canvas) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
        const ctx = canvas.getContext('2d');
        let raf = 0;
        let drops: Drop[] = [];
        let w = 0;
        let h = 0;
        let tx = 0;
        let ty = 0;
        let cx = 0;
        let cy = 0;

        const resize = () => {
            const r = scene.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = r.width;
            h = r.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = Math.round((w * h) / 9000);
            drops = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                len: 8 + Math.random() * 14,
                speed: 6 + Math.random() * 8,
            }));
        };

        const onMove = (e: PointerEvent) => {
            tx = (e.clientX / window.innerWidth - 0.5) * 2;
            ty = (e.clientY / window.innerHeight - 0.5) * 2;
        };

        const frame = () => {
            cx += (tx - cx) * 0.05;
            cy += (ty - cy) * 0.05;
            scene.style.setProperty('--px', cx.toFixed(3));
            scene.style.setProperty('--py', cy.toFixed(3));

            if (ctx) {
                ctx.clearRect(0, 0, w, h);
                if (rainRef.current) {
                    ctx.strokeStyle = 'rgba(170, 200, 230, 0.22)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    for (const d of drops) {
                        ctx.moveTo(d.x, d.y);
                        ctx.lineTo(d.x - d.len * 0.12, d.y + d.len);
                        d.y += d.speed;
                        d.x -= d.speed * 0.12;
                        if (d.y > h) {
                            d.y = -d.len;
                            d.x = Math.random() * w + 20;
                        }
                    }
                    ctx.stroke();
                }
            }
            raf = requestAnimationFrame(frame);
        };

        const start = () => {
            cancelAnimationFrame(raf);
            scene.style.setProperty('--px', '0');
            scene.style.setProperty('--py', '0');
            ctx?.clearRect(0, 0, w, h);
            if (reduce.matches) return;
            raf = requestAnimationFrame(frame);
        };

        const onVisibility = () => {
            if (document.hidden) cancelAnimationFrame(raf);
            else start();
        };

        resize();
        start();
        window.addEventListener('resize', resize);
        window.addEventListener('pointermove', onMove);
        document.addEventListener('visibilitychange', onVisibility);
        reduce.addEventListener('change', start);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('visibilitychange', onVisibility);
            reduce.removeEventListener('change', start);
        };
    }, []);

    return (
        <section className="reel" aria-labelledby="hero-title">
            <div ref={sceneRef} className="reel-scene" aria-hidden="true">
                {SCENES.map((s, i) => (
                    <div
                        key={s.id}
                        className="reel-layer"
                        data-active={i === index}
                        style={{ '--pos': s.pos, '--pos-m': s.posM } as CSSProperties}
                    >
                        <div className="reel-image">
                            <Image src={s.src} alt="" fill priority={i === 0} sizes="100vw" />
                        </div>
                    </div>
                ))}
                {SCENES[index].glow && <div className="reel-glow" />}
                <canvas ref={canvasRef} className="reel-rain" />
            </div>
            <div className="reel-scrim" aria-hidden="true" />
            <div className="reel-inner">
                <h1 id="hero-title">{name}</h1>
                <p className="reel-role mono">{role}</p>
                <p className="reel-tagline">{tagline}</p>
                <div className="reel-actions">
                    <Link className="reel-cta" href="#work">
                        View selected work
                    </Link>
                    <Link className="reel-ghost" href="#contact">
                        Get in touch
                    </Link>
                </div>
            </div>
            <ol className="reel-loop" aria-label="Daily loop">
                {SCENES.map((s, i) => (
                    <li key={s.id}>
                        <button
                            type="button"
                            className="reel-loop-btn"
                            aria-current={i === index}
                            onClick={() => {
                                setIndex(i);
                                setTick((t) => t + 1);
                            }}
                        >
                            {s.label}
                        </button>
                    </li>
                ))}
                <li aria-hidden="true" className="reel-loop-repeat">
                    ↻
                </li>
            </ol>
        </section>
    );
}
