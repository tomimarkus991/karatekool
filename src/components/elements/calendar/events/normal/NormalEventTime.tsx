/* eslint-disable import/no-duplicates */

import { format } from "date-fns";
import { et } from "date-fns/locale";

import { cn } from "@/lib";

interface Props {
  start: Date;
  isHighlighted: boolean;
  dayView?: boolean;
}

export const NormalEventTime = ({ start, isHighlighted, dayView = false }: Props) => (
  <>
    <p
      id="normal-event"
      className={cn(
        "font-number whitespace-nowrap",
        dayView
          ? "text-lg font-semibold"
          : "sm:text-sm text-left md:text-base font-semibold xs:text-[0.7rem] text-[0.6rem]",
        isHighlighted && "underline text-red-500",
      )}
    >
      {format(start, "HH:mm", { locale: et })}
    </p>
    {/* <p className="text-sm font-number">{format(start, "HH:mm", { locale: et })}</p> */}
  </>
);

// {normal_event_end
//   ? `${format(start, "HH:mm", { locale: et })}-${format(
//       parseISO(normal_event_end),
//       "HH:mm",
//       {
//         locale: et,
//       }
//     )}`
//   : format(start, "HH:mm", { locale: et })}
