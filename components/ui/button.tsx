import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition duration-200 ease-out hover:scale-[1.02] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-subtle hover:bg-primary/90 hover:shadow-premium",
        medical: "bg-medical text-medical-foreground shadow-subtle hover:bg-medical/90 hover:shadow-premium",
        teal: "bg-teal text-teal-foreground shadow-subtle hover:bg-teal/90",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-primary/15 bg-white/80 text-primary shadow-sm hover:bg-white hover:shadow-subtle dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
        ghost: "text-foreground/75 hover:bg-muted hover:text-foreground",
        link: "text-medical underline-offset-4 hover:underline"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3.5",
        lg: "h-12 px-6",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
