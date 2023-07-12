"use client";

import { AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { BsChevronCompactDown } from "react-icons/bs";

// https://www.npmjs.com/package/react-scroll-parallax
import { cn } from "@/lib";

import { useAnimateScroll } from "../../../hooks";
import { AnimationWrapper, animations } from "../../animations";
interface Props {
  scroll: () => void;
}
export const Scroller = ({ scroll }: Props) => {
  const { scrollY } = useScroll();

  const [currentScroll, setCurrentScroll] = useState(0);
  const { control, ref } = useAnimateScroll();

  useEffect(
    () =>
      scrollY.on("change", current => {
        setCurrentScroll(current);
      }),
    [scrollY],
  );

  return (
    <AnimatePresence>
      {currentScroll <= 0 && (
        <AnimationWrapper
          onClick={scroll}
          ref={ref}
          animate={control}
          variants={animations.mouseFadeInFromBottom}
          className={cn(
            "border-2 rounded-2xl w-6 h-11 fixed bottom-[10%] left-[50%] z-50 border-stone-800 cursor-pointer",
            "before:h-2 before:w-1 before:bg-stone-800 before:rounded-sm before:absolute before:top-1 before:left-[43%]",
            "before:animate-scrollwheel-move-down before:ease-out before:delay-300",
            "hidden md:block",
          )}
        />
      )}
    </AnimatePresence>
  );
};

export const MobileScroller = ({ scroll }: Props) => {
  const { scrollY } = useScroll();

  const [currentScroll, setCurrentScroll] = useState(0);
  const { control, ref } = useAnimateScroll();

  useEffect(
    () =>
      scrollY.on("change", current => {
        setCurrentScroll(current);
      }),
    [scrollY],
  );

  return (
    <AnimatePresence>
      {currentScroll <= 0 && (
        <div className="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 md:hidden top-[85%] left-1/2">
          <AnimationWrapper
            id="mouse-mobile-scroller"
            ref={ref}
            onClick={scroll}
            animate={control}
            variants={animations.mouseFadeInFromBottom}
          >
            <BsChevronCompactDown
              className={cn(
                "w-20 h-20 cursor-pointer fill-stone-700 rounded-2xl",
                "delay-1000 animate-mobile-move-down",
              )}
            />
          </AnimationWrapper>
        </div>
      )}
    </AnimatePresence>
  );
};
