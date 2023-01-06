import { RectReadOnly } from "react-use-measure";

import { EventData, EventTypes } from "types";

import { AllDayEvent, MultiDayEvent, NormalEvent } from "../..";
interface Props {
  event: EventData;
  date: Date;
  bounds: RectReadOnly;
}

export const Event = ({ event, date, bounds }: Props) => {
  const { event_type } = event;

  return (
    <>
      {event_type === EventTypes.MULTI_DAY && (
        <MultiDayEvent event={event} date={date} bounds={bounds} />
      )}
      {event_type === EventTypes.ALL_DAY && <AllDayEvent event={event} date={date} />}
      {event_type === EventTypes.NORMAL && <NormalEvent event={event} date={date} />}
    </>
  );
};
