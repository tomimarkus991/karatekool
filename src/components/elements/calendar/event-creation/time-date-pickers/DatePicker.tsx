"use client";

import { format } from "date-fns";
import { useField } from "formik";
import { Dispatch, SetStateAction } from "react";
import { HiOutlineCalendar } from "react-icons/hi";

import { AllDayEventFormik } from "@/app-constants";
import { AnimationWrapper, animations, calendarUtils } from "@/components";
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
            {value ? format(value, "PPP") : <p className="text-lg">Vali kuupäev</p>}
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
export const MultiDatePicker = ({ name, className, ...props }: Props) => {
  const [field, { value: values }, { setValue }] = useField<Date[] | undefined>(name);

  return (
    <Popover>
      <PopoverTrigger>
        <AnimationWrapper variants={animations.subtleScale}>
          <DatePickerCalendarButton variant="ghost" className="pl-0 ml-0 text-left group">
            <HiOutlineCalendar className="w-6 h-6 mr-2 text-stone-700 group-hover:text-stone-800" />
            {values?.length && values[0] ? (
              <p className="text-lg">{values.length} päeva on veel valitud</p>
            ) : (
              <p className="text-lg">Vali kuupäev</p>
            )}
          </DatePickerCalendarButton>
        </AnimationWrapper>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[5001]">
        <DatePickerCalendar
          {...field}
          {...props}
          mode="multiple"
          className={className}
          selected={values}
          onSelect={date => {
            setValue(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

type RegularDatePickerProps = DatePickerCalendarProps & {
  children: React.ReactNode;
  value: Date;
  setValue: Dispatch<SetStateAction<string>>;
  setCurrentPickedDay: Dispatch<SetStateAction<Date | undefined>>;
  setCurrentMonthString: Dispatch<SetStateAction<string>>;
};

export const RegularDatePicker = ({
  className,
  children,
  value,
  setValue,
  setCurrentPickedDay,
  setCurrentMonthString,
  ...props
}: RegularDatePickerProps) => {
  const { currentDayType, currentMonthType } = calendarUtils;

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[5001]">
        <DatePickerCalendar
          {...props}
          mode="single"
          className={className}
          defaultMonth={value}
          selected={value}
          onSelect={date => {
            setValue(format(date as Date, currentDayType));
            setCurrentMonthString(format(date as Date, currentMonthType));

            setCurrentPickedDay(date as Date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
