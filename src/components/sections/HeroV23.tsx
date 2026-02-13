import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, MeshTransmissionMaterial, TorusKnot, Environment, Lightformer, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise, Vignette, TiltShift } from '@react-three/postprocessing';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════
// HERO V85: THE INFINITE FLOW (Luxury / Emotion / Art)
// ═══════════════════════════════════════════════════════

// ─── GLASS SCULPTURE ───
const GlassKnot: React.FC = () => {
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (mesh.current) {
            // Gentle, complex rotation
            mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
            mesh.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.1) * 0.2;

            // Interactive Tilt
            const x = state.mouse.x * 0.2;
            const y = state.mouse.y * 0.2;
            mesh.current.rotation.x += -y;
            mesh.current.rotation.y += x;
        }
    });

    return (
        <TorusKnot ref={mesh} args={[1, 0.35, 256, 32, 3, 1]} scale={2}>
            <MeshTransmissionMaterial
                backside
                samples={16}
                thickness={2}
                roughness={0}
                chromaticAberration={1} // Prismatic rainbows
                anisotropy={1}
                distortion={0.5}
                distortionScale={1}
                temporalDistortion={0.1}
                ior={1.5}
                color="#ffffff"
            />
        </TorusKnot>
    );
};

// ─── INNER LIGHT SCULPTURE ───
// A winding glowing line inside to give it a "soul"
const InnerSoul: React.FC = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z = state.clock.elapsedTime * 0.5;
        }
    });

    return (
        <group>
            {/* A light tracing the shape? Hard to match Knot path perfectly without curve math. 
                 Instead, let's put a glowing core sphere that pulses. */}
            <mesh ref={ref} scale={0.5}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
            </mesh>
        </group>
    )
}

// ─── MOVING LIGHTS ───
const MovingLights: React.FC = () => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.5;
        }
    });
    return (
        <group ref={ref}>
            <pointLight position={[5, 0, 5]} intensity={2} color="#fbbf24" /> {/* Gold */}
            <pointLight position={[-5, 5, -5]} intensity={2} color="#3b82f6" /> {/* Blue */}
            <pointLight position={[0, -5, 0]} intensity={2} color="#ec4899" /> {/* Pink */}
        </group>
    );
};

// ─── ENVIRONMENT ───
const StudioEnvironment: React.FC = () => {
    return (
        <Environment resolution={512}>
            {/* High contrast strip lights for glass reflection */}
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
            <Lightformer intensity={2} rotation-z={Math.PI / 4} position={[0, 0, 10]} scale={[10, 2, 1]} color="#ffffff" />
        </Environment>
    );
}

// ─── SCENE SETUP ───
const Scene: React.FC = () => {
    return (
        <>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
                <GlassKnot />
                <InnerSoul />
            </Float>

            <MovingLights />
            <StudioEnvironment />

            <ambientLight intensity={0.5} />
            <color attach="background" args={['#000000']} />

            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} radius={0.4} />
                <Noise opacity={0.04} />
                <Vignette eskil={false} offset={0.1} darkness={0.9} />
                <TiltShift blur={0.05} radius={0.4} />
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
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(titleRef.current,
            { opacity: 0, scale: 0.9, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 2, ease: "power3.out" }
        ).fromTo(textRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 2 },
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
        <section className="relative h-screen w-full bg-[#000000] overflow-hidden flex flex-col items-center justify-center font-sans">

            {/* 3D CANVAS */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.5]}>
                    <Scene />
                </Canvas>
            </div>

            {/* OVERLAY */}
            <div className="relative z-10 text-center pointer-events-none mix-blend-exclusion px-4">
                <h1 ref={titleRef} className="text-7xl md:text-[10rem] font-bold text-white tracking-tighter mb-0 leading-[0.8]">
                    FLOW
                </h1>
                <div ref={textRef} className="flex justify-center items-center gap-4 mt-8">
                    <div className="h-px w-12 bg-white/50" />
                    <p className="text-white/80 text-lg md:text-xl font-light italic tracking-widest font-serif">
                        Where Art Meets Logic
                    </p>
                    <div className="h-px w-12 bg-white/50" />
                </div>
            </div>

            {/* CTA */}
            <div className="absolute bottom-16 z-20 pointer-events-auto">
                <MagneticButton>
                    <button className="px-10 py-4 bg-transparent border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-500 rounded-full backdrop-blur-sm text-sm tracking-widest uppercase">
                        Enter The Void
                    </button>
                </MagneticButton>
            </div>

        </section>
    );
};
