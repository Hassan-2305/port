import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMode } from '../../context/ModeContext';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number; // How strong the pull is (default 0.5)
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className = "",
    strength = 0.5
}) => {
    const { isRecruiterMode } = useMode();
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isRecruiterMode) return; // Disable effect in Recruiter Mode

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const x = (clientX - centerX) * strength;
        const y = (clientY - centerY) * strength;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`inline-block ${className}`}
        >
            {children}
        </motion.div>
    );
};
