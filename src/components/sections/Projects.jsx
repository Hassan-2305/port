import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '../../data/profile';
import { projects } from '../../data/content';


// Visible link text: the site's address (e.g. "aekobaba.vercel.app"), or a custom label
const siteLabel = (project) =>
    project.linkLabel || new URL(project.liveUrl).hostname.replace(/^www\./, '');

const StatusBadge = ({ status }) =>
    status ? (
        <span className="font-mono text-[11px] uppercase tracking-wider text-amber-300 border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 rounded">
            {status}
        </span>
    ) : null;

// Shown in place of a screenshot for projects that have no public UI
const TextTile = ({ project }) => (
    <div className="w-full h-full flex flex-col justify-between p-8 bg-[radial-gradient(ellipse_at_top_left,_rgba(99,102,241,0.35),_transparent_60%),radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.25),_transparent_55%)] bg-neutral-950 border border-white/10 rounded-md">
        <div className="flex justify-between items-start gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">{project.category}</span>
            <StatusBadge status={project.status} />
        </div>
        <div>
            <div className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tighter mb-6">{project.title}</div>
            <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">{t}</span>
                ))}
            </div>
        </div>
    </div>
);

export const Projects = () => {
    const { isRecruiterMode, setCursorText, setCursorVariant } = useMode();
    const targetRef = useRef(null);
    const trackRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    // Measure how far the track must slide so the last card fully reaches the screen
    const [distance, setDistance] = useState(0);
    const distanceMV = useMotionValue(0);
    const x = useTransform([scrollYProgress, distanceMV], ([p, d]) => -p * d);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const measure = () => {
            const d = Math.max(0, track.scrollWidth - window.innerWidth);
            distanceMV.set(d);
            setDistance(d);
        };
        const ro = new ResizeObserver(measure); // fires once on observe, then on change
        ro.observe(track);
        window.addEventListener('resize', measure);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, [distanceMV, isRecruiterMode]);

    // --- RECRUITER MODE (Case Study Rows) ---
    if (isRecruiterMode) {
        return (
            <section id="projects" className="py-20 bg-[#050505] text-white border-t border-white/5 font-sans relative">
                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <h2 className="text-4xl font-bold font-heading mb-12 flex items-center gap-4">
                        <span className="text-indigo-400 font-mono text-xl">02.</span>
                        Selected Works
                    </h2>

                    <div className="flex flex-col">
                        {projects.map((project) => {
                            const url = project.liveUrl;
                            return (
                                <div
                                    key={project.title}
                                    className="group relative border-t border-white/10 py-12 transition-colors hover:bg-white/5 focus-within:bg-white/5"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10 px-4">

                                        {/* Project Info */}
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-2">
                                                <h3 className="text-3xl md:text-4xl font-bold font-heading text-white group-hover:text-indigo-400 transition-colors">
                                                    {project.title}
                                                </h3>
                                                <span className="font-mono text-xs text-neutral-400 border border-white/10 px-2 py-0.5 rounded uppercase">
                                                    {project.year}
                                                </span>
                                                <StatusBadge status={project.status} />
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-neutral-400 font-mono text-sm">
                                                <span className="text-indigo-400">{project.category}</span>
                                                {project.tech.length > 0 && (
                                                    <>
                                                        <span className="w-1 h-1 bg-neutral-600 rounded-full" aria-hidden="true"></span>
                                                        <span>{project.tech.join(" / ")}</span>
                                                    </>
                                                )}
                                            </div>
                                            {project.description && (
                                                <p className="mt-4 text-neutral-300 leading-relaxed max-w-2xl">
                                                    {project.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Actions — always visible so keyboard and touch users can find them */}
                                        {url && (
                                            <div className="md:pt-3 shrink-0">
                                                <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} — visit ${siteLabel(project)} (opens in new tab)`} className="inline-flex items-center gap-2 font-mono text-sm text-white hover:text-indigo-400 border-b border-white/20 hover:border-indigo-400 pb-0.5 transition-colors">
                                                    {siteLabel(project)} <ArrowUpRight size={16} aria-hidden="true" />
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    {/* Hover Image Preview (Reveal) */}
                                    {project.image && (
                                        <div className="absolute inset-0 z-0 opacity-10 md:opacity-0 md:group-hover:opacity-10 pointer-events-none transition-opacity duration-500" aria-hidden="true">
                                            <img
                                                src={project.image}
                                                alt=""
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover grayscale-0 md:grayscale"
                                                style={project.objectPosition ? { objectPosition: project.objectPosition } : undefined}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {/* Closing Border */}
                        <div className="border-t border-white/10" />
                    </div>

                    <div className="mt-16 text-center">
                        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-neutral-400 hover:text-white border-b border-dashed border-neutral-600 hover:border-white pb-1 transition-all">
                            More on GitHub →
                        </a>
                    </div>
                </div>
            </section>
        );
    }

    // --- NORMAL MODE (Horizontal Scroll) ---
    return (
        <section
            id="projects"
            ref={targetRef}
            className="relative bg-neutral-900"
            style={{ height: `calc(100vh + ${distance}px)` }}
        >
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-8 md:gap-16 px-8 md:px-24 will-change-transform">
                    {/* Section Title Card */}
                    <div className="flex-shrink-0 w-max flex flex-col justify-center pr-8 md:pr-12">
                        <h2 className="text-[15vw] md:text-[8vw] leading-none font-bold font-heading text-neutral-700 uppercase">
                            Selected <br /> <span className="text-white">Works</span>
                        </h2>
                        <p className="mt-8 text-neutral-300 max-w-sm text-lg">
                            Some for clients, some for clubs at CUSAT, and one that's still on paper.
                        </p>

                        <div className="mt-12 hidden md:block pointer-events-none" aria-hidden="true">
                            <div className="relative">
                                <span className="absolute -top-6 left-0 w-max text-white/90 font-handwriting text-xl -rotate-2">
                                    keep scrolling
                                </span>
                                <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 15 H 80" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
                                    <path d="M80 15 L 70 10 M 80 15 L 70 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Project Cards — real links, so they work with keyboard, screen readers, middle-click */}
                    {projects.map((project) => {
                        const url = project.liveUrl;
                        const Card = url ? motion.a : motion.div;
                        return (
                            <Card
                                key={project.title}
                                {...(url ? { href: url, target: "_blank", rel: "noopener noreferrer", "aria-label": `${project.title} — ${project.category} (opens in new tab)` } : {})}
                                className={`relative flex-shrink-0 w-[85vw] md:w-[60vh] h-[60vh] md:h-[70vh] group rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-4 ${url ? 'md:cursor-none' : ''}`}
                                onMouseEnter={() => {
                                    if (!url) return;
                                    setCursorText("View");
                                    setCursorVariant("project");
                                }}
                                onMouseLeave={() => {
                                    setCursorText("");
                                    setCursorVariant("default");
                                }}
                            >
                                <div className="w-full h-[calc(100%-4rem)] overflow-hidden rounded-md relative">
                                    {project.image ? (
                                        <div className="w-full h-full grayscale-0 md:grayscale md:group-hover:grayscale-0 md:group-focus-visible:grayscale-0 transition-all duration-700 ease-[0.16,1,0.3,1] relative">
                                            <motion.img
                                                src={project.image}
                                                alt={`Screenshot of ${project.title}`}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover transform transition-transform duration-1000"
                                                style={project.objectPosition ? { objectPosition: project.objectPosition } : undefined}
                                                whileHover={{ scale: 1.1 }}
                                            />
                                            <div className="absolute inset-0 bg-transparent md:bg-black/20 md:group-hover:bg-transparent transition-colors" />
                                            {project.status && (
                                                <div className="absolute top-4 right-4"><StatusBadge status={project.status} /></div>
                                            )}
                                        </div>
                                    ) : (
                                        <TextTile project={project} />
                                    )}
                                </div>

                                <div className="mt-3 w-full flex justify-between items-end gap-4 opacity-100 md:opacity-70 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity">
                                    <div className="min-w-0">
                                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-white truncate">{project.title}</h3>
                                        <span className="block text-indigo-400 font-mono text-xs md:text-sm uppercase tracking-wider">{project.category}</span>
                                        {url && (
                                            <span className="inline-flex items-center gap-1 mt-1 font-mono text-xs text-neutral-400 group-hover:text-white transition-colors">
                                                {siteLabel(project)} <ArrowUpRight size={12} aria-hidden="true" />
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-4xl md:text-5xl font-heading font-bold text-neutral-700 pointer-events-none select-none shrink-0" aria-hidden="true">{project.year}</span>
                                </div>
                            </Card>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};
