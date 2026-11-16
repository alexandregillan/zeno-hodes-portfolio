import { motion } from "motion/react";
import { useMemo } from "react";
import { SIGNATURE_PATH, SIGNATURE_VIEWBOX } from "@/assets/handtekening-path";
import { ChapterHead } from "@/components/ChapterHead";
import { Figure } from "@/components/Figure";
import { ScrollWords } from "@/components/ScrollWords";
import { overMij } from "@/content";
import { prefersReducedMotion } from "@/lib/scroll";

function Signature() {
  const reduced = useMemo(prefersReducedMotion, []);
  return (
    <motion.svg
      viewBox={SIGNATURE_VIEWBOX}
      role="img"
      aria-label="Handtekening van Zeno Hodes"
      className="h-[5.25rem] w-auto text-mangaan"
      initial={reduced ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
    >
      <path d={SIGNATURE_PATH} fill="currentColor" />
    </motion.svg>
  );
}

export function About() {
  return (
    <section id="over-mij" aria-label="Over mij">
      <ChapterHead nr="00" title="Over mij" />
      <div className="marge raster mt-[clamp(2.5rem,6vw,5.5rem)] gap-y-12">
        <ScrollWords className="col-span-12 text-[clamp(1.55rem,3.7vw,3.35rem)] font-[330] leading-[1.16] tracking-[-0.028em] [font-stretch:104%] md:col-span-10 md:col-start-3">
          {overMij.intro}
        </ScrollWords>

        <Figure
          name="over/portret"
          alt="Zeno Hodes"
          className="col-span-8 col-start-1 sm:col-span-5 md:col-span-3 md:col-start-3 md:mt-6"
        />

        <div className="col-span-12 md:col-span-5 md:col-start-7 md:mt-6 lg:col-span-4 lg:col-start-8">
          <div className="lees">
            {overMij.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p>{overMij.groet}</p>
          </div>
          <div className="mt-3 flex items-end gap-5">
            <Signature />
            <p className="pb-3">{overMij.naam}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
