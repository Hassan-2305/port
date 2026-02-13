import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

// HERO V106: THE GOLDEN SIGNAL

const SignalScene: React.FC = () => {
    const beamRef = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const arcRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (beamRef.current) {
            beamRef.current.scale.y = 1 + Math.sin(t * 0.5) * 0.02;
            (beamRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(t * 2) * 0.1;
        }
        if (coreRef.current) {
            coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
        }
        if (arcRef.current) {
            arcRef.current.rotation.z = t * 0.02;
        }
    });

    return (
        <group position={[0, -2, 0]}>
            <mesh position={[0, -3.5, 0]}>
                <sphereGeometry args={[5, 128, 128]} />
                <meshStandardMaterial color="#000000" roughness={0.7} metalness={0.5} envMapIntensity={0.2} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.4, 0]}>
                <ringGeometry args={[0.2, 3, 64]} />
                <meshBasicMaterial color="#ffaa00" transparent opacity={0.05} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
            </mesh>
            <mesh ref={beamRef} position={[0, 10, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 25, 32]} />
                <meshBasicMaterial color="#ffcc00" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
            </mesh>
            <mesh ref={coreRef} position={[0, 1.5, 0]}>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshBasicMaterial color="#ffaa00" toneMapped={false} />
            </mesh>
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
            <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} color="#ffffff" />
            <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 0, -1]} scale={[2, 10, 1]} color="#ffaa00" />
        </Environment>
    );
};

const Scene: React.FC = () => {
    return (
        <>
            <SignalScene />
            <Lights />
            <EffectComposer enableNormalPass={false}>
                <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.5} radius={0.7} />
                <Noise opacity={0.08} />
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
        tl.fromTo(beamContainerRef.current, { height: "0%" }, { height: "100%", duration: 2, ease: "power2.inOut" })
            .fromTo(textRef.current, { opacity: 0 }, { opacity: 1, duration: 2, ease: "power2.out" }, "-=0.5");
    }, []);

    if (isRecruiterMode) return null;

    return (
        <section className="relative h-screen w-full bg-[#030303] overflow-hidden flex flex-col items-center justify-center font-sans perspective-1000">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 1, 12], fov: 25 }} dpr={[1, 1.5]}>
                    <color attach="background" args={['#030303']} />
                    <Scene />
                </Canvas>
            </div>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-32 pointer-events-none">
                <div ref={beamContainerRef} className="w-[1px] bg-gradient-to-t from-orange-400/50 via-orange-300/20 to-transparent absolute bottom-0 left-1/2 -translate-x-1/2 h-full opacity-50 blur-[1px]"></div>
            </div>
            <div ref={textRef} className="relative z-20 text-center pointer-events-none mix-blend-screen opacity-0">
                <h1 className="text-4xl md:text-6xl font-light text-white/90 tracking-[0.2em] uppercase mb-4 leading-tight">
                    Signal<span className="font-bold text-orange-400">.</span>
                </h1>
                <p className="text-white/40 text-[10px] md:text-xs tracking-[0.4em] uppercase font-mono">
                    System Alignment Complete
                </p>
            </div>
            <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.05] bg-noise mix-blend-overlay"></div>
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
