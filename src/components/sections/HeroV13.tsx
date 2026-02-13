import React, { useEffect, useRef } from 'react';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // --- SILK & VOID ENGINE ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let time = 0;
        let mouseX = width / 2;
        let mouseY = height / 2;

        const lines = 80; // Number of silk threads
        const points = 100; // Resolution

        const animate = () => {
            // Trail Effect? No, clean redraw for silk.
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, width, height);

            time += 0.005;

            // Draw Silk
            for (let i = 0; i < lines; i++) {
                ctx.beginPath();

                // Color Gradient Simulation based on index
                // Metallic / Iridescent
                const hue = (i / lines) * 40 + 200; // Blue to Cyan/Purple
                const brightness = 50 + Math.sin(time + i * 0.1) * 20;
                ctx.strokeStyle = `hsla(${hue}, 70%, ${brightness}%, 0.3)`;
                ctx.lineWidth = 1;

                // Vertical Offset for this line
                const baseline = height / 2 + (i - lines / 2) * 5;

                for (let j = 0; j <= points; j++) {
                    const x = (j / points) * width;

                    // Normalized coords
                    const nx = j / points;

                    // Interactive Wind
                    const dx = x - mouseX;
                    const dy = baseline - mouseY;
                    const dist = Math.hypot(dx, dy);
                    let turbulence = 0;
                    if (dist < 300) {
                        turbulence = Math.sin(dist * 0.05 - time * 10) * 20 * ((300 - dist) / 300);
                    }

                    // Harmonics
                    // Base Wave
                    let y = baseline;
                    y += Math.sin(nx * 5 + time + i * 0.05) * 50;
                    // Secondary Wave
                    y += Math.cos(nx * 15 + time * 2) * 20;
                    // Noise/Texture
                    y += Math.sin(nx * 50 + time) * 2;

                    y += turbulence;

                    if (j === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        }
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
        <section className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center">

            {/* --- CANVAS --- */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* --- CONTENT --- */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center w-full px-4 text-white pointer-events-none mix-blend-screen">

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-4xl md:text-6xl font-extralight tracking-[0.2em] uppercase font-sans mb-8"
                >
                    Ethereal
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="pointer-events-auto"
                >
                    <MagneticButton>
                        <button className="px-12 py-4 rounded-full border-[0.5px] border-white/30 text-white hover:bg-white hover:text-black transition-all text-[10px] tracking-[0.3em] uppercase">
                            Explore
                        </button>
                    </MagneticButton>
                </motion.div>

            </div>

        </section>
    );
};
