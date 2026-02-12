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

                        {/* Technical Skills Cloud (Styled) */}
                        <div className="mt-12 pt-12 border-t border-white/10">
                            <h4 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6">Capabilities</h4>
                            <div className="flex flex-wrap gap-x-8 gap-y-4 text-2xl font-heading font-bold text-neutral-600">
                                {skills.map(skill => (
                                    <span key={skill} className="hover:text-white transition-colors cursor-default">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
