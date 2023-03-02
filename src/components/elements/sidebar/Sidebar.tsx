import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import { useEffect, ReactNode, Fragment, useState } from "react";
import { HiChevronDoubleRight } from "react-icons/hi";

import { animations, AnimationWrapper } from "@/components";
import { useSidebar } from "@/context";
import { useIsMobile, useModifySidebarBasedOnDevice, useSidebarUtils } from "@/hooks";

export const SidebarTooltip = ({ tooltip }: { tooltip: string }) => {
  return (
    <span
      id="tooltip"
      className={clsx(
        "absolute left-[5.5rem] z-[997] p-2 text-sm font-bold text-white",
        "origin-left scale-0 rounded-md bg-gray-800 shadow-md transition-all duration-200",
        "lowercase tracking-wider group-hover:scale-100"
      )}
    >
      {tooltip}
    </span>
  );
};

interface Props {
  SmallSidebarContent: ReactNode;
  ExpandedSidebarContent: ReactNode;
}

export const Sidebar = ({ SmallSidebarContent, ExpandedSidebarContent }: Props) => {
  useSidebarUtils();

  const { sidebarState, placement, setSidebarState } = useSidebar();
  const { isMobile } = useIsMobile();
  const { modifyBasedOnDevice, modifyOnClick } = useModifySidebarBasedOnDevice();

  useEffect(() => {
    modifyBasedOnDevice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <AnimatePresence initial={false}>
      {sidebarState === "mobile" && (
        <>
          <AnimationWrapper
            id="sidebar"
            key="mobile-app-sidebar-wrapper"
            variants={animations.sidebar.mobile(placement)}
            className={clsx(
              "fixed top-0 z-[1205] flex h-full w-64 flex-col bg-white",
              placement === "right" ? "right-0" : "left-0"
            )}
          >
            <div className="flex h-full flex-col justify-between py-6 px-3">
              {ExpandedSidebarContent}
            </div>
          </AnimationWrapper>

          <AnimationWrapper
            key="mobile-app-sidebar-overlay"
            id="overlay"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.5,
            }}
            transition={{ duration: 0.4, ease: "linear" }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarState(isMobile ? "closed" : "small")}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 z-[1201] transition-opacity"
          />
        </>
      )}

      {(sidebarState === "expanded" || sidebarState === "small") && (
        <>
          <AnimatePresence mode="wait" initial={false}>
            {sidebarState === "small" && (
              <AnimationWrapper
                key="small-sidebar-chevron-icon-wrapper"
                className={clsx(
                  "shadow-notLeft rounded-r-xl p-2 z-[1201] cursor-pointer bg-white hover:bg-slate-100 fixed top-[4rem] left-[6.5rem]"
                )}
                onClick={modifyOnClick}
                variants={animations.sidebar.sideButton}
              >
                <AnimationWrapper
                  child
                  key="small-sidebar-chevron-icon"
                  variants={animations.smallScale}
                >
                  <HiChevronDoubleRight className="h-7 w-7 fill-slate-700 hover:fill-slate-800" />
                </AnimationWrapper>
              </AnimationWrapper>
            )}
          </AnimatePresence>
          <AnimationWrapper
            id="sidebar"
            key="app-sidebar-expanded-small-wrapper"
            className={clsx(
              "top-8 flex h-[94vh] before:rounded-xl bg-white rounded-xl shadow-lg flex-col ml-2 z-[1200] fixed"
            )}
            animate={{
              transition: {
                duration: 0.4,
                ease: "easeInOut",
                // delay: 0.7,
              },
              width: sidebarState === "expanded" ? "18rem" : "6rem",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {sidebarState === "expanded" ? (
                <AnimationWrapper
                  className="flex h-full flex-col justify-between py-6 px-3"
                  key="extended-app-sidebar-content"
                  variants={animations.sidebar.content}
                >
                  {ExpandedSidebarContent}
                </AnimationWrapper>
              ) : (
                <AnimationWrapper
                  key="small-app-sidebar-content"
                  className="flex h-full flex-col justify-between items-start pr-3 py-6 pl-5"
                  variants={animations.sidebar.content}
                >
                  {SmallSidebarContent}
                </AnimationWrapper>
              )}
            </AnimatePresence>
          </AnimationWrapper>
        </>
      )}
    </AnimatePresence>
  );
};

export const Example = () => {
  const [open, setOpen] = useState(true);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Panel title
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <HiChevronDoubleRight className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div
                          className="h-full border-2 border-dashed border-gray-200"
                          aria-hidden="true"
                        />
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
