import React, { useEffect, useRef } from 'react';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // --- GENERATIVE FLOW ENGINE ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Configuration
        const particleCount = 2000;
        const noiseScale = 0.005;
        const speed = 1.5;
        const particles: Particle[] = [];
        let time = 0;

        // Custom Pseudo-Noise (Simple Value Noise)
        // A real Perlin implementation is long, this is a fast hacky version
        // that looks smooth enough for flow fields.
        const noise = (x: number, y: number, z: number) => {
            return Math.sin(x * noiseScale + z) * Math.cos(y * noiseScale + z);
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            history: { x: number, y: number }[];
            color: string;
            life: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = 0;
                this.vy = 0;
                this.history = [];
                this.life = Math.random() * 100;

                // Color Palette: Electric Blue / Purple / White
                const colors = ['#ffffff', '#818cf8', '#c084fc', '#22d3ee'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update(t: number) {
                // Get flow angle from noise
                const angle = noise(this.x, this.y, t) * Math.PI * 4;

                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;

                this.x += this.vx;
                this.y += this.vy;

                // Screen Wrap
                if (this.x > width) { this.x = 0; this.history = []; }
                if (this.x < 0) { this.x = width; this.history = []; }
                if (this.y > height) { this.y = 0; this.history = []; }
                if (this.y < 0) { this.y = height; this.history = []; }

                // Trail History
                this.history.push({ x: this.x, y: this.y });
                if (this.history.length > 10) this.history.shift();
            }

            draw() {
                if (!ctx || this.history.length < 2) return;
                ctx.beginPath();
                ctx.moveTo(this.history[0].x, this.history[0].y);
                for (let i = 1; i < this.history.length; i++) {
                    ctx.lineTo(this.history[i].x, this.history[i].y);
                }
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1; // Fine lines
                ctx.stroke();
            }
        }

        const init = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            // Fade Trail Effect: Draw semi-transparent black rect instead of clearRect
            ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
            ctx.fillRect(0, 0, width, height);

            time += 0.002; // Slow evolution of the field

            particles.forEach(p => {
                p.update(time);
                p.draw();
            });

            requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            init();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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

            {/* --- GENERATIVE CANVAS --- */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] z-10" />

            {/* --- CONTENT --- */}
            <div className="relative z-20 flex flex-col items-center mix-blend-difference text-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="mb-6 relative"
                >
                    <div className="absolute inset-0 bg-white blur-[50px] opacity-20 rounded-full" />
                    <h1 className="relative text-[8vw] md:text-[6vw] font-bold font-heading text-white tracking-tighter leading-none">
                        GENERATIVE
                    </h1>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="text-[8vw] md:text-[6vw] font-bold font-heading text-white/80 tracking-tighter leading-none"
                >
                    EXPERIENCE
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-12 flex flex-col items-center gap-6"
                >
                    <p className="font-mono text-neutral-400 text-sm tracking-widest uppercase">
                        Hassan Muhammad
                    </p>
                    <MagneticButton>
                        <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                            Explore Work
                        </button>
                    </MagneticButton>
                </motion.div>

            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 flex flex-col items-center gap-2 text-white/50 z-20"
            >
                <ArrowDown size={16} className="animate-bounce" />
            </motion.div>

        </section>
    );
};
