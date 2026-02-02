import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Animate elements with stagger when they enter the viewport
 */
export const animateOnScroll = (elements, options = {}) => {
    const defaults = {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        start: 'top 85%',
        ...options,
    };

    gsap.fromTo(
        elements,
        { y: defaults.y, opacity: defaults.opacity },
        {
            y: 0,
            opacity: 1,
            duration: defaults.duration,
            stagger: defaults.stagger,
            ease: defaults.ease,
            scrollTrigger: {
                trigger: elements[0] || elements,
                start: defaults.start,
                toggleActions: 'play none none none',
            },
        }
    );
};

/**
 * Animate element with clip-path reveal
 */
export const clipPathReveal = (element, options = {}) => {
    const defaults = {
        duration: 1.2,
        ease: 'power4.inOut',
        start: 'top 80%',
        ...options,
    };

    gsap.fromTo(
        element,
        { clipPath: 'inset(0 100% 0 0)' },
        {
            clipPath: 'inset(0 0% 0 0)',
            duration: defaults.duration,
            ease: defaults.ease,
            scrollTrigger: {
                trigger: element,
                start: defaults.start,
                toggleActions: 'play none none none',
            },
        }
    );
};

/**
 * Slide in animation from a direction
 */
export const slideIn = (element, direction = 'left', options = {}) => {
    const defaults = {
        duration: 0.8,
        ease: 'power3.out',
        delay: 0,
        ...options,
    };

    const xStart = direction === 'left' ? -100 : direction === 'right' ? 100 : 0;
    const yStart = direction === 'up' ? 100 : direction === 'down' ? -100 : 0;

    gsap.fromTo(
        element,
        { x: xStart, y: yStart, opacity: 0 },
        {
            x: 0,
            y: 0,
            opacity: 1,
            duration: defaults.duration,
            ease: defaults.ease,
            delay: defaults.delay,
        }
    );
};

/**
 * Stagger animation for navbar links
 */
export const staggerNavLinks = (elements, options = {}) => {
    const defaults = {
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.3,
        ...options,
    };

    gsap.fromTo(
        elements,
        { y: -30, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: defaults.duration,
            stagger: defaults.stagger,
            ease: defaults.ease,
            delay: defaults.delay,
        }
    );
};

/**
 * Magnetic button effect
 */
export const magneticEffect = (element, strength = 0.3) => {
    const handleMouseMove = (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
            x: x * strength,
            y: y * strength,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = () => {
        gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)',
        });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
    };
};

/**
 * Create a timeline reveal animation
 */
export const timelineReveal = (container, items, options = {}) => {
    const defaults = {
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        start: 'top 80%',
        ...options,
    };

    items.forEach((item, index) => {
        const direction = index % 2 === 0 ? -100 : 100;

        gsap.fromTo(
            item,
            { x: direction, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: defaults.duration,
                ease: defaults.ease,
                scrollTrigger: {
                    trigger: item,
                    start: defaults.start,
                    toggleActions: 'play none none none',
                },
            }
        );
    });
};

/**
 * Parallax scroll effect
 */
export const parallaxScroll = (element, speed = 0.5) => {
    gsap.to(element, {
        y: () => window.innerHeight * speed * -1,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    });
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Initialize all ScrollTrigger animations with reduced motion check
 */
export const initScrollAnimations = (reducedMotion = false) => {
    if (reducedMotion) {
        // Disable all animations for users who prefer reduced motion
        gsap.globalTimeline.pause();
        return;
    }

    ScrollTrigger.refresh();
};

export { gsap, ScrollTrigger };
