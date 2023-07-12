import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { animations, AnimationWrapper } from "@/components";

import { cn } from "../../../lib";

const glowButtonVariants = cva(["m-0 text-center font-medium tracking-wider"], {
  // regular --> hover --> active --> dark --> focus
  variants: {
    variant: {
      red: `bg-primary rounded-3xl shadow-red`,
      orange: `bg-secondary rounded-3xl shadow-orange`,
    },
    size: {
      xs: "py-2 px-3 rounded-3xl max-h-[2.5rem]",
      sm: "py-2 px-3 rounded-3xl max-h-[2.5rem]",
      md: "py-2 px-5 rounded-3xl max-h-[4rem]",
      lg: "py-3 px-18 rounded-3xl max-h-[4rem]",
      //   oneLetter: "py-3 px-5 text-md rounded-lg uppercase max-h-[3.2rem] max-w-[3.2rem]",
    },
    text: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      //   oneLetter: "py-3 px-5 text-md rounded-lg uppercase max-h-[3.2rem] max-w-[3.2rem]",
    },
    isValid: {
      false: "cursor-not-allowed opacity-50",
    },
  },
  defaultVariants: { variant: "red", size: "md", text: "md", isValid: true },
});

export interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glowButtonVariants> {}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant, size, text, isValid, ...props }, ref) => (
    <AnimationWrapper key="regular-button" variants={animations.button}>
      <button
        className={cn(
          glowButtonVariants({ variant, size, isValid, text, className }),
          "text-white lowercase font-semibold",
        )}
        ref={ref}
        {...props}
      />
    </AnimationWrapper>
  ),
);

GlowButton.displayName = "GlowButton";
