import { eachDayOfInterval, eachWeekOfInterval, endOfWeek, parse, startOfWeek } from "date-fns";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

import { days } from "@/app-constants";
import { CalendarDate, animations, calendarUtils } from "@/components";
import { useIsMobile } from "@/hooks";
import { EventData } from "@/types";

import { CalendarMonthHeader } from "../calendar-headers";

interface Props {
  setDirection: Dispatch<SetStateAction<number | undefined>>;
  setCurrentMonthString: Dispatch<SetStateAction<string>>;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
  isAnimating: boolean;
  currentMonthString: string;
  firstDayOfCurrentMonth: Date;
  direction: number | undefined;
  isFetched: boolean;
  firstDayOfCalendarMonth: Date;
  lastDayOfCalendarMonth: Date;
  events: EventData[];
}

export const CalendarMonthView = ({
  setCurrentMonthString,
  setDirection,
  setIsAnimating,
  isAnimating,
  currentMonthString,
  firstDayOfCurrentMonth,
  direction,
  isFetched,
  firstDayOfCalendarMonth,
  lastDayOfCalendarMonth,
  events,
}: Props) => {
  const { currentMonthType, removeImmediately } = calendarUtils;
  const weeks = eachWeekOfInterval({
    start: firstDayOfCalendarMonth,
    end: lastDayOfCalendarMonth,
  });
  const month = parse(currentMonthString, currentMonthType, new Date());
  const { isMobile } = useIsMobile();
  return (
    <>
      <CalendarMonthHeader
        setCurrentMonthString={setCurrentMonthString}
        setDirection={setDirection}
        setIsAnimating={setIsAnimating}
        isAnimating={isAnimating}
        direction={direction}
        currentMonthString={currentMonthString}
        firstDayOfCurrentMonth={firstDayOfCurrentMonth}
      />
      <motion.div
        variants={removeImmediately}
        className="grid grid-cols-7 font-semibold font-catamaran"
      >
        {isMobile ? (
          <>
            {days.short.map(day => (
              <div key={day} className="flex justify-center">
                <p className="text-stone-500">{day}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            {days.long.map(day => (
              <div key={day} className="flex justify-center">
                <p className="text-stone-500">{day}</p>
              </div>
            ))}
          </>
        )}
      </motion.div>
      <motion.div variants={animations.calendar.view} custom={direction}>
        <div className="grid grid-rows-5">
          {weeks.map(week => {
            const daysForWeek = eachDayOfInterval({
              start: startOfWeek(week),
              end: endOfWeek(week),
            });
            return (
              <div
                id="week"
                key={week.toISOString()}
                className="grid h-32 grid-cols-7 border-t first:border-t-0 last:border-b-0 border-stone-100"
              >
                {daysForWeek.map(day => {
                  return (
                    <CalendarDate
                      key={day.toISOString()}
                      events={events}
                      date={day}
                      month={month}
                      isFetched={isFetched}
                      isAnimating={isAnimating}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};
