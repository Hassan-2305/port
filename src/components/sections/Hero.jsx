import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';

// ═══════════════════════════════════════════════════════
// HERO: THE OBSIDIAN MONOLITH (V4 / V44)
// ═══════════════════════════════════════════════════════


const MonolithScene = () => {
    const sphereRef = useRef(null);
    const ringRef = useRef(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Slow, heavy rotation
        if (sphereRef.current) {
            sphereRef.current.rotation.y = t * 0.1;
            sphereRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
        }

        // Ring counter-rotation
        if (ringRef.current) {
            ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.1;
            ringRef.current.rotation.y = t * 0.05;
        }
    });

    return (
        <group position={[0, 0, 0]}>

            {/* 1. THE OBSIDIAN SPHERE */}
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh ref={sphereRef} scale={[2, 2, 2]}>
                    <sphereGeometry args={[1, 128, 128]} />
                    <meshPhysicalMaterial
                        color="#000000"
                        roughness={0.1}
                        metalness={0.9}
                        clearcoat={1.0}
                        clearcoatRoughness={0.1}
                        reflectivity={1}
                        envMapIntensity={2.5}
                    />
                </mesh>
            </Float>

            {/* 2. THE GOLD TRIM RING */}
            <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[3.2, 0.02, 64, 256]} />
                <meshStandardMaterial
                    color="#ffcc00"
                    roughness={0.2}
                    metalness={1.0}
                    emissive="#ffaa00"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* 3. FLOATING DUST */}
            <group>
                {new Array(50).fill(0).map((_, i) => (
                    <mesh key={i} position={[
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 5
                    ]} scale={Math.random() * 0.03}>
                        <sphereGeometry args={[1, 8, 8]} />
                        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
                    </mesh>
                ))}
            </group>

            <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4} />
        </group>
    );
};


const Scene = () => {
    return (
        <>
            <MonolithScene />

            {/* STUDIO LIGHTING */}
            <Environment preset="studio" />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />
            <spotLight position={[-10, 0, -5]} angle={0.5} penumbra={1} intensity={2} color="#4f46e5" /> {/* Blue rim */}
            <spotLight position={[5, -5, 5]} angle={0.5} penumbra={1} intensity={2} color="#fbbf24" /> {/* Gold rim */}

            <EffectComposer enableNormalPass={false}>
                <Bloom luminanceThreshold={0.2} mipmapBlur intensity={0.5} radius={0.4} />
                <Noise opacity={0.06} />
                <Vignette eskil={false} offset={0.1} darkness={0.6} />
            </EffectComposer>
        </>
    );
};

export const Hero = () => {
    const { isRecruiterMode } = useMode();

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

            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 2]}>
                    <color attach="background" args={['#0a0a0a']} />
                    <Scene />
                    <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={2 * Math.PI / 3} />
                </Canvas>
            </div>

            {/* UI LAYER */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 md:p-12 pointer-events-none selection:bg-indigo-500/30 selection:text-indigo-200">
                {/* TOP ROW */}
                <div className="flex justify-between items-start">
                    <div className="text-white/40 text-[10px] font-mono tracking-widest uppercase">
                        Creative Technologist
                    </div>
                    <div className="text-white/40 text-[10px] font-mono tracking-widest uppercase text-right">
                        Status: Available
                    </div>
                </div>

                {/* BOTTOM ROW */}
                <div className="flex justify-between items-end">
                    <h1 className="text-6xl md:text-9xl font-heading font-bold text-white tracking-tighter uppercase leading-none mix-blend-difference">
                        HASSAN
                    </h1>

                    <div className="pointer-events-auto relative group">
                        <MagneticButton>
                            <button className="px-8 py-3 border border-white/10 bg-white/5 backdrop-blur-md rounded-full text-white/80 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                                Explore Work
                            </button>
                        </MagneticButton>

                        {/* Human Touch Annotation - Fixed Alignment */}
                        <div className="hidden md:block absolute top-1/2 right-full mr-6 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 w-max">
                            <div className="relative">
                                <span className="absolute -top-6 right-0 text-white/60 font-handwriting text-xl -rotate-6">
                                    Start the journey
                                </span>
                                <svg width="50" height="30" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-auto translate-y-1">
                                    <path d="M0 5 C 20 5, 30 15, 50 15" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" strokeDasharray="3 3" />
                                    <path d="M50 15 L 42 10 M 50 15 L 42 20" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};
