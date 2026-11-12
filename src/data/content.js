// Portfolio content shared by the React sections AND the build step that
// writes crawlable HTML + llms.txt (see seo/staticContent.js). Plain data only:
// no JSX, no imports, so vite.config.js can load it in Node.

// Each project renders in both modes. `image: null` gets a designed text tile.
// `status` shows as a small badge (e.g. "In development", "Client work").
export const projects = [
    {
        title: "Aekobaba",
        category: "B2B Packaging Marketplace",
        image: "/aekobaba.webp",
        year: "2026",
        liveUrl: "https://aekobaba.vercel.app",
        description: "Built solo: a marketplace where brands send one quote request to many packaging suppliers. ~530 source-verified products from 18 suppliers, faceted search, comparison, and a Quote Basket that syncs from guest to account. 28-model Prisma schema, fail-closed role guards, a transactional email outbox, and 55 Vitest test files in CI.",
        tech: ["Next.js 15", "TypeScript", "Prisma", "Supabase", "Vitest"],
    },
    {
        title: "CodeCrypt 3.0",
        category: "Hackathon Website · ACES CUSAT",
        image: "/codecrypt.webp",
        year: "2026",
        liveUrl: "https://codecrypt.dhishna.org",
        description: "Official site for ACES CUSAT's 24-hour hackathon at Dhishna 2027. A cinematic Canvas 2D intro, a spinning minted-coin hero, a live auction simulation explaining the bidding format, countdown and registration, all in plain HTML, CSS and JavaScript with no framework or build step.",
        tech: ["JavaScript", "Canvas 2D", "HTML", "CSS"],
    },
    {
        title: "Vertex",
        category: "AI Trading Platform",
        image: "/vertex.webp",
        year: "2025–26",
        liveUrl: "https://vertex-8i4c.vercel.app/",
        description: "Full-stack trading platform for Indian markets (NSE/BSE) with portfolio tracking, strategy backtesting and paper F&O simulation on a 7-table PostgreSQL schema. Groq (Llama 3.3 70B) market analysis at sub-2s responses, and 5+ dashboard chart types for P&L, drawdown and strategy performance.",
        tech: ["React", "Vite", "Supabase", "Tailwind", "Groq API"],
    },
    {
        title: "JurisAI",
        category: "Malayalam Legal Speech Recognition",
        image: null,
        year: "2026",
        status: "Client work · Essbee.ae",
        liveUrl: null,
        description: "End-to-end Malayalam legal ASR: 3,700+ PII-redacted sentences from 30+ Kerala High Court judgments, GPU-accelerated neural TTS for training audio, and a Wav2Vec2 CTC model fine-tuned within 6 GB of VRAM to 1.7% CER / 13.8% WER on a held-out synthetic dev set.",
        tech: ["Python", "PyTorch", "Hugging Face", "Wav2Vec2", "CUDA"],
    },
    {
        title: "DayZero",
        category: "Voice-first Productivity App",
        // Concept cover (no UI built yet) — replace with a real screenshot once the app exists
        image: "/dayzero.webp",
        year: "2026",
        status: "In development",
        liveUrl: null,
        description: "A voice-first, local-first accountability app for Windows and Android. You speak naturally; a local LLM proposes structured actions, deterministic code resolves dates and recurrence, and nothing is saved until you confirm. Works offline on SQLite with Firebase sync, at zero recurring cost. Architecture and data model done; build in progress.",
        tech: ["Tauri 2", "React", "TypeScript", "SQLite", "Ollama", "Firebase"],
    },
    {
        title: "ACES CUSAT",
        category: "Official Club Website",
        image: "/aces-project.webp",
        year: "2025–26",
        liveUrl: "https://acescusat.tech",
        description: "Official website for the Association of Computer Engineering Students, serving 1,000+ members. Responsive React build backed by a design system of color tokens, typography and component specs, used across 5+ pages and maintained by a 4-person team.",
        tech: ["React", "Vite", "Figma"],
    },
    {
        title: "Team Horizon",
        category: "Mars Rover Club Website",
        image: "/horizon-project.webp",
        year: "2025–26",
        objectPosition: "top",
        liveUrl: "https://horizoncusat.tech",
        description: "Five-page multi-route site for CUSAT's Mars rover club with custom page transitions, plus a canvas starfield and scroll-driven animation that holds 60fps on mid-range devices.",
        tech: ["React 18", "Vite", "React Router", "Canvas"],
    },
    {
        title: "Open Source Connect India",
        category: "UI/UX Design",
        image: "/open-source-connect.webp",
        year: "2025",
        objectPosition: "top",
        liveUrl: "https://osconnect.org",
        description: "Designed the full 6-screen interface for an open-source event platform, from landing page to registration: wireframes, prototypes and final mockups in a 3-week sprint, applying WCAG contrast and keyboard-navigation guidelines.",
        tech: ["Figma", "Prototyping", "WCAG"],
    },
    {
        title: "3D & UI Designs",
        category: "Figma & Blender",
        // TODO: replace with your own render/screenshot (currently a stock photo)
        image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&q=80&w=1000",
        year: "2026",
        linkLabel: "View in Figma",
        liveUrl: "https://www.figma.com/design/Z8SQoGHxOpRi3od7mVnqJz/Untitled?node-id=22-2&t=i9RmVZ4XU9ryiIe8-1",
        description: "",
        tech: ["Figma", "Blender"],
    }
];

// `highlights`: concrete things you did / shipped, ideally with a result.
// e.g. "Built the live parking-availability map in React + Google Maps API"
// They render as bullet points in both modes when present.
export const experiences = [
    {
        company: "Essbee.ae",
        role: "Machine Learning / AI Intern",
        duration: "Jul 2026 – Present",
        location: "Remote",
        description: "Building JurisAI, a domain-specific Malayalam legal speech-to-text system, and owning the pipeline end to end: raw judgment text, dataset generation, model fine-tuning and inference.",
        highlights: [
            "Fine-tuned a Wav2Vec2 CTC model from a Malayalam XLSR-53 base on ~2,700 synthetic clips, reaching 1.7% CER and 13.8% WER on a held-out synthetic dev set while training within 6 GB of VRAM.",
            "Processed 3,700+ legal sentences from 30+ Kerala High Court judgments into a cleaned, PII-redacted corpus, then synthesized training audio with GPU-accelerated neural TTS (fp16, batched, multi-GPU sharded).",
            "Diagnosed a blocking NeMo/RNNT dependency failure (numba CUDA JIT under WSL) and migrated to a transformers-native Wav2Vec2 path, unblocking training without new hardware.",
        ],
        tech: ["Python", "PyTorch", "Hugging Face", "Wav2Vec2", "Neural TTS", "CUDA"],
        gradient: "from-emerald-500 to-teal-500"
    },
    {
        company: "Aekovera",
        role: "AI / Data Engineering Intern",
        duration: "Apr 2026 – Present",
        location: "Remote",
        description: "Developed an automated supplier discovery and enrichment pipeline for manufacturing companies, replacing manual research with a repeatable workflow.",
        highlights: [
            "Built Python web-scraping and HTML-parsing workflows, then used LLMs to extract structured company attributes from unstructured website content.",
            "Automated verification of company websites, LinkedIn profiles, supplier categories and contact details across hundreds of records via parallelized runs.",
        ],
        tech: ["Python", "Web Scraping", "LLMs", "Data Pipelines"],
        gradient: "from-amber-500 to-orange-500"
    },
    {
        company: "ACES CUSAT",
        role: "Tech Co-Lead",
        duration: "Jul 2026 – Present",
        detail: "Design & Development member, Dec 2025 – Jul 2026",
        location: "Kochi",
        description: "Promoted to Tech Co-Lead after seven months on the design and development team of CUSAT's computer engineering student association.",
        highlights: [
            "Built the official ACES CUSAT website in React and Vite with fully responsive layouts, serving 1,000+ student members.",
            "Authored a design system of color tokens, typography and component specs, used across 5+ pages and maintained by a 4-person team.",
            "Lead GitHub workflows for a 4-member dev team: reviewing pull requests and resolving merge conflicts.",
        ],
        tech: ["React", "Vite", "Design Systems", "Git"],
        gradient: "from-indigo-500 to-violet-500"
    },
    {
        company: "Kera.ai Urban Technologies",
        role: "Frontend Developer & UI/UX Intern",
        duration: "Jan 2026 – Feb 2026",
        location: "Remote",
        description: "Built mobile-first React UI for a parking and urban-mobility app, covering onboarding, booking and map-interaction screens.",
        highlights: [
            "Created a shared component library that cut per-screen development time by ~30% and removed duplicate styling across three feature areas.",
            "Restructured the onboarding hierarchy, reducing signup from 5 steps to 3.",
        ],
        tech: ["React", "Component Library", "UI/UX", "Maps"],
        gradient: "from-purple-500 to-indigo-500"
    },
    {
        company: "PHICSIT",
        role: "UI/UX Design Intern",
        duration: "May 2025",
        location: "Remote",
        description: "Designed the full 6-screen interface for Open Source Connect India, from landing page to registration.",
        highlights: [
            "Delivered wireframes, interactive prototypes and final mockups in a 3-week sprint, through two rounds of design review.",
            "Applied WCAG guidance to improve color contrast and keyboard navigation on every screen.",
        ],
        tech: ["Figma", "Prototyping", "WCAG"],
        gradient: "from-blue-500 to-cyan-500"
    },
];
