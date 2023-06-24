"use client";

import { useScroll } from "framer-motion";
import { BsChevronCompactDown } from "react-icons/bs";

// https://www.npmjs.com/package/react-scroll-parallax
import { cn } from "@/lib";

export const Scroller = () => {
  const { scrollY } = useScroll();

  return (
    <>
      {/* mouse */}
      {/* make it scroll to section 2 and dissappear when scroll is down */}
      <button
        className={cn(
          "border-2 rounded-2xl w-6 h-11 fixed bottom-[15%] z-50 border-stone-800",
          "before:h-2 before:w-1 before:bg-stone-800 before:rounded-sm before:absolute before:top-1 before:left-[43%]",
          "before:animate-scrollwheel-move-down before:ease-out before:delay-300",
          "hidden md:block cursor-pointer",
          scrollY.get() > 0 && "hidden"
        )}
      />
    </>
  );
};

export const MobileScroller = () => {
  const { scrollY } = useScroll();
  return (
    <>
      {/* mobile */}
      <BsChevronCompactDown
        className={cn(
          "fixed z-50 w-20 h-20 md:hidden bottom-[30%] border-stone-700 rounded-2xl cursor-pointer",
          "animate-mobile-move-down ease-in-out",
          scrollY.get() > 0 && "hidden"
        )}
      />
    </>
  );
};
