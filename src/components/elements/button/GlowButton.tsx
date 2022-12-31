import clsx from "clsx";

export const glowButtonVariants = {
  // regular --> hover --> active --> dark --> focus
  red: `bg-primary py-2 px-3 rounded-3xl shadow-red`,
  orange: `bg-secondary py-2 px-3 rounded-3xl shadow-orange`,
};

export const glowButtonSizes = {
  sm: "py-2 px-10 text-sm rounded-3xl max-h-[4rem]",
  md: "py-2 px-3 text-md rounded-3xl max-h-[4rem]",
  lg: "py-3 px-18 text-lg rounded-3xl max-h-[4rem]",
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
    <button
      className={clsx(
        "m-0 text-center font-medium tracking-wider",
        "transition-all duration-300 hover:-translate-y-[0.15rem]",
        // "active:translate-y-[0.2rem] active:duration-75",
        // "focus:outline-[3.5px] focus:outline focus:-translate-y-[0.2rem]",
        glowButtonVariants[variant],
        glowButtonSizes[size],
        className
      )}
      {...props}
    >
      <p className="text-white lowercase">{children}</p>
    </button>
  );
};
