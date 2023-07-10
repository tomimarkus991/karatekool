"use client";

import { getHours, getMinutes, addDays, subDays } from "date-fns";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { AnimationWrapper, animations } from "@/components";
import { cn } from "@/lib";
import { EventData } from "@/types";

import { calendarUtils } from "../calendarUtils";
import { DayViewEvent } from "../events/day-view";

import { nextTimeFrame, previousTimeFrame } from "./utils";

interface Props {
  currentMonthString: string;
  setCurrentMonthString: Dispatch<SetStateAction<string>>;
  currentDayString: string;
  setCurrentDayString: Dispatch<SetStateAction<string>>;
  isAnimating: boolean;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
  direction: number | undefined;
  setDirection: Dispatch<SetStateAction<number | undefined>>;
  events: EventData[];
  currentDay: Date;
  fetchEvents: () => void;
}

export const CalendarDayView = ({
  currentDayString,
  setCurrentDayString,
  direction,
  setDirection,
  isAnimating,
  setIsAnimating,
  events,
  fetchEvents,
  currentDay,
}: Props) => {
  const currentHour = getHours(new Date());
  const currentMinutes = getMinutes(new Date());

  const { currentDayType, removeImmediately } = calendarUtils;

  const previousDay = () =>
    previousTimeFrame({
      current: currentDay,
      currentType: currentDayType,
      setCurrentString: setCurrentDayString,
      setDirection,
      isAnimating,
      setIsAnimating,
      subFunction: subDays,
      fetchEvents,
      fetchEventsOnlyWhenMonthChanges: true,
    });

  const nextDay = () =>
    nextTimeFrame({
      current: currentDay,
      currentType: currentDayType,
      setCurrentString: setCurrentDayString,
      setDirection,
      isAnimating,
      setIsAnimating,
      addFunction: addDays,
      fetchEvents,
      fetchEventsOnlyWhenMonthChanges: true,
    });

  const arrayOfHours = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", 
    "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",
  ];

  return (
    <>
      <div className="flex items-center justify-center">
        <header className="relative my-6 flex justify-between items-center max-w-fit min-w-[18rem]">
          <motion.button
            variants={removeImmediately}
            className={cn("z-10 rounded-full cursor-pointer")}
            onClick={previousDay}
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
            <p>{currentDayString}</p>
          </motion.p>
          <motion.button
            variants={removeImmediately}
            className={cn("z-10 rounded-full cursor-pointer")}
            onClick={nextDay}
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

      <motion.div className="py-6" variants={animations.calendar.view} custom={direction}>
        <div className="flex flex-row">
          <div className="w-10 pr-3 ml-2 justify-self-start">
            {arrayOfHours.map(hour => {
              return (
                <div key={hour} className="relative flex self-end h-14">
                  <div className="absolute -top-3">{hour}:00</div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col w-2 border-r-[1px] border-gray-600 border-opacity-30">
            {arrayOfHours.map(hour => {
              return (
                <div
                  key={hour}
                  className="flex h-14 border-b-[1px] border-gray-600 border-opacity-30 z-10"
                />
              );
            })}
          </div>
          <div className="relative flex flex-grow">
            <div className="absolute top-0 left-0 w-full h-full">
              {events.map(event => {
                return <DayViewEvent key={event.id} event={event} date={currentDay} />;
              })}
              <div
                className={cn("absolute left-0 w-full border-t-2 border-primary rounded-lg")}
                style={{ top: `${56 * currentHour + currentMinutes}px` }}
              />
            </div>
            <div className="flex flex-col flex-grow">
              {arrayOfHours.map(hour => {
                return (
                  <div
                    className="flex flex-1 flex-grow h-14 border-b-[1px] border-gray-600 border-opacity-30"
                    key={hour}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
