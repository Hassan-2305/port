// Single source of truth for personal links and skills.
// Update here and every section (both modes) picks it up.
// Content mirrors the resume at public/resume.pdf.

export const profile = {
    name: "Mohammed Hassan",
    shortName: "Hassan",
    role: "Software Engineer",
    focus: "AI/ML · Full-Stack",
    location: "Kochi, India",
    email: "mohammedhassan2305@gmail.com",
    github: "https://github.com/Hassan-2305",
    githubUser: "Hassan-2305",
    linkedin: "https://www.linkedin.com/in/mohamhassan/",
    resume: "/resume.pdf",
};

export const skillGroups = [
    { category: "AI / ML & Speech", items: ["PyTorch", "Hugging Face Transformers", "ASR (Wav2Vec2, Whisper)", "Neural TTS", "LLM APIs (Groq / Llama)", "CUDA"], color: "bg-emerald-500" },
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js / R3F"], color: "bg-blue-500" },
    { category: "Backend & Data", items: ["Supabase", "PostgreSQL", "Prisma", "Zod", "REST APIs", "Web Scraping"], color: "bg-cyan-500" },
    { category: "Languages", items: ["Python", "JavaScript", "TypeScript", "C", "C++", "Java", "SQL"], color: "bg-purple-500" },
    { category: "Tools & Design", items: ["Git / GitHub Actions", "Vitest", "Vercel", "Linux / Bash", "Figma", "Blender"], color: "bg-orange-500" },
];
