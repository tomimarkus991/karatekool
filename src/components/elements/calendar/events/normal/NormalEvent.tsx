import clsx from "clsx";
import { isSameDay, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { useDetectOverflow } from "use-detect-overflow";

import { useCalendarFilters } from "context";
import { EventData } from "types";

import { NormalEventTime, MapGroupLetter, MapHighLightedGroupLetter } from ".";

interface Props {
  event: EventData;
  date: Date;
}

export const NormalEvent = ({ event, date }: Props) => {
  const { group, event_trailer, highlighted_group, description } = event;
  const start = parseISO(event.start);
  const { letter } = useCalendarFilters();
  const [ref, { overflowX }] = useDetectOverflow();

  if (!isSameDay(start, date)) {
    return <></>;
  }

  if (letter === "none") {
    return <></>;
  }

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

  console.log(letter);

  return (
    <motion.div
      initial="enter"
      animate="middle"
      exit="exit"
      variants={{
        enter: { opacity: 0 },
        middle: { opacity: 1 },
        exit: { opacity: 0, x: 300, transition: { duration: 3 } },
      }}
      className={clsx("flex flex-col justify-start")}
    >
      <div className="flex flex-row justify-start items-center" ref={ref}>
        <NormalEventTime event={event} />
        <div className={clsx("flex justify-center items-center")}>
          <MapGroupLetter groups={group} overflowX={overflowX} />
          <MapHighLightedGroupLetter highlightedGroups={highlighted_group} overflowX={overflowX} />
          {event_trailer?.text && (
            <p className="text-red-500 ml-1 text-base font-quicksand font-semibold text-center">
              {event_trailer?.text}
            </p>
          )}
        </div>
      </div>
      {description && <p className="text-xs sm:text-sm font-medium -mt-[0.4rem]">{description}</p>}
    </motion.div>
  );
};
