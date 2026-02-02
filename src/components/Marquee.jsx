import React from 'react';
import {
    FaReact,
    FaNodeJs,
    FaPython,
    FaAws,
    FaDocker,
    FaGitAlt,
    FaJs,
    FaDatabase,
} from 'react-icons/fa';
import {
    SiTypescript,
    SiMongodb,
    SiPostgresql,
    SiRedis,
    SiGraphql,
    SiTerraform,
    SiExpress,
} from 'react-icons/si';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

// Tech logos with their colors
const techLogos = [
    { Icon: FaReact, color: '#61DAFB', name: 'React' },
    { Icon: FaNodeJs, color: '#339933', name: 'Node.js' },
    { Icon: SiTypescript, color: '#3178C6', name: 'TypeScript' },
    { Icon: FaPython, color: '#3776AB', name: 'Python' },
    { Icon: FaAws, color: '#FF9900', name: 'AWS' },
    { Icon: FaDocker, color: '#2496ED', name: 'Docker' },
    { Icon: SiMongodb, color: '#47A248', name: 'MongoDB' },
    { Icon: SiPostgresql, color: '#4169E1', name: 'PostgreSQL' },
    { Icon: SiRedis, color: '#DC382D', name: 'Redis' },
    { Icon: SiGraphql, color: '#E10098', name: 'GraphQL' },
    { Icon: FaGitAlt, color: '#F05032', name: 'Git' },
    { Icon: FaJs, color: '#F7DF1E', name: 'JavaScript' },
    { Icon: SiTerraform, color: '#7B42BC', name: 'Terraform' },
    { Icon: SiExpress, color: '#FFFFFF', name: 'Express.js' },
    { Icon: FaDatabase, color: '#22D3EE', name: 'SQL' },
];

// 3D Cube Component
function Logo3DCube({ Icon, color, name, index, reducedMotion }) {
    const size = 80; // Size of the cube in pixels
    const half = size / 2;

    // Vary animation speeds
    const durations = [8, 10, 12, 9, 11];
    const duration = durations[index % durations.length];
    const reverse = index % 2 === 0;

    return (
        <div
            className="flex flex-col items-center justify-center group"
            style={{ perspective: '600px' }}
        >
            <div
                className="relative"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    transformStyle: 'preserve-3d',
                    animation: reducedMotion ? 'none' : `spin-cube ${duration}s linear infinite ${reverse ? 'reverse' : ''}`,
                }}
            >
                {/* Front face - Logo */}
                <div
                    className="absolute w-full h-full flex items-center justify-center rounded-xl"
                    style={{
                        transform: `translateZ(${half}px)`,
                        background: `linear-gradient(135deg, rgba(30,30,40,0.9) 0%, rgba(20,20,30,0.95) 100%)`,
                        border: `2px solid ${color}40`,
                        boxShadow: `0 0 30px ${color}30, inset 0 0 20px ${color}10`,
                    }}
                >
                    <Icon
                        className="text-4xl md:text-5xl"
                        style={{
                            color: color,
                            filter: `drop-shadow(0 0 15px ${color})`
                        }}
                    />
                </div>

                {/* Back face */}
                <div
                    className="absolute w-full h-full rounded-xl"
                    style={{
                        transform: `rotateY(180deg) translateZ(${half}px)`,
                        background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
                        border: `2px solid ${color}30`,
                    }}
                />

                {/* Right face */}
                <div
                    className="absolute w-full h-full rounded-xl"
                    style={{
                        transform: `rotateY(90deg) translateZ(${half}px)`,
                        background: `linear-gradient(135deg, ${color}30 0%, ${color}15 100%)`,
                        border: `2px solid ${color}25`,
                    }}
                />

                {/* Left face */}
                <div
                    className="absolute w-full h-full rounded-xl"
                    style={{
                        transform: `rotateY(-90deg) translateZ(${half}px)`,
                        background: `linear-gradient(135deg, ${color}25 0%, ${color}10 100%)`,
                        border: `2px solid ${color}25`,
                    }}
                />

                {/* Top face */}
                <div
                    className="absolute w-full h-full rounded-xl"
                    style={{
                        transform: `rotateX(90deg) translateZ(${half}px)`,
                        background: `linear-gradient(135deg, ${color}35 0%, ${color}20 100%)`,
                        border: `2px solid ${color}30`,
                    }}
                />

                {/* Bottom face */}
                <div
                    className="absolute w-full h-full rounded-xl"
                    style={{
                        transform: `rotateX(-90deg) translateZ(${half}px)`,
                        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
                        border: `2px solid ${color}20`,
                    }}
                />
            </div>

            {/* Tooltip on hover */}
            <span
                className="mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                style={{ color: color }}
            >
                {name}
            </span>
        </div>
    );
}

export default function Marquee() {
    const prefersReducedMotion = usePrefersReducedMotion();

    // Duplicate items multiple times for seamless loop
    const items = [...techLogos, ...techLogos, ...techLogos, ...techLogos];

    return (
        <section className="py-16 md:py-24 bg-dark-400 overflow-hidden">
            <style>{`
                @keyframes marquee-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes spin-cube {
                    0% { transform: rotateX(0deg) rotateY(0deg); }
                    100% { transform: rotateX(360deg) rotateY(360deg); }
                }
                .marquee-track {
                    animation: marquee-scroll 80s linear infinite;
                }
                .marquee-track:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="relative">
                <div
                    className={`flex gap-12 md:gap-16 whitespace-nowrap items-center ${prefersReducedMotion ? '' : 'marquee-track'}`}
                    style={{ width: 'max-content' }}
                >
                    {items.map((tech, index) => (
                        <Logo3DCube
                            key={`logo-${index}`}
                            Icon={tech.Icon}
                            color={tech.color}
                            name={tech.name}
                            index={index}
                            reducedMotion={prefersReducedMotion}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
