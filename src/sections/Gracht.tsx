import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ChapterHead } from "@/components/ChapterHead";
import { Compare } from "@/components/Compare";
import { Figure } from "@/components/Figure";
import { Segmented } from "@/components/Segmented";
import { gracht as g } from "@/content";
import { Img } from "@/lib/img";

function Vlonders() {
  const [id, setId] = useState("1");
  const v = g.varianten.find((x) => x.id === id)!;
  return (
    <div>
      <Segmented
        label="Kies een variant"
        value={id}
        onChange={setId}
        options={g.varianten.map((x) => ({ id: x.id, label: x.kort, hint: x.naam }))}
      />
      <p className="noot mt-3 text-[1.0625rem] text-grijs sm:hidden" aria-live="polite">
        {v.naam}
      </p>
      <div className="relative mt-5 aspect-[1474/1304] bg-papier">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={v.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Img name={v.img} alt={`Vlonder ${v.kort.toLowerCase()}: ${v.naam}`} className="h-full w-full object-contain" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Gracht() {
  return (
    <section id="gracht" aria-label="Herinrichting Gedempte Gracht en Gedempte Burgwal">
      <ChapterHead nr="02" title={"Herinrichting Gedempte Gracht & - Burgwal"} sub={g.ondertitel} />

      <div className="marge mt-[clamp(2.5rem,6vw,5.5rem)]">
        <Figure
          name="gracht/plan"
          alt="Voorontwerp fase 2: plattegrond van de Gedempte Gracht en de Gedempte Burgwal"
          caption={g.planBijschrift}
          zoom
          zoomWidth={1400}
        />
      </div>

      <div className="marge raster mt-[clamp(3rem,7vw,6.5rem)] items-start gap-y-12">
        <div className="col-span-12 md:col-span-4 md:col-start-3">
          <h3 className="tussenkop">{g.fase2Kop}</h3>
          <div className="lees mt-5">
            {g.fase2.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
        <Figure
          name="gracht/profiel"
          alt="Profiel van de Gedempte Burgwal: trottoir 4,15, rijweg 4,625, multi purpose 2,00, trottoir 2,37; totaal 13,15 meter"
          caption={g.profielBijschrift}
          zoom
          zoomWidth={480}
          className="col-span-8 sm:col-span-5 md:col-span-3 md:col-start-8"
        />
      </div>

      <div className="marge raster mt-[clamp(4.5rem,10vw,9rem)] items-start gap-y-12">
        <div className="col-span-12 md:col-span-4 md:col-start-3 md:sticky md:top-28">
          <h3 className="tussenkop">{g.fase1Kop}</h3>
          <div className="lees mt-5">
            {g.fase1.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <Vlonders />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[1, 2, 3, 4].map((n, i) => (
              <Figure
                key={n}
                name={`gracht/vlonder-foto-${n}`}
                alt="Vlonder met plantenbak op een voormalig parkeervak"
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="marge raster mt-[clamp(4.5rem,10vw,9rem)] gap-y-14">
        <p className="bijschrift col-span-12 -mb-6 md:col-span-10 md:col-start-2">sleep de lijn om de twee fasen te vergelijken</p>
        <div className="col-span-12 sm:col-span-6 md:col-span-5 md:col-start-2">
          <Compare
            before="gracht/visual-a-fase-1"
            after="gracht/visual-a-fase-2"
            beforeLabel={g.fase1Visual}
            afterLabel={g.fase2Visual}
            label="Vergelijk fase 1 en fase 2, eerste straatbeeld"
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-5">
          <Compare
            before="gracht/visual-b-fase-1"
            after="gracht/visual-b-fase-2"
            beforeLabel={g.fase1Visual}
            afterLabel={g.fase2Visual}
            label="Vergelijk fase 1 en fase 2, tweede straatbeeld"
          />
        </div>
      </div>
    </section>
  );
}
