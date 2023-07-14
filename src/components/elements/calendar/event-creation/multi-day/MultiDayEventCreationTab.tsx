"use client";

import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { MultiDayEventFormValues, YupSchemas } from "@/app-constants";
import { DatePickerWithRange, RealButton } from "@/components";
import { useCreateCalendarMultiDayEvent } from "@/hooks";

import { ComboboxEventCreationMultiDayEvent } from ".";

export const MultiDayEventCreationTab = () => {
  const [multiDayEventInitialValues] = useState<MultiDayEventFormValues>({
    event: {
      id: 0,
      title: "",
    },
    dateRange: {
      from: undefined,
      to: undefined,
    },
  });

  const { mutate: createNewMultiDayCalendarEvent } = useCreateCalendarMultiDayEvent();

  return (
    <Formik
      initialValues={multiDayEventInitialValues}
      validationSchema={YupSchemas.Events.MultiDayEvent}
      validateOnMount
      validateOnChange
      onSubmit={({ dateRange, event }, { setSubmitting }) => {
        setSubmitting(true);

        if (dateRange.from && dateRange.to && event.id) {
          createNewMultiDayCalendarEvent({
            start: dateRange.from.toISOString(),
            long_event_end: dateRange.to.toISOString(),
            multi_day_event_id: event.id,
          });
        } else {
          toast.error("Täida kõik väljad");
        }

        setSubmitting(false);
      }}
    >
      {({ isValid }) => (
        <Form>
          <div className="flex flex-col items-center justify-center">
            <DatePickerWithRange name="dateRange" />
            <ComboboxEventCreationMultiDayEvent name="event" />
            <RealButton type="submit" className="mt-8" isValid={isValid} variant="orange">
              Loo
            </RealButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};
