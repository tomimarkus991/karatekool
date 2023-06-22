"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/elements/Popover";

import { DatePickerCalendar, DatePickerCalendarButton } from ".";

export function DatePicker() {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <DatePickerCalendarButton variant="outline" className="justify-start font-normal text-left">
          <CalendarIcon className="w-4 h-4 mr-2" />
          {date ? format(date, "PPP") : <span>Vali kuupäev</span>}
        </DatePickerCalendarButton>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[5001]">
        <DatePickerCalendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
