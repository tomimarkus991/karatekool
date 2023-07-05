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

import { GroupPicker } from "./GroupPicker";
import { TrailerPicker } from "./TrailerPicker";

import { AllDayEventInput, CalendarEventTab } from ".";

export const EventCreationTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [normalEventInitialValues] = useState<NormalEventFormValues>({
    startTime: undefined,
    startDate: undefined,
    groupIds: [],
    highlightedGroupIds: [],
    trailerId: undefined,
    description: "",
    isHighlighted: false,
    endTime: undefined,
  });
  const [allDayEventInitialValues] = useState<AllDayEventFormValues>({
    title: "",
    subTitle: "Treeninguid ei toimu",
    start: undefined,
  });
  const [multiDayEventInitialValues] = useState<MultiDayEventFormValues>({
    title: "",
    dateRange: {
      from: undefined,
      to: undefined,
    },
  });

  const [advancedOptionsPressed, setAdvancedOptionsPressed] = useState(false);
  const [highlightGroupPressed, setHighlightGroupPressed] = useState(false);

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List
        className={cn(
          "flex flex-row relative px-1 w-full flex-1 mb-6 bg-stone-100 rounded-xl m-auto md:mb-12"
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
            {/* user chooses groups, time, trailers, title */}
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
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);

                  setSubmitting(false);
                }}
              >
                {/* normal */}
                {({ values }) => {
                  return (
                    <Form>
                      <div className="flex flex-row justify-between pb-4">
                        <div className="flex flex-col items-start justify-start">
                          <div className="flex flex-col">
                            <p className="text-sm text-stone-600">Vali millal trenn algab</p>
                            <TimePicker name="startTime" />
                          </div>

                          <div className="flex flex-col">
                            <p className="text-sm text-stone-600">Esile tõstetud grupid</p>
                            <Toggle
                              pressed={highlightGroupPressed}
                              setPressed={setHighlightGroupPressed}
                            />
                            <GroupPicker pressed={highlightGroupPressed} />
                          </div>
                          <DatePicker name="startDate" />
                          <div className="flex flex-col">
                            <p className="text-sm text-stone-600">Lisa veel parameetreid</p>
                            <Toggle
                              pressed={advancedOptionsPressed}
                              setPressed={setAdvancedOptionsPressed}
                            />
                            {advancedOptionsPressed && (
                              <>
                                <div className="flex flex-col">
                                  <p className="text-sm text-stone-600">
                                    Võid valida millal trenn lõppeb
                                  </p>
                                  <TimePicker name="endTime" />
                                </div>
                                <FormikInput
                                  className="w-full"
                                  label="Info"
                                  placeholder="karate seminar"
                                  name="description"
                                />
                                <TrailerPicker />
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="self-center font-semibold justify-self-center text-stone-500">
                            {values.startDate ? format(values.startDate, "EEEE") : "Esmaspäev"}
                          </p>
                          <div className="flex flex-col mt-2 border border-t-0 h-52 w-36 border-stone-100">
                            <div className="flex flex-col items-center justify-center">
                              <div className="text-xs font-medium font-number sm:text-sm md:text-base text-text-primary">
                                {values.startDate ? format(values.startDate, "dd") : "1"}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center flex-grow ml-2 text-center">
                              <div className="flex flex-col justify-start rounded-lg">
                                <div
                                  id="normal-event"
                                  className="flex flex-row items-center justify-start"
                                >
                                  <NormalEventTime
                                    event={{
                                      is_highlighted: values.isHighlighted,
                                      start: new Date().toISOString(),
                                    }}
                                  />
                                  <div
                                    id="normal-event"
                                    className={cn("flex justify-center items-center")}
                                  >
                                    <MapGroupLetter groups={[{ letter: "S" }, { letter: "K" }]} />
                                    <MapHighLightedGroupLetter
                                      highlightedGroups={[{ letter: "N" }]}
                                    />
                                    {values.trailerId && (
                                      <p
                                        id="normal-event"
                                        className="text-red-500 ml-1 lg:text-xs xl:text-sm sm:ml-[0.1rem] text-[0.5rem] sm:text-[0.55rem] font-number font-semibold text-center"
                                      >
                                        {values.trailerId}
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
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Tab.Panel>

            {/* all day */}
            {/* add presets */}
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
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);

                  setSubmitting(false);
                }}
              >
                {({ values, submitForm }) => {
                  return (
                    <Form>
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-row items-center justify-center">
                          <div className="mr-6">
                            <DatePicker name="start" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="self-center font-semibold justify-self-center text-stone-500">
                              {values.start ? format(values.start, "EEEE") : "Esmaspäev"}
                            </p>
                            <div className="flex flex-col mt-2 border border-t-0 h-52 w-36 border-stone-100">
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
                                  className="text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <RealButton className="mt-8" onClick={submitForm} variant="orange">
                          Loo
                        </RealButton>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Tab.Panel>
            {/* multi day */}
            {/* add presets */}
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
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);

                  setSubmitting(false);
                }}
              >
                {({ submitForm }) => {
                  return (
                    <Form>
                      <div className="flex flex-col items-center justify-center">
                        <DatePickerWithRange name="dateRange" />
                        <FormikInput
                          required
                          className="sm:w-[38rem] lg:w-[40rem]"
                          label="Pealkiri"
                          placeholder="Pealkiri"
                          name="title"
                        />
                        <RealButton className="mt-8" onClick={submitForm} variant="orange">
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
