import { RealButton } from "@redlotus/ui";

import { useCalendarFilters } from "context";
import { groupLetters } from "utils";

export const CalendarFilterButtons = () => {
  const { setLetter } = useCalendarFilters();
  return (
    <div className="grid grid-cols-4 gap-2">
      {groupLetters.map(letter => {
        return <RealButton onClick={() => setLetter(letter)}>{letter}</RealButton>;
      })}
      <RealButton onClick={() => setLetter("all")}>All</RealButton>
      <RealButton onClick={() => setLetter("none")}>None</RealButton>
    </div>
  );
};
