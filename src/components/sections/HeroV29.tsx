import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, Lightformer, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, BrightnessContrast } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════
// HERO V104: THE GLASS OBELISK (Transparency & Optics)
// ═══════════════════════════════════════════════════════

const GlassMonolith: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const innerRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current || !innerRef.current) return;

        const { x, y } = state.mouse;

        // Glass tilts towards mouse (Parallax)
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.2, 0.05);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.2, 0.05);

        // Inner Gold Core rotates independently (Clockwork feel)
        innerRef.current.rotation.y += 0.01;
        innerRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
    });

    return (
        <group>
            {/* OUTER GLASS SHELL */}
            <RoundedBox ref={meshRef} args={[1.5, 3.5, 0.5]} radius={0.05} smoothness={4}>
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    thickness={0.8}
                    chromaticAberration={0.05} // Subtle rainbow edges
                    anisotropy={0.1}
                    distortion={0.1}
                    distortionScale={0.5}
                    temporalDistortion={0}
                    iridescence={0}
                    iridescenceIOR={1}
                    iridescenceThicknessRange={[0, 1400]}
                    roughness={0.05} // Polished
                    ior={1.5}        // Glass
                    color="#ffffff"
                    attenuationColor="#ffffff"
                    attenuationDistance={0.5}
                />
            </RoundedBox>

            {/* INNER GOLD FILAMENT (Suspended inside) */}
            <mesh ref={innerRef} position={[0, 0, 0]}>
                <torusGeometry args={[0.4, 0.02, 16, 100]} />
                <meshStandardMaterial
                    color="#ffaa00"
                    emissive="#ffaa00"
                    emissiveIntensity={2}
                    metalness={1}
                    roughness={0}
                />
            </mesh>

            {/* Secondary Inner Ring */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.55, 0.005, 16, 100]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>
        </group>
    );
};

const StudioLights: React.FC = () => {
    return (
        <Environment resolution={1024}>
            {/* Crisp Studio Highlights */}
            <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} color="#ffffff" />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} color="#ffffff" />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 10, 0]} scale={[10, 10, 1]} color="#ffffff" />
        </Environment>
    );
};

const Scene: React.FC = () => {
    return (
        <>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                <GlassMonolith />
            </Float>

            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#000000" />

            <StudioLights />

            <EffectComposer enableNormalPass={false}>
                <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} radius={0.4} />
                <Noise opacity={0.03} />
                <Vignette eskil={false} offset={0.1} darkness={0.6} />
                <BrightnessContrast contrast={0.05} />
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
            { opacity: 0, filter: "blur(10px)" },
            { opacity: 1, filter: "blur(0px)", duration: 2, ease: "power2.out" }
        ).fromTo(subtitleRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
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

            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 6], fov: 35 }} dpr={[1, 1.5]}>
                    <color attach="background" args={['#050505']} />
                    <Scene />
                </Canvas>
            </div>

            <div className="relative z-10 text-center pointer-events-none mix-blend-screen">
                <p ref={subtitleRef} className="text-white/50 text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-4">
                    Clarity of Vision
                </p>
                <h1 ref={titleRef} className="text-6xl md:text-9xl font-bold text-white tracking-tighter leading-none">
                    PRISM
                </h1>
            </div>

            <div className="absolute bottom-12 z-20 pointer-events-auto">
                <MagneticButton>
                    <button className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500">
                        View Work
                    </button>
                </MagneticButton>
            </div>

        </section>
    );
};
