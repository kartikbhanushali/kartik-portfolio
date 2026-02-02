import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Marquee from './components/Marquee';
import Contact from './components/Contact';
import Footer from './components/Footer';

import usePrefersReducedMotion from './hooks/usePrefersReducedMotion';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        // Initialize ScrollTrigger
        if (!prefersReducedMotion) {
            ScrollTrigger.refresh();
        }

        // Cleanup on unmount
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [prefersReducedMotion]);

    return (
        <div className="App bg-dark-500 text-white min-h-screen">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Marquee />
                <Skills />
                <Experience />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
