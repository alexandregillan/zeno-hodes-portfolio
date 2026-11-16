import { SIGNATURE_PATH, SIGNATURE_VIEWBOX } from "@/assets/handtekening-path";
import { Unveil } from "@/components/Reveal";
import { Img } from "@/lib/img";
import { usePageScroll } from "@/lib/scroll";

/** The last page of the portfolio: two perspective drawings on grey. */
export function Slot() {
  const { scrollTo } = usePageScroll();
  return (
    <footer className="mt-[clamp(5rem,12vw,11rem)] bg-slot text-mangaan">
      <div className="marge pb-10 pt-[clamp(4rem,10vw,9rem)]">
        <figure>
          <div className="mx-auto flex max-w-[52rem] items-end justify-center gap-[6%]">
            <Unveil className="w-[52%]">
              <Img name="slot/oefening-7-a" alt="Perspectieftekening met constructielijnen naar twee verdwijnpunten" />
            </Unveil>
            <Unveil className="w-[37%]" delay={0.18}>
              <Img name="slot/oefening-7-b" alt="Dezelfde gestapelde volumes, uitgewerkt in inkt" />
            </Unveil>
          </div>
          <figcaption className="bijschrift mt-8 text-center !text-mangaan/75">Oefening 7</figcaption>
        </figure>

        <div className="mt-[clamp(5rem,12vw,10rem)] flex flex-wrap items-end justify-between gap-x-10 gap-y-8 border-t border-mangaan/25 pt-6">
          <div className="flex items-end gap-5">
            <svg viewBox={SIGNATURE_VIEWBOX} role="img" aria-label="Handtekening van Zeno Hodes" className="h-14 w-auto">
              <path d={SIGNATURE_PATH} fill="currentColor" />
            </svg>
            <p className="pb-2 text-[1.0625rem]">Zeno Hodes</p>
          </div>
          <button type="button" onClick={() => scrollTo(0)} className="spatie -m-3 p-3">
            terug naar het begin
          </button>
        </div>
      </div>
    </footer>
  );
}
