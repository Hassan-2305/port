import React, { useEffect, useRef } from 'react';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // --- EVENT HORIZON ENGINE ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particleCount = 2000;
        const center = { x: width / 2, y: height / 2 };
        const particles: Particle[] = [];

        class Particle {
            x: number;
            y: number;
            radius: number; // Distance from center
            angle: number;
            speed: number;
            size: number;
            color: string;
            orbitEccentricity: number;

            constructor() {
                this.x = 0;
                this.y = 0;
                this.radius = Math.random() * (Math.max(width, height) * 0.8) + 50;
                this.angle = Math.random() * Math.PI * 2;
                this.speed = (Math.random() * 0.002) + 0.001;
                this.size = Math.random() * 2 + 0.5;
                this.orbitEccentricity = Math.random() * 0.2;

                // Colors: White -> Cyan -> Violet -> Deep Space
                const r = Math.random();
                if (r > 0.9) this.color = '#ffffff'; // White hot
                else if (r > 0.6) this.color = '#a5f3fc'; // Cyan light
                else if (r > 0.3) this.color = '#818cf8'; // Indigo
                else this.color = '#4c1d95'; // Deep Violet
            }

            update() {
                // Orbital Velocity: Closer = Faster
                // v ~ 1/sqrt(r)
                const velocity = this.speed * (500 / (this.radius + 1));
                this.angle += velocity;
                this.radius -= 0.5; // Spiral inward gravity

                // Reset if sucked in
                if (this.radius < 20) {
                    this.radius = Math.max(width, height) * 0.8;
                    this.angle = Math.random() * Math.PI * 2;
                }

                // Calculate Position with slight elliptical distortion
                this.x = center.x + Math.cos(this.angle) * this.radius * (1 + this.orbitEccentricity);
                this.y = center.y + Math.sin(this.angle) * this.radius;

                // Mouse interaction: Gravity Warp
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    this.x -= dx * 0.05;
                    this.y -= dy * 0.05;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const init = () => {
            particles.length = 0;
            center.x = width / 2;
            center.y = height / 2;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        let mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const animate = () => {
            // Motion Blur / Trails: Fade out slowly
            ctx.fillStyle = 'rgba(2, 2, 5, 0.1)';
            ctx.fillRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw The Void (Black hole center)
            ctx.beginPath();
            ctx.arc(center.x, center.y, 40, 0, Math.PI * 2);
            ctx.fillStyle = 'black';
            ctx.fill();

            // Accretion Glow
            const gradient = ctx.createRadialGradient(center.x, center.y, 30, center.x, center.y, 60);
            gradient.addColorStop(0, 'rgba(0,0,0,1)');
            gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.2)');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gradient;
            ctx.fill();

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
        <section className="relative h-screen w-full bg-[#020205] overflow-hidden flex flex-col items-center justify-center">

            {/* --- BLACK HOLE CANVAS --- */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* --- CONTENT --- */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center mix-blend-screen pointer-events-none">

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="flex flex-col items-center"
                >
                    <h1 className="text-[12vw] font-black font-heading text-white tracking-tighter leading-[0.8]">
                        EVENT
                    </h1>
                    <h1 className="text-[12vw] font-black font-heading text-transparent bg-clip-text bg-gradient-to-b from-white to-black tracking-tighter leading-[0.8] blur-sm opacity-80">
                        HORIZON
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 pointer-events-auto"
                >
                    <MagneticButton>
                        <button className="px-8 py-3 bg-white hover:bg-white text-black font-bold rounded-full transition-all shadow-[0_0_50px_rgba(255,255,255,0.5)]">
                            Enter Variance
                        </button>
                    </MagneticButton>
                </motion.div>

                <p className="mt-8 text-white/40 text-xs uppercase tracking-[0.5em]">
                    Singularity Reached
                </p>

            </div>

        </section>
    );
};
