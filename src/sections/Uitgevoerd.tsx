import type { CSSProperties } from "react";
import { ChapterHead } from "@/components/ChapterHead";
import { Fasen } from "@/components/Fasen";
import { Figure } from "@/components/Figure";
import { Unveil } from "@/components/Reveal";
import { hofzichtlaan as hz, uitgevoerd, type Uitgevoerd as Project } from "@/content";
import { Img, ratio } from "@/lib/img";

const altFor = (p: Project, i: number) => `${p.naam}, foto ${i + 1} van ${p.fotos.length}`;

/** Photos of different shapes, set at one height. On a phone the row scrolls sideways. */
function Row({ p }: { p: Project }) {
  return (
    <div className="geen-balk -mx-[clamp(1.25rem,5.2vw,5.5rem)] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[clamp(1.25rem,5.2vw,5.5rem)] sm:mx-0 sm:snap-none sm:gap-4 sm:overflow-visible sm:px-0">
      {p.fotos.map((f, i) => (
        <Unveil
          key={f}
          delay={i * 0.08}
          className="h-72 shrink-0 snap-start sm:h-auto sm:shrink sm:[flex:var(--r)_1_0%]"
          style={{ "--r": ratio(f) } as CSSProperties}
        >
          <Img name={f} alt={altFor(p, i)} className="h-full w-auto sm:h-auto sm:w-full" />
        </Unveil>
      ))}
    </div>
  );
}

function Photos({ p }: { p: Project }) {
  if (p.indeling === "raster") {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {p.fotos.map((f, i) => (
          <Figure key={f} name={f} alt={altFor(p, i)} delay={(i % 3) * 0.08} />
        ))}
      </div>
    );
  }
  if (p.indeling === "boekhorst") {
    const [tall, a, b] = p.fotos;
    return (
      <div className="grid grid-cols-[1fr_1.34fr] gap-3 sm:gap-4">
        <Unveil className="h-full">
          <Img name={tall} alt={altFor(p, 0)} className="h-full w-full object-cover" />
        </Unveil>
        <div className="flex flex-col gap-3 sm:gap-4">
          <Figure name={a} alt={altFor(p, 1)} delay={0.08} />
          <Figure name={b} alt={altFor(p, 2)} delay={0.16} />
        </div>
      </div>
    );
  }
  return <Row p={p} />;
}

function Hofzichtlaan() {
  return (
    <div className="space-y-10">
      <Figure
        name="uitgevoerd/hofzichtlaan-plan"
        alt="Beplantingsplan van het plantsoen aan de Hofzichtlaan, met vakken A1 tot E"
        caption={hz.planBijschrift}
        zoom
        zoomWidth={1200}
      />
      <div className="raster items-start gap-y-10">
        <Figure
          name="uitgevoerd/hofzichtlaan-bouwbord"
          alt="Bouwbord van het plantsoen, met het resultaat op de achtergrond"
          caption={hz.bouwbordBijschrift}
          className="col-span-12 sm:col-span-5"
        />
        <figure className="col-span-12 sm:col-span-7">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
            {hz.planten.map((pl, i) => (
              <li key={pl.code}>
                <Unveil delay={i * 0.06} className="aspect-[6/5] overflow-hidden bg-strooi-licht">
                  <Img name={pl.img} alt={`${pl.naam} (${pl.nl})`} className="h-full w-full object-cover" />
                </Unveil>
                <p className="cijfer mt-2.5 text-[0.8125rem] font-[560]">{pl.code}</p>
                <p className="noot mt-0.5 text-[1.0625rem] leading-snug">{pl.naam}</p>
                <p className="mt-0.5 text-[0.875rem] leading-snug text-grijs">{pl.nl}</p>
              </li>
            ))}
          </ul>
          <figcaption className="bijschrift mt-4">{hz.schemaBijschrift}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export function Uitgevoerd() {
  return (
    <section id="uitgevoerd" aria-label="Reeds uitgevoerde projecten">
      <ChapterHead nr="05" title="Reeds uitgevoerde projecten" />

      <div className="marge mt-[clamp(2.5rem,6vw,5.5rem)]">
        {uitgevoerd.map((p) => (
          <article key={p.id} aria-labelledby={`${p.id}-kop`} className="raster gap-y-6 border-t border-mangaan/15 py-[clamp(2rem,5vw,4rem)] first:border-t-0 first:pt-0">
            <header className="col-span-12 md:col-span-4 lg:col-span-3">
              <div className="md:sticky md:top-28">
                <h3 id={`${p.id}-kop`} className="tussenkop">
                  {p.naam}
                </h3>
                <p className="noot mt-1.5 text-[1.0625rem] text-grijs">{p.wat}</p>
                {p.betrokken && (
                  <div className="mt-6 max-w-[19rem]">
                    <Fasen betrokken={p.betrokken} />
                  </div>
                )}
              </div>
            </header>
            <div className="col-span-12 md:col-span-8 lg:col-span-9">
              {p.indeling === "hofzicht" ? <Hofzichtlaan /> : <Photos p={p} />}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
