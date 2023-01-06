import clsx from "clsx";
import { isSameDay, parseISO } from "date-fns";
import { useDetectOverflow } from "use-detect-overflow";

import { useCalendarFilters } from "context";
import { EventData } from "types";

import { NormalEventTime, MapGroupLetter, MapHighLightedGroupLetter } from ".";

interface Props {
  event: EventData;
  date: Date;
}

export const NormalEvent = ({ event, date }: Props) => {
  const { group, event_trailer, highlighted_group, description } = event;
  const start = parseISO(event.start);
  const { letter } = useCalendarFilters();

  if (!isSameDay(start, date)) {
    return <></>;
  }

  if (letter === "none") {
    return <></>;
  }

  if (
    letter !== "all" &&
    !(group.filter(_group => _group?.letter === letter).length > 0) &&
    !(
      highlighted_group.filter(_highlighted_group => _highlighted_group?.letter === letter).length >
      0
    )
  ) {
    return <></>;
  }
  const [ref, { overflowX }] = useDetectOverflow();

  return (
    <div className={clsx("flex flex-col justify-start")}>
      <div className="flex flex-row justify-start items-center" ref={ref}>
        <NormalEventTime event={event} />
        <div className={clsx("flex justify-center items-center")}>
          <MapGroupLetter groups={group} overflowX={overflowX} />
          <MapHighLightedGroupLetter highlightedGroups={highlighted_group} overflowX={overflowX} />
          {event_trailer?.text && (
            <p className="text-red-500 ml-1 text-base font-quicksand font-semibold text-center">
              {event_trailer?.text}
            </p>
          )}
        </div>
      </div>
      {description && <p className="text-xs sm:text-sm font-medium -mt-[0.4rem]">{description}</p>}
    </div>
  );
};
