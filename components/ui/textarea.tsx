import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "focus-ring min-h-32 w-full rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-sm leading-6 shadow-sm transition placeholder:text-muted-foreground focus:border-medical/40 focus:shadow-subtle dark:border-border dark:bg-card dark:text-foreground",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
