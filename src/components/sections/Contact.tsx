import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { Github, Linkedin, Mail, FileDown, Copy, Check, ExternalLink } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

const contactMethods = [
    {
        name: "GitHub",
        icon: Github,
        handle: "@Hassan-2305",
        link: "https://github.com/Hassan-2305",
        action: "View Profile",
        gradient: "from-purple-500 to-pink-500",
        hoverGlow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        handle: "Hassan Muhammad",
        link: "https://linkedin.com/in/yourprofile",
        action: "Connect",
        gradient: "from-blue-500 to-cyan-500",
        hoverGlow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
    },
    {
        name: "Email",
        icon: Mail,
        handle: "your.email@example.com",
        action: "Copy",
        gradient: "from-orange-500 to-red-500",
        hoverGlow: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
    },
    {
        name: "Resume",
        icon: FileDown,
        handle: "Download PDF",
        link: "/resume.pdf",
        action: "Download",
        gradient: "from-green-500 to-emerald-500",
        hoverGlow: "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
    }
];

export const Contact: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const [copiedEmail, setCopiedEmail] = useState(false);

    const handleEmailCopy = () => {
        navigator.clipboard.writeText("your.email@example.com");
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    // --- RECRUITER MODE (Simple Form) ---
    if (isRecruiterMode) {
        return (
            <section id="contact" className="py-20 bg-dark border-t border-white/5">
                <div className="container mx-auto px-6 max-w-2xl">
                    <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        Get In Touch
                    </h2>
                    <div className="space-y-4">
                        <a
                            href="mailto:your.email@example.com"
                            className="block p-4 rounded-lg bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors text-white"
                        >
                            <Mail className="w-5 h-5 inline mr-2" />
                            your.email@example.com
                        </a>
                        <a
                            href="https://github.com/Hassan-2305"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-4 rounded-lg bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors text-white"
                        >
                            <Github className="w-5 h-5 inline mr-2" />
                            @Hassan-2305
                        </a>
                        <a
                            href="/resume.pdf"
                            download
                            className="block p-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors text-white text-center font-medium"
                        >
                            <FileDown className="w-5 h-5 inline mr-2" />
                            Download Resume
                        </a>
                    </div>
                </div>
            </section>
        );
    }

    // --- NORMAL MODE (Magnetic Cards) ---
    return (
        <section className="min-h-screen py-32 bg-gradient-to-b from-dark via-neutral-900 to-dark relative overflow-hidden flex items-center">
            {/* Background Elements */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 mb-6">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium">Open to opportunities</span>
                    </div>

                    <h2 className="text-6xl md:text-7xl font-heading font-bold mb-6">
                        Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Build</span> Together
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        Always excited to collaborate on interesting projects. Drop me a message and let's create something amazing.
                    </p>

                    {/* Human Touch Annotation */}
                    <div className="hidden md:block absolute -bottom-12 right-[20%] pointer-events-none opacity-60">
                        <div className="relative">
                            <span className="absolute -top-8 left-12 w-max text-white/60 font-handwriting text-2xl rotate-6">
                                Say hello! 👋
                            </span>
                            <svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 10 C 40 30, 20 30, 10 40" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" strokeDasharray="3 3" />
                                <path d="M10 40 L 15 32 M 10 40 L 18 42" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {contactMethods.map((method, index) => (
                        <MagneticButton key={method.name} strength={0.3}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                whileHover={{ y: -8 }}
                                className={`group relative cursor-pointer ${method.hoverGlow} transition-shadow duration-500`}
                                onClick={() => {
                                    if (method.name === "Email") {
                                        handleEmailCopy();
                                    } else if (method.link) {
                                        window.open(method.link, '_blank');
                                    }
                                }}
                            >
                                {/* Gradient Border */}
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${method.gradient} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500`}></div>

                                <div className="relative bg-neutral-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8 h-full flex flex-col">
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${method.gradient} p-0.5 mb-4 group-hover:scale-110 transition-transform`}>
                                        <div className="w-full h-full bg-neutral-900 rounded-xl flex items-center justify-center">
                                            <method.icon className="w-7 h-7 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-white mb-2">{method.name}</h3>
                                    <p className="text-neutral-400 text-sm mb-4 flex-grow">{method.handle}</p>

                                    {/* Action Button */}
                                    <div className={`flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${method.gradient} bg-clip-text text-transparent group-hover:translate-x-1 transition-transform`}>
                                        {method.name === "Email" && copiedEmail ? (
                                            <>
                                                <Check className="w-4 h-4" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                {method.name === "Email" ? <Copy className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                                                {method.action}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </MagneticButton>
                    ))}
                </div>

                {/* Footer Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-center mt-20 text-neutral-500 text-sm"
                >
                    <p>Designed & Built by Hassan Muhammad</p>
                    <p className="mt-2">© 2024. All rights reserved.</p>
                </motion.div>
            </div>
        </section>
    );
};
