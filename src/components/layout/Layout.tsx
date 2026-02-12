import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { RecruiterStrip } from './RecruiterStrip';
import { FloatingDock } from './FloatingDock';
import { Noise } from '../effects/Noise';
import { CustomCursor } from '../effects/CustomCursor';
import { Preloader } from '../effects/Preloader';
import { AnimatePresence } from 'framer-motion';
import { Footer } from './Footer';

import { useLenis } from '../../hooks/useLenis';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const lenis = useLenis();

    React.useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
            if (lenis) lenis.stop();
        } else {
            document.body.style.overflow = '';
            if (lenis) lenis.start();
        }
    }, [isLoading, lenis]);

    return (
        <div className={`min-h-screen bg-dark text-white selection:bg-indigo-500/30 selection:text-indigo-200`}>
            <Noise />
            <CustomCursor />

            <AnimatePresence mode="wait">
                {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
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
