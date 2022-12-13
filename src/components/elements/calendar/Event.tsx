import { EventData, EventTypes } from "types";

import { AllDayEvent, MultiDayEvent, NormalEvent } from ".";

interface Props {
  event: EventData;
  date: Date;
}

export const Event = ({ event, date }: Props) => {
  const { event_type } = event;

  return (
    <>
      {event_type === EventTypes.MULTI_DAY && <MultiDayEvent event={event} date={date} />}
      {event_type === EventTypes.ALL_DAY && <AllDayEvent event={event} date={date} />}
      {event_type === EventTypes.NORMAL && <NormalEvent event={event} date={date} />}
    </>
  );
};
