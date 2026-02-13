import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Text, Environment, ContactShadows, MeshTransmissionMaterial, Icosahedron, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════
// HERO V69: THE PRISM CORE (Clarity / Value)
// ═══════════════════════════════════════════════════════

// ─── THE DIAMOND ───
const Prism: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        // Slow, mesmerizing spin
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
        meshRef.current.rotation.y += 0.005;
        meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.1) * 0.1;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Icosahedron ref={meshRef} args={[2.5, 0]}>
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    resolution={1024}
                    transmission={1}
                    roughness={0}
                    thickness={3.5}
                    ior={1.5}
                    chromaticAberration={1}
                    anisotropy={20}
                    distortion={0}
                    distortionScale={0}
                    temporalDistortion={0}
                    clearcoat={1}
                    attenuationDistance={0.5}
                    attenuationColor="#ffffff"
                    color="#ffffff"
                    background={new THREE.Color('#0a0a0a')}
                />
            </Icosahedron>
        </Float>
    );
};

// ─── GOLD DUST ───
const GoldDust: React.FC = () => {
    const count = 200;
    const [positions] = useState(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    });

    const ref = useRef<THREE.Points>(null);
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y -= delta * 0.05;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#fbbf24"
                transparent
                opacity={0.8}
                sizeAttenuation={true}
            />
        </points>
    );
};

// ─── SCENE SETUP ───
const Scene: React.FC = () => {
    return (
        <>
            <Prism />
            <GoldDust />

            {/* Ground Shadow */}
            <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={15} blur={2.5} far={5} color="#000000" />

            {/* Elegant Lighting for Refraction */}
            <Environment preset="warehouse" /> {/* Warehouse gives great industrial window reflections */}
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" />
            <spotLight position={[-10, 5, -10]} angle={0.5} penumbra={1} intensity={2} color="#fbbf24" /> {/* Gold rim light */}

            {/* Background */}
            <color attach="background" args={['#050505']} />

            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.8} mipmapBlur intensity={1} radius={0.5} />
                <Noise opacity={0.04} />
                <Vignette eskil={false} offset={0.1} darkness={0.8} />
            </EffectComposer>
        </>
    );
};

// ═══════════════════════════════════════════════════════
// UI COMPONENT
// ═══════════════════════════════════════════════════════

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" })
            .fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=1");
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
        <section className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-serif">

            {/* 3D CANVAS */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 40 }} dpr={[1, 1.5]}>
                    <Scene />
                </Canvas>
            </div>

            {/* OVERLAY */}
            <div className="relative z-10 text-center pointer-events-none">
                <div ref={subtitleRef} className="flex justify-center items-center gap-4 mb-8 text-amber-300/80 font-sans text-xs tracking-[0.3em] uppercase">
                    <span className="w-8 h-[1px] bg-amber-300/50"></span>
                    <span>High Fidelity Design</span>
                    <span className="w-8 h-[1px] bg-amber-300/50"></span>
                </div>

                <h1 ref={titleRef} className="text-7xl md:text-9xl font-light text-white tracking-widest leading-none" style={{ fontFamily: 'Playfair Display, serif' }}>
                    ZENITH
                </h1>

                <p className="mt-6 text-white/40 font-sans text-sm tracking-[0.1em] font-light max-w-md mx-auto">
                    Crafting digital experiences with razor-sharp precision and infinite depth.
                </p>
            </div>

            {/* CTA */}
            <div className="absolute bottom-12 z-20 pointer-events-auto">
                <MagneticButton>
                    <button className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-black hover:scale-110 transition-all duration-500 backdrop-blur-sm">
                        <span className="text-2xl transform rotate-90">→</span>
                    </button>
                </MagneticButton>
            </div>

        </section>
    );
};
