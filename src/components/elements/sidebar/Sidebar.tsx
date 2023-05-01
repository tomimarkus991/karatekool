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
  const { modifyBasedOnDevice } = useModifySidebarBasedOnDevice();

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
              "fixed z-[1205] flex h-[96vh] w-64 flex-col bg-white top-4 mr-4 rounded-xl",
              placement === "right" ? "right-0" : "left-0"
            )}
          >
            <div className="flex flex-col h-full px-3 py-6">{ExpandedSidebarContent}</div>
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

      {sidebarState === "expanded" && (
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
                className="flex flex-col justify-between h-full px-3 py-6"
                key="extended-app-sidebar-content"
                variants={animations.sidebar.content}
              >
                {ExpandedSidebarContent}
              </AnimationWrapper>
            ) : (
              <AnimationWrapper
                key="small-app-sidebar-content"
                className="flex flex-col items-start justify-between h-full py-6 pl-5 pr-3"
                variants={animations.sidebar.content}
              >
                {SmallSidebarContent}
              </AnimationWrapper>
            )}
          </AnimatePresence>
        </AnimationWrapper>
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
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                  <div className="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Panel title
                        </Dialog.Title>
                        <div className="flex items-center ml-3 h-7">
                          <button
                            type="button"
                            className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <HiChevronDoubleRight className="w-6 h-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex-1 px-4 mt-6 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div
                          className="h-full border-2 border-gray-200 border-dashed"
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
