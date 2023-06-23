"use client";

import { format } from "date-fns";
import { useField } from "formik";
import { HiOutlineCalendar } from "react-icons/hi";

import { AllDayEventFormik } from "@/app-constants";
import { AnimationWrapper, animations } from "@/components";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/elements/Popover";

import { DatePickerCalendar, DatePickerCalendarButton, DatePickerCalendarProps } from ".";

type Props = DatePickerCalendarProps & {
  name: string;
};
export const DatePicker = ({ name, className, ...props }: Props) => {
  const [field, { value }, { setValue }] = useField<AllDayEventFormik>(name);

  return (
    <Popover>
      <PopoverTrigger>
        <AnimationWrapper variants={animations.subtleScale}>
          <DatePickerCalendarButton variant="ghost" className="pl-0 ml-0 text-left group">
            <HiOutlineCalendar className="w-6 h-6 mr-2 text-stone-700 group-hover:text-stone-800" />
            {value ? format(value, "PPP") : <p>Vali kuupäev</p>}
          </DatePickerCalendarButton>
        </AnimationWrapper>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[5001]">
        <DatePickerCalendar
          {...field}
          {...props}
          mode="single"
          className={className}
          selected={value}
          onSelect={date => {
            setValue(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
