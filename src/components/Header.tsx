import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { chapters, PDF } from "@/content";
import { useActiveSection } from "@/lib/hooks";
import { usePageScroll } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const ids = chapters.map((c) => c.id);

function PdfIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M7 1.5v8M3.5 6.5 7 10l3.5-3.5M2 12.5h10" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const active = useActiveSection(ids);
  const { scrollTo, stop, start } = usePageScroll();
  const { scrollY } = useScroll();
  const firstLink = useRef<HTMLAnchorElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  // Transparent over the cover, white once the page itself begins.
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > window.innerHeight - 90));

  useEffect(() => {
    if (!open) return;
    stop();
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => firstLink.current?.focus(), 350);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      start();
      document.documentElement.style.overflow = "";
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      toggle.current?.focus({ preventScroll: true });
    };
  }, [open, stop, start]);

  const go = (target: string | number) => {
    if (open) {
      setOpen(false);
      window.setTimeout(() => scrollTo(target), 60);
    } else {
      scrollTo(target);
    }
  };

  return (
    <>
      <ScrollProgress className="fixed inset-x-0 top-0 z-[63] h-[2px] origin-left bg-mangaan" springOptions={{ stiffness: 180, damping: 40 }} />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[62] transition-[background-color,box-shadow,color] duration-500",
          open ? "text-strooi" : "text-mangaan",
          solid && !open ? "bg-papier/92 shadow-[0_1px_0_rgba(46,42,41,0.1)] backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="marge flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
          <a
            href="#omslag"
            onClick={(e) => {
              e.preventDefault();
              go(0);
            }}
            className="-mx-2 flex h-11 items-center gap-2.5 px-2"
          >
            <span className="text-[1.0625rem] font-[520] tracking-[-0.012em]">Zeno Hodes</span>
            <span className="noot translate-y-[0.04em] text-[1.0625rem] opacity-70 max-xs:hidden">portfolio</span>
          </a>

          <nav aria-label="Hoofdmenu" className="max-lg:hidden">
            <ul className="flex items-center">
              {chapters.map((c) => {
                const here = active === c.id;
                return (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(`#${c.id}`);
                      }}
                      aria-current={here ? "location" : undefined}
                      className={cn(
                        "relative flex h-11 items-center px-3 text-[0.9375rem] transition-opacity duration-300 xl:px-3.5",
                        active && !here ? "opacity-55 hover:opacity-100" : "opacity-100",
                      )}
                    >
                      {c.kort}
                      {here && (
                        <motion.span
                          layoutId="nav-streep"
                          aria-hidden="true"
                          className="absolute inset-x-3 bottom-[9px] h-px bg-current xl:inset-x-3.5"
                          transition={{ type: "spring", bounce: 0.12, duration: 0.5 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
              <li className="ml-4">
                <a
                  href={PDF.href}
                  download={PDF.bestand}
                  className="flex h-10 items-center justify-center gap-2 rounded-full border border-current/30 px-4 text-[0.9375rem] transition-colors duration-300 hover:border-current hover:bg-mangaan hover:text-papier"
                >
                  <span>PDF</span>
                  <PdfIcon />
                </a>
              </li>
            </ul>
          </nav>

          <button
            ref={toggle}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu"
            className="-mr-2 flex h-11 items-center justify-center gap-3 px-2 text-[0.9375rem] lg:hidden"
          >
            <span>{open ? "Sluiten" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-[11px] w-6">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500 ease-uit",
                  open && "translate-y-[5px] rotate-[22deg]",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500 ease-uit",
                  open && "-translate-y-[5px] -rotate-[22deg]",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu"
            aria-label="Menu"
            data-lenis-prevent
            className="fixed inset-0 z-[61] overflow-y-auto bg-mangaan text-strooi"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="marge flex min-h-full flex-col pb-10 pt-24 sm:pt-28">
              <ol className="my-auto">
                {chapters.map((c, i) => (
                  <motion.li
                    key={c.id}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="border-t border-strooi/20 last:border-b"
                  >
                    <a
                      ref={i === 0 ? firstLink : undefined}
                      href={`#${c.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(`#${c.id}`);
                      }}
                      aria-current={active === c.id ? "location" : undefined}
                      className="group flex min-h-16 items-center gap-5 py-3 sm:gap-10"
                    >
                      <span className="cijfer w-7 shrink-0 text-[0.8125rem] font-[500] text-strooi/55">{c.nr}</span>
                      <span className="text-[clamp(1.45rem,4.4vw,3.2rem)] font-[330] leading-[1.08] tracking-[-0.03em] transition-[translate,color] duration-500 ease-uit [font-stretch:106%] group-hover:translate-x-2 group-hover:text-papier">
                        {c.index}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ol>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                <a
                  href={PDF.href}
                  download={PDF.bestand}
                  className="flex h-11 items-center justify-center gap-2.5 rounded-full border border-strooi/35 px-5 text-[0.9375rem]"
                >
                  <span>{PDF.label}</span>
                  <PdfIcon />
                </a>
                <button
                  type="button"
                  onClick={() => go(0)}
                  className="flex h-11 items-center justify-center rounded-full px-5 text-[0.9375rem] text-strooi/75 max-sm:px-1"
                >
                  Terug naar het begin
                </button>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
