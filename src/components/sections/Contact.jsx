import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from "@formspree/react";
import { useMode } from '../../context/ModeContext';
import {
    Github,
    Linkedin,
    Mail,
    FileDown,
    Copy,
    Check,
    ExternalLink
} from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { profile } from '../../data/profile';

const contactMethods = [
    {
        name: "GitHub",
        icon: Github,
        handle: `@${profile.githubUser}`,
        link: profile.github,
        action: "View Profile",
        gradient: "from-purple-500 to-pink-500",
        hoverGlow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        handle: profile.name,
        link: profile.linkedin,
        action: "Connect",
        gradient: "from-blue-500 to-cyan-500",
        hoverGlow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
    },
    {
        name: "Email",
        icon: Mail,
        handle: profile.email,
        action: "Copy",
        gradient: "from-orange-500 to-red-500",
        hoverGlow: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
    },
    {
        name: "Resume",
        icon: FileDown,
        handle: "Download PDF",
        link: profile.resume,
        action: "Download",
        gradient: "from-green-500 to-emerald-500",
        hoverGlow: "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
    }
];

export const Contact = () => {
    const { isRecruiterMode } = useMode();
    const [copiedEmail, setCopiedEmail] = useState(false);
    // Must be at top level — React Rules of Hooks
    const [state, handleSubmit] = useForm("xzdaqvrn");

    const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

    const handleEmailCopy = async () => {
        if (isTouch) {
            window.location.href = `mailto:${profile.email}`;
            return;
        }
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2000);
        } catch {
            // Clipboard blocked (insecure context / permissions) — fall back to mail client
            window.location.href = `mailto:${profile.email}`;
        }
    };

    // --- RECRUITER MODE (Formspree Form) ---
    if (isRecruiterMode) {

        if (state.succeeded) {
            return (
                <section id="contact" className="py-20 bg-dark border-t border-white/5">
                    <div className="container mx-auto px-6 max-w-2xl text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">Got it, thanks.</h2>
                        <p className="text-neutral-400">
                            I'll reply to the email you left.
                        </p>
                    </div>
                </section>
            );
        }

        return (
            <section id="contact" className="py-20 bg-dark border-t border-white/5">
                <div className="container mx-auto px-6 max-w-2xl">
                    <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        Get In Touch
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            aria-label="Your name"
                            autoComplete="name"
                            required
                            className="w-full p-4 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500/50 text-white outline-none"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            aria-label="Your email"
                            autoComplete="email"
                            required
                            className="w-full p-4 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500/50 text-white outline-none"
                        />
                        <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                            className="text-red-400 text-sm"
                        />

                        <textarea
                            name="message"
                            placeholder="Your Message"
                            aria-label="Your message"
                            required
                            rows="5"
                            className="w-full p-4 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500/50 text-white outline-none"
                        />

                        <button
                            type="submit"
                            disabled={state.submitting}
                            className="w-full p-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-medium"
                        >
                            {state.submitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </section>
        );
    }

    // --- NORMAL MODE (Magnetic Cards) ---
    return (
        <section id="contact" className="min-h-screen py-32 bg-gradient-to-b from-dark via-neutral-900 to-dark relative overflow-hidden flex items-center">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 mb-6">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium">Open to opportunities</span>
                    </div>

                    <h2 className="text-6xl md:text-7xl font-heading font-bold mb-6">
                        Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">talk</span>.
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        Internships, freelance builds, a hackathon team that's one person short, or a question about something on this page. Pick whichever's easiest.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {contactMethods.map((method, index) => {
                        const isEmail = method.name === "Email";
                        // Real <a>/<button> so cards work with keyboard and screen readers
                        const Card = isEmail ? motion.button : motion.a;
                        const cardProps = isEmail
                            ? { type: "button", onClick: handleEmailCopy, "aria-label": `${isTouch ? 'Email' : 'Copy email address'} ${profile.email}` }
                            : {
                                href: method.link,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                ...(method.name === "Resume" ? { download: true } : {}),
                                "aria-label": `${method.name}: ${method.action}`,
                            };
                        return (
                        <MagneticButton key={method.name} strength={0.3} className="w-full">
                            <Card
                                {...cardProps}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                whileHover={{ y: -8 }}
                                className={`group relative block w-full text-left cursor-pointer rounded-2xl ${method.hoverGlow} transition-shadow duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-4`}
                            >
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${method.gradient} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500`}></div>
                                <div className="relative bg-neutral-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8 h-full flex flex-col">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${method.gradient} p-0.5 mb-4 group-hover:scale-110 transition-transform`}>
                                        <div className="w-full h-full bg-neutral-900 rounded-xl flex items-center justify-center">
                                            <method.icon className="w-7 h-7 text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{method.name}</h3>
                                    <p className="text-neutral-400 text-sm mb-4 flex-grow">{method.handle}</p>
                                    <div className={`flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${method.gradient} bg-clip-text text-transparent group-hover:translate-x-1 transition-transform`}>
                                        {method.name === "Email" && copiedEmail ? (
                                            <>
                                                <Check className="w-4 h-4" />
                                                Copied!
                                            </>
                                        ) : method.name === "Email" ? (
                                            <>
                                                {isTouch
                                                    ? <Mail className="w-4 h-4" aria-hidden="true" />
                                                    : <Copy className="w-4 h-4" aria-hidden="true" />}
                                                {isTouch ? 'Send Email' : 'Copy'}
                                            </>
                                        ) : (
                                            <>
                                                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                                                {method.action}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </MagneticButton>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};