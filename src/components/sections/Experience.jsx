import React from 'react';
import { motion } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { Calendar, MapPin, TrendingUp, Users, Code } from 'lucide-react';

const experiences = [
    {
        company: "Stealth Startup",
        role: "Full Stack Engineer",
        duration: "Jun 2024 - Present",
        location: "Remote",
        description: "Architecting scalable microservices for a high-growth fintech platform. Optimized core API latency by 40% using Rust-based edge functions.",
        achievements: [
            { icon: Code, label: "System Core", value: "Architecture" },
            { icon: TrendingUp, label: "40% faster", value: "Latency" },
            { icon: Users, label: "High Growth", value: "Environment" }
        ],
        tech: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        company: "AI Research Lab",
        role: "Machine Learning Engineer",
        duration: "Jan 2024 - May 2024",
        location: "Hybrid",
        description: "Developed proprietary LLM fine-tuning pipelines for specialized domain adaptation. Achieved 94% benchmark accuracy on internal datasets.",
        achievements: [
            { icon: TrendingUp, label: "94% SOTA", value: "Accuracy" },
            { icon: Code, label: "LLM Pipeline", value: "Developed" }
        ],
        tech: ["Python", "TensorFlow", "PyTorch", "HuggingFace"],
        gradient: "from-purple-500 to-pink-500"
    },
    {
        company: "Independent Consultant",
        role: "Creative Technologist",
        duration: "Jul 2023 - Dec 2023",
        location: "Global",
        description: "Delivering bespoke digital experiences for varied clients. Focusing on 3D web interaction, performance, and accessible design systems.",
        achievements: [
            { icon: Users, label: "Global", value: "Client Base" },
            { icon: TrendingUp, label: "5.0", value: "Satisfaction" }
        ],
        tech: ["Next.js", "WebGL", "Tailwind", "Design Systems"],
        gradient: "from-orange-500 to-red-500"
    }
];

export const Experience = () => {
    const { isRecruiterMode } = useMode();

    // --- RECRUITER MODE (Compact Table) ---
    if (isRecruiterMode) {
        return (
            <section id="experience" className="py-20 bg-dark border-t border-white/5">
                <div className="container mx-auto px-6">
                    <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        Experience
                    </h2>
                    <div className="space-y-4">
                        {experiences.map((exp) => (
                            <div key={exp.company} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                                        <p className="text-sm text-neutral-400">{exp.company} • {exp.duration}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {exp.tech.map(tech => (
                                        <span key={tech} className="text-xs px-2 py-1 rounded bg-white/5 text-neutral-300 border border-white/10">
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
                    <div className="hidden md:block absolute top-0 right-20 pointer-events-none opacity-60">
                        <div className="relative">
                            <span className="absolute -top-8 -right-12 w-max text-white/60 font-handwriting text-2xl -rotate-6">
                                The journey so far...
                            </span>
                            <svg width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-y-2">
                                <path d="M80 10 C 60 10, 40 20, 10 40" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" strokeDasharray="4 4" />
                                <path d="M10 40 L 18 35 M 10 40 L 16 46" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
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
