import { isSameDay, parseISO } from "date-fns";

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

  return (
    <div className="flex flex-col justify-start">
      <div className="flex flex-row justify-start items-center">
        <NormalEventTime event={event} />
        <div className="flex">
          <MapGroupLetter groups={group} />
          <MapHighLightedGroupLetter highlightedGroups={highlighted_group} />
          <p className="text-red-500 ml-1">{event_trailer?.text}</p>
        </div>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
};
