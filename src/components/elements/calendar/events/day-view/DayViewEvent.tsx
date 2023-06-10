import { EventData } from "@/types";

import { DayViewNormalEvent, DayViewMultiDayEvent, DayViewAllDayEvent } from ".";

interface Props {
  event: EventData;
  date: Date;
}

export const DayViewEvent = ({ event, date }: Props) => {
  const { event_type, id } = event;

  return (
    <>
      <DayViewMultiDayEvent event={event} date={date} />
      <DayViewAllDayEvent event={event} date={date} />

      <DayViewNormalEvent key={id + event_type} event={event} date={date} />
    </>
  );
};
