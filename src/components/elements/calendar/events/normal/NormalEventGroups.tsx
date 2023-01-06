import clsx from "clsx";

import { SGroup, SHighLightedGroup } from "types";
import { groupColorMapper } from "utils";

interface MapGroupLetterProps {
  groups: SGroup[];
  overflowX: boolean;
}

const className = () =>
  clsx("font-quicksand font-semibold", "text-[0.5rem] ml-[0.05rem] sm:text-lg sm:ml-1");
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
                "text-red-500 ml-[0.1rem] font-bold font-quicksand text-sm sm:text-xl",
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
