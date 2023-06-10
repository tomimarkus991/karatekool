import { clsx } from "clsx";
import { parseISO, isWithinInterval } from "date-fns";
import { motion } from "framer-motion";

import { EventData, EventTypes } from "@/types";

interface Props {
  event: EventData;
  date: Date;
}

export const DayViewMultiDayEvent = ({ event, date }: Props) => {
  const { long_event_end, multi_day_event, event_type } = event;
  const start = parseISO(event.start);

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
    <motion.div
      initial="enter"
      animate="middle"
      exit="exit"
      variants={{
        enter: { opacity: 0 },
        middle: { opacity: 1, transition: { opacity: { duration: 0.5 } } },
        exit: { opacity: 0 },
      }}
      className={clsx(
        "bg-blue-600 mt-4 mx-4 rounded-md cursor-pointer hover:bg-blue-500 z-10",
        "relative"
      )}
    >
      <p className="py-2 ml-2 text-base font-medium text-center text-white">
        {multi_day_event.title}
      </p>
    </motion.div>
  );
};
