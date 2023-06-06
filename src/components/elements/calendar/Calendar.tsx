"use client";

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
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { HiChevronLeft, HiChevronRight, HiDotsVertical } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { MdOutlineViewDay, MdOutlineCalendarViewMonth, MdOutlineViewWeek } from "react-icons/md";
import { useScreenshot, createFileName } from "use-react-screenshot";

import { days } from "@/app-constants";
import {
  AnimationWrapper,
  CalendarDate,
  CalendarFilterButtons,
  ResizablePanel,
  animations,
  calendarUtils,
} from "@/components";
import { useCalendarFilters } from "@/context";
import { useGetCurrentMonthEvents, useIsMobile } from "@/hooks";

import { LetterDecryptor } from "../LetterDecryptor";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
interface CalendarViewProps {
  type: "Day" | "Week" | "Month";
  onClick: () => void;
  Icon: IconType;
}

const CalendarView = ({ type, onClick, Icon }: CalendarViewProps) => {
  return (
    <AnimationWrapper
      variants={animations.buttonGhost}
      className="cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-start py-2 rounded-lg hover:bg-gray-100">
        <button className="flex flex-row items-center">
          <Icon className="w-4 h-4 ml-2 fill-[#b4b4b4]" />
          <p className="text-sm text-semibold ml-4 text-[#818181]">{type}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
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

interface CalendarMonthPickerProps {
  setDirection: Dispatch<SetStateAction<number | undefined>>;
  setCurrentMonthString: Dispatch<SetStateAction<string>>;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
  isAnimating: boolean;
  currentMonthString: string;
  firstDayOfCurrentMonth: Date;
  direction: number | undefined;
}

const CalendarMonthPicker = ({
  setCurrentMonthString,
  setDirection,
  setIsAnimating,
  isAnimating,
  currentMonthString,
  firstDayOfCurrentMonth,
  direction,
}: CalendarMonthPickerProps) => {
  const { currentMonthType, removeImmediately } = calendarUtils;

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

  // splice first letter, make it uppercase and then add the rest of the string
  const beautifulCurrentMonth =
    currentMonthString.slice(0, 1).toUpperCase() + currentMonthString.slice(1);

  return (
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
          variants={variantsHeader}
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
  );
};

const variants: Variants = {
  enter: (direction: number) => {
    return { x: `${10 * direction}%`, opacity: 0, transition: { opacity: { duration: 0.5 } } };
  },
  middle: { x: "0%", opacity: 1 },
  exit: (direction: number) => {
    return { x: `${-10 * direction}%`, opacity: 0 };
  },
};

export const Calendar = () => {
  const { currentMonthType, removeImmediately } = calendarUtils;
  const { isMobile } = useIsMobile();
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<number>();
  const { letter } = useCalendarFilters();
  const [calendarType, setCalendarType] = useState<"Day" | "Week" | "Month">("Month");
  const [currentMonthString, setCurrentMonthString] = useState(
    format(new Date(), currentMonthType)
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const calendarRef = useRef(null!);

  const [, takeScreenShot] = useScreenshot({
    type: "image/png",
    quality: 1.0,
  });

  const download = (picture: any) => {
    if (typeof window !== "undefined") {
      const a = document.createElement("a");
      a.href = picture;
      a.download = createFileName(
        "png",
        `kalender-${letter}-${currentMonthString.replaceAll(" ", "-")}`
      );
      a.click();
    }
  };

  const downloadScreenshot = async () => {
    const data = await takeScreenShot(calendarRef.current);
    return download(data);
  };

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

  useEffect(() => {
    fetchEvents();
    if (isMobile) {
      setCalendarType("Day");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MotionConfig transition={{ ease: "easeInOut", duration: 0.5 }}>
      <div className="relative overflow-hidden bg-white select-none rounded-2xl">
        <div className="pt-8">
          <div className="flex flex-col justify-center text-center rounded">
            <div className="flex justify-between mx-4 mb-6">
              <h1 className="flex justify-start text-xl font-semibold">
                <LetterDecryptor>Treeninggraafikud</LetterDecryptor>
              </h1>
              <Popover>
                <PopoverTrigger>
                  <AnimationWrapper variants={animations.smallScale}>
                    <HiDotsVertical className="w-6 h-6 fill-[#b4b4b4] cursor-pointer" />
                  </AnimationWrapper>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col w-40">
                    <CalendarView
                      onClick={() => setCalendarType("Day")}
                      type="Day"
                      Icon={MdOutlineViewDay}
                    />
                    <CalendarView
                      onClick={() => setCalendarType("Week")}
                      type="Week"
                      Icon={MdOutlineViewWeek}
                    />
                    <CalendarView
                      onClick={() => setCalendarType("Month")}
                      type="Month"
                      Icon={MdOutlineCalendarViewMonth}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <CalendarFilterButtons downloadScreenshot={downloadScreenshot} />
            <div ref={calendarRef}>
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
                  <motion.div
                    id="calendar"
                    key={currentMonthString}
                    initial="enter"
                    animate="middle"
                    exit="exit"
                  >
                    {calendarType === "Day" && (
                      <div className="py-5">
                        <p>päev</p>
                      </div>
                    )}
                    {calendarType === "Week" && (
                      <div className="py-5">
                        <p>nädal</p>
                      </div>
                    )}
                    {calendarType === "Month" && (
                      <>
                        <CalendarMonthPicker
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
                    )}
                  </motion.div>
                </AnimatePresence>
              </ResizablePanel>
            </div>
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
