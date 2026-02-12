import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useMode } from '../../context/ModeContext';
import { Home, User, Briefcase, Mail, Zap } from 'lucide-react';

export const FloatingDock: React.FC = () => {
    const { isRecruiterMode, setRecruiterMode } = useMode();
    const mouseX = useMotionValue(Infinity);

    if (isRecruiterMode) return null; // Hide in Recruiter Mode (use standard nav or strip)

    return (
        <div className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50 h-16 items-end gap-4 rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-xl px-4 pb-3">
            <DockIcon mouseX={mouseX} icon={<Home size={20} />} label="Home" onClick={() => window.scrollTo(0, 0)} />
            <DockIcon mouseX={mouseX} icon={<User size={20} />} label="About" href="#skills" />
            <DockIcon mouseX={mouseX} icon={<Briefcase size={20} />} label="Work" href="#projects" />
            <DockIcon mouseX={mouseX} icon={<Mail size={20} />} label="Contact" href="#contact" />

            <div className="w-px h-8 bg-white/10 my-auto" />

            <DockIcon
                mouseX={mouseX}
                icon={<Zap size={20} className="text-yellow-400" />}
                label="Recruiter Mode"
                onClick={() => setRecruiterMode(true)}
            />
        </div>
    );
};

const DockIcon = ({ mouseX, icon, label, href, onClick }: any) => {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
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
