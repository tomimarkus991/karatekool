/* eslint-disable import/no-duplicates */
import clsx from "clsx";
import { format, parseISO } from "date-fns";
import { et } from "date-fns/locale";

import { EventData } from "@/types";

interface Props {
  event: EventData;
}

export const NormalEventTime = ({ event }: Props) => {
  const { is_highlighted } = event;
  const start = parseISO(event.start);

  return (
    <>
      <p
        className={clsx(
          "sm:text-sm text-left md:text-base whitespace-nowrap font-quicksand font-semibold xs:text-[0.7rem] text-[0.6rem]",
          is_highlighted && "underline text-red-500"
        )}
      >
        {format(start, "HH:mm", { locale: et })}
      </p>
      {/* <p className="text-sm font-varela">{format(start, "HH:mm", { locale: et })}</p> */}
    </>
  );
};

// {normal_event_end
//   ? `${format(start, "HH:mm", { locale: et })}-${format(
//       parseISO(normal_event_end),
//       "HH:mm",
//       {
//         locale: et,
//       }
//     )}`
//   : format(start, "HH:mm", { locale: et })}
