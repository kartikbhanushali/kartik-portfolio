import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { experience } from '../constants';
import { gsap, ScrollTrigger } from '../utils/animations';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

export default function Experience() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        if (prefersReducedMotion) return;

        gsap.registerPlugin(ScrollTrigger);

        // Animate timeline line
        if (timelineRef.current) {
            gsap.fromTo(
                timelineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 1.5,
                    ease: 'power2.out',
                    transformOrigin: 'top',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }

        // Animate cards from alternating sides
        cardsRef.current.forEach((card, index) => {
            if (card) {
                const direction = index % 2 === 0 ? -100 : 100;
                gsap.fromTo(
                    card,
                    { x: direction, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }
        });
    }, [prefersReducedMotion]);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="py-20 md:py-32 bg-dark-400 relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-emerald/5 rounded-full blur-3xl" />

            {/* Floating Greek symbols */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {['α', 'γ', 'ρ', 'θ', 'ν'].map((sym, i) => (
                    <span
                        key={i}
                        className="absolute text-accent-gold/[0.05] font-mono select-none"
                        style={{
                            fontSize: `${30 + i * 10}px`,
                            top: `${10 + i * 20}%`,
                            left: `${i % 2 === 0 ? 2 + i * 5 : 85 - i * 5}%`,
                            animation: `float-symbol ${9 + i * 1.3}s ease-in-out infinite`,
                            animationDelay: `${i * 0.9}s`,
                        }}
                    >
                        {sym}
                    </span>
                ))}
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                        Work <span className="text-accent-gold">Experience</span>
                    </h2>
                    <div className="w-20 h-1 bg-accent-gold mx-auto" />
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div
                        ref={timelineRef}
                        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-gold via-accent-emerald to-accent-slate transform md:-translate-x-1/2"
                    />

                    {/* Experience Cards */}
                    <div className="space-y-12">
                        {experience.map((exp, index) => (
                            <div
                                key={exp.id}
                                ref={(el) => (cardsRef.current[index] = el)}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-accent-gold rounded-full transform -translate-x-1/2 border-4 border-dark-400 z-10">
                                    <div className="absolute inset-0 bg-accent-gold rounded-full animate-ping opacity-20" />
                                </div>

                                {/* Card */}
                                <div
                                    className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                                        }`}
                                >
                                    <motion.div
                                        className="p-6 bg-dark-300/50 rounded-2xl border border-dark-200/20 hover:border-accent-gold/30 transition-all duration-300 group"
                                        whileHover={{ y: -5 }}
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-display font-bold text-white group-hover:text-accent-gold transition-colors">
                                                    {exp.title}
                                                </h3>
                                                <p className="text-accent-emerald font-medium">
                                                    {exp.company}
                                                </p>
                                            </div>
                                            <div className="p-2 bg-accent-gold/10 rounded-lg">
                                                <FaBriefcase className="text-accent-gold" />
                                            </div>
                                        </div>

                                        {/* Meta info */}
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                                            <span className="flex items-center gap-1">
                                                <FaMapMarkerAlt className="text-accent-gold" />
                                                {exp.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaCalendarAlt className="text-accent-gold" />
                                                {exp.period}
                                            </span>
                                        </div>

                                        {/* Highlights */}
                                        <ul className="space-y-2">
                                            {exp.highlights.map((highlight, i) => (
                                                <motion.li
                                                    key={i}
                                                    className="flex items-start gap-2 text-gray-300 text-sm"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.1 }}
                                                >
                                                    <span className="w-1.5 h-1.5 mt-2 bg-accent-gold rounded-full flex-shrink-0" />
                                                    {highlight}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className="hidden md:block md:w-5/12" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
