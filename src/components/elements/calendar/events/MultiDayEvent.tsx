import { clsx } from "clsx";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
  format,
  isSameDay,
  parseISO,
  startOfWeek,
} from "date-fns";

import { EventData, SMultiDayEvent } from "types";

interface Props {
  event: EventData;
  date: Date;
}

interface ChildProps {
  width: string;
  multi_day_event: SMultiDayEvent;
}

const Child = ({ width, multi_day_event }: ChildProps) => {
  const { title } = multi_day_event;

  return (
    <div style={{ width }} className={clsx("bg-blue-600 mt-4 ml-2 rounded-md left-0", "absolute")}>
      <p className="text-white text-sm font-medium ml-2 whitespace-nowrap overflow-ellipsis overflow-hidden">
        {title}
      </p>
    </div>
  );
};

export const MultiDayEvent = ({ event, date }: Props) => {
  const { long_event_end, multi_day_event } = event;
  const start = parseISO(event.start);

  // return nothing if these are null
  if (!long_event_end || !multi_day_event) {
    return <></>;
  }

  const longEventEnd = parseISO(long_event_end);

  const longEventWeekStartDays = eachWeekOfInterval({
    start,
    end: longEventEnd,
  });

  // remove the first day of the week, because we don't want it to be rendered and it will be rendered later
  longEventWeekStartDays.shift();

  const eachDayOfLongEvents = eachDayOfInterval({
    start,
    end: longEventEnd,
  }).map(day => format(day, "dd-MM-yyyy"));

  const weekDays = eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  }).map(day => format(day, "dd-MM-yyyy"));

  const longEventLengthForWeek = eachDayOfLongEvents.filter(eventDay =>
    weekDays.includes(eventDay)
  ).length;

  const width = `${longEventLengthForWeek * 100}%`;

  if (longEventWeekStartDays.some(day => isSameDay(day, date))) {
    return <Child multi_day_event={multi_day_event} width={width} />;
  }

  if (!isSameDay(start, date)) {
    return <></>;
  }

  // when multi day event doesn't go over multiple weeks
  return <Child multi_day_event={multi_day_event} width={width} />;
};
