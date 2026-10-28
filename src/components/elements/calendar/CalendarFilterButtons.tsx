"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { MutableRefObject, useCallback, useEffect } from "react";

import { RealButton, Tooltip } from "@/components";
import { useCalendarFilters } from "@/context";
import { useUser } from "@/hooks";
import {
  buttonVariantMapper,
  cn,
  groupLetters,
  isNamedTrainingFilter,
  namedTrainingNames,
} from "@/lib";

import { CalendarFilter, EventData, GroupFilters } from "../../../types";
import { Icons } from "../../icons/Icons";

import { DownloadCalendar } from "./DownloadCalendar";

interface Props {
  currentMonthString: string;
  calendarRef: MutableRefObject<never>;
  /** The shown month's Events; each Named Training name in that month gets a button */
  events: EventData[];
  firstDayOfCurrentMonth: Date;
}

export const CalendarFilterButtons = ({
  currentMonthString,
  calendarRef,
  events,
  firstDayOfCurrentMonth,
}: Props) => {
  const { setFilter } = useCalendarFilters();
  const { data: user } = useUser();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  // A Group (or "all") goes in ?group, a Named Training's name in ?training; never both
  const createQueryString = useCallback(
    (filter: CalendarFilter) => {
      const params = new URLSearchParams(searchParams);
      params.delete("group");
      params.delete("training");
      if (isNamedTrainingFilter(filter)) params.set("training", filter.name);
      else params.set("group", filter);

      return params.toString();
    },
    [searchParams],
  );

  const choose = (filter: CalendarFilter) => {
    setFilter(filter);
    window.history.pushState({}, "", `${pathname}?${createQueryString(filter)}`);
  };

  useEffect(() => {
    const training = searchParams.get("training");
    const group = searchParams.get("group");

    if (training) {
      setFilter({ name: training });
    } else if (group) {
      setFilter(group as GroupFilters);
    }
  }, []);

  useEffect(() => {
    if (searchParams.get("training") || searchParams.get("group")) return;

    if (user?.group) {
      choose(user.group as GroupFilters);
    }
  }, [user?.group]);

  const names = namedTrainingNames(events, firstDayOfCurrentMonth);

  return (
    <>
      <div
        className={cn(
          "grid justify-center grid-cols-5 gap-2 max-w-[14rem] m-auto",
          "xs2:grid-cols-7 xs2:max-w-[20rem]",
          "md2:grid-cols-[repeat(13,minmax(0,1fr))] md2:max-w-[45rem]",
        )}
      >
        {groupLetters.map(letter => (
          <RealButton
            key={letter}
            className="relative group"
            variant={buttonVariantMapper(letter)}
            size="oneLetter"
            focus={true}
            onClick={() => choose(letter)}
          >
            <Tooltip tooltip={`Näita ${letter} grupi trenne`} />
            {letter}
          </RealButton>
        ))}

        <DownloadCalendar calendarRef={calendarRef} currentMonthString={currentMonthString} />

        {user && (
          <RealButton
            onClick={() => choose("all")}
            size="icon"
            className="relative px-0 md2:px-3 group"
            variant="light"
          >
            <Tooltip tooltip="Näita kõikide gruppide trenne" />
            <Icons.elevenGroups className="w-6 h-6 text-stone-800" />
          </RealButton>
        )}
      </div>

      {names.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 m-auto mt-2 max-w-[45rem]">
          {names.map(name => (
            <RealButton
              key={name}
              className="relative group"
              variant="orange"
              size="xs"
              focus={true}
              onClick={() => choose({ name })}
            >
              <Tooltip tooltip={`Näita "${name}" trenne`} />
              {name}
            </RealButton>
          ))}
        </div>
      )}
    </>
  );
};
