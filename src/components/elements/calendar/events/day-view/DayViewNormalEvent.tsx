import { isSameDay, parseISO } from "date-fns";
import { motion } from "framer-motion";

import {
  DeleteEventPopoverContent,
  MapGroupLetter,
  MapHighLightedGroupLetter,
  NormalEventDisplay,
  NormalEventTime,
} from "@/components";
import { useCalendarFilters } from "@/context";
import { useDeleteNormalCalendarEvent } from "@/hooks";
import { cn } from "@/lib";
import { EventData, EventTypes } from "@/types";

import { Popover, PopoverTrigger } from "../../../Popover";

interface Props {
  event: EventData;
  date: Date;
}

const calculatePosition = (currentHour: number, currentMinutes: number): number =>
  56 * (currentHour - 9.4) + currentMinutes * 1.1;

export const DayViewNormalEvent = ({ event, date }: Props) => {
  const { group, event_trailer, highlighted_group, description, event_type, id } = event;
  const start = parseISO(event.start);
  const { letter } = useCalendarFilters();
  const { mutate: deleteEvent } = useDeleteNormalCalendarEvent();

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
  const startMinutes = start.getMinutes();

  const position = calculatePosition(startHour, startMinutes);
  return (
    <Popover>
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
        style={{ top: `${position}px` }}
      >
        <PopoverTrigger className="relative">
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
        </PopoverTrigger>
      </motion.div>
      <DeleteEventPopoverContent deleteEvent={() => deleteEvent({ id })}>
        <NormalEventDisplay
          description={description}
          event={event}
          event_trailer={event_trailer}
          groups={[
            {
              letter: "S",
            },
            {
              letter: "A",
            },
          ]}
          highlighted_group={highlighted_group}
        />
      </DeleteEventPopoverContent>
    </Popover>
  );
};
