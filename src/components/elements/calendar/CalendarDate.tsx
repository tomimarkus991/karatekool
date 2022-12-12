import { clsx } from "clsx";
import { format } from "date-fns";

import { EventData } from "types";

import { Event } from ".";

interface Props {
  events: EventData[];
  date: Date;
}

export const CalendarDate = ({ events, date }: Props) => {
  return (
    <div
      className={clsx(
        "w-full h-full border-r first:border-l border-gray-200 m-auto box-border p-1"
      )}
    >
      <div className="flex-col flex h-full">
        <div className="flex justify-center">
          <time dateTime={format(date, "dd-MM-yyyy")}>{date.getDate()}</time>
        </div>
        <div className="flex h-full flex-col relative">
          {events.map(event => {
            return <Event key={event.id} event={event} date={date} />;
          })}
        </div>
      </div>
    </div>
  );
};
