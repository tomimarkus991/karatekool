"use client";

import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { HiOutlineCalendar } from "react-icons/hi";

import { AnimationWrapper, animations } from "@/components";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/elements/Popover";

import { DatePickerCalendar, DatePickerCalendarButton } from ".";

export const DatePickerWithRange = () => {
  const [date, setDate] = useState<DateRange>();

  return (
    <Popover>
      <PopoverTrigger>
        <AnimationWrapper variants={animations.subtleScale}>
          <DatePickerCalendarButton
            id="date"
            variant="ghost"
            className="items-center justify-center text-left group"
          >
            <HiOutlineCalendar className="w-6 h-6 mr-2 text-stone-700 group-hover:text-stone-800" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <p>Vali kuupäev</p>
            )}
          </DatePickerCalendarButton>
        </AnimationWrapper>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[5001]" align="start">
        <DatePickerCalendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};
