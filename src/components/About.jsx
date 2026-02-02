import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa';
import { personalInfo, education } from '../constants';
import { gsap, ScrollTrigger } from '../utils/animations';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

export default function About() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);
    const [displayBio, setDisplayBio] = useState('');
    const [bioComplete, setBioComplete] = useState(false);

    useEffect(() => {
        if (prefersReducedMotion) {
            setDisplayBio(personalInfo.bio);
            setBioComplete(true);
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Clip-path reveal for image
        if (imageRef.current) {
            gsap.fromTo(
                imageRef.current,
                { clipPath: 'inset(0 100% 0 0)' },
                {
                    clipPath: 'inset(0 0% 0 0)',
                    duration: 1.2,
                    ease: 'power4.inOut',
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }

        // Typewriter effect for bio on scroll
        const bioTrigger = ScrollTrigger.create({
            trigger: textRef.current,
            start: 'top 80%',
            onEnter: () => {
                let currentIndex = 0;
                const bio = personalInfo.bio;
                const typeInterval = setInterval(() => {
                    if (currentIndex <= bio.length) {
                        setDisplayBio(bio.slice(0, currentIndex));
                        currentIndex++;
                    } else {
                        clearInterval(typeInterval);
                        setBioComplete(true);
                    }
                }, 20);
            },
            once: true,
        });

        return () => {
            bioTrigger.kill();
        };
    }, [prefersReducedMotion]);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-20 md:py-32 bg-dark-400 relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent-cyan/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent-purple/5 rounded-full blur-3xl" />

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
                        About <span className="text-accent-cyan">Me</span>
                    </h2>
                    <div className="w-20 h-1 bg-accent-cyan mx-auto" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Image with clip-path reveal */}
                    <div className="relative">
                        <div
                            ref={imageRef}
                            className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-2xl"
                        >
                            {/* Profile image */}
                            <img
                                src={`${process.env.PUBLIC_URL}/Harsh_Photo.jpeg`}
                                alt="Harsh Ramani"
                                className="w-full h-full object-cover"
                            />

                            {/* Decorative border */}
                            <div className="absolute inset-0 border-2 border-accent-cyan/30 rounded-2xl transform translate-x-4 translate-y-4 -z-10" />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div ref={textRef}>
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="flex items-center gap-2 text-accent-cyan">
                                <FaMapMarkerAlt />
                                <span className="font-medium">{personalInfo.location}</span>
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed min-h-[150px]">
                                {displayBio}
                                {!bioComplete && (
                                    <span className="inline-block w-0.5 h-5 bg-accent-cyan ml-1 animate-pulse" />
                                )}
                            </p>

                            {/* Education Cards */}
                            <div className="space-y-4 mt-8">
                                <h3 className="text-xl font-display font-semibold text-white flex items-center gap-2">
                                    <FaGraduationCap className="text-accent-cyan" />
                                    Education
                                </h3>

                                {education.map((edu, index) => (
                                    <motion.div
                                        key={index}
                                        className="p-4 bg-dark-300/50 rounded-xl border border-dark-200/20 hover:border-accent-cyan/30 transition-colors"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                    >
                                        <h4 className="font-semibold text-white">{edu.degree}</h4>
                                        <p className="text-accent-cyan text-sm">{edu.school}</p>
                                        <p className="text-gray-500 text-sm">{edu.period}</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {edu.coursework.slice(0, 3).map((course, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs px-2 py-1 bg-dark-400 text-gray-400 rounded"
                                                >
                                                    {course}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
