import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════
// HERO V63: THE REACTOR (Hardware / Engineering)
// ═══════════════════════════════════════════════════════

// ─── MECHANICAL RING ───
const ReactorRing: React.FC<{
    radius: number,
    speed: number,
    axis: [number, number, number],
    color?: string,
    thick?: number
}> = ({ radius, speed, axis, color = "#475569", thick = 0.1 }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.x += axis[0] * speed * delta;
        groupRef.current.rotation.y += axis[1] * speed * delta;
        groupRef.current.rotation.z += axis[2] * speed * delta;
    });

    return (
        <group ref={groupRef}>
            {/* Main Ring */}
            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.5} />
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>

            {/* Tech Details / Greebles on the ring */}
            {[0, 1, 2, 3].map(i => (
                <mesh key={i} position={[radius * Math.cos(i * Math.PI / 2), 0, radius * Math.sin(i * Math.PI / 2)]}>
                    <boxGeometry args={[thick * 3, thick * 3, thick * 3]} />
                    <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
                </mesh>
            ))}
        </group>
    );
};

// ─── THE ENERGY CORE ───
const EnergyCore: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const scale = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.05;
        meshRef.current.scale.setScalar(scale);
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshBasicMaterial color="#06b6d4" toneMapped={false} />
        </mesh>
    );
}

// ─── REACTOR SYSTEM ───
const Reactor: React.FC = () => {
    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
            {/* Multiple Gyroscopic Rings */}
            <ReactorRing radius={2.5} speed={0.5} axis={[1, 0, 0]} thick={0.15} />
            <ReactorRing radius={2.2} speed={0.8} axis={[0, 1, 0]} thick={0.12} color="#94a3b8" />
            <ReactorRing radius={1.9} speed={-0.6} axis={[0, 0, 1]} thick={0.1} color="#cbd5e1" />

            {/* Inner Fast Rings */}
            <ReactorRing radius={1.4} speed={2} axis={[1, 1, 0]} thick={0.05} color="#06b6d4" />
            <ReactorRing radius={1.2} speed={-2} axis={[0, 1, 1]} thick={0.05} color="#06b6d4" />

            <EnergyCore />

            {/* Floating Debris */}
            <points>
                <sphereGeometry args={[4, 32, 32]} />
                <pointsMaterial color="#06b6d4" size={0.02} transparent opacity={0.4} />
            </points>
        </Float>
    );
};

// ─── HUD OVERLAY IN 3D ───
const HUD: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (!groupRef.current) return;
        // HUD subtly follows mouse/camera
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.mouse.x * Math.PI) / 20, 0.1);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (state.mouse.y * Math.PI) / 20, 0.1);
    });

    return (
        <group ref={groupRef}>
            {/* Left Bracket */}
            <mesh position={[-3.5, 0, 0]}>
                <boxGeometry args={[0.1, 4, 0.1]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} />
            </mesh>
            {/* Right Bracket */}
            <mesh position={[3.5, 0, 0]}>
                <boxGeometry args={[0.1, 4, 0.1]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} />
            </mesh>

            {/* Stats */}
            <Text position={[-2.5, 2, 0]} fontSize={0.15} color="#06b6d4" font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0Pn5.woff">
                RPM: 4200
            </Text>
            <Text position={[-2.5, 1.8, 0]} fontSize={0.15} color="#06b6d4" font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0Pn5.woff">
                TEMP: 195K
            </Text>
            <Text position={[2.5, 2, 0]} fontSize={0.15} color="#06b6d4" font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0Pn5.woff">
                CORE: STABLE
            </Text>
        </group>
    );
}

// ─── SCENE SETUP ───
const Scene: React.FC = () => {
    return (
        <>
            <Reactor />
            <HUD />

            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 0, 5]} intensity={2} color="#06b6d4" />
            <pointLight position={[10, 10, 10]} intensity={2} color="#06b6d4" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
            <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" />
        </>
    );
};

// ═══════════════════════════════════════════════════════
// UI COMPONENT
// ═══════════════════════════════════════════════════════

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        gsap.fromTo(titleRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" });
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
        <section className="relative h-screen w-full bg-[#020617] overflow-hidden flex flex-col items-center justify-center font-mono">

            {/* 3D CANVAS */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
                    <Scene />
                </Canvas>
            </div>

            {/* OVERLAY */}
            <div className="relative z-10 text-center pointer-events-none">
                <h1 ref={titleRef} className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                    CORE<br />ARCHITECTURE
                </h1>

                <div className="flex justify-center gap-8 text-[10px] text-cyan-400 uppercase tracking-widest mb-8">
                    <span>Sys_Admin</span>
                    <span>///</span>
                    <span>Kernel_Acc</span>
                </div>

                <div className="pointer-events-auto">
                    <MagneticButton>
                        <button className="px-8 py-3 border border-cyan-500/50 text-cyan-400 font-bold text-xs tracking-widest uppercase hover:bg-cyan-500 hover:text-white transition-all duration-300">
                            Access Terminal
                        </button>
                    </MagneticButton>
                </div>
            </div>

            {/* DECORATIVE LINES */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-900 to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-900 to-transparent opacity-50" />

        </section>
    );
};
