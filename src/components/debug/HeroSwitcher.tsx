import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { MagneticButton } from '../ui/MagneticButton';
import { ChevronLeft, ChevronRight, List, X } from 'lucide-react';

// ═══════════════════════════════════════════════════════
// HERO SWITCHER: Dynamic Loader for 100+ Versions
// ═══════════════════════════════════════════════════════

export const HeroSwitcher: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 1. DYNAMICALLY IMPORT ALL HERO FILES
    const modules = import.meta.glob('../sections/Hero*.tsx');

    // 2. PARSE AND SORT HEROES
    const heroes = useMemo(() => {
        return Object.keys(modules)
            .map((path) => {
                // Extract filename: "../sections/HeroV55.tsx" -> "HeroV55"
                const name = path.split('/').pop()?.replace('.tsx', '') || '';

                // Extract number for sorting: "HeroV55" -> 55
                // Handle "Hero" as 1 (or 0)
                let number = 0;
                const match = name.match(/HeroV(\d+)/);
                if (match) {
                    number = parseInt(match[1], 10);
                } else if (name === 'Hero') {
                    number = 1; // Base Hero is V1
                } else if (name === 'Hero_Legacy') {
                    number = 0; // Legacy
                }

                return {
                    name,
                    number,
                    path,
                    loader: modules[path] as () => Promise<any>
                };
            })
            // Filter out internal/debug files if any
            .filter(h => h.name.startsWith('Hero'))
            // Sort by number
            .sort((a, b) => a.number - b.number);
    }, []);

    // 3. LOAD ACTIVE COMPONENT
    const ActiveHero = useMemo(() => {
        const heroData = heroes[currentIndex];
        if (!heroData) return null;
        return React.lazy(async () => {
            const mod = await heroData.loader();
            // Handle named export "Hero" or default export
            return { default: mod.Hero || mod.default };
        });
    }, [currentIndex, heroes]);

    // HANDLERS
    const nextHero = () => setCurrentIndex(prev => (prev + 1) % heroes.length);
    const prevHero = () => setCurrentIndex(prev => (prev - 1 + heroes.length) % heroes.length);
    const goToHero = (index: number) => {
        setCurrentIndex(index);
        setIsMenuOpen(false);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextHero();
            if (e.key === 'ArrowLeft') prevHero();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [heroes.length]);

    const currentHeroName = heroes[currentIndex]?.name || 'Loading...';

    return (
        <>
            {/* RENDER ACTIVE HERO */}
            <Suspense fallback={
                <div className="h-screen w-full flex items-center justify-center bg-black text-white font-mono uppercase tracking-widest">
                    Loading {currentHeroName}...
                </div>
            }>
                {ActiveHero && <ActiveHero />}
            </Suspense>

            {/* SWITCHER UI (Fixed Overlay) */}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2 pointer-events-auto">

                {/* MENU DRAWER */}
                {isMenuOpen && (
                    <div className="bg-black/90 backdrop-blur-md border border-white/10 rounded-lg p-2 mb-2 w-64 max-h-[60vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-2 mb-2 border-b border-white/10 sticky top-0 bg-black/95">
                            <span className="text-xs font-bold text-white uppercase tracking-widest">Select Version</span>
                            <button onClick={() => setIsMenuOpen(false)}><X size={14} className="text-white" /></button>
                        </div>
                        <div className="flex flex-col gap-1">
                            {heroes.map((h, idx) => (
                                <button
                                    key={h.name}
                                    onClick={() => goToHero(idx)}
                                    className={`text-left text-[10px] uppercase tracking-widest px-3 py-2 rounded-md transition-colors ${idx === currentIndex
                                            ? 'bg-white text-black font-bold'
                                            : 'text-white/50 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {h.number === 0 ? 'Legacy' : `V${h.number}`} - {h.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* CONTROLS */}
                <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-1 pl-4">
                    <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest mr-2 min-w-[80px] text-center">
                        {currentHeroName}
                    </span>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
                        title="List all versions"
                    >
                        <List size={14} />
                    </button>

                    <div className="h-4 w-px bg-white/10 mx-1"></div>

                    <button
                        onClick={prevHero}
                        className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
                        title="Previous (Left Arrow)"
                    >
                        <ChevronLeft size={14} />
                    </button>
                    <button
                        onClick={nextHero}
                        className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
                        title="Next (Right Arrow)"
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </>
    );
};
