import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function ReactAtom({ reducedMotion }) {
    const groupRef = useRef();
    const electron1Ref = useRef();
    const electron2Ref = useRef();
    const electron3Ref = useRef();

    useFrame(({ clock }) => {
        if (reducedMotion) return;

        const t = clock.getElapsedTime();

        // Rotate the entire atom slowly
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.1;
        }

        // Orbit electrons
        const orbitSpeed = 1.5;
        const orbitRadius = 2;

        if (electron1Ref.current) {
            electron1Ref.current.position.x = Math.cos(t * orbitSpeed) * orbitRadius;
            electron1Ref.current.position.z = Math.sin(t * orbitSpeed) * orbitRadius;
        }

        if (electron2Ref.current) {
            electron2Ref.current.position.x = Math.cos(t * orbitSpeed + Math.PI * 2 / 3) * orbitRadius;
            electron2Ref.current.position.y = Math.sin(t * orbitSpeed + Math.PI * 2 / 3) * orbitRadius;
        }

        if (electron3Ref.current) {
            electron3Ref.current.position.z = Math.cos(t * orbitSpeed + Math.PI * 4 / 3) * orbitRadius;
            electron3Ref.current.position.y = Math.sin(t * orbitSpeed + Math.PI * 4 / 3) * orbitRadius;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Nucleus */}
            <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial
                    color="#22d3ee"
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#22d3ee"
                    emissiveIntensity={0.3}
                />
            </mesh>

            {/* Orbit rings */}
            <mesh rotation={[0, 0, 0]}>
                <torusGeometry args={[2, 0.02, 16, 100]} />
                <meshStandardMaterial color="#22d3ee" opacity={0.5} transparent />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2, 0.02, 16, 100]} />
                <meshStandardMaterial color="#a855f7" opacity={0.5} transparent />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, Math.PI / 2]}>
                <torusGeometry args={[2, 0.02, 16, 100]} />
                <meshStandardMaterial color="#ec4899" opacity={0.5} transparent />
            </mesh>

            {/* Electrons */}
            <mesh ref={electron1Ref} position={[2, 0, 0]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                    color="#22d3ee"
                    emissive="#22d3ee"
                    emissiveIntensity={0.8}
                />
            </mesh>
            <mesh ref={electron2Ref} position={[0, 2, 0]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                    color="#a855f7"
                    emissive="#a855f7"
                    emissiveIntensity={0.8}
                />
            </mesh>
            <mesh ref={electron3Ref} position={[0, 0, 2]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                    color="#ec4899"
                    emissive="#ec4899"
                    emissiveIntensity={0.8}
                />
            </mesh>
        </group>
    );
}

export default function ReactLogo3D({ reducedMotion = false }) {
    return (
        <div className="w-full h-64 md:h-80">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />
                <spotLight
                    position={[5, 5, 5]}
                    angle={0.3}
                    penumbra={1}
                    intensity={0.8}
                    color="#a855f7"
                />

                <ReactAtom reducedMotion={reducedMotion} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={!reducedMotion}
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
}
