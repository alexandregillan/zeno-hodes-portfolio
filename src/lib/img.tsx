import manifest from "@/assets/manifest.json";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

type Entry = { w: number; h: number };
const M = manifest as Record<string, Entry>;

export function meta(name: string): Entry {
  const e = M[name];
  if (!e) throw new Error(`Unknown image: ${name}`);
  return e;
}

// Relative, so the site works from any folder or host.
export const src = (name: string) => `img/${name}.webp`;
export const ratio = (name: string) => meta(name).w / meta(name).h;

type ImgProps = {
  name: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  eager?: boolean;
  draggable?: boolean;
};

/** An image from the portfolio, with its intrinsic size so the layout never jumps. */
export function Img({ name, alt, className, style, eager, draggable = false }: ImgProps) {
  const { w, h } = meta(name);
  return (
    <img
      src={src(name)}
      width={w}
      height={h}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={draggable}
      className={cn("block h-auto max-w-full", className)}
      style={style}
    />
  );
}
