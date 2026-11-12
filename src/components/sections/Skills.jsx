import React from 'react';
import { motion } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { skillGroups } from '../../data/profile';

const philosophy = [
    { title: "Work with what you've got.", text: "JurisAI trains on a 6 GB GPU. Mixed precision, gradient checkpointing, a batch size of two and a frozen encoder got it there, no cloud bill needed." },
    { title: "Say what the number means.", text: "1.7% CER sounds great until you add that it's measured on synthetic audio from one voice. So I always add that part." },
    { title: "Don't make things up.", text: "Aekobaba shows \"Ask the supplier\" instead of guessing a price. DayZero won't save anything the AI heard until you confirm it. I'd rather a product admit what it doesn't know." }
];

export const Skills = () => {
    const { isRecruiterMode } = useMode();

    // --- RECRUITER MODE (Technical Specs) ---
    if (isRecruiterMode) {
        return (
            <section id="skills" className="py-20 bg-[#050505] text-white border-t border-white/5 font-sans">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-4xl font-bold font-heading mb-12 flex items-center gap-4">
                        <span className="text-indigo-400 font-mono text-xl">01.</span>
                        Skills
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {skillGroups.map((skillGroup) => (
                            <div key={skillGroup.category} className="border border-white/10 bg-white/5 md:bg-transparent rounded-xl md:rounded-none md:border-0 md:border-t md:border-white/10 p-6 md:p-0 md:pt-8">
                                <h3 className="text-xl font-bold font-heading text-indigo-400 mb-6">
                                    {skillGroup.category}
                                </h3>

                                <ul className="space-y-4">
                                    {skillGroup.items.map((item) => (
                                        <li key={item} className="flex justify-between items-center group border-b border-white/5 pb-2 hover:border-white/20 transition-colors">
                                            <span className="text-neutral-300 font-mono text-sm group-hover:text-white transition-colors">
                                                {item}
                                            </span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 group-hover:bg-green-400 transition-colors" aria-hidden="true"></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // --- NORMAL MODE (Editorial Layout) ---
    return (
        <section id="skills" className="py-32 bg-dark text-white relative overflow-hidden">
            {/* Background Typography */}
            <div className="absolute -top-32 left-0 w-full flex justify-center opacity-5 select-none pointer-events-none overflow-hidden" aria-hidden="true">
                <span className="text-[20vw] font-bold font-heading leading-none text-white tracking-tighter whitespace-nowrap">ENGINEER</span>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Left Column: Title & Intro */}
                    <div className="lg:col-span-5 flex flex-col justify-end">
                        <motion.h2
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-8xl font-heading font-bold mb-8"
                        >
                            How I <br /> <span className="text-neutral-400">work.</span>
                        </motion.h2>
                        <div className="h-px w-full bg-white/20 mb-8" />
                        <p className="text-xl text-neutral-300 leading-relaxed font-light">
                            Three things I keep coming back to, whether it's a <span className="text-white">model</span>,
                            a <span className="text-white">database schema</span> or a landing page.
                        </p>
                    </div>

                    {/* Right Column: Editorial Grid */}
                    <div className="lg:col-span-7 grid gap-12">
                        {philosophy.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                                className="group border-l border-white/10 pl-8 hover:border-indigo-500 transition-colors"
                            >
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-4">
                                    <span className="text-xs font-mono text-neutral-400">0{index + 1}</span>
                                    {item.title}
                                </h3>
                                <p className="text-neutral-300 group-hover:text-white transition-colors max-w-sm">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}

                        {/* Technical Ecosystem */}
                        <div className="mt-12 pt-12 border-t border-white/10 relative">
                            <h4 className="text-sm font-mono text-neutral-400 uppercase tracking-widest mb-8">What I use</h4>

                            {/* Human Touch Annotation */}
                            <div className="hidden md:block absolute -top-8 right-24 pointer-events-none" aria-hidden="true">
                                <div className="relative">
                                    <span className="absolute -top-6 -right-2 w-max text-white/90 font-handwriting text-xl -rotate-6">
                                        the toolbox
                                    </span>
                                    <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="-translate-y-2">
                                        <path d="M50 0 C 50 15, 30 20, 10 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
                                        <path d="M10 30 L 18 26 M 10 30 L 16 36" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {skillGroups.map((group, idx) => (
                                    <div key={group.category}>
                                        <h5 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${group.color}`} aria-hidden="true" />
                                            {group.category}
                                        </h5>
                                        <div className="flex flex-wrap gap-2">
                                            {group.items.map((tool, i) => (
                                                <motion.span
                                                    key={tool}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: (idx * 0.2) + (i * 0.05), duration: 0.4 }}
                                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-neutral-300 cursor-default hover:text-white transition-colors"
                                                >
                                                    {tool}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
