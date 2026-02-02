import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../constants';
import ReactLogo3D from './three/ReactLogo3D';
import { gsap, ScrollTrigger } from '../utils/animations';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

export default function Skills() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        if (prefersReducedMotion) return;

        gsap.registerPlugin(ScrollTrigger);

        cardsRef.current.forEach((card, index) => {
            if (card) {
                gsap.fromTo(
                    card,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }
        });
    }, [prefersReducedMotion]);

    const skillCategories = Object.values(skills);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="py-20 md:py-32 bg-dark-500 relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent-cyan/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                        Skills & <span className="text-accent-cyan">Technologies</span>
                    </h2>
                    <div className="w-20 h-1 bg-accent-cyan mx-auto" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* 3D React Logo */}
                    <motion.div
                        className="order-2 lg:order-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <ReactLogo3D reducedMotion={prefersReducedMotion} />
                        <p className="text-center text-gray-500 text-sm mt-4">
                            Interactive 3D • Hover to explore
                        </p>
                    </motion.div>

                    {/* Skills Grid */}
                    <div className="order-1 lg:order-2 space-y-6">
                        {skillCategories.map((category, catIndex) => (
                            <div
                                key={category.title}
                                ref={(el) => (cardsRef.current[catIndex] = el)}
                                className="p-6 bg-dark-400/50 rounded-2xl border border-dark-200/20 hover:border-accent-cyan/30 transition-all duration-300"
                            >
                                <h3 className="text-lg font-display font-semibold text-white mb-4">
                                    {category.title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.items.map((skill, skillIndex) => (
                                        <motion.span
                                            key={skill}
                                            className="px-3 py-2 text-sm bg-dark-300 text-gray-300 rounded-lg hover:bg-accent-cyan/20 hover:text-accent-cyan transition-colors cursor-default"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.3,
                                                delay: catIndex * 0.1 + skillIndex * 0.03,
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
