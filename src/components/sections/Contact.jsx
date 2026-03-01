import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from "@formspree/react";
import { useMode } from '../../context/ModeContext';
import {
    Github,
    Linkedin,
    Mail,
    FileDown,
    Copy,
    Check,
    ExternalLink
} from 'lucide-react';
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
        handle: "Mohammed Hassan",
        link: "https://www.linkedin.com/in/mohamhassan/",
        action: "Connect",
        gradient: "from-blue-500 to-cyan-500",
        hoverGlow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
    },
    {
        name: "Email",
        icon: Mail,
        handle: "mohammedhassan2305@gmail.com",
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

export const Contact = () => {
    const { isRecruiterMode } = useMode();
    const [copiedEmail, setCopiedEmail] = useState(false);
    // Must be at top level — React Rules of Hooks
    const [state, handleSubmit] = useForm("xzdaqvrn");

    const handleEmailCopy = () => {
        const isMobile = window.matchMedia('(hover: none)').matches;
        if (isMobile) {
            window.location.href = 'mailto:mohammedhassan2305@gmail.com';
        } else {
            navigator.clipboard.writeText("mohammedhassan2305@gmail.com");
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2000);
        }
    };

    // --- RECRUITER MODE (Formspree Form) ---
    if (isRecruiterMode) {

        if (state.succeeded) {
            return (
                <section id="contact" className="py-20 bg-dark border-t border-white/5">
                    <div className="container mx-auto px-6 max-w-2xl text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">Message Sent 🚀</h2>
                        <p className="text-neutral-400">
                            Thanks for reaching out! I’ll get back to you soon.
                        </p>
                    </div>
                </section>
            );
        }

        return (
            <section id="contact" className="py-20 bg-dark border-t border-white/5">
                <div className="container mx-auto px-6 max-w-2xl">
                    <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        Get In Touch
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            className="w-full p-4 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500/50 text-white outline-none"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            required
                            className="w-full p-4 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500/50 text-white outline-none"
                        />
                        <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                            className="text-red-400 text-sm"
                        />

                        <textarea
                            name="message"
                            placeholder="Your Message"
                            required
                            rows="5"
                            className="w-full p-4 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500/50 text-white outline-none"
                        />

                        <button
                            type="submit"
                            disabled={state.submitting}
                            className="w-full p-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-medium"
                        >
                            {state.submitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </section>
        );
    }

    // --- NORMAL MODE (Magnetic Cards) ---
    return (
        <section id="contact" className="min-h-screen py-32 bg-gradient-to-b from-dark via-neutral-900 to-dark relative overflow-hidden flex items-center">
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
                </motion.div>

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
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${method.gradient} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500`}></div>
                                <div className="relative bg-neutral-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8 h-full flex flex-col">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${method.gradient} p-0.5 mb-4 group-hover:scale-110 transition-transform`}>
                                        <div className="w-full h-full bg-neutral-900 rounded-xl flex items-center justify-center">
                                            <method.icon className="w-7 h-7 text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{method.name}</h3>
                                    <p className="text-neutral-400 text-sm mb-4 flex-grow">{method.handle}</p>
                                    <div className={`flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${method.gradient} bg-clip-text text-transparent group-hover:translate-x-1 transition-transform`}>
                                        {method.name === "Email" && copiedEmail ? (
                                            <>
                                                <Check className="w-4 h-4" />
                                                Copied!
                                            </>
                                        ) : method.name === "Email" ? (
                                            <>
                                                {window.matchMedia('(hover: none)').matches
                                                    ? <Mail className="w-4 h-4" />
                                                    : <Copy className="w-4 h-4" />}
                                                {window.matchMedia('(hover: none)').matches ? 'Send Email' : 'Copy'}
                                            </>
                                        ) : (
                                            <>
                                                <ExternalLink className="w-4 h-4" />
                                                {method.action}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </MagneticButton>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-center mt-20 text-neutral-500 text-sm"
                >
                    <p>Designed & Built by Mohammed Hassan</p>
                    <p className="mt-2">© 2026. All rights reserved.</p>
                </motion.div>
            </div>
        </section>
    );
};