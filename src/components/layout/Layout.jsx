import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { RecruiterStrip } from './RecruiterStrip';
import { FloatingDock } from './FloatingDock';
import { Noise } from '../effects/Noise';
import { CustomCursor } from '../effects/CustomCursor';
import { Preloader } from '../effects/Preloader';
import { AnimatePresence } from 'framer-motion';
import { Footer } from './Footer';
import { useMode } from '../../context/ModeContext';
import { useLenis } from '../../hooks/useLenis';

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const Layout = ({ children }) => {
    const { isRecruiterMode } = useMode();
    // Recruiters and reduced-motion users skip the intro entirely
    const [isLoading, setIsLoading] = useState(() => !isRecruiterMode && !prefersReducedMotion());
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    const lenis = useLenis();

    // Wait for web fonts (the main thing that causes a visible layout jump)
    useEffect(() => {
        let cancelled = false;
        const fontsReady = document.fonts?.ready ?? Promise.resolve();
        // Never hold the page hostage for more than 3s
        const timeout = new Promise((resolve) => setTimeout(resolve, 3000));
        Promise.race([fontsReady, timeout]).then(() => {
            if (!cancelled) setAssetsLoaded(true);
        });
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
            if (lenis) lenis.stop();
        } else {
            document.body.style.overflow = '';
            if (lenis) lenis.start();
        }
    }, [isLoading, lenis]);

    return (
        <div className="min-h-screen bg-dark text-white selection:bg-indigo-500/30 selection:text-indigo-200">
            <Noise />
            <CustomCursor />

            <AnimatePresence mode="wait">
                {isLoading && <Preloader onComplete={() => setIsLoading(false)} assetsLoaded={assetsLoaded} />}
            </AnimatePresence>

            <Navbar />
            <FloatingDock />
            <div className="relative z-50">
                <RecruiterStrip />
            </div>

            <main className="relative z-0">
                {children}
            </main>
            <Footer />
        </div>
    );
};
