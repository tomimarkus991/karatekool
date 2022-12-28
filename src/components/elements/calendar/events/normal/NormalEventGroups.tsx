import clsx from "clsx";

import { SGroup, SHighLightedGroup } from "types";
import { groupColorMapper } from "utils";

interface MapGroupLetterProps {
  groups: SGroup[];
}

const className = "text-lg font-quicksand font-semibold";

export const MapGroupLetter = ({ groups }: MapGroupLetterProps) => {
  return (
    <>
      {groups.map(group => {
        return (
          <p
            className={clsx("ml-1", groupColorMapper(group?.letter), className)}
            key={group?.letter}
          >
            {group?.letter}
          </p>
        );
      })}
    </>
  );
};
interface MapHighlightedGroupLetterProps {
  highlightedGroups: SHighLightedGroup[];
}

export const MapHighLightedGroupLetter = ({
  highlightedGroups,
}: MapHighlightedGroupLetterProps) => {
  return (
    <>
      {highlightedGroups.map(highlightedGroup => {
        return (
          <div className={clsx("ml-1 flex flex-row")} key={highlightedGroup?.letter}>
            <p
              className={clsx(
                "underline decoration-red-500",
                groupColorMapper(highlightedGroup?.letter),
                className
              )}
            >
              {highlightedGroup?.letter}
            </p>
            <p
              className={clsx(
                "text-red-500 ml-[0.1rem] font-bold font-quicksand text-xl",
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
