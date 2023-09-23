"use client";

import { format, isSameMonth, isToday } from "date-fns";
import { useState } from "react";
import useMeasure from "react-use-measure";

import {
  AllDayEvent,
  AnimationWrapper,
  MultiDayEvent,
  NormalEvent,
  animations,
} from "@/components";
import { useUser } from "@/hooks";
import { cn } from "@/lib";
import { EventData, EventTypes } from "@/types";

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
            "border-stone-100 border-r first:border-l overflow-y-hidden",
            user?.role === "admin" && "hover:border-secondary hover:border",
          )}
          onClick={(e: any) => {
            console.log(e.target.id);

            if (user?.role === "admin") {
              if (e.target.id === "open-creation-modal") {
                openModal();
              }
            }
          }}
        >
          <div id="open-creation-modal" className={cn("flex flex-col h-full")}>
            {/* <PlusCircle
              size={40}
              className={cn( 
                user?.role === "admin" &&
                  "absolute opacity-5 text-stone-500 ml-automr-auto h-full left-0 right-0 text-center",
              )}
            /> */}
            <AnimationWrapper
              id="open-creation-modal"
              className={cn("flex justify-center")}
              variants={user?.role === "admin" ? animations.smallScale : undefined}
            >
              <time
                id="open-creation-modal"
                className={cn(
                  "font-number font-medium text-[0.6rem] sm:text-sm md:text-base",
                  isToday(date)
                    ? // ? "text-white bg-primary h-4 w-4 sm:h-5 sm:w-5 rounded-full text-center"
                      "text-primary"
                    : `${!isSameMonth(date, month) ? "text-stone-300" : "text-text-primary"}`,
                )}
                dateTime={format(date, "dd-MM-yyyy")}
              >
                {date.getDate()}
              </time>
            </AnimationWrapper>

            <div
              id="open-creation-modal"
              className="relative flex flex-col flex-grow flex-shrink-0 h-full"
            >
              {events.map(event => (
                <>
                  {event.event_type === EventTypes.MULTI_DAY && (
                    <MultiDayEvent event={event} date={date} bounds={bounds} />
                  )}
                  {event.event_type === EventTypes.ALL_DAY && (
                    <AllDayEvent event={event} date={date} />
                  )}
                  {event.event_type === EventTypes.NORMAL && (
                    <NormalEvent key={event.id + event.event_type} event={event} date={date} />
                  )}
                </>
              ))}
            </div>
          </div>
        </button>
      }
    />
  );
};
