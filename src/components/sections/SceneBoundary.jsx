import { Component } from 'react';

// Keeps a WebGL failure from taking the whole site down.
//
// When the browser drops the WebGL context (GPU memory pressure, driver reset,
// page zoom, tab switching), react-three-fiber throws "Cannot read properties
// of null (reading 'alpha')". Without a boundary React unmounts the entire app
// and the visitor sees a black page. Here the 3D scene is remounted with a
// fresh context a couple of times, then quietly dropped if it keeps failing.
const MAX_RETRIES = 3;

export class SceneBoundary extends Component {
    state = { failed: false, attempt: 0 };

    static getDerivedStateFromError() {
        return { failed: true };
    }

    componentDidCatch(error) {
        console.warn('[hero] 3D scene failed, recovering:', error?.message);
        if (this.state.attempt < MAX_RETRIES) {
            this.retryTimer = setTimeout(
                () => this.setState((s) => ({ failed: false, attempt: s.attempt + 1 })),
                600
            );
        }
    }

    componentWillUnmount() {
        clearTimeout(this.retryTimer);
    }

    render() {
        if (this.state.failed) return this.props.fallback ?? null;
        // A new key forces a brand-new <Canvas> (and WebGL context) on each retry
        return <div key={this.state.attempt} className="contents">{this.props.children}</div>;
    }
}
