"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { MutableRefObject, useCallback, useEffect } from "react";

import { RealButton, Tooltip } from "@/components";
import { useCalendarFilters } from "@/context";
import { useUser } from "@/hooks";
import { buttonVariantMapper, cn, groupLetters } from "@/lib";

import { GroupFilters } from "../../../types";
import { Icons } from "../../icons/Icons";

import { DownloadCalendar } from "./DownloadCalendar";

interface Props {
  currentMonthString: string;
  calendarRef: MutableRefObject<never>;
}

export const CalendarFilterButtons = ({ currentMonthString, calendarRef }: Props) => {
  const { setLetter } = useCalendarFilters();
  const { data: user } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    const group = searchParams.get("group");

    if (group) {
      setLetter(group as GroupFilters);
    }
  }, []);

  return (
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
          onClick={() => {
            setLetter(letter);

            router.push(`${pathname}?${createQueryString("group", letter)}` as any);
          }}
        >
          <Tooltip tooltip={`Näita ${letter} grupi trenne`} />
          {letter}
        </RealButton>
      ))}

      <DownloadCalendar calendarRef={calendarRef} currentMonthString={currentMonthString} />

      {user && (
        <RealButton
          onClick={() => setLetter("all")}
          size="icon"
          className="relative px-0 md2:px-3 group"
          variant="light"
        >
          <Tooltip tooltip="Näita kõikide gruppide trenne" />
          <Icons.elevenGroups className="w-6 h-6 text-stone-800" />
        </RealButton>
      )}
      {/* <RealButton size="sm" onClick={() => setLetter("all")}>
        All
      </RealButton>
      <RealButton size="sm" onClick={() => setLetter("none")}>
        None
      </RealButton> */}
    </div>
  );
};
