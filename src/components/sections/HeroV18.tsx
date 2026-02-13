import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════
// HERO V61: THE ETHEREAL FABRIC (Digital Silk)
// ═══════════════════════════════════════════════════════

// ─── THE SILK MESH ───
const SilkMesh: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();
    const noise3D = useMemo(() => createNoise3D(), []);
    const mousePos = useRef({ x: 0, y: 0 });

    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalized -1 to 1
            mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime * 0.5;
        const geometry = meshRef.current.geometry;
        const positionAttribute = geometry.attributes.position;

        // Parametric wave function + Noise
        for (let i = 0; i < positionAttribute.count; i++) {
            const x = positionAttribute.getX(i);
            const y = positionAttribute.getY(i);

            // Base wave
            let z = Math.sin(x * 2 + time) * 0.5 + Math.cos(y * 1.5 + time) * 0.5;

            // Add noise detail
            z += noise3D(x * 1.5, y * 1.5, time * 0.5) * 0.5;

            // Mouse Interaction: Push cloth away
            const dx = x - mousePos.current.x * 5; // Scale to world space approx
            const dy = y - mousePos.current.y * 5;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Repulsion force
            if (dist < 2) {
                const force = (2 - dist) * 0.5;
                z -= force;
            }

            positionAttribute.setZ(i, z);
        }

        positionAttribute.needsUpdate = true;
        geometry.computeVertexNormals();
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 4, 0, 0]}>
            <planeGeometry args={[10, 10, 64, 64]} />
            <meshPhysicalMaterial
                color="#2e0249"      // Deep Purple base
                emissive="#000000"
                roughness={0.2}      // Smooth
                metalness={0.6}      // Metallic sheen
                clearcoat={0.5}      // Top layer polish
                clearcoatRoughness={0.1}
                sheen={1}            // Velvet look
                sheenColor={new THREE.Color('#a78bfa')} // Violet sheen
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

// ─── SCENE SETUP ───
const Scene: React.FC = () => {
    return (
        <>
            <SilkMesh />

            <Environment preset="night" />

            {/* Dramatic Lighting */}
            <pointLight position={[5, 5, 5]} intensity={2} color="#f472b6" /> {/* Pink */}
            <pointLight position={[-5, 5, 5]} intensity={2} color="#3b82f6" /> {/* Blue */}
            <pointLight position={[0, -5, 2]} intensity={1} color="#ffffff" />  {/* Fill */}
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
        gsap.fromTo(titleRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }
        );
    }, []);

    if (isRecruiterMode) {
        return (
            <section className="min-h-[60vh] flex items-center justify-center bg-dark">
                <div className="container mx-auto px-6">
                    <h1 className="text-white text-5xl font-bold">Hassan Muhammad</h1>
                </div>
            </section>
        );
    }

    return (
        <section className="relative h-screen w-full bg-[#0f0518] overflow-hidden flex flex-col items-center justify-center">

            {/* 3D CANVAS */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]}>
                    <Scene />
                </Canvas>
            </div>

            {/* OVERLAY */}
            <div className="relative z-10 text-center pointer-events-none mix-blend-color-dodge">
                <h1 ref={titleRef} className="text-6xl md:text-[8rem] font-serif italic text-white/90 leading-none">
                    Ethereal<br />Touch
                </h1>
                <p className="mt-4 text-white/50 font-sans text-sm tracking-[0.3em] uppercase">
                    Digital Silk Simulation
                </p>
            </div>

            {/* CTA */}
            <div className="absolute bottom-12 z-20 pointer-events-auto">
                <MagneticButton>
                    <button className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0f0518] transition-all duration-500">
                        <span className="text-xl">↓</span>
                    </button>
                </MagneticButton>
            </div>

        </section>
    );
};
