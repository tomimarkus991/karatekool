"use client";

import { Tab } from "@headlessui/react";
import { clsx } from "clsx";
import { format, isSameMonth, isToday, parseISO } from "date-fns";
import { Form, Formik } from "formik";
import { AnimatePresence, MotionConfig, Variants, motion } from "framer-motion";
import { Fragment, useState } from "react";
import { HiX } from "react-icons/hi";
import useMeasure from "react-use-measure";

import {
  AllDayEventFormValues,
  MultiDayEventFormValues,
  NormalEventFormValues,
  YupSchemas,
} from "@/app-constants";
import {
  AnimationWrapper,
  Event,
  Modal,
  animations,
  DatePicker,
  DatePickerWithRange,
  TimePicker,
  FormikInput,
  ResizablePanel,
  AllDayEventCalendarDisplay,
} from "@/components";
import { useUser } from "@/hooks";
import { cn } from "@/lib";
import { EventData } from "@/types";

interface Props {
  events: EventData[];
  date: Date;
  month: Date;
  isFetched: boolean;
  isAnimating: boolean;
}

interface WhiteMovingBoxProps {
  selectedIndex: number;
}

const duration = 0.4;

const WhiteMovingBox2 = ({ selectedIndex }: WhiteMovingBoxProps) => {
  const whiteMovingBox: Variants = {
    active0: {
      left: "0%",
      transition: {
        ease: "easeOut",
        duration,
      },
    },
    active1: {
      left: "33.33%",
      transition: {
        ease: "easeOut",
        duration,
      },
    },
    active2: {
      left: "66.67%",
      transition: {
        ease: "easeOut",
        duration,
      },
    },
  };
  return (
    <motion.div
      variants={whiteMovingBox}
      animate={selectedIndex === 0 ? "active0" : selectedIndex === 1 ? "active1" : "active2"}
      className="bg-white absolute inset-0 w-[33.33%] rounded-xl"
    />
  );
};

const eventContentVariants = (toLeft: boolean) => {
  const variant: Variants = {
    hidden: {
      x: toLeft ? 20 : -20,
      opacity: 0,
    },
    active: {
      x: 0,
      opacity: 1,
      transition: {
        duration,
      },
    },
  };
  return variant;
};

interface CalendarEventTabProps {
  children: React.ReactNode;
  selectedIndex: number;
  index: number;
}

export const CalendarEventTab = ({ children, selectedIndex, index }: CalendarEventTabProps) => {
  const tabVariant: Variants = {
    active: {
      color: "#E50815",
      transition: {
        ease: "easeOut",
        duration: 0.6,
      },
    },
    inactive: {
      transition: {
        ease: "easeOut",
        duration: 0.6,
      },
    },
  };

  return (
    <Tab as={Fragment}>
      {() => (
        <AnimationWrapper
          className={cn(
            "rounded-xl z-10 text-[0.8rem] md:text-base font-semibold px-1 py-3 w-full cursor-pointer flex justify-center items-center",
            "focus:ring-0 ring-white ring-opacity-0 ring-offset-2 ring-offset-transparent focus:outline-none"
          )}
          variants={animations.smallScale}
        >
          <motion.button
            variants={tabVariant}
            animate={selectedIndex === index ? "active" : "inactive"}
          >
            {children}
          </motion.button>
        </AnimationWrapper>
      )}
    </Tab>
  );
};

const transition = { type: "ease", ease: "easeInOut", duration: 1 };

export const CalendarDate = ({ events, date, month }: Props) => {
  const [ref, bounds] = useMeasure();
  const { data: user } = useUser();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      setOpen={setIsModalOpen}
      maxWidth="2xl"
      closeOnOverlayClick={false}
      modalButton={
        <button
          ref={ref}
          className={clsx(
            "w-full h-full m-auto box-border p-[0.1rem] sm:p-1",
            "border-stone-100 border-r first:border-l"
          )}
          onClick={() => {
            if (user?.role === "admin") {
              openModal();
            }
          }}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-center">
              <time
                className={clsx(
                  "font-number font-medium text-xs sm:text-sm md:text-base",
                  isToday(date)
                    ? // ? "text-white bg-primary h-4 w-4 sm:h-5 sm:w-5 rounded-full text-center"
                      "text-primary"
                    : `${!isSameMonth(date, month) ? "text-stone-300" : "text-text-primary"}`
                )}
                dateTime={format(date, "dd-MM-yyyy")}
              >
                {date.getDate()}
              </time>
            </div>

            <div className={clsx("h-full flex-col relative flex")}>
              {events.map(event => {
                return <Event key={event.id} event={event} date={date} bounds={bounds} />;
              })}
            </div>
          </div>
        </button>
      }
    >
      <>
        <MotionConfig transition={transition}>
          <div className="relative overflow-hidden">
            <ResizablePanel duration={transition.duration}>
              <div className="flex flex-row items-center justify-between pt-6 px-7">
                <p className="text-xl font-bold">Loo trenn</p>
                <div role="button" tabIndex={0} onClick={closeModal}>
                  <AnimationWrapper key="sub-modal-x-icon" variants={animations.rotate360}>
                    <HiX className="w-8 h-8 fill-stone-700 hover:fill-stone-800" />
                  </AnimationWrapper>
                </div>
              </div>
              <div className="p-10">
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
                    <WhiteMovingBox2 selectedIndex={selectedIndex} />
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
                          variants={eventContentVariants(true)}
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
                          variants={eventContentVariants(false)}
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
                                        {values.start !== ""
                                          ? parseISO(values.start).getDay()
                                          : "1"}
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
                          variants={eventContentVariants(false)}
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
              </div>
            </ResizablePanel>
          </div>
        </MotionConfig>
      </>
    </Modal>
  );
};
