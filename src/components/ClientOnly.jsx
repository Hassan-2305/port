import { useState, useEffect } from 'react';

/**
 * Renders children only on the client (after mount).
 * Ensures browser-only code (WebGL, Canvas) is never executed during SSR.
 */
export function ClientOnly({ children, fallback = null }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    return mounted ? children : fallback;
}
