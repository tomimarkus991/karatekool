import { isSameDay, parseISO } from "date-fns";

import { EventData } from "types";

interface Props {
  event: EventData;
  date: Date;
}

export const AllDayEvent = ({ event, date }: Props) => {
  const { all_day_event } = event;
  const start = parseISO(event.start);

  if (!isSameDay(start, date) || !all_day_event) {
    return <></>;
  }

  return (
    <div className="text-center flex flex-col justify-center flex-grow">
      <p className="text-blue-600 mb-3 text-xs md:text-base">{all_day_event.title}</p>
      <p className="text-xs2">{all_day_event.sub_title}</p>
    </div>
  );
};
