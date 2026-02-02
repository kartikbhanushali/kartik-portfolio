import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaArrowUp, FaLinkedin, FaGithub } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../constants';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 bg-dark-400 border-t border-dark-200/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo & Copyright */}
                    <div className="flex items-center gap-2 text-gray-400">
                        <span className="font-display font-bold text-white">
                            <span className="text-accent-cyan">&lt;</span>
                            {personalInfo.firstName}
                            <span className="text-accent-cyan">/&gt;</span>
                        </span>
                        <span className="text-gray-600">•</span>
                        <span className="text-sm">
                            © {currentYear} All rights reserved
                        </span>
                    </div>

                    {/* Made with love */}
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span>Made with</span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <FaHeart className="text-accent-pink" />
                        </motion.span>
                        <span>using React</span>
                    </div>

                    {/* Social & Scroll to top */}
                    <div className="flex items-center gap-4">
                        {/* Social links */}
                        {socialLinks.slice(0, 2).map((link) => (
                            <motion.a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-accent-cyan transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {link.id === 'linkedin' ? <FaLinkedin size={20} /> : <FaGithub size={20} />}
                            </motion.a>
                        ))}

                        {/* Scroll to top */}
                        <motion.button
                            onClick={scrollToTop}
                            className="w-10 h-10 bg-dark-300 rounded-lg flex items-center justify-center text-gray-400 hover:text-accent-cyan hover:bg-dark-200 transition-all"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaArrowUp />
                        </motion.button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
