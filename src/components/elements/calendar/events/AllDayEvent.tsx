import { isSameDay, parseISO } from "date-fns";
import { motion } from "framer-motion";

import { EventData } from "@/types";

import { Popover, PopoverContent, PopoverTrigger } from "../../Popover";

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

  if (!isSameDay(start, date) || !all_day_event) {
    return <></>;
  }
  const { title, sub_title } = all_day_event;

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
        <div className="text-center">
          <p className="text-lg text-blue-600">{title}</p>
          <p className="text-sm">{sub_title}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};
