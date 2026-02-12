import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-2xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-heading font-bold mb-4">Let's Work Together</h2>
                    <p className="text-neutral-400">
                        Open to freelance opportunities and full-time roles.
                    </p>
                </motion.div>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-neutral-300">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-neutral-300">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-neutral-300">Message</label>
                        <textarea
                            id="message"
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                            placeholder="Tell me about your project..."
                        />
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all">
                        <Send className="w-5 h-5" />
                        Send Message
                    </button>
                </form>

                <footer className="mt-20 text-center text-sm text-neutral-500 border-t border-white/5 pt-8">
                    <p>© {new Date().getFullYear()} Elite Portfolio by Antigravity.</p>
                </footer>
            </div>
        </section>
    );
};
