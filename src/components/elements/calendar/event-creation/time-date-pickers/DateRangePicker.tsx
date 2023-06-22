"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/elements/Popover";

import { DatePickerCalendar, DatePickerCalendarButton } from ".";

export const DatePickerWithRange = () => {
  const [date, setDate] = useState<DateRange>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <DatePickerCalendarButton
          id="date"
          variant="outline"
          className="justify-start font-normal text-left"
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Vali kuupäev</span>
          )}
        </DatePickerCalendarButton>
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
