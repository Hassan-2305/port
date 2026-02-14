import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { ArrowUpRight } from 'lucide-react';

const projects = [
    {
        title: "AI Resume Tailor",
        category: "Generative AI",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
        year: "2026"
    },
    {
        title: "Open Source Connect",
        category: "UI/UX & Web Design",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
        year: "2024"
    },
    {
        title: "Tic-Tac-Toe Game",
        category: "Python / Pygame",
        image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=1000",
        year: "2025"
    },
    {
        title: "3D & UI Designs",
        category: "Figma & Blender",
        image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&q=80&w=1000",
        year: "2026"
    }
];

export const Projects = () => {
    const { isRecruiterMode, setCursorText, setCursorVariant } = useMode();
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    // --- RECRUITER MODE (Table View) ---
    if (isRecruiterMode) {
        return (
            <section id="projects" className="py-20 bg-dark">
                <div className="container mx-auto px-6">
                    <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        Select Projects
                    </h2>
                    <div className="grid gap-4">
                        {projects.map((project) => (
                            <div key={project.title} className="group flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-colors">
                                <div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                                    <p className="text-sm text-neutral-400">{project.category}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-mono text-neutral-500">{project.year}</span>
                                    <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // --- NORMAL MODE (Horizontal Scroll) ---
    return (
        <section id="projects" ref={targetRef} className="relative h-[300vh] bg-neutral-900">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-16 px-24 will-change-transform">
                    {/* Section Title Card */}
                    <div className="flex-shrink-0 w-max flex flex-col justify-center pr-12">
                        <h2 className="text-[8vw] leading-none font-bold font-heading text-neutral-800 uppercase">
                            Selected <br /> <span className="text-white">Works</span>
                        </h2>
                        <p className="mt-8 text-neutral-400 max-w-sm text-lg">
                            A collection of projects defined by high-performance code and immersive design.
                        </p>

                        <div className="mt-12 hidden md:block opacity-60 pointer-events-none">
                            <div className="relative">
                                <span className="absolute -top-6 left-0 w-max text-white/60 font-handwriting text-xl -rotate-2">
                                    Drag to explore
                                </span>
                                <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 15 H 80" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" strokeDasharray="4 4" />
                                    <path d="M80 15 L 70 10 M 80 15 L 70 20" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Project Cards */}
                    {projects.map((project) => (
                        <motion.div
                            key={project.title}
                            className="relative flex-shrink-0 w-[60vh] h-[70vh] group cursor-none"
                            onMouseEnter={() => {
                                setCursorText("View");
                                setCursorVariant("project");
                            }}
                            onMouseLeave={() => {
                                setCursorText("");
                                setCursorVariant("default");
                            }}
                        >
                            <div className="w-full h-full overflow-hidden rounded-md grayscale group-hover:grayscale-0 transition-all duration-700 ease-[0.16,1,0.3,1] relative">
                                <motion.img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transform transition-transform duration-1000"
                                    whileHover={{ scale: 1.1 }}
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            </div>

                            <div className="absolute -bottom-12 left-0 w-full flex justify-between items-end opacity-50 group-hover:opacity-100 transition-opacity">
                                <div>
                                    <h3 className="text-3xl font-heading font-bold text-white">{project.title}</h3>
                                    <span className="text-indigo-400 font-mono text-sm uppercase tracking-wider">{project.category}</span>
                                </div>
                                <span className="text-6xl font-heading font-bold text-neutral-800 pointer-events-none select-none">{project.year}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
