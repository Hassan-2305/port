import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "../../context/ModeContext";
import { FileText, Code2, Zap, Layers } from "lucide-react";

export const RecruiterStrip = () => {
    const { isRecruiterMode } = useMode();

    return (
        <AnimatePresence>
            {isRecruiterMode && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-indigo-900/20 border-b border-indigo-500/30 backdrop-blur-md sticky top-[64px] z-40 overflow-hidden"
                >
                    <div className="container mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">

                        {/* Role & status */}
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="font-medium text-indigo-200">Open to Work</span>
                            <span className="text-neutral-400 hidden md:inline">|</span>
                            <span className="text-white font-semibold">Senior Frontend Engineer</span>
                        </div>

                        {/* Quick Skills */}
                        <div className="flex items-center gap-6 text-neutral-300">
                            <div className="flex items-center gap-2">
                                <Code2 className="w-4 h-4 text-indigo-400" />
                                <span>React Ecosystem</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-400" />
                                <span>Performance</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Layers className="w-4 h-4 text-blue-400" />
                                <span>Design Systems</span>
                            </div>
                        </div>

                        {/* Resume Action */}
                        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-full text-xs font-semibold transition-all shadow-lg hover:shadow-indigo-500/25">
                            <FileText className="w-3.5 h-3.5" />
                            Download Resume
                        </button>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
