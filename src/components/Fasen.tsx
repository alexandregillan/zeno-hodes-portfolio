import { FASEN, type Fase } from "@/content";
import { cn } from "@/lib/utils";

/**
 * "betrokken bij: SO, VO, DO, bestek, uitvoering" drawn as the path of a project:
 * the five phases in order, with the ones Zeno worked on filled in.
 */
export function Fasen({ betrokken }: { betrokken: Fase[] }) {
  return (
    <div>
      <p className="spatie text-grijs">betrokken bij</p>
      <p className="sr-only">{betrokken.join(", ")}</p>
      <ol aria-hidden="true" className="mt-3 flex items-start">
        {FASEN.map((f, i) => {
          const on = betrokken.includes(f);
          const nextOn = i < FASEN.length - 1 && on && betrokken.includes(FASEN[i + 1]);
          return (
            <li key={f} className="relative flex-1 last:flex-none">
              {i < FASEN.length - 1 && (
                <span className={cn("absolute left-[5px] right-0 top-[5px] h-px", nextOn ? "bg-bak-diep" : "bg-mangaan/20")} />
              )}
              <span
                className={cn(
                  "relative block h-[11px] w-[11px] rounded-full border",
                  on ? "border-bak-diep bg-bak" : "border-mangaan/35 bg-strooi",
                )}
              />
              <span className={cn("mt-2 block pr-3 text-[0.8125rem] leading-tight", on ? "text-mangaan" : "text-mangaan/40")}>{f}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
