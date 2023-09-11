"use client";

import { format } from "date-fns";
import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { AllDayEventFormValues, YupSchemas } from "@/app-constants";
import { DatePicker, RealButton } from "@/components";
import { useCreateCalendarAllDayEvent } from "@/hooks";

import { AllDayEventInput, ComboboxAllDayEventPresets } from ".";

interface Props {
  openDate: Date;
}

export const AllDayEventCreationTab = ({ openDate }: Props) => {
  const [allDayEventInitialValues] = useState<AllDayEventFormValues>({
    title: "",
    subTitle: "Treeninguid ei toimu",
    start: openDate,
  });
  const { mutate: createNewAllDayCalendarEvent } = useCreateCalendarAllDayEvent();

  return (
    <Formik
      initialValues={allDayEventInitialValues}
      validationSchema={YupSchemas.Events.AllDayEvent}
      validateOnMount
      validateOnChange
      onSubmit={({ start, title, subTitle }, { setSubmitting }) => {
        setSubmitting(true);

        if (start && title && subTitle) {
          createNewAllDayCalendarEvent({
            start: start.toISOString(),
            title,
            subTitle,
          });
        } else {
          toast.error("Täida kõik väljad");
        }

        setSubmitting(false);
      }}
    >
      {({ values, isValid }) => (
        <Form>
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center w-full space-y-4 sm2:flex-row sm2:space-y-0">
              <div className="w-full mr-6">
                <DatePicker name="start" />
                <ComboboxAllDayEventPresets name="title" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="self-center font-semibold justify-self-center text-stone-500">
                  {values.start ? format(values.start, "EEEE") : "Esmaspäev"}
                </p>
                <div className="flex flex-col self-center h-16 mt-2 border border-t-0 sm:h-20 md:h-28 lg:h-32 w-36 border-stone-100">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-xs font-medium font-number sm:text-sm md:text-base text-text-primary">
                      {values.start ? format(values.start, "dd") : "1"}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center flex-grow text-center">
                    <AllDayEventInput
                      name="title"
                      placeholder="Pealkiri"
                      className="mb-3 text-lg text-blue-600"
                    />
                    <AllDayEventInput
                      name="subTitle"
                      placeholder="Ala pealkiri"
                      className="text-sm !scrollbar-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <RealButton type="submit" className="mt-20 sm2:mt-8" isValid={isValid} variant="orange">
              Loo
            </RealButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};
