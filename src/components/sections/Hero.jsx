import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

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
    const [textIndex, setTextIndex] = useState(0);
    const texts = ["design", "develop", "deploy"];
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { margin: "0px 0px -200px 0px", once: false });

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % texts.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    if (isRecruiterMode) {
        return (
            <section className="min-h-[60vh] flex items-center justify-center bg-dark">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl font-bold text-white mb-4">Mohammed Hassan</h1>
                </div>
            </section>
        );
    }

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-sans">

            <div className="absolute inset-0 z-0">
                <Canvas frameloop={isInView ? "always" : "never"} camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 1.5]}>
                    <color attach="background" args={['#0a0a0a']} />
                    <Scene />
                    <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={2 * Math.PI / 3} />
                </Canvas>
            </div>

            {/* UI LAYER */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 md:p-12 pointer-events-none selection:bg-indigo-500/30 selection:text-indigo-200">
                {/* TOP ROW */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-4">
                        <div className="text-white/40 text-[10px] font-mono tracking-widest uppercase">
                            Creative Developer
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="https://github.com/Hassan-2305" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/mohamhassan/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="mailto:mohammedhassan2305@gmail.com" className="text-white/40 hover:text-white transition-colors">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-white/60 text-[10px] font-mono tracking-widest uppercase">
                            Available
                        </span>
                    </div>
                </div>

                {/* BOTTOM ROW */}
                <div className="flex justify-between items-end w-full">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-6xl md:text-9xl font-heading font-bold text-white tracking-tighter uppercase leading-none mix-blend-difference">
                                HASSAN
                            </h1>
                            <div className="ml-1 md:ml-4 flex items-center gap-1.5 text-base md:text-xl font-light tracking-wide text-white/60">
                                <span>I</span>
                                <div className="relative h-6 w-20 md:w-24 overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={textIndex}
                                            initial={{ y: "100%" }}
                                            animate={{ y: 0 }}
                                            exit={{ y: "-100%" }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 truncate"
                                        >
                                            {texts[textIndex]}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                <span className="-ml-2">things for the web.</span>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-8">
                        <div className="pointer-events-auto relative group">
                            <MagneticButton>
                                <button
                                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-3 border border-white/10 bg-white/5 backdrop-blur-md rounded-full text-white/80 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                                >
                                    Explore Work
                                </button>
                            </MagneticButton>
                        </div>
                    </div>
                </div>

                {/* SCROLL INDICATOR */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20"
                >
                    <ChevronDown size={24} />
                </motion.div>
            </div>

        </section>
    );
};
