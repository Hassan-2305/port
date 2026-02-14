import React from 'react';
import { motion } from 'framer-motion';
import { useMode } from '../../context/ModeContext';

const skills = [
    "React / Next.js", "TypeScript", "WebGL / Three.js", "Node.js", "Design Systems", "Accessibility"
];

const philosophy = [
    { title: "Precision", text: "Every pixel serves a purpose. I build interfaces where form follows function, but beauty is never compromised." },
    { title: "Motion", text: "Static is boring. I use physics-based animation to make digital interactions feel tactile and alive." },
    { title: "Scale", text: "Performance isn't an afterthought. From 10 to 10M users, the code scales." }
];

export const Skills: React.FC = () => {
    const { isRecruiterMode } = useMode();

    // --- RECRUITER MODE (Simple List) ---
    if (isRecruiterMode) {
        return (
            <section id="skills" className="py-20 bg-dark border-b border-white/5">
                <div className="container mx-auto px-6">
                    <h2 className="text-xl font-bold mb-6 text-white uppercase tracking-wider">Technical Proficiency</h2>
                    <div className="flex flex-wrap gap-3">
                        {skills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-neutral-300 text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // --- NORMAL MODE (Editorial Layout) ---
    return (
        <section className="py-32 bg-dark text-white relative overflow-hidden">
            {/* Background Typography */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-5 select-none pointer-events-none">
                <h2 className="text-[20vw] font-bold font-heading leading-none text-white">PHILOSOPHY</h2>
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
                            The <br /> <span className="text-neutral-500">Studio.</span>
                        </motion.h2>
                        <div className="h-px w-full bg-white/20 mb-8" />
                        <p className="text-xl text-neutral-400 leading-relaxed font-light">
                            I don't just write code; I engineer <span className="text-white">feelings</span>.
                            Bridging the gap between design engineering and performance optimization.
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
                                <h3 className="text-3xl font-bold mb-4 flex items-center gap-4">
                                    <span className="text-xs font-mono text-neutral-500">0{index + 1}</span>
                                    {item.title}
                                </h3>
                                <p className="text-neutral-400 group-hover:text-white transition-colors max-w-sm">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}

                        {/* Technical Ecosystem */}
                        <div className="mt-12 pt-12 border-t border-white/10 relative">
                            <h4 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-8">Technical Ecosystem</h4>

                            {/* Human Touch Annotation */}
                            <div className="hidden md:block absolute -top-8 right-24 pointer-events-none opacity-60">
                                <div className="relative">
                                    <span className="absolute -top-6 -right-2 w-max text-white/60 font-handwriting text-xl -rotate-6">
                                        My Arsenal ⚡
                                    </span>
                                    <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="-translate-y-2">
                                        <path d="M50 0 C 50 15, 30 20, 10 30" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" strokeDasharray="3 3" />
                                        <path d="M10 30 L 18 26 M 10 30 L 16 36" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { category: "Frontend", tools: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "WebGL / R3F"], color: "bg-blue-500" },
                                    { category: "Backend & AI", tools: ["Node.js", "Python", "OpenAI / LLMs", "PostgreSQL", "Redis"], color: "bg-purple-500" },
                                    { category: "DevOps & Tools", tools: ["Docker", "AWS", "Git", "Figma", "Blender"], color: "bg-orange-500" }
                                ].map((group, idx) => (
                                    <div key={group.category}>
                                        <h5 className="text-white font-bold mb-4 flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${group.color}`} />
                                            {group.category}
                                        </h5>
                                        <div className="flex flex-wrap gap-2">
                                            {group.tools.map((tool, i) => (
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
