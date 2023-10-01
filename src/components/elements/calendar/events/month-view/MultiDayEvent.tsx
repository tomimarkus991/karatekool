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

import { DeleteEventPopoverContent } from "@/components";
import { useDeleteCalendarMultiDayEvent } from "@/hooks";
import { cn } from "@/lib";
import { EventData, SMultiDayEvent } from "@/types";

import { Popover, PopoverTrigger } from "../../../Popover";

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
  const { title, id } = multi_day_event;
  const { mutate: deleteEvent } = useDeleteCalendarMultiDayEvent();

  return (
    <Popover>
      <motion.div
        initial="enter"
        animate="middle"
        exit="exit"
        variants={{
          enter: { opacity: 0 },
          middle: { opacity: 1, transition: { opacity: { duration: 0.5 } } },
          exit: { opacity: 0 },
        }}
        style={{ width }}
        className={cn(
          "border-blue-600 border-2 mt-2 ml-2 rounded-md cursor-pointer hover:border-blue-500 z-10",
          "relative",
        )}
      >
        <PopoverTrigger style={{ width }} className="relative">
          <p
            id="multi-day-event"
            className="py-2 ml-2 overflow-hidden text-base font-medium text-center text-text-primary whitespace-nowrap overflow-ellipsis"
          >
            {title}
          </p>
        </PopoverTrigger>
      </motion.div>

      <DeleteEventPopoverContent deleteEvent={() => deleteEvent({ id })}>
        <p className="text-center">{title}</p>
      </DeleteEventPopoverContent>
    </Popover>
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
    weekDays.includes(eventDay),
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
