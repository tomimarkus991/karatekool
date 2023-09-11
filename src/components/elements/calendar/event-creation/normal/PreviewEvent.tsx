"use client";

import { format } from "date-fns";

import { NormalEventFormValues } from "@/app-constants";
import { cn } from "@/lib";

import { NormalEventTime, MapGroupLetter, MapHighLightedGroupLetter } from "../../events";

interface Props {
  values: NormalEventFormValues;
}

export const PreviewEvent = ({ values }: Props) => {
  const filteredGroups = values.selectedGroups
    .filter(group => !group.highlighted)
    .map(group => ({
      ...group,
    }));

  const filteredHighlightedGroups = values.selectedGroups
    ?.filter(group => group.highlighted)
    .map(group => ({
      ...group,
    }));

  return (
    <div className="flex flex-col">
      <p className="self-center font-semibold justify-self-center text-stone-500">
        {values.selectedStartDates[0] ? format(values.selectedStartDates[0], "EEEE") : "Esmaspäev"}
      </p>
      <div className="flex flex-col self-center h-16 mt-2 border border-t-0 sm:h-20 md:h-28 lg:h-32 w-36 border-stone-100">
        <div className="flex flex-col items-center justify-center">
          <div className="text-xs font-medium font-number sm:text-sm md:text-base text-text-primary">
            {values.selectedStartDates[0] ? format(values.selectedStartDates[0], "dd") : "1"}
          </div>
        </div>
        <div className="flex flex-col justify-center flex-grow ml-2 text-center">
          <div className="flex flex-col justify-start rounded-lg">
            <div id="normal-event" className="flex flex-row items-center justify-start">
              <NormalEventTime start={values.startTime} isHighlighted={values.isHighlighted} />
              <div id="normal-event" className={cn("flex justify-center items-center")}>
                <MapGroupLetter
                  groups={
                    filteredGroups.length === 0 && filteredHighlightedGroups.length === 0
                      ? [
                          { id: 17, letter: "S", highlighted: false },
                          { id: 23, letter: "K", highlighted: false },
                        ]
                      : filteredGroups
                  }
                />
                <MapHighLightedGroupLetter
                  highlightedGroups={
                    filteredGroups.length === 0 && filteredHighlightedGroups.length === 0
                      ? [{ id: 5, letter: "N", highlighted: true }]
                      : filteredHighlightedGroups
                  }
                />
                {values.trailer && (
                  <p
                    id="normal-event"
                    className="text-red-500 ml-1 lg:text-xs xl:text-sm sm:ml-[0.1rem] text-[0.5rem] whitespace-nowrap sm:text-[0.55rem] font-number font-semibold text-center"
                  >
                    {values.trailer.text}
                  </p>
                )}
              </div>
            </div>
            {values.description && (
              <p className="text-[0.4rem] xs:text-[0.6rem] sm:text-[0.71rem] font-semibold text-left -mt-[0.2rem]">
                {values.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
