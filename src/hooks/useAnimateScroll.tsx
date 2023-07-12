"use client";

import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useAnimateScroll = (isOneTimeAnimation = false) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("animate");
    } else {
      // remove this if you don't want to animate every time you scroll
      if (!isOneTimeAnimation) {
        control.start("initial");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [control, inView]);

  return { control, ref };
};
