// After Magic UI's Text Reveal (https://21st.dev/@magicui/components/text-reveal, MIT):
// each word comes into ink as the paragraph travels up the screen. Unlike the original
// it does not pin the page; the text simply reads itself in while you scroll past.
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useMemo, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function ScrollWords({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.86", "end 0.52"] });
  const reduced = useMemo(prefersReducedMotion, []);
  const words = children.split(" ");

  if (reduced) return <p className={className}>{children}</p>;
  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      <span className="sr-only">{children}</span>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 2.2 / words.length);
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, progress, range }: { children: ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span aria-hidden="true" style={{ opacity }} className="mr-[0.26em]">
      {children}
    </motion.span>
  );
}
