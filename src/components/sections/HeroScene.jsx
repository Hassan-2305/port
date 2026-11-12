// Lazy-loaded 3D hero scene. Kept in its own module so three.js and
// postprocessing are split into a separate chunk and don't block first paint.
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

// Dust positions generated once at module load, not on every render
const DUST = Array.from({ length: 50 }, () => ({
    position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5,
    ],
    scale: Math.random() * 0.03,
}));

const MonolithScene = () => {
    const sphereRef = useRef(null);
    const ringRef = useRef(null);
    const ringMatRef = useRef(null);
    const dust = DUST;

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Primary Y-axis rotation: slow, continuous spin
        if (sphereRef.current) {
            sphereRef.current.rotation.y = t * 0.1;
            sphereRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
        }

        // Ring counter-rotation at half sphere speed
        if (ringRef.current) {
            ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.1;
            ringRef.current.rotation.y = t * 0.05;
        }

        // Gold ring pulsing glow
        if (ringMatRef.current) {
            ringMatRef.current.emissiveIntensity = 0.5 + Math.sin(t * 0.5) * 0.2;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            {/* 1. THE OBSIDIAN SPHERE */}
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

            {/* 2. THE GOLD TRIM RING */}
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

            {/* 3. FLOATING DUST */}
            <group>
                {dust.map((d, i) => (
                    <mesh key={i} position={d.position} scale={d.scale}>
                        <sphereGeometry args={[1, 8, 8]} />
                        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
                    </mesh>
                ))}
            </group>

            <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4} />
        </group>
    );
};

const HeroScene = ({ isInView, isMobile }) => (
    <Canvas
        frameloop={isInView ? "always" : "never"}
        camera={{ position: [0, 0, 8], fov: 35 }}
        // Fixed DPR range keeps GPU load stable when the user zooms the page
        dpr={[1, 1.5]}
        aria-hidden="true"
    >
        <color attach="background" args={['#060608']} />
        <MonolithScene />

        {/* STUDIO LIGHTING */}
        <Environment preset="studio" />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} color="#ffffff" />
        <spotLight position={[-10, 0, -5]} angle={0.5} penumbra={1.5} intensity={1.5} color="#4f46e5" />
        <spotLight position={[5, -5, 5]} angle={0.5} penumbra={1.5} intensity={1.5} color="#fbbf24" />

        <EffectComposer enableNormalPass={false}>
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={0.5} radius={0.4} />
            <Noise opacity={0.06} />
            <Vignette eskil={false} offset={0.1} darkness={0.6} />
        </EffectComposer>

        {!isMobile && (
            <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={2 * Math.PI / 3} />
        )}
    </Canvas>
);

export default HeroScene;
