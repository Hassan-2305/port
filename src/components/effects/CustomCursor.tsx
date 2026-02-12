import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMode } from '../../context/ModeContext';

export const CustomCursor: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Don't show custom cursor in Recruiter Mode (keep it standard/system)
    // Also hide on touch devices (simplified check)
    if (isRecruiterMode) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white mixed-blend-difference pointer-events-none z-[9999] hidden md:block"
            animate={{
                x: mousePosition.x - 8,
                y: mousePosition.y - 8,
                scale: isHovering ? 2.5 : 1,
                opacity: 1 // TODO: Fade in initially
            }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1
            }}
            style={{
                mixBlendMode: 'difference'
            }}
        />
    );
};
