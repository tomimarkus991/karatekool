import { isSameDay, parseISO } from "date-fns";
import { motion } from "framer-motion";

import { useDeleteCalendarAllDayEvent } from "@/hooks";
import { EventData, EventTypes } from "@/types";

import { Popover, PopoverTrigger } from "../../../Popover";
import { DeleteEventPopoverContent } from "../../event-deletion";

interface Props {
  event: EventData;
  date: Date;
}

export const DayViewAllDayEvent = ({ event, date }: Props) => {
  const { all_day_event, event_type } = event;
  const start = parseISO(event.start);
  const { mutate: deleteEvent } = useDeleteCalendarAllDayEvent();

  if (EventTypes.ALL_DAY !== event_type) {
    return <></>;
  }

  if (!isSameDay(start, date) || !all_day_event) {
    return <></>;
  }
  const { title, sub_title, id } = all_day_event;

  return (
    <Popover>
      <PopoverTrigger className="relative">
        <motion.div
          initial="enter"
          animate="middle"
          exit="exit"
          variants={{
            enter: { opacity: 0 },
            middle: { opacity: 1, transition: { opacity: { duration: 0.5 } } },
            exit: { opacity: 0 },
          }}
          className="flex flex-col justify-center flex-grow py-4 mx-12 my-4 text-center bg-white border-2 border-blue-600 border-spacing-7 rounded-xl"
        >
          <p className="mb-3 text-xl font-semibold text-blue-600">{title}</p>
          <p className="">{sub_title}</p>
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
