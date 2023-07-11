import { isSameDay, parseISO } from "date-fns";
import { motion } from "framer-motion";

import { MapGroupLetter, MapHighLightedGroupLetter, NormalEventTime } from "@/components";
import { useCalendarFilters } from "@/context";
import { cn } from "@/lib";
import { EventData, EventTypes } from "@/types";

interface Props {
  event: EventData;
  date: Date;
}

export const DayViewNormalEvent = ({ event, date }: Props) => {
  const { group, event_trailer, highlighted_group, description, event_type } = event;
  const start = parseISO(event.start);
  const { letter } = useCalendarFilters();

  if (EventTypes.NORMAL !== event_type) {
    return <></>;
  }

  // show event if it is the same day as the date
  if (!isSameDay(start, date)) {
    return <></>;
  }

  // if filter is none then show nothing
  if (letter === "none") {
    return <></>;
  }

  // if filter is all show all groups
  if (
    letter !== "all" &&
    !(group.filter(_group => _group?.letter === letter).length > 0) &&
    !(
      highlighted_group.filter(_highlighted_group => _highlighted_group?.letter === letter).length >
      0
    )
  ) {
    return <></>;
  }

const startHour = start.getHours();

// 9 = -0.4
// 10 = 0.6
// 11 = 1.6
// 12 = 2.6
// 13 = 3.6
// 14 = 4.6
// 15 = 5.6
// 16 = 6.6
// 17 = 7.6
// 18 = 8.6
// 19 = 9.6
// 20 = 10.6
// 21 = 11.6

// const howFarFromTop = 55 * (startHour / 10 * 3);
const howFarFromTop = 55 * (startHour -9.4)
  return (
    <motion.div
      initial="enter"
      animate="middle"
      exit="exit"
      variants={{
        enter: { opacity: 0 },
        middle: { opacity: 1, transition: { opacity: { duration: 0.2 } } },
        exit: { opacity: 0, x: 300, transition: { duration: 1 } },
      }}
      className="absolute flex flex-col justify-start left-5"
      style={{ top: `${howFarFromTop}px` }}
    >
      <div className="flex flex-row items-center justify-start">
        <NormalEventTime
          start={parseISO(event.start)}
          isHighlighted={event.is_highlighted}
          dayView
        />
        <div className={cn("flex justify-center items-center")}>
          <MapGroupLetter groups={group} dayView />
          <MapHighLightedGroupLetter highlightedGroups={highlighted_group} dayView />
          {event_trailer?.text && (
            <p className="text-red-500 ml-1 lg:text-xs xl:text-sm sm:ml-[0.1rem] text-[0.5rem] sm:text-[0.55rem] font-number font-semibold text-center">
              {event_trailer?.text}
            </p>
          )}
        </div>
      </div>
      {description && (
        <p className="text-[0.4rem] xs:text-[0.6rem] sm:text-[0.71rem] font-semibold text-left -mt-[0.2rem]">
          {description}
        </p>
      )}
    </motion.div>
  );
};
