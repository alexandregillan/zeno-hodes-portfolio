import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { chapters } from "@/content";
import { useActiveSection } from "@/lib/hooks";
import { usePageScroll } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const ids = chapters.map((c) => c.id);

export function Header() {
  const [open, setOpen] = useState(false);
  const [pastCover, setPastCover] = useState(false);
  const [tucked, setTucked] = useState(false);
  const lastY = useRef(0);
  const active = useActiveSection(ids);
  const current = chapters.find((c) => c.id === active);
  const { scrollTo, stop, start } = usePageScroll();
  const { scrollY } = useScroll();
  const firstLink = useRef<HTMLAnchorElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  // The bar steps aside while reading downwards and comes back as soon as you scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const past = y > window.innerHeight * 0.82;
    setPastCover(past);
    const dy = y - lastY.current;
    if (Math.abs(dy) > 6) {
      setTucked(past && dy > 0);
      lastY.current = y;
    }
  });

  useEffect(() => {
    if (!open) return;
    stop();
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => firstLink.current?.focus(), 350);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      start();
      document.documentElement.style.overflow = "";
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      toggle.current?.focus({ preventScroll: true });
    };
  }, [open, stop, start]);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollTo(`#${id}`), 60);
  };

  return (
    <>
      <ScrollProgress className="fixed z-[62] h-[2px] bg-mangaan" springOptions={{ stiffness: 180, damping: 40 }} />

      {/* White type with difference blending: dark on paper and floor, light over photographs. */}
      <div
        className={cn(
          "marge pointer-events-none fixed inset-x-0 top-0 z-[61] flex h-[4.5rem] items-center justify-between text-white mix-blend-difference transition-transform duration-500 ease-uit sm:h-24",
          tucked && !open && "-translate-y-full",
        )}
      >
        <button
          type="button"
          onClick={() => scrollTo(0)}
          aria-hidden={!pastCover || open}
          tabIndex={pastCover && !open ? 0 : -1}
          className={cn(
            "pointer-events-auto -m-3 flex items-baseline gap-4 p-3 text-left transition-opacity duration-500",
            pastCover && !open ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <span className="text-[1.0625rem] font-[480] tracking-[-0.01em]">Zeno Hodes</span>
          {current && (
            <span className="noot hidden text-[1.0625rem] opacity-80 sm:inline">
              <span className="cijfer not-italic">{current.nr}</span>&ensp;{current.index}
            </span>
          )}
        </button>
        <button
          ref={toggle}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="menu"
          className={cn(
            "spatie pointer-events-auto -m-3 flex items-center gap-3 p-3 transition-opacity duration-500",
            pastCover || open ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          tabIndex={pastCover || open ? 0 : -1}
        >
          <span>{open ? "sluiten" : "inhoud"}</span>
          <span aria-hidden="true" className="relative block h-3 w-6">
            <span className={cn("absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500 ease-uit", open && "translate-y-[5.5px] rotate-[20deg]")} />
            <span className={cn("absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500 ease-uit", open && "-translate-y-[5.5px] -rotate-[20deg]")} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu"
            aria-label="Inhoud"
            data-lenis-prevent
            className="fixed inset-0 z-[60] overflow-y-auto bg-mangaan text-strooi"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
          >
            <ol className="marge flex min-h-full flex-col justify-center pb-10 pt-28">
              {chapters.map((c, i) => (
                <motion.li
                  key={c.id}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.22 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="border-t border-strooi/20 last:border-b"
                >
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={`#${c.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(c.id);
                    }}
                    aria-current={active === c.id ? "true" : undefined}
                    className="group flex items-baseline gap-5 py-4 outline-offset-0 sm:gap-10 sm:py-5"
                  >
                    <span className="cijfer w-8 shrink-0 text-[0.8125rem] font-[500] text-strooi/55">{c.nr}</span>
                    <span className="text-[clamp(1.45rem,4.4vw,3.4rem)] font-[330] leading-[1.05] tracking-[-0.03em] transition-[translate,color] duration-500 ease-uit group-hover:translate-x-3 group-hover:text-papier [font-stretch:106%]">
                      {c.index}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ol>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
