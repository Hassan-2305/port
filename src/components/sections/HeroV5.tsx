import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
        <section ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center">

            {/* --- VIDEO BACKGROUND LAYER --- */}
            <div className="absolute inset-0 z-0 opacity-60">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-110"
                >
                    {/* A high-quality abstract fluid/ink video */}
                    <source src="https://cdn.pixabay.com/video/2023/10/22/186115-877653483_large.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Cinematic Overlay (Darken) */}
            <div className="absolute inset-0 z-10 bg-black/50" />

            {/* Texture/Grain */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            {/* --- MASSIVE TYPOGRAPHY (MASK EFFECT) --- */}
            {/* We use mix-blend-mode: overlay/difference to make the text interact with the video */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-20 w-full px-4 md:px-12 flex flex-col items-center justify-center"
            >
                <div className="flex flex-col items-center leading-[0.85] tracking-tighter mix-blend-screen select-none">

                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[15vw] md:text-[12vw] font-black font-heading text-white text-center"
                    >
                        CREATIVE
                    </motion.h1>

                    <div className="flex items-center gap-4 md:gap-12 my-2 md:my-4 w-full justify-center">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 100 }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            className="h-[2px] md:h-[4px] bg-white opacity-50 hidden md:block"
                        />
                        <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="text-xs md:text-sm font-mono tracking-[0.5em] text-neutral-300 uppercase shrink-0 px-4 py-1 border border-white/20 rounded-full backdrop-blur-sm"
                        >
                            Select Portfolio 2024
                        </motion.span>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 100 }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            className="h-[2px] md:h-[4px] bg-white opacity-50 hidden md:block"
                        />
                    </div>

                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[15vw] md:text-[12vw] font-black font-heading text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 text-center"
                        style={{
                            WebkitTextStroke: "1px rgba(255,255,255,0.2)"
                        }}
                    >
                        DEVELOPER
                    </motion.h1>

                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-[-15vh] md:bottom-[-20vh] left-1/2 -translate-x-1/2"
                >
                    <ArrowDown className="text-white w-6 h-6 animate-bounce" />
                </motion.div>

            </motion.div>

        </section>
    );
};
