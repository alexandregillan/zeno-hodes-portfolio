import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { ChapterHead } from "@/components/ChapterHead";
import { Figure } from "@/components/Figure";
import { wijnhaven as w } from "@/content";
import { Img } from "@/lib/img";
import { useMediaQuery } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/** The planting list as a register of names; the photo of the chosen plant stands beside it. */
function Beplanting() {
  const [active, setActiveRaw] = useState(0);
  const layer = useRef(1);
  const setActive = (i: number) => {
    if (i === active) return;
    layer.current += 1;
    setActiveRaw(i);
  };
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const plant = w.planten[active];

  if (!fine) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3">
        {w.planten.map((p) => (
          <figure key={p.naam}>
            <Img name={p.img} alt={p.naam} className="aspect-[3/2] w-full object-cover" />
            <figcaption className="noot mt-2 text-[1.0625rem] leading-snug">{p.naam}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div className="raster items-center">
      <ul className="col-span-6">
        {w.planten.map((p, i) => (
          <li key={p.naam} className="border-t border-mangaan/15 last:border-b">
            <button
              type="button"
              aria-pressed={active === i}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="noot group flex w-full items-center justify-between gap-6 py-3.5 text-left text-[clamp(1.25rem,2vw,1.7rem)] leading-tight"
            >
              <span
                className={cn(
                  "transition-[translate,color] duration-500 ease-uit",
                  active === i ? "translate-x-2 text-mangaan" : "text-mangaan/45 group-hover:text-mangaan/70",
                )}
              >
                {p.naam}
              </span>
              <span
                aria-hidden="true"
                className={cn("h-2 w-2 shrink-0 rounded-full bg-bak transition-opacity duration-300", active === i ? "opacity-100" : "opacity-0")}
              />
            </button>
          </li>
        ))}
      </ul>
      <div className="relative col-span-6 aspect-[3/2] overflow-hidden bg-strooi-licht">
        <AnimatePresence initial={false}>
          <motion.div
            key={plant.img}
            className="absolute inset-0"
            style={{ zIndex: layer.current }}
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <Img name={plant.img} alt={plant.naam} className="h-full w-full object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Wijnhaven() {
  return (
    <section id="wijnhaven" aria-label="Herinrichting Wijnhaven">
      <ChapterHead nr="03" title="Herinrichting Wijnhaven" sub={w.ondertitel} />

      <div className="marge raster mt-[clamp(2.5rem,6vw,5.5rem)] items-start gap-y-10">
        <Figure
          name="wijnhaven/plan"
          alt="Beplantingsplan van de Wijnhaven met rechthoekige groenvakken en handgeschreven aantekeningen"
          zoom
          zoomWidth={1000}
          className="col-span-12 md:col-span-6"
        />
        <div className="col-span-12 md:col-span-4 md:col-start-8">
          <div className="lees">
            {w.tekst.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="marge mt-[clamp(4rem,9vw,8rem)]">
        <Beplanting />
      </div>

      <div className="marge raster mt-[clamp(4rem,9vw,8rem)] items-end gap-y-10">
        <figure className="col-span-12 sm:col-span-6 md:col-span-4 md:col-start-2">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Figure name="wijnhaven/referentie-1" alt="Referentiebeeld: blokhagen met lage beplanting" />
            <Figure name="wijnhaven/referentie-2" alt="Referentiebeeld: groenvak met haag en vaste planten" delay={0.1} />
          </div>
          <figcaption className="bijschrift mt-2.5">{w.referentieBijschrift}</figcaption>
        </figure>
        <Figure
          name="wijnhaven/principeprofiel"
          alt="Principeprofiel van een groenvak met haag, heester en vaste planten"
          caption={w.profielBijschrift}
          zoom
          zoomWidth={900}
          className="col-span-12 sm:col-span-6 md:col-span-5 md:col-start-7"
        />
      </div>
    </section>
  );
}
