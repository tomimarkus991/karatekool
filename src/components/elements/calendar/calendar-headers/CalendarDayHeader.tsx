"use client";

import clsx from "clsx";
import { addMonths, format, subDays } from "date-fns";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { AnimationWrapper, animations } from "../../../animations";
import { calendarUtils } from "../calendarUtils";

interface Props {
  setDirection: Dispatch<SetStateAction<number | undefined>>;
  currentMonthString: string;
  setCurrentMonthString: Dispatch<SetStateAction<string>>;
  currentDayString: string;
  setCurrentDayString: Dispatch<SetStateAction<string>>;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
  isAnimating: boolean;
  firstDayOfCurrentMonth: Date;
  direction: number | undefined;
}
// header needs to have a way to change the current month
// header needs to display current day and on arrow press change the current day
export const CalendarDayHeader = ({
  setCurrentDayString,
  setDirection,
  setIsAnimating,
  isAnimating,
  currentDayString,
  currentMonthString,
  setCurrentMonthString,
  firstDayOfCurrentMonth,
  direction,
}: Props) => {
  const { currentMonthType, removeImmediately } = calendarUtils;

  const previousDay = () => {
    if (isAnimating) return;

    setDirection(-1);
    setIsAnimating(true);

    const previous = subDays(firstDayOfCurrentMonth, 1);
    setCurrentDayString(format(previous, currentMonthType));
  };

  const nextDay = () => {
    if (isAnimating) return;

    setDirection(1);
    setIsAnimating(true);

    const next = addMonths(firstDayOfCurrentMonth, 1);
    setCurrentDayString(format(next, currentMonthType));
  };

  // splice first letter, make it uppercase and then add the rest of the string
  const beautifulCurrentMonth = (
    currentMonthString.slice(0, 1).toUpperCase() + currentMonthString.slice(1)
  ).slice(0, -5);

  return (
    <div className="flex items-center justify-center">
      <header className="relative my-6 flex justify-between items-center max-w-fit min-w-[18rem]">
        <motion.button
          variants={removeImmediately}
          className={clsx("z-10 rounded-full cursor-pointer")}
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
          <p>{beautifulCurrentMonth}</p>
        </motion.p>
        <motion.button
          variants={removeImmediately}
          className={clsx("z-10 rounded-full cursor-pointer")}
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
  );
};
