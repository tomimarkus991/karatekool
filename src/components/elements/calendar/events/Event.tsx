import { AnimatePresence, MotionConfig } from "framer-motion";
import { RectReadOnly } from "react-use-measure";

import { EventData, EventTypes } from "types";

import { AllDayEvent, calendarUtils, MultiDayEvent, NormalEvent } from "../..";
interface Props {
  event: EventData;
  date: Date;
  bounds: RectReadOnly;
}

export const Event = ({ event, date, bounds }: Props) => {
  const { event_type, id } = event;

  return (
    <MotionConfig transition={calendarUtils.transition}>
      <AnimatePresence>
        {event_type === EventTypes.MULTI_DAY && (
          <MultiDayEvent event={event} date={date} bounds={bounds} />
        )}
        {event_type === EventTypes.ALL_DAY && <AllDayEvent event={event} date={date} />}
        {event_type === EventTypes.NORMAL && (
          <NormalEvent key={id + event_type} event={event} date={date} />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
};
