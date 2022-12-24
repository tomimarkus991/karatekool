import { RealButton } from "@redlotus/ui";

import { useCalendarFilters } from "context";
import { buttonVariantMapper, groupLetters } from "utils";

export const CalendarFilterButtons = () => {
  const { setLetter } = useCalendarFilters();
  return (
    <div className="flex flex-row space-x-3">
      {groupLetters.map(letter => {
        return (
          <RealButton
            variant={buttonVariantMapper(letter)}
            size="oneLetter"
            onClick={() => setLetter(letter)}
          >
            {letter}
          </RealButton>
        );
      })}
      <RealButton size="sm" onClick={() => setLetter("all")}>
        All
      </RealButton>
      <RealButton size="sm" onClick={() => setLetter("none")}>
        None
      </RealButton>
    </div>
  );
};
