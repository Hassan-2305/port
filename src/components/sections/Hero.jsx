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
    const ringMatRef = useRef(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Primary Y-axis rotation: slow, continuous spin (0.1 rad/s)
        if (sphereRef.current) {
            sphereRef.current.rotation.y = t * 0.1;
            // Secondary X-axis oscillation: gentle tilt via sine wave
            sphereRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
        }

        // Ring counter-rotation at half sphere speed for visual contrast
        if (ringRef.current) {
            ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.1;
            ringRef.current.rotation.y = t * 0.05;
        }

        // Gold ring pulsing glow: sine wave creates rhythmic emissive (period ~12.6s)
        if (ringMatRef.current) {
            ringMatRef.current.emissiveIntensity = 0.5 + Math.sin(t * 0.5) * 0.2;
        }
    });

    return (
        <group position={[0, 0, 0]}>

            {/* 1. THE OBSIDIAN SPHERE */}
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh ref={sphereRef} scale={[2, 2, 2]}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshPhysicalMaterial
                        color="#101015"
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
                    ref={ringMatRef}
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
            {/* Main key light: brighter, wider angle */}
            <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} color="#ffffff" />
            {/* Blue rim: softened */}
            <spotLight position={[-10, 0, -5]} angle={0.5} penumbra={1.5} intensity={1.5} color="#4f46e5" />
            {/* Gold rim: softened */}
            <spotLight position={[5, -5, 5]} angle={0.5} penumbra={1.5} intensity={1.5} color="#fbbf24" />

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

    // Text rotation synced to monolith rhythm (~3s cycle)
    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % texts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // --- RECRUITER MODE — Professional Profile Card ---
    if (isRecruiterMode) {
        return (
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="min-h-screen flex items-center justify-center bg-dark relative overflow-hidden"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>

                <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
                        <div className="flex flex-col md:flex-row items-start gap-8">

                            {/* Avatar / Profile Initials */}
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 flex-shrink-0">
                                <span className="text-4xl md:text-5xl font-heading font-bold text-indigo-400">MH</span>
                            </div>

                            <div className="flex-1 space-y-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Mohammed Hassan</h1>
                                        <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono rounded-full uppercase tracking-wider">
                                            Available for Hire
                                        </span>
                                    </div>
                                    <p className="text-xl text-indigo-200 font-medium">Full Stack Creative Developer</p>
                                </div>

                                <p className="text-neutral-300 leading-relaxed text-lg max-w-2xl">
                                    I build high-performance, interactive web experiences.
                                    Specializing in <strong>React, Next.js, and WebGL</strong>, I bridge the gap between design and engineering to deliver polished, user-centric products.
                                </p>

                                <div className="flex flex-wrap gap-4 pt-2">
                                    <a
                                        href="/resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-2"
                                    >
                                        Download Resume
                                    </a>
                                    <a
                                        href="mailto:mohammedhassan2305@gmail.com"
                                        className="px-6 py-3 bg-white/5 text-white border border-white/10 font-medium rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        Contact Me
                                    </a>
                                </div>

                                <div className="flex gap-6 pt-4 border-t border-white/10">
                                    <a href="https://github.com/Hassan-2305" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                                        <Github size={18} /> GitHub
                                    </a>
                                    <a href="https://www.linkedin.com/in/mohamhassan/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                                        <Linkedin size={18} /> LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        );
    }

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-sans">

            <div className="absolute inset-0 z-0">
                <Canvas frameloop={isInView ? "always" : "never"} camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 1.5]}>
                    <color attach="background" args={['#060608']} />
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
                        <div className="flex items-center gap-4 pointer-events-auto">
                            <a href="https://github.com/Hassan-2305" target="_blank" rel="noopener noreferrer" aria-label="View my GitHub profile" className="text-white/40 hover:text-white hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">
                                <Github size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/mohamhassan/" target="_blank" rel="noopener noreferrer" aria-label="View my LinkedIn profile" className="text-white/40 hover:text-white hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">
                                <Linkedin size={20} />
                            </a>
                            <a href="mailto:mohammedhassan2305@gmail.com" aria-label="Send me an email" className="text-white/40 hover:text-white hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">
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
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col">
                            <span className="text-white/40 text-xs font-mono tracking-widest uppercase -mb-1">
                                Hi, I'm
                            </span>
                            <h1 className="text-6xl md:text-9xl font-heading font-bold text-white tracking-tighter uppercase leading-none mix-blend-difference">
                                HASSAN
                            </h1>
                        </div>
                        <div className="inline-flex items-center gap-1 text-base md:text-xl font-light tracking-wide text-white/60 whitespace-nowrap">
                            <span>I</span>
                            <div className="relative h-6 md:h-7 overflow-hidden flex items-center">
                                {/* Ghost element to maintain width based on longest word */}
                                <span className="opacity-0 font-bold">develop</span>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={textIndex}
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "-100%" }}
                                        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                                        className="absolute left-0 font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 truncate"
                                    >
                                        {texts[textIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                            <span>things for the web.</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-8">
                        <div className="pointer-events-auto relative group">
                            {/* Human Touch Annotation */}
                            <div className="hidden md:block absolute -top-14 -left-8 pointer-events-none">
                                <div className="relative">
                                    <span className="absolute -top-6 -left-4 w-max text-white/90 font-handwriting text-xl rotate-3">
                                        Check this out! ✨
                                    </span>
                                    <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-x-8">
                                        <path d="M10 5 C 20 15, 30 25, 40 35" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
                                        <path d="M40 35 L 33 30 M 40 35 L 36 27" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                            <MagneticButton>
                                <button
                                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                    aria-label="Explore my work and projects"
                                    className="px-8 py-3 border border-white/10 bg-white/5 backdrop-blur-md rounded-full text-white/80 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
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
                    aria-hidden="true"
                >
                    <ChevronDown size={24} />
                </motion.div>
            </div>

        </section>
    );
};
