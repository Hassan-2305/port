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
        image: "/open-source-connect.png",
        year: "2024",
        objectPosition: "top"
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

    // --- RECRUITER MODE (Case Study Rows) ---
    if (isRecruiterMode) {
        return (
            <section id="projects" className="py-20 bg-[#050505] text-white border-t border-white/5 font-sans relative">
                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <h2 className="text-4xl font-bold font-heading mb-12 flex items-center gap-4">
                        <span className="text-indigo-500 font-mono text-xl">03.</span>
                        Selected Works
                    </h2>

                    <div className="flex flex-col">
                        {projects.map((project, index) => (
                            <div
                                key={project.title}
                                className="group relative border-t border-white/10 py-12 transition-colors hover:bg-white/5"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 px-4">

                                    {/* Project Info */}
                                    <div className="flex-1">
                                        <div className="flex items-baseline gap-4 mb-2">
                                            <h3 className="text-3xl md:text-4xl font-bold font-heading text-white group-hover:text-indigo-400 transition-colors">
                                                {project.title}
                                            </h3>
                                            <span className="font-mono text-xs text-neutral-500 border border-white/10 px-2 py-0.5 rounded uppercase">
                                                {project.year}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-neutral-400 font-mono text-sm">
                                            <span className="text-indigo-500">{project.category}</span>
                                            <span className="w-1 h-1 bg-neutral-700 rounded-full"></span>
                                            <span>React / WebGL</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                                        <a href="#" className="flex items-center gap-2 font-mono text-sm text-white hover:text-indigo-400 transition-colors">
                                            LIVE DEMO <ArrowUpRight size={16} />
                                        </a>
                                        <a href="#" className="flex items-center gap-2 font-mono text-sm text-neutral-500 hover:text-white transition-colors">
                                            CODE
                                        </a>
                                    </div>

                                    {/* Mobile Only Arrow (Always visible) */}
                                    <div className="md:hidden absolute top-4 right-0 text-white/20">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>

                                {/* Hover Image Preview (Reveal) */}
                                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover grayscale"
                                        style={project.objectPosition ? { objectPosition: project.objectPosition } : undefined}
                                    />
                                </div>
                            </div>
                        ))}
                        {/* Closing Border */}
                        <div className="border-t border-white/10" />
                    </div>

                    <div className="mt-16 text-center">
                        <a href="https://github.com/Hassan-2305" target="_blank" className="font-mono text-sm text-neutral-500 hover:text-white border-b border-dashed border-neutral-600 hover:border-white pb-1 transition-all">
                            // VIEW_ALL_ARCHIVE
                        </a>
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

                        <div className="mt-12 hidden md:block pointer-events-none">
                            <div className="relative">
                                <span className="absolute -top-6 left-0 w-max text-white/90 font-handwriting text-xl -rotate-2">
                                    Scroll to explore
                                </span>
                                <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 15 H 80" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
                                    <path d="M80 15 L 70 10 M 80 15 L 70 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
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
                            <div className="w-full h-[calc(100%-4rem)] overflow-hidden rounded-md grayscale group-hover:grayscale-0 transition-all duration-700 ease-[0.16,1,0.3,1] relative">
                                <motion.img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transform transition-transform duration-1000"
                                    style={project.objectPosition ? { objectPosition: project.objectPosition } : undefined}
                                    whileHover={{ scale: 1.1 }}
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            </div>

                            <div className="mt-3 w-full flex justify-between items-end opacity-50 group-hover:opacity-100 transition-opacity">
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
