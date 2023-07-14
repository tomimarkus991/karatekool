import { isSameDay, parseISO } from "date-fns";
import { motion } from "framer-motion";

import { useDeleteCalendarAllDayEvent } from "@/hooks";
import { EventData } from "@/types";

import { Popover, PopoverTrigger } from "../../../Popover";
import { DeleteEventPopoverContent } from "../../event-deletion";

interface Props {
  event: EventData;
  date: Date;
}

export const AllDayEvent = ({ event, date }: Props) => {
  const { all_day_event } = event;
  const start = parseISO(event.start);
  const { mutate: deleteEvent } = useDeleteCalendarAllDayEvent();

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
          <>
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
        </motion.div>
      </PopoverTrigger>

      <DeleteEventPopoverContent deleteEvent={() => deleteEvent({ id })}>
        <div className="text-center">
          <p className="text-lg text-blue-600">{title}</p>
          <p className="text-sm">{sub_title}</p>
        </div>
      </DeleteEventPopoverContent>
    </Popover>
  );
};
