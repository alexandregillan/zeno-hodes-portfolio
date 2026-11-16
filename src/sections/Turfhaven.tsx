import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ChapterHead } from "@/components/ChapterHead";
import { Figure } from "@/components/Figure";
import { Plant } from "@/components/Plant";
import { Segmented } from "@/components/Segmented";
import { turfhaven as t } from "@/content";
import { Img, meta } from "@/lib/img";

function Plantenbakken() {
  const [id, setId] = useState("3m");
  const bak = t.bakken.find((b) => b.id === id)!;
  return (
    <div>
      <Figure name="turfhaven/bakken-boven" alt="Bovenaanzicht van de poefs en de plantenbak" className="max-w-[34rem]" />
      <Figure
        name="turfhaven/bakken-aanzicht"
        alt="Aanzicht van de poefs en de plantenbak, met twee figuren op schaal"
        className="mt-6"
        delay={0.1}
      />
      <div className="mt-9">
        <Segmented
          label="Kies een maat"
          value={id}
          onChange={setId}
          options={t.bakken.map((b) => ({ id: b.id, label: b.maat }))}
        />
        <p className="noot mt-3 text-[1.0625rem] text-grijs" aria-live="polite">
          {bak.soort} {bak.maat}
        </p>
        <div className="relative mt-4 aspect-[1928/920]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={bak.id}
              className="absolute inset-0 flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <Img
                name={bak.img}
                alt={`Doorsnede met maatvoering: ${bak.soort} ${bak.maat}`}
                className="max-h-full w-auto"
                style={{ width: `${Math.min(100, (meta(bak.img).w / 1928) * 100)}%` }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="bijschrift mt-3">{t.bakkenBijschrift}</p>
    </div>
  );
}

export function Turfhaven() {
  return (
    <section id="turfhaven" aria-label="Openbare ruimte Turfhaven">
      <ChapterHead nr="01" title="Openbare ruimte Turfhaven" sub={t.ondertitel} />

      <div className="marge raster mt-[clamp(2.5rem,6vw,5.5rem)] items-start gap-y-10">
        <div className="col-span-12 md:col-span-4 md:col-start-3">
          <div className="lees">
            {t.tekst.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <Figure name="turfhaven/doorsnede" alt="Doorsnede van de Turfhaven met plantenbak" className="mt-10 max-w-[22rem]" />
        </div>
        <Figure
          name="turfhaven/plan"
          alt="Voorontwerp: plattegrond van de Turfhaven in het centrum van Den Haag"
          zoom
          className="col-span-12 md:sticky md:top-28 md:col-span-6 md:col-start-7"
        />
      </div>

      {/* Materiaal */}
      <div className="marge raster mt-[clamp(4.5rem,10vw,9rem)] items-end gap-y-10">
        <div className="col-span-12 md:col-span-4 md:col-start-3 md:self-start">
          <h3 className="tussenkop">{t.materiaalKop}</h3>
          <p className="lees mt-5">{t.materiaal}</p>
        </div>
        <Figure
          name="turfhaven/materiaal-kleur"
          alt="Sample van de afstrooilaag in beige en mangaan, bij de kolom van Amare"
          className="col-span-5 md:col-span-2 md:col-start-8"
        />
        <Figure
          name="turfhaven/materiaal-patroon"
          alt="Sample van het patroon: een mangaankleurige baan in de afstrooilaag"
          className="col-span-7 md:col-span-3 md:col-start-10"
          delay={0.12}
        />
        <Figure
          name="turfhaven/visual-1"
          alt="Visual van de Turfhaven met het vloerpatroon en ronde plantenbakken"
          className="col-span-12 md:col-span-5 md:col-start-3"
        />
        <Figure
          name="turfhaven/visual-2"
          alt="Visual van de Turfhaven gezien langs de gevel"
          className="col-span-12 md:col-span-5 md:col-start-8"
          delay={0.12}
        />
      </div>

      {/* Definitief ontwerp + plantenbakken */}
      <div className="marge raster mt-[clamp(4.5rem,10vw,9rem)] items-start gap-y-14">
        <Figure
          name="turfhaven/do-plan"
          zoom="turfhaven/do-plan-zoom"
          zoomWidth={1500}
          alt="Definitief ontwerp van de Turfhaven: plattegrond met vloerpatroon, lijngoten en plantenbakken"
          caption={t.doBijschrift}
          className="col-span-12 md:col-span-6"
        />
        <div className="col-span-12 md:sticky md:top-28 md:col-span-5 md:col-start-8">
          <Plantenbakken />
        </div>
      </div>

      {/* Beplanting */}
      <div className="marge raster mt-[clamp(4.5rem,10vw,9rem)] gap-y-12">
        {t.beplanting.map((g, gi) => (
          <div key={g.groep} className={gi === 0 ? "col-span-12 md:col-span-5 md:col-start-3" : "col-span-12 md:col-span-5 md:col-start-8"}>
            <h3 className="tussenkop">{g.groep}</h3>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4">
              {g.planten.map((p, i) => (
                <Plant key={p.naam} img={p.img} naam={p.naam} delay={i * 0.07} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
