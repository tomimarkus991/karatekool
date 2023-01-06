import { animations, AnimationWrapper, useSidebar } from "@redlotus/ui";
import { useTransform, motion, useMotionTemplate } from "framer-motion";

import { useBoundedScroll } from "hooks";

import { Logo } from "../Logo";

export const NavbarTopMobile = () => {
  const { setSidebarState, setPrevSidebarState } = useSidebar();
  const { scrollYBoundedProgress } = useBoundedScroll(100);

  const scrollYBoundedProgressThrottled = useTransform(
    scrollYBoundedProgress,
    // percentage of the scrollYBoundedProgress so when 0.75 it starts effect when 75 pixels are scrolled
    [0, 0.75, 1],
    [0, 0, 1]
  );

  // const opacity = useTransform(scrollYBoundedProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        height: useTransform(scrollYBoundedProgress, [0, 1], [150, 60]),
        backgroundColor: useMotionTemplate`rgba(255, 255, 255, ${useTransform(
          scrollYBoundedProgressThrottled,
          [0, 1],
          [1, 0.1]
        )})`,
      }}
      className="mx-auto inset-x-0 my-2 fixed top-0 z-[1200] flex rounded-md drop-shadow-lg backdrop-blur-md shadow-inner items-center w-[95%]"
    >
      <div className="flex flex-1 items-center justify-between px-4">
        <div className="font-semibold">
          <p className="text-3xl">nüke</p>
          <p className="text-lg">karate-do klubi</p>
        </div>
        <div className="scale-[.80]">
          <AnimationWrapper variants={animations.smallScale} key="ntm-club-icon">
            <div
              id="sidebar-button"
              role="button"
              tabIndex={0}
              className="flex cursor-pointer flex-row items-center"
              onClick={() => {
                setPrevSidebarState("closed");
                setSidebarState("mobile");
              }}
            >
              <Logo />
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </motion.div>
  );
};
