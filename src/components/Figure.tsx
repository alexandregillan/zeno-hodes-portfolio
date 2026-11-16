import { useEffect, useRef, type ReactNode } from "react";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";
import { Unveil } from "@/components/Reveal";
import { Img, meta, src } from "@/lib/img";
import { usePageScroll } from "@/lib/scroll";
import { cn } from "@/lib/utils";

type FigureProps = {
  name: string;
  alt: string;
  caption?: ReactNode;
  className?: string;
  imgClassName?: string;
  /** Opens a larger view on click. Pass another image name to load a finer version there. */
  zoom?: boolean | string;
  /** Smallest width the enlarged view is shown at (it scrolls when the window is narrower). */
  zoomWidth?: number;
  delay?: number;
  unveil?: boolean;
  eager?: boolean;
};

/** Locks the page behind the open sheet and lets the mouse drag the drawing around. */
function Pan({ children, wide }: { children: ReactNode; wide: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { stop, start } = usePageScroll();
  useEffect(() => {
    stop();
    return start;
  }, [stop, start]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false;
    let x = 0;
    let y = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      x = e.clientX;
      y = e.clientY;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft -= e.clientX - x;
      el.scrollTop -= e.clientY - y;
      x = e.clientX;
      y = e.clientY;
    };
    const onUp = () => {
      down = false;
      el.style.cursor = "";
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-lenis-prevent
      className={cn("max-h-[100svh] max-w-[100vw] overflow-auto overscroll-contain", wide && "cursor-grab")}
    >
      {children}
    </div>
  );
}

function Zoomable({
  name,
  zoomName,
  zoomWidth,
  alt,
  imgClassName,
}: {
  name: string;
  zoomName: string;
  zoomWidth: number;
  alt: string;
  imgClassName?: string;
}) {
  const big = meta(zoomName);
  const r = (big.w / big.h).toFixed(4);
  // Fit the sheet in the window, but never show it smaller than zoomWidth: on a phone
  // the drawing then extends past the screen and can be dragged around.
  const width = `max(min(${big.w}px, 96vw, calc(92svh * ${r})), min(${big.w}px, ${zoomWidth}px))`;
  return (
    <MorphingDialog transition={{ type: "spring", bounce: 0, duration: 0.55 }}>
      <MorphingDialogTrigger label={`Vergroot: ${alt}`} className="group block w-full cursor-zoom-in text-left">
        <MorphingDialogImage
          src={src(name)}
          alt={alt}
          className={cn("block h-auto w-full", imgClassName)}
          style={{ aspectRatio: `${meta(name).w} / ${meta(name).h}` }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-papier/90 text-mangaan opacity-0 shadow-[0_0_0_1px_rgba(46,42,41,0.12)] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M7.5 2v11M2 7.5h11" />
          </svg>
        </span>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative bg-papier shadow-[0_0_0_1px_rgba(46,42,41,0.08)]">
          <Pan wide>
            <MorphingDialogImage
              src={src(zoomName)}
              alt={alt}
              className="block h-auto max-w-none"
              style={{ width, aspectRatio: `${big.w} / ${big.h}` }}
            />
          </Pan>
          <MorphingDialogClose
            className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-mangaan text-papier"
            variants={{ initial: { opacity: 0 }, animate: { opacity: 1, transition: { delay: 0.25 } }, exit: { opacity: 0 } }}
          />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}

export function Figure({ name, alt, caption, className, imgClassName, zoom, zoomWidth = 900, delay, unveil = true, eager }: FigureProps) {
  const body = zoom ? (
    <Zoomable name={name} zoomName={typeof zoom === "string" ? zoom : name} zoomWidth={zoomWidth} alt={alt} imgClassName={imgClassName} />
  ) : (
    <Img name={name} alt={alt} eager={eager} className={cn("w-full", imgClassName)} />
  );
  return (
    <figure className={className}>
      {unveil ? <Unveil delay={delay}>{body}</Unveil> : body}
      {caption && <figcaption className="bijschrift mt-2.5">{caption}</figcaption>}
    </figure>
  );
}
