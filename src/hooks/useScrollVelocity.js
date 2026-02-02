import { useEffect, useState, useRef } from 'react';

/**
 * Hook to calculate scroll velocity for marquee effects
 * Returns the current scroll velocity (positive = down, negative = up)
 */
export function useScrollVelocity() {
    const [velocity, setVelocity] = useState(0);
    const lastScrollY = useRef(0);
    const lastTime = useRef(Date.now());
    const velocityRef = useRef(0);
    const rafId = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentTime = Date.now();
            const currentScrollY = window.scrollY;
            const timeDelta = currentTime - lastTime.current;

            if (timeDelta > 0) {
                const scrollDelta = currentScrollY - lastScrollY.current;
                const newVelocity = scrollDelta / timeDelta;

                // Smooth the velocity with lerp
                velocityRef.current = velocityRef.current * 0.8 + newVelocity * 0.2;
                setVelocity(velocityRef.current);
            }

            lastScrollY.current = currentScrollY;
            lastTime.current = currentTime;
        };

        // Decay velocity when not scrolling
        const decayVelocity = () => {
            velocityRef.current *= 0.95;
            if (Math.abs(velocityRef.current) < 0.001) {
                velocityRef.current = 0;
            }
            setVelocity(velocityRef.current);
            rafId.current = requestAnimationFrame(decayVelocity);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        rafId.current = requestAnimationFrame(decayVelocity);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    return velocity;
}

export default useScrollVelocity;
