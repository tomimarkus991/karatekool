import { HiDownload } from "react-icons/hi";

import { RealButton } from "@/components";
import { useCalendarFilters } from "@/context";
import { buttonVariantMapper, groupLetters } from "@/lib";

interface Props {
  downloadScreenshot: () => void;
}

export const CalendarFilterButtons = ({ downloadScreenshot }: Props) => {
  const { setLetter } = useCalendarFilters();
  return (
    <div className="grid justify-center grid-cols-4 gap-2 max-w-[340px] m-auto xs2:flex xs2:justify-start xs2:max-w-none xs2:m-0 xs2:ml-4">
      {groupLetters.map(letter => {
        return (
          <RealButton
            key={letter}
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
        <HiDownload className="w-5 h-5 text-white" />
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
