import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaDownload } from 'react-icons/fa';
import { navLinks, personalInfo } from '../constants';
import { staggerNavLinks } from '../utils/animations';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);
    const linksRef = useRef([]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Animate nav links on mount
        if (linksRef.current.length > 0) {
            staggerNavLinks(linksRef.current);
        }
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-dark-500/90 backdrop-blur-lg shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        onClick={(e) => handleNavClick(e, '#home')}
                        className="text-xl md:text-2xl font-display font-bold text-white"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {personalInfo.firstName}
                        <span className="text-accent-gold">.</span>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.id}
                                ref={(el) => (linksRef.current[index] = el)}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="nav-link relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent-cyan transition-all duration-300 group-hover:w-full group-hover:left-0" />
                            </a>
                        ))}
                        {/* Resume Download Button */}
                        <a
                            ref={(el) => (linksRef.current[navLinks.length] = el)}
                            href={`${process.env.PUBLIC_URL}/Bhanushali_Kartik_Resume.pdf`}
                            download="Kartik_Bhanushali_Resume.pdf"
                            className="nav-link ml-4 px-4 py-2 bg-accent-gold text-dark-500 text-sm font-semibold rounded-lg hover:bg-accent-gold/90 transition-all duration-300 flex items-center gap-2"
                        >
                            <FaDownload className="text-sm" />
                            Resume
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden p-2 text-white"
                        onClick={() => setIsOpen(!isOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-dark-400/95 backdrop-blur-lg overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.id}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-dark-300 rounded-lg transition-colors"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            {/* Resume Download Button - Mobile */}
                            <motion.a
                                href={`${process.env.PUBLIC_URL}/Bhanushali_Kartik_Resume.pdf`}
                                download="Kartik_Bhanushali_Resume.pdf"
                                className="flex items-center gap-2 px-4 py-3 bg-accent-gold text-dark-500 font-semibold rounded-lg"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.05 }}
                            >
                                <FaDownload />
                                Resume
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
