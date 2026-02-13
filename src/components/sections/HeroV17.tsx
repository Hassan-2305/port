import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════
// HERO V60: THE LIQUID METAL (Chrome Blob)
// ═══════════════════════════════════════════════════════

// ─── THE MOLTEN CORE ───
const MoltenCore: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const geometryRef = useRef<THREE.IcosahedronGeometry>(null); // Keep a ref to geometry
    const { viewport } = useThree();

    // Noise generator
    const noise3D = useMemo(() => createNoise3D(), []);

    // Store original positions for displacement calculation
    const originalPositions = useMemo(() => {
        // We need a geometry to exist first. 
        // We'll init this inside the component or just assume high detail icosahedron
        const geo = new THREE.IcosahedronGeometry(1, 64); // High detail for smooth waves
        return geo.attributes.position.array;
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime * 0.4;
        const geometry = meshRef.current.geometry;
        const positionAttribute = geometry.attributes.position;

        // Displace vertices
        for (let i = 0; i < positionAttribute.count; i++) {
            const p = new THREE.Vector3();
            p.fromBufferAttribute(positionAttribute, i);

            // Normalize to get direction from center
            const dir = p.clone().normalize();

            // Calculate noise value
            // Varied frequency for "liquid" look
            const noise = noise3D(dir.x * 1.5 + time, dir.y * 1.5 + time, dir.z * 1.5);

            // Displacement amount
            const displacement = 1 + noise * 0.3;

            // Apply new position
            dir.multiplyScalar(displacement);
            positionAttribute.setXYZ(i, dir.x, dir.y, dir.z);
        }

        positionAttribute.needsUpdate = true;
        geometry.computeVertexNormals();

        // Slow rotation
        meshRef.current.rotation.y = time * 0.2;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={Math.min(viewport.width, viewport.height) * 0.25}>
                <icosahedronGeometry args={[1, 64]} />
                <meshPhysicalMaterial
                    color="#ffffff" // Base color of the metal
                    roughness={0}
                    metalness={1}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    reflectivity={1}
                    ior={2.5} // High IOR for gem/metal look
                />
            </mesh>
        </Float>
    );
};

// ─── SCENE SETUP ───
const Scene: React.FC = () => {
    return (
        <>
            <MoltenCore />

            {/* The Environment is what the Chrome Reflects */}
            <Environment preset="warehouse" />

            {/* Shadows to ground it */}
            <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#000000" />

            {/* Lights to catch edges */}
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" /> {/* Subtle blue underlight */}
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
        tl.fromTo(titleRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" })
            .fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 0.6, duration: 1 }, "-=1");
    }, []);

    if (isRecruiterMode) {
        return (
            <section className="min-h-[60vh] flex items-center justify-center bg-dark">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl font-bold text-white mb-4">Hassan Muhammad</h1>
                    <p className="text-xl text-neutral-400">Senior Frontend Engineer</p>
                </div>
            </section>
        );
    }

    return (
        <section className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center">

            {/* 3D CANVAS */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
                    <Scene />
                </Canvas>
            </div>

            {/* OVERLAY */}
            <div className="relative z-10 text-center pointer-events-none mix-blend-difference">
                <h1 ref={titleRef} className="text-6xl md:text-[10rem] font-bold text-white leading-none tracking-tighter mb-6" style={{ fontFamily: '"Inter", sans-serif' }}>
                    LIQUID<br />METAL
                </h1>

                <p ref={subtitleRef} className="text-white/60 text-sm md:text-base font-light uppercase tracking-[0.5em]">
                    Formless · Adaptive · Polished
                </p>
            </div>

            {/* CTA */}
            <div className="absolute bottom-20 z-20 pointer-events-auto">
                <MagneticButton>
                    <button className="px-10 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                        Explore
                    </button>
                </MagneticButton>
            </div>

            {/* GRAIN */}
            <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.05]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

        </section>
    );
};
