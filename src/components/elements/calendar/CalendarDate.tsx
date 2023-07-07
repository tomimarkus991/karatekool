"use client";

import { format, isSameMonth, isToday } from "date-fns";
import { useState } from "react";
import useMeasure from "react-use-measure";

import { AnimationWrapper, Event, animations } from "@/components";
import { useUser } from "@/hooks";
import { cn } from "@/lib";
import { EventData } from "@/types";

import { CalendarEventCreationModal } from ".";

interface Props {
  events: EventData[];
  date: Date;
  month: Date;
  isFetched: boolean;
  isAnimating: boolean;
}

export const CalendarDate = ({ events, date, month }: Props) => {
  const [ref, bounds] = useMeasure();
  const { data: user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <CalendarEventCreationModal
      openDate={date}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      button={
        <button
          ref={ref}
          className={cn(
            "w-full h-full m-auto box-border p-[0.1rem] sm:p-1",
            "border-stone-100 border-r first:border-l",
            user?.role === "admin" && "hover:border-secondary hover:border"
          )}
          onClick={(e: any) => {
            if (user?.role === "admin") {
              if (
                e.target.id !== "multi-day-event" &&
                e.target.id !== "all-day-event" &&
                e.target.id !== "normal-event"
              ) {
                openModal();
              }
            }
          }}
        >
          <div className="flex flex-col h-full">
            <AnimationWrapper
              className={cn(
                "flex justify-center",
                user?.role === "admin" && "hover:bg-stone-50 rounded-2xl"
              )}
              variants={user?.role === "admin" ? animations.smallScale : undefined}
            >
              <time
                className={cn(
                  "font-number font-medium text-xs sm:text-sm md:text-base",
                  isToday(date)
                    ? // ? "text-white bg-primary h-4 w-4 sm:h-5 sm:w-5 rounded-full text-center"
                      "text-primary"
                    : `${!isSameMonth(date, month) ? "text-stone-300" : "text-text-primary"}`
                )}
                dateTime={format(date, "dd-MM-yyyy")}
              >
                {date.getDate()}
              </time>
            </AnimationWrapper>

            <div className="relative flex flex-col h-full">
              {events.map(event => {
                return <Event key={event.id} event={event} date={date} bounds={bounds} />;
              })}
            </div>
          </div>
        </button>
      }
    />
  );
};
