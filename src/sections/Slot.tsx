import { SIGNATURE_PATH, SIGNATURE_VIEWBOX } from "@/assets/handtekening-path";
import { Unveil } from "@/components/Reveal";
import { chapters, PDF } from "@/content";
import { Img } from "@/lib/img";
import { usePageScroll } from "@/lib/scroll";

/** The last page of the portfolio, two perspective drawings on grey, and the site's footer. */
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

        <div className="raster mt-[clamp(5rem,12vw,10rem)] gap-y-10 border-t border-mangaan/25 pt-8">
          <div className="col-span-12 flex items-end gap-5 md:col-span-4">
            <svg viewBox={SIGNATURE_VIEWBOX} role="img" aria-label="Handtekening van Zeno Hodes" className="h-14 w-auto">
              <path d={SIGNATURE_PATH} fill="currentColor" />
            </svg>
            <p className="pb-2 text-[1.0625rem]">Zeno Hodes</p>
          </div>

          <nav aria-label="Hoofdstukken" className="col-span-12 sm:col-span-7 md:col-span-5">
            <ol className="grid grid-cols-1 gap-x-8 xs:grid-cols-2">
              {chapters.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(`#${c.id}`);
                    }}
                    className="flex min-h-11 items-center gap-3 text-[0.9375rem] hover:underline hover:underline-offset-4"
                  >
                    <span className="cijfer w-6 shrink-0 text-[0.8125rem] opacity-60">{c.nr}</span>
                    <span>{c.kort}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="col-span-12 flex flex-col items-start gap-2 sm:col-span-5 md:col-span-3 md:items-end">
            <a
              href={PDF.href}
              download={PDF.bestand}
              className="flex h-11 items-center justify-center gap-2.5 rounded-full border border-mangaan/35 px-5 text-[0.9375rem] transition-colors duration-300 hover:bg-mangaan hover:text-slot"
            >
              <span>{PDF.label}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                <path d="M7 1.5v8M3.5 6.5 7 10l3.5-3.5M2 12.5h10" />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => scrollTo(0)}
              className="flex h-11 items-center justify-center px-5 text-[0.9375rem] md:-mr-5"
            >
              Terug naar het begin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
