import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
    onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
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

        const completeTimer = setTimeout(() => {
            onComplete();
        }, duration + 800);

        return () => {
            clearInterval(timer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[10000] bg-black flex flex-col justify-between p-8 md:p-12 text-white overflow-hidden"
        >
            {/* Ambient Background Flare */}
            <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/40 via-black to-black z-0 pointer-events-none"
            />

            {/* Top Bar */}
            <div className="flex justify-between items-start z-10 mix-blend-difference">
                <span className="text-xs font-bold font-heading text-white uppercase tracking-tighter">
                    System Ignition
                </span>
                <span className="text-xs font-mono text-white/60 uppercase tracking-widest">
                    V2.4.OBSIDIAN
                </span>
            </div>

            {/* Center: Molten Eclipse */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="relative flex items-center justify-center">

                    {/* Layer 1: The Corona (Hot Glow) */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, rotate: 180 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute w-[25vw] h-[25vw] max-w-[400px] max-h-[400px] rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 blur-2xl opacity-80"
                    />

                    {/* Layer 2: Rotating Flares */}
                    <motion.div
                        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                        transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                        className="absolute w-[22vw] h-[22vw] max-w-[350px] max-h-[350px] rounded-full bg-gradient-to-t from-yellow-400 via-transparent to-transparent blur-xl opacity-60"
                    />

                    {/* Layer 3: The Eclipse (Black Disc) */}
                    <div className="absolute w-[20vw] h-[20vw] max-w-[320px] max-h-[320px] rounded-full bg-black border border-white/5 shadow-[inset_0_0_60px_rgba(0,0,0,1)] z-20" />

                    {/* Ring: Gold Rim */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[20.2vw] h-[20.2vw] max-w-[324px] max-h-[324px] rounded-full border border-yellow-500/50 z-20 opacity-80"
                    />

                    {/* Content: Main Counter inside Eclipse */}
                    <div className="relative z-30 flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.5, blur: "10px" }}
                            animate={{ scale: 1, blur: "0px" }}
                            transition={{ duration: 0.5 }}
                            className="text-6xl md:text-8xl font-bold font-heading text-white tracking-tighter"
                        >
                            {Math.round(count).toString().padStart(2, '0')}
                        </motion.div>
                        <span className="text-[10px] font-mono text-yellow-500 uppercase tracking-[0.3em] mt-2">
                            Initializing
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar: Loading Status */}
            <div className="flex justify-between items-end z-10 mix-blend-difference">
                <div className="flex flex-col gap-1 w-full max-w-xs">
                    <div className="flex justify-between text-[10px] font-mono text-white/60 uppercase tracking-widest mb-2">
                        <span>Loading Assets</span>
                        <span>{Math.round(count)}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400"
                            initial={{ width: "0%" }}
                            animate={{ width: `${count}%` }}
                            transition={{ ease: "linear" }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
