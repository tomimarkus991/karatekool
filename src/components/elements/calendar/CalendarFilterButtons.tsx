import { RealButton } from "@redlotus/ui";
import { HiCamera } from "react-icons/hi";

import { useCalendarFilters } from "context";
import { buttonVariantMapper, groupLetters } from "utils";

interface Props {
  downloadScreenshot: () => void;
}

export const CalendarFilterButtons = ({ downloadScreenshot }: Props) => {
  const { setLetter } = useCalendarFilters();
  return (
    <div className="grid justify-center grid-cols-4 gap-2 max-w-[340px] m-auto xs2:flex xs2:justify-start xs:max-w-none xs:m-0 xs:ml-4">
      {groupLetters.map(letter => {
        return (
          <RealButton
            className="active:translate-y-[0.2rem] active:duration-75"
            variant={buttonVariantMapper(letter)}
            size="oneLetter"
            focus={true}
            onClick={() => setLetter(letter)}
          >
            {letter}
          </RealButton>
        );
      })}
      <RealButton size="icon" onClick={downloadScreenshot}>
        <HiCamera className="w-7 h-7" />
      </RealButton>
      {/* <RealButton size="sm" onClick={() => setLetter("all")}>
        All
      </RealButton>
      <RealButton size="sm" onClick={() => setLetter("none")}>
        None
      </RealButton> */}
    </div>
  );
};
