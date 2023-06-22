"use client";

import { clsx } from "clsx";
import { format, isSameMonth, isToday } from "date-fns";
import { MotionConfig } from "framer-motion";
import { useState } from "react";
import { HiX } from "react-icons/hi";
import useMeasure from "react-use-measure";

import { AnimationWrapper, Event, Modal, ResizablePanel, animations } from "@/components";
import { useUser } from "@/hooks";
import { EventData } from "@/types";

import { cn } from "../../../lib";

import { EventCreationTabs } from ".";

interface Props {
  events: EventData[];
  date: Date;
  month: Date;
  isFetched: boolean;
  isAnimating: boolean;
}

const transition = { type: "ease", ease: "easeInOut", duration: 1 };

export const CalendarDate = ({ events, date, month }: Props) => {
  const [ref, bounds] = useMeasure();
  const { data: user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      setOpen={setIsModalOpen}
      maxWidth="2xl"
      closeOnOverlayClick={false}
      modalButton={
        <button
          ref={ref}
          className={cn(
            "w-full h-full m-auto box-border p-[0.1rem] sm:p-1",
            "border-stone-100 border-r first:border-l",
            "hover:border-secondary hover:border"
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
                className={clsx(
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
    >
      <>
        <MotionConfig transition={transition}>
          <div className="relative overflow-hidden">
            <ResizablePanel duration={transition.duration}>
              <div className="flex flex-row items-center justify-between pt-6 px-7">
                <p className="text-xl font-bold">Loo trenn</p>
                <div role="button" tabIndex={0} onClick={closeModal}>
                  <AnimationWrapper key="sub-modal-x-icon" variants={animations.rotate360}>
                    <HiX className="w-8 h-8 fill-stone-700 hover:fill-stone-800" />
                  </AnimationWrapper>
                </div>
              </div>
              <div className="p-10">
                <EventCreationTabs />
              </div>
            </ResizablePanel>
          </div>
        </MotionConfig>
      </>
    </Modal>
  );
};
