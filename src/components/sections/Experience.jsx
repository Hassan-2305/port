import React from 'react';
import { motion } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { Calendar, MapPin, TrendingUp, Users, Code, Car } from 'lucide-react';

const experiences = [
    {
        company: "Kera AI Urban Technologies",
        role: "UI/UX & Frontend Intern",
        duration: "Jan 2026 - Feb 2026",
        location: "Remote",
        description: "Developed UI/UX for a parking-based Vehicle-to-Infrastructure (V2I) application. Focused on intuitive mapping interfaces and real-time data visualization.",
        achievements: [
            { icon: Car, label: "V2I App", value: "Smart City" },
            { icon: MapPin, label: "Mapping", value: "Interface" },
            { icon: Code, label: "Frontend", value: "React" }
        ],
        tech: ["React", "UI/UX", "Maps API", "V2I"],
        gradient: "from-purple-500 to-indigo-500"
    },
    {
        company: "Phicsit",
        role: "UI/UX Design Intern",
        duration: "2025 - 2026",
        location: "Remote",
        description: "Designed the official website for Open Source Connect India (osconnect.org). Balanced clean visuals with usability and worked with real content to shape the overall user experience.",
        achievements: [
            { icon: Users, label: "OS Connect", value: "Community" },
            { icon: TrendingUp, label: "Live Site", value: "Shipped" },
            { icon: Code, label: "Web Design", value: "UI/UX" }
        ],
        tech: ["Figma", "Web Design", "UI/UX", "Prototyping"],
        gradient: "from-blue-500 to-cyan-500"
    },

];

export const Experience = () => {
    const { isRecruiterMode } = useMode();

    // --- RECRUITER MODE (Marginalia Layout) ---
    if (isRecruiterMode) {
        return (
            <section id="experience" className="py-20 bg-[#050505] text-white border-t border-white/5 font-sans">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-4xl font-bold font-heading mb-16 flex items-center gap-4">
                        <span className="text-indigo-500 font-mono text-xl">02.</span>
                        Experience
                    </h2>

                    <div className="space-y-16">
                        {experiences.map((exp, index) => (
                            <div key={exp.company} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 group">

                                {/* Left: Meta / Date (Marginalia) */}
                                <div className="md:col-span-3 text-right md:text-right flex flex-row md:flex-col justify-between md:justify-start items-center md:items-end gap-2">
                                    <span className="font-mono text-sm text-indigo-400 uppercase tracking-wider">
                                        {exp.duration}
                                    </span>
                                    <span className="font-mono text-xs text-neutral-600 hidden md:block">
                                        {exp.location}
                                    </span>
                                </div>

                                {/* Right: Content */}
                                <div className="md:col-span-9 border-l border-white/10 pl-8 md:pl-12 relative">
                                    {/* Hover Marker */}
                                    <div className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-indigo-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

                                    <div className="mb-4">
                                        <h3 className="text-2xl font-bold font-heading text-white group-hover:text-indigo-400 transition-colors">
                                            {exp.role}
                                        </h3>
                                        <div className="text-lg text-neutral-400 font-medium">{exp.company}</div>
                                    </div>

                                    <p className="text-neutral-400 leading-relaxed mb-6 max-w-2xl">
                                        {exp.description}
                                    </p>

                                    {/* Key Achievements (Compact) */}
                                    <div className="space-y-2 mb-6">
                                        {exp.achievements.map((ach, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm font-mono text-neutral-500 hover:text-white transition-colors">
                                                <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full"></span>
                                                <span className="text-white">{ach.label}:</span>
                                                <span>{ach.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Minimal Tech Tags */}
                                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                                        {exp.tech.map(tech => (
                                            <span key={tech} className="font-mono text-xs text-indigo-500/70 uppercase tracking-wider">
                                                [{tech}]
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // --- NORMAL MODE (3D Timeline) ---
    return (
        <section className="py-32 bg-gradient-to-b from-dark via-neutral-900 to-dark relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-6xl md:text-7xl font-heading font-bold mb-4">
                        <span className="text-neutral-700">Where I've</span> Shipped Code
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-2xl">
                        Building products, solving problems, and learning every single day.
                    </p>

                    {/* Human Touch Annotation */}
                    <div className="hidden md:block absolute top-0 right-20 pointer-events-none">
                        <div className="relative">
                            <span className="absolute -top-8 -right-12 w-max text-white/90 font-handwriting text-2xl -rotate-6">
                                The journey so far...
                            </span>
                            <svg width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-y-2">
                                <path d="M80 10 C 60 10, 40 20, 10 40" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
                                <path d="M10 40 L 18 35 M 10 40 L 16 46" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            whileHover={{ scale: 1.02 }}
                            className="group relative"
                        >
                            {/* Gradient Border Effect */}
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${exp.gradient} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>

                            <div className="relative bg-neutral-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-10">
                                {/* Header */}
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                                    <div>
                                        <h3 className="text-3xl font-heading font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all">
                                            {exp.role}
                                        </h3>
                                        <p className="text-xl text-neutral-400 font-medium">{exp.company}</p>
                                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-neutral-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {exp.duration}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {exp.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-neutral-300 leading-relaxed mb-6">
                                    {exp.description}
                                </p>

                                {/* Achievement Pills */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    {exp.achievements.map((achievement, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                                            <achievement.icon className={`w-5 h-5 bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent`} />
                                            <div>
                                                <div className="text-white font-bold text-sm">{achievement.label}</div>
                                                <div className="text-xs text-neutral-500">{achievement.value}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2">
                                    {exp.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300 hover:border-indigo-500/50 hover:bg-white/10 transition-all cursor-default"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
