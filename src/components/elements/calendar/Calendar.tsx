import { useIsMobile } from "@redlotus/ui";
import clsx from "clsx";
import {
  addMonths,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  formatISO9075,
  parse,
  startOfWeek,
  subMonths,
} from "date-fns";
import { motion, AnimatePresence, MotionConfig, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { days } from "app-constants";
import { useGetCurrentMonthEvents } from "hooks";

import { CalendarDate, CalendarFilterButtons, calendarUtils, ResizablePanel } from ".";

const variants: Variants = {
  enter: (direction: number) => {
    return { x: `${10 * direction}%`, opacity: 0, transition: { opacity: { duration: 0.5 } } };
  },
  middle: { x: "0%", opacity: 1 },
  exit: (direction: number) => {
    return { x: `${-10 * direction}%`, opacity: 0 };
  },
};
const variantsHeader: Variants = {
  enter: (direction: number) => {
    return { x: `${30 * direction}%`, opacity: 0 };
  },
  middle: { x: "0%", opacity: 1 },
  exit: (direction: number) => {
    return { x: `${-30 * direction}%`, opacity: 0 };
  },
};

export const Calendar = () => {
  const { currentMonthType, removeImmediately } = calendarUtils;
  const { isMobile } = useIsMobile();
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<number>();

  const [currentMonthString, setCurrentMonthString] = useState(
    format(new Date(), currentMonthType)
  );
  const month = parse(currentMonthString, currentMonthType, new Date());

  const firstDayOfCurrentMonth = parse(currentMonthString, currentMonthType, new Date());
  const firstDayOfCalendarMonth = startOfWeek(firstDayOfCurrentMonth);
  const lastDayOfCalendarMonth = endOfWeek(endOfMonth(firstDayOfCurrentMonth));

  const {
    data: events = [],
    refetch: fetchEvents,
    isFetched,
  } = useGetCurrentMonthEvents(
    formatISO9075(firstDayOfCalendarMonth),
    formatISO9075(lastDayOfCalendarMonth)
  );

  const weeks = eachWeekOfInterval({
    start: firstDayOfCalendarMonth,
    end: lastDayOfCalendarMonth,
  });

  const previousMonth = () => {
    if (isAnimating) return;

    setDirection(-1);
    setIsAnimating(true);

    const previous = subMonths(firstDayOfCurrentMonth, 1);
    setCurrentMonthString(format(previous, currentMonthType));
  };

  const nextMonth = () => {
    if (isAnimating) return;

    setDirection(1);
    setIsAnimating(true);

    const next = addMonths(firstDayOfCurrentMonth, 1);
    setCurrentMonthString(format(next, currentMonthType));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <MotionConfig transition={{ ease: "easeInOut", duration: 0.5 }}>
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl bg-white select-none">
        <div className="pt-8">
          <div className="flex flex-col justify-center rounded text-center">
            <h1 className="font-semibold text-xl flex justify-start font-catamaran mb-6 ml-4">
              Treeninggraafikud
            </h1>
            <CalendarFilterButtons />
            <ResizablePanel>
              <AnimatePresence
                mode="popLayout"
                initial={false}
                custom={direction}
                onExitComplete={() => {
                  setIsAnimating(false);
                  // setTimeout(() => {
                  // }, 100);
                  fetchEvents();
                }}
              >
                <motion.div key={currentMonthString} initial="enter" animate="middle" exit="exit">
                  <div className="flex justify-center items-center">
                    <header className="relative my-6 flex justify-between items-center max-w-fit min-w-[20rem]">
                      <motion.button
                        variants={removeImmediately}
                        className={clsx("z-10 rounded-full hover:bg-stone-100 cursor-pointer")}
                        onClick={previousMonth}
                      >
                        <HiChevronLeft className="text-gray-600 h-6 w-6" />
                      </motion.button>
                      <motion.p
                        variants={variantsHeader}
                        custom={direction}
                        className="min-w-[8rem] absolute inset-0 flex items-center justify-center font-catamaran font-semibold text-lg"
                      >
                        <p className="first-letter:uppercase">{currentMonthString}</p>
                      </motion.p>
                      <motion.button
                        variants={removeImmediately}
                        className={clsx("z-10 rounded-full hover:bg-stone-100 cursor-pointer")}
                        onClick={nextMonth}
                      >
                        <HiChevronRight className="text-gray-600 h-6 w-6" />
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
                  <motion.div variants={variants} custom={direction}>
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
                            className="grid grid-cols-7 last:border-b border-t border-stone-100 h-36"
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
                </motion.div>
              </AnimatePresence>
            </ResizablePanel>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};
// const reorder = (result: DropResult, provided: ResponderProvided) => {
//   console.log("12345", result);
//   console.log("123456", provided);

//   if (!result.destination) return;

//   const items = Array.from(events);
//   const [removed] = items.splice(result.source.index, 1);

//   // put it back in the right place
//   items.splice(result.destination.index, 0, removed);
// };
