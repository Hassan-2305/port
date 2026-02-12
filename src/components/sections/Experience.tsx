import React from 'react';
import { motion } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { Calendar, MapPin, TrendingUp, Users, Code } from 'lucide-react';

const experiences = [
    {
        company: "Tech Startup Inc.",
        role: "Full Stack Developer Intern",
        duration: "Jun 2024 - Present",
        location: "Remote",
        description: "Built scalable microservices architecture serving 10K+ users. Reduced API response time by 40% through optimization.",
        achievements: [
            { icon: Code, label: "15K+ lines", value: "Code Written" },
            { icon: TrendingUp, label: "40% faster", value: "Performance" },
            { icon: Users, label: "5 person", value: "Team Size" }
        ],
        tech: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        company: "University Research Lab",
        role: "ML Research Assistant",
        duration: "Jan 2024 - May 2024",
        location: "On-site",
        description: "Developed ML models for image classification with 94% accuracy. Published findings in student research journal.",
        achievements: [
            { icon: TrendingUp, label: "94% accuracy", value: "ML Model" },
            { icon: Code, label: "3 models", value: "Trained" }
        ],
        tech: ["Python", "TensorFlow", "PyTorch", "Jupyter"],
        gradient: "from-purple-500 to-pink-500"
    },
    {
        company: "Freelance Projects",
        role: "Web Developer",
        duration: "Jul 2023 - Dec 2023",
        location: "Remote",
        description: "Delivered 8+ client projects including e-commerce sites and SaaS dashboards. Maintained 5-star rating.",
        achievements: [
            { icon: Users, label: "8 clients", value: "Projects Delivered" },
            { icon: TrendingUp, label: "5.0 rating", value: "Client Satisfaction" }
        ],
        tech: ["React", "Next.js", "Tailwind", "Firebase"],
        gradient: "from-orange-500 to-red-500"
    }
];

export const Experience: React.FC = () => {
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
