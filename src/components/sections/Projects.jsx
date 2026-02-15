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

    // --- RECRUITER MODE (Detailed Grid) ---
    if (isRecruiterMode) {
        return (
            <section id="projects" className="py-20 bg-dark">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-12 text-white flex items-center gap-3">
                        <span className="w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                        Featured Projects
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project) => (
                            <div key={project.title} className="group relative bg-white/5 border border-white/5 rounded-xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1">

                                {/* Image Preview */}
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent z-10" />
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        style={project.objectPosition ? { objectPosition: project.objectPosition } : undefined}
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                                            <p className="text-sm font-mono text-indigo-300">{project.category}</p>
                                        </div>
                                        <span className="text-xs font-bold text-neutral-500 border border-white/10 px-2 py-1 rounded">
                                            {project.year}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/5">
                                        <a href="#" className="flex items-center gap-2 text-sm font-bold text-white hover:text-indigo-400 transition-colors">
                                            Live Demo <ArrowUpRight className="w-4 h-4" />
                                        </a>
                                        <a href="#" className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                                            View Code
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <a href="https://github.com/Hassan-2305" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors border-b border-dashed border-neutral-600 hover:border-white pb-0.5">
                            View all projects on GitHub <ArrowUpRight className="w-3 h-3" />
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
