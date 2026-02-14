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

export const Layout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    const lenis = useLenis();

    const imageUrls = [
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&q=80&w=1000"
    ];

    React.useEffect(() => {
        const preloadImages = async () => {
            const promises = imageUrls.map((src) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = resolve; // Proceed even if error
                });
            });
            await Promise.all(promises);
            setAssetsLoaded(true);
        };

        preloadImages();
    }, []);

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
