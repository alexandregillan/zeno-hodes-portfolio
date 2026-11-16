import { animate, useInView, useTransform, motion, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from "@/components/ui/image-comparison";
import { meta, src } from "@/lib/img";
import { prefersReducedMotion } from "@/lib/scroll";

/**
 * The same street in two phases. Drag the line: left of it is the first
 * phase (temporary layout), right of it the second (the redesign).
 */
export function Compare({
  before,
  after,
  beforeLabel,
  afterLabel,
  label,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  label: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { once: true, amount: 0.55 });
  const [pos, setPos] = useState<MotionValue<number> | null>(null);
  const m = meta(before);

  // Show once that the line can be moved.
  useEffect(() => {
    if (!inView || !pos || prefersReducedMotion()) return;
    const c = animate(pos, [50, 68, 34, 50], { duration: 2.2, ease: [0.65, 0, 0.35, 1], delay: 0.35 });
    return () => c.stop();
  }, [inView, pos]);

  return (
    <div ref={wrap}>
      <ImageComparison
        className="w-full cursor-ew-resize bg-strooi-licht"
        label={label}
        onPosition={setPos}
        springOptions={{ bounce: 0, duration: 0 }}
      >
        <div style={{ aspectRatio: `${m.w} / ${m.h}` }} />
        <ImageComparisonImage src={src(before)} alt={beforeLabel} position="left" />
        <ImageComparisonImage src={src(after)} alt={afterLabel} position="right" />
        {pos && <Tags pos={pos} />}
        <ImageComparisonSlider className="w-px -translate-x-1/2 bg-papier">
          <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-papier text-mangaan shadow-[0_1px_10px_rgba(46,42,41,0.28)]">
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M6 1 1 6l5 5M14 1l5 5-5 5" />
            </svg>
          </span>
        </ImageComparisonSlider>
      </ImageComparison>
      <div className="bijschrift mt-2.5 flex justify-between gap-6">
        <span>{beforeLabel}</span>
        <span className="text-right">{afterLabel}</span>
      </div>
    </div>
  );
}

function Tags({ pos }: { pos: MotionValue<number> }) {
  const left = useTransform(pos, [6, 22], [0, 1]);
  const right = useTransform(pos, [78, 94], [1, 0]);
  const tag = "spatie pointer-events-none absolute bottom-3 bg-papier/92 px-2.5 py-1.5 text-mangaan";
  return (
    <>
      <motion.span aria-hidden="true" style={{ opacity: left }} className={`${tag} left-3`}>
        fase 1
      </motion.span>
      <motion.span aria-hidden="true" style={{ opacity: right }} className={`${tag} right-3`}>
        fase 2
      </motion.span>
    </>
  );
}
