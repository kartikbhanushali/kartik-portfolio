import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaEnvelope,
    FaLinkedin,
    FaGithub,
    FaGlobe,
    FaPhone,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import { personalInfo, socialLinks } from '../constants';
import { magneticEffect } from '../utils/animations';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const iconMap = {
    FaLinkedin: FaLinkedin,
    FaGithub: FaGithub,
    FaGlobe: FaGlobe,
    FaEnvelope: FaEnvelope,
};

function MagneticButton({ children, href, className, reducedMotion }) {
    const buttonRef = useRef(null);

    useEffect(() => {
        if (reducedMotion || !buttonRef.current) return;

        const cleanup = magneticEffect(buttonRef.current, 0.3);
        return cleanup;
    }, [reducedMotion]);

    return (
        <motion.a
            ref={buttonRef}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.a>
    );
}

export default function Contact() {
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <section
            id="contact"
            className="py-20 md:py-32 bg-dark-500 relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent-gold/10 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                        Let's <span className="text-accent-gold">Connect</span>
                    </h2>
                    <div className="w-20 h-1 bg-accent-gold mx-auto mb-6" />
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        I'm always open to discussing quantitative finance, risk analytics,
                        or new opportunities in the quant space.
                    </p>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Email */}
                    <MagneticButton
                        href={`mailto:${personalInfo.email}`}
                        className="p-6 bg-dark-400/50 rounded-2xl border border-dark-200/20 hover:border-accent-gold/50 transition-all duration-300 flex items-center gap-4 group"
                        reducedMotion={prefersReducedMotion}
                    >
                        <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center group-hover:bg-accent-gold/30 transition-colors">
                            <FaEnvelope className="text-accent-gold text-xl" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Email</p>
                            <p className="text-white font-medium text-sm">{personalInfo.email}</p>
                        </div>
                    </MagneticButton>

                    {/* Phone */}
                    <MagneticButton
                        href={`tel:${personalInfo.phone}`}
                        className="p-6 bg-dark-400/50 rounded-2xl border border-dark-200/20 hover:border-accent-emerald/50 transition-all duration-300 flex items-center gap-4 group"
                        reducedMotion={prefersReducedMotion}
                    >
                        <div className="w-12 h-12 bg-accent-emerald/20 rounded-xl flex items-center justify-center group-hover:bg-accent-emerald/30 transition-colors">
                            <FaPhone className="text-accent-emerald text-xl" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Phone</p>
                            <p className="text-white font-medium text-sm">{personalInfo.phone}</p>
                        </div>
                    </MagneticButton>

                    {/* Location */}
                    <div className="p-6 bg-dark-400/50 rounded-2xl border border-dark-200/20 flex items-center gap-4 sm:col-span-2 lg:col-span-1">
                        <div className="w-12 h-12 bg-accent-slate/20 rounded-xl flex items-center justify-center">
                            <FaMapMarkerAlt className="text-accent-slate text-xl" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Location</p>
                            <p className="text-white font-medium">{personalInfo.location}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {socialLinks.map((link, index) => {
                        const Icon = iconMap[link.icon] || FaGlobe;
                        return (
                            <MagneticButton
                                key={link.id}
                                href={link.url}
                                className="w-14 h-14 bg-dark-400/50 rounded-xl border border-dark-200/20 hover:border-accent-gold/50 hover:bg-dark-300/50 transition-all duration-300 flex items-center justify-center group"
                                reducedMotion={prefersReducedMotion}
                            >
                                <Icon className="text-gray-400 text-xl group-hover:text-accent-gold transition-colors" />
                            </MagneticButton>
                        );
                    })}
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <MagneticButton
                        href={`mailto:${personalInfo.email}?subject=Let's%20work%20together`}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-emerald text-dark-500 font-semibold rounded-xl hover:shadow-glow-lg transition-all duration-300"
                        reducedMotion={prefersReducedMotion}
                    >
                        <FaEnvelope />
                        Send Me a Message
                    </MagneticButton>
                </motion.div>
            </div>
        </section>
    );
}
