import { isSameDay, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { HiTrash, HiX } from "react-icons/hi";

import {
  NormalEventTime,
  MapGroupLetter,
  MapHighLightedGroupLetter,
  AnimationWrapper,
  RealButton,
  animations,
} from "@/components";
import { useCalendarFilters } from "@/context";
import { useDeleteNormalCalendarEvent, useUser } from "@/hooks";
import { cn } from "@/lib";
import { EventData, SEventTrailer, SGroup } from "@/types";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../../../Popover";

interface Props {
  event: EventData;
  date: Date;
}
interface NormalEventDisplayProps {
  event: {
    start: string | null;
    is_highlighted: boolean;
  };
  groups: SGroup[];
  highlighted_group: SGroup[];
  event_trailer: SEventTrailer | null;
  description: string | null;
}

export const NormalEventDisplay = ({
  event,
  groups,
  highlighted_group,
  event_trailer,
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
        <MapHighLightedGroupLetter highlightedGroups={highlighted_group} />
        {event_trailer?.text && (
          <p className="text-red-500 ml-1 lg:text-xs xl:text-sm sm:ml-[0.1rem] text-[0.5rem] sm:text-[0.55rem] whitespace-nowrap font-number font-semibold text-center">
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
  </div>
);

export const NormalEvent = ({ event, date }: Props) => {
  const { group: groups, event_trailer, highlighted_group, description, id } = event;
  const start = parseISO(event.start);
  const { letter } = useCalendarFilters();
  const { mutate: deleteEvent } = useDeleteNormalCalendarEvent();

  const { data: user } = useUser();

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
    !(
      highlighted_group.filter(_highlighted_group => _highlighted_group?.letter === letter).length >
      0
    )
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
            event_trailer={event_trailer}
            groups={groups}
            highlighted_group={highlighted_group}
          />
        </PopoverTrigger>
        <PopoverContent className="max-w-xs lg:max-w-sm">
          <div className="flex flex-row">
            <Popover>
              <PopoverTrigger>
                {user?.role === "admin" && (
                  <AnimationWrapper
                    className="self-center mr-2 cursor-pointer"
                    variants={animations.smallScaleXs}
                  >
                    <HiTrash className="w-6 h-6 text-red-600" />
                  </AnimationWrapper>
                )}
              </PopoverTrigger>
              <PopoverContent className="z-50 p-4">
                <div className="flex flex-col">
                  <p className="mb-4 text-xl font-semibold text-center">
                    Oled kindel, et soovid seda kustutada?
                  </p>
                  <div className="flex flex-row">
                    <PopoverClose>
                      <RealButton className="ml-4" variant="orange">
                        Tagasi
                      </RealButton>
                    </PopoverClose>
                    <RealButton className="ml-4" variant="red" onClick={() => deleteEvent({ id })}>
                      Kustuta
                    </RealButton>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <NormalEventDisplay
              description={description}
              event={event}
              event_trailer={event_trailer}
              groups={groups}
              highlighted_group={highlighted_group}
            />

            <PopoverClose>
              <AnimationWrapper
                className="self-center ml-2 cursor-pointer"
                variants={animations.smallScaleXs}
              >
                <HiX className="self-center w-8 h-8 cursor-pointer text-stone-800" />
              </AnimationWrapper>
            </PopoverClose>
          </div>
        </PopoverContent>
      </motion.div>
    </Popover>
  );
};
