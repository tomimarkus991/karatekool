import { useTransform, motion, useMotionTemplate } from "framer-motion";

import { AnimationWrapper, animations } from "@/components";
import { Icons } from "@/components/icons/Icons";
import { useSidebar } from "@/context";
import { useBoundedScroll } from "@/hooks";

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
        height: useTransform(scrollYBoundedProgress, [0, 1], [100, 80]),
        backgroundColor: useMotionTemplate`rgba(255, 255, 255, ${useTransform(
          scrollYBoundedProgressThrottled,
          [0, 1],
          [1, 0.1]
        )})`,
        scale: useTransform(scrollYBoundedProgress, [0, 1], [1, 0.8]),
        top: useTransform(scrollYBoundedProgress, [0, 1], [0, -10]),
      }}
      className="mx-auto inset-x-0 my-2 fixed top-0 z-[1200] flex rounded-md drop-shadow-lg backdrop-blur-md shadow-inner items-center w-[95%]"
    >
      <div className="flex flex-row items-center justify-between flex-1 px-4">
        <div className="flex flex-row items-center justify-start flex-1">
          <div className="scale-[.80]">
            <div role="button" tabIndex={0} className="flex flex-row items-center cursor-pointer">
              <Icons.logo />
            </div>
          </div>
          <div className="flex flex-col font-semibold">
            <p className="text-3xl">nüke</p>
            <p className="text-lg">karate-do klubi</p>
          </div>
        </div>
        <AnimationWrapper variants={animations.smallScale} key="ntm-club-icon">
          <Icons.menuIcon
            id="sidebar-button"
            className="scale-[.70] sm:scale-[.80] cursor-pointer"
            onClick={() => {
              setPrevSidebarState("closed");
              setSidebarState("mobile");
            }}
          />
        </AnimationWrapper>
      </div>
    </motion.div>
  );
};
