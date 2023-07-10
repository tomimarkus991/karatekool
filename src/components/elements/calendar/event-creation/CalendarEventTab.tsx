"use client";

import { Tab } from "@headlessui/react";
import { Variants, motion } from "framer-motion";
import { Fragment } from "react";

import { AnimationWrapper, animations } from "@/components";
import { cn } from "@/lib";

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
              "focus:ring-0 ring-white ring-opacity-0 ring-offset-2 ring-offset-transparent focus:outline-none"
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
