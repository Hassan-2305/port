import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Text, MeshDistortMaterial, Environment, Sphere, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════
// HERO V66: THE LIQUID CORE (Fluid / Adaptability)
// ═══════════════════════════════════════════════════════

// ─── LIQUID SPHERE ───
const LiquidChrome: React.FC = () => {
    const [hovered, setHovered] = useState(false);

    // Smoothly animate distortion using a ref frame loop or simple lerp via state isn't enough for smooth physics
    // Using a ref to store target value
    const materialRef = useRef<any>(null);

    useFrame((state, delta) => {
        if (materialRef.current) {
            // Lerp distortion amount
            const targetDistort = hovered ? 0.8 : 0.4;
            const targetSpeed = hovered ? 4 : 2;

            materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, delta * 2);
            materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetSpeed, delta * 2);
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Sphere args={[1.8, 64, 64]}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <MeshDistortMaterial
                        ref={materialRef}
                        color="#ffffff"
                        envMapIntensity={1}
                        clearcoat={1}
                        clearcoatRoughness={0}
                        metalness={1}
                        roughness={0}
                        distort={0.4}
                        speed={2}
                    />
                </Sphere>
            </Float>

            {/* Shadow to ground it */}
            <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#000000" />
        </group>
    );
};

// ─── SCENE SETUP ───
const Scene: React.FC = () => {
    return (
        <>
            <LiquidChrome />

            {/* High Quality Studio Lighting */}
            <Environment preset="studio" />

            {/* Directional Lights for dramatic highlights */}
            <directionalLight position={[-5, 5, 5]} intensity={4} color="#ffffff" />
            <directionalLight position={[5, -5, -5]} intensity={2} color="#00aaff" /> {/* Subtle blue fill */}

            {/* Background */}
            <color attach="background" args={['#050505']} />

            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.8} mipmapBlur intensity={0.5} radius={0.4} />
                <Noise opacity={0.05} />
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

    useEffect(() => {
        gsap.fromTo(titleRef.current, { opacity: 0, filter: "blur(10px)" }, { opacity: 1, filter: "blur(0px)", duration: 1.5, delay: 0.2 });
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
        <section className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-sans">

            {/* 3D CANVAS */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
                    <Scene />
                </Canvas>
            </div>

            {/* OVERLAY */}
            <div className="relative z-10 text-center pointer-events-none mix-blend-exclusion">
                <h1 ref={titleRef} className="text-7xl md:text-9xl font-bold text-white tracking-tighter mb-2 leading-none">
                    FLUID<br />STATE
                </h1>

                <p className="text-white/60 text-sm md:text-base tracking-[0.2em] uppercase font-light">
                    Adaptable Systems Engineering
                </p>
            </div>

            {/* CTA */}
            <div className="absolute bottom-16 z-20 pointer-events-auto">
                <MagneticButton>
                    <button className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all duration-300 rounded-full">
                        Explore
                    </button>
                </MagneticButton>
            </div>

        </section>
    );
};
