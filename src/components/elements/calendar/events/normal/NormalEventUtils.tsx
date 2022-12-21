import clsx from "clsx";

import { useCalendarFilters } from "context";
import { SGroup, SHighLightedGroup } from "types";
import { groupColorMapper } from "utils";

interface MapGroupLetterProps {
  groups: SGroup[];
}

export const MapGroupLetter = ({ groups }: MapGroupLetterProps) => {
  const { letter } = useCalendarFilters();
  return (
    <>
      {groups.map(group => {
        if (letter !== "all" && group?.letter !== letter) {
          return <></>;
        }

        return (
          <p className={clsx("ml-1", groupColorMapper(group?.letter))} key={group?.letter}>
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
  const { letter } = useCalendarFilters();
  return (
    <>
      {highlightedGroups.map(highlightedGroup => {
        if (letter !== "all" && highlightedGroup?.letter !== letter) {
          return <></>;
        }
        return (
          <div className={clsx("ml-1 flex flex-row")} key={highlightedGroup?.letter}>
            <p className={clsx("underline", groupColorMapper(highlightedGroup?.letter))}>
              {highlightedGroup?.letter}
            </p>
            <p className="text-red-500 ml-1">!</p>
          </div>
        );
      })}
    </>
  );
};
