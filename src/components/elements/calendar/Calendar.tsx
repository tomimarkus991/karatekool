"use client";

import { endOfMonth, endOfWeek, format, formatISO9075, parse, startOfWeek } from "date-fns";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { MdOutlineCalendarViewMonth, MdOutlineViewDay } from "react-icons/md";

import {
  AnimationWrapper,
  CalendarFilterButtons,
  RealButton,
  ResizablePanel,
  animations,
  calendarUtils,
} from "@/components";
import { useGetCurrentMonthEvents, useIsMobile, useUser } from "@/hooks";

import { LetterDecryptor } from "../LetterDecryptor";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";

import { CalendarDayView, CalendarMonthView } from "./calendar-views";

type CalendarViewType = "Day" | "Month";

interface CalendarViewProps {
  type: CalendarViewType;
  onClick: () => void;
  Icon: IconType;
}

const CalendarView = ({ type, onClick, Icon }: CalendarViewProps) => {
  let translatedType;
  if (type === "Day") translatedType = "Päev";
  else if (type === "Month") translatedType = "Kuu";
  return (
    <AnimationWrapper
      variants={animations.buttonGhost}
      className="cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-start py-2 rounded-lg hover:bg-gray-100">
        <button className="flex flex-row items-center">
          <Icon className="w-4 h-4 ml-2 fill-[#b4b4b4]" />
          <p className="text-sm text-semibold ml-4 text-[#818181]">{translatedType}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export const Calendar = () => {
  const { currentMonthType, currentDayType } = calendarUtils;
  const { isMobile } = useIsMobile();
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<number>();

  const [calendarType, setCalendarType] = useState<CalendarViewType>("Month");
  const [currentMonthString, setCurrentMonthString] = useState(
    format(new Date(), currentMonthType)
  );
  const [currentDayString, setCurrentDayString] = useState(format(new Date(), currentDayType));
  const { data: user } = useUser();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const calendarRef = useRef(null!);

  const firstDayOfCurrentMonth = parse(currentMonthString, currentMonthType, new Date());
  const currentDay = parse(currentDayString, currentDayType, new Date());

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
            <div className="flex items-center justify-between mx-4 mb-2 xs2:mb-6">
              <h1 className="flex justify-start text-xl font-semibold">
                <LetterDecryptor>Treeninggraafikud</LetterDecryptor>
              </h1>
              <div className="flex">
                {user?.role === "admin" && (
                  <Link href="/loo-trenn" className="hidden mr-4 xs2:block">
                    <RealButton className="px-6" variant="orange">
                      Loo trenn
                    </RealButton>
                  </Link>
                )}
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
                      {/* <CalendarView
                        onClick={() => setCalendarType("Week")}
                        type="Week"
                        Icon={MdOutlineViewWeek}
                      /> */}
                      <CalendarView
                        onClick={() => setCalendarType("Month")}
                        type="Month"
                        Icon={MdOutlineCalendarViewMonth}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {user?.role === "admin" && (
              <Link href="/loo-trenn" className="mb-3 xs2:hidden">
                <RealButton className="px-6" variant="orange">
                  Loo trenn
                </RealButton>
              </Link>
            )}

            <CalendarFilterButtons
              calendarRef={calendarRef}
              currentMonthString={currentMonthString}
            />
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
                    // only fetch events if the current month is different from the previous one

                    if (
                      currentMonthString.split(" ")[0] !==
                      format(new Date(), currentMonthType).split(" ")[0]
                    ) {
                      fetchEvents();
                    }
                  }}
                >
                  <motion.div
                    id="calendarDay"
                    key={currentDayString}
                    initial="enter"
                    animate="middle"
                    exit="exit"
                  >
                    {calendarType === "Day" && (
                      <CalendarDayView
                        currentDayString={currentDayString}
                        setCurrentDayString={setCurrentDayString}
                        currentDay={currentDay}
                        currentMonthString={currentMonthString}
                        setCurrentMonthString={setCurrentMonthString}
                        direction={direction}
                        setDirection={setDirection}
                        isAnimating={isAnimating}
                        setIsAnimating={setIsAnimating}
                        events={events}
                        fetchEvents={fetchEvents}
                      />
                    )}
                  </motion.div>
                  {/* {calendarType === "Week" && <CalendarWeekView />} */}
                  <motion.div
                    id="calendarMonth"
                    key={currentMonthString}
                    initial="enter"
                    animate="middle"
                    exit="exit"
                  >
                    {calendarType === "Month" && (
                      <CalendarMonthView
                        currentMonthString={currentMonthString}
                        setCurrentMonthString={setCurrentMonthString}
                        direction={direction}
                        setDirection={setDirection}
                        isAnimating={isAnimating}
                        setIsAnimating={setIsAnimating}
                        firstDayOfCurrentMonth={firstDayOfCurrentMonth}
                        firstDayOfCalendarMonth={firstDayOfCalendarMonth}
                        lastDayOfCalendarMonth={lastDayOfCalendarMonth}
                        isFetched={isFetched}
                        events={events}
                      />
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
