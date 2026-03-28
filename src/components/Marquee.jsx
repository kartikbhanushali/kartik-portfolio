import React from 'react';
import {
    FaPython,
    FaDatabase,
    FaChartLine,
    FaChartBar,
    FaChartArea,
    FaPercentage,
} from 'react-icons/fa';
import {
    SiCplusplus,
    SiR,
} from 'react-icons/si';
import { TbMathFunction, TbChartCandle, TbReportAnalytics, TbBrandOffice, TbChartDots3 } from 'react-icons/tb';
import { GiDiceSixFacesSix } from 'react-icons/gi';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

// Quant-relevant tech logos with their colors
const techLogos = [
    { Icon: FaPython, color: '#3776AB', name: 'Python' },
    { Icon: SiCplusplus, color: '#00599C', name: 'C++' },
    { Icon: SiR, color: '#276DC3', name: 'R' },
    { Icon: TbMathFunction, color: '#D4A44C', name: 'MATLAB' },
    { Icon: FaDatabase, color: '#4169E1', name: 'SQL' },
    { Icon: FaChartLine, color: '#34D399', name: 'VaR' },
    { Icon: GiDiceSixFacesSix, color: '#D4A44C', name: 'Monte Carlo' },
    { Icon: TbChartCandle, color: '#F59E0B', name: 'Derivatives' },
    { Icon: FaChartArea, color: '#10B981', name: 'Fixed Income' },
    { Icon: FaPercentage, color: '#EF4444', name: 'Credit Risk' },
    { Icon: TbChartDots3, color: '#8B5CF6', name: 'Stochastic Calc' },
    { Icon: FaChartBar, color: '#D4A44C', name: 'Bloomberg' },
    { Icon: TbReportAnalytics, color: '#06B6D4', name: 'Factor Analysis' },
    { Icon: TbMathFunction, color: '#F97316', name: 'Stress Testing' },
    { Icon: TbBrandOffice, color: '#217346', name: 'Excel' },
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
