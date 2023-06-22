"use client";

import { AnimatePresence } from "framer-motion";

import { animations, AnimationWrapper } from "@/components";
import { useSidebar } from "@/context";
import { cn } from "@/lib";

import { MobileSidebarContent } from "../navigation";

export const Sidebar = () => {
  const { sidebarState, placement, setSidebarState } = useSidebar();

  return (
    <AnimatePresence initial={false}>
      {sidebarState === "mobile" && (
        <>
          <AnimationWrapper
            id="sidebar"
            key="mobile-app-sidebar-wrapper"
            variants={animations.sidebar.mobile(placement)}
            className={cn(
              "fixed z-[1205] flex h-[96vh] w-64 flex-col bg-white top-4 mr-4 rounded-xl",
              placement === "right" ? "right-0" : "left-0"
            )}
          >
            <div className="flex flex-col h-full px-3 py-6">
              <MobileSidebarContent />
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
            onClick={() => setSidebarState("closed")}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 z-[1201] transition-opacity"
          />
        </>
      )}
    </AnimatePresence>
  );
};
