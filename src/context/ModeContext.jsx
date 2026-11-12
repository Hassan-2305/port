import React, { createContext, useContext, useEffect, useState } from 'react';

const ModeContext = createContext(undefined);

const STORAGE_KEY = 'isRecruiterMode';

// Read the saved mode synchronously so the page doesn't flash creative mode first.
const readSavedMode = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) === true;
    } catch {
        return false;
    }
};

export const ModeProvider = ({ children }) => {
    const [isRecruiterMode, setIsRecruiterMode] = useState(readSavedMode);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(isRecruiterMode));
        } catch {
            // storage unavailable (private mode etc.) — ignore
        }
    }, [isRecruiterMode]);

    const toggleRecruiterMode = () => setIsRecruiterMode(prev => !prev);
    const setRecruiterMode = (value) => setIsRecruiterMode(value);

    // Cursor State
    const [cursorText, setCursorText] = useState("");
    const [cursorVariant, setCursorVariant] = useState("default");

    return (
        <ModeContext.Provider value={{
            isRecruiterMode,
            toggleRecruiterMode,
            setRecruiterMode,
            cursorText,
            setCursorText,
            cursorVariant,
            setCursorVariant
        }}>
            {children}
        </ModeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMode = () => {
    const context = useContext(ModeContext);
    if (!context) {
        throw new Error('useMode must be used within a ModeProvider');
    }
    return context;
};
