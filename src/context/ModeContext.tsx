import React, { createContext, useContext, useEffect, useState } from 'react';

type ModeContextType = {
    isRecruiterMode: boolean;
    toggleRecruiterMode: () => void;
    setRecruiterMode: (value: boolean) => void;
    animationDuration: {
        slow: number;
        medium: number;
        fast: number;
    };
};

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isRecruiterMode, setIsRecruiterMode] = useState(false);

    // Persistence
    useEffect(() => {
        const savedMode = localStorage.getItem('isRecruiterMode');
        if (savedMode) {
            setIsRecruiterMode(JSON.parse(savedMode));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('isRecruiterMode', JSON.stringify(isRecruiterMode));
    }, [isRecruiterMode]);

    const toggleRecruiterMode = () => setIsRecruiterMode(prev => !prev);
    const setRecruiterMode = (value: boolean) => setIsRecruiterMode(value);

    // Animation constants based on mode
    const animationDuration = {
        slow: isRecruiterMode ? 0.3 : 0.8,
        medium: isRecruiterMode ? 0.2 : 0.5,
        fast: isRecruiterMode ? 0.1 : 0.3,
    };

    return (
        <ModeContext.Provider value={{ isRecruiterMode, toggleRecruiterMode, setRecruiterMode, animationDuration }}>
            {children}
        </ModeContext.Provider>
    );
};

export const useMode = () => {
    const context = useContext(ModeContext);
    if (!context) {
        throw new Error('useMode must be used within a ModeProvider');
    }
    return context;
};
