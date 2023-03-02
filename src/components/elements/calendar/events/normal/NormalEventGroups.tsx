import clsx from "clsx";

import { groupColorMapper } from "@/lib";
import { SGroup, SHighLightedGroup } from "@/types";

interface MapGroupLetterProps {
  groups: SGroup[];
  overflowX: boolean;
}

const className = () =>
  clsx(
    "font-number font-semibold",
    "text-[0.6rem] ml-[0.05rem] xs:ml-[0.1rem] xs:text-xs sm:text-sm md:text-base sm:ml-[0.15rem]"
  );
// const className = (overflowX: boolean) =>
//   clsx("font-quicksand font-semibold", overflowX ? "text-base ml-[0.1rem]" : "text-lg ml-1");

export const MapGroupLetter = ({ groups }: MapGroupLetterProps) => {
  return (
    <>
      {groups.map(group => {
        return (
          <p className={clsx(groupColorMapper(group?.letter), className())} key={group?.letter}>
            {group?.letter}
          </p>
        );
      })}
    </>
  );
};

interface MapHighlightedGroupLetterProps {
  highlightedGroups: SHighLightedGroup[];
  overflowX: boolean;
}

export const MapHighLightedGroupLetter = ({
  highlightedGroups,
}: MapHighlightedGroupLetterProps) => {
  return (
    <>
      {highlightedGroups.map(highlightedGroup => {
        return (
          <div className={clsx("flex flex-row")} key={highlightedGroup?.letter}>
            <p
              className={clsx(
                "underline decoration-red-500",
                groupColorMapper(highlightedGroup?.letter),
                className()
              )}
            >
              {highlightedGroup?.letter}
            </p>
            <p
              className={clsx(
                "text-red-500 ml-[0.06rem] md:text-base xs:text-xs xs:ml-[0.1rem] font-bold font-number text-[0.6rem] sm:text-sm flex justify-center items-center",
                className
              )}
            >
              !
            </p>
          </div>
        );
      })}
    </>
  );
};
