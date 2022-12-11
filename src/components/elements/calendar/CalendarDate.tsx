import { clsx } from "clsx";
import { eachDayOfInterval, format, isSameDay, parseISO } from "date-fns";

import { EventData } from "types";

import { Event } from ".";

interface Props {
  events: EventData[];
  date: Date;
}

export const CalendarDate = ({ events, date }: Props) => {
  return (
    <div className={clsx("w-32 h-32 border-t border-gray-200 m-auto")}>
      <div className="flex-col">
        <div className="flex justify-between">
          <time dateTime={format(date, "dd-MM-yyyy")}>{date.getDate()}</time>
        </div>
        <div>
          {events.map(event => {
            const start = parseISO(event.start);

            if (event.long_event_end) {
              const end = parseISO(event.long_event_end);

              const longEvent = eachDayOfInterval({
                start,
                end,
              });
              console.log("1234 longEvent", longEvent);
            }

            return isSameDay(start, date) && <Event key={event.id} event={event} start={start} />;
          })}
        </div>
      </div>
    </div>
  );
};
