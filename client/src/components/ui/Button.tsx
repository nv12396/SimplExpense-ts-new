import { forwardRef } from "react";
import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("btn text-white border-none shadow", {
  variants: {
    variant: {
      default: "bg-primaryGreen hover:bg-[#4ac5b6]/90",
      destructive: "bg-rose-400 hover:bg-rose-400/90",
    },
    size: {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, children, size, disabled, type = "button", ...props },
    ref
  ) => {
    return (
      <button
        type={type}
        className={clsx(buttonVariants({ variant, size, className }))}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
