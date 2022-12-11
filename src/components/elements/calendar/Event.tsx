import { clsx } from "clsx";
import { format } from "date-fns";
// eslint-disable-next-line import/no-duplicates
import { et } from "date-fns/locale";

import { EventData } from "types";

interface Props {
  event: EventData;
  start: Date;
}

export const Event = ({ event, start }: Props) => {
  const { all_day_event, is_highlighted, group } = event;
  if (all_day_event) {
    return (
      <div>
        <p className="uppercase text-blue-600">{all_day_event.title}</p>
        <p className="text-sm">{all_day_event.description}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex">
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
          <p className="text-red-500 ml-1">{event?.event_trailer?.text}</p>
        </div>
      </div>
    </>
  );
};
