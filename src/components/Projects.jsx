import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../constants';
import { magneticEffect } from '../utils/animations';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

function ProjectCard({ project, index, reducedMotion }) {
    const buttonRef = useRef(null);

    useEffect(() => {
        if (reducedMotion || !buttonRef.current) return;

        const cleanup = magneticEffect(buttonRef.current, 0.2);
        return cleanup;
    }, [reducedMotion]);

    return (
        <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <div
                className="relative h-full p-6 bg-dark-300/50 rounded-2xl border border-dark-200/20 overflow-hidden transition-all duration-500 hover:border-opacity-100"
                style={{ borderColor: `${project.color}30` }}
            >
                {/* Hover gradient overlay */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                        background: `linear-gradient(135deg, ${project.color}20 0%, transparent 50%)`,
                    }}
                />

                {/* Content */}
                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3
                                className="text-xl font-display font-bold text-white group-hover:transition-colors duration-300"
                                style={{ '--hover-color': project.color }}
                            >
                                <span className="group-hover:text-[var(--hover-color)]" style={{ '--hover-color': project.color }}>
                                    {project.title}
                                </span>
                            </h3>
                            <p className="text-sm text-gray-400">{project.subtitle}</p>
                        </div>
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${project.color}20` }}
                        >
                            <span style={{ color: project.color }}>
                                {index + 1}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {project.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-6">
                        {project.highlights.slice(0, 3).map((highlight, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-2 text-gray-300 text-sm"
                            >
                                <span
                                    className="w-1.5 h-1.5 mt-2 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: project.color }}
                                />
                                {highlight}
                            </li>
                        ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-1 text-xs rounded-md transition-colors"
                                style={{
                                    backgroundColor: `${project.color}15`,
                                    color: project.color,
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* CTA Button with magnetic effect */}
                    <motion.button
                        ref={buttonRef}
                        className="w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                        style={{
                            backgroundColor: `${project.color}20`,
                            color: project.color,
                        }}
                        whileHover={{
                            backgroundColor: project.color,
                            color: '#0a0c10',
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        View Project
                        <FaExternalLinkAlt size={12} />
                    </motion.button>
                </div>

                {/* Animated border gradient */}
                <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `linear-gradient(135deg, ${project.color}40 0%, transparent 50%, transparent 50%, ${project.color}40 100%)`,
                        padding: '1px',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                    }}
                />
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <section
            id="projects"
            className="py-20 md:py-32 bg-dark-500 relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent-pink/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-accent-cyan/5 rounded-full blur-3xl" />

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
                        Featured <span className="text-accent-cyan">Projects</span>
                    </h2>
                    <div className="w-20 h-1 bg-accent-cyan mx-auto mb-4" />
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A showcase of my recent work, featuring cloud-native applications,
                        real-time platforms, and scalable systems.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            reducedMotion={prefersReducedMotion}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
