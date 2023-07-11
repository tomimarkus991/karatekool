"use client";

import { Tab } from "@headlessui/react";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import {
  AllDayEventFormValues,
  MultiDayEventFormValues,
  NormalEventFormValues,
  YupSchemas,
} from "@/app-constants";
import {
  DatePicker,
  DatePickerWithRange,
  FormikInput,
  FormikToggle,
  MapGroupLetter,
  MapHighLightedGroupLetter,
  NormalEventTime,
  RealButton,
  ThreeElementMovingBox,
  TimePicker,
  Toggle,
  animations,
} from "@/components";
import { cn } from "@/lib";
import { SGroup } from "@/types";

import { GroupPicker } from "./GroupPicker";
import { TrailerPicker } from "./TrailerPicker";

import { AllDayEventInput, CalendarEventTab } from ".";
import { ComboboxEventCreationMultiDayEvent } from "./ComboboxEventCreationMultiDayEvent";
import {
  useCreateCalendarEvent,
  useCreateCalendarMultiDayEvent,
  useCreateCalendarAllDayEvent,
} from "@/hooks";
import { ComboboxAllDayEventPresets } from "./ComboboxAllDayEventPresets";
import { toast } from "react-hot-toast";

interface Props {
  /**
   * The date user selected when pressing on calendar date
   */
  openDate: Date;
}

export const EventCreationTabs = ({ openDate }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [normalEventInitialValues] = useState<NormalEventFormValues>({
    startTime: new Date(),
    startDate: openDate,
    selectedGroups: [],
    trailer: {},
    description: "",
    isHighlighted: false,
    // this will not be implemented yet
    endTime: undefined,
  });
  const [allDayEventInitialValues] = useState<AllDayEventFormValues>({
    title: "",
    subTitle: "Treeninguid ei toimu",
    start: undefined,
  });
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

  const [advancedOptionsPressed, setAdvancedOptionsPressed] = useState(false);
  const [highlightGroupPressed] = useState(false);

  const { mutate: createNewNormalCalendarEvent } = useCreateCalendarEvent();
  const { mutate: createNewAllDayCalendarEvent } =
    useCreateCalendarAllDayEvent();
  const { mutate: createNewMultiDayCalendarEvent } =
    useCreateCalendarMultiDayEvent();

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List
        className={cn(
          "flex flex-row relative px-1 w-full flex-1 mb-6 bg-stone-100 rounded-xl mx-auto md:mb-12",
          "shadow-lg ring-1 ring-stone-400 ring-opacity-5"
        )}
      >
        <CalendarEventTab selectedIndex={selectedIndex} index={0}>
          Trenn
        </CalendarEventTab>
        <CalendarEventTab selectedIndex={selectedIndex} index={1}>
          Päevane sündmus
        </CalendarEventTab>
        <CalendarEventTab selectedIndex={selectedIndex} index={2}>
          Mitme päevane sündmus
        </CalendarEventTab>
        <ThreeElementMovingBox selectedIndex={selectedIndex} />
      </Tab.List>
      <Tab.Panels>
        <div className="p-3">
          <AnimatePresence>
            {/* normal */}
            {/* add pick for multiple days */}
            {/* add presets */}
            <Tab.Panel
              as={motion.div}
              initial="hidden"
              animate="active"
              exit="exit"
              variants={animations.calendarEventCreation.tabSwitch}
              key={"panel 1"}
            >
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
                    startDate,
                  },
                  { setSubmitting }
                ) => {
                  setSubmitting(true);

                  const groupIds =
                    selectedGroups
                      ?.filter((group) => !group.highlighted)
                      .map((group) => group.id as number) || [];

                  const highlightedGroupIds =
                    selectedGroups
                      ?.filter((group) => group.highlighted)
                      .map((group) => group.id as number) || [];

                  const mergeDateAndTime = (
                    startDate: Date,
                    startTime: Date
                  ): Date => {
                    let result = new Date(startDate.getTime());

                    result.setHours(startTime.getHours());
                    result.setMinutes(startTime.getMinutes());
                    result.setSeconds(startTime.getSeconds());

                    return result;
                  };

                  createNewNormalCalendarEvent({
                    start: mergeDateAndTime(startDate, startTime).toISOString(),
                    normalEventEnd: endTime,
                    groupIds,
                    highlightedGroupIds,
                    description,
                    trailerId: trailer.id,
                    isHighlighted,
                  });

                  setSubmitting(false);
                }}
              >
                {/* normal */}
                {({ values, isValid }) => {
                  const filteredGroups = values.selectedGroups
                    .filter((group) => !group.highlighted)
                    .map((group) => {
                      return {
                        letter: group.letter as SGroup["letter"],
                      } satisfies SGroup;
                    });

                  const filteredHighlightedGroups = values.selectedGroups
                    ?.filter((group) => group.highlighted)
                    .map((group) => {
                      return {
                        letter: group.letter as SGroup["letter"],
                      } satisfies SGroup;
                    });

                  return (
                    <Form>
                      <div className="flex flex-row justify-between pb-4">
                        <div className="flex flex-col items-start justify-start">
                          <div className="flex flex-row">
                            <div className="flex flex-col">
                              <p className="text-sm text-stone-600">
                                Vali trenni kellaaeg
                              </p>
                              <div className="pt-2">
                                <TimePicker name="startTime" />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-sm text-stone-600">
                                Vali trenni kuupäev
                              </p>
                              <DatePicker name="startDate" />
                            </div>
                          </div>

                          <GroupPicker
                            name="selectedGroups"
                            pressed={highlightGroupPressed}
                          />

                          <div className="flex flex-col pt-5">
                            <p className="text-xs text-stone-600">
                              Näita veel parameetreid
                            </p>
                            <Toggle
                              pressed={advancedOptionsPressed}
                              setPressed={setAdvancedOptionsPressed}
                            />
                            {advancedOptionsPressed && (
                              <div className="flex flex-col mt-4 ml-4 space-y-3">
                                {/* <div className="flex flex-col">
                                  <p className="text-xs text-stone-600">Vali millal trenn lõppeb</p>
                                  <TimePicker name="endTime" />
                                </div> */}

                                <div className="flex flex-col">
                                  <p className="text-xs text-stone-600">
                                    Tõsta trenn esile
                                  </p>
                                  <FormikToggle name="isHighlighted" />
                                </div>
                                <FormikInput
                                  inputSize="sm"
                                  label="Mis trennis toimub?"
                                  placeholder="karate seminar"
                                  name="description"
                                />
                                <TrailerPicker name="trailer" />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center ml-6 sm:ml-0">
                          <p className="self-center font-semibold justify-self-center text-stone-500">
                            {values.startDate
                              ? format(values.startDate, "EEEE")
                              : "Esmaspäev"}
                          </p>
                          <div className="flex flex-col mt-2 border border-t-0 h-52 w-36 border-stone-100">
                            <div className="flex flex-col items-center justify-center">
                              <div className="text-xs font-medium font-number sm:text-sm md:text-base text-text-primary">
                                {values.startDate
                                  ? format(values.startDate, "dd")
                                  : "1"}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center flex-grow ml-2 text-center">
                              <div className="flex flex-col justify-start rounded-lg">
                                <div
                                  id="normal-event"
                                  className="flex flex-row items-center justify-start"
                                >
                                  <NormalEventTime
                                    start={values.startTime}
                                    isHighlighted={values.isHighlighted}
                                  />
                                  <div
                                    id="normal-event"
                                    className={cn(
                                      "flex justify-center items-center"
                                    )}
                                  >
                                    <MapGroupLetter
                                      groups={
                                        filteredGroups.length === 0 &&
                                        filteredHighlightedGroups.length === 0
                                          ? [{ letter: "S" }, { letter: "K" }]
                                          : filteredGroups
                                      }
                                    />
                                    <MapHighLightedGroupLetter
                                      highlightedGroups={
                                        filteredGroups.length === 0 &&
                                        filteredHighlightedGroups.length === 0
                                          ? [{ letter: "N" }]
                                          : filteredHighlightedGroups
                                      }
                                    />
                                    {values.trailer && (
                                      <p
                                        id="normal-event"
                                        className="text-red-500 ml-1 lg:text-xs xl:text-sm sm:ml-[0.1rem] text-[0.5rem] sm:text-[0.55rem] font-number font-semibold text-center"
                                      >
                                        {values.trailer.text}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                {values.description && (
                                  <p className="text-[0.4rem] xs:text-[0.6rem] sm:text-[0.71rem] font-semibold text-left -mt-[0.2rem]">
                                    {values.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <RealButton
                            type="submit"
                            isValid={isValid}
                            className="mt-8"
                            variant="orange"
                          >
                            Loo
                          </RealButton>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Tab.Panel>

            {/* all day */}
            <Tab.Panel
              as={motion.div}
              initial="hidden"
              animate="active"
              exit="exit"
              variants={animations.calendarEventCreation.tabSwitch}
              key={"panel 2"}
            >
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
                {({ values, isValid }) => {
                  return (
                    <Form>
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-row items-center justify-center w-full">
                          <div className="w-full mr-6">
                            <DatePicker name="start" />
                            <ComboboxAllDayEventPresets name="title" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="self-center font-semibold justify-self-center text-stone-500">
                              {values.start
                                ? format(values.start, "EEEE")
                                : "Esmaspäev"}
                            </p>
                            <div className="flex flex-col mt-2 border border-t-0 h-52 w-36 border-stone-100">
                              <div className="flex flex-col items-center justify-center">
                                <div className="text-xs font-medium font-number sm:text-sm md:text-base text-text-primary">
                                  {values.start
                                    ? format(values.start, "dd")
                                    : "1"}
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
                        <RealButton
                          type="submit"
                          className="mt-8"
                          isValid={isValid}
                          variant="orange"
                        >
                          Loo
                        </RealButton>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Tab.Panel>
            {/* multi day */}
            <Tab.Panel
              as={motion.div}
              initial="hidden"
              animate="active"
              exit="exit"
              variants={animations.calendarEventCreation.tabSwitch}
              key={"panel 3"}
            >
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
                {({ isValid }) => {
                  return (
                    <Form>
                      <div className="flex flex-col items-center justify-center">
                        <DatePickerWithRange name="dateRange" />
                        <ComboboxEventCreationMultiDayEvent name="event" />
                        <RealButton
                          type="submit"
                          className="mt-8"
                          isValid={isValid}
                          variant="orange"
                        >
                          Loo
                        </RealButton>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Tab.Panel>
          </AnimatePresence>
        </div>
      </Tab.Panels>
    </Tab.Group>
  );
};
