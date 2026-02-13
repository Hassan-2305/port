import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Sparkles, Torus, Environment, CameraShake } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { useMode } from '../../context/ModeContext';

// ═══════════════════════════════════════════════════════
// HERO V26: THE CINEMATIC VOID (Interstellar / Drama)
// ═══════════════════════════════════════════════════════

const CinematicScene: React.FC = () => {
    const diskRef = useRef<THREE.Mesh>(null);
    const disk2Ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (diskRef.current) {
            diskRef.current.rotation.z = t * 0.2;
        }
        if (disk2Ref.current) {
            disk2Ref.current.rotation.x = t * 0.1 + Math.PI / 2;
            disk2Ref.current.rotation.y = t * 0.15;
        }
    });

    return (
        <>
            {/* ─── THE VOID (Black Hole Core) ─── */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[1.5, 64, 64]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* ─── ACCRETION DISK (Glowing Rings) ─── */}
            <group rotation={[Math.PI / 3, 0, 0]}>
                {/* Main Ring */}
                <mesh ref={diskRef}>
                    <torusGeometry args={[3, 0.1, 16, 100]} />
                    <meshStandardMaterial
                        color="#f59e0b" // Amber/Gold
                        emissive="#f59e0b"
                        emissiveIntensity={4}
                        toneMapped={false}
                    />
                </mesh>

                {/* Secondary Plasma Ring */}
                <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
                    <mesh ref={disk2Ref} scale={1.2}>
                        <torusGeometry args={[2.8, 0.05, 16, 100]} />
                        <meshStandardMaterial
                            color="#3b82f6" // Blue
                            emissive="#3b82f6"
                            emissiveIntensity={5}
                            toneMapped={false}
                        />
                    </mesh>
                </Float>
            </group>

            {/* ─── MASSIVE BACKGROUND TEXT (Cinematic Title) ─── */}
            <group position={[0, 0, -6]}>
                <Text
                    fontSize={5}
                    letterSpacing={-0.05}
                    color="#444"
                    anchorX="center"
                    anchorY="middle"
                    fillOpacity={0.5}
                >
                    HASSAN
                </Text>
            </group>

            {/* ─── ATMOSPHERE ─── */}
            <Sparkles count={500} scale={12} size={4} speed={0.4} opacity={0.5} color="#ffffff" />
            <Sparkles count={300} scale={15} size={10} speed={0.2} opacity={0.2} color="#f59e0b" />

            {/* ─── LIGHTING ─── */}
            <ambientLight intensity={0.1} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#f59e0b" />
            <pointLight position={[-10, -5, 5]} intensity={2} color="#3b82f6" />

            {/* ─── CAMERA SHAKES (Handheld Feel) ─── */}
            <CameraShake
                maxYaw={0.05}
                maxPitch={0.05}
                maxRoll={0.05}
                yawFrequency={0.1}
                pitchFrequency={0.1}
                rollFrequency={0.1}
                intensity={1}
            />

            {/* ─── POST PROCESSING ─── */}
            <EffectComposer enableNormalPass={false}>
                <Bloom luminanceThreshold={0.5} mipmapBlur intensity={2} radius={0.6} />
                <Noise opacity={0.15} /> {/* Heavy film grain */}
                <Vignette eskil={false} offset={0.3} darkness={0.8} /> {/* Strong vignette */}
            </EffectComposer>
        </>
    );
};

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();

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
                <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 45 }}>
                    <CinematicScene />
                </Canvas>
            </div>

            {/* ─── CINEMATIC OVERLAYS ─── */}

            {/* Letterbox Bars */}
            <div className="absolute top-0 left-0 w-full h-[8vh] bg-black z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-[8vh] bg-black z-10 pointer-events-none"></div>

            {/* UI Layer */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-12 pointer-events-none">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <span className="text-xs font-mono text-white/40 tracking-[0.2em]">DIRECTOR'S CUT</span>
                        <span className="text-xl font-bold text-white tracking-tighter">PORTFOLIO V99</span>
                    </div>
                    <div className="text-xs font-mono text-white/40 tracking-[0.2em] text-right">
                        <div>REC ● 00:04:22</div>
                        <div>ISO 800 / f1.4</div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end">
                    <div className="max-w-md">
                        <h2 className="text-2xl font-light text-white leading-tight">
                            "The only way to discover the limits of the possible is to go beyond them into the impossible."
                        </h2>
                    </div>
                    <div>
                        <button className="pointer-events-auto border border-white/20 hover:bg-white hover:text-black hover:border-white text-white/80 px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] transition-all duration-300">
                            ENTER SYSTEM
                        </button>
                    </div>
                </div>
            </div>

        </section>
    );
};
