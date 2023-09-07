import { isSameDay, parseISO } from "date-fns";
import { motion } from "framer-motion";

import { useCalendarFilters } from "@/context";
import { useDeleteCalendarAllDayEvent } from "@/hooks";
import { EventData } from "@/types";

import { cn } from "../../../../../lib";
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
  const { letter } = useCalendarFilters();

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
              className={cn(
                "text-blue-600 text-[0.6rem] xs:text-[0.7rem] sm:text-sm md:text-lg",
                letter === "all" ? "mb-3" : "mb-0 lg:mb-3",
              )}
            >
              {title}
            </p>
            <p
              id="all-day-event"
              className={cn(
                "text-[0.5rem] xs:text-[0.58rem] sm:text-[0.65rem] md:text-[0.8rem]",
                letter === "all" ? "block" : "hidden lg:block",
              )}
            >
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
