"use client";

import { format } from "date-fns";
import { et } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DateFormatter } from "react-day-picker";

import { cn } from "@/lib";

import { datePickerCalendarButtonVariants } from "./DatePickerCalendarButton";

export type DatePickerCalendarProps = React.ComponentProps<typeof DayPicker>;

const seasonEmoji: Record<string, string> = {
  winter: "⛄️",
  spring: "🌸",
  summer: "🌻",
  autumn: "🍂",
};

const getSeason = (month: Date): string => {
  const monthNumber = month.getMonth();
  if (monthNumber >= 0 && monthNumber < 3) return "winter";
  if (monthNumber >= 3 && monthNumber < 6) return "spring";
  if (monthNumber >= 6 && monthNumber < 9) return "summer";
  return "autumn";
};

const formatCaption: DateFormatter = (month, options) => {
  const season = getSeason(month);
  return (
    <>
      <span role="img" aria-label={season}>
        {seasonEmoji[season]}
      </span>{" "}
      {format(month, "LLLL", { locale: options?.locale })}
    </>
  );
};

const DatePickerCalendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: DatePickerCalendarProps) => (
  <DayPicker
    showOutsideDays={showOutsideDays}
    fixedWeeks={showOutsideDays}
    locale={et}
    className={cn("p-3", className)}
    classNames={{
      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
      month: "space-y-4",
      caption: "flex justify-center pt-1 relative items-center",
      caption_label: "text-sm font-medium",
      nav: "space-x-1 flex items-center",
      nav_button: cn(
        datePickerCalendarButtonVariants({ variant: "ghost" }),
        "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
      ),
      nav_button_previous: "absolute left-1",
      nav_button_next: "absolute right-1",
      table: "w-full border-collapse space-y-1",
      head_row: "flex text-stone-700",
      head_cell: "text-stone-700 rounded-md w-9 text-[0.8rem]",
      row: "flex w-full mt-2",
      cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
      day: cn(
        datePickerCalendarButtonVariants({ variant: "ghost" }),
        "h-9 w-9 p-0 font-normal rounded-none",
      ),
      day_selected: "bg-secondary !rounded-full text-white hover:opacity-90 focus:bg-secondary",
      day_today: "text-secondary",
      day_outside: cn(showOutsideDays ? "opacity-50" : "invisible"),
      day_disabled: "opacity-50",
      day_range_middle: "bg-secondary-light !rounded-none !hover:opacity-90",
      day_hidden: "invisible",
      day_range_start: "!rounded-r-none",
      day_range_end: "!rounded-l-none",
      ...classNames,
    }}
    components={{
      IconLeft: props1 => <ChevronLeft className="size-4" {...props1} />,
      IconRight: props2 => <ChevronRight className="size-4" {...props2} />,
    }}
    formatters={{ formatCaption }}
    {...props}
  />
);
DatePickerCalendar.displayName = "DatePickerCalendar";

export { DatePickerCalendar };
