import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════
   CHICAGO SKYLINE — iconic silhouette
   with Willis Tower, Hancock, Aon, etc.
   ═══════════════════════════════════════ */
function ChicagoSkyline({ reducedMotion }) {
    const groupRef = useRef();

    // Iconic Chicago buildings – hand-crafted shapes
    const buildings = useMemo(() => [
        // Willis (Sears) Tower ← tallest, stepped setbacks
        { x: -0.5, w: 0.7, h: 3.8, d: 0.7, tier: [{ h: 3.0, w: 0.7 }, { h: 3.4, w: 0.5 }, { h: 3.8, w: 0.35 }] },
        // Trump Tower — tapered
        { x: 1.2, w: 0.5, h: 3.2, d: 0.5, tier: [{ h: 2.0, w: 0.55 }, { h: 2.8, w: 0.4 }, { h: 3.2, w: 0.25 }] },
        // Aon Center — simple tall box
        { x: 2.8, w: 0.55, h: 3.0, d: 0.55, tier: null },
        // John Hancock — tapered with antenna lines
        { x: -2.2, w: 0.6, h: 3.4, d: 0.6, tier: null, antenna: 0.6 },
        // Two Prudential Plaza — spire
        { x: 3.8, w: 0.45, h: 2.4, d: 0.45, tier: null, spire: 0.5 },
        // Mid-rises filling the skyline
        { x: -3.5, w: 0.4, h: 1.6, d: 0.4, tier: null },
        { x: -4.2, w: 0.5, h: 1.2, d: 0.4, tier: null },
        { x: -1.5, w: 0.35, h: 2.0, d: 0.35, tier: null },
        { x: 0.5, w: 0.4, h: 2.2, d: 0.4, tier: null },
        { x: 1.8, w: 0.35, h: 1.8, d: 0.35, tier: null },
        { x: 2.2, w: 0.3, h: 1.4, d: 0.3, tier: null },
        { x: 3.2, w: 0.35, h: 1.6, d: 0.35, tier: null },
        { x: 4.5, w: 0.4, h: 1.0, d: 0.4, tier: null },
        { x: -5.0, w: 0.45, h: 0.8, d: 0.35, tier: null },
        { x: 5.2, w: 0.35, h: 0.7, d: 0.3, tier: null },
        { x: -3.0, w: 0.3, h: 1.1, d: 0.3, tier: null },
        { x: 4.0, w: 0.25, h: 1.3, d: 0.25, tier: null },
        // Far background fill
        { x: -5.8, w: 0.5, h: 0.5, d: 0.3, tier: null },
        { x: 5.8, w: 0.4, h: 0.5, d: 0.3, tier: null },
        { x: -6.3, w: 0.3, h: 0.35, d: 0.25, tier: null },
        { x: 6.3, w: 0.3, h: 0.3, d: 0.25, tier: null },
    ], []);

    useFrame(({ clock }) => {
        if (reducedMotion || !groupRef.current) return;
        const t = clock.getElapsedTime();
        // Gentle sway
        groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.06;
    });

    return (
        <group ref={groupRef} position={[0, -3.2, -1.5]}>
            {buildings.map((b, i) => (
                <BuildingMesh key={i} b={b} index={i} reducedMotion={reducedMotion} />
            ))}

            {/* Lake Michigan reflection plane */}
            <mesh position={[0, -0.52, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[16, 4]} />
                <meshStandardMaterial
                    color="#0a1628"
                    metalness={0.95}
                    roughness={0.1}
                    emissive="#D4A44C"
                    emissiveIntensity={0.015}
                />
            </mesh>
        </group>
    );
}

function BuildingMesh({ b, index, reducedMotion }) {
    const windowMatRefs = useRef([]);

    // Generate windows
    const windowData = useMemo(() => {
        const wins = [];
        const rows = Math.floor(b.h / 0.18);
        const cols = Math.max(2, Math.floor(b.w / 0.12));
        for (let r = 1; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (Math.random() > 0.3) {
                    wins.push({
                        pos: [
                            (c - (cols - 1) / 2) * 0.1,
                            r * 0.18 - 0.15,
                            b.d / 2 + 0.005,
                        ],
                        phase: Math.random() * Math.PI * 2,
                        speed: 0.15 + Math.random() * 0.35,
                        base: 0.15 + Math.random() * 0.35,
                    });
                }
            }
        }
        return wins;
    }, [b]);

    useFrame(({ clock }) => {
        if (reducedMotion) return;
        const t = clock.getElapsedTime();
        windowMatRefs.current.forEach((mat, i) => {
            if (mat) {
                const w = windowData[i];
                mat.opacity = w.base + Math.sin(t * w.speed + w.phase) * 0.2;
            }
        });
    });

    return (
        <group position={[b.x, 0, 0]}>
            {/* Tiered building (Willis/Trump style) */}
            {b.tier ? (
                b.tier.map((t, ti) => (
                    <mesh key={ti} position={[0, t.h / 2 - 0.5, 0]}>
                        <boxGeometry args={[t.w, t.h, b.d]} />
                        <meshStandardMaterial
                            color="#0c111c"
                            emissive="#1a2540"
                            emissiveIntensity={0.08}
                            metalness={0.85}
                            roughness={0.3}
                        />
                    </mesh>
                ))
            ) : (
                <mesh position={[0, b.h / 2 - 0.5, 0]}>
                    <boxGeometry args={[b.w, b.h, b.d]} />
                    <meshStandardMaterial
                        color="#0c111c"
                        emissive="#1a2540"
                        emissiveIntensity={0.08}
                        metalness={0.85}
                        roughness={0.3}
                    />
                </mesh>
            )}

            {/* Antenna */}
            {b.antenna && (
                <mesh position={[0, b.h - 0.5 + b.antenna / 2, 0]}>
                    <cylinderGeometry args={[0.01, 0.02, b.antenna, 4]} />
                    <meshBasicMaterial color="#94A3B8" transparent opacity={0.6} />
                </mesh>
            )}

            {/* Spire */}
            {b.spire && (
                <mesh position={[0, b.h - 0.5 + b.spire / 2, 0]}>
                    <coneGeometry args={[0.06, b.spire, 4]} />
                    <meshStandardMaterial
                        color="#1a2540"
                        emissive="#D4A44C"
                        emissiveIntensity={0.05}
                        metalness={0.9}
                        roughness={0.2}
                    />
                </mesh>
            )}

            {/* Animated windows */}
            {windowData.map((w, i) => (
                <mesh key={i} position={w.pos}>
                    <planeGeometry args={[0.05, 0.07]} />
                    <meshBasicMaterial
                        ref={el => { windowMatRefs.current[i] = el; }}
                        color="#D4A44C"
                        transparent
                        opacity={w.base}
                    />
                </mesh>
            ))}
        </group>
    );
}

/* ═══════════════════════════════════════
   HOLOGRAPHIC PRICE VISUALIZATION
   Modern, animated geometric chart
   ═══════════════════════════════════════ */
function HolographicChart({ reducedMotion }) {
    const groupRef = useRef();
    const glowRef = useRef();

    const { tubeGeo, areaGeo, dataPoints } = useMemo(() => {
        const pts = [];
        let price = 0;
        const prices = [];

        for (let i = 0; i < 50; i++) {
            price += (Math.random() - 0.42) * 0.25;
            prices.push(price);
            pts.push(new THREE.Vector3((i / 50) * 8 - 4, price * 0.8, 0));
        }

        const curve = new THREE.CatmullRomCurve3(pts);
        const tube = new THREE.TubeGeometry(curve, 200, 0.018, 8, false);

        // Area fill — shape from line down to baseline
        const shape = new THREE.Shape();
        const baseline = -1.5;
        shape.moveTo(pts[0].x, baseline);
        pts.forEach(p => shape.lineTo(p.x, p.y));
        shape.lineTo(pts[pts.length - 1].x, baseline);
        shape.closePath();
        const areaGeometry = new THREE.ShapeGeometry(shape);

        // Key data points (peaks and valleys) for pulse markers
        const keyPts = [];
        for (let i = 2; i < prices.length - 2; i++) {
            if ((prices[i] > prices[i - 1] && prices[i] > prices[i + 1]) ||
                (prices[i] < prices[i - 1] && prices[i] < prices[i + 1])) {
                keyPts.push({
                    pos: [(i / 50) * 8 - 4, prices[i] * 0.8, 0],
                    isPeak: prices[i] > prices[i - 1],
                    phase: Math.random() * Math.PI * 2,
                });
            }
        }

        return { tubeGeo: tube, areaGeo: areaGeometry, dataPoints: keyPts };
    }, []);

    useFrame(({ clock }) => {
        if (reducedMotion || !groupRef.current) return;
        const t = clock.getElapsedTime();
        groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.1;
        groupRef.current.position.y = Math.sin(t * 0.3) * 0.05 + 0.5;

        if (glowRef.current) {
            glowRef.current.opacity = 0.06 + Math.sin(t * 0.5) * 0.02;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0.5, 0]}>
            {/* Glowing price line */}
            <mesh geometry={tubeGeo}>
                <meshStandardMaterial
                    color="#D4A44C"
                    emissive="#D4A44C"
                    emissiveIntensity={1.2}
                    metalness={0.8}
                    roughness={0.1}
                />
            </mesh>


            {/* Area fill under curve */}
            <mesh geometry={areaGeo} position={[0, 0, -0.05]}>
                <meshBasicMaterial
                    ref={glowRef}
                    color="#D4A44C"
                    transparent
                    opacity={0.06}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Pulsing data point markers */}
            {dataPoints.map((dp, i) => (
                <DataPulse key={i} data={dp} reducedMotion={reducedMotion} />
            ))}

            {/* Subtle horizontal grid */}
            {[-1.0, -0.5, 0, 0.5, 1.0].map((y, i) => (
                <mesh key={`h${i}`} position={[0, y, -0.08]}>
                    <planeGeometry args={[9, 0.002]} />
                    <meshBasicMaterial color="#D4A44C" transparent opacity={0.06} />
                </mesh>
            ))}
        </group>
    );
}

function DataPulse({ data, reducedMotion }) {
    const meshRef = useRef();
    const ringRef = useRef();

    useFrame(({ clock }) => {
        if (reducedMotion) return;
        const t = clock.getElapsedTime();
        const pulse = Math.sin(t * 1.5 + data.phase) * 0.5 + 0.5;

        if (meshRef.current) {
            meshRef.current.scale.setScalar(0.8 + pulse * 0.4);
        }
        if (ringRef.current) {
            ringRef.current.scale.setScalar(1 + pulse * 1.5);
            ringRef.current.material.opacity = 0.3 * (1 - pulse);
        }
    });

    const color = data.isPeak ? '#34D399' : '#EF4444';

    return (
        <group position={data.pos}>
            {/* Core dot */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.04, 12, 12]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={1}
                />
            </mesh>
            {/* Expanding ring */}
            <mesh ref={ringRef} rotation={[0, 0, 0]}>
                <ringGeometry args={[0.06, 0.08, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.3}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}

/* ═══════════════════════════════════════
   Ambient particles — financial data dust
   ═══════════════════════════════════════ */
function AmbientParticles({ reducedMotion }) {
    const groupRef = useRef();

    const particles = useMemo(() => {
        return Array.from({ length: 80 }, () => ({
            pos: [
                (Math.random() - 0.5) * 16,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 8 - 2,
            ],
            size: 0.008 + Math.random() * 0.015,
            color: ['#D4A44C', '#34D399', '#94A3B8', '#ffffff'][Math.floor(Math.random() * 4)],
        }));
    }, []);

    useFrame(({ clock }) => {
        if (reducedMotion || !groupRef.current) return;
        groupRef.current.rotation.y = clock.getElapsedTime() * 0.008;
    });

    return (
        <group ref={groupRef}>
            {particles.map((p, i) => (
                <mesh key={i} position={p.pos}>
                    <sphereGeometry args={[p.size, 4, 4]} />
                    <meshBasicMaterial color={p.color} transparent opacity={0.5} />
                </mesh>
            ))}
        </group>
    );
}

/* ═══════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════ */
export default function HeroElement3D({ reducedMotion = false }) {
    return (
        <div className="absolute inset-0 w-full h-full">
            <Canvas
                camera={{ position: [0, 1.5, 8], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.15} />
                <pointLight position={[10, 10, 10]} intensity={0.6} color="#ffffff" />
                <pointLight position={[-8, 5, -5]} intensity={0.4} color="#D4A44C" />
                <pointLight position={[0, -2, 6]} intensity={0.2} color="#34D399" />
                {/* Moonlight from above */}
                <directionalLight position={[0, 10, 2]} intensity={0.15} color="#94A3B8" />

                <HolographicChart reducedMotion={reducedMotion} />
                <ChicagoSkyline reducedMotion={reducedMotion} />
                <AmbientParticles reducedMotion={reducedMotion} />
            </Canvas>
        </div>
    );
}
