import { isSameDay, parseISO } from "date-fns";
import { motion } from "framer-motion";

import { EventData } from "@/types";

import { Popover, PopoverContent, PopoverTrigger } from "../../Popover";

interface Props {
  event: EventData;
  date: Date;
}

export const AllDayEvent = ({ event, date }: Props) => {
  const { all_day_event } = event;
  const start = parseISO(event.start);

  if (!isSameDay(start, date) || !all_day_event) {
    return <></>;
  }
  const { title, sub_title } = all_day_event;

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
        className="flex flex-col justify-center flex-grow text-center"
      >
        <PopoverTrigger>
          <p className="mb-3 text-xs text-blue-600 sm:text-base sm:mb-1 xs:text-sm md:text-lg">
            {title}
          </p>
          <p className="text-xs2 xs:text-xs sm:text-sm">{sub_title}</p>
        </PopoverTrigger>
      </motion.div>
      <PopoverContent className="max-w-xs lg:max-w-sm">
        <div>
          <p>{title}</p>
          <p>{sub_title}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};
