"use client"
import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@lib/utils"
import { Label } from "./label"


const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        bottomBorder: 'bg-transparent h-6 border-t-0 border-l-0 focus-visible:outline-none font-bold text-[16px] rounded-none focus-visible:ring-offset-0 border-r-0 ring-0 focus-visible:ring-0 outline-none',
        inputFile: "",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> {
  asChild?: boolean
}

export interface InputWithButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  parentClassName?: string;
  buttonClassName?: string;
  key?: string;
  id?: string;
  divRef?: React.RefObject<HTMLDivElement>;
  inputRef?: React.RefObject<HTMLInputElement>;
  buttonOnClick?: () => void;
  buttonChildren?: React.ReactNode | React.ReactElement | React.ReactElement[] | React.ReactNode[] | string | number | boolean | null | undefined;
  asChild?: boolean;
}

export interface CustomFileTypeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> {
  asChild?: boolean,
  onDropHandler?: (e: any) => void,
  inputRef?: React.RefObject<any>,
  dropRef?: React.RefObject<any>,
  otherRef?: React.RefObject<any>,
}


const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({
            className,
            variant
          })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const InputWithButton = React.forwardRef<HTMLInputElement, InputWithButtonProps>(
  ({ className, parentClassName, id, key, type, placeholder, divRef, inputRef, buttonClassName, buttonOnClick, buttonChildren, ...props }, ref) => {
    return (
      <>
        <div
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            parentClassName
          )}
          key={key || "input"}
          id={id || "typeToVoice"}
          ref={divRef}
        >
          <input type={type} className={className} placeholder={placeholder} ref={inputRef} {...props} />
          <button
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              buttonClassName)}
            onClick={() => buttonOnClick?.()}>
            {buttonChildren}
          </button>
        </div>
      </>
    )
  })

InputWithButton.displayName = "InputWithButton"





export { Input, InputWithButton }
