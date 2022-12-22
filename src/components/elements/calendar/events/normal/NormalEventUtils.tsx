import clsx from "clsx";

import { SGroup, SHighLightedGroup } from "types";
import { groupColorMapper } from "utils";

interface MapGroupLetterProps {
  groups: SGroup[];
}

export const MapGroupLetter = ({ groups }: MapGroupLetterProps) => {
  return (
    <>
      {groups.map(group => {
        return (
          <p className={clsx("ml-1", groupColorMapper(group?.letter, "text"))} key={group?.letter}>
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
            <p className={clsx("underline", groupColorMapper(highlightedGroup?.letter, "text"))}>
              {highlightedGroup?.letter}
            </p>
            <p className="text-red-500 ml-1">!</p>
          </div>
        );
      })}
    </>
  );
};
