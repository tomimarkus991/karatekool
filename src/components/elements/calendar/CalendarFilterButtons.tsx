import { RealButton } from "@redlotus/ui";

import { useCalendarFilters } from "context";
import { buttonVariantMapper, groupLetters } from "utils";

export const CalendarFilterButtons = () => {
  const { setLetter } = useCalendarFilters();
  return (
    <div className="grid grid-cols-4 gap-y-2 xs2:grid-cols-8 xs2:gap-x-2 xs2:gap-y-0 lg:grid-cols-12 lg:gap-x-0">
      {groupLetters.map(letter => {
        return (
          <RealButton
            className="place-self-center"
            variant={buttonVariantMapper(letter)}
            size="oneLetter"
            onClick={() => setLetter(letter)}
          >
            {letter}
          </RealButton>
        );
      })}
      {/* <RealButton size="sm" onClick={() => setLetter("all")}>
        All
      </RealButton>
      <RealButton size="sm" onClick={() => setLetter("none")}>
        None
      </RealButton> */}
    </div>
  );
};
