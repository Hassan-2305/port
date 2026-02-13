import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { ArrowDownRight } from 'lucide-react';

const heroItems = [
    {
        id: 1,
        title: "Frontend",
        subtitle: "Architecture & Performance",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000"
    },
    {
        id: 2,
        title: "Creative",
        subtitle: "WebGL & Interactions",
        image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=2000"
    },
    {
        id: 3,
        title: "Engineer",
        subtitle: "React & TypeScript",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=2000"
    }
];

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Preload images
    React.useEffect(() => {
        heroItems.forEach((item) => {
            const img = new Image();
            img.src = item.image;
        });
    }, []);

    // --- RECRUITER MODE (Keep simple) ---
    if (isRecruiterMode) {
        return (
            <section className="min-h-[60vh] flex items-center justify-center bg-dark">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl font-bold text-white mb-4">Senior Frontend Engineer</h1>
                    <p className="text-xl text-neutral-400 max-w-2xl">
                        Specializing in high-performance React applications and accessible design systems.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-white">

            {/* Background Image Transition */}
            <AnimatePresence mode="wait">
                {hoveredItem !== null && (
                    <motion.div
                        key={hoveredItem}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.4, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${heroItems.find(i => i.id === hoveredItem)?.image})` }}
                    />
                )}
            </AnimatePresence>

            {/* Grain Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            {/* Main Content Area */}
            <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">

                {/* Top Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-32 left-6 md:left-0 flex items-center gap-4"
                >
                    <div className="h-px w-12 bg-white/20" />
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                        Portfolio 2024
                    </span>
                </motion.div>

                {/* The Index / Menu */}
                <div className="flex flex-col gap-0">
                    {heroItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 + (index * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative cursor-pointer"
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            {/* Hover Reveal Title */}
                            <h2 className="text-[12vw] leading-[0.85] font-black font-heading tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neutral-600 to-neutral-600 group-hover:from-white group-hover:to-white transition-all duration-500">
                                {item.title}
                            </h2>

                            {/* Floating Subtitle (follows cursor logic conceptually, simplified here) */}
                            <div className="hidden md:flex absolute top-1/2 right-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center gap-4">
                                <span className="text-sm font-mono uppercase tracking-widest text-indigo-400">
                                    {item.subtitle}
                                </span>
                                <ArrowDownRight className="text-white" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-12 left-6 md:left-0 max-w-md"
                >
                    <p className="text-neutral-500 text-sm leading-relaxed">
                        Crafting immersive digital experiences with code and passion. <br />
                        Based in the cloud, available worldwide.
                    </p>
                </motion.div>

            </div>
        </section>
    );
};
