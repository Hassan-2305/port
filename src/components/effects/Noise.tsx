import React from 'react';

export const Noise: React.FC = () => {
    return (
        <div
            className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.05] mix-blend-overlay"
            style={{
                backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
                backgroundRepeat: 'repeat',
            }}
        />
    );
};
