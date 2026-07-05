import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-teal">{eyebrow}</p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold leading-[1.2] tracking-normal text-foreground md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-pretty text-base leading-7 text-muted-foreground">{description}</p> : null}
    </div>
  );
}
