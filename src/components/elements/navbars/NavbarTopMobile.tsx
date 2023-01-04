import { animations, AnimationWrapper, useSidebar } from "@redlotus/ui";

import { Logo } from "../Logo";

export const NavbarTopMobile = () => {
  const { setSidebarState, setPrevSidebarState } = useSidebar();
  return (
    <div className="mx-auto inset-x-0 my-2 fixed top-0 z-[1200] flex h-16 rounded-md drop-shadow-lg shadow-inner items-center w-[95%] bg-slate-50 py-12">
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
    </div>
  );
};
