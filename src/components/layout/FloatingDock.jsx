import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { Home, User, Briefcase, Mail, Zap } from 'lucide-react';

export const FloatingDock = () => {
    const { isRecruiterMode, setRecruiterMode } = useMode();
    const mouseX = useMotionValue(Infinity);

    if (isRecruiterMode) return null; // Hide in Recruiter Mode (use standard nav or strip)

    return (
        <div className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50 h-16 items-end gap-4 rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-xl px-4 pb-3">
            <DockIcon mouseX={mouseX} icon={<Home size={20} />} label="Home" onClick={() => window.scrollTo(0, 0)} />
            <DockIcon mouseX={mouseX} icon={<User size={20} />} label="About" href="#academic" />
            <DockIcon mouseX={mouseX} icon={<Briefcase size={20} />} label="Work" href="#projects" />
            <DockIcon mouseX={mouseX} icon={<Mail size={20} />} label="Contact" href="#contact" />

            <div className="w-px h-8 bg-white/10 my-auto" />

            <div className="relative group">
                <DockIcon
                    mouseX={mouseX}
                    icon={<Zap size={20} className="text-yellow-400" />}
                    label="Recruiter Mode"
                    onClick={() => setRecruiterMode(true)}
                />
                {!isRecruiterMode && (
                    <div className="absolute bottom-0 left-full ml-6 mb-2 pointer-events-none hidden xl:block w-32">
                        <div className="relative">
                            <span className="absolute -top-8 left-2 text-white/90 font-handwriting text-2xl rotate-6 whitespace-nowrap">
                                Recruiter?
                            </span>
                            <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="-translate-x-2 translate-y-1">
                                <path d="M50 0 C 50 15, 40 25, 10 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
                                <path d="M10 30 L 18 25 M 10 30 L 16 36" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


const DockIcon = ({ mouseX, icon, label, href, onClick }) => {
    const ref = useRef(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className="aspect-square rounded-full bg-white/10 flex items-center justify-center relative group cursor-pointer hover:bg-white/20 transition-colors"
            onClick={onClick}
        >
            {href ? (
                <a href={href} className="flex items-center justify-center w-full h-full text-white">
                    {icon}
                </a>
            ) : (
                <button className="flex items-center justify-center w-full h-full text-white">
                    {icon}
                </button>
            )}

            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-800 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                {label}
            </span>
        </motion.div>
    );
};
