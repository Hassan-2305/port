import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, MeshTransmissionMaterial, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { useMode } from '../../context/ModeContext';

// ═══════════════════════════════════════════════════════
// HERO V97: THE ALCHE TERMINAL (Refined Reference)
// ═══════════════════════════════════════════════════════

// ─── UI COMPONENTS ───

const DebugPanel: React.FC<{ title: string, data: Record<string, string | number>, position: string, align?: 'left' | 'right' }> = ({ title, data, position, align = 'left' }) => {
    return (
        <div className={`absolute ${position} pointer-events-none z-20 font-mono text-[10px] md:text-xs text-blue-200/60`}>
            <div className={`flex flex-col ${align === 'right' ? 'items-end' : 'items-start'} bg-black/40 backdrop-blur-sm border border-blue-900/30 p-4 min-w-[200px]`}>
                <div className="flex justify-between items-center w-full mb-3 pb-2 border-b border-blue-900/30">
                    <span className="text-white font-bold tracking-widest uppercase">{title}</span>
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                </div>
                <div className="w-full flex flex-col gap-1.5">
                    {Object.entries(data).map(([key, val]) => (
                        <div key={key} className="flex justify-between w-full">
                            <span className="uppercase tracking-wider opacity-70">{key}</span>
                            <span className="text-blue-400 font-medium tracking-widest">{val}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const NewsItem: React.FC<{ date: string, title: string, japTitle?: string, tag: string }> = ({ date, title, japTitle, tag }) => (
    <div className="mb-6 group cursor-pointer pointer-events-auto">
        <div className="flex items-center gap-3 mb-1 opacity-60 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] text-blue-300 font-mono tracking-wider">{date}</span>
            <span className="text-[9px] border border-blue-500/30 px-1.5 py-0.5 text-blue-300 tracking-wider uppercase">{tag}</span>
        </div>
        <div className="flex flex-col">
            <div className="text-sm md:text-base text-white font-medium tracking-wide group-hover:text-blue-200 transition-colors duration-300">
                {title}
            </div>
            {japTitle && (
                <div className="text-xs text-white/40 mt-0.5 tracking-wide font-light">
                    {japTitle}
                </div>
            )}
        </div>
    </div>
);

// ─── 3D SCENE ───

const Scene: React.FC = () => {
    const prismRef = useRef<THREE.Group>(null);
    const gridRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        // Prism Pulse & Rotation
        if (prismRef.current) {
            prismRef.current.rotation.y = time * 0.15;
            prismRef.current.rotation.z = Math.sin(time * 0.3) * 0.05;
            prismRef.current.position.y = Math.sin(time * 0.5) * 0.2;
        }

        // Grid Panorama Rotation
        if (gridRef.current) {
            gridRef.current.rotation.y = -time * 0.02;
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={40} />

            {/* PANORAMIC PANEL WALL (Disco/Debug Grid) */}
            <PanelWall />

            {/* MASSIVE TYPOGRAPHY (Background) */}
            <group position={[0, 0, -4]}>
                <Text
                    fontSize={6}
                    letterSpacing={-0.08}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    ALCHE
                </Text>
            </group>

            {/* THE PRISM ARTIFACT */}
            <group ref={prismRef}>
                {/* Outer Glass Shell */}
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <mesh rotation={[Math.PI / 4, 0, 0]}>
                        <tetrahedronGeometry args={[2.5, 0]} />
                        <meshPhysicalMaterial
                            roughness={0.1}
                            transmission={0.95}
                            thickness={3}
                            ior={1.5}
                            chromaticAberration={0.1}
                            color="#e0e7ff"
                            attenuationColor="#ffffff"
                            attenuationDistance={5}
                            clearcoat={1}
                        />
                    </mesh>

                    {/* Inner Core (The "System") */}
                    <mesh rotation={[Math.PI / 4, Math.PI, 0]} scale={0.4}>
                        <tetrahedronGeometry args={[2.5, 0]} />
                        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.8} />
                    </mesh>
                    <mesh rotation={[Math.PI / 4, 0, Math.PI / 2]} scale={0.2}>
                        <tetrahedronGeometry args={[2.5, 0]} />
                        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
                    </mesh>
                </Float>
            </group>

            {/* LIGHTING */}
            <ambientLight intensity={0.2} />
            <spotLight position={[0, 10, 10]} intensity={5} color="white" distance={20} angle={0.5} penumbra={1} />
            <spotLight position={[-15, 0, 5]} intensity={5} color="#3b82f6" distance={30} angle={0.6} />
            <spotLight position={[15, 0, 5]} intensity={5} color="#a855f7" distance={30} angle={0.6} />
            <Environment preset="city" />

            {/* POST PROCESSING */}
            <EffectComposer enableNormalPass={false}>
                <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} radius={0.6} />
                <Noise opacity={0.1} />
                <Vignette eskil={false} offset={0.1} darkness={0.6} />
                <ChromaticAberration offset={[0.001, 0.001]} />
            </EffectComposer>
        </>
    );
};

// ─── INSTANCED PANEL WALL ───
const PanelWall: React.FC = () => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const count = 400; // Refined count for performance/look
    const radius = 12;
    const height = 10;

    // Generate layout once
    const dummy = React.useMemo(() => new THREE.Object3D(), []);
    const [hovered, setHover] = useState<number | null>(null);

    useEffect(() => {
        if (!meshRef.current) return;

        // Distribute panels in a cylinder
        let idx = 0;
        const rows = 10;
        const cols = 40;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const angle = (c / cols) * Math.PI * 2;
                const y = (r / rows) * height - (height / 2);
                const x = Math.sin(angle) * radius;
                const z = Math.cos(angle) * radius;

                dummy.position.set(x, y, z);
                dummy.rotation.set(0, angle, 0); // Face inward/outward
                dummy.scale.set(1.8, 0.8, 1); // Panel shape
                dummy.updateMatrix();

                meshRef.current.setMatrixAt(idx++, dummy.matrix);
            }
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, [dummy]);

    useFrame((state) => {
        // Slow rotation of the entire wall
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <instancedMesh
            ref={meshRef}
            args={[undefined, undefined, 400]}
            position={[0, 0, -5]}
        >
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial
                color="#0f172a"
                emissive="#1e3a8a"
                emissiveIntensity={0.2}
                roughness={0.2}
                metalness={0.8}
                side={THREE.DoubleSide}
                wireframe={false}
            />
        </instancedMesh>
    );
};

export const Hero: React.FC = () => {
    const { isRecruiterMode } = useMode();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth).toFixed(3) as any,
                y: (e.clientY / window.innerHeight).toFixed(3) as any
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
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
        <section className="relative h-screen w-full bg-[#03040a] overflow-hidden flex flex-col items-center justify-center font-sans selection:bg-blue-500/30">

            {/* 3D CANVAS */}
            <div className="absolute inset-0 z-0">
                <Canvas dpr={[1, 1.5]}>
                    <Scene />
                </Canvas>
            </div>

            {/* ─── UI OVERLAYS ─── */}

            {/* Top Navigation */}
            <div className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-start z-20">
                <div className="flex flex-col gap-1">
                    <h1 className="text-white text-xl font-bold tracking-tight">ALCHE</h1>
                    <div className="text-blue-300/50 text-[10px] font-mono tracking-widest uppercase">
                        System: Online
                    </div>
                </div>

                <div className="hidden md:flex gap-12 text-xs font-medium tracking-[0.2em] text-white/70 uppercase">
                    <a href="#" className="hover:text-white transition-colors">News</a>
                    <a href="#" className="hover:text-white transition-colors">Works</a>
                    <a href="#" className="hover:text-white transition-colors">About</a>
                    <a href="#" className="hover:text-white transition-colors lowercase italic font-serif text-blue-200">stella</a>
                    <a href="#" className="hover:text-white transition-colors bg-white/10 px-4 py-1.5 rounded-full border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all">Contact</a>
                </div>
            </div>

            {/* Left Debug Panel (Material) */}
            <DebugPanel
                title="MATERIAL"
                position="bottom-12 left-8 md:left-12"
                data={{
                    "roughness": "0.10",
                    "metalness": "0.80",
                    "transmission": "1.00",
                    "ior": "1.45"
                }}
            />

            {/* Right Debug Panel (Quaternion) */}
            <DebugPanel
                title="QUATERNION"
                position="top-32 right-8 md:right-12"
                align="right"
                data={{
                    "Q.x": mousePos.x,
                    "Q.y": mousePos.y,
                    "Q.z": "0.124",
                    "Q.w": "0.985"
                }}
            />

            {/* News Section (Bottom Right) */}
            <div className="absolute bottom-12 right-8 md:right-12 z-20 w-72 text-left">
                <div className="uppercase text-[10px] text-blue-400/60 tracking-[0.2em] mb-6 font-bold">
                    Latest Updates
                </div>
                <NewsItem
                    date="2026.06.26"
                    title="Unreal Fest Bali 2026 Attendance"
                    japTitle="Unreal Fest Bali 2026 で登壇しました"
                    tag="EVENT"
                />
                <NewsItem
                    date="2026.05.16"
                    title="Next-Gen Metaverse App 'WEAR GO LAND'"
                    japTitle="次世代ファッションメタバースアプリ「WEAR GO LAND」を開発"
                    tag="WORK"
                />
            </div>

            {/* Overlay Texture (Scan lines) */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,255,0.1)_1px,transparent_1px)] bg-[size:100%_4px]"></div>
            <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>

        </section>
    );
};
