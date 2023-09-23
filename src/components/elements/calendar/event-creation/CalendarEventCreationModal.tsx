"use client";

import { Tab } from "@headlessui/react";
import { AnimatePresence, MotionConfig, Variants, motion } from "framer-motion";
import { Fragment, useState } from "react";
import { HiX } from "react-icons/hi";

import {
  AnimationWrapper,
  Modal,
  ResizablePanel,
  ThreeElementMovingBox,
  animations,
  defaultTransition,
} from "@/components";
import { cn } from "@/lib";
import { EventData } from "@/types";

import { AllDayEventCreationTab, MultiDayEventCreationTab, NormalEventCreationTab } from ".";

interface CalendarEventTabProps {
  children: React.ReactNode;
  selectedIndex: number;
  index: number;
}

const CalendarEventTab = ({ children, selectedIndex, index }: CalendarEventTabProps) => {
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
    <AnimationWrapper
      className="z-10 w-full my-auto text-center"
      variants={animations.smallScaleXs}
    >
      <Tab as={Fragment}>
        {({ selected }) => (
          <motion.button
            className={cn(
              "rounded-xl text-[0.8rem] md:text-base font-semibold px-1 py-3",
              selected ? "opacity-100" : "opacity-20 hover:opacity-100",
              "focus:ring-0 ring-white ring-opacity-0 ring-offset-2 ring-offset-transparent focus:outline-none",
            )}
            variants={tabVariant}
            animate={selectedIndex === index ? "active" : "inactive"}
          >
            <p>{children}</p>
          </motion.button>
        )}
      </Tab>
    </AnimationWrapper>
  );
};

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  button: React.ReactNode;
  /**
   * The date user selected when pressing on calendar date
   */
  openDate: Date;
  /**
   * If user wants to open the modal with a specific tab selected
   * 0 - normal event
   * 1 - all day event
   * 2 - multi day event
   */
  selectedTab?: number;
  /**
   * If user wants to edit an event
   */
  event?: EventData;
}

export const CalendarEventCreationModal = ({
  isModalOpen,
  setIsModalOpen,
  button,
  openDate,
  selectedTab = 0,
  event,
}: Props) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [selectedIndex, setSelectedIndex] = useState(selectedTab);

  return (
    <Modal
      open={isModalOpen}
      setOpen={setIsModalOpen}
      maxWidth="3xl"
      closeOnOverlayClick={false}
      minWidth="w-[30rem]"
      modalButton={button}
    >
      <MotionConfig transition={defaultTransition}>
        <div className="relative overflow-hidden">
          <ResizablePanel duration={defaultTransition.duration}>
            <div className="flex flex-row items-center justify-between pt-6 mb-4 px-7 sm2:mb-0">
              <p className="text-xl font-bold">Loo trenn</p>
              <div role="button" tabIndex={0} onClick={closeModal}>
                <AnimationWrapper key="sub-modal-x-icon" variants={animations.rotate360}>
                  <HiX className="w-8 h-8 fill-stone-700 hover:fill-stone-800" />
                </AnimationWrapper>
              </div>
            </div>
            <div className="p-2 sm:p-6">
              <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <Tab.List
                  className={cn(
                    "flex flex-row relative px-1 w-full flex-1 mb-6 bg-stone-100 rounded-xl mx-auto",
                    "shadow-lg ring-1 ring-stone-400 ring-opacity-5",
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
                        <NormalEventCreationTab openDate={openDate} event={event} />
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
                        <AllDayEventCreationTab openDate={openDate} />
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
                        <MultiDayEventCreationTab />
                      </Tab.Panel>
                    </AnimatePresence>
                  </div>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </ResizablePanel>
        </div>
      </MotionConfig>
    </Modal>
  );
};
