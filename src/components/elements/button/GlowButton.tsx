import { animations, AnimationWrapper } from "@redlotus/ui";
import clsx from "clsx";

const glowButtonVariants = {
  // regular --> hover --> active --> dark --> focus
  red: `bg-primary rounded-3xl shadow-red`,
  orange: `bg-secondary rounded-3xl shadow-orange`,
};

const glowButtonSizes = {
  xs: "py-2 px-3 rounded-3xl max-h-[2.5rem]",
  sm: "py-2 px-3 rounded-3xl max-h-[2.5rem]",
  md: "py-2 px-5 rounded-3xl max-h-[4rem]",
  lg: "py-3 px-18 rounded-3xl max-h-[4rem]",
  //   oneLetter: "py-3 px-5 text-md rounded-lg uppercase max-h-[3.2rem] max-w-[3.2rem]",
};
const glowButtonFontSizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  //   oneLetter: "py-3 px-5 text-md rounded-lg uppercase max-h-[3.2rem] max-w-[3.2rem]",
};

export type GlowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof glowButtonVariants;
  size?: keyof typeof glowButtonSizes;
  children: string | React.ReactNode;
};

export const GlowButton = ({
  className = "",
  variant = "red",
  size = "md",
  children,
  ...props
}: GlowButtonProps) => {
  return (
    <AnimationWrapper key="regular-button" variants={animations.button}>
      <button
        className={clsx(
          "m-0 text-center font-medium tracking-wider",
          glowButtonVariants[variant],
          glowButtonSizes[size],
          className
        )}
        {...props}
      >
        <p className={clsx("text-white lowercase font-semibold", glowButtonFontSizes[size])}>
          {children}
        </p>
      </button>
    </AnimationWrapper>
  );
};
