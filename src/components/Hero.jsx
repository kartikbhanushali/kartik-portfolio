import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { personalInfo } from '../constants';
import HeroElement3D from './three/HeroElement3D';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

export default function Hero() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const fullText = personalInfo.headline;
    const containerRef = useRef(null);

    // Typewriter effect
    useEffect(() => {
        if (prefersReducedMotion) {
            setDisplayText(fullText);
            return;
        }

        let currentIndex = 0;
        const typeInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);

        return () => clearInterval(typeInterval);
    }, [prefersReducedMotion, fullText]);

    // Cursor blink
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);

        return () => clearInterval(cursorInterval);
    }, []);

    const scrollToAbout = () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-500"
        >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-dark-500 via-dark-400 to-dark-500" />

            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl"
                    animate={{
                        x: prefersReducedMotion ? 0 : [0, 50, 0],
                        y: prefersReducedMotion ? 0 : [0, 30, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-emerald/10 rounded-full blur-3xl"
                    animate={{
                        x: prefersReducedMotion ? 0 : [0, -40, 0],
                        y: prefersReducedMotion ? 0 : [0, -50, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            {/* 3D Element */}
            <div className="absolute inset-0 opacity-60">
                <HeroElement3D reducedMotion={prefersReducedMotion} />
            </div>

            {/* Floating Financial Symbols — Greek letters & formulas */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
                {['α', 'β', 'σ', 'Δ', 'Σ', 'μ', '∂', '∫', 'Φ', 'ρ', 'λ', 'θ'].map((sym, i) => (
                    <span
                        key={i}
                        className="absolute text-accent-gold/[0.07] font-mono select-none"
                        style={{
                            fontSize: `${20 + Math.random() * 40}px`,
                            top: `${5 + (i * 7.5) % 90}%`,
                            left: `${3 + (i * 8.3 + 15) % 94}%`,
                            animation: prefersReducedMotion ? 'none' : `float-symbol ${8 + i * 1.5}s ease-in-out infinite`,
                            animationDelay: `${i * 0.7}s`,
                        }}
                    >
                        {sym}
                    </span>
                ))}
            </div>

            {/* CSS City Skyline Silhouette */}
            <div className="absolute bottom-0 left-0 right-0 h-32 z-[1] pointer-events-none">
                <svg viewBox="0 0 1440 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
                    <path d="M0,128 L0,90 L40,90 L40,60 L55,60 L55,45 L65,45 L65,60 L80,60 L80,90 L120,90 L120,50 L135,50 L135,30 L145,25 L155,30 L155,50 L170,50 L170,90 L200,90 L200,70 L220,70 L220,45 L230,40 L240,45 L240,70 L260,70 L260,90 L300,90 L300,55 L310,55 L310,35 L325,35 L325,20 L335,18 L345,20 L345,35 L360,35 L360,55 L380,55 L380,90 L420,90 L420,65 L440,65 L440,50 L450,48 L460,50 L460,65 L480,65 L480,90 L520,90 L520,40 L535,40 L535,22 L550,22 L550,15 L560,12 L570,15 L570,22 L585,22 L585,40 L600,40 L600,90 L640,90 L640,72 L660,72 L660,55 L670,52 L680,55 L680,72 L700,72 L700,90 L740,90 L740,48 L755,48 L755,30 L770,30 L770,20 L780,18 L790,20 L790,30 L805,30 L805,48 L820,48 L820,90 L860,90 L860,62 L880,62 L880,45 L895,45 L895,35 L905,32 L915,35 L915,45 L930,45 L930,62 L950,62 L950,90 L990,90 L990,55 L1010,55 L1010,38 L1020,35 L1030,38 L1030,55 L1050,55 L1050,90 L1090,90 L1090,42 L1105,42 L1105,25 L1120,25 L1120,18 L1130,15 L1140,18 L1140,25 L1155,25 L1155,42 L1170,42 L1170,90 L1210,90 L1210,68 L1230,68 L1230,50 L1240,48 L1250,50 L1250,68 L1270,68 L1270,90 L1310,90 L1310,58 L1325,58 L1325,40 L1340,40 L1340,28 L1350,25 L1360,28 L1360,40 L1375,40 L1375,58 L1390,58 L1390,90 L1440,90 L1440,128 Z" fill="#080a0e" />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.p
                    className="text-accent-gold font-mono text-sm md:text-base mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Hello, I'm
                </motion.p>

                <motion.h1
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {personalInfo.firstName}
                    <span className="text-accent-gold">.</span>
                </motion.h1>

                <motion.div
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium text-gray-400 mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <span>{displayText}</span>
                    <span
                        className={`inline-block w-1 h-8 md:h-12 bg-accent-gold ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                </motion.div>

                <motion.p
                    className="text-gray-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    {personalInfo.tagline}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    <motion.a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 bg-accent-gold text-dark-500 font-semibold rounded-lg hover:bg-accent-gold/90 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View My Work
                    </motion.a>
                    <motion.a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 border border-accent-gold text-accent-gold font-semibold rounded-lg hover:bg-accent-gold/10 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get In Touch
                    </motion.a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.button
                onClick={scrollToAbout}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-white transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
            >
                <motion.div
                    animate={{ y: prefersReducedMotion ? 0 : [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <FaChevronDown size={24} />
                </motion.div>
            </motion.button>
        </section>
    );
}
