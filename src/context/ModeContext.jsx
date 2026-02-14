import React, { createContext, useContext, useEffect, useState } from 'react';



const ModeContext = createContext(undefined);

export const ModeProvider = ({ children }) => {
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
    const setRecruiterMode = (value) => setIsRecruiterMode(value);

    // Cursor State
    const [cursorText, setCursorText] = useState("");
    const [cursorVariant, setCursorVariant] = useState("default");

    // Animation constants based on mode
    const animationDuration = {
        slow: isRecruiterMode ? 0.3 : 0.8,
        medium: isRecruiterMode ? 0.2 : 0.5,
        fast: isRecruiterMode ? 0.1 : 0.3,
    };

    return (
        <ModeContext.Provider value={{
            isRecruiterMode,
            toggleRecruiterMode,
            setRecruiterMode,
            animationDuration,
            cursorText,
            setCursorText,
            cursorVariant,
            setCursorVariant
        }}>
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
