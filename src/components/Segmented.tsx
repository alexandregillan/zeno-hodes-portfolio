import type { CSSProperties } from "react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { cn } from "@/lib/utils";

type Option = { id: string; label: string; hint?: string };

/**
 * A row of choices; the dark pill slides to the one that is active.
 * On a phone it spans the full width in equal cells (two rows when there are four or more).
 */
export function Segmented({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: Option[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  className?: string;
}) {
  const cols = options.length > 3 ? 2 : options.length;
  return (
    <div
      role="group"
      aria-label={label}
      style={{ "--c": cols } as CSSProperties}
      className={cn(
        "grid w-full grid-cols-[repeat(var(--c),minmax(0,1fr))] gap-1 rounded-[1.6rem] bg-strooi-licht p-1",
        "sm:inline-grid sm:w-auto sm:auto-cols-auto sm:grid-flow-col sm:grid-cols-none",
        className,
      )}
    >
      <AnimatedBackground
        defaultValue={value}
        value={value}
        onValueChange={(id) => id && onChange(id)}
        className="rounded-full bg-mangaan"
        transition={{ type: "spring", bounce: 0.14, duration: 0.5 }}
      >
        {options.map((o) => (
          <button
            key={o.id}
            data-id={o.id}
            type="button"
            aria-pressed={value === o.id}
            className="flex min-h-11 items-center justify-center rounded-full px-4 text-center text-[0.9375rem] font-[450] leading-tight text-mangaan transition-colors duration-300 data-[checked=true]:text-papier sm:px-5"
          >
            <span className="flex items-baseline justify-center gap-2">
              <span>{o.label}</span>
              {o.hint && <span className="noot text-[0.9375rem] opacity-80 max-sm:hidden">{o.hint}</span>}
            </span>
          </button>
        ))}
      </AnimatedBackground>
    </div>
  );
}
