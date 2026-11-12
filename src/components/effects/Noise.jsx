// Film-grain overlay. The texture is an inline SVG (no network request), so it
// can't break when a third-party host goes down: the old external noise.svg
// started returning 402 Payment Required.
const NOISE_SVG =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>` +
        `<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter>` +
        `<rect width='100%' height='100%' filter='url(#n)'/></svg>`
    );

export const Noise = () => (
    <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE_SVG}")`, backgroundRepeat: 'repeat' }}
    />
);
