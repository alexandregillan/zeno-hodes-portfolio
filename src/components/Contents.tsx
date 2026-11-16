import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Cursor } from "@/components/ui/cursor";
import { RisingText } from "@/components/Reveal";
import { chapters } from "@/content";
import { Img, src } from "@/lib/img";
import { useMediaQuery } from "@/lib/hooks";
import { usePageScroll } from "@/lib/scroll";

/** The contents page. With a mouse, a picture of each chapter travels along with the pointer. */
export function Contents() {
  const [hover, setHover] = useState<string | null>(null);
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const { scrollTo } = usePageScroll();
  const preview = chapters.find((c) => c.id === hover)?.preview;

  return (
    <section id="inhoud" aria-labelledby="inhoud-kop" className="marge pb-[clamp(3rem,7vw,6rem)] pt-[clamp(4.5rem,10vw,9rem)]">
      <div className="raster">
        <h2 id="inhoud-kop" className="ondertitel col-span-12 !text-mangaan md:col-span-2">
          <RisingText>Inhoud</RisingText>
        </h2>
        <ol className="relative col-span-12 mt-8 md:col-span-10 md:mt-0" onMouseLeave={() => setHover(null)}>
          {fine && (
            <Cursor
              attachToParent
              className="z-40"
              springConfig={{ stiffness: 260, damping: 30, mass: 0.6 }}
              variants={{ initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 } }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative h-[11.25rem] w-[15rem] translate-x-[56%] translate-y-[66%] overflow-hidden bg-strooi-licht shadow-[0_18px_50px_-18px_rgba(46,42,41,0.45)]">
                <AnimatePresence>
                  {preview && (
                    <motion.img
                      key={preview}
                      src={src(preview)}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </Cursor>
          )}
          {chapters.map((c) => (
            <li key={c.id} className="border-t border-mangaan/15 last:border-b">
              <a
                href={`#${c.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(`#${c.id}`);
                }}
                onMouseEnter={() => setHover(c.id)}
                onFocus={() => setHover(c.id)}
                className="group flex cursor-pointer items-center gap-5 py-4 sm:gap-10 sm:py-6"
              >
                <span className="cijfer w-8 shrink-0 text-[0.8125rem] font-[500] self-baseline text-grijs">{c.nr}</span>
                <span
                  className={
                    "flex-1 self-baseline text-[clamp(1.35rem,3.5vw,2.9rem)] font-[330] leading-[1.06] tracking-[-0.03em] transition-[translate,opacity] duration-500 ease-uit [font-stretch:106%] group-hover:translate-x-3 " +
                    (hover && hover !== c.id ? "opacity-35" : "opacity-100")
                  }
                >
                  {c.index}
                </span>
                {!fine && (
                  <span className="block h-12 w-16 shrink-0 overflow-hidden bg-strooi-licht">
                    <Img name={c.preview} alt="" className="h-full w-full object-cover" />
                  </span>
                )}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
