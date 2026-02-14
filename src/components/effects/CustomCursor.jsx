import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMode } from '../../context/ModeContext';


export const CustomCursor = () => {
    const { isRecruiterMode, cursorText, cursorVariant } = useMode();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            // Check for interactive elements OR if we have a custom cursor variant set
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

    if (isRecruiterMode) return null;

    const variants = {
        default: {
            height: 16,
            width: 16,
            backgroundColor: "#ffffff",
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            mixBlendMode: "difference"
        },
        project: {
            height: 80,
            width: 80,
            backgroundColor: "#4f46e5", // Indigo-600
            x: mousePosition.x - 40,
            y: mousePosition.y - 40,
            mixBlendMode: "normal"
        },
        text: {
            height: 100,
            width: 100,
            backgroundColor: "#ffffff",
            x: mousePosition.x - 50,
            y: mousePosition.y - 50,
            mixBlendMode: "difference"
        }
    };

    const currentVariant = cursorVariant === 'project' ? 'project' : (isHovering ? 'default' : 'default');

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center overflow-hidden"
            animate={{
                ...variants[currentVariant === 'project' ? 'project' : 'default'],
                scale: isHovering && cursorVariant !== 'project' ? 2.5 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1
            }}
        >
            {cursorText && (
                <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="text-white text-xs font-bold tracking-widest uppercase"
                >
                    {cursorText}
                </motion.span>
            )}
        </motion.div>
    );
};
