import { Variants } from "framer-motion";

const removeImmediately: Variants = {
  exit: { visibility: "hidden" },
};
const currentMonthType = "MMMM yyyy";

export const calendarUtils = {
  removeImmediately,
  currentMonthType,
};
