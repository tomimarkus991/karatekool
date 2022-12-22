import { RealButton } from "@redlotus/ui";

import { useCalendarFilters } from "context";
import { groupColorMapper, groupLetters } from "utils";

export const CalendarFilterButtons = () => {
  const { setLetter } = useCalendarFilters();
  return (
    <div className="flex flex-row space-x-3">
      {groupLetters.map(letter => {
        console.log(groupColorMapper(letter, "bg"));

        return (
          <RealButton
            variant={groupColorMapper(letter, "bg")}
            size="oneLetter"
            onClick={() => setLetter(letter)}
          >
            {letter}
          </RealButton>
        );
      })}
      <RealButton size="oneLetter" onClick={() => setLetter("all")}>
        All
      </RealButton>
      <RealButton size="oneLetter" onClick={() => setLetter("none")}>
        None
      </RealButton>
    </div>
  );
};
