import clsx from "clsx";

export const realButtonVariants = {
  // regular --> hover --> active --> dark --> focus
  dark: `bg-gray-700 text-textWhite border-gray-900
    hover:text-white
    active:border-gray-700
    dark:bg-gray-700 dark:border-gray-900 dark:active:border-gray-700
    outline-darkOutline`,
  light: `bg-slate-50 text-slate-700 border-slate-200
    hover:text-gray-800
    active:border-slate-50
    outline-lightOutline`,
  blue: `bg-blue-700 text-textWhite border-blue-900
    hover:text-white
    active:border-blue-700
    dark:bg-blue-700 dark:border-blue-900 dark:active:border-blue-700
    focus:ring-blue-500
    outline-blueOutline`,
  casualRed: `text-textGray bg-casualRed border-casualRedDarker
    hover:text-textGray
    active:border-casualRed
    outline-casualRedOutline`,
  casualOrange: `text-textGray bg-casualOrange border-casualOrangeDarker
    hover:text-textGray
    active:border-casualOrange
    outline-casualOrangeOutline`,
  casualGreen: `text-textGray bg-casualGreen border-casualGreenDarker
    hover:text-textGray
    active:border-casualGreen
    outline-casualGreenOutline`,
  casualAqua: `text-textGray bg-casualAqua border-casualAquaDarker
    hover:text-textGray
    active:border-casualAqua
    outline-casualAquaOutline`,
  casualSkyBlue: `text-textGray bg-casualSkyBlue border-casualSkyBlueDarker
    hover:text-textGray
    active:border-casualSkyBlue
    outline-casualSkyBlueOutline`,
  casualSlateBlue: `text-textGray bg-casualSlateBlue border-casualSlateBlueDarker
    hover:text-textGray
    active:border-casualSlateBlue
    outline-casualSlateBlueOutline`,
  casualViolet: `text-textGray bg-casualViolet border-casualVioletDarker
    hover:text-textGray
    active:border-casualViolet
    outline-casualVioletOutline`,
  casualPink: `text-textGray bg-casualPink border-casualPinkDarker
    hover:text-textGray
    active:border-casualPink
    outline-casualPinkOutline`,
};

export const realButtonSizes = {
  md: "md:w-[10rem] w-[5rem] md:h-[10rem] h-[5rem] rotate-45 rounded-[1.5rem]",
  xl: "md:w-[15rem] w-[8rem] md:h-[15rem] h-[8rem] rotate-45 rounded-[2rem]",
};
export const textSizes = {
  md: "md:w-[10rem] w-[5rem] md:h-[10rem] h-[5rem] text-base md:text-xl rotate-45",
  xl: "md:w-[15rem] w-[8rem] md:h-[15rem] h-[8rem] text-lg md:text-3xl rotate-45",
};

export type RealButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof realButtonVariants;
  size?: keyof typeof realButtonSizes;
  children: string | React.ReactNode;
};

export const RealDiamondButton = ({
  type = "button",
  className = "",
  variant = "dark",
  size = "md",
  children,
  ...props
}: RealButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        "border-r-25rem m-0 border-b-[6px] border-r-[6px] text-center font-medium tracking-wider",
        "transition-all duration-300 hover:-translate-y-[0.15rem]",
        "active:translate-y-[0.2rem] active:duration-75",
        // "focus:outline-[3.5px] focus:outline focus:-translate-y-[0.2rem]",
        realButtonVariants[variant],
        realButtonSizes[size],
        className
      )}
      {...props}
    >
      <div className={clsx("-rotate-[45deg] align-middle table-cell", textSizes[size])}>
        {children}
      </div>
    </button>
  );
};
