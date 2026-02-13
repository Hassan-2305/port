import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { ArrowDown } from 'lucide-react';

const galleryImages = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
    "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=800&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80",
];

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -1000]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 1000]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -800]);

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
        <section ref={containerRef} className="relative h-[150vh] w-full bg-[#050505] overflow-hidden">

            {/* --- 3D WALL OF WORK --- */}
            <div className="absolute inset-x-0 top-[-20%] h-[140%] flex justify-center gap-4 md:gap-8 px-4 opacity-50 md:opacity-60 scale-110 md:scale-100"
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>

                {/* Column 1 (Up) */}
                <motion.div style={{ y: y1, rotateX: 20, rotateY: -10 }} className="flex flex-col gap-4 md:gap-8 w-1/3 md:w-1/4">
                    {galleryImages.map((src, i) => (
                        <div key={`c1-${i}`} className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                            <img src={src} className="w-full h-full object-cover" alt="Art" />
                        </div>
                    ))}
                </motion.div>

                {/* Column 2 (Down - Center) */}
                <motion.div style={{ y: y2, rotateX: 20 }} className="flex flex-col gap-4 md:gap-8 w-1/3 md:w-1/4 mt-[-200px]">
                    {galleryImages.reverse().map((src, i) => (
                        <div key={`c2-${i}`} className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                            <img src={src} className="w-full h-full object-cover" alt="Art" />
                        </div>
                    ))}
                </motion.div>

                {/* Column 3 (Up) */}
                <motion.div style={{ y: y3, rotateX: 20, rotateY: 10 }} className="flex flex-col gap-4 md:gap-8 w-1/3 md:w-1/4">
                    {galleryImages.map((src, i) => (
                        <div key={`c3-${i}`} className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                            <img src={src} className="w-full h-full object-cover" alt="Art" />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Gradient Overlay (Vignette) */}
            <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-10" />
            <div className="fixed inset-0 pointer-events-none bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10 opacity-80" />


            {/* --- HERO CONTENT (Minimal) --- */}
            <div className="fixed inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">

                <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.5em] text-neutral-400 mb-8 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5 bg-black/20">
                    Portfolio 2024
                </h2>

                <h1 className="text-6xl md:text-9xl font-black font-heading tracking-tighter text-white mix-blend-overlay text-center px-4">
                    SELECTED<br />WORKS
                </h1>

                <div className="mt-12 backdrop-blur-md bg-white/5 border border-white/10 px-8 py-4 rounded-full pointer-events-auto cursor-pointer hover:bg-white/10 transition-all group">
                    <span className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-3">
                        Enter Archive <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
                    </span>
                </div>

            </div>

        </section>
    );
};
