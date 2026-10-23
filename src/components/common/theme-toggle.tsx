import React from "react";
import { motion } from "motion/react";
import { useTheme } from "@/lib/theme-provider";

interface ThemeToggleProps {
  className?: string;
  size?: "default" | "compact";
}

export function ThemeToggle({ className = "", size = "default" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Desktop dimensions: 50px width, 28px height, 22px thumb
  // Compact / Mobile dimensions: 44px width, 26px height, 20px thumb
  const isCompact = size === "compact";
  const pillWidth = isCompact ? 44 : 50;
  const pillHeight = isCompact ? 26 : 28;
  const thumbSize = isCompact ? 20 : 22;
  const padding = 3;
  const travelDist = pillWidth - thumbSize - padding * 2;

  const nextThemeLabel = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={nextThemeLabel}
      title={nextThemeLabel}
      onClick={toggleTheme}
      style={{
        width: `${pillWidth}px`,
        height: `${pillHeight}px`,
        padding: `${padding}px`,
      }}
      className={[
        "relative rounded-full shrink-0 flex items-center cursor-pointer select-none",
        "transition-colors duration-300 ease-out",
        "border border-black/[0.08] dark:border-white/[0.14]",
        "bg-black/[0.04] hover:bg-black/[0.07] dark:bg-white/[0.08] dark:hover:bg-white/[0.12]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-buzz-yellow)] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111111]",
        "pointer-events-auto",
        className,
      ].join(" ")}
    >
      {/* Background Track Icons (Subtle ambient icons on sides) */}
      <span
        aria-hidden="true"
        className="absolute left-[7px] flex items-center justify-center pointer-events-none text-[#141414]/40 dark:text-white/20 transition-opacity duration-300"
      >
        {/* Subtle Sun Indicator */}
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </span>
      <span
        aria-hidden="true"
        className="absolute right-[7px] flex items-center justify-center pointer-events-none text-[#141414]/20 dark:text-white/40 transition-opacity duration-300"
      >
        {/* Subtle Moon Indicator */}
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </span>

      {/* Moving Sliding Pill Thumb */}
      <motion.div
        style={{
          width: `${thumbSize}px`,
          height: `${thumbSize}px`,
        }}
        animate={{
          x: isDark ? travelDist : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 32,
        }}
        className={[
          "relative rounded-full shadow-sm flex items-center justify-center",
          "bg-white text-[#111111] dark:bg-[#1a1a19] dark:text-[color:var(--color-buzz-yellow)]",
          "border border-black/[0.04] dark:border-white/[0.12]",
        ].join(" ")}
      >
        {/* Animated Icon inside Thumb */}
        <motion.div
          key={isDark ? "dark-icon" : "light-icon"}
          initial={{ scale: 0.6, rotate: isDark ? -45 : 45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5 text-[#141414]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}
