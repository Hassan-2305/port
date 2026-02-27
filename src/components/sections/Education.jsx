import React from 'react';
import { motion } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { GraduationCap, GitCommit, ExternalLink, BookOpen } from 'lucide-react';



// Mock data for GitHub heatmap (last 5 months approx)
const contributionLevels = [0, 1, 2, 3, 4];
const weeks = 20;
const days = 7;
const generateHeatmapData = () => {
    return Array.from({ length: weeks * days }).map(() => ({
        level: Math.random() > 0.3 ? contributionLevels[Math.floor(Math.random() * contributionLevels.length)] : 0
    }));
};
const heatmapData = generateHeatmapData();

const getLevelColor = (level) => {
    switch (level) {
        case 0: return 'bg-white/5';
        case 1: return 'bg-green-900/40';
        case 2: return 'bg-green-700/60';
        case 3: return 'bg-green-500/80';
        case 4: return 'bg-green-400';
        default: return 'bg-white/5';
    }
};

export const Education = () => {
    const { isRecruiterMode } = useMode();

    if (isRecruiterMode) {
        return (
            <section id="education" className="py-20 bg-[#050505] text-white border-t border-white/5 font-sans">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-4xl font-bold font-heading mb-12 flex items-center gap-4">
                        <span className="text-indigo-500 font-mono text-xl">01.</span>
                        Education
                    </h2>

                    <div className="space-y-6">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-white">B.Tech in Computer Science & Engineering</h3>
                                    <p className="text-neutral-400">Cochin University of Science & Technology (CUSAT) • 2024 - 2028 (2nd Year)</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="academic" className="py-32 bg-dark relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-gradient-to-b from-indigo-500/5 to-transparent blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Column: Education & Certs */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-6xl font-heading font-bold mb-12"
                        >
                            Academic <br /> <span className="text-neutral-600">Foundation.</span>
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
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <GraduationCap size={120} />
                                </div>

                                <div className="relative z-10">
                                    <span className="text-indigo-400 font-mono text-sm tracking-wider mb-2 block">B.TECH (2024-2028) • 2nd Year</span>
                                    <h3 className="text-3xl font-bold text-white mb-2">Computer Science & Engineering</h3>
                                    <p className="text-xl text-neutral-400 mb-6">Cochin University of Science & Technology (CUSAT)</p>

                                    <div className="space-y-2">
                                        <div className="text-sm text-neutral-500 uppercase tracking-widest font-mono">Relevant Coursework</div>
                                        <div className="flex flex-wrap gap-2">
                                            {["Data Structures", "Algorithms", "Distributed Systems", "AI/ML", "Database Design"].map(course => (
                                                <span key={course} className="text-sm text-neutral-400 flex items-center gap-1">
                                                    <BookOpen size={12} className="text-indigo-500" /> {course}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Certifications */}


                        {/* Human Touch Annotation — Big loopy arrow pointing to contributions */}
                        <div className="hidden lg:block mt-16 pl-8 pointer-events-none">
                            <div className="relative">
                                <span className="text-white/90 font-handwriting text-4xl -rotate-3 block mb-4">
                                    Always learning! 📚
                                </span>
                                <svg width="250" height="180" viewBox="0 0 250 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Big loopy S-curve arrow pointing right toward contributions */}
                                    <path d="M20 10 C 60 10, 80 60, 50 90 C 20 120, 60 160, 120 140 C 180 120, 200 80, 230 60" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
                                    <path d="M230 60 L 222 68 M 230 60 L 224 52" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: GitHub Activity */}
                    <div className="mt-12 lg:mt-0">
                        <motion.h2
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-6xl font-heading font-bold mb-12 text-right"
                        >
                            Constant <br /> <span className="text-neutral-600">Growth.</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="bg-neutral-900/50 backdrop-blur border border-white/10 p-8 rounded-2xl relative overflow-hidden"
                        >
                            {/* Glow Effect */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px]" />

                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <GitCommit className="text-green-500" />
                                    <span className="text-xl font-bold text-white">Code Activity</span>
                                </div>
                                <div className="text-sm text-neutral-500">Last 5 Months</div>
                            </div>

                            {/* Heatmap Grid */}
                            <div className="grid grid-cols-7 gap-1 md:gap-2">
                                {heatmapData.map((data, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.005 }}
                                        whileHover={{ scale: 1.2, zIndex: 10 }}
                                        className={`w-full aspect-square rounded-sm md:rounded ${getLevelColor(data.level)} hover:ring-2 hover:ring-white/50 transition-all`}
                                        title={`${data.level === 0 ? 'No' : 'Multiple'} contributions`}
                                    />
                                ))}
                            </div>

                            <div className="mt-6 flex items-center justify-between text-xs text-neutral-500">
                                <a href="https://github.com/Hassan-2305" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                                    View full history <ExternalLink size={12} />
                                </a>
                                <div className="flex items-center gap-2">
                                    <span>Less</span>
                                    <div className="flex gap-1">
                                        <div className="w-3 h-3 rounded bg-white/5" />
                                        <div className="w-3 h-3 rounded bg-green-900/40" />
                                        <div className="w-3 h-3 rounded bg-green-700/60" />
                                        <div className="w-3 h-3 rounded bg-green-500/80" />
                                        <div className="w-3 h-3 rounded bg-green-400" />
                                    </div>
                                    <span>More</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="mt-8 relative p-6 border border-white/10 rounded-xl bg-gradient-to-b from-white/5 to-transparent">
                            <h4 className="text-lg font-bold text-white mb-2">CS Philosophy</h4>
                            <p className="text-neutral-400 italic">
                                "Algorithms are the poetry of computing. I strive to write code that is not just functional, but elegant and efficient."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
