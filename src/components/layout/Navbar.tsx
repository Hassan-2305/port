import React, { useState } from 'react';
import { useMode } from '../../context/ModeContext';
import { Switch } from '../ui/Switch';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
    const { isRecruiterMode, toggleRecruiterMode } = useMode();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (!isRecruiterMode) return null; // Hide in Normal Mode (use Floating Dock)

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-dark/80 backdrop-blur-xl"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <div className="font-heading font-bold text-xl tracking-tighter text-white">
                    DEV<span className="text-indigo-500">.Portfolio</span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#projects" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Projects</a>
                    <a href="#experience" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Experience</a>
                    <a href="#contact" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Contact</a>

                    <div className="h-4 w-px bg-white/10 mx-2" />

                    <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                        <span className={`text-xs font-semibold uppercase tracking-wider ${isRecruiterMode ? 'text-indigo-400' : 'text-neutral-400'}`}>
                            Recruiter Mode
                        </span>
                        <Switch checked={isRecruiterMode} onCheckedChange={toggleRecruiterMode} />
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-neutral-300"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-dark border-b border-white/5 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            <a href="#projects" className="text-lg font-medium text-neutral-300" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
                            <a href="#experience" className="text-lg font-medium text-neutral-300" onClick={() => setIsMobileMenuOpen(false)}>Experience</a>
                            <a href="#contact" className="text-lg font-medium text-neutral-300" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>

                            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                <span className="text-sm font-medium text-neutral-400">Recruiter Mode</span>
                                <Switch checked={isRecruiterMode} onCheckedChange={toggleRecruiterMode} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
