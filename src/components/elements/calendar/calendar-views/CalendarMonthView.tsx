import clsx from "clsx";
import {
  addMonths,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
  parse,
  startOfWeek,
  subMonths,
} from "date-fns";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { days } from "@/app-constants";
import { CalendarDate, animations, calendarUtils, AnimationWrapper } from "@/components";
import { useIsMobile } from "@/hooks";
import { EventData } from "@/types";

import { nextTimeFrame, previousTimeFrame } from "./utils";

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

  const previousMonth = () =>
    previousTimeFrame({
      current: firstDayOfCurrentMonth,
      currentType: currentMonthType,
      setCurrentString: setCurrentMonthString,
      setDirection,
      isAnimating,
      setIsAnimating,
      subFunction: subMonths,
    });

  const nextMonth = () =>
    nextTimeFrame({
      current: firstDayOfCurrentMonth,
      currentType: currentMonthType,
      setCurrentString: setCurrentMonthString,
      setDirection,
      isAnimating,
      setIsAnimating,
      addFunction: addMonths,
    });

  // splice first letter, make it uppercase and then add the rest of the string
  const beautifulCurrentMonth =
    currentMonthString.slice(0, 1).toUpperCase() + currentMonthString.slice(1);
  return (
    <>
      <div className="flex items-center justify-center">
        <header className="relative my-6 flex justify-between items-center max-w-fit min-w-[18rem]">
          <motion.button
            variants={removeImmediately}
            className={clsx("z-10 rounded-full cursor-pointer")}
            onClick={previousMonth}
          >
            <AnimationWrapper variants={animations.smallScale}>
              <HiChevronLeft className="w-6 h-6 text-gray-600" />
            </AnimationWrapper>
          </motion.button>
          <motion.p
            variants={animations.calendar.header}
            custom={direction}
            className="min-w-[8rem] absolute inset-0 flex items-center justify-center font-semibold text-lg"
          >
            <p>{beautifulCurrentMonth}</p>
          </motion.p>
          <motion.button
            variants={removeImmediately}
            className={clsx("z-10 rounded-full cursor-pointer")}
            onClick={nextMonth}
          >
            <AnimationWrapper variants={animations.smallScale}>
              <HiChevronRight className="w-6 h-6 text-gray-600" />
            </AnimationWrapper>
          </motion.button>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 20%, transparent 30%, transparent 70%, white 80%)",
            }}
          />
        </header>
      </div>

      <motion.div variants={removeImmediately} className="grid grid-cols-7 font-semibold">
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
                className="grid grid-cols-7 border-t h-52 first:border-t-0 last:border-b-0 border-stone-100"
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
