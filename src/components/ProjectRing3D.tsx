'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { useState } from 'react';
import { DoubleSide } from 'three';

export type RingPanel = { src: string; label: string };

const RADIUS = 3;
const PANEL_W = 3.4;
const PANEL_H = PANEL_W / 2;

function Panel({ src, angle, active, onPick }: { src: string; angle: number; active: boolean; onPick: () => void }) {
    const texture = useTexture(src);
    return (
        <mesh
            position={[Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS]}
            rotation={[0, angle, 0]}
            scale={active ? 1.12 : 1}
            onClick={(event) => {
                event.stopPropagation();
                onPick();
            }}
        >
            <planeGeometry args={[PANEL_W, PANEL_H]} />
            <meshBasicMaterial map={texture} side={DoubleSide} toneMapped={false} />
        </mesh>
    );
}

/**
 * Screenshots of real projects placed on a ring in true 3D space. Drag to orbit
 * it, click a panel to name it. The canvas renders on demand, so nothing runs
 * while the ring is at rest.
 */
export default function ProjectRing3D({ panels }: { panels: RingPanel[] }) {
    const [active, setActive] = useState<number | null>(null);
    return (
        <div className="td-stage">
            <Canvas frameloop="demand" camera={{ position: [0, 1.4, 6.2], fov: 42 }} dpr={[1, 2]}>
                {panels.map((panel, index) => (
                    <Panel
                        key={panel.src}
                        src={panel.src}
                        angle={(index / panels.length) * Math.PI * 2}
                        active={active === index}
                        onPick={() => setActive(index)}
                    />
                ))}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -PANEL_H / 2 - 0.2, 0]}>
                    <ringGeometry args={[RADIUS - 0.05, RADIUS + 0.05, 96]} />
                    <meshBasicMaterial color="#5eead4" side={DoubleSide} />
                </mesh>
                <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={0.9} maxPolarAngle={1.9} makeDefault />
            </Canvas>
            <p className="mono td-caption" aria-live="polite">
                {active === null ? 'Drag to rotate. Click a panel.' : panels[active].label}
            </p>
        </div>
    );
}
