import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax for text
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, 100]);

    // 3D Tilt Effect logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]));
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]));

    // --- RECRUITER MODE ---
    if (isRecruiterMode) {
        return (
            <section className="min-h-[60vh] flex items-center justify-center bg-dark">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl font-bold text-white mb-4">Hassan Muhammad</h1>
                    <h2 className="text-2xl text-indigo-400 mb-6">Senior Frontend Engineer</h2>
                    <p className="text-lg text-neutral-400 max-w-2xl">
                        Building accessible, pixel-perfect web experiences.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section ref={containerRef} className="relative min-h-screen w-full bg-[#050505] text-white flex items-center overflow-hidden pt-20">

            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Column: Typography */}
                <motion.div style={{ y: y1 }} className="space-y-8">

                    {/* Status Pill */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Available for work</span>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-[12vw] lg:text-[7vw] leading-[0.9] font-black font-heading tracking-tighter">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500">HASSAN</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-neutral-400 to-neutral-800">MUHAMMAD</span>
                        </h1>
                    </div>

                    <p className="text-lg md:text-xl text-neutral-400 max-w-md leading-relaxed">
                        Creative Developer & UI Designer crafting immersive digital experiences that blur the line between art and engineering.
                    </p>

                    <div className="flex items-center gap-4 pt-4">
                        <MagneticButton>
                            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors">
                                View Projects
                            </button>
                        </MagneticButton>
                        <div className="flex gap-4 px-6">
                            <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Github /></a>
                            <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Linkedin /></a>
                            <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Mail /></a>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: 3D Visual */}
                <motion.div
                    style={{ y: y2 }}
                    className="relative flex justify-center lg:justify-end"
                >
                    <motion.div
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="relative w-full max-w-md aspect-[4/5] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
                    >
                        {/* Inner Image/Content */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-overlay"
                            style={{
                                backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000')",
                                transform: "translateZ(-50px)"
                            }}
                        />

                        {/* Overlay Text inside card */}
                        <div className="absolute bottom-8 left-8 right-8 transform translate-z-20" style={{ transform: "translateZ(50px)" }}>
                            <div className="h-px w-full bg-white/20 mb-4" />
                            <div className="flex justify-between items-end">
                                <span className="text-xl font-bold font-heading">LATEST<br />WORK</span>
                                <ArrowDown className="text-indigo-400 -rotate-45" />
                            </div>
                        </div>

                        {/* Floating elements */}
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/30 rounded-full blur-3xl"
                            style={{ transform: "translateZ(20px)" }}
                        />
                    </motion.div>
                </motion.div>

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <ArrowDown className="text-neutral-700" size={24} />
            </div>

        </section>
    );
};
