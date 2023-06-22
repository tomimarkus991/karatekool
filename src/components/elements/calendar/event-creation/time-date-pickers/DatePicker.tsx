"use client";

import { format } from "date-fns";
import { useState } from "react";
import { HiOutlineCalendar } from "react-icons/hi";

import { AnimationWrapper, animations } from "@/components";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/elements/Popover";

import { DatePickerCalendar, DatePickerCalendarButton } from ".";

export function DatePicker() {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger>
        <AnimationWrapper variants={animations.subtleScale}>
          <DatePickerCalendarButton
            variant="ghost"
            className="items-center justify-center text-left group"
          >
            <HiOutlineCalendar className="w-6 h-6 mr-2 text-stone-700 group-hover:text-stone-800" />
            {date ? format(date, "PPP") : <p>Vali kuupäev</p>}
          </DatePickerCalendarButton>
        </AnimationWrapper>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[5001]">
        <DatePickerCalendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
