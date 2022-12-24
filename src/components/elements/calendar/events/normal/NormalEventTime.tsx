import clsx from "clsx";
import { format, parseISO } from "date-fns";
// eslint-disable-next-line import/no-duplicates
import { et } from "date-fns/locale";

import { EventData } from "types";

interface Props {
  event: EventData;
}

export const NormalEventTime = ({ event }: Props) => {
  const { is_highlighted, normal_event_end } = event;
  const start = parseISO(event.start);

  return (
    <p
      className={clsx(
        "mr-1 text-left text-sm whitespace-nowrap font-baloo font-medium",
        is_highlighted && "underline text-red-500"
      )}
    >
      {normal_event_end
        ? `${format(start, "HH:mm", { locale: et })} - ${format(
            parseISO(normal_event_end),
            "HH:mm",
            { locale: et }
          )}`
        : format(start, "HH:mm", { locale: et })}
    </p>
  );
};
