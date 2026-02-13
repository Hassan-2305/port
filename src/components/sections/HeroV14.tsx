import React, { useEffect, useRef } from 'react';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // --- SINGULARITY ENGINE ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        interface Particle {
            angle: number;
            radius: number;
            speed: number;
            size: number;
            color: string;
            decay: number;
        }

        const particles: Particle[] = [];
        const particleCount = 2000;
        const holeRadius = 150; // Event Horizon
        const maxRadius = Math.max(width, height) * 0.8;

        const initParticle = (): Particle => {
            const angle = Math.random() * Math.PI * 2;
            const radius = holeRadius + Math.random() * (maxRadius - holeRadius);
            // Closer = Faster
            const speed = (0.02 + Math.random() * 0.02) * (holeRadius / radius);

            // Hotter (white/blue) near center, cooler (red/orange) near edge
            const distRatio = (radius - holeRadius) / (maxRadius - holeRadius);
            let color = '#fff';
            if (distRatio < 0.1) color = '#bfdbfe'; // Blue-ish White (Hot)
            else if (distRatio < 0.3) color = '#fef3c7'; // Gold
            else if (distRatio < 0.6) color = '#f97316'; // Orange
            else color = '#991b1b'; // Dark Red

            return {
                angle,
                radius,
                speed,
                size: Math.random() * 2 + 0.5,
                color,
                decay: 0.2 + Math.random() * 0.5
            };
        };

        // Init Pool
        for (let i = 0; i < particleCount; i++) {
            particles.push(initParticle());
        }

        let time = 0;

        const animate = () => {
            // Motion Blur / Trail
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Heavy trails
            ctx.fillRect(0, 0, width, height);

            // If trails are too heavy, the black hole center gets messy.
            // We need to FORCE black center.
            const cx = width / 2;
            const cy = height / 2;

            time += 0.01;

            // Draw Lens/Accretion
            particles.forEach((p, i) => {
                // Physics
                p.angle += p.speed;
                p.radius -= p.decay;

                // Reset if sucked in
                if (p.radius < holeRadius) {
                    particles[i] = initParticle();
                    particles[i].radius = maxRadius; // Spawn at edge
                }

                const x = cx + Math.cos(p.angle) * p.radius;
                const y = cy + Math.sin(p.angle) * p.radius;

                // Draw Streak ( Tangent )
                const tailLen = p.radius * 0.05 * p.speed * 50; // Longer tail if fast/outer? No, fast inner.
                // Actually inner is faster.

                const tx = cx + Math.cos(p.angle - 0.1) * p.radius;
                const ty = cy + Math.sin(p.angle - 0.1) * p.radius;

                ctx.strokeStyle = p.color;
                ctx.lineWidth = p.size;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(tx, ty);
                ctx.stroke();
            });

            // Draw The VOID (Event Horizon)
            // Radial Gradient for Glow
            const glow = ctx.createRadialGradient(cx, cy, holeRadius * 0.8, cx, cy, holeRadius * 1.5);
            glow.addColorStop(0, '#000');
            glow.addColorStop(0.5, '#000'); // Sharp edge
            glow.addColorStop(0.51, 'rgba(251, 191, 36, 0.5)'); // Golden Ring
            glow.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.fillStyle = glow;
            ctx.fillRect(cx - holeRadius * 2, cy - holeRadius * 2, holeRadius * 4, holeRadius * 4);

            // True Black Center (Anti-aliased circle)
            ctx.beginPath();
            ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#000000';
            ctx.fill();
            // Rim Light
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.stroke();

            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        animate();

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

            {/* --- CANVAS --- */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* --- CONTENT --- */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center w-full px-4 mix-blend-difference pointer-events-none">

                <motion.div
                    initial={{ opacity: 0, letterSpacing: '2em' }}
                    animate={{ opacity: 1, letterSpacing: '0.5em' }}
                    transition={{ duration: 2, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-8xl font-black text-white uppercase mb-2">
                        Horizon
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="text-white font-mono text-xs uppercase tracking-[0.3em]"
                >
                    The Point of No Return
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="pointer-events-auto mt-12"
                >
                    <MagneticButton>
                        <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-colors">
                            Enter
                        </button>
                    </MagneticButton>
                </motion.div>

            </div>

        </section>
    );
};
