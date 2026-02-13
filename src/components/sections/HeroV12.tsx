import React, { useEffect, useRef } from 'react';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // --- ASCENSION ENGINE ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Static Stars
        const stars: { x: number, y: number, size: number, alpha: number }[] = [];
        for (let i = 0; i < 100; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height * 0.6, // Only top half
                size: Math.random() * 1.5,
                alpha: Math.random()
            });
        }

        let time = 0;

        const animate = () => {
            time += 0.005;

            // Background
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;

            // --- 1. STARS ---
            ctx.fillStyle = 'white';
            stars.forEach(s => {
                ctx.globalAlpha = s.alpha * (0.5 + Math.sin(time + s.x) * 0.5); // Twinkle
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            // --- 2. THE CRESCENT (Upper Arc) ---
            // A thin, glowing arc intersecting the beam
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 1;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'white';

            ctx.beginPath();
            // Draw an arc that looks like a planet rim or halo
            ctx.ellipse(centerX, centerY - 150, 200, 50, 0, 0, Math.PI); // Half ellipse
            ctx.stroke();

            ctx.shadowBlur = 0;

            // --- 3. THE BEAM ---
            // Sharp, intense beam
            const beamWidth = 40; // Narrower
            const beamGrad = ctx.createLinearGradient(0, 0, 0, height);
            beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
            beamGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.1)');
            beamGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.8)'); // Bright at landing 
            beamGrad.addColorStop(1, 'rgba(255, 255, 255, 1)'); // Blinding at impact

            ctx.fillStyle = beamGrad;
            ctx.globalCompositeOperation = 'screen'; // Light blend
            ctx.fillRect(centerX - beamWidth / 2, -100, beamWidth, height);

            // Core of beam (Extra bright center)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillRect(centerX - 2, -100, 4, height);

            ctx.globalCompositeOperation = 'source-over';

            // --- 4. THE PLANET (Silhouette) ---
            // Massive arc blocking the bottom
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(centerX, height + 400, 800, 0, Math.PI * 2);
            ctx.fill();

            // --- 5. THE STEPS (Illumination) ---
            // Drawing illuminated "steps" on the planet surface where the beam hits
            const stepCount = 5;
            const startY = height - 150;
            const stepHeight = 20;

            for (let i = 0; i < stepCount; i++) {
                const y = startY + i * stepHeight;
                const progress = i / stepCount; // 0 to 1

                // Light intensity fades as it goes down/out
                const widthVal = 300 + i * 50;
                const heightVal = 40;

                // Gradient for the step surface (Lit center, dark edges)
                const stepGrad = ctx.createRadialGradient(centerX, y, 0, centerX, y, widthVal / 2);
                stepGrad.addColorStop(0, `rgba(255, 255, 255, ${0.8 - progress * 0.5})`); // Bright center
                stepGrad.addColorStop(0.3, `rgba(255, 255, 255, ${0.1 - progress * 0.1})`);
                stepGrad.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.fillStyle = stepGrad;

                // Draw curve (Perspective Step)
                ctx.beginPath();
                ctx.ellipse(centerX, y, widthVal / 2, heightVal / 2, 0, 0, Math.PI * 2);
                ctx.fill();

                // Hard edge for step definition
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - progress * 0.1})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // --- 6. IMPACT FLARE ---
            // Where beam hits the first step
            ctx.fillStyle = 'white';
            ctx.shadowBlur = 50;
            ctx.shadowColor = 'white';
            ctx.beginPath();
            ctx.ellipse(centerX, startY, 60, 10, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
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
        <section className="relative h-screen w-full bg-[#000000] overflow-hidden flex flex-col items-center justify-center">

            {/* --- CANVAS BACKGROUND --- */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* --- CONTENT --- */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center w-full px-4 h-full">

                {/* Float content higher to sit in the empty space above the planet */}
                <div className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-light text-white tracking-[0.2em] mb-4 uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                            Ascension
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="h-[1px] w-24 bg-white/50 mx-auto mb-6"
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                    >
                        <MagneticButton>
                            <button className="px-10 py-4 bg-transparent border border-white/20 text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500">
                                Enter
                            </button>
                        </MagneticButton>
                    </motion.div>
                </div>

            </div>

        </section>
    );
};
