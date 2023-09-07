import { isSameDay, parseISO } from "date-fns";
import { motion } from "framer-motion";

import {
  DeleteEventPopoverContent,
  MapGroupLetter,
  MapHighLightedGroupLetter,
  NormalEventTime,
} from "@/components";
import { useCalendarFilters } from "@/context";
import { useDeleteNormalCalendarEvent } from "@/hooks";
import { cn } from "@/lib";
import { EventData, GroupData, SEventTrailer } from "@/types";

import { Popover, PopoverTrigger } from "../../../../Popover";

interface Props {
  event: EventData;
  date: Date;
}
interface NormalEventDisplayProps {
  event: {
    start: string | null;
    is_highlighted: boolean;
  };
  groups: GroupData[];
  highlightedGroups: GroupData[];
  eventTrailer: SEventTrailer | null;
  description: string | null;
}

export const NormalEventDisplay = ({
  event,
  groups,
  highlightedGroups,
  eventTrailer,
  description,
}: NormalEventDisplayProps) => (
  <div>
    <div className="flex flex-row items-center justify-start">
      <NormalEventTime
        start={event.start ? parseISO(event.start) : null}
        isHighlighted={event.is_highlighted}
      />
      <div className={cn("flex justify-center items-center")}>
        <MapGroupLetter groups={groups} />
        <MapHighLightedGroupLetter highlightedGroups={highlightedGroups} />
        {eventTrailer?.text && (
          <p className="text-red-500 ml-1 lg:text-xs xl:text-sm sm:ml-[0.1rem] text-[0.5rem] sm:text-[0.55rem] whitespace-nowrap font-number font-semibold text-center">
            {eventTrailer?.text}
          </p>
        )}
      </div>
    </div>
    {description && (
      <p className="text-[0.4rem] xs:text-[0.6rem] sm:text-[0.71rem] font-semibold text-left -mt-[0.2rem]">
        {description}
      </p>
    )}
  </div>
);

export const NormalEvent = ({ event, date }: Props) => {
  const {
    group: groups,
    event_trailer: eventTrailer,
    highlighted_group: highlightedGroups,
    description,
    id,
  } = event;
  const start = parseISO(event.start);
  const { letter } = useCalendarFilters();
  const { mutate: deleteEvent } = useDeleteNormalCalendarEvent();

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
    !(groups.filter(group => group?.letter === letter).length > 0) &&
    !(highlightedGroups.filter(highlightedGroup => highlightedGroup?.letter === letter).length > 0)
  ) {
    return <></>;
  }

  return (
    <Popover>
      <motion.div
        id="normal-event"
        initial="enter"
        animate="middle"
        exit="exit"
        variants={{
          enter: { opacity: 0 },
          middle: { opacity: 1, transition: { opacity: { duration: 0.2 } } },
          exit: { opacity: 0, x: 300, transition: { duration: 1 } },
        }}
        className="flex flex-col justify-start rounded-lg hover:bg-stone-50"
      >
        <PopoverTrigger className="relative">
          <NormalEventDisplay
            description={description}
            event={event}
            eventTrailer={eventTrailer}
            groups={groups}
            highlightedGroups={highlightedGroups}
          />
        </PopoverTrigger>
        <DeleteEventPopoverContent event={event} deleteEvent={() => deleteEvent({ id })}>
          <NormalEventDisplay
            description={description}
            event={event}
            eventTrailer={eventTrailer}
            groups={groups}
            highlightedGroups={highlightedGroups}
          />
        </DeleteEventPopoverContent>
      </motion.div>
    </Popover>
  );
};
