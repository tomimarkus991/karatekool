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
  animations,
} from "@/components";
import { useCreateCalendarEvent, useCreateEventPreset } from "@/hooks";
import { EventData } from "@/types";

import { Popover, PopoverContent, PopoverTrigger } from "../../../Popover";

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

interface TimeButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const TimeButton = ({ children, onClick }: TimeButtonProps) => {
  return (
    <button onClick={onClick} className="text-sm text-stone-600">
      {children}
    </button>
  );
};

export const NormalEventCreationTab = ({ openDate, event }: Props) => {
  const editEventInitialValues: NormalEventFormValues = {
    startTime: event ? new Date(event.start) : new Date(2022, 0, 1, 18, 0),
    // startHour: event ? Number(event.start.split("T")[1].split(":")[0]) : 18,
    // startMinute: event ? Number(event.start.split("T")[1].split(":")[1]) : 0,
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
          startTime: new Date(2022, 0, 1, 18, 0),
          selectedStartDates: [openDate],
          selectedGroups: [],
          // startHour: 18,
          // startMinute: 0,
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
          <Form>
            <div className="flex flex-col justify-between sm2:flex-row max-h-[35rem] md:max-h-[50rem] scrollbar-overflow px-5 py-10">
              {/* left side */}
              <div className="flex flex-col p-6 mb-6 md:shadow-lg sm2:mb-0 rounded-2xl md:ring-1 ring-gray-50 focus:outline-none">
                <div className="self-center mb-4">
                  <Presets
                    setValues={setValues}
                    currentPickedStartDate={values.selectedStartDates}
                  />
                </div>
                <div className="flex flex-row justify-around my-4">
                  <div className="pt-2">
                    {/* add popover with some preset times and form to add time */}
                    <Popover>
                      <PopoverTrigger>
                        <AnimationWrapper variants={animations.smallScale}>
                          <p className="text-lg">
                            {String(values.startTime.getHours()).padStart(2, "0")}:
                            {String(values.startTime.getMinutes()).padStart(2, "0")}
                          </p>
                        </AnimationWrapper>
                      </PopoverTrigger>
                      <PopoverContent className="z-[1300]">
                        <div className="grid w-40 h-24 grid-cols-3">
                          <TimeButton
                            onClick={() =>
                              setValues({ ...values, startTime: new Date(2022, 0, 1, 15, 0, 0) })
                            }
                          >
                            15:00
                          </TimeButton>
                          <TimeButton
                            onClick={() =>
                              setValues({ ...values, startTime: new Date(2022, 0, 1, 16, 15, 0) })
                            }
                          >
                            16:15
                          </TimeButton>
                          <TimeButton
                            onClick={() =>
                              setValues({ ...values, startTime: new Date(2022, 0, 1, 16, 30, 0) })
                            }
                          >
                            16:30
                          </TimeButton>
                          <TimeButton
                            onClick={() =>
                              setValues({ ...values, startTime: new Date(2022, 0, 1, 17, 30, 0) })
                            }
                          >
                            17:30
                          </TimeButton>
                          <TimeButton
                            onClick={() =>
                              setValues({ ...values, startTime: new Date(2022, 0, 1, 17, 45, 0) })
                            }
                          >
                            17:45
                          </TimeButton>
                          <TimeButton
                            onClick={() =>
                              setValues({ ...values, startTime: new Date(2022, 0, 1, 18, 0, 0) })
                            }
                          >
                            18:00
                          </TimeButton>
                          <TimeButton
                            onClick={() =>
                              setValues({ ...values, startTime: new Date(2022, 0, 1, 18, 45, 0) })
                            }
                          >
                            18:45
                          </TimeButton>
                          <TimeButton
                            onClick={() =>
                              setValues({ ...values, startTime: new Date(2022, 0, 1, 19, 0, 0) })
                            }
                          >
                            19:00
                          </TimeButton>
                        </div>
                        {/* <div className="flex flex-row">
                          <FormikInput
                            label="tund"
                            className="mr-2"
                            placeholder="18"
                            onChange={() => {
                              console.log(values);
                              setValues({
                                ...values,
                                startTime: new Date(
                                  2022,
                                  0,
                                  1,
                                  Number(values.startHour),
                                  Number(values.startMinute),
                                ),
                              });
                            }}
                            name="startHour"
                            type="number"
                            inputSize="sm"
                            min={15}
                            max={19}
                          />
                          <FormikInput
                            label="minut"
                            placeholder="0"
                            onChange={() => {
                              console.log(values.startHour, values.startMinute);

                              setValues({
                                ...values,
                                startTime: new Date(
                                  2022,
                                  0,
                                  1,
                                  Number(values.startHour),
                                  Number(values.startMinute),
                                ),
                              });
                            }}
                            name="startMinute"
                            type="number"
                            inputSize="sm"
                            min={0}
                            max={59}
                          />
                        </div> */}
                      </PopoverContent>
                    </Popover>
                  </div>

                  <MultiDatePicker name="selectedStartDates" />
                </div>

                <GroupPicker name="selectedGroups" />

                <div className="flex flex-col mt-6">
                  <div className="flex flex-row items-center justify-center">
                    <div className="flex flex-col mr-2">
                      <label className="text-xs sm:text-sm text-stone-400" htmlFor="isHighlighted">
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
              <div className="flex flex-col justify-center px-6 py-5 md:shadow-lg sm2:py-0 rounded-2xl sm:ml-0 md:ring-1 ring-gray-50 focus:outline-none">
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
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
