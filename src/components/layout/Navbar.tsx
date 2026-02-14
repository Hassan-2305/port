import React, { useState } from 'react';
import { useMode } from '../../context/ModeContext';
import { Switch } from '../ui/Switch';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
    const { isRecruiterMode, toggleRecruiterMode } = useMode();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Navbar style based on mode
    const navClasses = isRecruiterMode
        ? "fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-dark/80 backdrop-blur-xl"
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


                    {/* Desktop Nav (Recruiter Mode Only) */}
                    {isRecruiterMode && (
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#projects" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Projects</a>
                            <a href="#experience" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Experience</a>
                            <a href="#contact" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Contact</a>

                            <div className="h-4 w-px bg-white/10 mx-2" />

                            <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                                    Recruiter Mode
                                </span>
                                <Switch checked={isRecruiterMode} onCheckedChange={toggleRecruiterMode} />
                            </div>
                        </div>
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
