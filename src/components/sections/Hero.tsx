import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, type Variants } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { ArrowRight, Download, ArrowDown } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

export const Hero: React.FC = () => {
    const { isRecruiterMode, animationDuration } = useMode();
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll Physics for Normal Mode
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const skewX = useTransform(smoothVelocity, [-1000, 1000], [-15, 15]); // Velocity skew effect

    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    // Recruiter Mode Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: animationDuration.fast, ease: "easeInOut" }
        }
    };

    // --- RECRUITER MODE LAYOUT ---
    if (isRecruiterMode) {
        return (
            <section className="min-h-[60vh] py-20 flex items-center justify-center">
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl"
                    >
                        <motion.div variants={itemVariants} className="mb-6">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm font-medium text-indigo-300">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                Ready to deploy
                            </span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="font-heading font-bold text-6xl leading-[0.9] tracking-tight mb-8 text-white">
                            Senior Frontend Engineer. <br />
                            <span className="text-neutral-500">Performance Obsessed.</span>
                        </motion.h1>

                        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                                View Projects
                            </button>
                            <button className="border border-white/10 hover:bg-white/5 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                                <Download className="w-4 h-4" /> Resume
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        );
    }

    // --- NORMAL MODE (PREMIUM) ---
    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">

            {/* Background Visuals */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <motion.div style={{ y: y1, scale, opacity }} className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] bg-indigo-600/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[20%] left-[10%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[120px]" />
                </motion.div>
                {/* Grid Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            <div className="container mx-auto px-6 relative z-10 pt-32">
                {/* Massive Typography */}
                <div className="flex flex-col gap-0 uppercase font-heading font-bold text-[12vw] leading-[0.85] tracking-tighter text-white mix-blend-difference">
                    <motion.div style={{ x: -50 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                        Creative
                    </motion.div>
                    <motion.div style={{ skewX, x: 50 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white">
                        Developer
                    </motion.div>
                </div>

                {/* Floating Intro Card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-12 max-w-lg"
                >
                    <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed">
                        Crafting <span className="text-white font-medium">digital experiences</span> with specific focus on motion, interactivity, and accessibility.
                    </p>

                    <div className="flex gap-6 mt-8">
                        <MagneticButton>
                            <button className="flex items-center gap-2 text-white hover:text-indigo-400 transition-colors uppercase tracking-widest text-xs font-bold">
                                My Work <ArrowRight className="w-4 h-4" />
                            </button>
                        </MagneticButton>
                        <MagneticButton>
                            <button className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">
                                Contact Me
                            </button>
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 right-8 mix-blend-difference z-20 hidden md:block"
            >
                <MagneticButton strength={0.2}>
                    <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-white">
                        <span>Scroll to explore</span>
                        <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
                </MagneticButton>
            </motion.div>
        </section>
    );
};
