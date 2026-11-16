import { RisingText, Rule } from "@/components/Reveal";

/** Opens a chapter: its number as in the portfolio (00–05), the title and the italic subtitle. */
export function ChapterHead({ nr, title, sub }: { nr: string; title: string; sub?: string }) {
  return (
    <div className="marge pt-[clamp(5.5rem,13vw,11.5rem)]">
      <Rule className="bg-mangaan/85" />
      <div className="raster mt-5 items-start gap-y-3 sm:mt-7">
        <p className="kop cijfer col-span-12 text-mangaan/28 md:col-span-2" aria-hidden="true">
          {nr}
        </p>
        <div className="col-span-12 md:col-span-10">
          <h2 className="kop max-w-[17ch]">
            <span className="sr-only">{nr}. </span>
            <RisingText>{title}</RisingText>
          </h2>
          {sub && <p className="ondertitel mt-4 max-w-[34ch] sm:mt-5">{sub}</p>}
        </div>
      </div>
    </div>
  );
}
