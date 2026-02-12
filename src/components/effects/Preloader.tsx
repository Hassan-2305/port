import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
    onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const duration = 2000;
        const interval = 20;
        const steps = duration / interval;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setCount((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return next;
            });
        }, interval);

        // Safety timeout
        const completeTimer = setTimeout(() => {
            onComplete();
        }, duration + 500);

        return () => {
            clearInterval(timer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[10000] bg-dark flex items-center justify-center text-white overflow-hidden"
        >
            <div className="relative">
                {/* Counter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    className="text-9xl md:text-[12rem] font-heading font-bold tracking-tighter"
                >
                    {Math.round(count)}%
                </motion.div>
            </div>

            {/* Curtain Effect (Optional secondary layer) */}
            <motion.div
                initial={{ height: "100%" }}
                exit={{ height: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
                className="absolute inset-0 bg-indigo-600 z-[-1]"
            />
        </motion.div>
    );
};
