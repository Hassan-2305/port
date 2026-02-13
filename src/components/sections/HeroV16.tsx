import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { ScrollControls, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════
// HERO V56: ALCHE STUDIO REPLICA (The Pyramid)
// ═══════════════════════════════════════════════════════

// ─── THE "A" (TETRAHEDRON) ───
const TheArtifact: React.FC = () => {
    const meshRef = useRef<THREE.Group>(null);
    const scroll = useScroll(); // From ScrollControls
    const mouseTarget = useRef({ x: 0, y: 0 });
    const { viewport } = useThree();

    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseTarget.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // 1. Mouse Rotation (Quaternion Lerp)
        const targetRotX = mouseTarget.current.y * 0.5;
        const targetRotY = mouseTarget.current.x * 0.5;

        // Base rotation
        meshRef.current.rotation.y += delta * 0.1;

        // Responsive Tilt
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, delta * 2);
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -targetRotY * 0.5, delta * 2);

        // 2. Scroll Interaction (Zoom / Parallax)
        // scroll.offset goes 0 -> 1
        const zoom = scroll.offset * 2; // Move 2 units closer
        meshRef.current.position.z = zoom;
        meshRef.current.rotation.y += scroll.offset * Math.PI; // Spin on scroll
    });

    const scale = Math.min(viewport.width, viewport.height) * 0.35;

    return (
        <group ref={meshRef} scale={scale}>
            {/* Primary Wireframe (The A) */}
            <mesh>
                <tetrahedronGeometry args={[1, 0]} />
                <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.8} />
            </mesh>

            {/* Inner Core (Solid) */}
            <mesh scale={0.4}>
                <tetrahedronGeometry args={[1, 0]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* Inner Kinetic Wireframe */}
            <mesh scale={0.6}>
                <tetrahedronGeometry args={[1, 0]} />
                <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.2} />
            </mesh>

            {/* Floating Debris */}
            <FloatingDebris />
        </group>
    );
};

const FloatingDebris: React.FC = () => {
    const ref = useRef<THREE.Points>(null);
    const count = 150;

    const [pos] = useState(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 2 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            p[i * 3 + 2] = r * Math.cos(phi);
        }
        return p;
    });

    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial color="#94a3b8" size={0.02} transparent opacity={0.4} />
        </points>
    );
};

// ─── SCENE SETUP ───
const Scene: React.FC = () => {
    return (
        <>
            <TheArtifact />

            {/* Post Processing */}
            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0} mipmapBlur intensity={0.5} radius={0.6} />
                <Noise opacity={0.15} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </>
    );
};

// ═══════════════════════════════════════════════════════
// UI COMPONENT
// ═══════════════════════════════════════════════════════

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const titleRef = useRef<HTMLHeadingElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.to(overlayRef.current, { opacity: 0, duration: 2, ease: "power2.inOut", delay: 0.5 })
            .fromTo(titleRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, "-=1.5");
    }, []);

    if (isRecruiterMode) {
        return (
            <section className="min-h-[60vh] flex items-center justify-center bg-dark">
                <h1 className="text-white">Recruiter Mode</h1>
            </section>
        );
    }

    return (
        <section className="relative h-[200vh] w-full bg-[#050505]">
            {/* 3D CANVAS (Sticky) */}
            <div className="sticky top-0 h-screen w-full">

                {/* BLUEPRINT GRID BACKGROUND */}
                <div
                    className="absolute inset-0 z-0 opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
                    }}
                />

                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
                    <ScrollControls pages={2} damping={0.2}>
                        <Scene />
                    </ScrollControls>
                </Canvas>

                {/* UI OVERLAY */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-12 pointer-events-none mix-blend-difference">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <span className="text-white font-mono text-xs tracking-widest uppercase">
                            Fig. 1 — Prototype
                        </span>
                        <span className="text-white font-mono text-xs tracking-widest uppercase">
                            [ Coordinates: 34.05, -118.24 ]
                        </span>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 ref={titleRef} className="text-8xl md:text-[10rem] font-bold text-white leading-[0.8] tracking-tighter" style={{ fontFamily: '"Inter", sans-serif' }}>
                                ALCHE<br /><span className="text-stroke text-transparent" style={{ WebkitTextStroke: '1px white' }}>TYPE</span>
                            </h1>
                        </div>
                        <div className="text-right">
                            <p className="text-white font-mono text-xs tracking-widest uppercase mb-2">Scroll to Zoom</p>
                            <div className="w-24 h-[1px] bg-white"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* INITIAL FADE OVERLAY */}
            <div ref={overlayRef} className="fixed inset-0 z-50 bg-[#050505] pointer-events-none"></div>

        </section>
    );
};
