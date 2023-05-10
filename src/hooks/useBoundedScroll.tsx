"use client";

import { useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";

/**
 * this function is used to clamp the value between min and max
 */
const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * @argument bounds - how many pixels to scroll before the scrollYBoundedProgress reaches 1
 **/
export const useBoundedScroll = (bounds: number) => {
  const { scrollY } = useScroll();
  const scrollYBounded = useMotionValue(0);
  const scrollYBoundedProgress = useTransform(scrollYBounded, [0, bounds], [0, 1]);

  useEffect(() => {
    return scrollY.on("change", current => {
      const previous = scrollY.getPrevious();
      const diff = current - previous;
      const newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, bounds));
    });
  }, [bounds, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
};
// usage
// const { scrollYBoundedProgress } = useBoundedScroll(100);
// const scrollYBoundedProgressThrottled = useTransform(
//   scrollYBoundedProgress,
// // percentage of the scrollYBoundedProgress so when 0.75 it starts effect when 75 pixels are scrolled
//   [0, 0.75, 1],
//   [0, 0, 1]
// );
// const height = useTransform(scrollYBoundedProgress, [0, 1], [80, 50]);
// const opacity = useTransform(scrollYBoundedProgress, [0, 1], [1, 0]);

// style={{
//     height: useTransform(scrollYBoundedProgress, [0, 1], [80, 50]),
// }}

// style={{
//     backgroundColor: useMotionTemplate`rgba(255, 255, 255, ${useTransform(scrollYBoundedProgress, [0, 1], [1, 0.1])})`,
// }}
