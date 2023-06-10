import { MutableRefObject } from "react";
import { TbBoxMultiple8 } from "react-icons/tb";

import { RealButton } from "@/components";
import { useCalendarFilters } from "@/context";
import { buttonVariantMapper, groupLetters } from "@/lib";

import { useUser } from "../../../hooks";

import { DownloadCalendar } from "./DownloadCalendar";

interface Props {
  currentMonthString: string;
  calendarRef: MutableRefObject<never>;
}

export const CalendarFilterButtons = ({ currentMonthString, calendarRef }: Props) => {
  const { setLetter } = useCalendarFilters();
  const { data: user } = useUser();
  return (
    <div className="grid justify-center grid-cols-5 gap-2 max-w-[14rem] m-auto sm:flex sm:justify-start sm:max-w-none sm:m-0 sm:ml-4">
      {groupLetters.map(letter => {
        return (
          <RealButton
            key={letter}
            variant={buttonVariantMapper(letter)}
            size="oneLetter"
            focus={true}
            onClick={() => setLetter(letter)}
          >
            {letter}
          </RealButton>
        );
      })}

      <DownloadCalendar calendarRef={calendarRef} currentMonthString={currentMonthString} />

      {user && (
        <RealButton
          onClick={() => setLetter("all")}
          size="icon"
          className="px-0 sm:px-3"
          variant="light"
        >
          <TbBoxMultiple8 className="w-6 h-6 text-stone-800" />
        </RealButton>
      )}
      {/* <RealButton size="sm" onClick={() => setLetter("all")}>
        All
      </RealButton>
      <RealButton size="sm" onClick={() => setLetter("none")}>
        None
      </RealButton> */}
    </div>
  );
};
