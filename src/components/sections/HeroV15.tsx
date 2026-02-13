import React, { useEffect, useState, useRef } from 'react';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const [text, setText] = useState('INITIALIZING...');
    const [subText, setSubText] = useState('AWAITING_INPUT');
    const [glitchActive, setGlitchActive] = useState(false);

    // --- CYBER GLITCH ENGINE ---

    // Scramble Effect
    useEffect(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&[]';
        const target = 'HASSAN MUHAMMAD';
        const targetSub = 'SENIOR//FRONTEND//ENGINEER';

        let iter = 0;
        const interval = setInterval(() => {
            setText(target.split('').map((letter, index) => {
                if (index < iter) {
                    return letter;
                }
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(''));

            if (iter >= target.length) clearInterval(interval);
            iter += 1 / 3;
        }, 30);

        setTimeout(() => {
            let iter2 = 0;
            const interval2 = setInterval(() => {
                setSubText(targetSub.split('').map((letter, index) => {
                    if (index < iter2) return letter;
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join(''));
                if (iter2 >= targetSub.length) clearInterval(interval2);
                iter2 += 1 / 2;
            }, 30);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Canvas Noise
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const drawNoise = () => {
            const w = canvas.width;
            const h = canvas.height;
            const idata = ctx.createImageData(w, h);
            const buffer32 = new Uint32Array(idata.data.buffer);
            const len = buffer32.length;

            for (let i = 0; i < len; i++) {
                if (Math.random() < 0.05) {
                    buffer32[i] = 0xff00ff00; // Green noise
                } else {
                    buffer32[i] = 0x00000000;
                }
            }
            ctx.putImageData(idata, 0, 0);
            requestAnimationFrame(drawNoise);
        };
        drawNoise();
    }, []);


    // --- RECRUITER MODE ---
    if (isRecruiterMode) {
        return (
            <section className="min-h-[60vh] flex items-center justify-center bg-dark">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl font-bold text-white mb-4">Hassan Muhammad</h1>
                    <p className="text-xl text-neutral-400">Senior Frontend Engineer</p>
                </div>
            </section>
        );
    }

    return (
        <section
            className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center font-mono"
            onMouseEnter={() => setGlitchActive(true)}
            onMouseLeave={() => setGlitchActive(false)}
        >

            {/* --- CRT SCANLINES --- */}
            <div className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                    backgroundSize: '100% 2px, 3px 100%'
                }}
            />

            {/* --- NOISE CANVAS --- */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-10" />

            {/* --- CONTENT --- */}
            <div className="relative z-20 flex flex-col items-start justify-center w-full max-w-5xl px-8 mix-blend-screen pointer-events-none">

                {/* Glitch Container */}
                <div className="relative">
                    {/* RGB Split Layers */}
                    <h1
                        className={`text-5xl md:text-8xl font-black text-[#0f0] tracking-tighter mb-4 ${glitchActive ? 'animate-pulse' : ''}`}
                        style={{
                            textShadow: glitchActive ? '2px 0 #f00, -2px 0 #00f' : 'none',
                            transform: glitchActive ? 'skewX(-10deg)' : 'none'
                        }}
                    >
                        {text}
                    </h1>
                </div>

                <div className="w-full h-[1px] bg-[#0f0] mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white w-20 animate-loading-bar"></div>
                </div>

                <p className="text-[#0f0] text-sm md:text-xl tracking-widest opacity-80 mb-12">
                    {'>'} {subText} <span className="animate-blink">_</span>
                </p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="pointer-events-auto"
                >
                    <MagneticButton>
                        <button className="px-8 py-3 border border-[#0f0] text-[#0f0] font-bold text-xs hover:bg-[#0f0] hover:text-black transition-colors uppercase tracking-[0.2em] relative group overflow-hidden">
                            <span className="relative z-10">Execute_Prgm</span>
                            <div className="absolute inset-0 bg-[#0f0] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                        </button>
                    </MagneticButton>
                </motion.div>

            </div>

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle, transparent 60%, black 100%)' }}
            />

        </section>
    );
};
