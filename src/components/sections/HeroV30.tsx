import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════
// HERO V105: THE HORIZON BEAM (Reference Match)
// ═══════════════════════════════════════════════════════

const HorizonScene: React.FC = () => {
    const beamRef = useRef<THREE.Mesh>(null);
    const particlesRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!beamRef.current) return;

        const t = state.clock.elapsedTime;

        // Beam pulse
        beamRef.current.scale.x = 1 + Math.sin(t * 2) * 0.05;
        (beamRef.current.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(t * 1.5) * 0.2;

        // Subtle particle rotation
        if (particlesRef.current) {
            particlesRef.current.rotation.y = t * 0.05;
        }
    });

    return (
        <group>
            {/* 1. THE ECLIPSE SILHOUETTE (Bottom Planet) */}
            <mesh position={[0, -4, 0]}>
                <sphereGeometry args={[4, 64, 64]} />
                <meshStandardMaterial
                    color="#000000"
                    roughness={0.8}
                    metalness={0.2}
                    envMapIntensity={0.5}
                />
            </mesh>

            {/* 2. THE BEAM (Vertical Light) */}
            <mesh ref={beamRef} position={[0, 0, 0]}>
                <cylinderGeometry args={[0.05, 0.4, 20, 32]} />
                <meshBasicMaterial
                    color="#ffaa00"
                    transparent
                    opacity={0.6}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* 3. ATMOSPHERIC GLOW (Bottom Haze) */}
            <mesh position={[0, -2, 0]}>
                <planeGeometry args={[12, 6]} />
                <meshBasicMaterial
                    color="#ff6600"
                    transparent
                    opacity={0.15}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* 4. RINGS (Subtle Geometry) */}
            <group rotation={[0.4, 0, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[3.8, 3.82, 128]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1.2, 1.2, 1.2]}>
                    <ringGeometry args={[3.8, 3.82, 128]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
                </mesh>
            </group>

            {/* 5. PARTICLES (Dust in the light) */}
            <group ref={particlesRef}>
                <Sparkles
                    count={200}
                    scale={[10, 10, 10]}
                    size={2}
                    speed={0.2}
                    opacity={0.5}
                    color="#ffaa00"
                />
            </group>
        </group>
    );
};

const CinematicLights: React.FC = () => {
    return (
        <Environment resolution={512}>
            {/* Top Light */}
            <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} color="#ffffff" />
            {/* Warm Rim */}
            <Lightformer intensity={5} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} color="#ffaa00" />
            {/* Cool Fill */}
            <Lightformer intensity={1} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} color="#4f46e5" />
        </Environment>
    );
};

const Scene: React.FC = () => {
    return (
        <>
            <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
                <HorizonScene />
            </Float>

            <CinematicLights />

            <EffectComposer enableNormalPass={false}>
                <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.8} />
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={0.9} />
            </EffectComposer>
        </>
    );
};

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(titleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 2, ease: "power2.out" }
        ).fromTo(subRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5, ease: "power2.out" },
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
        <section className="relative h-screen w-full bg-[#020202] overflow-hidden flex flex-col items-center justify-center font-sans">

            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 1, 8], fov: 35 }} dpr={[1, 1.5]}>
                    <color attach="background" args={['#020202']} />
                    <Scene />
                </Canvas>
            </div>

            {/* REFERENCE LAYOUT MATCH */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-24 pointer-events-none">
                <div className="max-w-4xl text-left">
                    <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                        Open Source <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Connectivity</span>
                    </h1>

                    <p ref={subRef} className="text-white/60 text-sm md:text-base max-w-lg leading-relaxed">
                        Join us to connect, collaborate, and contribute to open source projects that are shaping the future of technology.
                    </p>

                    <div className="mt-8 flex gap-4 pointer-events-auto">
                        <MagneticButton>
                            <button className="px-8 py-3 bg-white text-black rounded-full font-medium text-sm hover:scale-105 transition-transform">
                                Learn more &rarr;
                            </button>
                        </MagneticButton>
                    </div>
                </div>
            </div>

            {/* TOP RIGHT NAV REFERENCE */}
            <div className="absolute top-8 right-8 md:right-12 flex gap-8 z-20 text-white/70 text-sm font-medium pointer-events-auto">
                <a href="#" className="hover:text-white transition-colors">About</a>
                <a href="#" className="hover:text-white transition-colors">Projects</a>
                <a href="#" className="hover:text-white transition-colors">Timeline</a>
                <a href="#" className="px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">Sign In</a>
            </div>

        </section>
    );
};
