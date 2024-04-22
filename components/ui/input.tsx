import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 bg-inherit w-96 text-sm md:text-base rounded-full border border-neutral-300 dark:border-neutral-700 px-3 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-1 focus-visible:outline-neutral-400 dark:focus-visible:outline-none dark:focus-visible:outline-1 dark:focus-visible:outline-offset-0 dark:focus-visible:outline-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-inherit dark:placeholder:text-neutral-400 ",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
