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
    {
        company: "Freelance",
        role: "Frontend Developer",
        duration: "2024 - Present",
        location: "Remote",
        description: "Building AI-powered tools and creative web experiences. Delivering bespoke digital solutions with a focus on performance and interaction design.",
        achievements: [
            { icon: Code, label: "AI Tools", value: "Development" },
            { icon: TrendingUp, label: "Creative", value: "Web" },
            { icon: Users, label: "Clients", value: "Global" }
        ],
        tech: ["React", "Next.js", "AI Integration", "3D Web"],
        gradient: "from-orange-500 to-red-500"
    }
];

export const Experience = () => {
    const { isRecruiterMode } = useMode();

    // --- RECRUITER MODE (Resume Style) ---
    if (isRecruiterMode) {
        return (
            <section id="experience" className="py-20 bg-dark border-t border-white/5">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-12 text-white flex items-center gap-3">
                        <span className="w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                        Professional Experience
                    </h2>

                    <div className="relative border-l border-white/10 ml-3 space-y-12">
                        {experiences.map((exp, index) => (
                            <div key={exp.company} className="relative pl-8 md:pl-12">
                                {/* Timeline Dot */}
                                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-neutral-800 border border-white/20 transition-colors group-hover:bg-indigo-500 group-hover:border-indigo-500"></div>

                                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                                    <h3 className="text-xl font-bold text-white tracking-tight">{exp.role}</h3>
                                    <span className="font-mono text-sm text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded border border-indigo-500/20 whitespace-nowrap">
                                        {exp.duration}
                                    </span>
                                </div>

                                <div className="text-lg text-neutral-300 font-medium mb-4 flex items-center gap-2">
                                    {exp.company}
                                    <span className="text-neutral-600">•</span>
                                    <span className="text-sm text-neutral-500 font-normal">{exp.location}</span>
                                </div>

                                <p className="text-neutral-400 leading-relaxed mb-6 max-w-3xl">
                                    {exp.description}
                                </p>

                                {/* Key Achievement Highlights */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                    {exp.achievements.map((ach, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                            <span>
                                                <strong className="text-white">{ach.label}:</strong> {ach.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    {exp.tech.map(tech => (
                                        <span key={tech} className="text-xs font-medium px-2.5 py-1 rounded bg-white/5 text-neutral-400 border border-white/10 hover:border-white/20 hover:text-white transition-colors cursor-default">
                                            {tech}
                                        </span>
                                    ))}
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
