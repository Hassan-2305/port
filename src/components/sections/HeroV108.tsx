import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, Lightformer, MeshTransmissionMaterial, Text } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, BrightnessContrast } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useMode } from '../../context/ModeContext';
import { MagneticButton } from '../ui/MagneticButton';
import gsap from 'gsap';

// HERO V108: THE KINETIC LENS

const LensScene: React.FC = () => {
    const lensRef = useRef<THREE.Mesh>(null);
    const textGroupRef = useRef<THREE.Group>(null);
    const { viewport } = useThree();

    useFrame((state) => {
        if (!lensRef.current) return;
        const { x, y } = state.mouse;

        const targetX = x * (viewport.width / 4);
        const targetY = y * (viewport.height / 4);

        lensRef.current.position.x = THREE.MathUtils.lerp(lensRef.current.position.x, targetX, 0.08);
        lensRef.current.position.y = THREE.MathUtils.lerp(lensRef.current.position.y, targetY, 0.08);
        lensRef.current.rotation.x = THREE.MathUtils.lerp(lensRef.current.rotation.x, y * 0.5, 0.05);
        lensRef.current.rotation.y = THREE.MathUtils.lerp(lensRef.current.rotation.y, x * 0.5, 0.05);

        if (textGroupRef.current) {
            textGroupRef.current.position.x = THREE.MathUtils.lerp(textGroupRef.current.position.x, -x * 0.5, 0.02);
            textGroupRef.current.position.y = THREE.MathUtils.lerp(textGroupRef.current.position.y, -y * 0.5, 0.02);
        }
    });

    return (
        <group>
            <mesh ref={lensRef} position={[0, 0, 2]}>
                <torusGeometry args={[2.5, 0.8, 64, 128]} />
                <MeshTransmissionMaterial
                    backside samples={16} resolution={1024} thickness={0.5} roughness={0.05} ior={1.5} chromaticAberration={0.06} anisotropy={0.1} distortion={0.2} distortionScale={0.3} temporalDistortion={0.0} color="#ffffff" attenuationColor="#ffffff" attenuationDistance={0.5}
                />
            </mesh>
            <group ref={textGroupRef} position={[0, 0, -2]}>
                <Text fontSize={2.5} letterSpacing={-0.05} color="#ffffff" anchorX="center" anchorY="middle" position={[0, 0.5, 0]} fillOpacity={0.9}>HASSAN</Text>
                <Text fontSize={1} letterSpacing={0.2} color="#888888" anchorX="center" anchorY="middle" position={[0, -1.2, 0]}>MUHAMMAD</Text>
            </group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh position={[-4, 2, -1]} scale={[0.5, 0.5, 0.5]}><icosahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#333" roughness={0.2} metalness={1} /></mesh>
                <mesh position={[4, -2, -1]} scale={[0.3, 0.3, 0.3]}><octahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#555" roughness={0.2} metalness={1} /></mesh>
            </Float>
        </group>
    );
};

const StudioLighting: React.FC = () => {
    return (
        <Environment resolution={1024}>
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} color="#ffffff" />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} color="#eef2ff" />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} color="#fff7ed" />
        </Environment>
    );
};

const Scene: React.FC = () => {
    return (
        <>
            <LensScene />
            <StudioLighting />
            <EffectComposer enableNormalPass={false}>
                <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.4} radius={0.5} />
                <Noise opacity={0.04} />
                <Vignette eskil={false} offset={0.1} darkness={0.6} />
                <BrightnessContrast contrast={0.1} />
            </EffectComposer>
        </>
    );
};

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.to(overlayRef.current, { opacity: 1, duration: 2, delay: 0.5, ease: "power2.out" });
    }, []);

    if (isRecruiterMode) return null;

    return (
        <section className="relative h-screen w-full bg-[#030303] overflow-hidden flex flex-col items-center justify-center font-sans">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 2]}>
                    <color attach="background" args={['#030303']} />
                    <Scene />
                </Canvas>
            </div>
            <div ref={overlayRef} className="absolute inset-0 z-10 flex flex-col justify-between p-12 opacity-0 pointer-events-none">
                <div className="flex justify-between items-start">
                    <div className="text-xs font-mono text-white/40 tracking-widest">EST. 2026</div>
                    <div className="text-xs font-mono text-white/40 tracking-widest text-right">FULL STACK<br />ENGINEER</div>
                </div>
                <div className="flex justify-center mb-12 pointer-events-auto">
                    <MagneticButton>
                        <button className="px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300">
                            Explore
                        </button>
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
};
