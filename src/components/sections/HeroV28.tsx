import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, Lightformer, RoundedBox, Sparkles, MeshReflectorMaterial, SpotLight } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, BrightnessContrast } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════
// HERO V102: THE CINEMATIC MUSEUM (Context & Depth)
// ═══════════════════════════════════════════════════════

const Monolith: React.FC = () => {
    const meshRef = useRef<THREE.Group>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Weighted Physics (Same as V101 because it was good)
        const { x, y } = state.mouse;
        const targetX = y * 0.15;
        const targetY = x * 0.15;

        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.05);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.05);

        // Breathing
        const t = state.clock.elapsedTime;
        meshRef.current.position.y = 0.5 + Math.sin(t * 0.5) * 0.05; // Slightly higher float
    });

    return (
        <group ref={meshRef} position={[0, 0.5, 0]}>
            <RoundedBox args={[1.2, 3.2, 0.4]} radius={0.05} smoothness={4} castShadow receiveShadow>
                <meshPhysicalMaterial
                    color="#000000"
                    roughness={0.1}
                    metalness={0.95}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    envMapIntensity={2}
                />
            </RoundedBox>

            {/* Inner Vein */}
            <mesh position={[0, 0, 0]} scale={[1.22, 3.22, 0.38]}>
                <boxGeometry />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.BackSide} />
            </mesh>

            {/* Rim Reflector */}
            <mesh position={[0, 0, -0.21]} ref={glowRef}>
                <planeGeometry args={[1.6, 3.6]} />
                <meshBasicMaterial color="#4f46e5" transparent opacity={0.0} />
            </mesh>
        </group>
    );
};

const EnvironmentSetup: React.FC = () => {
    return (
        <>
            <Environment resolution={1024}>
                <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} color="#c084fc" />
                <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} color="#f472b6" />
            </Environment>

            {/* PARTICLES for Texture */}
            <Sparkles
                count={200}
                scale={[10, 10, 10]}
                size={2}
                speed={0.4}
                opacity={0.4}
                color="#ffffff" // White/Silver dust
            />
            <Sparkles
                count={50}
                scale={[5, 10, 5]}
                size={5}
                speed={0.2}
                opacity={0.8}
                color="#d4af37" // Rare Gold flecks
            />

            {/* REFLECTIVE FLOOR */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <planeGeometry args={[50, 50]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={1024}
                    mixBlur={1}
                    mixStrength={40} // How much reflection
                    roughness={1}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#050505"
                    metalness={0.5}
                    mirror={0} // 0 = standard material, 1 = mirror
                />
            </mesh>

            {/* DRAMATIC SPOTLIGHT */}
            <SpotLight
                position={[5, 8, 5]}
                angle={0.3}
                penumbra={0.5}
                intensity={2}
                castShadow
                shadow-mapSize={1024}
                color="#ffffff"
            />
        </>
    );
};

const Scene: React.FC = () => {
    return (
        <>
            <Monolith />
            <EnvironmentSetup />

            {/* Post Processing */}
            <EffectComposer enableNormalPass={false}>
                <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.6} radius={0.5} />
                <Noise opacity={0.04} />
                <Vignette eskil={false} offset={0.05} darkness={0.7} />
                <BrightnessContrast contrast={0.15} />
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
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 2, ease: "power3.out" }
        ).fromTo(subtitleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
            "-=1.5"
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
        <section className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-sans">

            {/* 3D CANVAS */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 7], fov: 30 }} dpr={[1, 1.5]} shadows>
                    <color attach="background" args={['#050505']} />
                    {/* Subtle fog for infinite depth */}
                    <fog attach="fog" args={['#050505', 5, 20]} />
                    <Scene />
                </Canvas>
            </div>

            {/* UI OVERLAY */}
            <div className="relative z-10 text-center pointer-events-none mix-blend-screen">
                <h1 ref={titleRef} className="text-6xl md:text-9xl font-bold text-white tracking-tighter leading-none mb-2">
                    ETHEREAL
                </h1>
                <p ref={subtitleRef} className="text-white/50 text-xs md:text-sm font-light tracking-[0.4em] uppercase">
                    Digital Artifacts
                </p>
            </div>

            {/* CTA */}
            <div className="absolute bottom-12 z-20 pointer-events-auto">
                <MagneticButton>
                    <button className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500">
                        Enter Gallery
                    </button>
                </MagneticButton>
            </div>

        </section>
    );
};
