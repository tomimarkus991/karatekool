import { clsx } from "clsx";
import { format, isSameMonth, isToday } from "date-fns";
import useMeasure from "react-use-measure";

import { EventData } from "types";

import { Event } from ".";

interface Props {
  events: EventData[];
  date: Date;
  month: Date;
  isFetched: boolean;
  isAnimating: boolean;
}

export const CalendarDate = ({ events, date, month }: Props) => {
  const [ref, bounds] = useMeasure();

  return (
    <div
      ref={ref}
      className={clsx(
        "w-full h-full m-auto box-border p-[0.1rem] sm:p-1",
        "border-stone-100 border-r first:border-l"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-center">
          <time
            className={clsx(
              "font-varela text-xs sm:text-sm md:text-base",
              isToday(date)
                ? // ? "text-white bg-primary h-4 w-4 sm:h-5 sm:w-5 rounded-full text-center"
                  "text-primary"
                : `${!isSameMonth(date, month) ? "text-stone-300" : "text-text-primary"}`
            )}
            dateTime={format(date, "dd-MM-yyyy")}
          >
            {date.getDate()}
          </time>
        </div>

        <div className={clsx("h-full flex-col relative flex")}>
          {events.map(event => {
            return <Event key={event.id} event={event} date={date} bounds={bounds} />;
          })}
        </div>
      </div>
    </div>
  );
};
