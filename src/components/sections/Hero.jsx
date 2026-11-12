import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import { Github, Linkedin, Mail, ChevronDown, Download } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { profile } from '../../data/profile';
import { SceneBoundary } from './SceneBoundary';

// HERO: THE OBSIDIAN MONOLITH
// three.js lives in a separate chunk — the text UI renders immediately.
const HeroScene = lazy(() => import('./HeroScene'));

const texts = ["design", "build", "ship"];

export const Hero = () => {
    const { isRecruiterMode } = useMode();
    const [textIndex, setTextIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { margin: "0px 0px -200px 0px", once: false });

    // Detect mobile to disable OrbitControls (which blocks touch scroll)
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Text rotation (~3s cycle)
    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % texts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // --- RECRUITER MODE (Swiss Design / Identity) ---
    if (isRecruiterMode) {
        return (
            <section id="home" className="min-h-screen bg-[#050505] text-white pt-32 pb-20 relative overflow-hidden font-sans">
                {/* Background Grid - Subtle Technical Feel */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                <div className="container mx-auto px-6 h-full flex flex-col justify-between relative z-10">

                    {/* Top: Identity Block */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left: Big Type Identity */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="block font-mono text-indigo-400 text-sm mb-4 tracking-widest uppercase">
                                    // mohammedhassan.tech
                                </span>

                                <h1 className="text-4xl sm:text-6xl md:text-9xl font-heading font-bold leading-[0.9] tracking-tighter mb-6 cursor-default">
                                    <span className="block">MOHAMMED</span>
                                    <span className="block text-neutral-400">HASSAN</span>
                                </h1>

                                <div className="inline-flex items-center gap-3 px-4 py-2 border border-green-500/20 bg-green-500/5 rounded-full mt-4">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="font-mono text-xs text-green-400 tracking-wider uppercase">
                                        Available for Hire
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: Pitch & Actions */}
                        <div className="lg:col-span-4 flex flex-col justify-end">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="space-y-8"
                            >
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold font-heading text-white">
                                        {profile.role}
                                        <span className="block text-base font-mono font-normal text-indigo-400 mt-1">{profile.focus}</span>
                                    </h2>
                                    <p className="text-neutral-300 leading-relaxed max-w-sm">
                                        I'm a second-year CSE student at CUSAT. Right now I'm teaching a model to transcribe <strong className="text-white">Malayalam legal speech</strong> (1.7% CER so far, on synthetic audio). Before that: a packaging marketplace, a trading platform, and <strong className="text-white">websites for the clubs I'm part of</strong>.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <a
                                        href={profile.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-indigo-500 transition-all hover:tracking-wide w-full md:w-auto"
                                    >
                                        <Download size={20} aria-hidden="true" />
                                        <span>DOWNLOAD RESUME</span>
                                    </a>

                                    <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                                        <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="text-neutral-400 hover:text-white transition-colors">
                                            <Github size={24} />
                                        </a>
                                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="text-neutral-400 hover:text-blue-400 transition-colors">
                                            <Linkedin size={24} />
                                        </a>
                                        <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} className="text-neutral-400 hover:text-indigo-400 transition-colors">
                                            <Mail size={24} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Bottom: Technical Footer */}
                    <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-mono text-neutral-400 uppercase tracking-wider pr-0 md:pr-28">
                        <div className="flex flex-wrap gap-x-8 gap-y-2">
                            <span>Loc: {profile.location} · Remote</span>
                            <span>B.Tech CSE · CUSAT · 2028</span>
                        </div>
                        <div className="flex gap-8">
                            <span>Stack: Python / PyTorch / Next.js / React</span>
                        </div>
                    </div>

                </div>
            </section>
        );
    }

    return (
        <section id="home" ref={containerRef} className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-sans">

            <div className="absolute inset-0 z-0" style={{ touchAction: 'pan-y' }}>
                <SceneBoundary>
                    <Suspense fallback={null}>
                        <HeroScene isInView={isInView} isMobile={isMobile} />
                    </Suspense>
                </SceneBoundary>
            </div>

            {/* UI LAYER */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 md:p-12 pointer-events-none selection:bg-indigo-500/30 selection:text-indigo-200">
                {/* TOP ROW */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-4">
                        <div className="text-white/60 text-xs font-mono tracking-widest uppercase">
                            {profile.role} · {profile.focus}
                        </div>
                        <div className="flex items-center gap-4 pointer-events-auto">
                            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="View my GitHub profile" className="text-white/60 hover:text-white hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">
                                <Github size={20} />
                            </a>
                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="View my LinkedIn profile" className="text-white/60 hover:text-white hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">
                                <Linkedin size={20} />
                            </a>
                            <a href={`mailto:${profile.email}`} aria-label="Send me an email" className="text-white/60 hover:text-white hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-white/70 text-xs font-mono tracking-widest uppercase">
                            Available
                        </span>
                    </div>
                </div>

                {/* BOTTOM ROW */}
                <div className="flex justify-between items-end w-full">
                    <div className="flex flex-col gap-0">
                        <div className="flex flex-col">
                            <span className="text-white/60 text-xs font-mono tracking-widest uppercase -mb-1 ml-2">
                                Hi, I'm
                            </span>
                            <h1 className="text-6xl md:text-9xl font-heading font-bold text-white tracking-tighter uppercase leading-none mix-blend-difference">
                                HASSAN
                            </h1>
                        </div>
                        <div className="inline-flex items-center gap-1 text-base md:text-xl font-light tracking-wide text-white/70 whitespace-nowrap ml-4">
                            <span>I</span>
                            <div className="relative h-6 md:h-7 overflow-hidden flex items-center">
                                {/* Ghost element to maintain width based on longest word */}
                                <span className="opacity-0 font-bold">design</span>
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
                            <span>web apps &amp; speech models.</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-8">
                        <div className="pointer-events-auto relative group">
                            {/* Human Touch Annotation */}
                            <div className="hidden md:block absolute -top-14 -left-8 pointer-events-none" aria-hidden="true">
                                <div className="relative">
                                    <span className="absolute -top-6 -left-4 w-max text-white/90 font-handwriting text-xl rotate-3">
                                        the good stuff ↓
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
                                    className="px-8 py-3 border border-white/10 bg-white/5 backdrop-blur-md rounded-full text-white/90 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
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
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
                    aria-hidden="true"
                >
                    <ChevronDown size={24} />
                </motion.div>
            </div>

        </section>
    );
};
