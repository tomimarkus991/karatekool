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
