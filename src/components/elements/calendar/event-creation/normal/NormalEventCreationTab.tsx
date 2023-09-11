"use client";

import { Form, Formik } from "formik";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

import { NormalEventFormValues, YupSchemas } from "@/app-constants";
import {
  AnimationWrapper,
  FormikInput,
  FormikToggle,
  MultiDatePicker,
  RealButton,
  TimePicker,
  animations,
} from "@/components";
import { useCreateCalendarEvent, useCreateEventPreset } from "@/hooks";
import { EventData } from "@/types";

import { GroupPicker, Presets, PreviewEvent, TrailerPicker } from ".";

const mergeDateAndTime = (startDate: Date, startTime: Date): Date => {
  const result = new Date(startDate.getTime());

  result.setHours(startTime.getHours());
  result.setMinutes(startTime.getMinutes());
  result.setSeconds(startTime.getSeconds());

  return result;
};

interface Props {
  openDate: Date;
  event?: EventData;
}

export const NormalEventCreationTab = ({ openDate, event }: Props) => {
  const editEventInitialValues: NormalEventFormValues = {
    startTime: event ? new Date(event.start) : new Date(),
    selectedStartDates: event ? [new Date(event.start)] : [new Date()],
    selectedGroups: event ? [...event.group, ...event.highlighted_group] : ([] as any),
    trailer: event && event.event_trailer !== null ? event.event_trailer : {},
    description: event?.description || "",
    isHighlighted: event?.is_highlighted || false,
    // this will not be implemented yet
    endTime: event?.normal_event_end || undefined,
  };
  const [normalEventInitialValues] = useState<NormalEventFormValues>(
    event
      ? editEventInitialValues
      : {
          startTime: new Date(),
          selectedStartDates: [openDate],
          selectedGroups: [],
          trailer: {},
          description: "",
          isHighlighted: false,
          // this will not be implemented yet
          endTime: undefined,
        },
  );

  const { mutate: createNewNormalCalendarEvent } = useCreateCalendarEvent();

  const { mutate: createEventPreset } = useCreateEventPreset();
  return (
    <Formik
      initialValues={normalEventInitialValues}
      validationSchema={YupSchemas.Events.NormalEvent}
      validateOnMount
      validateOnChange
      onSubmit={(
        {
          startTime,
          endTime,
          selectedGroups,
          description,
          trailer,
          isHighlighted,
          selectedStartDates,
        },
        { setSubmitting },
      ) => {
        setSubmitting(true);

        const groupIds =
          selectedGroups?.filter(group => !group.highlighted).map(group => group.id as number) ||
          [];

        const highlightedGroupIds =
          selectedGroups?.filter(group => group.highlighted).map(group => group.id as number) || [];

        const startDates = selectedStartDates.map(date => {
          return mergeDateAndTime(date as Date, startTime).toISOString();
        });

        createNewNormalCalendarEvent({
          id: event?.id,
          normalEventEnd: endTime,
          groupIds,
          highlightedGroupIds,
          description,
          trailerId: trailer.id,
          isHighlighted,
          selectedStartDates: startDates,
        });

        setSubmitting(false);
      }}
    >
      {/* normal */}
      {({ values, isValid, setValues }) => {
        return (
          <Form className="flex flex-col justify-between sm2:flex-row">
            {/* left side */}
            <div className="flex flex-col p-6 mb-6 shadow-lg sm2:mb-0 rounded-2xl ring-1 ring-gray-50 focus:outline-none">
              <div className="self-center mb-4">
                <Presets setValues={setValues} />
              </div>
              <div className="flex flex-row my-4">
                <div className="pt-2">
                  <TimePicker name="startTime" />
                </div>

                <MultiDatePicker name="selectedStartDates" />
              </div>

              <GroupPicker name="selectedGroups" />

              <div className="flex flex-col mt-6">
                <div className="flex flex-row items-center justify-center">
                  <div className="flex flex-col mr-2">
                    <label className="text-sm text-stone-400" htmlFor="isHighlighted">
                      Tõsta trenn esile
                    </label>
                    <div className="my-2">
                      <FormikToggle name="isHighlighted" />
                    </div>
                  </div>
                  <FormikInput
                    inputSize="sm"
                    label="Mis trennis toimub?"
                    placeholder="karate seminar"
                    name="description"
                  />
                </div>
                <TrailerPicker name="trailer" />
              </div>
            </div>
            {/* right side */}
            <div className="flex flex-col justify-center px-6 py-5 shadow-lg sm2:py-0 rounded-2xl sm:ml-0 ring-1 ring-gray-50 focus:outline-none">
              <AnimationWrapper
                className="self-center mb-4 max-w-fit max-h-fit"
                variants={animations.smallLeftRotation}
              >
                <RotateCcw
                  className="cursor-pointer text-stone-700 hover:text-stone-800"
                  onClick={() => {
                    setValues(normalEventInitialValues);
                  }}
                />
              </AnimationWrapper>
              <PreviewEvent values={values} />
              <RealButton type="submit" isValid={isValid} className="mt-8" variant="orange">
                {event ? "Uuenda" : "Loo"}
              </RealButton>
              {!event && (
                <RealButton
                  className="mt-4"
                  variant="light"
                  onClick={() => {
                    const groupIds = values.selectedGroups
                      .filter(group => !group.highlighted)
                      .map(group => group.id as number);

                    const highlightedGroupIds = values.selectedGroups
                      .filter(group => group.highlighted)
                      .map(group => group.id as number);

                    createEventPreset({
                      description: values.description || null,
                      group_ids: groupIds,
                      highlighted_group_ids: highlightedGroupIds,
                      start: mergeDateAndTime(
                        values.selectedStartDates[0] || new Date(),
                        values.startTime,
                      ).toISOString(),
                      trailer_id: values.trailer.id || null,
                      is_highlighted: values.isHighlighted,
                    });
                  }}
                >
                  Loo preset
                </RealButton>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
