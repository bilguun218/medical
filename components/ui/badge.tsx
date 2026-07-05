import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-safe inline-flex max-w-full items-center rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-xs font-semibold leading-4 text-primary",
        className
      )}
      {...props}
    />
  );
}
