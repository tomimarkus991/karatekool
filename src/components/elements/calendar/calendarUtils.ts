import { Variants } from "framer-motion";

const variants: Variants = {
  enter: (direction: number) => {
    return { x: `${100 * direction}%`, opacity: 0 };
  },
  middle: { x: "0%", opacity: 1 },
  exit: (direction: number) => {
    return { x: `${-100 * direction}%`, opacity: 0 };
  },
};

const removeImmediately: Variants = {
  exit: { visibility: "hidden" },
};
const currentMonthType = "MMMM yyyy";

const transition = { type: "tween", ease: "easeOut", duration: 1 };

export const calendarUtils = {
  variants,
  removeImmediately,
  currentMonthType,
  transition,
};
