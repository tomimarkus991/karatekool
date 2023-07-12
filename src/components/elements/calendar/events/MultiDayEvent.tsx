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
import { HiTrash, HiX } from "react-icons/hi";
import { RectReadOnly } from "react-use-measure";

import { AnimationWrapper, animations } from "@/components";
import { useDeleteCalendarMultiDayEvent, useUser } from "@/hooks";
import { cn } from "@/lib";
import { EventData, SMultiDayEvent } from "@/types";

import { RealButton } from "../../button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../../Popover";

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

  const { data: user } = useUser();
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
          "bg-blue-600 mt-2 ml-2 rounded-md cursor-pointer hover:bg-blue-500 z-10",
          "relative",
        )}
      >
        <PopoverTrigger style={{ width }} className="relative">
          <p
            id="multi-day-event"
            className="py-2 ml-2 overflow-hidden text-base font-medium text-center text-white whitespace-nowrap overflow-ellipsis"
          >
            {title}
          </p>
        </PopoverTrigger>
      </motion.div>
      <PopoverContent className="max-w-xs lg:max-w-sm">
        <div className="flex flex-row">
          <Popover>
            <PopoverTrigger>
              {user?.role === "admin" && (
                <AnimationWrapper
                  className="self-center mr-2 cursor-pointer"
                  variants={animations.smallScaleXs}
                >
                  <HiTrash className="w-6 h-6 text-red-600" />
                </AnimationWrapper>
              )}
            </PopoverTrigger>
            <PopoverContent className="z-50 p-4">
              <div className="flex flex-col">
                <p className="mb-4 text-xl font-semibold text-center">
                  Oled kindel, et soovid seda kustutada?
                </p>
                <div className="flex flex-row">
                  <PopoverClose>
                    <RealButton className="ml-4" variant="orange">
                      Tagasi
                    </RealButton>
                  </PopoverClose>
                  <RealButton className="ml-4" variant="red" onClick={() => deleteEvent({ id })}>
                    Kustuta
                  </RealButton>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <p className="text-center">{title}</p>

          <PopoverClose>
            <AnimationWrapper
              className="self-center ml-2 cursor-pointer"
              variants={animations.smallScaleXs}
            >
              <HiX className="self-center w-8 h-8 cursor-pointer text-stone-800" />
            </AnimationWrapper>
          </PopoverClose>
        </div>
      </PopoverContent>
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
