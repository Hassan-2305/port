import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import { ArrowUpRight, Check } from 'lucide-react';

export const Footer = () => {
    const { isRecruiterMode } = useMode();
    const [time, setTime] = useState(new Date());
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("your.email@example.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socials = [
        { name: "GitHub", link: "https://github.com/Hassan-2305" },
        { name: "LinkedIn", link: "https://linkedin.com/in/yourprofile" },
        { name: "Instagram", link: "https://instagram.com" },
        { name: "Twitter", link: "https://twitter.com" }
    ];

    if (isRecruiterMode) {
        return (
            <footer className="py-8 bg-dark border-t border-white/5 text-center text-neutral-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Hassan Muhammad. All rights reserved.</p>
            </footer>
        );
    }

    return (
        <footer className="relative bg-dark pt-20 pb-10 overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Top Section: CTA & Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">

                    {/* Time & Location */}
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <span className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Version</span>
                            <span className="text-white font-medium">2024 Edition</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Local Time</span>
                            <span className="text-white font-medium">
                                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} GMT+5
                            </span>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4">
                        {socials.map((social) => (
                            <MagneticButton key={social.name} strength={0.3}>
                                <a
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium"
                                >
                                    {social.name}
                                </a>
                            </MagneticButton>
                        ))}
                    </div>
                </div>

                {/* Massive Typography */}
                <div className="relative border-t border-white/10 pt-10">
                    <MagneticButton strength={0.2}>
                        <div
                            className="group relative cursor-pointer overflow-hidden rounded-3xl"
                            onClick={handleCopyEmail}
                        >
                            <motion.h1
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                                className="text-[12vw] md:text-[14vw] font-bold font-heading leading-[0.8] tracking-tighter text-center text-white mix-blend-difference group-hover:text-neutral-400 transition-colors duration-500"
                            >
                                LET'S TALK
                            </motion.h1>

                            {/* Hover Reveal Button */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="bg-indigo-600 text-white rounded-full w-32 h-32 flex items-center justify-center font-medium text-lg shadow-2xl backdrop-blur-md">
                                    {copied ? <Check /> : "Copy Email"}
                                </div>
                            </div>
                        </div>
                    </MagneticButton>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-white/5 text-xs text-neutral-500 uppercase tracking-wider">
                    <p>&copy; {new Date().getFullYear()} Hassan Muhammad</p>
                    <p>Designed & Engineered with Craft</p>
                    <div className="flex items-center gap-1">
                        SCROLL TO TOP <ArrowUpRight size={14} />
                    </div>
                </div>

            </div>
        </footer>
    );
};
