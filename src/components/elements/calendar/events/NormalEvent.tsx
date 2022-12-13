/* eslint-disable import/no-duplicates */
import { clsx } from "clsx";
import { format, isSameDay, parseISO } from "date-fns";
import { et } from "date-fns/locale";

import { EventData } from "types";

interface Props {
  event: EventData;
  date: Date;
}

export const NormalEvent = ({ event, date }: Props) => {
  const { is_highlighted, group, event_trailer } = event;
  const start = parseISO(event.start);

  if (!isSameDay(start, date)) {
    return <></>;
  }

  return (
    <div className="flex flex-row">
      <p className={clsx("mr-1 w-10 text-right", is_highlighted && "underline text-red-500")}>
        {format(start, "HH:mm", { locale: et })}
      </p>
      <div className="flex">
        {group.map(_group => {
          return (
            <p className="ml-1" style={{ color: _group?.color }} key={_group?.letter}>
              {_group?.letter}
            </p>
          );
        })}
        <p className="text-red-500 ml-1">{event_trailer?.text}</p>
      </div>
    </div>
  );
};
