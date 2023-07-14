import { parseISO, isWithinInterval } from "date-fns";
import { motion } from "framer-motion";

import { useDeleteCalendarMultiDayEvent } from "@/hooks";
import { cn } from "@/lib";
import { EventData, EventTypes } from "@/types";

import { Popover, PopoverTrigger } from "../../../Popover";
import { DeleteEventPopoverContent } from "../../event-deletion";

interface Props {
  event: EventData;
  date: Date;
}

export const DayViewMultiDayEvent = ({ event, date }: Props) => {
  const { long_event_end, multi_day_event, event_type } = event;
  const start = parseISO(event.start);

  const { mutate: deleteEvent } = useDeleteCalendarMultiDayEvent();

  if (EventTypes.MULTI_DAY !== event_type) {
    return <></>;
  }
  if (!long_event_end || !multi_day_event) {
    return <></>;
  }

  const end = parseISO(long_event_end);

  if (!isWithinInterval(date, { start, end })) {
    return <></>;
  }
  return (
    <Popover>
      <motion.div
        initial="enter"
        animate="middle"
        exit="exit"
        variants={{
          enter: { opacity: 0 },
          middle: { opacity: 1, transition: { opacity: { duration: 0.5 } } },
          exit: { opacity: 0 },
        }}
        className={cn(
          "bg-blue-600 mt-4 mx-4 rounded-md w-full cursor-pointer hover:bg-blue-500 z-10",
          "relative",
        )}
      >
        <PopoverTrigger>
          <p className="py-2 ml-2 text-base font-medium text-center text-white">
            {multi_day_event.title}
          </p>
        </PopoverTrigger>
      </motion.div>
      <DeleteEventPopoverContent deleteEvent={() => deleteEvent({ id: multi_day_event.id })}>
        <p className="text-center">{multi_day_event.title}</p>
      </DeleteEventPopoverContent>
    </Popover>
  );
};
