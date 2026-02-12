import React from 'react';
import { motion } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { Calendar, Building2 } from 'lucide-react';

const experience = [
    {
        role: "Senior Frontend Engineer",
        company: "TechCorp",
        period: "2023 - Present",
        desc: [
            "Led migration of 50k+ LoC legacy app to Next.js.",
            "Improved Core Web Vitals LCP by 1.2s.",
            "Mentored 3 junior developers."
        ]
    },
    {
        role: "UI Engineer",
        company: "CreativeStudio",
        period: "2021 - 2023",
        desc: [
            "Built design system used across 4 products.",
            "Implemented complex WebGL animations.",
            "Collaborated daily with designers."
        ]
    },
    {
        role: "Frontend Developer",
        company: "StartUp Inc",
        period: "2019 - 2021",
        desc: [
            "Developed MVP from scratch in 3 months.",
            "Integrated Stripe payments and Auth0.",
        ]
    }
];

export const Experience: React.FC = () => {
    const { isRecruiterMode } = useMode();

    return (
        <section id="experience" className={`py-20 ${isRecruiterMode ? 'bg-dark' : 'bg-neutral-900/30'}`}>
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-heading font-bold mb-12">Experience</h2>

                <div className="relative max-w-4xl mx-auto">
                    {/* Timeline Line (Normal Mode) */}
                    {!isRecruiterMode && (
                        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
                    )}

                    <div className="space-y-12">
                        {experience.map((job, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-8 ${isRecruiterMode
                                        ? 'border-b border-white/5 pb-8 last:border-0'
                                        : index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Timeline Dot (Normal Mode) */}
                                {!isRecruiterMode && (
                                    <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-indigo-500 rounded-full -translate-x-1/2 translate-y-1 hidden md:block ring-4 ring-dark" />
                                )}

                                <div className={`flex-1 ${!isRecruiterMode && index % 2 === 0 ? 'text-left' : !isRecruiterMode ? 'md:text-right' : ''}`}>
                                    <h3 className="text-xl font-bold text-white mb-1">{job.role}</h3>
                                    <div className={`flex items-center gap-2 text-indigo-400 mb-4 font-mono text-sm ${!isRecruiterMode && index % 2 !== 0 ? 'md:justify-end' : ''}`}>
                                        <Building2 className="w-4 h-4" />
                                        <span>{job.company}</span>
                                        <span className="mx-2">•</span>
                                        <Calendar className="w-4 h-4" />
                                        <span>{job.period}</span>
                                    </div>

                                    {isRecruiterMode ? (
                                        <div className="flex flex-wrap gap-2">
                                            {job.desc.map((d, i) => (
                                                <span key={i} className="text-sm text-neutral-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                                    {d}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <ul className={`space-y-2 text-neutral-400 list-disc list-inside ${index % 2 !== 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
                                            {job.desc.map((d, i) => (
                                                <li key={i}>{d}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {!isRecruiterMode && <div className="flex-1 hidden md:block" />}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
