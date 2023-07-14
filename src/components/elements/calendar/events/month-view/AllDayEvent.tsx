import { isSameDay, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { HiTrash, HiX } from "react-icons/hi";

import { AnimationWrapper, animations, RealButton } from "@/components";
import { useDeleteCalendarAllDayEvent, useUser } from "@/hooks";
import { EventData } from "@/types";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../../../Popover";

interface Props {
  event: EventData;
  date: Date;
}

interface AllDayEventCalendarDisplayProps {
  title: string;
  sub_title: string;
}

export const AllDayEventCalendarDisplay = ({
  title,
  sub_title,
}: AllDayEventCalendarDisplayProps) => (
  <>
    {/* when changing this also change below */}
    {/* src/components/elements/calendar/event-creation/EventCreationTabs.tsx */}
    <p
      id="all-day-event"
      className="mb-3 text-xs text-blue-600 sm:text-base sm:mb-1 xs:text-sm md:text-lg"
    >
      {title}
    </p>
    <p id="all-day-event" className="text-xs2 xs:text-xs sm:text-sm">
      {sub_title}
    </p>
  </>
);

export const AllDayEvent = ({ event, date }: Props) => {
  const { all_day_event } = event;
  const start = parseISO(event.start);
  const { mutate: deleteEvent } = useDeleteCalendarAllDayEvent();

  const { data: user } = useUser();

  if (!isSameDay(start, date) || !all_day_event) {
    return <></>;
  }
  const { title, sub_title, id } = all_day_event;

  return (
    <Popover>
      <PopoverTrigger>
        <motion.div
          id="all-day-event"
          initial="enter"
          animate="middle"
          exit="exit"
          variants={{
            enter: { opacity: 0 },
            middle: { opacity: 1, transition: { opacity: { duration: 0.5 } } },
            exit: { opacity: 0 },
          }}
          className="flex flex-col justify-center flex-grow text-center bg-white hover:bg-stone-50 rounded-2xl"
        >
          <AllDayEventCalendarDisplay
            title={event.all_day_event?.title || ""}
            sub_title={event.all_day_event?.sub_title || ""}
          />
        </motion.div>
      </PopoverTrigger>
      <PopoverContent className="max-w-xs lg:max-w-sm">
        <div className="flex flex-row">
          <Popover>
            <PopoverTrigger>
              {user?.role === "admin" && (
                <AnimationWrapper
                  className="self-center mr-2 cursor-pointer"
                  variants={animations.smallScaleXs}
                >
                  <HiTrash className="w-6 h-6 text-red-600" />
                </AnimationWrapper>
              )}
            </PopoverTrigger>
            <PopoverContent className="z-50 p-4">
              <div className="flex flex-col">
                <p className="mb-4 text-xl font-semibold text-center">
                  Oled kindel, et soovid seda kustutada?
                </p>
                <div className="flex flex-row">
                  <PopoverClose>
                    <RealButton className="ml-4" variant="orange">
                      Tagasi
                    </RealButton>
                  </PopoverClose>
                  <RealButton className="ml-4" variant="red" onClick={() => deleteEvent({ id })}>
                    Kustuta
                  </RealButton>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <div className="text-center">
            <p className="text-lg text-blue-600">{title}</p>
            <p className="text-sm">{sub_title}</p>
          </div>

          <PopoverClose>
            <AnimationWrapper
              className="self-center ml-2 cursor-pointer"
              variants={animations.smallScaleXs}
            >
              <HiX className="self-center w-8 h-8 cursor-pointer text-stone-800" />
            </AnimationWrapper>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
