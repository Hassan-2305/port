import React, { useEffect, useRef } from 'react';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // --- LIQUID CHROME ENGINE (METABALLS) ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particleCount = 60;
        const particles: Particle[] = [];
        let mouseX = width / 2;
        let mouseY = height / 2;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            baseRadius: number;
            angle: number;
            speed: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.baseRadius = Math.random() * 40 + 20;
                this.radius = this.baseRadius;
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 0.02 + 0.005;
            }

            update() {
                // Move in organic swirling patterns
                this.angle += this.speed;

                // Attract to center (Gravity)
                const centerX = width / 2;
                const centerY = height / 2;

                const dx = centerX - this.x;
                const dy = centerY - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Orbit logic
                this.vx += dx * 0.0005;
                this.vy += dy * 0.0005;

                // Mouse Repulsion
                const mDx = mouseX - this.x;
                const mDy = mouseY - this.y;
                const mDist = Math.sqrt(mDx * mDx + mDy * mDy);

                if (mDist < 300) {
                    const force = (300 - mDist) / 300;
                    this.vx -= mDx * 0.05 * force;
                    this.vy -= mDy * 0.05 * force;
                }

                // Drag/Friction
                this.vx *= 0.96;
                this.vy *= 0.96;

                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Solid white for metaball thresholding
                ctx.fill();
            }
        }

        const init = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
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
        <section className="relative h-screen w-full bg-[#000000] overflow-hidden flex flex-col items-center justify-center">

            {/* --- LIQUID CHROME CANVAS --- 
                Crucial: The filter contrast(30) + blur(20px) creates the "Goo/Liquid" effect from the white particles.
            */}
            <div className="absolute inset-0 z-0 filter blur-[20px] contrast-[50] bg-black">
                <canvas ref={canvasRef} className="w-full h-full" />
            </div>

            {/* --- OVERLAY TEXT --- 
                Mix-blend-mode: difference creates that "inverted" look when text crosses the white liquid.
            */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center pointer-events-none mix-blend-difference text-white">

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-8"
                >
                    <div className="text-xs font-mono uppercase tracking-[0.5em] opacity-80">
                        Digital Alchemy
                    </div>
                </motion.div>

                <h1 className="text-[15vw] font-bold font-heading tracking-tighter leading-[0.8]">
                    FLUID
                </h1>
                <h1 className="text-[15vw] font-bold font-heading italic font-serif tracking-tighter leading-[0.8]">
                    FORM
                </h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 pointer-events-auto"
                >
                    <MagneticButton>
                        <button className="px-8 py-3 ring-1 ring-white/50 text-white rounded-full hover:bg-white hover:text-black transition-all">
                            Enter Experience
                        </button>
                    </MagneticButton>
                </motion.div>

            </div>

            {/* Grain Overlay for texture */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat brightness-100 z-30" />

        </section>
    );
};
