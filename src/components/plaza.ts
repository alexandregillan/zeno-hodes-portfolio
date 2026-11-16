// A small piece of plaza, drawn in plan: the Turfhaven floor from the portfolio
// (bands in a mangaan colour that run in parallel lanes and merge with a soft
// S-curve) and the family of round planters (Ø 1, 2 and 3 m) that stand on it.
// Everything is generated for the viewport it is shown in, from a fixed seed,
// so it is the same drawing on every visit.

export type Planter = {
  id: "1m" | "2m" | "3m";
  cx: number;
  cy: number;
  r: number;
  /** Height above the floor in metres; it sets the length of the shadow. */
  hoogte: number;
  label: string;
};

export type Band = { d: string; delay: number; duur: number };

export type Plaza = {
  w: number;
  h: number;
  /** Pixels per metre. */
  k: number;
  baan: number;
  bands: Band[];
  planters: Planter[];
  voegen: number[];
  goten: { x: number; y0: number; y1: number }[];
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const f = (n: number) => Math.round(n * 10) / 10;

type Rect = { x0: number; y0: number; x1: number; y1: number };
type Seg = { y0: number; y1: number };

/** Remove the part of a vertical segment at x that falls inside a keep-clear shape. */
function cut(segs: Seg[], lo: number, hi: number): Seg[] {
  const out: Seg[] = [];
  for (const s of segs) {
    if (hi <= s.y0 || lo >= s.y1) {
      out.push(s);
      continue;
    }
    if (lo > s.y0) out.push({ y0: s.y0, y1: lo });
    if (hi < s.y1) out.push({ y0: hi, y1: s.y1 });
  }
  return out;
}

export function buildPlaza(w: number, h: number, opts: { titleTop: number; titleRight: number }): Plaza {
  const rnd = mulberry32(19970123);
  const portrait = w < 760;

  const k = portrait ? clamp(w * 0.168, 52, 78) : clamp(Math.min(w * 0.074, h * 0.118), 66, 124);
  const pitch = portrait ? clamp(w / 18.5, 17, 23) : clamp(w / 58, 20, 29);
  const baan = Math.round(pitch * 0.32 * 2) / 2;

  const planters: Planter[] = portrait
    ? [
        { id: "2m", cx: w * 0.285, cy: h * 0.215, r: k, hoogte: 0.5, label: "Ø 2 m" },
        { id: "3m", cx: w * 0.615, cy: h * 0.405, r: 1.5 * k, hoogte: 1.1, label: "Ø 3 m" },
        { id: "1m", cx: w * 0.2, cy: h * 0.5, r: 0.5 * k, hoogte: 0.45, label: "Ø 1 m" },
      ]
    : [
        { id: "2m", cx: w * 0.512, cy: h * 0.255, r: k, hoogte: 0.5, label: "Ø 2 m" },
        { id: "3m", cx: w * 0.735, cy: h * 0.415, r: 1.5 * k, hoogte: 1.1, label: "Ø 3 m" },
        { id: "1m", cx: w * 0.578, cy: h * 0.6, r: 0.5 * k, hoogte: 0.45, label: "Ø 1 m" },
      ];

  // Places the bands stay out of: the title, and the two corners that carry a label.
  const vrij: Rect[] = [
    { x0: -10, y0: opts.titleTop - pitch * 1.6, x1: opts.titleRight + pitch, y1: h + 10 },
    { x0: -10, y0: -10, x1: portrait ? w * 0.62 : 300, y1: portrait ? 78 : 92 },
    { x0: w - (portrait ? 110 : 170), y0: -10, x1: w + 10, y1: portrait ? 78 : 92 },
    { x0: w - (portrait ? 130 : 200), y0: h - (portrait ? 100 : 130), x1: w + 10, y1: h + 10 },
  ];

  const lanes = Math.ceil(w / pitch) + 1;
  const xOf = (i: number) => (i + 0.5) * pitch - (lanes * pitch - w) / 2;

  // Lanes are laid in fields, with an open lane between two fields.
  const veld: number[] = new Array(lanes).fill(-1);
  const goten: Plaza["goten"] = [];
  let i = 0;
  let v = 0;
  while (i < lanes) {
    const size = 4 + Math.floor(rnd() * 6);
    for (let j = 0; j < size && i < lanes; j++, i++) veld[i] = v;
    if (i < lanes) {
      goten.push({ x: xOf(i), y0: -10, y1: h + 10 });
      i++;
    }
    v++;
  }

  const segsByLane: Seg[][] = [];
  const phase = rnd() * 6;
  for (let l = 0; l < lanes; l++) {
    if (veld[l] < 0 || rnd() < 0.1) {
      segsByLane.push([]);
      continue;
    }
    const x = xOf(l);
    const wave = Math.sin(l * 0.83 + phase) * 0.5 + 0.5;
    const top = rnd() < 0.62 ? -40 : h * (0.03 + 0.2 * rnd() * wave);
    const bottom = rnd() < 0.55 ? h + 40 : h * (0.74 + 0.22 * rnd());
    let segs: Seg[] = [{ y0: top, y1: bottom }];

    // An interruption or two along the lane, as on the plan.
    const breaks = rnd() < 0.5 ? 1 : rnd() < 0.18 ? 2 : 0;
    for (let b = 0; b < breaks; b++) {
      const at = h * (0.15 + 0.7 * rnd());
      const gap = pitch * (1.4 + 2.8 * rnd());
      segs = cut(segs, at, at + gap);
    }

    for (const r of vrij) {
      if (x > r.x0 && x < r.x1) segs = cut(segs, r.y0 - rnd() * pitch * 2.6, r.y1 + rnd() * pitch * 1.8);
    }
    for (const p of planters) {
      const R = p.r + pitch * 1.15;
      const dx = Math.abs(x - p.cx);
      if (dx < R) {
        const dy = Math.sqrt(R * R - dx * dx);
        segs = cut(segs, p.cy - dy - rnd() * pitch * 0.8, p.cy + dy + rnd() * pitch * 0.8);
      }
    }
    segsByLane.push(segs.filter((s) => s.y1 - s.y0 > pitch * 1.2));
  }

  const nearPlanter = (x: number, y: number, pad: number) =>
    planters.some((p) => Math.hypot(x - p.cx, y - p.cy) < p.r + pad);
  const inVrij = (x: number, y: number) => vrij.some((r) => x > r.x0 && x < r.x1 && y > r.y0 && y < r.y1);
  const covers = (lane: number, y: number) => segsByLane[lane]?.some((s) => s.y0 <= y && s.y1 >= y) ?? false;

  const bands: Band[] = [];
  const L = pitch * 3.1;
  // Where curves already run, per lane, so two never cross or touch.
  const curved: Seg[][] = Array.from({ length: lanes }, () => []);
  const clearOf = (lane: number, y0: number, y1: number) =>
    !curved[lane].some((c) => c.y0 < y1 + L && c.y1 > y0 - L);
  const claim = (a: number, b: number, y0: number, y1: number) => {
    curved[a].push({ y0, y1 });
    curved[b].push({ y0, y1 });
  };

  for (let l = 0; l < lanes; l++) {
    const x = xOf(l);
    for (const s of segsByLane[l]) {
      let d = `M${f(x)} ${f(s.y0)}V${f(s.y1)}`;
      const free = (y: number) => !nearPlanter(x, y, pitch * 1.7) && !inVrij(x, y);

      // A band that starts mid-floor may branch off its neighbour with an S-curve...
      if (s.y0 > pitch && rnd() < 0.3) {
        const n = l + (rnd() < 0.5 ? -1 : 1);
        if (
          n >= 0 &&
          n < lanes &&
          veld[n] === veld[l] &&
          covers(n, s.y0 - L) &&
          covers(n, s.y0 - L / 2) &&
          free(s.y0 - L / 2) &&
          clearOf(l, s.y0 - L, s.y0) &&
          clearOf(n, s.y0 - L, s.y0)
        ) {
          claim(l, n, s.y0 - L, s.y0);
          const xn = xOf(n);
          d = `M${f(xn)} ${f(s.y0 - L)}C${f(xn)} ${f(s.y0 - L * 0.45)} ${f(x)} ${f(s.y0 - L * 0.55)} ${f(x)} ${f(s.y0)}V${f(s.y1)}`;
        }
      }
      // ...and one that ends beside a longer neighbour may join it the same way.
      if (s.y1 < h - pitch && rnd() < 0.36) {
        const n = l + (rnd() < 0.5 ? -1 : 1);
        const yEnd = s.y1 + L;
        if (
          n >= 0 &&
          n < lanes &&
          veld[n] === veld[l] &&
          covers(n, yEnd) &&
          covers(n, s.y1 + L / 2) &&
          free(s.y1 + L / 2) &&
          clearOf(l, s.y1, yEnd) &&
          clearOf(n, s.y1, yEnd)
        ) {
          claim(l, n, s.y1, yEnd);
          const xn = xOf(n);
          d += `C${f(x)} ${f(s.y1 + L * 0.55)} ${f(xn)} ${f(s.y1 + L * 0.45)} ${f(xn)} ${f(yEnd)}`;
        }
      }
      bands.push({ d, delay: 0.1 + (l / lanes) * 0.55 + rnd() * 0.35, duur: 1.3 + rnd() * 0.7 });
    }
  }

  const voegen = portrait ? [h * 0.31, h * 0.63] : [h * 0.5];

  return { w, h, k, baan, bands, planters, voegen, goten };
}
