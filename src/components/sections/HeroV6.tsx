import React, { useEffect, useRef } from 'react';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // --- PARTICLE TEXT ENGINE ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let particles: Particle[] = [];
        // Adjust these for density/performance
        const adjustX = 0;
        const adjustY = 0;

        // Mouse state
        const mouse = { x: 0, y: 0, radius: 100 };

        class Particle {
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            size: number;
            density: number;
            color: string;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.baseX = x; // Origin
                this.baseY = y; // Origin
                this.size = 2;   // Particle Size
                this.density = (Math.random() * 30) + 1;
                this.color = 'white';
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Interaction Physics
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = mouse.radius;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * this.density;
                const directionY = forceDirectionY * force * this.density;

                if (distance < mouse.radius) {
                    // Repulsion
                    this.x -= directionX * 5; // Explosion strength
                    this.y -= directionY * 5;
                    this.color = 'rgb(129, 140, 248)'; // Indigo on interact
                } else {
                    // Return to Origin (Spring)
                    if (this.x !== this.baseX) {
                        const dx = this.x - this.baseX;
                        this.x -= dx / 10; // Return speed
                    }
                    if (this.y !== this.baseY) {
                        const dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                    this.color = 'white';
                }
            }
        }

        const init = () => {
            particles = [];
            // Scale font based on screen width
            const fontSize = Math.min(width * 0.15, 200);
            ctx.fillStyle = 'white';
            ctx.font = `900 ${fontSize}px Inter, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Draw text centered
            ctx.fillText('CREATIVE', width / 2, height / 2 - fontSize * 0.6);
            ctx.fillText('DEVELOPER', width / 2, height / 2 + fontSize * 0.6);

            // Scan pixels
            // We use a skip factor to reduce particles for performance
            const textCoordinates = ctx.getImageData(0, 0, width, height);
            const skip = 4; // Scan every 4th pixel (Adjust for density)

            for (let y = 0; y < textCoordinates.height; y += skip) {
                for (let x = 0; x < textCoordinates.width; x += skip) {
                    // Check alpha > 128
                    if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                        particles.push(new Particle(x, y));
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            // Optional: Connect particles close together for Plexus effect?
            // Expensive loop (O(n^2)), disabled for now to ensure 60fps.

            requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            init(); // Re-scan text positions

        };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
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
        <section className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center cursor-none">

            {/* --- CANVAS PARTICLE LAYER --- */}
            <canvas ref={canvasRef} className="absolute inset-0 z-10" />

            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(50,50,100,0.2)_0%,rgba(0,0,0,0)_70%)]" />
            <div className="absolute inset-0 z-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

            {/* --- UI OVERLAY --- */}
            <div className="absolute bottom-12 z-20 flex flex-col items-center gap-6 pointer-events-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <MagneticButton>
                        <button className="px-8 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors backdrop-blur-sm border border-white/10">
                            Enter Portfolio
                        </button>
                    </MagneticButton>
                </motion.div>

                <p className="text-neutral-500 text-xs tracking-widest uppercase">
                    Interact with the system
                </p>
            </div>

            {/* Custom Cursor */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white mix-blend-difference pointer-events-none z-50 flex items-center justify-center"
                style={{
                    x: useMousePos().x - 16,
                    y: useMousePos().y - 16
                }}
            >
                <div className="w-1 h-1 bg-white rounded-full" />
            </motion.div>

        </section>
    );
};

// Helper hook for cursor custom
const useMousePos = () => {
    const [pos, setPos] = React.useState({ x: 0, y: 0 });
    useEffect(() => {
        const handle = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handle);
        return () => window.removeEventListener('mousemove', handle);
    }, []);
    return pos;
};
