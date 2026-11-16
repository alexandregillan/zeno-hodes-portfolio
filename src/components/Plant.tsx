import { Unveil } from "@/components/Reveal";
import { Img } from "@/lib/img";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** A plant from a planting list: its photo and its name, set the botanical way. */
export function Plant({
  img,
  naam,
  extra,
  className,
  delay,
  aspect = "aspect-[3/4]",
}: {
  img: string;
  naam: string;
  extra?: ReactNode;
  className?: string;
  delay?: number;
  aspect?: string;
}) {
  return (
    <figure className={cn("group", className)}>
      <Unveil delay={delay} className={cn("overflow-hidden bg-strooi-licht", aspect)}>
        <Img
          name={img}
          alt={naam}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-uit group-hover:scale-[1.045]"
        />
      </Unveil>
      <figcaption className="mt-2.5">
        <span className="noot block text-[1.0625rem] leading-snug text-mangaan">{naam}</span>
        {extra}
      </figcaption>
    </figure>
  );
}
