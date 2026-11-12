import { useEffect, useState } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
    const [lenis, setLenis] = useState(null);

    useEffect(() => {
        // Native scrolling for users who prefer reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const lenisInstance = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease out
            smoothWheel: true,
        });

        // Exposing an external instance created in this effect is intentional
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLenis(lenisInstance);

        let frameId;
        function raf(time) {
            lenisInstance.raf(time);
            frameId = requestAnimationFrame(raf);
        }
        frameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frameId);
            lenisInstance.destroy();
        };
    }, []);

    return lenis;
};
