"use client";

import { format } from "date-fns";
import { useField } from "formik";
import { DateRange } from "react-day-picker";
import { HiOutlineCalendar } from "react-icons/hi";

import { MultiDayEventFormik } from "@/app-constants";
import { AnimationWrapper, InputErrorText, animations } from "@/components";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/elements/Popover";

import { DatePickerCalendar, DatePickerCalendarButton } from ".";

interface Props {
  name: string;
}
export const DatePickerWithRange = ({ name }: Props) => {
  const [field, { value, error, touched }, { setValue }] =
    useField<MultiDayEventFormik>(name);

  return (
    <Popover>
      <PopoverTrigger>
        <AnimationWrapper variants={animations.subtleScale}>
          <DatePickerCalendarButton
            variant="ghost"
            className="items-center justify-center text-left group"
          >
            <HiOutlineCalendar className="w-6 h-6 mr-2 text-stone-700 group-hover:text-stone-800" />
            {value?.from ? (
              value?.to ? (
                <>
                  {format(value.from, "LLL dd, y")} -{" "}
                  {format(value.to, "LLL dd, y")}
                </>
              ) : (
                format(value.from, "LLL dd, y")
              )
            ) : (
              <p className="text-lg">Vali kuupäev</p>
            )}
          </DatePickerCalendarButton>
        </AnimationWrapper>
        <InputErrorText error={error} touched={touched} />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[5001]" align="start">
        <DatePickerCalendar
          {...field}
          initialFocus
          mode="range"
          // it wants it to be dateRange but yup doesn't allow that so i cast it to DateRange
          selected={value as DateRange}
          onSelect={(dateRange) => {
            setValue({
              from: dateRange?.from as any,
              to: dateRange?.to as any,
            });
          }}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};
