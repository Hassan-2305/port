import React from 'react';
import { motion } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { ArrowDown, Globe, MoveRight } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();

    // --- RECRUITER MODE ---
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
        <section className="relative h-screen w-full bg-black text-white overflow-hidden flex flex-col justify-center items-center">

            {/* --- CINEMATIC BACKGROUND --- */}
            <div className="absolute inset-0 z-0">
                {/* Fallback Image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-color-dodge" />

                {/* Aurora Gradients */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 15, -15, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600 rounded-full blur-[150px] mix-blend-screen opacity-40"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, 100, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-purple-600 rounded-full blur-[180px] mix-blend-screen opacity-40"
                />

                {/* Grain Overlay */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
            </div>

            {/* --- HERO CONTENT --- */}
            <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">

                {/* Top Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest text-indigo-200">
                        Based in USA
                    </span>
                </motion.div>

                {/* Massive Typography */}
                <div className="relative">
                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[15vw] leading-[0.8] font-black font-heading tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 select-none mix-blend-overlay"
                    >
                        HASSAN
                    </motion.h1>
                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[15vw] leading-[0.8] font-black font-heading tracking-tighter text-transparent bg-clip-text bg-gradient-to-t from-white/80 to-white select-none relative z-20"
                    >
                        MUHAMMAD
                    </motion.h1>

                    {/* Floating Abstract Element */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[20%] right-[-5%] w-24 h-24 md:w-48 md:h-48 rounded-full border border-white/20 backdrop-blur-sm z-10 hidden md:block"
                    />
                </div>

                {/* Subtitle / Role */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 flex flex-col md:flex-row items-center gap-6 text-lg md:text-xl font-light text-neutral-300"
                >
                    <span>Creative Developer</span>
                    <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/30" />
                    <span>UI/UX Designer</span>
                    <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/30" />
                    <span>System Architect</span>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="mt-12"
                >
                    <MagneticButton>
                        <button className="group relative px-8 py-3 bg-white/10 hover:bg-white text-white hover:text-black rounded-full border border-white/10 transition-all duration-300 overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                                Explore Portfolio <MoveRight size={16} />
                            </span>
                        </button>
                    </MagneticButton>
                </motion.div>

            </div>

            {/* Bottom Layout - Info Corners */}
            <div className="absolute bottom-8 left-8 hidden md:flex flex-col gap-1 text-xs text-neutral-500 font-mono">
                <span>SCROLL TO EXPLORE</span>
                <ArrowDown size={14} className="animate-bounce" />
            </div>

            <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 text-xs text-neutral-500 font-mono">
                <Globe size={14} />
                <span>AVAILABLE FOR FREELANCE</span>
            </div>

        </section>
    );
};
