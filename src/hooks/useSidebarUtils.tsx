import { useEffect } from "react";

import { useSidebar } from "@/context";
import { useIsMobile } from "@/hooks";

export const useSidebarUtils = () => {
  const { sidebarState, setSidebarState, setPrevSidebarState } = useSidebar();
  const { isMobile } = useIsMobile();
  // when sidebar is expanded and click is not on sidebar, close the sidebar
  const sidebar = document.getElementById("sidebar");
  useEffect(() => {
    const closeSidebar = (e: MouseEvent) => {
      e.preventDefault();

      const target = e.target as HTMLElement;

      if (sidebarState === "expanded" && target !== sidebar && !sidebar?.contains(target)) {
        if (!isMobile) {
          // when sidebar is expanded and click is not on sidebar, close the sidebar to small
          setPrevSidebarState("expanded");
          setSidebarState("small");
        }
      }
    };
    window.addEventListener("click", closeSidebar);
    return () => window.removeEventListener("click", closeSidebar);
  }, [sidebarState]);
};

export const useModifySidebarBasedOnDevice = () => {
  const { sidebarState, setSidebarState, setPrevSidebarState } = useSidebar();
  const { isMobile } = useIsMobile();
  const modifyBasedOnDevice = () => {
    if (isMobile) {
      setPrevSidebarState("mobile");
      setSidebarState("closed");
    } else {
      if (sidebarState === "expanded") {
        setPrevSidebarState("small");
        setSidebarState("expanded");
      } else {
        setPrevSidebarState("expanded");
        setSidebarState("small");
      }
    }
  };

  const modifyOnClick = () => {
    if (isMobile) {
      setPrevSidebarState("mobile");
      setSidebarState("closed");
    } else {
      // timeout to allow the sidebar to finish animation
      // otherwise useSidebarUtils will close the sidebar
      setTimeout(() => {
        if (sidebarState === "expanded") {
          setPrevSidebarState("expanded");
          setSidebarState("small");
        } else {
          setPrevSidebarState("small");
          setSidebarState("expanded");
        }
      }, 1);
    }
  };
  return { modifyBasedOnDevice, modifyOnClick };
};
