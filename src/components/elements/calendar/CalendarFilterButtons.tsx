import { RealButton } from "@redlotus/ui";
import clsx from "clsx";

import { useCalendarFilters } from "context";
import { groupColorMapper, groupLetters } from "utils";

export const CalendarFilterButtons = () => {
  const { setLetter } = useCalendarFilters();
  return (
    <div className="grid grid-cols-4 gap-2">
      {groupLetters.map(letter => {
        return (
          <RealButton
            className={clsx(groupColorMapper(letter, "bg"))}
            onClick={() => setLetter(letter)}
          >
            {letter}
          </RealButton>
        );
      })}
      <RealButton onClick={() => setLetter("all")}>All</RealButton>
      <RealButton onClick={() => setLetter("none")}>None</RealButton>
    </div>
  );
};
