import * as React from "react";
import { cn } from "../../lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  focusBorderClasses?: string;
}
function Input({ className, type, focusBorderClasses, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary h-9 px-3 py-1 selection:text-primary-foreground dark:bg-input/30 border-input flex  w-full min-w-0 rounded-md border bg-transparent  text-base  outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        !focusBorderClasses
          ? `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] shadow-xs transition-[color,box-shadow]`
          : focusBorderClasses,
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
