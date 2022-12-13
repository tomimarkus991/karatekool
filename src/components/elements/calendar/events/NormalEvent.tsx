/* eslint-disable import/no-duplicates */
import { clsx } from "clsx";
import { format, isSameDay, parseISO } from "date-fns";
import { et } from "date-fns/locale";

import { EventData } from "types";
import { groupColorMapper } from "utils";

interface Props {
  event: EventData;
  date: Date;
}

export const NormalEvent = ({ event, date }: Props) => {
  const { is_highlighted, group, event_trailer, highlighted_group } = event;
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
            <p
              className={clsx(
                "ml-1",
                is_highlighted && "underline",
                groupColorMapper(_group?.letter)
              )}
              key={_group?.letter}
            >
              {_group?.letter}
            </p>
          );
        })}
        {highlighted_group.map(_highlighted_group => {
          return (
            <div className={clsx("ml-1 flex flex-row")} key={_highlighted_group?.letter}>
              <p className={clsx("underline", groupColorMapper(_highlighted_group?.letter))}>
                {_highlighted_group?.letter}
              </p>
              <p className="text-red-500 ml-1">!</p>
            </div>
          );
        })}
        <p className="text-red-500 ml-1">{event_trailer?.text}</p>
      </div>
    </div>
  );
};
