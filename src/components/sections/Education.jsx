import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { GraduationCap, GitCommit, ExternalLink, BookOpen } from 'lucide-react';
import { profile } from '../../data/profile';

// Real contribution graph, rendered from public GitHub data
const CONTRIBUTION_CHART = `https://ghchart.rshah.org/22c55e/${profile.githubUser}`;

export const Education = () => {
    const { isRecruiterMode } = useMode();
    const [chartFailed, setChartFailed] = useState(false);

    if (isRecruiterMode) {
        return (
            <section id="education" className="py-20 bg-[#050505] text-white border-t border-white/5 font-sans">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-4xl font-bold font-heading mb-12 flex items-center gap-4">
                        <span className="text-indigo-400 font-mono text-xl">04.</span>
                        Education
                    </h2>

                    <div className="space-y-6">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <h3 className="text-lg font-bold text-white">B.Tech in Computer Science & Engineering</h3>
                            <p className="text-neutral-300">Cochin University of Science & Technology (CUSAT) • 2024 – 2028 (2nd Year)</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="education" className="py-32 bg-dark relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-gradient-to-b from-indigo-500/5 to-transparent blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Column: Education */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-6xl font-heading font-bold mb-12"
                        >
                            Still in <br /> <span className="text-neutral-500">college.</span>
                        </motion.h2>

                        {/* University Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative group mb-12"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                            <div className="relative bg-neutral-900/90 backdrop-blur-xl border border-white/10 p-8 rounded-2xl overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity" aria-hidden="true">
                                    <GraduationCap size={120} />
                                </div>

                                <div className="relative z-10">
                                    <span className="text-indigo-400 font-mono text-sm tracking-wider mb-2 block">B.TECH (2024–2028) • 2nd Year</span>
                                    <h3 className="text-3xl font-bold text-white mb-2">Computer Science & Engineering</h3>
                                    <p className="text-xl text-neutral-300 mb-6">Cochin University of Science & Technology (CUSAT)</p>

                                    <div className="space-y-2">
                                        <div className="text-sm text-neutral-400 uppercase tracking-widest font-mono">Relevant Coursework</div>
                                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                                            {["Data Structures", "Algorithms", "AI/ML"].map(course => (
                                                <span key={course} className="text-sm text-neutral-300 flex items-center gap-1">
                                                    <BookOpen size={12} className="text-indigo-400" aria-hidden="true" /> {course}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Human Touch Annotation — loopy arrow pointing to contributions */}
                        <div className="hidden lg:block mt-16 pl-8 pointer-events-none" aria-hidden="true">
                            <div className="relative">
                                <span className="text-white/90 font-handwriting text-4xl -rotate-3 block mb-4">
                                    the receipts
                                </span>
                                <svg width="250" height="180" viewBox="0 0 250 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 10 C 60 10, 80 60, 50 90 C 20 120, 60 160, 120 140 C 180 120, 200 80, 230 60" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
                                    <path d="M230 60 L 222 68 M 230 60 L 224 52" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: GitHub Activity (real data) */}
                    <div className="mt-12 lg:mt-0">
                        <motion.h2
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-6xl font-heading font-bold mb-12 text-right"
                        >
                            Commit <br /> <span className="text-neutral-500">history.</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="bg-neutral-900/50 backdrop-blur border border-white/10 p-8 rounded-2xl relative overflow-hidden"
                        >
                            {/* Glow Effect */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px]" />

                            <div className="flex items-center justify-between mb-8 relative">
                                <div className="flex items-center gap-3">
                                    <GitCommit className="text-green-500" aria-hidden="true" />
                                    <span className="text-xl font-bold text-white">GitHub Activity</span>
                                </div>
                                <div className="text-sm text-neutral-400">Last 12 Months</div>
                            </div>

                            {/* Chart is dark-on-light by default; invert + hue-rotate to sit on the dark card */}
                            <div className="relative overflow-x-auto">
                                {chartFailed ? (
                                    <p className="text-neutral-400 text-sm">Contribution chart unavailable — see the full history on GitHub.</p>
                                ) : (
                                    <img
                                        src={CONTRIBUTION_CHART}
                                        alt={`GitHub contribution graph for ${profile.githubUser} over the last year`}
                                        loading="lazy"
                                        decoding="async"
                                        onError={() => setChartFailed(true)}
                                        className="w-full min-w-[600px] [filter:invert(1)_hue-rotate(180deg)_brightness(0.9)] opacity-90"
                                    />
                                )}
                            </div>

                            <div className="mt-6 flex items-center justify-between text-xs text-neutral-400 relative">
                                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                                    View full history on GitHub <ExternalLink size={12} aria-hidden="true" />
                                </a>
                            </div>
                        </motion.div>

                        <div className="mt-8 relative p-6 border border-white/10 rounded-xl bg-gradient-to-b from-white/5 to-transparent">
                            <h4 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-3">Right now</h4>
                            <p className="text-neutral-300 leading-relaxed">
                                Second year of B.Tech, Tech Co-Lead at ACES, and training JurisAI between classes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
