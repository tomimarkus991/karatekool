"use client";

import clsx from "clsx";
import { subMonths, format, addMonths } from "date-fns";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { AnimationWrapper, animations } from "../../../animations";
import { calendarUtils } from "../calendarUtils";

interface Props {
  setDirection: Dispatch<SetStateAction<number | undefined>>;
  setCurrentMonthString: Dispatch<SetStateAction<string>>;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
  isAnimating: boolean;
  currentMonthString: string;
  firstDayOfCurrentMonth: Date;
  direction: number | undefined;
}

export const CalendarMonthHeader = ({
  setCurrentMonthString,
  setDirection,
  setIsAnimating,
  isAnimating,
  currentMonthString,
  firstDayOfCurrentMonth,
  direction,
}: Props) => {
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
  );
};
