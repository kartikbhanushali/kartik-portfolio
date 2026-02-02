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
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl"
                    animate={{
                        x: prefersReducedMotion ? 0 : [0, 50, 0],
                        y: prefersReducedMotion ? 0 : [0, 30, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl"
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

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.p
                    className="text-accent-cyan font-mono text-sm md:text-base mb-4"
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
                    <span className="text-accent-cyan">.</span>
                </motion.h1>

                <motion.div
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium text-gray-400 mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <span>{displayText}</span>
                    <span
                        className={`inline-block w-1 h-8 md:h-12 bg-accent-cyan ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'
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
                        className="px-8 py-4 bg-accent-cyan text-dark-500 font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
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
                        className="px-8 py-4 border border-accent-cyan text-accent-cyan font-semibold rounded-lg hover:bg-accent-cyan/10 transition-colors"
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
