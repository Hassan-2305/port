import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════
// HERO V106: THE GOLDEN SIGNAL (Ceremonial & Cosmic)
// ═══════════════════════════════════════════════════════

const SignalScene: React.FC = () => {
    const beamRef = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const arcRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // 1. THE BEAM (Breathing)
        if (beamRef.current) {
            // Subtle height pulsing
            beamRef.current.scale.y = 1 + Math.sin(t * 0.5) * 0.02;
            // Opacity pulsing (The Signal)
            (beamRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(t * 2) * 0.1;
        }

        // 2. THE CORE (Ignition)
        if (coreRef.current) {
            // Intensity pulsing
            const intensity = 1 + Math.sin(t * 2) * 0.2;
            coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
        }

        // 3. ORBITAL ARCS (Slow Rotation)
        if (arcRef.current) {
            arcRef.current.rotation.z = t * 0.02;
        }
    });

    return (
        <group position={[0, -2, 0]}>

            {/* THE GROUND MASS (Planet/Stage) */}
            <mesh position={[0, -3.5, 0]}>
                <sphereGeometry args={[5, 128, 128]} />
                <meshStandardMaterial
                    color="#000000"
                    roughness={0.7}
                    metalness={0.5}
                    envMapIntensity={0.2}
                />
            </mesh>

            {/* THE REFLECTION RINGS (Ripples on the surface) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.4, 0]}>
                <ringGeometry args={[0.2, 3, 64]} />
                <meshBasicMaterial
                    color="#ffaa00"
                    transparent
                    opacity={0.05}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* THE BEAM (Spine) */}
            <mesh ref={beamRef} position={[0, 10, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 25, 32]} />
                <meshBasicMaterial
                    color="#ffcc00"
                    transparent
                    opacity={0.4}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* THE IGNITION POINT (Core) */}
            <mesh ref={coreRef} position={[0, 1.5, 0]}>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshBasicMaterial
                    color="#ffaa00"
                    toneMapped={false}
                />
            </mesh>

            {/* UPPER ARCS (Gravitational Fields) */}
            <group ref={arcRef} position={[0, 5, 0]} rotation={[0.5, 0, 0]}>
                <mesh rotation={[0, 0, Math.PI / 4]}>
                    <ringGeometry args={[6, 6.01, 128]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.03} />
                </mesh>
                <mesh rotation={[0, 0, -Math.PI / 4]} scale={[0.8, 0.8, 0.8]}>
                    <ringGeometry args={[6, 6.01, 128]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.02} />
                </mesh>
            </group>

        </group>
    );
};

const Lights: React.FC = () => {
    return (
        <Environment resolution={512}>
            {/* Minimalist Studio - Just highlights */}
            <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} color="#ffffff" />
            <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 0, -1]} scale={[2, 10, 1]} color="#ffaa00" /> {/* Warm Side */}
        </Environment>
    );
};

const Scene: React.FC = () => {
    return (
        <>
            <SignalScene />
            <Lights />

            {/* Cinematic Post-Processing */}
            <EffectComposer enableNormalPass={false}>
                {/* Soft, wide bloom for the atmosphere */}
                <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.5} radius={0.7} />
                {/* HEAVY Noise for that "Film" look */}
                <Noise opacity={0.08} />
                {/* Strong Vignette to focus the eye */}
                <Vignette eskil={false} offset={0.1} darkness={0.8} />
            </EffectComposer>
        </>
    );
};

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const beamContainerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // 1. Beam grows first
        tl.fromTo(beamContainerRef.current,
            { height: "0%" },
            { height: "100%", duration: 2, ease: "power2.inOut" }
        )
            // 2. Text fades in slowly
            .fromTo(textRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 2, ease: "power2.out" },
                "-=0.5"
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
        <section className="relative h-screen w-full bg-[#030303] overflow-hidden flex flex-col items-center justify-center font-sans perspective-1000">

            {/* 3D CANVAS LAYER */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 1, 12], fov: 25 }} dpr={[1, 1.5]}>
                    <color attach="background" args={['#030303']} />
                    <Scene />
                </Canvas>
            </div>

            {/* DOM ELEMENTS (The Beam Extension) */}
            {/* This div acts as the visual continuation of the 3D beam for the UI layer */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-32 pointer-events-none">
                <div ref={beamContainerRef} className="w-[1px] bg-gradient-to-t from-orange-400/50 via-orange-300/20 to-transparent absolute bottom-0 left-1/2 -translate-x-1/2 h-full opacity-50 blur-[1px]"></div>
            </div>

            {/* TYPOGRAPHY LAYER */}
            <div ref={textRef} className="relative z-20 text-center pointer-events-none mix-blend-screen opacity-0">
                <h1 className="text-4xl md:text-6xl font-light text-white/90 tracking-[0.2em] uppercase mb-4 leading-tight">
                    Signal<span className="font-bold text-orange-400">.</span>
                </h1>
                <p className="text-white/40 text-[10px] md:text-xs tracking-[0.4em] uppercase font-mono">
                    System Alignment Complete
                </p>
            </div>

            {/* GRAIN OVERLAY */}
            <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.05] bg-noise mix-blend-overlay"></div>

            {/* CTA */}
            <div className="absolute bottom-12 z-40 pointer-events-auto">
                <MagneticButton>
                    <button className="px-8 py-3 border border-white/10 bg-white/5 backdrop-blur-md rounded-full text-white/80 text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500">
                        Initiate
                    </button>
                </MagneticButton>
            </div>

        </section>
    );
};
