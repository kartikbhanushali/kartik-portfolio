import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';


/* ═══════════════════════════════════════
   MODERN HOLOGRAPHIC MARKET DASHBOARD
   3D rotating multi-layer data viz
   ═══════════════════════════════════════ */
function MarketDashboard({ reducedMotion }) {
    const groupRef = useRef();

    useFrame(({ clock }) => {
        if (reducedMotion || !groupRef.current) return;
        const t = clock.getElapsedTime();
        groupRef.current.rotation.y = t * 0.05;
    });

    return (
        <group ref={groupRef}>
            {/* Outer ring — market hours */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.8, 0.015, 8, 80]} />
                <meshStandardMaterial
                    color="#D4A44C"
                    emissive="#D4A44C"
                    emissiveIntensity={0.6}
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Inner ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.2, 0.01, 8, 60]} />
                <meshStandardMaterial
                    color="#34D399"
                    emissive="#34D399"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* 3D Bar chart ring — radial layout */}
            <RadialBarChart reducedMotion={reducedMotion} />

            {/* Center price display — glowing sphere */}
            <CenterOrb reducedMotion={reducedMotion} />

            {/* Floating data arcs */}
            <DataArcs reducedMotion={reducedMotion} />

            {/* Orbiting data nodes */}
            <OrbitingNodes reducedMotion={reducedMotion} />
        </group>
    );
}

/* Radial bar chart — bars arranged in a circle */
function RadialBarChart({ reducedMotion }) {
    const barsRef = useRef([]);

    const bars = useMemo(() => {
        return Array.from({ length: 36 }, (_, i) => {
            const angle = (i / 36) * Math.PI * 2;
            const radius = 1.8;
            const height = 0.2 + Math.random() * 0.8;
            const bullish = Math.random() > 0.4;
            return {
                angle,
                x: Math.cos(angle) * radius,
                z: Math.sin(angle) * radius,
                height,
                bullish,
                phase: Math.random() * Math.PI * 2,
            };
        });
    }, []);

    useFrame(({ clock }) => {
        if (reducedMotion) return;
        const t = clock.getElapsedTime();
        barsRef.current.forEach((mesh, i) => {
            if (mesh) {
                const bar = bars[i];
                const scale = 1 + Math.sin(t * 0.8 + bar.phase) * 0.3;
                mesh.scale.y = scale;
            }
        });
    });

    return (
        <group>
            {bars.map((bar, i) => (
                <mesh
                    key={i}
                    ref={el => { barsRef.current[i] = el; }}
                    position={[bar.x, bar.height / 2, bar.z]}
                    rotation={[0, -bar.angle, 0]}
                >
                    <boxGeometry args={[0.08, bar.height, 0.04]} />
                    <meshStandardMaterial
                        color={bar.bullish ? '#34D399' : '#EF4444'}
                        emissive={bar.bullish ? '#34D399' : '#EF4444'}
                        emissiveIntensity={0.5}
                        metalness={0.6}
                        roughness={0.3}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            ))}
        </group>
    );
}

/* Glowing center orb */
function CenterOrb({ reducedMotion }) {
    const meshRef = useRef();
    const glowRef = useRef();

    useFrame(({ clock }) => {
        if (reducedMotion) return;
        const t = clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.08);
        }
        if (glowRef.current) {
            glowRef.current.scale.setScalar(1.5 + Math.sin(t * 0.8) * 0.2);
            glowRef.current.material.opacity = 0.08 + Math.sin(t * 0.6) * 0.03;
        }
    });

    return (
        <group>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[0.35, 2]} />
                <meshStandardMaterial
                    color="#D4A44C"
                    emissive="#D4A44C"
                    emissiveIntensity={0.8}
                    metalness={0.9}
                    roughness={0.1}
                    wireframe
                />
            </mesh>
            <mesh ref={glowRef}>
                <sphereGeometry args={[0.6, 16, 16]} />
                <meshBasicMaterial
                    color="#D4A44C"
                    transparent
                    opacity={0.08}
                />
            </mesh>
        </group>
    );
}

/* Sweeping data arcs */
function DataArcs({ reducedMotion }) {
    const arc1Ref = useRef();
    const arc2Ref = useRef();

    useFrame(({ clock }) => {
        if (reducedMotion) return;
        const t = clock.getElapsedTime();
        if (arc1Ref.current) arc1Ref.current.rotation.z = t * 0.15;
        if (arc2Ref.current) arc2Ref.current.rotation.z = -t * 0.1;
    });

    return (
        <group>
            <mesh ref={arc1Ref} rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[2.5, 0.012, 8, 32, Math.PI * 0.7]} />
                <meshStandardMaterial
                    color="#D4A44C"
                    emissive="#D4A44C"
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.5}
                />
            </mesh>
            <mesh ref={arc2Ref} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
                <torusGeometry args={[2.6, 0.01, 8, 32, Math.PI * 0.5]} />
                <meshStandardMaterial
                    color="#34D399"
                    emissive="#34D399"
                    emissiveIntensity={0.6}
                    transparent
                    opacity={0.4}
                />
            </mesh>
        </group>
    );
}

/* Orbiting data nodes */
function OrbitingNodes({ reducedMotion }) {
    const refs = useRef([]);

    const nodes = useMemo(() => [
        { radius: 2.5, speed: 0.6, size: 0.08, color: '#D4A44C', offset: 0 },
        { radius: 2.5, speed: 0.6, size: 0.08, color: '#34D399', offset: Math.PI * 2 / 3 },
        { radius: 2.5, speed: 0.6, size: 0.08, color: '#94A3B8', offset: Math.PI * 4 / 3 },
    ], []);

    useFrame(({ clock }) => {
        if (reducedMotion) return;
        const t = clock.getElapsedTime();
        refs.current.forEach((mesh, i) => {
            if (mesh) {
                const n = nodes[i];
                mesh.position.x = Math.cos(t * n.speed + n.offset) * n.radius;
                mesh.position.z = Math.sin(t * n.speed + n.offset) * n.radius;
                mesh.position.y = Math.sin(t * n.speed * 2 + n.offset) * 0.3;
            }
        });
    });

    return (
        <group>
            {nodes.map((n, i) => (
                <mesh key={i} ref={el => { refs.current[i] = el; }}>
                    <sphereGeometry args={[n.size, 12, 12]} />
                    <meshStandardMaterial
                        color={n.color}
                        emissive={n.color}
                        emissiveIntensity={1}
                    />
                </mesh>
            ))}
        </group>
    );
}

/* ═══════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════ */
export default function ReactLogo3D({ reducedMotion = false }) {
    return (
        <div className="w-full h-64 md:h-80">
            <Canvas
                camera={{ position: [0, 2, 6], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={0.6} color="#ffffff" />
                <pointLight position={[-5, 3, 5]} intensity={0.3} color="#D4A44C" />

                <MarketDashboard reducedMotion={reducedMotion} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={!reducedMotion}
                    autoRotateSpeed={0.4}
                />
            </Canvas>
        </div>
    );
}
