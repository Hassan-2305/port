import React, { useEffect, useRef } from 'react';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // --- KINETIC MIRROR ENGINE ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let mouseX = 0;
        let mouseY = 0;
        let pMouseX = 0;
        let pMouseY = 0;
        let mouseSpeed = 0;

        // Grid Settings
        const tileSize = 30; // Size of each mirror
        const gap = 2; // Gap between mirrors

        interface Tile {
            x: number;
            y: number;
            angle: number;
            velocity: number;
        }

        const tiles: Tile[] = [];
        let cols = 0;
        let rows = 0;

        const init = () => {
            tiles.length = 0;
            const fullSize = tileSize + gap;
            cols = Math.ceil(width / fullSize);
            rows = Math.ceil(height / fullSize);

            // Center the grid
            const startX = (width - (cols * fullSize)) / 2;
            const startY = (height - (rows * fullSize)) / 2;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    tiles.push({
                        x: startX + i * fullSize + fullSize / 2,
                        y: startY + j * fullSize + fullSize / 2,
                        angle: 0,
                        velocity: 0
                    });
                }
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            pMouseX = mouseX;
            pMouseY = mouseY;
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Calc instantaneous speed
            const dx = mouseX - pMouseX;
            const dy = mouseY - pMouseY;
            mouseSpeed = Math.hypot(dx, dy);
        };

        const animate = () => {
            // Dark Background
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, width, height);

            tiles.forEach(tile => {
                // Physics: Mouse Interaction
                const dx = mouseX - tile.x;
                const dy = mouseY - tile.y;
                const dist = Math.hypot(dx, dy);
                const triggerDist = 150;

                if (dist < triggerDist) {
                    // Add torque based on mouse movement speed and proximity
                    // The closer and faster, the more it spins
                    const force = (triggerDist - dist) / triggerDist;
                    tile.velocity += force * mouseSpeed * 0.005;
                }

                // Physics: Integration
                tile.angle += tile.velocity;
                tile.velocity *= 0.92; // Friction/Air Resistance causes spin to stop eventually

                // Rendering
                // Calculate "Light" based on angle. When facing front (angle 0), it's bright.
                // When facing side (angle PI/2), it's dark.
                // We use cos(angle) for this projection.
                const projection = Math.cos(tile.angle);
                const brightness = Math.abs(projection);

                // Color Logic: Metallic Slate -> White
                // We fake lighting. Front face catches light.
                const val = Math.floor(brightness * 200) + 55; // 55-255
                ctx.fillStyle = `rgb(${val}, ${val}, ${val + 10})`; // Slight blue tint for steel look

                // 3D Rotation Simulation:
                // We scale the width based on the projection to simulate Y-axis rotation
                const w = tileSize * Math.abs(projection); // Use abs to prevent negative width flipping

                // Optimization: Don't draw thin slivers
                if (w > 0.5) {
                    ctx.save();
                    ctx.translate(tile.x, tile.y);
                    ctx.fillRect(-w / 2, -tileSize / 2, w, tileSize);
                    ctx.restore();
                }
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
        <section className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center">

            {/* --- KINETIC CANVAS --- */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* --- CONTENT --- */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center pointer-events-none mix-blend-difference text-white">

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-8"
                >
                    <div className="text-xs font-mono uppercase tracking-[0.5em] text-neutral-400">
                        Kinetic Architecture
                    </div>
                </motion.div>

                <h1 className="text-[12vw] font-black font-heading tracking-tighter leading-[0.8]">
                    REFLECT
                </h1>
                <h1 className="text-[12vw] font-black font-heading tracking-tighter leading-[0.8] text-neutral-500">
                    REALITY
                </h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 pointer-events-auto"
                >
                    <MagneticButton>
                        <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-wider text-xs rounded-full hover:bg-neutral-300 transition-all">
                            Interact
                        </button>
                    </MagneticButton>
                </motion.div>

            </div>

        </section>
    );
};
