import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Octahedron, MeshTransmissionMaterial, Torus, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise, Vignette, LensFlare } from '@react-three/postprocessing';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════
// HERO V95: THE PLATINUM PRISM (Precision / Jewelry)
// ═══════════════════════════════════════════════════════

// ─── THE JEWEL ───
const Jewel: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!meshRef.current || !ringRef.current) return;

        const time = state.clock.elapsedTime;

        // Complex, gem-like rotation
        meshRef.current.rotation.y = time * 0.2;
        meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;

        // Counter-rotating rings
        ringRef.current.rotation.y = -time * 0.1;
        ringRef.current.rotation.x = Math.cos(time * 0.3) * 0.2;
    });

    return (
        <group>
            {/* The Crystal Core */}
            <mesh ref={meshRef}>
                <octahedronGeometry args={[1.8, 0]} /> {/* 0 detail = sharp facets */}
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    thickness={3}
                    roughness={0}
                    transmission={1}
                    chromaticAberration={1.5} // Maximum Separation
                    anisotropy={0.5}
                    ior={2.4} // Diamond IOR
                    color="#ffffff"
                    distortion={0.1}
                    distortionScale={0.5}
                    temporalDistortion={0.1}
                />
            </mesh>

            {/* Platinum Rings */}
            <group ref={ringRef}>
                <Torus args={[2.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial
                        color="#e2e8f0" // Platinum/Silver
                        metalness={1}
                        roughness={0.1}
                        envMapIntensity={2}
                    />
                </Torus>
                <Torus args={[2.8, 0.01, 16, 100]} rotation={[0, 0, Math.PI / 4]}>
                    <meshStandardMaterial
                        color="#e2e8f0"
                        metalness={1}
                        roughness={0.1}
                        envMapIntensity={2}
                    />
                </Torus>
            </group>
        </group>
    );
};

// ─── SCENE SETUP ───
const Scene: React.FC = () => {
    return (
        <>
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.1}>
                <Jewel />
            </Float>

            {/* Sparkles for that jewelry ad feel */}
            <Sparkles count={50} scale={10} size={4} speed={0.4} opacity={0.5} color="#ffffff" />

            {/* High-Contrast Lighting */}
            <Environment preset="studio" />
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
            <spotLight position={[-10, -5, -10]} intensity={1} color="#a5f3fc" /> {/* Subtle cyan fill */}

            {/* Background */}
            <color attach="background" args={['#020202']} />

            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.8} mipmapBlur intensity={1} radius={0.8} />
                <Noise opacity={0.03} />
                <Vignette eskil={false} offset={0.1} darkness={0.8} />
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
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(titleRef.current,
            { opacity: 0, letterSpacing: "2em" },
            { opacity: 1, letterSpacing: "0.2em", duration: 2, ease: "power3.out" }
        ).fromTo(subtitleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 0.6, y: 0, duration: 1.5 },
            "-=1"
        );
    }, []);

    if (isRecruiterMode) {
        return (
            <section className="min-h-[60vh] flex items-center justify-center bg-dark">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl font-bold text-white mb-4">Hassan Muhammad</h1>
                </div>
            </section>
        );
    }

    return (
        <section className="relative h-screen w-full bg-[#020202] overflow-hidden flex flex-col items-center justify-center font-sans">

            {/* 3D CANVAS */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 7], fov: 35 }} dpr={[1, 1.5]} gl={{ toneMappingExposure: 1.5 }}>
                    <Scene />
                </Canvas>
            </div>

            {/* OVERLAY */}
            <div className="relative z-10 text-center pointer-events-none mix-blend-difference">
                <h1 ref={titleRef} className="text-4xl md:text-7xl font-light text-white tracking-widest uppercase mb-4">
                    Precision
                </h1>
                <p ref={subtitleRef} className="text-white/60 text-xs md:text-sm font-medium tracking-[0.3em] uppercase">
                    Engineering x Artistry
                </p>
            </div>

            {/* CTA */}
            <div className="absolute bottom-16 z-20 pointer-events-auto">
                <MagneticButton>
                    <button className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-light text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500">
                        View Portfolio
                    </button>
                </MagneticButton>
            </div>

        </section>
    );
};
