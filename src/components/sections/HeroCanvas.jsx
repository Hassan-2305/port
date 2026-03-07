/**
 * HeroCanvas — All Three.js / WebGL code lives here.
 * This file is NEVER imported during SSR (loaded via React.lazy + ClientOnly in Hero.jsx).
 */
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { useInView } from 'framer-motion';

const MonolithScene = () => {
    const sphereRef = useRef(null);
    const ringRef = useRef(null);
    const ringMatRef = useRef(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (sphereRef.current) {
            sphereRef.current.rotation.y = t * 0.1;
            sphereRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
        }
        if (ringRef.current) {
            ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.1;
            ringRef.current.rotation.y = t * 0.05;
        }
        if (ringMatRef.current) {
            ringMatRef.current.emissiveIntensity = 0.5 + Math.sin(t * 0.5) * 0.2;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh ref={sphereRef} scale={[2, 2, 2]}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshPhysicalMaterial
                        color="#101015"
                        roughness={0.1}
                        metalness={0.9}
                        clearcoat={1.0}
                        clearcoatRoughness={0.1}
                        reflectivity={1}
                        envMapIntensity={2.5}
                    />
                </mesh>
            </Float>

            <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[3.2, 0.02, 64, 256]} />
                <meshStandardMaterial
                    ref={ringMatRef}
                    color="#ffcc00"
                    roughness={0.2}
                    metalness={1.0}
                    emissive="#ffaa00"
                    emissiveIntensity={0.5}
                />
            </mesh>

            <group>
                {new Array(50).fill(0).map((_, i) => (
                    <mesh key={i} position={[
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 5
                    ]} scale={Math.random() * 0.03}>
                        <sphereGeometry args={[1, 8, 8]} />
                        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
                    </mesh>
                ))}
            </group>

            <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4} />
        </group>
    );
};

const Scene = () => (
    <>
        <MonolithScene />
        <Environment preset="studio" />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} color="#ffffff" />
        <spotLight position={[-10, 0, -5]} angle={0.5} penumbra={1.5} intensity={1.5} color="#4f46e5" />
        <spotLight position={[5, -5, 5]} angle={0.5} penumbra={1.5} intensity={1.5} color="#fbbf24" />
        <EffectComposer enableNormalPass={false}>
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={0.5} radius={0.4} />
            <Noise opacity={0.06} />
            <Vignette eskil={false} offset={0.1} darkness={0.6} />
        </EffectComposer>
    </>
);

export default function HeroCanvas({ containerRef, isMobile }) {
    const isInView = useInView(containerRef, { margin: "0px 0px -200px 0px", once: false });

    return (
        <Canvas
            frameloop={isInView ? "always" : "never"}
            camera={{ position: [0, 0, 8], fov: 35 }}
            dpr={[1, 1.5]}
        >
            <color attach="background" args={['#060608']} />
            <Scene />
            {!isMobile && (
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={2 * Math.PI / 3}
                />
            )}
        </Canvas>
    );
}
