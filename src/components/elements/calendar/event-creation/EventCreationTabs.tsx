"use client";

import { Tab } from "@headlessui/react";
import { clsx } from "clsx";
import { format, parseISO } from "date-fns";
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
  AllDayEventCalendarDisplay,
  DatePicker,
  DatePickerWithRange,
  FormikInput,
  ThreeElementMovingBox,
  TimePicker,
  animations,
} from "@/components";
import { cn } from "@/lib";

import { CalendarEventTab } from ".";

export const EventCreationTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [normalEventInitialValues] = useState<NormalEventFormValues>({
    start: "",
  });
  const [allDayEventInitialValues] = useState<AllDayEventFormValues>({
    title: "",
    subTitle: "Treeninguid ei toimu",
    start: "",
  });
  const [multiDayEventInitialValues] = useState<MultiDayEventFormValues>({
    title: "",
    start: "",
    end: "",
  });

  const [time, setTime] = useState<Date>(new Date());
  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List
        className={clsx(
          "flex flex-row relative px-1 w-full flex-1 mb-6 bg-stone-100 rounded-xl max-w-md m-auto md:mb-12"
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
                validateOnChange={true}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);

                  setSubmitting(false);
                }}
              >
                {() => {
                  return (
                    <Form>
                      <TimePicker time={time} onChange={setTime} />
                      <DatePicker />
                    </Form>
                  );
                }}
              </Formik>

              {/* user chooses groups, time, trailers, title */}
              {/* add presets */}
              {/* add pick for multiple days */}
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
                validateOnChange={true}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);

                  setSubmitting(false);
                }}
              >
                {({ values }) => {
                  return (
                    <Form>
                      <DatePicker />
                      <FormikInput
                        required
                        className="w-full"
                        label="Pealkiri"
                        placeholder="Pealkiri"
                        name="title"
                      />
                      <FormikInput
                        required
                        className="w-full"
                        label="Ala pealkiri"
                        placeholder="Ala pealkiri"
                        name="subTitle"
                      />

                      <div
                        className={cn(
                          "h-52 w-36 border-1 mt-2 border-stone-100 border-t-0 flex flex-col"
                        )}
                      >
                        <p className="self-center font-semibold justify-self-center text-stone-500">
                          {values.start !== ""
                            ? format(parseISO(values.start), "EEEE")
                            : "Esmaspäev"}
                        </p>
                        <div className="flex flex-col items-center justify-center">
                          <div className="text-xs font-medium font-number sm:text-sm md:text-base text-text-primary">
                            {values.start !== "" ? parseISO(values.start).getDay() : "1"}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center flex-grow text-center">
                          <AllDayEventCalendarDisplay
                            title={values.title}
                            sub_title={values.subTitle}
                          />
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>

              {/* title and subtitle */}
              {/* add presets */}
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
                validateOnChange={true}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);

                  setSubmitting(false);
                }}
              >
                {() => {
                  return (
                    <Form>
                      <FormikInput
                        required
                        className="w-full"
                        label="Pealkiri"
                        placeholder="Pealkiri"
                        name="title"
                      />
                      <DatePickerWithRange />
                    </Form>
                  );
                }}
              </Formik>

              {/* title */}
              {/* add presets */}
            </Tab.Panel>
          </AnimatePresence>
        </div>
      </Tab.Panels>
    </Tab.Group>
  );
};
