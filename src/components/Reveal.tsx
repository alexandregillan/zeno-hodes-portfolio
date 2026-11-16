import { motion, useInView } from "motion/react";
import { useEffect, useMemo, useRef, type CSSProperties, type ReactNode } from "react";
import VerticalCutReveal, { type VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal";
import { prefersReducedMotion } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/** A heading whose words rise out of the line they stand on, once, when it scrolls into view. */
export function RisingText({ children, className, delay = 0 }: { children: string; className?: string; delay?: number }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const api = useRef<VerticalCutRevealRef>(null);
  const inView = useInView(wrap, { once: true, margin: "0px 0px -12% 0px" });
  const reduced = useMemo(prefersReducedMotion, []);

  useEffect(() => {
    if (inView) api.current?.startAnimation();
  }, [inView]);

  if (reduced) return <span className={className}>{children}</span>;
  return (
    <span ref={wrap} className={cn("block", className)}>
      <VerticalCutReveal
        ref={api}
        autoStart={false}
        splitBy="words"
        staggerDuration={0.055}
        transition={{ type: "spring", stiffness: 160, damping: 24, delay }}
        wordLevelClassName="pb-[0.16em] -mb-[0.16em] pt-[0.06em] -mt-[0.06em]"
      >
        {children}
      </VerticalCutReveal>
    </span>
  );
}

/** A hairline that is drawn from left to right when it enters. */
export function Rule({ className }: { className?: string }) {
  const reduced = useMemo(prefersReducedMotion, []);
  return (
    <motion.span
      aria-hidden="true"
      className={cn("block h-px w-full origin-left bg-mangaan", className)}
      initial={reduced ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

/** Uncovers its content from the top edge down, like lifting a sheet. Runs once. */
export function Unveil({
  children,
  className,
  delay = 0,
  from = "top",
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "top" | "left";
  style?: CSSProperties;
}) {
  const reduced = useMemo(prefersReducedMotion, []);
  if (reduced)
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  const hidden = from === "top" ? "inset(0% 0% 100% 0%)" : "inset(0% 100% 0% 0%)";
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.15, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}
