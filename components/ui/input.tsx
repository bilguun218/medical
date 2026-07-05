import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "focus-ring flex h-11 w-full rounded-xl border border-slate-200/80 bg-white px-3.5 py-2 text-sm shadow-sm transition placeholder:text-muted-foreground focus:border-medical/40 focus:shadow-subtle dark:border-border dark:bg-card dark:text-foreground",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
