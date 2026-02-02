import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function FloatingGeometry({ reducedMotion }) {
    const meshRef = useRef();
    const wireframeRef = useRef();

    useFrame(({ clock, mouse }) => {
        if (reducedMotion) return;

        const t = clock.getElapsedTime();

        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
            meshRef.current.rotation.y = t * 0.15;
            meshRef.current.rotation.z = Math.cos(t * 0.2) * 0.1;

            // Subtle mouse following
            meshRef.current.position.x = mouse.x * 0.3;
            meshRef.current.position.y = mouse.y * 0.3;
        }

        if (wireframeRef.current) {
            wireframeRef.current.rotation.x = -Math.sin(t * 0.3) * 0.2;
            wireframeRef.current.rotation.y = -t * 0.1;
            wireframeRef.current.rotation.z = -Math.cos(t * 0.2) * 0.1;
        }
    });

    return (
        <group>
            {/* Main icosahedron with gradient-like material */}
            <Float
                speed={reducedMotion ? 0 : 2}
                rotationIntensity={reducedMotion ? 0 : 0.5}
                floatIntensity={reducedMotion ? 0 : 0.5}
            >
                <mesh ref={meshRef} scale={1.8}>
                    <icosahedronGeometry args={[1, 1]} />
                    <MeshDistortMaterial
                        color="#0ea5e9"
                        emissive="#0284c7"
                        emissiveIntensity={0.2}
                        metalness={0.9}
                        roughness={0.1}
                        distort={reducedMotion ? 0 : 0.3}
                        speed={reducedMotion ? 0 : 2}
                    />
                </mesh>
            </Float>

            {/* Wireframe overlay - slightly larger */}
            <Float
                speed={reducedMotion ? 0 : 1.5}
                rotationIntensity={reducedMotion ? 0 : 0.3}
                floatIntensity={reducedMotion ? 0 : 0.3}
            >
                <mesh ref={wireframeRef} scale={2.2}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshBasicMaterial
                        color="#22d3ee"
                        wireframe
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            </Float>

            {/* Inner glow sphere */}
            <mesh scale={1.2}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color="#a855f7"
                    transparent
                    opacity={0.1}
                />
            </mesh>

            {/* Orbiting particles */}
            <OrbitingParticles reducedMotion={reducedMotion} />
        </group>
    );
}

function OrbitingParticles({ reducedMotion }) {
    const particlesRef = useRef();

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 50; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const r = 2.5 + Math.random() * 1.5;

            temp.push({
                position: [
                    r * Math.sin(phi) * Math.cos(theta),
                    r * Math.sin(phi) * Math.sin(theta),
                    r * Math.cos(phi),
                ],
                speed: 0.5 + Math.random() * 0.5,
                offset: Math.random() * Math.PI * 2,
            });
        }
        return temp;
    }, []);

    useFrame(({ clock }) => {
        if (reducedMotion) return;

        const t = clock.getElapsedTime();

        if (particlesRef.current) {
            particlesRef.current.rotation.y = t * 0.05;
            particlesRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
        }
    });

    return (
        <group ref={particlesRef}>
            {particles.map((particle, i) => (
                <mesh key={i} position={particle.position}>
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshBasicMaterial
                        color={i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#a855f7' : '#ec4899'}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            ))}
        </group>
    );
}

export default function HeroElement3D({ reducedMotion = false }) {
    return (
        <div className="absolute inset-0 w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />
                <pointLight position={[0, 10, 0]} intensity={0.5} color="#a855f7" />

                <FloatingGeometry reducedMotion={reducedMotion} />
            </Canvas>
        </div>
    );
}
