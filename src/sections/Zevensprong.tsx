import { motion } from "motion/react";
import { useState } from "react";
import { ChapterHead } from "@/components/ChapterHead";
import { Figure } from "@/components/Figure";
import { Unveil } from "@/components/Reveal";
import { Segmented } from "@/components/Segmented";
import { TransitionPanel } from "@/components/ui/transition-panel";
import { zevensprong as z } from "@/content";
import { Img } from "@/lib/img";
import { cn } from "@/lib/utils";

/** The ten measures of variant 1D+: point at one and its places light up on the map. */
function Maatregelen() {
  const [on, setOn] = useState<number | null>(null);
  return (
    <div className="raster items-start gap-y-8">
      <div className="col-span-12 lg:col-span-7">
        {/* On a phone the map keeps a readable size and scrolls sideways. */}
        <div className="geen-balk -mx-[clamp(1.25rem,5.2vw,5.5rem)] overflow-x-auto px-[clamp(1.25rem,5.2vw,5.5rem)] sm:mx-0 sm:overflow-visible sm:px-0">
          <Unveil className="relative min-w-[40rem] bg-papier sm:min-w-0">
            <Img
              name="zevensprong/kaart-1d"
              alt="Kaart van variant 1D+ met de maatregelen genummerd van 1 tot 10"
              className="w-full"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              {z.markers.map((m, i) => {
                const lit = on === m.n;
                return (
                  <span
                    key={i}
                    className="absolute block aspect-square w-[5.2%] -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${m.x}%`, top: `${m.y}%` }}
                  >
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-mangaan"
                      initial={false}
                      animate={{ opacity: lit ? 1 : 0, scale: lit ? 1 : 1.6 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                    {lit && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-mangaan/25"
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 2.4, opacity: 0 }}
                        transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                  </span>
                );
              })}
            </div>
          </Unveil>
        </div>
        <p className="bijschrift mt-2.5">
          {z.variantKop} {z.variantSub}
          <span className="sm:hidden">, veeg om de kaart te verschuiven</span>
        </p>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <h3 className="tussenkop">{z.maatregelenKop}</h3>
        <ol className="mt-5" onMouseLeave={() => setOn(null)}>
          {z.maatregelen.map((m, i) => {
            const n = i + 1;
            return (
              <li key={m} className="border-t border-mangaan/15 last:border-b">
                <button
                  type="button"
                  aria-pressed={on === n}
                  onMouseEnter={() => setOn(n)}
                  onFocus={() => setOn(n)}
                  onBlur={() => setOn(null)}
                  onClick={() => setOn((cur) => (cur === n ? null : n))}
                  className="group flex w-full items-baseline gap-4 py-2.5 text-left"
                >
                  <span
                    className={cn(
                      "cijfer grid h-6 w-6 shrink-0 translate-y-[0.2em] place-items-center rounded-full border text-[0.75rem] font-[520] transition-colors duration-300",
                      on === n ? "border-mangaan bg-mangaan text-papier" : "border-mangaan/40 text-mangaan",
                    )}
                  >
                    {n}
                  </span>
                  <span className={cn("transition-opacity duration-300", on !== null && on !== n ? "opacity-45" : "opacity-100")}>
                    {m}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function Themas() {
  const [idx, setIdx] = useState(0);
  return (
    <div>
      <h3 className="tussenkop">{z.themasKop}</h3>
      <Segmented
        className="mt-5"
        label="Kies een thema"
        value={String(idx)}
        onChange={(id) => setIdx(Number(id))}
        options={z.themas.map((t, i) => ({ id: String(i), label: t.naam }))}
      />
      <div className="mt-7 min-h-[15rem]">
        <TransitionPanel
          activeIndex={idx}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          variants={{
            enter: { opacity: 0, y: 14, filter: "blur(3px)" },
            center: { opacity: 1, y: 0, filter: "blur(0px)" },
            exit: { opacity: 0, y: -10, filter: "blur(3px)" },
          }}
        >
          {z.themas.map((t) => (
            <ul key={t.naam} className="max-w-[40rem]">
              {t.punten.map((p) => (
                <li key={p.tekst} className="flex items-baseline gap-4 border-t border-mangaan/15 py-3 last:border-b">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid h-6 w-6 shrink-0 translate-y-[0.2em] place-items-center rounded-full text-[0.95rem] leading-none",
                      p.plus ? "bg-bak text-papier" : "border border-mangaan/50 text-mangaan",
                    )}
                  >
                    {p.plus ? "+" : "−"}
                  </span>
                  <span>
                    <span className="sr-only">{p.plus ? "Voordeel: " : "Nadeel: "}</span>
                    {p.tekst}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </TransitionPanel>
      </div>
    </div>
  );
}

export function Zevensprong() {
  return (
    <section id="zevensprong" aria-label="No-Regret maatregelen Zevensprong">
      <ChapterHead nr="04" title="No-Regret maatregelen Zevensprong" sub={z.ondertitel} />

      <div className="marge raster mt-[clamp(2.5rem,6vw,5.5rem)]">
        <div className="lees col-span-12 md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-3">
          {z.tekst.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>

      <div className="marge raster mt-[clamp(3.5rem,8vw,7rem)] gap-y-12">
        {z.scenarios.map((s, i) => (
          <div key={s.id} className="col-span-12 md:col-span-6">
            <Figure name={s.img} alt={`${s.naam}: plattegrond van de kruising`} zoom zoomWidth={820} delay={i * 0.1} />
            <h3 className="tussenkop mt-6">{s.naam}</h3>
            <p className="lees mt-3">{s.tekst}</p>
          </div>
        ))}
      </div>

      <div className="marge mt-[clamp(4.5rem,10vw,9rem)]">
        <Maatregelen />
      </div>

      <div className="marge raster mt-[clamp(4.5rem,10vw,9rem)] gap-y-14">
        <div className="col-span-12 lg:col-span-7">
          <Themas />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <h3 className="tussenkop">{z.referentiesKop}</h3>
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {z.referenties.map((r, i) => (
              <Figure key={r.img} name={r.img} alt={r.bijschrift} caption={r.bijschrift} delay={i * 0.1} className="max-w-[26rem]" />
            ))}
          </div>
        </div>
      </div>

      <div className="marge mt-[clamp(4.5rem,10vw,9rem)]">
        <h3 className="tussenkop">{z.ambitieKop}</h3>
        <ul className="mt-6">
          {z.ambities.map((a) => (
            <li key={a.naam} className="raster items-start gap-y-4 border-t border-mangaan/15 py-6 last:border-b">
              <div className="col-span-12 md:col-span-4 lg:col-span-6">
                <p className="text-[clamp(1.25rem,2vw,1.6rem)] font-[380] leading-tight tracking-[-0.02em]">{a.naam}</p>
                <p className="bijschrift mt-1.5">{a.referentie}</p>
              </div>
              {a.imgs.map((img, i) => (
                <Figure
                  key={img}
                  name={img}
                  alt={`${a.naam}, ${a.referentie.replace("referentie: ", "")}`}
                  className="col-span-6 md:col-span-4 lg:col-span-3"
                  delay={i * 0.08}
                />
              ))}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
