import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@/lib";

const ButtonSizes = {
  md: "w-[5.5rem] h-[5.5rem] sm:w-[7rem] sm:h-[7rem] md:w-[7.5rem] md:h-[7.5rem]",
  xl: "w-[7.3rem] h-[7.3rem] sm:w-[9rem] sm:h-[9rem] md:w-[10rem] md:h-[10rem]",
};

const realDiamondButtonVariants = cva(
  [
    "border-r-25rem m-0 border-b-[6px] border-r-[6px] text-center font-medium tracking-wider",
    "transition-all duration-300 hover:-translate-y-[0.15rem]",
    "active:translate-y-[0.2rem] active:duration-75 rotate-45",
  ],
  {
    // regular --> hover --> active --> dark --> focus
    variants: {
      variant: {
        dark: [
          "bg-gray-700 text-textWhite border-gray-900",
          "hover:text-white",
          "active:border-gray-700",
          "dark:bg-gray-700 dark:border-gray-900 dark:active:border-gray-700",
          "outline-darkOutline",
        ],
        light: [
          "bg-slate-50 text-slate-700 border-slate-200",
          "hover:text-gray-800",
          "active:border-slate-50",
          "outline-lightOutline",
        ],
        blue: [
          "bg-blue-700 text-textWhite border-blue-900",
          "hover:text-white",
          "active:border-blue-700",
          "dark:bg-blue-700 dark:border-blue-900 dark:active:border-blue-700",
          "focus:ring-blue-500",
          "outline-blueOutline",
        ],
        casualRed: [
          "text-textGray bg-casualRed border-casualRedDarker",
          "hover:text-textGray",
          "active:border-casualRed",
          "outline-casualRedOutline",
        ],
        casualOrange: [
          "text-textGray bg-casualOrange border-casualOrangeDarker",
          "hover:text-textGray",
          "active:border-casualOrange",
          "outline-casualOrangeOutline",
        ],
        casualGreen: [
          "text-textGray bg-casualGreen border-casualGreenDarker",
          "hover:text-textGray",
          "active:border-casualGreen",
          "outline-casualGreenOutline",
        ],
        casualAqua: [
          "text-textGray bg-casualAqua border-casualAquaDarker",
          "hover:text-textGray",
          "active:border-casualAqua",
          "outline-casualAquaOutline",
        ],
        casualSkyBlue: [
          "text-textGray bg-casualSkyBlue border-casualSkyBlueDarker",
          "hover:text-textGray",
          "active:border-casualSkyBlue",
          "outline-casualSkyBlueOutline",
        ],
        casualSlateBlue: [
          "text-textGray bg-casualSlateBlue border-casualSlateBlueDarker",
          "hover:text-textGray",
          "active:border-casualSlateBlue",
          "outline-casualSlateBlueOutline",
        ],
        casualViolet: [
          "text-textGray bg-casualViolet border-casualVioletDarker",
          "hover:text-textGray",
          "active:border-casualViolet",
          "outline-casualVioletOutline",
        ],
        casualPink: [
          "text-textGray bg-casualPink border-casualPinkDarker",
          "hover:text-textGray",
          "active:border-casualPink",
          "outline-casualPinkOutline",
        ],
      },
      size: {
        md: cn(ButtonSizes.md, "rounded-[1.5rem]"),
        xl: cn(ButtonSizes.xl, "rounded-[2rem]"),
      },
    },
    defaultVariants: { variant: "dark", size: "md" },
  }
);

const textVariants = cva(["align-middle table-cell -rotate-45"], {
  // regular --> hover --> active --> dark --> focus
  variants: {
    textSize: {
      md: cn(ButtonSizes.md, "sm:text-lg md:text-xl"),
      xl: cn(ButtonSizes.xl, "text-lg sm:text-xl md:text-2xl"),
    },
  },
  defaultVariants: { textSize: "md" },
});

export interface RealDiamondButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof realDiamondButtonVariants>,
    VariantProps<typeof textVariants> {}

export const RealDiamondButton = forwardRef<HTMLButtonElement, RealDiamondButtonProps>(
  ({ className, variant, size, textSize, children, ...props }, ref) => {
    return (
      <button
        className={cn(realDiamondButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <div className={cn(textVariants({ textSize }))}>{children}</div>
      </button>
    );
  }
);

RealDiamondButton.displayName = "RealDiamondButton";
