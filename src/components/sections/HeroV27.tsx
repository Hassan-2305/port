import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, Lightformer, RoundedBox } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, BrightnessContrast } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════
// HERO V101: THE LIVING MONOLITH (Ultimate Luxury)
// ═══════════════════════════════════════════════════════

const Monolith: React.FC = () => {
    const meshRef = useRef<THREE.Group>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;

        // 1. Smooth Mouse Tracking (Weighted Physics)
        const { x, y } = state.mouse;
        const targetX = y * 0.15; // Vertical mouse moves -> Tilt X
        const targetY = x * 0.15; // Horizontal mouse moves -> Tilt Y

        // Lerp for heavy, expensive feel
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.05);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.05);

        // 2. Subtle Breathing Animation
        const t = state.clock.elapsedTime;
        meshRef.current.position.y = Math.sin(t * 0.5) * 0.1; // Gentle float

        // 3. Dynamic Glow Intensity based on mouse proximity
        // Calculate distance from center (0,0)
        const dist = Math.sqrt(x * x + y * y);
        if (glowRef.current) {
            // Closer mouse = brighter glow
            const targetIntensity = 1 + (1 - Math.min(dist, 1)) * 5;
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(
                (glowRef.current.material as THREE.MeshBasicMaterial).opacity,
                0.05 + (1 - Math.min(dist, 1)) * 0.2, // Base opacity + boost
                0.1
            );
        }
    });

    return (
        <group ref={meshRef}>
            {/* THE MONOLITH OBJECT */}
            {/* Using RoundedBox for that premium Apple-like chamfer */}
            <RoundedBox args={[1.2, 3.2, 0.4]} radius={0.05} smoothness={4} castShadow receiveShadow>
                <meshPhysicalMaterial
                    color="#000000"        // Pure Black
                    roughness={0.1}        // Very smooth
                    metalness={0.9}        // Metallic reflection
                    clearcoat={1}          // Glass layer on top
                    clearcoatRoughness={0} // Perfectly polished
                    envMapIntensity={1.5}  // Strong reflections
                />
            </RoundedBox>

            {/* INNER GLOW CORE (Subtle vein) */}
            <mesh position={[0, 0, 0]} scale={[1.22, 3.22, 0.38]}>
                <boxGeometry />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.BackSide} />
            </mesh>

            {/* RIM LIGHT HIGHLIGHT (Fake Volumetric) */}
            <mesh position={[0, 0, -0.21]} ref={glowRef}>
                <planeGeometry args={[1.6, 3.6]} />
                <meshBasicMaterial color="#4f46e5" transparent opacity={0} blurriness={1} />
            </mesh>
        </group>
    );
};

const Lights: React.FC = () => {
    return (
        <Environment resolution={1024}>
            {/* Key Light (Cool White) */}
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />

            {/* Rim Light Left (Cyan) */}
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} color="#c084fc" />

            {/* Rim Light Right (Warm Gold) */}
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} color="#f472b6" />
        </Environment>
    );
};

const Scene: React.FC = () => {
    return (
        <>
            <Monolith />

            {/* Floor Shadows for grounding */}
            <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000000" />

            {/* Lights */}
            <Lights />

            {/* Post Processing */}
            <EffectComposer enableNormalPass={false}>
                <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.5} radius={0.6} />
                <Noise opacity={0.03} />
                <Vignette eskil={false} offset={0.1} darkness={0.8} />
                <BrightnessContrast contrast={0.1} />
            </EffectComposer>
        </>
    );
};

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(titleRef.current,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
        ).fromTo(subtitleRef.current,
            { opacity: 0, letterSpacing: "1em" },
            { opacity: 1, letterSpacing: "0.2em", duration: 1.5, ease: "power3.out" },
            "-=1"
        );
    }, []);

    if (isRecruiterMode) {
        return (
            <section className="min-h-[60vh] flex items-center justify-center bg-dark">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl font-bold text-white mb-4">Hassan Muhammad</h1>
                </div>
            </section>
        );
    }

    return (
        <section className="relative h-screen w-full bg-[#030303] overflow-hidden flex flex-col items-center justify-center font-sans">

            {/* 3D CANVAS */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 6], fov: 35 }} dpr={[1, 1.5]}>
                    <color attach="background" args={['#030303']} />
                    <Scene />
                </Canvas>
            </div>

            {/* UI OVERLAY */}
            <div className="relative z-10 text-center pointer-events-none mix-blend-difference">
                <p ref={subtitleRef} className="text-white/60 text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-4">
                    The New Standard
                </p>
                <h1 ref={titleRef} className="text-6xl md:text-9xl font-bold text-white tracking-tighter leading-none">
                    MONOLITH
                </h1>
            </div>

            {/* CTA */}
            <div className="absolute bottom-12 z-20 pointer-events-auto">
                <MagneticButton>
                    <button className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500">
                        Enter
                    </button>
                </MagneticButton>
            </div>

        </section>
    );
};
