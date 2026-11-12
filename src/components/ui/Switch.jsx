import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

// Accessible toggle: real <button role="switch"> so it's focusable and announced.
export const Switch = ({ checked, onCheckedChange, className, label = "Recruiter mode" }) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            className={cn(
                "relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark",
                checked ? "bg-indigo-600" : "bg-neutral-700",
                className
            )}
            onClick={() => onCheckedChange(!checked)}
        >
            <motion.span
                className="block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform"
                animate={{ x: checked ? 22 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </button>
    );
};
