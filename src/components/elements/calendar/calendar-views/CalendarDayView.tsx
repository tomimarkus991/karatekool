"use client";

import { getHours, getMinutes } from "date-fns";
import { Dispatch, SetStateAction } from "react";

import { cn } from "@/lib";

import { CalendarDayHeader } from "../calendar-headers";

interface Props {
  setDirection: Dispatch<SetStateAction<number | undefined>>;
  setCurrentMonthString: Dispatch<SetStateAction<string>>;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
  isAnimating: boolean;
  currentMonthString: string;
  direction: number | undefined;
}

export const CalendarDayView = ({
  setCurrentMonthString,
  setDirection,
  setIsAnimating,
  isAnimating,
  currentMonthString,
  direction,
}: Props) => {
  const currentHour = getHours(new Date());
  const currentMinutes = getMinutes(new Date());

  const arrayOfHours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  ];

  return (
    <>
      <CalendarDayHeader
        setCurrentMonthString={setCurrentMonthString}
        direction={direction}
        setDirection={setDirection}
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
        currentMonthString={currentMonthString}
      />

      <div className="py-6">
        <div className="flex flex-row">
          <div className="w-10 pr-3 ml-2 justify-self-start">
            {arrayOfHours.map(hour => {
              return (
                <div key={hour} className="relative flex self-end h-14">
                  <div className="absolute -top-3">{hour}.00</div>
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
              <div
                className={cn(
                  "absolute left-0 w-full border-t-2 border-primary rounded-lg",
                  `top-[1235px]`
                )}
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
      </div>
    </>
  );
};
