import { AnimatedBackground } from "@/components/ui/animated-background";
import { cn } from "@/lib/utils";

type Option = { id: string; label: string; hint?: string };

/** A row of choices; the dark pill slides to the one that is active. */
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
  return (
    <div role="group" aria-label={label} className={cn("inline-flex flex-wrap gap-1 rounded-[1.6rem] bg-strooi-licht p-1", className)}>
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
            className="min-h-11 rounded-full px-4 text-[0.9375rem] font-[450] leading-none text-mangaan transition-colors duration-300 data-[checked=true]:text-papier sm:px-5"
          >
            <span className="flex items-baseline gap-2">
              <span>{o.label}</span>
              {o.hint && <span className="noot text-[0.9375rem] opacity-80 max-sm:hidden">{o.hint}</span>}
            </span>
          </button>
        ))}
      </AnimatedBackground>
    </div>
  );
}
