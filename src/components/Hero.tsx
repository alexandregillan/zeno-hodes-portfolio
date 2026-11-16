import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import VerticalCutReveal from "@/components/ui/vertical-cut-reveal";
import { buildPlaza, type Planter } from "@/components/plaza";
import { useSize } from "@/lib/hooks";
import { prefersReducedMotion, usePageScroll } from "@/lib/scroll";

const GROEN = "#748262";
const GROEN_RAND = "#7b8566";
const GROEN_DIEP = "#66725a";
const HOUT = "#c2975b";
const INKT = "#2e2a29";

/** One planter seen from above, after the top views on the "ontwerp plantenbakken" sheet. */
function PlanterTop({ p }: { p: Planter }) {
  const { r } = p;
  const slats = (n: number, r0: number, r1: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2;
      const c = Math.cos(a);
      const s = Math.sin(a);
      return `M${(c * r0).toFixed(1)} ${(s * r0).toFixed(1)}L${(c * r1).toFixed(1)} ${(s * r1).toFixed(1)}`;
    }).join("");

  if (p.id === "1m") {
    return (
      <g>
        <circle r={r} fill={GROEN} />
        <circle r={r * 0.9} fill="none" stroke={INKT} strokeOpacity={0.16} strokeWidth={1} />
      </g>
    );
  }
  if (p.id === "2m") {
    return (
      <g>
        <circle r={r} fill={HOUT} />
        <path d={slats(46, r * 0.2, r * 0.985)} stroke="#6b4a1f" strokeOpacity={0.42} strokeWidth={0.9} fill="none" />
        <circle r={r} fill="none" stroke="#6b4a1f" strokeOpacity={0.5} strokeWidth={1} />
        <circle r={r * 0.19} fill={GROEN_DIEP} />
      </g>
    );
  }
  return (
    <g>
      <circle r={r} fill={HOUT} />
      <path d={slats(88, r * 0.8, r * 0.99)} stroke="#6b4a1f" strokeOpacity={0.42} strokeWidth={0.9} fill="none" />
      <circle r={r} fill="none" stroke="#6b4a1f" strokeOpacity={0.5} strokeWidth={1} />
      <circle r={r * 0.8} fill={GROEN_RAND} />
      <circle r={r * 0.8} fill="none" stroke={INKT} strokeOpacity={0.28} strokeWidth={1} />
      <circle r={r * 0.7} fill={GROEN} />
      <circle r={r * 0.7} fill="none" stroke={INKT} strokeOpacity={0.3} strokeWidth={1} />
      {/* meerstammige bomen in groepen van drie */}
      {[90, 210, 330].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return <circle key={deg} cx={Math.cos(a) * r * 0.3} cy={Math.sin(a) * r * 0.3} r={Math.max(2.4, r * 0.022)} fill="#3f4a35" />;
      })}
    </g>
  );
}

function Shadow({ p, k, sx, sy }: { p: Planter; k: number; sx: MotionValue<number>; sy: MotionValue<number> }) {
  const x2 = useTransform(sx, (v) => p.cx + v * p.hoogte * k);
  const y2 = useTransform(sy, (v) => p.cy + v * p.hoogte * k);
  return (
    <motion.line
      x1={p.cx}
      y1={p.cy}
      x2={x2}
      y2={y2}
      stroke={INKT}
      strokeOpacity={0.24}
      strokeWidth={p.r * 2}
      strokeLinecap="round"
    />
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const size = useSize(ref);
  const { scrollTo } = usePageScroll();
  const [zone, setZone] = useState<{ top: number; right: number } | null>(null);
  const [ready, setReady] = useState(false);
  const reduced = useMemo(prefersReducedMotion, []);

  // Wait for the type before drawing: the floor leaves a clearing for the name.
  useEffect(() => {
    let alive = true;
    const go = () => alive && setReady(true);
    const t = window.setTimeout(go, 900);
    document.fonts?.ready.then(go);
    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, []);

  useLayoutEffect(() => {
    const hero = ref.current;
    const title = titleRef.current;
    if (!hero || !title || !ready) return;
    const hr = hero.getBoundingClientRect();
    const tr = title.getBoundingClientRect();
    setZone({ top: tr.top - hr.top, right: tr.right - hr.left });
  }, [ready, size.w, size.h]);

  const plaza = useMemo(
    () => (zone && size.w > 0 ? buildPlaza(size.w, size.h, { titleTop: zone.top, titleRight: zone.right }) : null),
    [size.w, size.h, zone?.top, zone?.right],
  );

  // The sun. Its position on the ground follows the pointer; every planter throws
  // a shadow away from it, as long as the planter is tall.
  const sunX = useMotionValue(reduced ? 0.66 : 2.4);
  const sunY = useMotionValue(reduced ? 0.5 : 1.7);
  const smoothX = useSpring(sunX, { stiffness: 55, damping: 18, mass: 0.9 });
  const smoothY = useSpring(sunY, { stiffness: 55, damping: 18, mass: 0.9 });
  const pointerActive = useRef(false);

  useEffect(() => {
    if (!plaza || reduced) return;
    const a = animate(sunX, 0.66, { duration: 2.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 });
    const b = animate(sunY, 0.5, { duration: 2.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 });
    return () => {
      a.stop();
      b.stop();
    };
  }, [!!plaza, reduced]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || reduced || !size.w) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (r.left + r.width / 2 - e.clientX) / (r.width / 2);
    const ny = (r.top + r.height / 2 - e.clientY) / (r.height / 2);
    pointerActive.current = true;
    sunX.set(Math.max(-1.7, Math.min(1.7, nx * 1.25)));
    sunY.set(Math.max(-1.7, Math.min(1.7, ny * 1.25)));
  };

  // Scrolling on is the end of the day: the shadows grow long as the plaza leaves.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const dusk = useTransform(scrollYProgress, [0, 1], [1, 3.2]);
  const sx = useTransform([smoothX, dusk] as MotionValue<number>[], ([v, d]: number[]) => v * d);
  const sy = useTransform([smoothY, dusk] as MotionValue<number>[], ([v, d]: number[]) => v * d);
  const drift = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -70]);
  const titleDrift = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 110]);

  return (
    <header
      ref={ref}
      id="omslag"
      onPointerMove={onPointerMove}
      className="vloer relative isolate h-[100svh] min-h-[38rem] w-full overflow-hidden"
    >
      {plaza && (
        <motion.svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${plaza.w} ${plaza.h}`}
          preserveAspectRatio="none"
          style={{ y: drift }}
        >
          <defs>
            <filter id="schaduw" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation={Math.max(3, plaza.k * 0.055)} />
            </filter>
          </defs>

          <g stroke={INKT} strokeOpacity={0.2} strokeWidth={1} fill="none">
            {plaza.goten.map((g, i) => (
              <line key={`g${i}`} x1={g.x} x2={g.x} y1={g.y0} y2={g.y1} />
            ))}
            {plaza.voegen.map((y, i) => (
              <line key={`v${i}`} x1={0} x2={plaza.w} y1={y} y2={y} strokeDasharray="1 5" strokeOpacity={0.4} />
            ))}
          </g>

          <g stroke={INKT} strokeWidth={plaza.baan} strokeLinecap="round" fill="none" className="banen">
            {plaza.bands.map((b, i) => (
              <path
                key={i}
                d={b.d}
                pathLength={1}
                style={{ animationDelay: `${b.delay}s`, animationDuration: `${b.duur}s` }}
              />
            ))}
          </g>

          <g filter="url(#schaduw)">
            {plaza.planters.map((p) => (
              <Shadow key={p.id} p={p} k={plaza.k} sx={sx} sy={sy} />
            ))}
          </g>

          {plaza.planters.map((p, i) => (
            <motion.g
              key={p.id}
              initial={reduced ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.9 + i * 0.16, ease: [0.16, 1, 0.3, 1] }}
              style={{ x: p.cx, y: p.cy, transformBox: "fill-box", transformOrigin: "center" }}
            >
              <PlanterTop p={p} />
            </motion.g>
          ))}
        </motion.svg>
      )}

      <motion.div style={{ y: titleDrift }} className="marge absolute inset-x-0 bottom-0 pb-8 sm:pb-11">
        <div ref={titleRef} className="inline-block pr-2">
          <h1 className="kop-xl text-[clamp(4.6rem,24.5vw,8.6rem)] text-mangaan sm:text-[clamp(6rem,13.4vw,14.5rem)]">
            {ready ? (
              <VerticalCutReveal
                splitBy="characters"
                staggerDuration={0.045}
                staggerFrom="first"
                transition={{ type: "spring", stiffness: 170, damping: 24, delay: reduced ? 0 : 0.55 }}
                containerClassName="max-sm:flex-col"
                wordLevelClassName="pb-[0.12em] -mb-[0.12em]"
              >
                Zeno Hodes
              </VerticalCutReveal>
            ) : (
              <span className="invisible">Zeno Hodes</span>
            )}
          </h1>
        </div>
        <div className="mt-5 flex items-end justify-between gap-6 sm:mt-7">
          <p className="bijschrift max-w-[15rem] !text-mangaan/75 sm:max-w-none">
            vloerpatroon en plantenbakken, naar het ontwerp voor de Turfhaven
          </p>
          <button
            type="button"
            onClick={() => scrollTo("#inhoud")}
            className="spatie group -m-3 flex min-h-11 shrink-0 items-center justify-center gap-3 p-3 text-mangaan"
          >
            <span>inhoud</span>
            <span aria-hidden="true" className="relative block h-9 w-px overflow-hidden bg-mangaan/25">
              <span className="loper absolute inset-x-0 top-0 h-full bg-mangaan" />
            </span>
          </button>
        </div>
      </motion.div>
    </header>
  );
}
