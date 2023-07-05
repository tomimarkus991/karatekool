import clsx from "clsx";

interface Props {
  tooltip: string;
}

export const Tooltip = ({ tooltip }: Props) => {
  return (
    <span
      id="tooltip"
      className={clsx(
        "absolute top-[-3rem] z-[997] p-2 text-sm font-bold text-white whitespace-nowrap transform",
        "origin-bottom scale-0 rounded-md bg-stone-800 shadow-md transition-all duration-200",
        "lowercase tracking-wider group-hover:scale-100"
      )}
    >
      {tooltip}
    </span>
  );
};
