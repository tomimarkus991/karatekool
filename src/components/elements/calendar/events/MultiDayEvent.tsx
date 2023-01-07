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
import { motion } from "framer-motion";
import { RectReadOnly } from "react-use-measure";

import { EventData, SMultiDayEvent } from "types";

interface Props {
  event: EventData;
  date: Date;
  bounds: RectReadOnly;
}

interface ChildProps {
  width: number;
  multi_day_event: SMultiDayEvent;
}

const Child = ({ width, multi_day_event }: ChildProps) => {
  const { title } = multi_day_event;

  return (
    <motion.div
      initial="enter"
      animate="middle"
      exit="exit"
      variants={{ enter: { opacity: 0 }, middle: { opacity: 1 }, exit: { opacity: 0 } }}
      style={{ width }}
      className={clsx("bg-blue-600 mt-4 ml-2 rounded-md left-0", "absolute")}
    >
      <p className="text-white text-left text-sm font-medium ml-2 whitespace-nowrap overflow-ellipsis overflow-hidden">
        {title}
      </p>
    </motion.div>
  );
};

export const MultiDayEvent = ({ event, date, bounds }: Props) => {
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
  // 4 days * calendar date width - 24 (margin)
  const width = longEventLengthForWeek * bounds.width - 24;

  if (longEventWeekStartDays.some(day => isSameDay(day, date))) {
    return <Child multi_day_event={multi_day_event} width={width} />;
  }

  if (!isSameDay(start, date)) {
    return <></>;
  }

  // when multi day event doesn't go over multiple weeks
  return <Child multi_day_event={multi_day_event} width={width} />;
};
