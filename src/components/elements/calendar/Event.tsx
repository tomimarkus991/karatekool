import { clsx } from "clsx";
import { format, parseISO, eachDayOfInterval, eachWeekOfInterval, isSameDay } from "date-fns";
// eslint-disable-next-line import/no-duplicates
import { et } from "date-fns/locale";

import { rowWidthInPercent } from "app-constants";
import { EventData } from "types";

interface Props {
  event: EventData;
  date: Date;
}

export const Event = ({ event, date }: Props) => {
  const { all_day_event, is_highlighted, group, long_event_end, multi_day_event } = event;
  const start = parseISO(event.start);

  if (long_event_end && multi_day_event && long_event_end) {
    const longEventEnd = parseISO(long_event_end);

    const eachDayOfLongEvents = eachDayOfInterval({
      start,
      end: longEventEnd,
    });

    const longEventWeekStartDays = eachWeekOfInterval({
      start,
      end: longEventEnd,
    });

    const eventDuration = eachDayOfLongEvents.length;

    let width = "";

    if (eventDuration <= 300) {
      width = `${eventDuration * 100}%`;
    } else {
      width = `${eventDuration * rowWidthInPercent}%`;
    }
    // const width = `${eventDuration * rowWidthInPercent}%`;
    // const left = `${getDay(start) * rowWidthInPercent}%`;
    const left = "0%";

    if (
      isSameDay(longEventWeekStartDays[1], date) ||
      isSameDay(longEventWeekStartDays[2], date) ||
      isSameDay(longEventWeekStartDays[3], date)
    ) {
      return (
        <div
          style={{ width, left }}
          className={clsx("bg-blue-600 mt-4 ml-2 rounded-md", "absolute")}
        >
          <p className="text-white text-sm font-medium ml-2">{multi_day_event.title}</p>
        </div>
      );
    }

    if (isSameDay(start, date)) {
      return (
        <div
          style={{ width, left }}
          className={clsx("bg-blue-600 mt-4 ml-2 rounded-md", "absolute")}
        >
          <p className="text-white text-sm font-medium ml-2">{multi_day_event.title}</p>
        </div>
      );
    }
  }

  if (all_day_event && isSameDay(start, date)) {
    return (
      <div className="text-center flex flex-col justify-center flex-grow">
        <p className="text-blue-600">{all_day_event.title}</p>
        <p className="text-sm">{all_day_event.sub_title}</p>
      </div>
    );
  }
  if (isSameDay(start, date)) {
    return (
      <div className="flex flex-row">
        <p className={clsx("mr-1 w-10 text-right", is_highlighted && "underline text-red-500")}>
          {format(start, "HH:mm", { locale: et })}
        </p>
        <div className="flex">
          {group.map(_group => {
            return (
              <p className="ml-1" style={{ color: _group?.color }} key={_group?.letter}>
                {_group?.letter}
              </p>
            );
          })}
          <p className="text-red-500 ml-1">{event?.event_trailer?.text}</p>
        </div>
      </div>
    );
  }

  return <></>;
};
