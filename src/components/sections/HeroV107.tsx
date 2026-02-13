import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, Lightformer, Sparkles, useTexture, SpotLight, RoundedBox, ScrollControls, useScroll } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useMode } from '../../context/ModeContext';
import gsap from 'gsap';
import { Vector2 } from 'three';

// HERO V107: THE SENTIENT MONOLITH

const MonolithShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uHover: { value: new THREE.Vector2(0.5, 0.5) },
        uHoverState: { value: 0 },
        uBaseColor: { value: new THREE.Color('#0a0a0a') },
        uVeinColor: { value: new THREE.Color('#ffaa00') },
        uResolution: { value: new THREE.Vector2(1, 1) }
    },
    vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;
        uniform float uHoverState;
        // Simplex Noise (omitted for brevity, using simple displacement)
        void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            vec3 newPos = position + normal * sin(position.y * 10.0 + uTime) * 0.02 * uHoverState;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;
        uniform vec3 uBaseColor;
        uniform vec3 uVeinColor;
        uniform float uHoverState;

        void main() {
            vec3 viewDir = normalize(cameraPosition - vPosition);
            float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
            rim = pow(rim, 3.0);
            float veins = step(0.95, sin(vPosition.y * 20.0 + uTime));
            vec3 color = mix(uBaseColor, uVeinColor, veins * uHoverState);
            color += uVeinColor * rim * 0.5;
            gl_FragColor = vec4(color, 1.0);
        }
    `
};

const Monolith: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const scroll = useScroll();

    useFrame((state) => {
        if (!meshRef.current || !materialRef.current) return;
        const t = state.clock.elapsedTime;
        materialRef.current.uniforms.uTime.value = t;
        meshRef.current.rotation.y = t * 0.1 + (scroll.offset * Math.PI * 2);
    });

    return (
        <group>
            <RoundedBox ref={meshRef} args={[1.5, 3.8, 1.5]} radius={0.1} smoothness={4} castShadow>
                <shaderMaterial ref={materialRef} attach="material" args={[MonolithShaderMaterial]} transparent />
            </RoundedBox>
        </group>
    );
};

const Scene: React.FC = () => {
    return (
        <>
            <Monolith />
            <SpotLight position={[5, 12, 5]} angle={0.25} penumbra={0.5} intensity={4} castShadow color="#ffaa00" />
            <Sparkles count={500} scale={[15, 15, 15]} size={1.5} speed={0.2} opacity={0.4} color="#ffffff" />
            <EffectComposer enableNormalPass={false}>
                <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.2} radius={0.6} />
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={0.8} />
                <ChromaticAberration offset={new Vector2(0.002, 0.002)} radialModulation={true} modulationOffset={0.5} />
            </EffectComposer>
        </>
    );
};

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        gsap.fromTo(titleRef.current, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 3, ease: "power2.out", delay: 0.5 });
    }, []);

    if (isRecruiterMode) return null;

    return (
        <section className="relative h-screen w-full bg-[#030303] overflow-hidden font-sans">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 7], fov: 35 }} dpr={[1, 1.5]} shadows>
                    <color attach="background" args={['#030303']} />
                    <ScrollControls pages={2} damping={0.2}>
                        <Scene />
                    </ScrollControls>
                </Canvas>
            </div>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none mix-blend-screen">
                <h1 ref={titleRef} className="text-6xl md:text-9xl font-bold text-white tracking-tighter leading-none opacity-0">RELIC</h1>
                <p className="text-orange-500/80 text-xs md:text-sm font-light tracking-[0.5em] uppercase mt-4">Sentient Geometry</p>
                <div className="absolute bottom-12 text-white/30 text-[10px] uppercase tracking-widest animate-pulse">Scroll to Interact</div>
            </div>
        </section>
    );
};
