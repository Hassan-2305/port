import React, { useEffect, useRef } from 'react';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // --- GRAVITY TOPOGRAPHY ENGINE ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Grid Settings
        const cols = 50;
        const rows = 40;
        const spacing = 40; // World units

        interface Point {
            x: number; // World X
            y: number; // World Y (Height)
            z: number; // World Z (Depth)
            baseY: number;
            vy: number; // Velocity Y
            force: number;
        }

        const points: Point[] = [];

        const init = () => {
            points.length = 0;
            // Center grid
            const startX = -(cols * spacing) / 2;
            const startZ = 0; // Start at screen plane and go back

            for (let z = 0; z < rows; z++) {
                for (let x = 0; x < cols; x++) {
                    points.push({
                        x: startX + x * spacing,
                        y: 0,
                        z: startZ + z * spacing,
                        baseY: 0,
                        vy: 0,
                        force: 0
                    });
                }
            }
        };

        // Projection Settings
        const fov = 300;
        const cameraY = -200; // Camera height
        const cameraZ = -300; // Camera position back

        const project = (p: Point) => {
            const scale = fov / (fov + p.z - cameraZ);
            const x2d = p.x * scale + width / 2;
            const y2d = (p.y - cameraY) * scale + height / 2;
            return { x: x2d, y: y2d, scale };
        };

        let mouseX = 0;
        let mouseY = 0;
        let isMoving = false;

        const handleMouseMove = (e: MouseEvent) => {
            // Need to map 2D mouse to 3D roughly
            mouseX = (e.clientX - width / 2);
            // Approximate Z based on screen Y?
            // This is tricky without raycasting.
            // Let's just use simple screen mapping for interaction zone
            mouseY = e.clientY;
            isMoving = true;
        };

        const animate = () => {
            ctx.fillStyle = '#020617'; // Deep Slate
            ctx.fillRect(0, 0, width, height);

            // Physics Loop
            points.forEach((p, i) => {
                // Neighbors indices
                // We want to verify bounds
                const r = Math.floor(i / cols);
                const c = i % cols;

                // Simple Spring Physics to return to BaseY
                const k = 0.05; // Spring constant
                const damp = 0.95; // Damping
                const accel = (p.baseY - p.y) * k;

                p.vy += accel;
                p.vy *= damp;
                p.y += p.vy;

                // Mouse Interaction (Raycast Approximation)
                // Project point to 2D first to check distance to mouse
                const proj = project(p);
                const dx = eMouseX - proj.x;
                const dy = eMouseY - proj.y;
                const dist = Math.hypot(dx, dy);

                if (dist < 100 && isMoving) {
                    const force = (100 - dist) / 100;
                    p.vy -= force * 10; // Push DOWN/UP
                }
            });

            // Rendering Loop
            ctx.lineWidth = 1;

            for (let i = 0; i < points.length; i++) {
                const r = Math.floor(i / cols);
                const c = i % cols;

                if (c < cols - 1 && r < rows - 1) {
                    const p1 = project(points[i]);
                    const p2 = project(points[i + 1]);       // Right neighbor
                    const p3 = project(points[i + cols]);    // Bottom neighbor

                    // Cull points behind camera or too far
                    if (p1.scale > 0 && p1.scale < 3) {

                        // Color based on height
                        // Peaks are Cyan, Valleys are Blue
                        const heightVal = points[i].y;
                        const hue = 200 + heightVal * 0.5; // Shift hue
                        const lightness = 60 + heightVal * 0.2; // Shift light
                        const alpha = Math.min(1, p1.scale * 0.5); // Fade dist

                        ctx.strokeStyle = `hsla(${hue}, 80%, ${lightness}%, ${alpha})`;

                        // Draw Triangle 1 (Horizontal line)
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();

                        // Draw Triangle 2 (Vertical line)
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p3.x, p3.y);
                        ctx.stroke();
                    }
                }
            }

            // Auto-wave
            const time = Date.now() * 0.002;
            points.forEach((p, i) => {
                const r = Math.floor(i / cols);
                const c = i % cols;
                // Add sine wave to baseY
                p.baseY = Math.sin(r * 0.5 + time) * 30 + Math.cos(c * 0.5 + time) * 30;
            });

            // Decay mouse influence
            isMoving = false;

            requestAnimationFrame(animate);
        };

        let eMouseX = 0;
        let eMouseY = 0;
        const onMove = (e: MouseEvent) => {
            eMouseX = e.clientX;
            eMouseY = e.clientY;
            handleMouseMove(e);
        }

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
        window.addEventListener('mousemove', onMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMove);
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
        <section className="relative h-screen w-full bg-[#020617] overflow-hidden flex flex-col items-center justify-center">

            {/* --- TOPOGRAPHY CANVAS --- */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* --- VIGNETTE --- */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,#020617_90%)] z-10" />

            {/* --- CONTENT --- */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center pointer-events-none mix-blend-overlay text-white">

                <h1 className="text-[12vw] font-black font-heading tracking-tighter leading-[0.8]">
                    DIGITAL
                </h1>
                <h1 className="text-[12vw] font-black font-heading tracking-tighter leading-[0.8] opacity-70">
                    TERRAIN
                </h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 pointer-events-auto"
                >
                    <MagneticButton>
                        <button className="px-8 py-3 bg-cyan-500 text-black font-bold uppercase tracking-wider text-xs rounded-full hover:bg-cyan-300 transition-all hover:shadow-[0_0_50px_rgba(34,211,238,0.5)]">
                            Explore Landscape
                        </button>
                    </MagneticButton>
                </motion.div>

            </div>

        </section>
    );
};
