/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/common/theme-toggle";

export const NAV = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/contact") {
      setActive("contact");
      return;
    }

    const ids = NAV.map((n) => n.id);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [location.pathname]);

  const go = (id: string) => {
    setOpen(false);
    if (id === "contact") {
      if (location.pathname === "/contact") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate({ to: "/contact" });
      }
      return;
    }

    if (location.pathname !== "/") {
      navigate({ to: "/" }).then(() => {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <>
      <header 
        className="fixed top-0 left-0 w-full h-auto z-[100] pointer-events-none overflow-visible"
      >
        <nav 
          id="main-navigation"
          aria-label="Main navigation"
          className="relative mx-auto pointer-events-auto overflow-hidden box-border backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 rounded-full w-[calc(100vw-32px)] md:w-[min(900px,calc(100vw-48px))] max-w-[900px] mt-[14px] md:mt-[24px] px-[14px] py-[10px] md:px-[16px] bg-[rgba(245,244,241,0.92)] dark:bg-[rgba(16,16,14,0.88)] shadow-[0_6px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.45)] border border-[rgba(20,20,20,0.08)] dark:border-[rgba(255,255,255,0.12)]"
        >
          <div 
            className="relative w-full grid items-center box-border"
            style={{
              gridTemplateColumns: !isMobile 
                ? "auto 1fr auto" 
                : "minmax(0, 1fr) auto minmax(0, 1fr)",
              columnGap: !isMobile ? "32px" : "0px",
            }}
          >
            {/* Logo Column */}
            <div 
              className="relative transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" 
              style={{ gridColumn: 1, justifySelf: "start", transform: "translateX(0)" }}
            >
              <button
                onClick={() => go("home")}
                className="group flex items-center justify-center cursor-pointer shrink-0 w-[85px] sm:w-[95px] h-[36px] sm:h-[40px] overflow-hidden relative"
                aria-label="Buzzwork home"
              >
                {!logoFailed ? (
                  <img
                    src="/assets/logos/logo_header.png"
                    alt="Buzzwork"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[145px] sm:w-[165px] max-w-none h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    onError={() => setLogoFailed(true)}
                  />
                ) : (
                  <span className="font-display text-[20px] sm:text-[24px] font-semibold tracking-tight text-[#141414] dark:text-[#f5f4ef]">
                    Buzzwork
                  </span>
                )}
              </button>
            </div>

            {/* Navigation Links Column */}
            <div 
              className="relative transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hidden md:flex" 
              style={{ gridColumn: 2, justifySelf: "center", transform: "translateX(0)" }}
            >
              <ul className="flex items-center gap-1">
                {NAV.map((item) => (
                  <li key={item.id}>
                    <button
                      id={`nav-link-${item.id}`}
                      onClick={() => go(item.id)}
                      className="group relative rounded-full px-4.5 py-2 text-[13px] font-medium text-[#141414]/70 dark:text-[#f5f4ef]/70 transition-colors hover:text-[#141414] dark:hover:text-[#f5f4ef] cursor-pointer"
                    >
                      {item.label}
                      <span
                        className={[
                          "absolute inset-x-4.5 bottom-0 h-[2px] origin-left bg-[color:var(--color-buzz-yellow)] transition-transform duration-500 ease-out",
                          active === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        ].join(" ")}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA / Theme Toggle / Menu Button Column */}
            <div 
              className="relative flex items-center gap-3 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" 
              style={{ gridColumn: 3, justifySelf: "end", transform: "translateX(0)" }}
            >
              {/* Desktop: Theme Toggle immediately to the left of the rightmost LET'S TALK CTA */}
              <div className="hidden md:flex items-center gap-3">
                <ThemeToggle />
                <button
                  id="nav-lets-talk-cta"
                  onClick={() => go("contact")}
                  className="inline-flex items-center justify-center rounded-full bg-[#141414] hover:bg-black text-white dark:bg-[color:var(--color-buzz-yellow)] dark:text-[#111111] dark:hover:bg-[#f6cd32] px-5 py-2 text-[13px] font-medium shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
                >
                  Let's Talk →
                </button>
              </div>

              {/* Mobile Right Controls: Compact Toggle & Menu Hamburger */}
              <div className="flex md:hidden items-center gap-2">
                <ThemeToggle size="compact" />
                <button
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] dark:border-white/[0.14] bg-black/[0.02] dark:bg-white/[0.06] cursor-pointer hover:bg-black/[0.04] dark:hover:bg-white/[0.10] transition-colors relative z-50 pointer-events-auto"
                  onClick={() => setOpen((v) => !v)}
                  aria-label="Toggle navigation menu"
                >
                  <span className="relative block h-3.5 w-4">
                    <span
                      className={[
                        "absolute left-0 top-1 h-[1.5px] w-4 bg-[#141414] dark:bg-[#f5f4ef] transition-all duration-300",
                        open ? "translate-y-[3px] rotate-45" : "",
                      ].join(" ")}
                    />
                    <span
                      className={[
                        "absolute left-0 top-2.5 h-[1.5px] w-4 bg-[#141414] dark:bg-[#f5f4ef] transition-all duration-300",
                        open ? "-translate-y-[3px] -rotate-45" : "",
                      ].join(" ")}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Premium Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#F5F4F1] dark:bg-[#0b0b0a] z-40 md:hidden flex flex-col justify-between px-6 pt-32 pb-12 transition-colors duration-300"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#141414]/40 dark:text-[#f5f4ef]/40 uppercase">
                  BUZZWORK NAVIGATION
                </span>
                <ThemeToggle size="compact" />
              </div>
              <ul className="flex flex-col">
                {NAV.map((item, idx) => (
                  <motion.li
                    key={`mobile-menu-${item.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                  >
                    <button
                      onClick={() => go(item.id)}
                      className="w-full text-left font-display text-[32px] font-medium tracking-tight text-[#141414] dark:text-[#f5f4ef] py-3.5 border-b border-black/[0.06] dark:border-white/[0.08] cursor-pointer hover:text-[color:var(--color-buzz-yellow)] transition-colors"
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="w-full flex flex-col gap-4"
            >
              <button
                onClick={() => go("contact")}
                className="w-full inline-flex items-center justify-center rounded-full bg-[#141414] hover:bg-black text-white dark:bg-[color:var(--color-buzz-yellow)] dark:text-[#111111] dark:hover:bg-[#f6cd32] py-4 text-[15px] font-medium shadow-sm transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                Lets Talk →
              </button>
              <span className="text-center text-[11px] text-[#141414]/45 dark:text-[#f5f4ef]/45 font-mono">
                BUZZWORK © 2026. ALL RIGHTS RESERVED
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

