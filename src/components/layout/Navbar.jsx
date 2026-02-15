import React, { useState } from 'react';
import { useMode } from '../../context/ModeContext';
import { Switch } from '../ui/Switch';
import { Menu, X, ArrowRight, Code, Zap, Layers, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const { isRecruiterMode, toggleRecruiterMode } = useMode();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Navbar style based on mode
    const navClasses = isRecruiterMode
        ? "fixed top-0 left-0 right-0 z-50 pointer-events-none" // Transparent in Recruiter Mode since we have the sidebar
        : "fixed top-0 left-0 right-0 z-50 pointer-events-none mix-blend-difference"; // Minimal in Normal Mode

    return (
        <>
            <motion.nav
                className={navClasses}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-6 h-16 flex items-center justify-between pointer-events-auto">

                    {/* Logo */}


                    {/* Recruiter Mode - Vertical Sidebar (Right) */}
                    {isRecruiterMode && (
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="fixed right-0 top-0 bottom-0 w-20 md:w-24 bg-dark/90 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col items-center py-8 gap-8"
                        >
                            {/* Top: Status */}
                            <div className="flex flex-col items-center gap-2 group cursor-help">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-[10px] text-green-400 font-mono uppercase tracking-widest hidden group-hover:block absolute top-14 bg-black/80 px-2 py-1 rounded whitespace-nowrap">
                                    Open to Work
                                </span>
                            </div>

                            {/* Middle: Skills & Stats (Vertical Icons) */}
                            <div className="flex-1 flex flex-col items-center justify-center gap-8 text-white/40">
                                <div className="flex flex-col items-center gap-1 group relative">
                                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 group-hover:text-cyan-400 transition-colors">
                                        <Code size={20} />
                                    </div>
                                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 text-xs font-medium text-white bg-dark/90 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                                        React Ecosystem
                                    </span>
                                </div>
                                <div className="flex flex-col items-center gap-1 group relative">
                                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 group-hover:text-yellow-400 transition-colors">
                                        <Zap size={20} />
                                    </div>
                                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 text-xs font-medium text-white bg-dark/90 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                                        High Performance
                                    </span>
                                </div>
                                <div className="flex flex-col items-center gap-1 group relative">
                                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 group-hover:text-purple-400 transition-colors">
                                        <Layers size={20} />
                                    </div>
                                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 text-xs font-medium text-white bg-dark/90 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                                        Design Systems
                                    </span>
                                </div>
                            </div>

                            {/* Bottom: Actions */}
                            <div className="flex flex-col items-center gap-6">
                                {/* Resume DL */}
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    title="Download Resume"
                                    className="p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 hover:scale-110 transition-all shadow-lg shadow-indigo-500/20"
                                >
                                    <Download size={20} />
                                </a>

                                <div className="h-px w-8 bg-white/10" />

                                {/* Toggle */}
                                <div className="flex flex-col items-center gap-2">
                                    <Switch checked={isRecruiterMode} onCheckedChange={toggleRecruiterMode} className="rotate-90" />
                                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest -rotate-90 mt-4">
                                        Mode
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Mobile Toggle (Always Visible on Mobile) */}
                    <button
                        className="md:hidden text-white z-50 relative group"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <div className="relative w-6 h-6 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                    >
                                        <X />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                    >
                                        <Menu />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </button>
                </div>
            </motion.nav>

            {/* Full Screen Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-dark flex flex-col justify-center px-8 md:hidden"
                    >
                        <nav className="flex flex-col gap-8">
                            {['Projects', 'Experience', 'Contact'].map((item, i) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                                    className="text-5xl font-heading font-bold text-white flex items-center gap-4 group"
                                >
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-700 group-hover:from-white group-hover:to-white transition-all duration-300">
                                        0{i + 1}
                                    </span>
                                    {item}
                                    <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-indigo-500" />
                                </motion.a>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-12 left-8 right-8 pt-8 border-t border-white/10"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-neutral-400">Recruiter Mode</span>
                                <Switch checked={isRecruiterMode} onCheckedChange={toggleRecruiterMode} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
