import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { RecruiterStrip } from './RecruiterStrip';
import { FloatingDock } from './FloatingDock';
import { Noise } from '../effects/Noise';
import { CustomCursor } from '../effects/CustomCursor';
import { Preloader } from '../effects/Preloader';
import { AnimatePresence } from 'framer-motion';
// import { ReactLenis } from '@studio-freight/react-lenis';
// import { Footer } from './Footer'; // To be implemented

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isLoading]);

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
            {/* <Footer /> */}
        </div>
    );
};
