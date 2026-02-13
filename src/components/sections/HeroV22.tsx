import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════
// HERO V83: THE LIQUID METAL (Fluidity / Adaptability)
// ═══════════════════════════════════════════════════════

// ─── FERROFLUID BLOB ───
const Ferrofluid: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);

    useFrame((state) => {
        if (!materialRef.current) return;
        // Vary distortion over time to simulate magnetic pulses
        const t = state.clock.elapsedTime;
        materialRef.current.distort = 0.4 + Math.sin(t) * 0.2;
        materialRef.current.speed = 2 + Math.cos(t * 0.5);
    });

    return (
        <Icosahedron args={[1, 6]} scale={2.2}>
            <MeshDistortMaterial
                ref={materialRef}
                color="#e2e8f0" // Silver/White
                envMapIntensity={1}
                clearcoat={1}
                clearcoatRoughness={0}
                metalness={1}
                roughness={0}
                distort={0.4} // Strength of distortion
                speed={2} // Speed of distortion
            />
        </Icosahedron>
    );
};

// ─── LIGHTFORMERS (Studio Lighting) ───
const LightingSetup: React.FC = () => {
    return (
        <Environment resolution={512}>
            {/* Ceiling Light */}
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />

            {/* Side Lights (Cyan/Pink) for reflections */}
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} color="#06b6d4" />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} color="#ec4899" />

            {/* Rim Light */}
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} />
        </Environment>
    );
};

// ─── SCENE SETUP ───
const Scene: React.FC = () => {
    return (
        <>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <Ferrofluid />
            </Float>

            <LightingSetup />

            {/* Background */}
            <color attach="background" args={['#0f172a']} /> {/* Slate-900 */}

            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.7} mipmapBlur intensity={0.5} radius={0.4} />
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={0.8} />
                <ChromaticAberration offset={[0.002, 0.002]} /> {/* Subtle modern touch */}
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

    useEffect(() => {
        gsap.fromTo(titleRef.current, { opacity: 0, scale: 0.8, filter: "blur(10px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2, ease: "power4.out" });
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
        <section className="relative h-screen w-full bg-[#0f172a] overflow-hidden flex flex-col items-center justify-center font-sans">

            {/* 3D CANVAS */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 1.5]}>
                    <Scene />
                </Canvas>
            </div>

            {/* OVERLAY */}
            <div className="relative z-10 text-center pointer-events-none mix-blend-screen">
                <h1 ref={titleRef} className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-4 leading-none italic">
                    FLUID
                </h1>

                <p className="text-slate-300 text-sm md:text-lg uppercase tracking-[0.3em] font-light">
                    Adaptive Systems
                </p>
            </div>

            {/* CTA */}
            <div className="absolute bottom-16 z-20 pointer-events-auto">
                <MagneticButton>
                    <button className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm hover:bg-white hover:text-black transition-all duration-300">
                        Explore
                    </button>
                </MagneticButton>
            </div>

        </section>
    );
};
