import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";

type Ctx = {
  scrollTo: (target: string | number, opts?: { immediate?: boolean }) => void;
  stop: () => void;
  start: () => void;
};

const ScrollContext = createContext<Ctx>({ scrollTo: () => {}, stop: () => {}, start: () => {} });

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, anchors: false });
    lenisRef.current = lenis;
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback<Ctx["scrollTo"]>((target, opts) => {
    const lenis = lenisRef.current;
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : null;
    if (typeof target === "string" && !el) return;
    if (lenis) {
      lenis.scrollTo(el ?? (target as number), { offset: 0, immediate: opts?.immediate, duration: 1.4 });
    } else if (el) {
      el.scrollIntoView({ behavior: "auto", block: "start" });
    } else {
      window.scrollTo(0, target as number);
    }
  }, []);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  return <ScrollContext.Provider value={{ scrollTo, stop, start }}>{children}</ScrollContext.Provider>;
}

export const usePageScroll = () => useContext(ScrollContext);
